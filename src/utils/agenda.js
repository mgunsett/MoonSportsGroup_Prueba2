// ─── AGENDA DE PARTIDOS DE LA SEMANA ─────────────────────────────
// Funciones puras: reciben lo que hay en Firestore por jugador
// (players/{slug}/matches/{last|next}, lo que escribe panel_resultados
// con la sincronización de API-Football) y arman la agenda de la semana.
//
// Horarios: todo se muestra en hora de Argentina y, si es distinta, al
// lado la hora local del país donde se juega.

export const AR_TZ = 'America/Argentina/Buenos_Aires'

// Mismo mapa que netlify/lib/mappers.js del panel.
const COUNTRY_TZ = {
  Argentina: AR_TZ,
  'Perú': 'America/Lima',
  'México': 'America/Mexico_City',
  Ecuador: 'America/Guayaquil',
  Colombia: 'America/Bogota',
  Chile: 'America/Santiago',
}

const COUNTRY_ABBR = {
  Argentina: 'ARG',
  'Perú': 'PER',
  'México': 'MEX',
  Ecuador: 'ECU',
  Colombia: 'COL',
  Chile: 'CHI',
}

// Estados de partido terminado en API-Football: final, alargue, penales.
const FINISHED_STATUSES = ['FT', 'AET', 'PEN']

// Desde el inicio hasta acá lo damos "en juego": 90' + entretiempo +
// adicionales. La sincronización corre cada 3 h, así que no hay minuto
// a minuto: sólo el estado.
const LIVE_WINDOW_MS = 135 * 60 * 1000

const DAY_SHORT = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const DAY_LONG = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const MONTH_LONG = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const MONTHS = {
  ene: 0, jan: 0, feb: 1, mar: 2, abr: 3, apr: 3, may: 4, jun: 5, jul: 6,
  ago: 7, aug: 7, sep: 8, set: 8, oct: 9, nov: 10, dic: 11, dec: 11,
}
const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const timezoneFor = (country) => COUNTRY_TZ[country] || AR_TZ
export const countryAbbr = (country) => COUNTRY_ABBR[country] || ''

const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
const hasScore = (m) => m?.home_score !== null && m?.home_score !== undefined && m?.home_score !== ''

// ─── Fechas en una zona horaria (sin librerías) ──────────────────
const formatters = new Map()
function partsIn(date, tz) {
  let f = formatters.get(tz)
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hourCycle: 'h23', weekday: 'short',
      year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',
    })
    formatters.set(tz, f)
  }
  const p = Object.fromEntries(f.formatToParts(date).map((x) => [x.type, x.value]))
  return { y: +p.year, mo: +p.month, d: +p.day, h: +p.hour % 24, mi: +p.minute, wd: WEEKDAYS_EN.indexOf(p.weekday) }
}

// Fecha y hora "de reloj" en una zona → instante real.
function zonedToDate(y, mo, d, h, mi, tz) {
  const wall = Date.UTC(y, mo - 1, d, h, mi)
  const offset = (ts) => {
    const p = partsIn(new Date(ts), tz)
    return Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi) - ts
  }
  let ts = wall - offset(wall)
  ts = wall - offset(ts) // segunda pasada: corrige cerca de un cambio de horario
  return new Date(ts)
}

const pad = (n) => String(n).padStart(2, '0')
const dayKey = (date) => {
  const p = partsIn(date, AR_TZ)
  return `${p.y}-${pad(p.mo)}-${pad(p.d)}`
}

// Inicio del partido. La sincronización guarda `match_datetime` (ISO con
// zona); lo cargado a mano en el panel sólo trae `match_date` en texto
// ("22 Nov 2026") y quizás `match_time`, en hora local del club.
export function kickoff(match, country) {
  if (!match) return null
  if (match.match_datetime) {
    const d = new Date(match.match_datetime)
    if (!Number.isNaN(d.getTime())) return d
  }
  const m = /(\d{1,2})\s+([a-záéíóú]+)\.?\s+(\d{4})/i.exec(String(match.match_date || ''))
  if (!m) return null
  const month = MONTHS[norm(m[2]).slice(0, 3)]
  if (month === undefined) return null
  const t = /^(\d{1,2}):(\d{2})/.exec(String(match.match_time || ''))
  return zonedToDate(+m[3], month + 1, +m[1], t ? +t[1] : 12, t ? +t[2] : 0, timezoneFor(country))
}

