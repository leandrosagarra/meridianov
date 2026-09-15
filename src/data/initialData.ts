import { Category, ClubInfo, Match, MembershipPlan, NewsArticle } from '../types';

export const INITIAL_CLUB_INFO: ClubInfo = {
  name: 'Club Meridiano V°',
  shortName: 'Meridiano V°',
  legalName: 'Centro de Fomento y Biblioteca Meridiano V°',
  foundationDate: '19 de Abril de 1929',
  firstMeetingDate: '8 de Junio de 1928',
  slogan: 'Pasión, deporte y comunidad',
  address: 'Calle 67 e/16 y 17 nº1080',
  city: 'La Plata, Buenos Aires',
  phone: '+54 221 452-1929',
  whatsapp: '5492215551929',
  email: 'clubmeridianov@gmail.com',
  instagram: 'https://instagram.com/clubmeridianov',
  twitter: 'https://x.com/ClubMeridianoV',
  facebook: 'https://facebook.com/clubmeridianov',
  heroImage: '/foto4.jpg',
  aboutText: [
    'El día 8 de Junio de 1928 se reúnen por primera vez y por mutuo acuerdo, los vecinos del Barrio Sud de la Ciudad, cuya finalidad era crear y dejar constituida una sociedad de fomento y cultura. Esos vecinos designan Presidente provisorio al Sr. Leonildo C. Frangi.',
    'Luego de arduas tratativas el esfuerzo se vio coronado el 19 de abril de 1929, fecha en que es fundado el Centro de Fomento y Biblioteca Meridiano V°, habiéndose designado Presidente al Sr. Tomás Mercatilli.',
    'A lo largo de casi un siglo, el club se convirtió en un pilar deportivo y social de La Plata, formando generaciones de basquetbolistas con valores de compañerismo, esfuerzo y sentido de pertenencia en el histórico barrio de la estación.'
  ],
  historicalPresidents: [
    'Leonildo C. Frangi (Provisorio 1928)',
    'Tomás Mercatilli (1° Presidente 1929)',
    'Pablo Bello',
    'Emilio Serra',
    'Juan Pallola',
    'Manuel Rodriguez Gonzalez',
    'Pio Chiramberro',
    'Julian Landa',
    'Silvio Eliggi',
    'Pablo Frangi',
    'Adolfo Gallardo',
    'Osvaldo Caldera',
    'Oscar Alvarez'
  ],
  authorities: [
    { role: 'Presidente', name: 'Martín Arrechea' },
    { role: 'Vicepresidente', name: 'Gonzalo Frangi' },
    { role: 'Secretario General', name: 'Lucas Mercatilli' },
    { role: 'Tesorero', name: 'Ignacio Baroni' },
    { role: 'Subcomisión de Básquet', name: 'Mariano Castro & Equipo' },
    { role: 'Coordinador Deportivo', name: 'Prof. Javier Rossi' }
  ],
  facilities: [
    {
      id: 'fac-1',
      name: 'Microestadio Principal de Parquet',
      description: 'Cancha reglamentaria con piso flotante de madera lustrada, tableros de acrílico con aros rebatibles, reloj oficial de 24 segundos y tribunas para más de 600 espectadores.',
      image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1200&auto=format&fit=crop',
      highlight: 'Piso flotante profesional'
    },
    {
      id: 'fac-2',
      name: 'Gimnasio Auxiliar y Mini Básquet',
      description: 'Espacio acondicionado para la formación de los más chicos, con aros de altura regulable, pelotas adaptadas e iluminación LED de alta potencia.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop',
      highlight: 'Espacio de formativas'
    },
    {
      id: 'fac-3',
      name: 'Biblioteca Popular y Sala Social',
      description: 'Nacida junto con el club en 1929, conserva más de 4.000 volúmenes históricos y funciona como punto de encuentro cultural, apoyo escolar y reuniones del barrio.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop',
      highlight: 'Fundada en 1929'
    },
    {
      id: 'fac-4',
      name: 'Buffet & Cantina Meridiano',
      description: 'El corazón social del club luego de cada partido: pizzas caseras, empanadas, minutas y un clima familiar inigualable donde hinchas y jugadores comparten el tercer tiempo.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
      highlight: 'Tercer tiempo & Familia'
    }
  ],
  achievements: [
    {
      year: '2025',
      title: 'Campeón Torneo Clausura APB',
      category: 'U17 Varones',
      description: 'Consagración invicta en el cuadrangular final con una destacada actuación colectiva.'
    },
    {
      year: '2024',
      title: 'Ascenso a Primera A1',
      category: 'Primera División',
      description: 'Histórico triunfo en tiempo suplementario para regresar a la máxima categoría del básquet platense.'
    },
    {
      year: '2023',
      title: 'Copa Ciudad de La Plata',
      category: 'Básquet Femenino',
      description: 'Subcampeonas metropolitanas consolidando el proyecto integral del básquet femenino del club.'
    },
    {
      year: '2019',
      title: '90° Aniversario Institucional',
      category: 'Club Social',
      description: 'Inauguración de la nueva iluminación LED y renovación total de los vestuarios de jugadores y árbitros.'
    }
  ]
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'mini',
    name: 'Mini Básquet & Escuelita',
    slug: 'mini-basquet',
    ageGroup: '4 a 12 años (Mosquitos, Premini y Mini)',
    badgeText: 'Escuela Formativa',
    coach: 'Prof. Santiago Menéndez y Sofía Galván',
    physicalTrainer: 'Prof. Camila Ortiz',
    squadPhoto: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?q=80&w=1200&auto=format&fit=crop',
    description: 'Enfoque lúdico y formativo donde los chicos aprenden los fundamentos del básquetbol, la importancia del trabajo en equipo, la motricidad y el amor por la camiseta.',
    trainingSchedule: {
      days: 'Lunes, Miércoles y Viernes',
      time: '17:30 a 19:00 hs',
      court: 'Gimnasio Auxiliar y Cancha Central'
    },
    players: [
      { id: 'p-m1', name: 'Benjamín Pérez', number: 4, position: 'Base', age: 10 },
      { id: 'p-m2', name: 'Lucas Benítez', number: 5, position: 'Escolta', age: 11 },
      { id: 'p-m3', name: 'Mateo Rossi', number: 7, position: 'Alero', age: 11 },
      { id: 'p-m4', name: 'Thiago Gómez', number: 8, position: 'Ala-Pívot', age: 12 },
      { id: 'p-m5', name: 'Joaquín Silva', number: 9, position: 'Pívot', age: 12 },
      { id: 'p-m6', name: 'Felipe Fontana', number: 10, position: 'Base', age: 9 },
      { id: 'p-m7', name: 'Valentino Castro', number: 11, position: 'Escolta', age: 10 }
    ]
  },
  {
    id: 'u13',
    name: 'Categoría U13',
    slug: 'u13',
    ageGroup: '13 años (Tira Formativa)',
    badgeText: 'Formativa APB',
    coach: 'Prof. Damián Flores',
    physicalTrainer: 'Prof. Lautaro Varela',
    squadPhoto: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop',
    description: 'Primera categoría competitiva federada ante la Asociación Platense de Básquetbol. Transición del mini básquet a la táctica grupal y desarrollo atlético.',
    trainingSchedule: {
      days: 'Lunes, Miércoles y Viernes',
      time: '18:30 a 20:00 hs',
      court: 'Microestadio Principal'
    },
    players: [
      { id: 'p-u13-1', name: 'Santino Frangi', number: 4, position: 'Base', age: 13, isCaptain: true },
      { id: 'p-u13-2', name: 'Ignacio Morales', number: 5, position: 'Escolta', age: 13 },
      { id: 'p-u13-3', name: 'Ramiro Díaz', number: 7, position: 'Alero', age: 13 },
      { id: 'p-u13-4', name: 'Agustín Romero', number: 9, position: 'Ala-Pívot', age: 13 },
      { id: 'p-u13-5', name: 'Tomás Villalba', number: 11, position: 'Pívot', age: 13 },
      { id: 'p-u13-6', name: 'Franco Navarro', number: 12, position: 'Base', age: 13 },
      { id: 'p-u13-7', name: 'Bautista López', number: 15, position: 'Pívot', age: 13 }
    ],
    standings: [
      { position: 1, team: 'Club Meridiano V°', points: 18, played: 10, won: 8, lost: 2 },
      { position: 2, team: 'Atenas', points: 18, played: 10, won: 8, lost: 2 },
      { position: 3, team: 'Unión Vecinal', points: 16, played: 10, won: 6, lost: 4 },
      { position: 4, team: 'Reconquista', points: 15, played: 10, won: 5, lost: 5 }
    ]
  },
  {
    id: 'u15',
    name: 'Categoría U15',
    slug: 'u15',
    ageGroup: '14 y 15 años',
    badgeText: 'Formativa APB',
    coach: 'Prof. Matías Cárdenas',
    physicalTrainer: 'Prof. Lautaro Varela',
    squadPhoto: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200&auto=format&fit=crop',
    description: 'Etapa clave de consolidación técnico-táctica, fortalecimiento físico y preparación para el alto rendimiento juvenil.',
    trainingSchedule: {
      days: 'Martes y Jueves (18:00 a 19:30) y Sábados (10:00 a 12:00)',
      time: '18:00 a 19:30 hs',
      court: 'Microestadio Principal'
    },
    players: [
      { id: 'p-u15-1', name: 'Emiliano Suárez', number: 4, position: 'Base', age: 15, isCaptain: true },
      { id: 'p-u15-2', name: 'Bruno Mercatilli', number: 6, position: 'Escolta', age: 14 },
      { id: 'p-u15-3', name: 'Nahuel Ferreyra', number: 7, position: 'Alero', age: 15 },
      { id: 'p-u15-4', name: 'Gonzalo Ibarra', number: 10, position: 'Ala-Pívot', age: 15 },
      { id: 'p-u15-5', name: 'Facundo Ledesma', number: 13, position: 'Pívot', age: 15 },
      { id: 'p-u15-6', name: 'Simón Peralta', number: 8, position: 'Alero', age: 14 },
      { id: 'p-u15-7', name: 'Ciro Mansilla', number: 14, position: 'Pívot', age: 15 }
    ],
    standings: [
      { position: 1, team: 'Universal', points: 20, played: 11, won: 9, lost: 2 },
      { position: 2, team: 'Club Meridiano V°', points: 19, played: 11, won: 8, lost: 3 },
      { position: 3, team: 'Estudiantes', points: 18, played: 11, won: 7, lost: 4 },
      { position: 4, team: 'Gimnasia y Esgrima', points: 17, played: 11, won: 6, lost: 5 }
    ]
  },
  {
    id: 'u17',
    name: 'Categoría U17',
    slug: 'u17',
    ageGroup: '16 y 17 años',
    badgeText: 'Juveniles Destacados',
    coach: 'Prof. Javier Rossi',
    physicalTrainer: 'Prof. Esteban Belloni',
    squadPhoto: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=1200&auto=format&fit=crop',
    description: 'Actuales campeones del Clausura APB. Plantel de gran intensidad defensiva, juego dinámico en transición y varios jugadores que ya debutaron en Primera.',
    trainingSchedule: {
      days: 'Lunes, Miércoles y Viernes',
      time: '19:30 a 21:00 hs',
      court: 'Microestadio Principal'
    },
    players: [
      { id: 'p-u17-1', name: 'Leandro Sagarna', number: 7, position: 'Alero', age: 17, isCaptain: true },
      { id: 'p-u17-2', name: 'Marcos Pellegrini', number: 4, position: 'Base', age: 16 },
      { id: 'p-u17-3', name: 'Alejo Carrizo', number: 5, position: 'Escolta', age: 17 },
      { id: 'p-u17-4', name: 'Patricio Beltrán', number: 9, position: 'Ala-Pívot', age: 17 },
      { id: 'p-u17-5', name: 'Jerónimo Cabrera', number: 12, position: 'Pívot', age: 17 },
      { id: 'p-u17-6', name: 'Santiago Roldán', number: 10, position: 'Alero', age: 16 },
      { id: 'p-u17-7', name: 'Dante Benítez', number: 15, position: 'Pívot', age: 16 }
    ],
    standings: [
      { position: 1, team: 'Club Meridiano V°', points: 22, played: 12, won: 10, lost: 2 },
      { position: 2, team: 'Atenas', points: 21, played: 12, won: 9, lost: 3 },
      { position: 3, team: 'Platense', points: 20, played: 12, won: 8, lost: 4 },
      { position: 4, team: 'Banco Provincia', points: 18, played: 12, won: 6, lost: 6 }
    ]
  },
  {
    id: 'u21',
    name: 'Categoría U21',
    slug: 'u21',
    ageGroup: '18 a 21 años',
    badgeText: 'Antesala de Primera',
    coach: 'Prof. Guillermo Fabris',
    physicalTrainer: 'Prof. Esteban Belloni',
    squadPhoto: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=1200&auto=format&fit=crop',
    description: 'Categoría de máxima exigencia que nutre de manera directa al plantel superior de Primera División. Juego físico y táctica avanzada.',
    trainingSchedule: {
      days: 'Martes y Jueves',
      time: '20:30 a 22:00 hs',
      court: 'Microestadio Principal'
    },
    players: [
      { id: 'p-u21-1', name: 'Manuel Castro', number: 5, position: 'Base', age: 20, isCaptain: true },
      { id: 'p-u21-2', name: 'Juan Cruz Zeballos', number: 8, position: 'Escolta', age: 19 },
      { id: 'p-u21-3', name: 'Luciano Valenti', number: 11, position: 'Alero', age: 20 },
      { id: 'p-u21-4', name: 'Federico Soria', number: 14, position: 'Ala-Pívot', age: 21 },
      { id: 'p-u21-5', name: 'Esteban Frangi', number: 15, position: 'Pívot', age: 21 },
      { id: 'p-u21-6', name: 'Lucas Arana', number: 6, position: 'Escolta', age: 19 }
    ]
  },
  {
    id: 'primera',
    name: 'Primera División',
    slug: 'primera-division',
    ageGroup: 'Mayores (Torneo Oficial APB)',
    badgeText: 'Plantel Superior',
    coach: 'DT Mariano Arrechea',
    physicalTrainer: 'Prof. Nicolás Garmendia',
    squadPhoto: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop',
    description: 'El orgullo y estandarte del club. Plantel competitivo que representa la mística de Meridiano V° en las canchas de toda la región platense con corazón y pertenencia.',
    trainingSchedule: {
      days: 'Lunes, Miércoles y Jueves',
      time: '21:00 a 23:00 hs',
      court: 'Microestadio Principal'
    },
    players: [
      { id: 'p-pri-1', name: 'Gonzalo "Pitu" Frangi', number: 4, position: 'Base', age: 28, isCaptain: true },
      { id: 'p-pri-2', name: 'Matías Bazzana', number: 6, position: 'Escolta', age: 26 },
      { id: 'p-pri-3', name: 'Agustín Castelli', number: 8, position: 'Alero', age: 24 },
      { id: 'p-pri-4', name: 'Nicolás De La Vega', number: 10, position: 'Ala-Pívot', age: 29 },
      { id: 'p-pri-5', name: 'Federico Poggi', number: 12, position: 'Pívot', age: 27 },
      { id: 'p-pri-6', name: 'Rodrigo Mercatilli', number: 7, position: 'Base', age: 23 },
      { id: 'p-pri-7', name: 'Santiago Díaz', number: 9, position: 'Escolta', age: 22 },
      { id: 'p-pri-8', name: 'Ignacio Colombo', number: 11, position: 'Alero', age: 25 },
      { id: 'p-pri-9', name: 'Maximiliano Rossi', number: 13, position: 'Ala-Pívot', age: 31 },
      { id: 'p-pri-10', name: 'Mariano Benítez', number: 15, position: 'Pívot', age: 30 }
    ],
    standings: [
      { position: 1, team: 'Club Meridiano V°', points: 26, played: 14, won: 12, lost: 2 },
      { position: 2, team: 'Unión Vecinal', points: 25, played: 14, won: 11, lost: 3 },
      { position: 3, team: 'Atenas', points: 24, played: 14, won: 10, lost: 4 },
      { position: 4, team: 'Reconquista', points: 22, played: 14, won: 8, lost: 6 },
      { position: 5, team: 'Estudiantes', points: 21, played: 14, won: 7, lost: 7 },
      { position: 6, team: 'Universal', points: 20, played: 14, won: 6, lost: 8 }
    ]
  },
  {
    id: 'femenino',
    name: 'Básquet Femenino',
    slug: 'basquet-femenino',
    ageGroup: 'Formativa y Primera Femenina',
    badgeText: 'Tira Femenina APB',
    coach: 'Prof. Micaela Albarracín',
    physicalTrainer: 'Prof. Camila Ortiz',
    squadPhoto: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop',
    description: 'Crecimiento sostenido del básquet femenino en Meridiano V°. Formación desde mini básquet hasta el equipo de Primera División con una identidad de garra y pasión.',
    trainingSchedule: {
      days: 'Martes y Jueves (19:00 a 20:30) y Sábados (12:00 a 14:00)',
      time: '19:00 a 20:30 hs',
      court: 'Microestadio Principal'
    },
    players: [
      { id: 'p-fem-1', name: 'Lucía Santoro', number: 4, position: 'Base', age: 24, isCaptain: true },
      { id: 'p-fem-2', name: 'Camila Fontana', number: 5, position: 'Escolta', age: 22 },
      { id: 'p-fem-3', name: 'Julieta Mercatilli', number: 7, position: 'Alero', age: 20 },
      { id: 'p-fem-4', name: 'Valentina Rossi', number: 9, position: 'Ala-Pívot', age: 23 },
      { id: 'p-fem-5', name: 'Martina Cabrera', number: 12, position: 'Pívot', age: 25 },
      { id: 'p-fem-6', name: 'Sofía Méndez', number: 8, position: 'Base', age: 19 },
      { id: 'p-fem-7', name: 'Paula Giménez', number: 14, position: 'Pívot', age: 21 }
    ],
    standings: [
      { position: 1, team: 'Club Meridiano V°', points: 19, played: 10, won: 9, lost: 1 },
      { position: 2, team: 'Platense', points: 18, played: 10, won: 8, lost: 2 },
      { position: 3, team: 'Gimnasia', points: 16, played: 10, won: 6, lost: 4 },
      { position: 4, team: 'Universitario', points: 15, played: 10, won: 5, lost: 5 }
    ]
  }
];

