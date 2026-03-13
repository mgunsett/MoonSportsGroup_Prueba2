// ================================
// PLAYERS & STAFF DATA
// ================================
// Replace the import paths with your actual image files
// Place all images inside: src/assets/images/

import miguelRondelli   from '../assets/images/miguel_rondelli.png'
import facundoGarces    from '../assets/images/facundo_garces.png'
import emanuelBritez    from '../assets/images/emanuel_britez.png'
import luisRamos        from '../assets/images/luis_ramos.png'
import losandroAlzugaray from '../assets/images/losandro_alzugaray.png'

export const players = [
  {
    id: 1,
    name: 'Miguel Rondelli',
    club: 'Liga de Quito',
    position: 'Portero',
    nationality: 'Argentina',
    image: miguelRondelli,
    bio: 'Portero internacional con amplia experiencia en clubes de élite de Sudamérica. Ganador de la Copa Sudamericana con LDU Quito.',
    type: 'player',
    number: 1,
    birthDate: '1995-03-14',
    fieldPosition: { x: 50, y: 90 },
    stats: {
      matches: 142,
      goals: 0,
      assists: 2,
      cleanSheets: 48,
      ratings: { reflejos: 88, posicionamiento: 82, salida: 75, juego_aereo: 80, pases: 70 },
    },
    socials: {
      instagram: 'https://instagram.com/miguelrondelli',
    },
  },
  {
    id: 2,
    name: 'Facundo Garcés',
    club: 'Deportivo Alavés',
    position: 'Defensor Central',
    nationality: 'Argentina',
    image: facundoGarces,
    bio: 'Defensor central argentino que milita en LaLiga española con Deportivo Alavés. Referente defensivo de su equipo.',
    type: 'player',
    number: 6,
    birthDate: '1999-08-22',
    fieldPosition: { x: 40, y: 75 },
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
    name: 'Emanuel Brítez',
    club: 'Fortaleza EC',
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
    name: 'Luis Ramos',
    club: 'Sporting Cristal',
    position: 'Mediocampista',
    nationality: 'Perú',
    image: luisRamos,
    bio: 'Mediocampista con visión de juego y técnica depurada. Actúa en la Liga 1 de Perú con Sporting Cristal.',
    type: 'player',
    number: 10,
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
    name: 'Losandro Alzugaray',
    club: 'Disponible',
    position: 'Director Técnico',
    nationality: 'Argentina',
    image: losandroAlzugaray,
    bio: 'Director técnico con experiencia en fútbol sudamericano. Metodología de trabajo diferencial y visión moderna del juego.',
    type: 'coach',
    number: null,
    birthDate: '1978-01-30',
    fieldPosition: null,
    stats: {
      matches: 210,
      wins: 98,
      draws: 52,
      losses: 60,
      ratings: { tactica: 85, motivacion: 90, gestion: 82, formacion: 88, estrategia: 86 },
    },
    socials: {
      instagram: 'https://instagram.com/losandroalzugaray',
    },
  },
]