// Lunes 00:00 a lunes siguiente 00:00, en hora de Argentina.
export function weekRange(now = new Date()) {
  const p = partsIn(now, AR_TZ)
  const back = (p.wd + 6) % 7
  return {
    start: zonedToDate(p.y, p.mo, p.d - back, 0, 0, AR_TZ),
    end: zonedToDate(p.y, p.mo, p.d - back + 7, 0, 0, AR_TZ),
  }
}

// "16 al 22 de noviembre" / "28 de diciembre al 3 de enero"
export function weekLabel(now = new Date()) {
  const { start, end } = weekRange(now)
  const a = partsIn(start, AR_TZ)
  const b = partsIn(new Date(end.getTime() - 1), AR_TZ)
  return a.mo === b.mo
    ? `${a.d} al ${b.d} de ${MONTH_LONG[b.mo - 1]}`
    : `${a.d} de ${MONTH_LONG[a.mo - 1]} al ${b.d} de ${MONTH_LONG[b.mo - 1]}`
}

export function matchStatus(match, date, now = new Date()) {
  if (FINISHED_STATUSES.includes(match?.api_status) || hasScore(match)) return 'ft'
  if (!date) return 'next'
  const elapsed = now - date
  if (elapsed >= LIVE_WINDOW_MS) return 'ft' // ya terminó; el resultado llega con la próxima sincronización
  if (elapsed >= 0) return 'live'
  return 'next'
}

// Hora en Argentina + hora local del país del partido (si cambia).
export function describeKickoff(date, country, hasTime, now = new Date()) {
  const ar = partsIn(date, AR_TZ)
  const local = partsIn(date, timezoneFor(country))
  const time = `${pad(ar.h)}:${pad(ar.mi)}`
  const localTime = `${pad(local.h)}:${pad(local.mi)}`
  return {
    hasTime,
    time,
    localTime,
    localAbbr: countryAbbr(country),
    showLocal: hasTime && localTime !== time,
    dayShort: DAY_SHORT[ar.wd],
    dayMid: `${DAY_SHORT[ar.wd]} ${ar.d}`,
    dayLong: `${DAY_LONG[ar.wd]} ${ar.d}`,
    dayKey: dayKey(date),
    isToday: dayKey(date) === dayKey(now),
  }
}

// rows: [{ person, country, matches: { last, next } }]
// Devuelve un partido por partido real (no por jugador): si cuatro
// representados juegan el mismo partido, aparece una vez con los cuatro.
export function buildWeekAgenda(rows, now = new Date()) {
  const { start, end } = weekRange(now)
  const byKey = new Map()

  rows.forEach(({ person, country, matches }) => {
    ;['last', 'next'].forEach((slot) => {
      const m = matches?.[slot]
      if (!m?.home_team) return
      const date = kickoff(m, country)
      if (!date || date < start || date >= end) return

      const key = `${dayKey(date)}|${norm(m.home_team)}|${norm(m.away_team)}`
      let entry = byKey.get(key)
      if (!entry || (hasScore(m) && !hasScore(entry.raw))) {
        entry = {
          key,
          date,
          raw: m,
          country,
          home: { name: m.home_team, shield: m.home_shield || null, score: hasScore(m) ? m.home_score : null },
          away: { name: m.away_team, shield: m.away_shield || null, score: hasScore(m) ? m.away_score : null },
          competition: m.competition || '',
          stadium: m.stadium || '',
          status: matchStatus(m, date, now),
          when: describeKickoff(date, country, Boolean(m.match_datetime || m.match_time), now),
          players: entry?.players || [],
        }
        byKey.set(key, entry)
      }
      if (!entry.players.some((p) => p.id === person.id)) entry.players.push(person)
    })
  })

  return [...byKey.values()].sort((a, b) => a.date - b.date)
}

// "Rondelli, Silva y Callejo" / "Alzugaray, Di Benedetto y 2 más"
export function namesLine(players, max = 2) {
  const names = players.map((p) => p.short)
  if (names.length <= max + 1) return names.join(', ').replace(/, ([^,]*)$/, ' y $1')
  return `${names.slice(0, max).join(', ')} y ${names.length - max} más`
}
