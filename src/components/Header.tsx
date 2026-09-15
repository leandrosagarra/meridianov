import React, { useState, useEffect } from 'react';
import { ClubCrest } from './ClubCrest';
import { useClubData } from '../context/ClubDataContext';
import { 
  Menu, 
  X, 
  UserPlus, 
  Shield, 
  Instagram, 
  Phone, 
  Calendar, 
  Users, 
  Newspaper, 
  Building2, 
  MessageSquare
} from 'lucide-react';

interface HeaderProps {
  onOpenAdmin: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAdmin,
  activeSection,
  onNavigate
}) => {
  const { clubInfo, isAdminLoggedIn } = useClubData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'equipos', label: 'Nuestros Equipos' },
    { id: 'noticias', label: 'Noticias' },
    { id: 'el-club', label: 'El Club' },
    { id: 'sumate', label: 'Sumate a Jugar' },
    { id: 'contacto', label: 'Contacto' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-blue-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              {clubInfo.legalName} • Fundado en 1929
            </span>
            <span className="text-slate-400">
              {clubInfo.address}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={clubInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors flex items-center gap-1"
              title="Instagram Oficial"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span className="hidden md:inline">@clubmeridianov</span>
            </a>
            <a
              href={`https://wa.me/${clubInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
              title="WhatsApp del Club"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Consultas</span>
            </a>

            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded transition-all ${
                isAdminLoggedIn
                  ? 'bg-blue-600 text-white border border-blue-400 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Panel de Administración"
            >
              <Shield className="w-3 h-3 text-blue-400" />
              <span>{isAdminLoggedIn ? 'Panel Activo' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-slate-800/80 py-2.5'
            : 'bg-slate-900 border-b border-slate-800 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Escudo */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="Ir al inicio"
          >
            <ClubCrest size="md" />
            <div className="flex flex-col">
              <span className="font-heading font-black text-lg sm:text-xl text-white tracking-tight group-hover:text-blue-400 transition-colors">
                MERIDIANO V°
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-blue-400">
                Básquetbol • La Plata
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-white bg-blue-600 font-bold shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA Buttons (Asociate al club) */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => handleNavClick('asociate')}
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all transform active:scale-95 ring-1 ring-white/30"
            >
              <UserPlus className="w-4 h-4" />
              <span>ASOCIATE AL CLUB</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('asociate')}
              className="sm:hidden px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg shadow-sm"
            >
              Asociate
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              ))}

              <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                <button
                  onClick={() => handleNavClick('asociate')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>SOLAPA: ASOCIATE AL CLUB</span>
                </button>

                <div className="flex items-center justify-between pt-2 px-1 text-xs text-slate-400">
                  <a
                    href={`https://wa.me/${clubInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-emerald-400 font-medium"
                  >
                    <MessageSquare className="w-4 h-4" /> WhatsApp Oficial
                  </a>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="flex items-center gap-1 text-slate-400 hover:text-blue-400"
                  >
                    <Shield className="w-3.5 h-3.5 text-blue-400" /> Admin
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
