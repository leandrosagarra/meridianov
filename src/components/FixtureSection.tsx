import React, { useState } from 'react';
import { useClubData } from '../context/ClubDataContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Filter, 
  CheckCircle, 
  Hourglass, 
  ChevronDown 
} from 'lucide-react';

export const FixtureSection: React.FC = () => {
  const { matches } = useClubData();

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<'all' | 'local' | 'visitor'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'finished'>('all');

  const categories = ['all', ...Array.from(new Set(matches.map(m => m.category)))];

  const filteredMatches = matches.filter(match => {
    // Category match
    if (selectedCategory !== 'all' && match.category !== selectedCategory) {
      return false;
    }
    // Location filter
    if (locationFilter === 'local' && !match.isLocal) return false;
    if (locationFilter === 'visitor' && match.isLocal) return false;

    // Status filter
    if (statusFilter === 'upcoming' && match.isFinished) return false;
    if (statusFilter === 'finished' && !match.isFinished) return false;

    return true;
  });

  const formatDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-');
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return date.toLocaleDateString('es-AR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="fixture" className="py-14 sm:py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5" />
            Calendario Oficial APB
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
            FIXTURE Y PARTIDOS
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Consultá las fechas, horarios y estadios de todas las categorías de nuestro club.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Categoría
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 font-medium focus:outline-none focus:border-blue-400"
                >
                  <option value="all">Todas las categorías</option>
                  {categories.filter(c => c !== 'all').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Local / Visitor */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Condición
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => setLocationFilter('all')}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    locationFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setLocationFilter('local')}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    locationFilter === 'local'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Local
                </button>
                <button
                  onClick={() => setLocationFilter('visitor')}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    locationFilter === 'visitor'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Visitante
                </button>
              </div>
            </div>

            {/* Status (Upcoming / Finished) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Estado
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    statusFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setStatusFilter('upcoming')}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    statusFilter === 'upcoming'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Próximos
                </button>
                <button
                  onClick={() => setStatusFilter('finished')}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    statusFilter === 'finished'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Jugados
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Matches Grid */}
        {filteredMatches.length === 0 ? (
          <div className="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No se encontraron partidos con los filtros seleccionados.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setLocationFilter('all');
                setStatusFilter('all');
              }}
              className="mt-3 px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-blue-400 text-xs font-semibold rounded-lg"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                className={`relative rounded-2xl p-5 border transition-all ${
                  match.isFinished
                    ? 'bg-slate-900/60 border-slate-800/80 opacity-90'
                    : 'bg-slate-900 border-slate-700/80 shadow-md hover:border-blue-500/50'
                }`}
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-xs uppercase px-2.5 py-0.5 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30">
                      {match.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      {match.tournament}
                    </span>
                  </div>

                  {match.isFinished ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                      Finalizado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-300 bg-blue-600/20 border border-blue-500/40 px-2 py-0.5 rounded animate-pulse">
                      <Hourglass className="w-3 h-3" />
                      Próximamente
                    </span>
                  )}
                </div>

                {/* Match Faceoff */}
                <div className="grid grid-cols-5 items-center py-2 text-center">
                  <div className="col-span-2 text-left">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                      {match.isLocal ? 'Local (Club)' : 'Local'}
                    </p>
                    <p className={`font-heading font-black text-base sm:text-lg leading-tight uppercase ${
                      match.homeTeam.includes('Meridiano') ? 'text-blue-400' : 'text-white'
                    }`}>
                      {match.homeTeam}
                    </p>
                  </div>

                  <div className="col-span-1 flex flex-col items-center justify-center">
                    {match.isFinished ? (
                      <div className="font-heading font-black text-xl text-white tracking-wider tabular-nums px-2 py-0.5 rounded bg-slate-950">
                        {match.homeScore} - {match.awayScore}
                      </div>
                    ) : (
                      <span className="w-8 h-8 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center font-heading font-black text-blue-400 text-xs">
                        VS
                      </span>
                    )}
                  </div>

                  <div className="col-span-2 text-right">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                      {!match.isLocal ? 'Visitante (Club)' : 'Visitante'}
                    </p>
                    <p className={`font-heading font-black text-base sm:text-lg leading-tight uppercase ${
                      match.awayTeam.includes('Meridiano') ? 'text-blue-400' : 'text-white'
                    }`}>
                      {match.awayTeam}
                    </p>
                  </div>
                </div>

                {/* Footer details: Date, Time, Court */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span className="capitalize">{formatDate(match.date)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{match.time} hs</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-slate-400 truncate max-w-full">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="truncate" title={match.court}>
                      {match.court}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
