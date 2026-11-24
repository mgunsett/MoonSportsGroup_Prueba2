# 🌙 Moon Sports Group — Web Institucional

Stack: **React 18 + Vite + Chakra UI + GSAP + React Router**

---

## 📁 Estructura del Proyecto

```
moon-sports/
├── index.html
├── vite.config.js
├── package.json
│
└── src/
    ├── main.jsx                   ← Entry point
    ├── App.jsx                    ← Router + layout
    │
    ├── styles/
    │   ├── theme.js               ← Chakra UI custom theme (colores, tipografías, botones)
    │   └── global.css             ← Estilos globales, animaciones CSS, cursor
    │
    ├── assets/
    │   └── images/                ← ⚠️ COLOCAR TODAS LAS IMÁGENES AQUÍ
    │       ├── logo_principal.png
    │       ├── bg_jugadores.png
    │       ├── miguel_rondelli.png
    │       ├── facundo_garces.png
    │       ├── emanuel_britez.png
    │       ├── luis_ramos.png
    │       └── losandro_alzugaray.png
    │
    ├── hooks/
    │   └── useGsapReveal.js       ← Hooks reutilizables para animaciones GSAP
    │
    ├── utils/
    │   └── players.js             ← Data de jugadores y técnicos
    │
    ├── components/
    │   ├── CustomCursor.jsx       ← Cursor personalizado dorado
    │   ├── Navbar/
    │   │   └── Navbar.jsx         ← Navbar transparente floating con scroll effect
    │   ├── Hero/
    │   │   └── Hero.jsx           ← Sección hero con logo animado + parallax
    │   ├── Services/
    │   │   └── Services.jsx       ← Grid de 6 servicios con animaciones hover
    │   ├── Nosotros/
    │   │   └── Nosotros.jsx       ← Sección nosotros con bg_jugadores + counters
    │   ├── PlayersSlider/
    │   │   └── PlayersSlider.jsx  ← Slider horizontal pinneado con GSAP ScrollTrigger
    │   ├── Contact/
    │   │   └── Contact.jsx        ← 4 botones de contacto animados
    │   └── Footer/
    │       └── Footer.jsx         ← Footer con links, social, logo
    │
    └── pages/
        ├── HomePage.jsx           ← Ensambla todas las secciones del home
        └── JugadoresPage.jsx      ← Página /jugadores con cards detalladas
```

---

## 🚀 Instalación y Setup

### 1. Instalar dependencias

```bash
npm install
```

Esto instalará:
- `react` + `react-dom`
- `react-router-dom`
- `@chakra-ui/react` + `@emotion/react` + `@emotion/styled` + `framer-motion`
- `gsap`
- `vite` + `@vitejs/plugin-react`

### 2. Copiar imágenes

Copiá todas las imágenes a la carpeta:
```
src/assets/images/
```

Archivos necesarios:
- `logo_principal.png`
- `bg_jugadores.png`
- `miguel_rondelli.png`
- `facundo_garces.png`
- `emanuel_britez.png`
- `luis_ramos.png`
- `losandro_alzugaray.png`

### 3. Correr en desarrollo

```bash
npm run dev
```

Abre `http://localhost:5173`

### 4. Build para producción

```bash
npm run build
npm run preview
```

---

## 🎨 Personalización

### Agregar un nuevo jugador

Editá `src/utils/players.js`:

```js
import nuevoJugador from '../assets/images/nuevo_jugador.png'

export const players = [
  // ... jugadores existentes
  {
    id: 6,
    name: 'Nombre Apellido',
    club: 'Nombre del Club',
    position: 'Posición',
    nationality: 'Argentina',
    image: nuevoJugador,
    bio: 'Descripción breve del jugador.',
    type: 'player', // o 'coach' para DT
  },
]
```

### Cambiar links de contacto

Editá `src/components/Contact/Contact.jsx`, en el array `contactLinks`:
```js
{ label: 'WhatsApp', href: 'https://wa.me/TU_NUMERO', ... }
```

### Cambiar colores

Editá `src/styles/theme.js` → sección `brand`:
```js
gold:     '#C9A84C',  // Color dorado principal
goldLight:'#E8C96A',  // Dorado claro (hover)
goldDark: '#9A7A35',  // Dorado oscuro
```

