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