export const INITIAL_MATCHES: Match[] = [
  // PROXIMO PARTIDO DESTACADO
  {
    id: 'm-featured-1',
    category: 'Primera División',
    tournament: 'Torneo Oficial APB 2026',
    round: 'Fecha 15',
    homeTeam: 'Club Meridiano V°',
    awayTeam: 'Atenas de La Plata',
    isFinished: false,
    date: '2026-09-18', // Friday
    time: '21:30',
    court: 'Microestadio Meridiano V° (Calle 67 e/ 16 y 17)',
    isLocal: true,
    summary: 'Gran clásico del básquet platense. Meridiano V° recibe al Rojo con estadio lleno buscando consolidar la punta del torneo.'
  },
  // UPCOMING MATCHES
  {
    id: 'm-next-u17',
    category: 'U17',
    tournament: 'Torneo Clausura APB',
    round: 'Fecha 13',
    homeTeam: 'Club Meridiano V°',
    awayTeam: 'Platense',
    isFinished: false,
    date: '2026-09-19',
    time: '18:00',
    court: 'Microestadio Meridiano V° (Calle 67 e/ 16 y 17)',
    isLocal: true,
    summary: 'Duelo por la cima de la tabla de posiciones en categoría juveniles.'
  },
  {
    id: 'm-next-u15',
    category: 'U15',
    tournament: 'Torneo Clausura APB',
    round: 'Fecha 13',
    homeTeam: 'Estudiantes de La Plata',
    awayTeam: 'Club Meridiano V°',
    isFinished: false,
    date: '2026-09-20',
    time: '16:00',
    court: 'Sede Social Estudiantes (Calle 53 e/ 7 y 8)',
    isLocal: false,
    summary: 'Los infantiles viajan a la sede albirroja en busca de un nuevo triunfo fuera de casa.'
  },
  {
    id: 'm-next-fem',
    category: 'Básquet Femenino',
    tournament: 'Torneo Apertura Femenino',
    round: 'Semifinal',
    homeTeam: 'Club Meridiano V°',
    awayTeam: 'Gimnasia y Esgrima LP',
    isFinished: false,
    date: '2026-09-21',
    time: '19:30',
    court: 'Microestadio Meridiano V° (Calle 67 e/ 16 y 17)',
    isLocal: true,
    summary: 'Primer juego de la serie semifinal en un microestadio que promete ser una fiesta.'
  },
  {
    id: 'm-next-u21',
    category: 'U21',
    tournament: 'Torneo Oficial U21',
    round: 'Fecha 11',
    homeTeam: 'Reconquista',
    awayTeam: 'Club Meridiano V°',
    isFinished: false,
    date: '2026-09-22',
    time: '20:30',
    court: 'Gimnasio Reconquista (Calle 40)',
    isLocal: false,
    summary: 'Partidazo de juveniles en condición de visitante.'
  },

  // ÚLTIMOS RESULTADOS (CONFORME SOLICITADO EN PROMPT)
  {
    id: 'm-res-u17',
    category: 'U17',
    tournament: 'Torneo Clausura APB',
    round: 'Fecha 12',
    homeTeam: 'Club Meridiano V°',
    awayTeam: 'Atenas',
    homeScore: 72,
    awayScore: 65,
    isFinished: true,
    date: '2026-09-12',
    time: '18:30',
    court: 'Microestadio Meridiano V°',
    isLocal: true,
    summary: 'Enorme triunfo de los U17 en un cierre infartante con triple sobre la chicharra.'
  },
  {
    id: 'm-res-pri',
    category: 'Primera División',
    tournament: 'Torneo Oficial APB',
    round: 'Fecha 14',
    homeTeam: 'Club Meridiano V°',
    awayTeam: 'Unión Vecinal',
    homeScore: 81,
    awayScore: 76,
    isFinished: true,
    date: '2026-09-11',
    time: '21:30',
    court: 'Microestadio Meridiano V°',
    isLocal: true,
    summary: 'Fiesta total en Calle 67. La Primera derrotó al clásico rival con 24 puntos de Gonzalo Frangi.'
  },
  {
    id: 'm-res-u15',
    category: 'U15',
    tournament: 'Torneo Clausura APB',
    round: 'Fecha 12',
    homeTeam: 'Club Meridiano V°',
    awayTeam: 'Reconquista',
    homeScore: 58,
    awayScore: 61,
    isFinished: true,
    date: '2026-09-12',
    time: '16:00',
    court: 'Microestadio Meridiano V°',
    isLocal: true,
    summary: 'Apretada caída en un partido vibrante y parejo hasta los últimos segundos.'
  },
  {
    id: 'm-res-fem',
    category: 'Básquet Femenino',
    tournament: 'Torneo Apertura Femenino',
    round: 'Fecha 9',
    homeTeam: 'Club Meridiano V°',
    awayTeam: 'Platense',
    homeScore: 54,
    awayScore: 48,
    isFinished: true,
    date: '2026-09-08',
    time: '20:00',
    court: 'Microestadio Meridiano V°',
    isLocal: true,
    summary: 'Gran labor defensiva de las chicas para asegurar el segundo puesto en la fase regular.'
  },
  {
    id: 'm-res-u21',
    category: 'U21',
    tournament: 'Torneo Oficial U21',
    round: 'Fecha 10',
    homeTeam: 'Club Meridiano V°',
    awayTeam: 'Universal',
    homeScore: 69,
    awayScore: 64,
    isFinished: true,
    date: '2026-09-07',
    time: '20:30',
    court: 'Microestadio Meridiano V°',
    isLocal: true,
    summary: 'Victoria clave con gran despliegue físico y dominio en los rebotes ofensivos.'
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-institucional',
    title: 'Comunicado Institucional: Vida social, cultural y deportiva en Meridiano V°',
    slug: 'comunicado-institucional-meridiano-v',
    summary: 'Compartimos las novedades de la institución, la convocatoria a socios y el compromiso permanente con el barrio y el deporte.',
    content: `El Centro de Fomento Social, Cultural y Deportivo Meridiano V° continúa adelante con su misión histórica de promover el deporte, la integración vecinal y la contención comunitaria en el Barrio Sud de La Plata.\n\nInvitamos a toda la comunidad a participar de las actividades deportivas y sociales, acercarse a nuestra sede social de Calle 67 e/ 16 y 17 y sumarse como socios para continuar engrandeciendo el club de todos.\n\nAgradecemos el acompañamiento permanente de las familias, jugadoras, jugadores y simpatizantes que defienden con pasión y orgullo nuestros colores azul y blanco.`,
    date: '15 de Septiembre de 2026',
    categoryTag: 'INSTITUCIONAL',
    coverImage: '/foto4.jpg',
    gallery: [
      '/foto4.jpg',
      '/foto1.jpg'
    ],
    author: 'Comisión Directiva'
  }
];

