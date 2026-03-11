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
  },
]
