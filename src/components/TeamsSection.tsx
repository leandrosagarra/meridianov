import React, { useState } from 'react';
import { useClubData } from '../context/ClubDataContext';
import { Category, Player } from '../types';
import { 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  X, 
  Shirt, 
  ChevronRight, 
  Star,
  UserCheck
} from 'lucide-react';

export const TeamsSection: React.FC = () => {
  const { categories, matches } = useClubData();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // When a category is clicked, get its matches
  const categoryMatches = selectedCategory
    ? matches.filter(m => m.category.toLowerCase().includes(selectedCategory.name.toLowerCase()) || 
                          (selectedCategory.id === 'mini' && m.category.includes('Mini')) ||
                          (selectedCategory.id === 'primera' && m.category.includes('Primera')) ||
                          (selectedCategory.id === 'femenino' && m.category.includes('Femenino')) ||
                          m.category === selectedCategory.name)
    : [];

  const categoryUpcoming = categoryMatches.filter(m => !m.isFinished);
  const categoryResults = categoryMatches.filter(m => m.isFinished);

  return (
    <section id="equipos" className="py-14 sm:py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            Básquetbol Formativo y Competitivo
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
            NUESTROS EQUIPOS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Desde la iniciación deportiva en escuelita hasta nuestro plantel superior de Primera División. Hacé clic en cualquier categoría para conocer a su plantel, cuerpo técnico y horarios.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-blue-500/60 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                <img
                  src={cat.squadPhoto}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-85 group-hover:brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-600 text-white shadow">
                    {cat.badgeText}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-heading font-black text-xl text-white group-hover:text-blue-400 transition-colors uppercase">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-slate-300 font-medium block mt-0.5">
                    {cat.ageGroup}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="truncate">
                      <strong className="text-white">DT:</strong> {cat.coach}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="truncate">{cat.trainingSchedule.days}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:text-blue-300">
                  <span>Ver plantel y fixture</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY DETAILS MODAL */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full shrink-0 overflow-hidden bg-slate-950">
              <img
                src={selectedCategory.squadPhoto}
                alt={selectedCategory.name}
                className="w-full h-full object-cover object-center brightness-70"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-200 hover:text-white hover:bg-slate-900 border border-slate-700 transition-colors z-10"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 sm:left-6 right-6">
                <span className="px-2.5 py-1 rounded bg-blue-600 text-white font-black text-xs uppercase tracking-wider">
                  {selectedCategory.badgeText}
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mt-1.5">
                  {selectedCategory.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  {selectedCategory.ageGroup}
                </p>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
              {/* Category Bio */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {selectedCategory.description}
              </p>

              {/* Staff & Schedule Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4" /> Cuerpo Técnico
                  </h4>
                  <div className="text-sm text-slate-200 space-y-1">
                    <p><strong className="text-white">Director Técnico:</strong> {selectedCategory.coach}</p>
                    {selectedCategory.physicalTrainer && (
                      <p><strong className="text-white">Preparador Físico:</strong> {selectedCategory.physicalTrainer}</p>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Días y Horarios de Entrenamiento
                  </h4>
                  <div className="text-sm text-slate-200 space-y-1">
                    <p><strong className="text-white">Días:</strong> {selectedCategory.trainingSchedule.days}</p>
                    <p><strong className="text-white">Horario:</strong> {selectedCategory.trainingSchedule.time}</p>
                    <p><strong className="text-white">Cancha:</strong> {selectedCategory.trainingSchedule.court}</p>
                  </div>
                </div>
              </div>

              {/* Roster / Plantel de Jugadores */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-heading font-black text-lg text-white uppercase tracking-wide flex items-center gap-2">
                    <Shirt className="w-5 h-5 text-blue-400" /> Plantel de Jugadores ({selectedCategory.players.length})
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {selectedCategory.players.map((player) => (
                    <div
                      key={player.id}
                      className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center font-heading font-black text-blue-400 text-sm shrink-0">
                          #{player.number}
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-sm text-slate-100 truncate block">
                            {player.name}
                          </span>
                          <span className="text-[11px] text-slate-400 block">
                            {player.position} {player.age ? `• ${player.age} años` : ''}
                          </span>
                        </div>
                      </div>

                      {player.isCaptain && (
                        <span className="px-1.5 py-0.5 rounded bg-blue-600/30 text-blue-300 text-[10px] font-bold border border-blue-500/50 uppercase">
                          Capitán
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Standings if available */}
              {selectedCategory.standings && selectedCategory.standings.length > 0 && (
                <div>
                  <h4 className="font-heading font-black text-lg text-white uppercase tracking-wide flex items-center gap-2 mb-3">
                    <Trophy className="w-5 h-5 text-blue-400" /> Tabla de Posiciones
                  </h4>
                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-xs text-left text-slate-300">
                      <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px]">
                        <tr>
                          <th className="py-2.5 px-3">Pos</th>
                          <th className="py-2.5 px-3">Equipo</th>
                          <th className="py-2.5 px-3 text-center">PTS</th>
                          <th className="py-2.5 px-3 text-center">PJ</th>
                          <th className="py-2.5 px-3 text-center">PG</th>
                          <th className="py-2.5 px-3 text-center">PP</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-slate-950/40">
                        {selectedCategory.standings.map((row) => (
                          <tr
                            key={row.team}
                            className={row.team.includes('Meridiano') ? 'bg-blue-600/15 font-bold text-blue-300' : ''}
                          >
                            <td className="py-2 px-3">{row.position}°</td>
                            <td className="py-2 px-3 font-medium">{row.team}</td>
                            <td className="py-2 px-3 text-center font-bold text-white">{row.points}</td>
                            <td className="py-2 px-3 text-center">{row.played}</td>
                            <td className="py-2 px-3 text-center text-emerald-400">{row.won}</td>
                            <td className="py-2 px-3 text-center text-rose-400">{row.lost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                ¿Querés probarte en esta categoría? Comunicate con la secretaría.
              </span>
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
