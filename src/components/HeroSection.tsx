import React from 'react';
import { useClubData } from '../context/ClubDataContext';
import { ClubCrest } from './ClubCrest';
import { 
  Calendar, 
  Trophy, 
  Users, 
  Newspaper, 
  UserPlus, 
  Flame,
  Sparkles
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { clubInfo } = useClubData();

  return (
    <section className="relative min-h-[600px] lg:min-h-[680px] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Hero Image (foto4.jpg) with blue/dark contrast overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/foto4.jpg"
          alt="Cancha y Pelotas de Básquet Club Meridiano V°"
          className="w-full h-full object-cover object-center brightness-40 contrast-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = clubInfo.heroImage;
          }}
        />
        {/* Blue and dark institutional contrast gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-blue-950/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700/25 via-transparent to-slate-950/70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center flex flex-col items-center">
        {/* Foundation badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-200 text-xs sm:text-sm font-semibold tracking-wide shadow-lg backdrop-blur mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Fundado el 19 de Abril de 1929 • La Plata</span>
        </div>

        {/* Club Crest with logo.jpg */}
        <div className="mb-4 transform hover:scale-105 transition-transform">
          <ClubCrest size="xl" />
        </div>

        {/* Club Name */}
        <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none uppercase drop-shadow-xl">
          {clubInfo.name}
        </h1>

        {/* Institutional slogan */}
        <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-blue-100 tracking-wide drop-shadow-md max-w-2xl italic font-serif">
          "{clubInfo.slogan}"
        </p>

        <p className="mt-2 text-sm sm:text-base text-slate-200 max-w-xl font-normal drop-shadow">
          El histórico club de básquet del barrio Meridiano V°. Formación deportiva, valores y pasión colectiva en cada categoría.
        </p>

        {/* ACCESOS RÁPIDOS DIRECTOS */}
        <div className="mt-8 sm:mt-10 w-full">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-300/80 mb-3">
            Accesos rápidos
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
            <button
              onClick={() => onNavigate('proximo-partido')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white text-sm font-semibold border border-slate-700/80 hover:border-blue-400/60 shadow-md transition-all active:scale-95"
            >
              <Flame className="w-4 h-4 text-blue-400" />
              <span>Próximo partido</span>
            </button>

            <button
              onClick={() => onNavigate('fixture')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white text-sm font-semibold border border-slate-700/80 hover:border-blue-400/60 shadow-md transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Fixture</span>
            </button>

            <button
              onClick={() => onNavigate('equipos')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white text-sm font-semibold border border-slate-700/80 hover:border-blue-400/60 shadow-md transition-all active:scale-95"
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span>Equipos</span>
            </button>

            <button
              onClick={() => onNavigate('noticias')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white text-sm font-semibold border border-slate-700/80 hover:border-blue-400/60 shadow-md transition-all active:scale-95"
            >
              <Newspaper className="w-4 h-4 text-blue-400" />
              <span>Noticias</span>
            </button>

            <button
              onClick={() => onNavigate('sumate')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-blue-200 text-sm font-semibold border border-blue-500/40 hover:border-blue-400 shadow-md transition-all active:scale-95"
            >
              <Trophy className="w-4 h-4 text-blue-400" />
              <span>Sumate al club</span>
            </button>

            <button
              onClick={() => onNavigate('asociate')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-95 ring-2 ring-white/20"
            >
              <UserPlus className="w-4 h-4" />
              <span>Asociate</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Counters - 3 clean balanced columns */}
        <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-2xl pt-6 border-t border-slate-800/80 text-center">
          <div className="p-2">
            <span className="block font-heading font-black text-2xl sm:text-4xl text-white">1929</span>
            <span className="text-xs sm:text-sm text-blue-300 font-medium">Año de Fundación</span>
          </div>
          <div className="p-2">
            <span className="block font-heading font-black text-2xl sm:text-4xl text-blue-400">+250</span>
            <span className="text-xs sm:text-sm text-slate-300 font-medium">Jugadores/as</span>
          </div>
          <div className="p-2">
            <span className="block font-heading font-black text-2xl sm:text-4xl text-white">7</span>
            <span className="text-xs sm:text-sm text-blue-300 font-medium">Categorías APB</span>
          </div>
        </div>
      </div>
    </section>
  );
};
