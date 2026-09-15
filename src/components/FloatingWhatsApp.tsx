import React, { useState } from 'react';
import { useClubData } from '../context/ClubDataContext';
import { MessageSquare, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { clubInfo } = useClubData();
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    const text = '¡Hola Club Meridiano V°! Quisiera hacer una consulta sobre el básquet y las actividades del club.';
    const url = `https://wa.me/${clubInfo.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-end gap-3 pointer-events-auto">
      {/* Tooltip hint on mobile/desktop */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/95 border border-slate-700 text-slate-100 text-xs shadow-xl backdrop-blur animate-in fade-in duration-300">
          <span>¿Tenés dudas? Escribinos al WhatsApp</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-white"
            aria-label="Cerrar tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleClick}
        className="relative group p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center focus:outline-none"
        aria-label="Contactar por WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300 border-2 border-slate-950" />
        </span>
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
};
