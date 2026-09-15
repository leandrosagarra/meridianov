import React, { useState } from 'react';
import { useClubData } from '../context/ClubDataContext';
import { ClubCrest } from './ClubCrest';
import { 
  Building2, 
  History, 
  Users, 
  Trophy, 
  MapPin, 
  Calendar, 
  Award, 
  Sparkles,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export const ClubHistorySection: React.FC = () => {
  const { clubInfo } = useClubData();
  const [activeTab, setActiveTab] = useState<'historia' | 'instalaciones' | 'autoridades' | 'logros'>('historia');

  return (
    <section id="el-club" className="py-14 sm:py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-blue-600/15 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5" />
            Identidad & Tradición Platense
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
            EL CLUB MERIDIANO V°
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Nacidos en el corazón del Barrio Sud de La Plata en 1929. Historia, cultura, instalaciones y sentido de pertenencia.
          </p>
        </div>

        {/* Institutional Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('historia')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'historia'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-2 ring-white/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Historia & Fundación (1929)</span>
          </button>

          <button
            onClick={() => setActiveTab('instalaciones')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'instalaciones'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-2 ring-white/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Instalaciones</span>
          </button>

          <button
            onClick={() => setActiveTab('autoridades')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'autoridades'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-2 ring-white/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Autoridades & Presidentes</span>
          </button>

          <button
            onClick={() => setActiveTab('logros')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'logros'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-2 ring-white/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Logros Deportivos</span>
          </button>
        </div>

        {/* Tab 1: Historia (Nuestros Orígenes con foto1.jpg de fondo y en tarjeta) */}
        {activeTab === 'historia' && (
          <div className="relative rounded-3xl p-6 sm:p-10 border border-blue-900/60 shadow-2xl overflow-hidden">
            {/* Background foto1.jpg */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="/foto1.jpg"
                alt="Orígenes e Historia Club Meridiano V°"
                className="w-full h-full object-cover brightness-20 contrast-115 filter"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/92 to-blue-950/85" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-slate-950/60" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <ClubCrest size="md" />
                  <div>
                    <h3 className="font-heading font-black text-xl sm:text-2xl text-white uppercase">
                      Nuestros Orígenes
                    </h3>
                    <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                      Barrio Sud • La Plata
                    </p>
                  </div>
                </div>

                {/* Exact historical text */}
                <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed">
                  <p className="p-4 rounded-xl bg-slate-950/85 border border-blue-900/40 border-l-4 border-l-blue-500 backdrop-blur-sm shadow-md">
                    {clubInfo.aboutText[0]}
                  </p>
                  <p className="p-4 rounded-xl bg-slate-950/85 border border-blue-900/40 border-l-4 border-l-blue-500 backdrop-blur-sm shadow-md">
                    {clubInfo.aboutText[1]}
                  </p>
                  {clubInfo.aboutText[2] && (
                    <p className="text-slate-300 text-sm p-1">
                      {clubInfo.aboutText[2]}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-950/90 border border-blue-900/50 backdrop-blur-sm">
                    <span className="block text-[11px] text-blue-300 font-bold uppercase">1ª Sede Original</span>
                    <span className="font-bold text-white text-sm">Calle 70 n°102</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/90 border border-blue-900/50 backdrop-blur-sm">
                    <span className="block text-[11px] text-blue-300 font-bold uppercase">Sede Actual</span>
                    <span className="font-bold text-blue-400 text-sm">Calle 67 e/16 y 17 nº1080</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-blue-500/40 shadow-xl aspect-[4/3] bg-slate-950">
                  <img
                    src="/foto1.jpg"
                    alt="Plantel Histórico del Club Meridiano V°"
                    className="w-full h-full object-cover brightness-95 hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold text-xs shadow-md">
                      Archivo Histórico Oficial (1929)
                    </span>
                    <p className="text-xs text-white mt-1.5 font-medium drop-shadow">
                      Plantel pionero del básquet de Meridiano V° con la histórica camiseta de banda diagonal.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/90 border border-blue-900/50 backdrop-blur-sm flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-blue-400 shrink-0" />
                  <div className="text-xs text-slate-300">
                    <strong className="text-white block font-bold">Biblioteca Popular Meridiano V°</strong>
                    Un rasgo distintivo: deporte y cultura unidos desde la fundación en 1929.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Instalaciones */}
        {activeTab === 'instalaciones' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clubInfo.facilities.map((facility) => (
              <div
                key={facility.id}
                className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md flex flex-col group hover:border-blue-500/40 transition-colors"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {facility.highlight && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-bold bg-blue-950/90 text-blue-300 border border-blue-400/40 backdrop-blur shadow">
                      {facility.highlight}
                    </span>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-heading font-black text-lg text-white uppercase mb-2">
                      {facility.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-blue-400 font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Sede Social: Calle 67 e/16 y 17 nº1080</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Autoridades & Presidentes */}
        {activeTab === 'autoridades' && (
          <div className="space-y-8">
            {/* Current Board */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800">
              <h3 className="font-heading font-black text-xl sm:text-2xl text-white uppercase mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-400" /> Comisión Directiva Actual
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {clubInfo.authorities.map((auth, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-900/60 transition-colors"
                  >
                    <span className="block text-[11px] text-blue-400 font-bold uppercase tracking-wider">
                      {auth.role}
                    </span>
                    <span className="font-semibold text-sm sm:text-base text-white mt-0.5 block">
                      {auth.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Historical Presidents */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800">
              <div className="mb-6">
                <h3 className="font-heading font-black text-xl sm:text-2xl text-white uppercase flex items-center gap-2">
                  <History className="w-6 h-6 text-blue-400" /> Galería de Presidentes Históricos
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Hombres y vecinos que con esfuerzo y dedicación contribuyeron para que esta institución esté en el lugar que hoy se encuentra.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {clubInfo.historicalPresidents.map((pres, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                    <span className="font-medium truncate" title={pres}>{pres}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Logros Deportivos */}
        {activeTab === 'logros' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {clubInfo.achievements.map((ach, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden flex gap-4 items-start hover:border-blue-500/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading font-black text-sm text-blue-400">
                      {ach.year}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                      {ach.category}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-base sm:text-lg text-white mb-1">
                    {ach.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {ach.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
