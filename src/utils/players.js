import miguelRondelli   from '../assets/images/miguel_rondelli.png'
import facundoGarces    from '../assets/images/facundo_garces.png'
import emanuelBritez    from '../assets/images/emanuel_britez.png'
import luisRamos        from '../assets/images/luis_ramos.png'
import lisandroAlzugaray from '../assets/images/lisandro_alzugaray1.png'
import alaves from '../assets/images/alaves.png'
import cusco from '../assets/images/escudo_cusco.webp'
import fortaleza from '../assets/images/escudo_fortaleza.png'

export const players = [
  {
    id: 1,
    name: 'Miguel',
    lastname: 'Rondelli',
    club: 'Cusco FC',
    escudo: cusco,
    position: 'Director Técnico',
    nationality: 'Argentina',
    image: miguelRondelli,
    bio: 'Director técnico con experiencia en fútbol sudamericano. Metodología de trabajo diferencial y visión moderna del juego.',
    type: 'coach',
    number: 'DT',
    birthDate: '1978-01-24',
    fieldPosition: null,
    stats: {
      matches: 142,
      wins: 69,
      draws: 31,
      losses: 42,
      ratings: { tactica: 85, motivacion: 90, gestion: 82, formacion: 88, estrategia: 86 },
    },
    socials: {
      instagram: 'https://instagram.com/miguelrondelli',
      twitter: 'https://twitter.com/miguelrondelli',
      threads: 'https://threads.com/@miguelrondelli',
      tiktok: 'https://tiktok.com/@miguelrondelli',
    },
  },
  {
    id: 2,
    name: 'Facundo',
    lastname: 'Garcés',
    club: 'Deportivo Alavés',
    escudo: alaves,
    position: 'Defensor Central',
    nationality: 'Argentina',
    image: facundoGarces,
    bio: 'Defensor central argentino que milita en LaLiga española con Deportivo Alavés. Referente defensivo de su equipo.',
    type: 'player',
    number: 6,
    birthDate: '1999-08-22',
    fieldPosition: { x: 50, y: 75 },
    stats: {
      matches: 118,
      goals: 7,
      assists: 3,
      cleanSheets: 35,
      ratings: { marca: 85, juego_aereo: 88, pase_largo: 72, velocidad: 68, liderazgo: 80 },
    },
    socials: {
      instagram: 'https://instagram.com/facugarces',
    },
  },
  {
    id: 3,
    name: 'Emanuel',
    lastname: 'Britez',
    club: 'Fortaleza EC',
    escudo: fortaleza,
    position: 'Lateral Derecho',
    nationality: 'Argentina',
    image: emanuelBritez,
    bio: 'Lateral dinámico que actúa en el Campeonato Brasileño con Fortaleza EC. Desborde constante y proyección ofensiva.',
    type: 'player',
    number: 4,
    birthDate: '1996-11-05',
    fieldPosition: { x: 85, y: 60 },
    stats: {
      matches: 165,
      goals: 9,
      assists: 22,
      cleanSheets: null,
      ratings: { velocidad: 84, centros: 80, marca: 76, resistencia: 88, desborde: 82 },
    },
    socials: {
      instagram: 'https://instagram.com/emanuelbritez',
    },
  },
  {
    id: 4,
    name: 'Luis',
    lastname: 'Ramos',
    club: 'Alianza Lima',
    position: 'Mediocampista',
    nationality: 'Perú',

    image: luisRamos,
    bio: 'Mediocampista con visión de juego y técnica depurada. Actúa en la Liga 1 de Perú con Alianza Lima.',
    type: 'player',
    number: 9 ,
    birthDate: '1997-06-18',
    fieldPosition: { x: 50, y: 45 },
    stats: {
      matches: 190,
      goals: 28,
      assists: 41,
      cleanSheets: null,
      ratings: { pase: 87, vision: 85, tecnica: 83, disparo: 72, creatividad: 88 },
    },
    socials: {
      instagram: 'https://instagram.com/luisramos',
    },
  },
  {
    id: 5,
    name: 'Lisandro',
    lastname: 'Alzugaray',
    club: 'Universitario de Deportes',
    position: 'Mediocampista Ofensivo',
    nationality: 'Argentina',
    image: lisandroAlzugaray,
    bio: 'Mediocampista ofensivo con visión de juego y técnica depurada. Con buena capacidad de creación y distribución del juego.',
    type: 'player',
    number: 30,
    birthDate: '1978-01-30',
    fieldPosition: { x: 50, y: 45 },
    stats: {
      matches: 210,
      wins: 98,
      draws: 52,
      losses: 60,
      ratings: { tactica: 85, motivacion: 90, gestion: 82, formacion: 88, estrategia: 86 },
    },
    socials: {
      instagram: 'https://instagram.com/lisandroalzugaray',
    },
  },
]