---

## ⚙️ Animaciones GSAP

### `useGsapReveal(direction, stagger)`
Hook que anima todos los elementos con clase `.gsap-reveal` dentro de un contenedor cuando entran al viewport.

```jsx
const ref = useGsapReveal('up')     // 'up' | 'left' | 'right'

<Box ref={ref}>
  <Text className="gsap-reveal">Este texto aparece animado</Text>
  <Text className="gsap-reveal">Este también, con stagger</Text>
</Box>
```

### `useGsapCounter(target, suffix)`
Anima un número desde 0 hasta `target` cuando entra al viewport.

```jsx
const ref = useGsapCounter(42)
<Text ref={ref}>0+</Text>  // → animará hasta "42+"
```

---

## 📌 Notas Importantes

- **Chakra UI v2** requiere que `framer-motion` esté instalado como peer dependency.
- El **cursor custom** se desactiva automáticamente en dispositivos táctiles (no afecta mobile).
- El **slider horizontal** usa `ScrollTrigger.pin` — asegurate de que el contenedor tenga altura definida.
- Las **fuentes** (Bebas Neue + Outfit) se cargan desde Google Fonts en `index.html`.

---

## 📅 Partidos de la semana (`MatchAgenda`)

Sección de la home entre los jugadores y "Qué hacemos". Muestra los partidos de la semana (lunes a domingo, hora de Argentina) de los representados, con un modal de "agenda completa" filtrable por país.

**De dónde salen los datos:** de `panel_resultados`. El panel sincroniza con API-Football cada 3 horas y escribe en Firestore `players/{slug}/matches/{last|next}`. La landing sólo lee esos documentos (lectura pública); la key de API-Football nunca pasa por acá.

| Archivo | Qué hace |
|---|---|
| `src/utils/players.js` | `slug` (id en el panel) y `clubCountry` (país de la liga) de cada representado |
| `src/lib/firebase.js` | Firestore Lite, cargado de forma diferida (no entra en el bundle inicial) |
| `src/hooks/useWeekAgenda.js` | Lee los partidos una vez por visita y los comparte con el navbar |
| `src/utils/agenda.js` | Arma la semana, agrupa por partido, calcula el estado y los horarios |
| `src/components/MatchAgenda/` | Sección (placa) y modal |

- **Horarios:** siempre en hora de Argentina; si el país del partido tiene otra hora, se muestra debajo (ej. `22:00 ARG · 20:00 PER`).
- **Estados:** próximo, en juego (desde el inicio hasta 2 h 15 min después) y finalizado (con resultado cuando llega la sincronización).
- **Sin partidos esta semana** (receso, pretemporada) **o sin Firebase configurado:** la sección y el link "Agenda" del navbar no se muestran.
- **Sumar un representado a la agenda:** agregale `slug` y `clubCountry` en `players.js` (el `slug` tiene que existir en el panel).

**Configuración:** copiá `.env.example` a `.env` con las variables `VITE_FIREBASE_*` del panel, y cargalas también en el hosting (se leen en build time).

## 📊 Estadísticas de la temporada en la ficha

La ficha de cada representado (`PlayerModal`) muestra dos bloques de números:

- **En su carrera:** totales escritos a mano en `src/utils/players.js` (`stats`). Las habilidades del radar (`stats.ratings`) también son manuales: API-Football no las tiene.
- **Temporada {año}:** partidos, goles, asistencias (en defensores, **Recup.** = quites + intercepciones), minutos y rating de la temporada en curso. Si no tuvo expulsiones, se destaca **0 tarjetas rojas**. Salen de `players/{slug}/stats/season`, que escribe `panel_resultados` al sincronizar con API-Football. Se actualizan solos.

Detalles:
- Se lee recién al abrir la ficha y queda en memoria (`src/hooks/useSeasonStats.js`).
- Si el jugador no tiene `apiPlayerId` en el panel, no jugó en la temporada o es DT, el bloque no aparece.
- Si las reglas de Firestore no permiten leer `stats`, el bloque no aparece y la consola muestra `[Ficha] …`. La regla necesaria, dentro de `match /players/{slug}`:

  ```
  match /stats/{docId} {
    allow read: if true;
    allow write: if request.auth != null;
  }
  ```
