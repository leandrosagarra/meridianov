export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'Base' | 'Escolta' | 'Alero' | 'Ala-Pívot' | 'Pívot' | 'Entrenador' | 'Ayudante';
  age?: number;
  height?: string;
  isCaptain?: boolean;
}

export interface TrainingSchedule {
  days: string;
  time: string;
  court: string;
}

export interface StandingItem {
  position: number;
  team: string;
  points: number;
  played: number;
  won: number;
  lost: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  ageGroup: string;
  badgeText: string;
  coach: string;
  physicalTrainer?: string;
  squadPhoto: string;
  description: string;
  trainingSchedule: TrainingSchedule;
  players: Player[];
  standings?: StandingItem[];
}

export interface Match {
  id: string;
  category: string;
  tournament: string;
  round?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  isFinished: boolean;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  court: string;
  isLocal: boolean;
  homeCrest?: string;
  awayCrest?: string;
  summary?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  date: string; // DD/MM/YYYY or YYYY-MM-DD
  categoryTag: string;
  coverImage: string;
  gallery?: string[];
  author?: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  image: string;
  highlight?: string;
}

export interface SportingAchievement {
  year: string;
  title: string;
  category: string;
  description: string;
}

export interface ClubAuthority {
  role: string;
  name: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  category: 'social' | 'deportivo' | 'menor' | 'familiar';
  monthlyFee: string;
  description: string;
  benefits: string[];
  recommended?: boolean;
}

export interface MembershipApplication {
  id: string;
  fullName: string;
  dni: string;
  birthDate: string;
  phone: string;
  email: string;
  planId: string;
  interestActivity: string;
  message?: string;
  submittedAt: string;
  status: 'pendiente' | 'contactado' | 'aprobado';
}

export interface ClubInfo {
  name: string;
  shortName: string;
  legalName: string;
  foundationDate: string;
  firstMeetingDate: string;
  slogan: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  twitter: string;
  facebook: string;
  heroImage: string;
  aboutText: string[];
  historicalPresidents: string[];
  authorities: ClubAuthority[];
  facilities: Facility[];
  achievements: SportingAchievement[];
}
