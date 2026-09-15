import React from 'react';
import { useClubData } from '../context/ClubDataContext';
import { ClubCrest } from './ClubCrest';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  ArrowRight, 
  Share2, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface NextMatchSectionProps {
  onViewFixture: () => void;
}

export const NextMatchSection: React.FC<NextMatchSectionProps> = ({ onViewFixture }) => {
  const { matches, clubInfo } = useClubData();

  // Find next upcoming match (default to featured or first non-finished)
  const nextMatch = matches.find(m => !m.isFinished) || matches[0];

  if (!nextMatch) return null;

  // Format date nicely
  const formatDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-');
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return date.toLocaleDateString('es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="proximo-partido" className="py-12 sm:py-16 bg-slate-900 border-y border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/15 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              Partidos Destacados
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
              PRÓXIMO PARTIDO
            </h2>
          </div>

          <button
            onClick={onViewFixture}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <span>VER FIXTURE COMPLETO</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Card */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-900/40 shadow-2xl p-6 sm:p-8 md:p-10">
          {/* Subtle court line background decoration */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border-8 border-blue-500/10 pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full border-8 border-blue-500/10 pointer-events-none" />

          {/* Tournament & Category Tag */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wide shadow-sm">
                {nextMatch.category}
              </span>
              <span className="text-slate-300 text-xs sm:text-sm font-medium">
                {nextMatch.tournament} {nextMatch.round ? `• ${nextMatch.round}` : ''}
              </span>
            </div>

            <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {nextMatch.isLocal ? 'JUGAMOS DE LOCAL' : 'CONDICIÓN VISITANTE'}
            </div>
          </div>

          {/* Teams Face-off Banner */}
          <div className="relative z-10 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-11 items-center gap-6 sm:gap-8 text-center">
            {/* Team 1 (Home) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-950/80 border border-blue-900/50 shadow-lg mb-3">
                <ClubCrest size="xl" />
              </div>
              <h3 className="font-heading font-black text-xl sm:text-2xl lg:text-3xl text-white uppercase tracking-tight">
                {nextMatch.homeTeam}
              </h3>
              <span className="text-xs font-semibold text-blue-400 mt-1 uppercase tracking-wider">
                {nextMatch.homeTeam.includes('Meridiano') ? 'Meridiano V°' : 'Local'}
              </span>
            </div>

            {/* VS Divider */}
            <div className="md:col-span-1 flex flex-col items-center justify-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="font-heading font-black text-white text-lg sm:text-xl">
                  VS
                </span>
              </div>
            </div>

            {/* Team 2 (Away) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-lg mb-3 flex items-center justify-center p-3">
                {/* Athletic Opponent Crest */}
                <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-300 font-heading font-black text-2xl">
                  {nextMatch.awayTeam.substring(0, 3).toUpperCase()}
                </div>
              </div>
              <h3 className="font-heading font-black text-xl sm:text-2xl lg:text-3xl text-white uppercase tracking-tight">
                {nextMatch.awayTeam}
              </h3>
              <span className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                {nextMatch.awayTeam.includes('Meridiano') ? 'Meridiano V°' : 'Rival'}
              </span>
            </div>
          </div>

          {/* Match Details: Day, Time, Court */}
          <div className="relative z-10 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-200">
            {/* Day */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="p-2.5 rounded-lg bg-blue-600/20 text-blue-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 font-medium uppercase tracking-wider">Día</span>
                <span className="font-bold text-sm sm:text-base capitalize text-white">
                  {formatDate(nextMatch.date)}
                </span>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="p-2.5 rounded-lg bg-blue-600/20 text-blue-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 font-medium uppercase tracking-wider">Horario</span>
                <span className="font-bold text-sm sm:text-base text-white">
                  {nextMatch.time} hs
                </span>
              </div>
            </div>

            {/* Court / Stadium */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="p-2.5 rounded-lg bg-blue-600/20 text-blue-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] text-slate-400 font-medium uppercase tracking-wider">Cancha / Estadio</span>
                <span className="font-bold text-sm sm:text-base truncate block text-white" title={nextMatch.court}>
                  {nextMatch.court}
                </span>
              </div>
            </div>
          </div>

          {nextMatch.summary && (
            <p className="mt-4 text-xs sm:text-sm text-slate-400 text-center italic">
              "{nextMatch.summary}"
            </p>
          )}

          {/* CTA Footer */}
          <div className="mt-6 pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onViewFixture}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-heading font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/30 ring-1 ring-white/20 transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>VER FIXTURE COMPLETO</span>
            </button>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `¡Vení a alentar a Meridiano V°! Próximo partido de Básquet: ${nextMatch.homeTeam} vs ${nextMatch.awayTeam} (${nextMatch.category}) este ${formatDate(nextMatch.date)} a las ${nextMatch.time} hs en ${nextMatch.court}. ¡Vamos el club!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 transition-colors"
            >
              <Share2 className="w-4 h-4 text-blue-400" />
              <span>Compartir con amigos</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
