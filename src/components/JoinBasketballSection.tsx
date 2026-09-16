import React from 'react';
import { useClubData } from '../context/ClubDataContext';
import { 
  Trophy, 
  MapPin, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const JoinBasketballSection: React.FC = () => {
  const { clubInfo } = useClubData();

  const handleWhatsAppClick = () => {
    const defaultText = `¡Hola Club Meridiano V°! Vi la página web y quiero sumarme a jugar al básquet en el club. ¿Me podrían pasar información para comenzar? ¡Muchas gracias!`;
    const url = `https://wa.me/${clubInfo.whatsapp}?text=${encodeURIComponent(defaultText)}`;
    window.open(url, '_blank');
  };

  const requirements = [
    {
      title: 'Apto Físico Médico',
      desc: 'Certificado de salud extendido por médico clínico o pediatra habilitante para actividad física de mediana y alta intensidad.'
    },
    {
      title: 'Ropa Deportiva & Calzado',
      desc: 'Remera cómoda, pantalón corto y zapatillas deportivas con buen agarre (preferentemente de básquet para el parquet).'
    },
    {
      title: 'Botella de Hidratación Personal',
      desc: 'Es fundamental traer tu botella de agua individual para todos los entrenamientos.'
    },
    {
      title: 'Primera Clase de Prueba Gratuita',
      desc: 'No necesitás experiencia previa. Podés venir a entrenar y conocer al grupo sin ningún costo de inscripción en tu primera semana.'
    }
  ];

  return (
    <section id="sumate" className="py-16 sm:py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-3.5 h-3.5" />
            Nuevos Jugadores & Familias
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            ¿QUERÉS JUGAR AL BÁSQUET CON NOSOTROS?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            En Club Meridiano V° te esperamos con las puertas abiertas. Tenemos categorías desde los 4 años hasta Primera División y básquet femenino.
          </p>
        </div>

        {/* Requirements and CTA Box */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-white uppercase mb-6 flex items-center justify-center gap-2.5">
              <Sparkles className="w-5 h-5 text-blue-400" /> Requisitos para Comenzar
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {requirements.map((req, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {req.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {req.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location note */}
          <div className="mt-8 pt-5 border-t border-slate-800/80 flex items-center justify-center gap-2.5 text-xs sm:text-sm text-slate-300 text-center">
            <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              <strong>Lugar de entrenamiento:</strong> {clubInfo.address}, Microestadio Principal y Gimnasio Auxiliar.
            </span>
          </div>

          {/* BIG WHATSAPP BUTTON (QUIERO SUMARME) */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-center max-w-md mx-auto">
            <p className="text-xs text-slate-400 mb-3">
              Coordiná tu clase de prueba con la subcomisión de básquet:
            </p>

            <button
              onClick={handleWhatsAppClick}
              className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-heading font-black text-base sm:text-lg uppercase tracking-wider shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/40 transition-all transform active:scale-95 flex items-center justify-center gap-3 group"
            >
              <MessageSquare className="w-6 h-6 animate-bounce" />
              <span>QUIERO SUMARME</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <span className="block text-[11px] text-slate-400 mt-2.5">
              Te responderemos al instante por WhatsApp para indicarte día y horario.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
