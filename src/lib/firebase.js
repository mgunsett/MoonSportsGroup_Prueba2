// ─── FIREBASE (sólo lectura) ─────────────────────────────────────
// Mismo proyecto que panel_resultados y las landings individuales.
// La landing sólo lee players/{slug}/matches/{last|next}, que tiene
// lectura pública en las reglas. La key de API-Football nunca pasa por
// acá: la sincronización corre en las funciones de Netlify del panel.
//
// Se usa Firestore Lite (sin tiempo real, mucho más liviano) y se carga
// de forma diferida: no entra en el bundle inicial del sitio.

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

let firestorePromise = null

// Devuelve { db, doc, getDoc } o null si faltan las variables de entorno.
export function loadFirestore() {
  if (!isFirebaseConfigured) return Promise.resolve(null)
  firestorePromise ??= Promise.all([
    import('firebase/app'),
    import('firebase/firestore/lite'),
  ]).then(([{ initializeApp, getApps }, { getFirestore, doc, getDoc }]) => {
    const app = getApps()[0] || initializeApp(firebaseConfig)
    return { db: getFirestore(app), doc, getDoc }
  })
  return firestorePromise
}