export const INITIAL_MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'socio-deportivo',
    name: 'Socio Deportivo (Básquet)',
    category: 'deportivo',
    monthlyFee: '$18.500',
    description: 'Para jugadores/as que entrenan y compiten federados en cualquiera de nuestras categorías.',
    benefits: [
      'Participación en entrenamientos semanales con cuerpo técnico federado',
      'Ficha médica y seguro deportivo oficial de la APB',
      'Camiseta de juego y acceso al gimnasio de preparación física',
      'Entrada gratuita a todos los partidos de local de Primera División',
      'Uso de la biblioteca y espacios sociales del club'
    ],
    recommended: true
  },
  {
    id: 'socio-activo',
    name: 'Socio Activo (Hincha & Vecino)',
    category: 'social',
    monthlyFee: '$7.500',
    description: 'Para vecinos, hinchas y familias que apoyan la vida institucional y disfrutan de las instalaciones.',
    benefits: [
      'Ingreso libre y gratuito a todos los partidos locales en el Microestadio',
      'Descuento del 20% en indumentaria oficial y merchandising del club',
      'Prioridad y descuento en el alquiler del salón de fiestas y buffet',
      'Acceso irrestricto a los libros y actividades de la Biblioteca Popular',
      'Voz y voto en asambleas ordinarias anuales'
    ]
  },
  {
    id: 'socio-menor',
    name: 'Socio Cadete / Menor',
    category: 'menor',
    monthlyFee: '$9.500',
    description: 'Para niños, niñas y jóvenes de hasta 17 años que participan de escuelitas o actividades recreativas.',
    benefits: [
      'Acceso a la escuelita de iniciación deportiva y básquet recreativo',
      'Taller de lectura y actividades culturales en la biblioteca',
      'Ingreso gratuito a todos los partidos oficiales',
      'Participación en campamentos, clínicas y jornadas de mini básquet'
    ]
  },
  {
    id: 'socio-familiar',
    name: 'Plan Grupo Familiar',
    category: 'familiar',
    monthlyFee: '$26.000',
    description: 'Tarifa bonificada para grupos familiares (titular, cónyuge y hasta 3 hijos menores).',
    benefits: [
      'Cubre a toda la familia con carnet de socio individual',
      'Entrada libre para todos los integrantes a todos los partidos',
      'Descuentos combinados en aranceles de escuelitas deportivas',
      'Reserva preferencial de instalaciones y asadores'
    ]
  }
];
