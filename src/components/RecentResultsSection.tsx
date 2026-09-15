import React, { useState } from 'react';
import { useClubData } from '../context/ClubDataContext';
import { Trophy, ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';

interface RecentResultsSectionProps {
  onOpenCategory?: (categoryId: string) => void;
  onOpenAdmin?: () => void;
}

export const RecentResultsSection: React.FC<RecentResultsSectionProps> = ({
  onOpenCategory,
  onOpenAdmin
}) => {
  const { matches, isAdminLoggedIn } = useClubData();
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Filter finished matches with scores
  const finishedMatches = matches.filter(m => m.isFinished && m.homeScore !== undefined && m.awayScore !== undefined);

  // Extract unique categories from finished matches
  const availableCategories = Array.from(new Set(finishedMatches.map(m => m.category)));

  const filtered = filterCategory === 'all'
    ? finishedMatches
    : finishedMatches.filter(m => m.category === filterCategory);

  return (
    <section id="ultimos-resultados" className="py-12 sm:py-16 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Trophy className="w-3.5 h-3.5" />
              Marcadores Oficiales
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
              ÚLTIMOS RESULTADOS
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Marcadores y resultados de nuestras categorías en los torneos oficiales de básquetbol.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos
            </button>
            {availableCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map(match => {
            const isClubHome = match.homeTeam.toLowerCase().includes('meridiano') || match.isLocal;
            const clubWon = isClubHome
              ? (match.homeScore || 0) > (match.awayScore || 0)
              : (match.awayScore || 0) > (match.homeScore || 0);

            return (
              <div
                key={match.id}
                className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                {/* Result Status Accent Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 ${
                    clubWon ? 'bg-emerald-400' : 'bg-blue-600'
                  }`}
                />

                {/* Header: Category & Date */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-xs uppercase px-2.5 py-1 rounded bg-blue-600/20 text-blue-400">
                      {match.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {match.round || 'Fecha Oficial'}
                    </span>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      clubWon
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {clubWon ? 'VICTORIA' : 'DISPUTADO'}
                  </span>
                </div>

                {/* Scoreboard block */}
                <div className="space-y-3">
                  {/* Home Team */}
                  <div
                    className={`flex items-center justify-between p-2.5 rounded-xl transition-colors ${
                      match.homeScore! > match.awayScore!
                        ? 'bg-slate-800/80 font-bold text-white'
                        : 'bg-slate-950/40 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          match.homeTeam.includes('Meridiano')
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {match.homeTeam.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="truncate text-sm sm:text-base font-semibold">
                        {match.homeTeam}
                      </span>
                    </div>
                    <span
                      className={`font-heading font-black text-2xl sm:text-3xl shrink-0 tabular-nums ${
                        match.homeScore! > match.awayScore!
                          ? 'text-blue-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {match.homeScore}
                    </span>
                  </div>

                  {/* Away Team */}
                  <div
                    className={`flex items-center justify-between p-2.5 rounded-xl transition-colors ${
                      match.awayScore! > match.homeScore!
                        ? 'bg-slate-800/80 font-bold text-white'
                        : 'bg-slate-950/40 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          match.awayTeam.includes('Meridiano')
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {match.awayTeam.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="truncate text-sm sm:text-base font-semibold">
                        {match.awayTeam}
                      </span>
                    </div>
                    <span
                      className={`font-heading font-black text-2xl sm:text-3xl shrink-0 tabular-nums ${
                        match.awayScore! > match.homeScore!
                          ? 'text-blue-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {match.awayScore}
                    </span>
                  </div>
                </div>

                {/* Footer notes & Court */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="truncate" title={match.court}>
                    📍 {match.court.replace(/\(.*\)/, '').trim()}
                  </span>
                  <span className="shrink-0">{match.date}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Admin hint */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Los resultados son actualizados semanalmente por la secretaría deportiva desde el panel de administración.
          </p>
        </div>
      </div>
    </section>
  );
};
