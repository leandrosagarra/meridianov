import React from 'react';
import { ClubCrest } from './ClubCrest';
import { useClubData } from '../context/ClubDataContext';
import { 
  Instagram, 
  Facebook, 
  MapPin, 
  Mail, 
  Phone, 
  Shield, 
  Heart, 
  UserPlus,
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onNavigate }) => {
  const { clubInfo } = useClubData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <ClubCrest size="md" />
              <div>
                <span className="font-heading font-black text-xl text-white uppercase tracking-tight block">
                  {clubInfo.name}
                </span>
                <span className="text-xs text-blue-400 font-semibold tracking-wider uppercase block">
                  {clubInfo.legalName}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              "{clubInfo.slogan}". Institución social, cultural y deportiva fundada en La Plata el 19 de Abril de 1929. Cuna de básquetbol y punto de encuentro comunitario.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={clubInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-pink-500/50 flex items-center justify-center text-slate-300 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={clubInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/50 flex items-center justify-center text-slate-300 hover:text-sky-400 transition-colors"
                aria-label="X Twitter"
              >
                <span className="font-heading font-black text-xs">𝕏</span>
              </a>
              <a
                href={clubInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 flex items-center justify-center text-slate-300 hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-black text-xs uppercase tracking-wider text-white">
              Básquet & Torneos
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('proximo-partido')} className="hover:text-blue-400 transition-colors text-left">
                  Próximo Partido
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ultimos-resultados')} className="hover:text-blue-400 transition-colors text-left">
                  Últimos Resultados
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('fixture')} className="hover:text-blue-400 transition-colors text-left">
                  Fixture Completo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('equipos')} className="hover:text-blue-400 transition-colors text-left">
                  Nuestros Equipos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sumate')} className="hover:text-blue-300 transition-colors text-left text-blue-400 font-semibold">
                  Sumate a Jugar
                </button>
              </li>
            </ul>
          </div>

          {/* Institution Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-black text-xs uppercase tracking-wider text-white">
              Institucional
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('el-club')} className="hover:text-blue-400 transition-colors text-left">
                  Historia & Fundación (1929)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('el-club')} className="hover:text-blue-400 transition-colors text-left">
                  Microestadio e Instalaciones
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('noticias')} className="hover:text-blue-400 transition-colors text-left">
                  Noticias & Actualidad
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('asociate')} className="hover:text-blue-300 transition-colors text-left font-bold text-blue-400 inline-flex items-center gap-1">
                  <UserPlus className="w-3.5 h-3.5" /> Solapa: Asociate al Club
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-heading font-black text-xs uppercase tracking-wider text-white">
              Sede Social
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>{clubInfo.address}, {clubInfo.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{clubInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">{clubInfo.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} {clubInfo.legalName}. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-blue-400 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Administración del Sitio</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Volver arriba"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
