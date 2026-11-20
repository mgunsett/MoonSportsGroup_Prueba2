import { useEffect, useMemo, useState } from 'react'
import { players } from '../utils/players'
import { loadFirestore } from '../lib/firebase'
import { buildWeekAgenda, weekLabel } from '../utils/agenda'

// ─── useWeekAgenda ───────────────────────────────────────────────
// Lee de Firestore el último y el próximo partido de cada representado
// (los que tienen `slug` en players.js) y arma la agenda de la semana.
//
// La lectura se hace una sola vez por visita y se comparte: la sección
// y el link "Agenda" del navbar usan el mismo resultado (26 lecturas).
// El estado de cada partido (próximo / en juego / finalizado) se
// recalcula cada minuto sin volver a leer.

const SLOTS = ['last', 'next']
let request = null
let cachedRows

function toPerson(p) {
  return {
    id: p.id,
    name: `${p.name} ${p.lastname}`,
    short: p.lastname,
    tag: p.type === 'coach' ? 'DT' : `#${String(p.number).trim()}`,
    image: p.image,
  }
}

async function loadRows() {
  const fs = await loadFirestore()
  if (!fs) return []
  const { db, doc, getDoc } = fs
  const tracked = players.filter((p) => p.slug)

  return Promise.all(tracked.map(async (p) => {
    const [last, next] = await Promise.all(SLOTS.map((slot) =>
      getDoc(doc(db, 'players', p.slug, 'matches', slot))
        .then((snap) => (snap.exists() ? snap.data() : null))
        .catch(() => null)
    ))
    return { person: toPerson(p), country: p.clubCountry, matches: { last, next } }
  }))
}

export function useWeekAgenda() {
  const [rows, setRows] = useState(cachedRows)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    if (cachedRows) return undefined
    let cancelled = false
    request ??= loadRows().catch(() => [])
    request.then((r) => {
      cachedRows = r
      if (!cancelled) setRows(r)
    })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 1000)
    return () => clearInterval(id)
  }, [])

  const matches = useMemo(() => (rows ? buildWeekAgenda(rows, now) : []), [rows, now])

  return {
    isLoading: rows === undefined,
    matches,
    week: weekLabel(now),
    now,
  }
}
