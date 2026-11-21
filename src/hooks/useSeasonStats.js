import { useEffect, useState } from 'react'
import { loadFirestore } from '../lib/firebase'

// ─── useSeasonStats ──────────────────────────────────────────────
// Lee players/{slug}/stats/season: los totales de la temporada en curso
// que escribe panel_resultados al sincronizar con API-Football
// (partidos, minutos, goles, asistencias, rating…).
// Se pide recién cuando se abre la ficha y queda en memoria: abrir la
// misma ficha dos veces no vuelve a leer Firestore.

const cache = new Map()

async function fetchSeason(slug) {
  const fs = await loadFirestore()
  if (!fs) return null
  const { db, doc, getDoc } = fs
  try {
    const snap = await getDoc(doc(db, 'players', slug, 'stats', 'season'))
    const data = snap.exists() ? snap.data() : null
    // Sin partidos en la temporada no se muestra nada
    return data && Number(data.partidos) > 0 ? data : null
  } catch (err) {
    console.info('[Ficha] No se pudieron leer las estadísticas de la temporada. Revisá que las reglas de Firestore permitan leer players/{slug}/stats.', err)
    return null
  }
}

export function useSeasonStats(slug) {
  const cached = slug ? cache.get(slug) : null
  const [state, setState] = useState(cached instanceof Promise ? undefined : cached)

  useEffect(() => {
    if (!slug) { setState(null); return undefined }
    let entry = cache.get(slug)
    if (entry !== undefined && !(entry instanceof Promise)) { setState(entry); return undefined }
    // Si ya hay una lectura en curso (otra ficha, o StrictMode), se espera esa misma
    if (!(entry instanceof Promise)) {
      entry = fetchSeason(slug).then((data) => { cache.set(slug, data); return data })
      cache.set(slug, entry)
    }
    let cancelled = false
    setState(undefined)
    entry.then((data) => { if (!cancelled) setState(data) })
    return () => { cancelled = true }
  }, [slug])

  // undefined = cargando · null = sin datos · objeto = temporada
  return state
}
