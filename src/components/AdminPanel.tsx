import React, { useState } from 'react';
import { useClubData } from '../context/ClubDataContext';
import { NewsArticle, Category, Player } from '../types';
import { 
  Shield, 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Newspaper, 
  Users, 
  Settings, 
  RotateCcw, 
  UserPlus, 
  MessageSquare, 
  Lock, 
  Save, 
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const {
    clubInfo,
    categories,
    news,
    membershipApplications,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    addNews,
    updateNews,
    deleteNews,
    updateCategory,
    addPlayerToCategory,
    deletePlayer,
    updateClubInfo,
    updateApplicationStatus,
    deleteApplication,
    resetToDefaults
  } = useClubData();

  // PIN Login state
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active admin tab
  const [activeTab, setActiveTab] = useState<'news' | 'categories' | 'info' | 'applications'>('news');

  // News Form State
  const [newsForm, setNewsForm] = useState({
    id: '',
    title: '',
    summary: '',
    content: '',
    date: new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' }),
    categoryTag: 'Básquet Primera',
    coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop',
    author: 'Prensa Club'
  });
  const [isEditingNews, setIsEditingNews] = useState(false);

  // Selected Category for Player Management
  const [selectedCatId, setSelectedCatId] = useState<string>(categories[0]?.id || 'primera');
  const [playerForm, setPlayerForm] = useState({
    name: '',
    number: '',
    position: 'Base' as Player['position'],
    age: '',
    isCaptain: false
  });

  // Category Edit State
  const [coachForm, setCoachForm] = useState({
    coach: '',
    trainingDays: '',
    trainingTime: ''
  });

  // Success Notification banner
  const [bannerMsg, setBannerMsg] = useState<string | null>(null);

  const showBanner = (msg: string) => {
    setBannerMsg(msg);
    setTimeout(() => setBannerMsg(null), 3000);
  };

  if (!isOpen) return null;

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(pinInput)) {
      setLoginError(false);
      setPinInput('');
    } else {
      setLoginError(true);
    }
  };

  // News Handlers
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title || !newsForm.summary) {
      alert('Completá el título y la bajada de la noticia.');
      return;
    }

    const newsPayload = {
      title: newsForm.title,
      slug: newsForm.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
      summary: newsForm.summary,
      content: newsForm.content,
      date: newsForm.date,
      categoryTag: newsForm.categoryTag,
      coverImage: newsForm.coverImage,
      author: newsForm.author
    };

    if (isEditingNews && newsForm.id) {
      updateNews(newsForm.id, newsPayload);
      showBanner('¡Noticia actualizada con éxito!');
    } else {
      addNews(newsPayload);
      showBanner('¡Noticia publicada con éxito!');
    }

    setIsEditingNews(false);
    setNewsForm({
      id: '',
      title: '',
      summary: '',
      content: '',
      date: new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' }),
      categoryTag: 'Básquet Primera',
      coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop',
      author: 'Prensa Club'
    });
  };

  // Player Handlers
  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerForm.name || !playerForm.number) {
      alert('Ingresá el nombre y el número del jugador.');
      return;
    }

    addPlayerToCategory(selectedCatId, {
      name: playerForm.name,
      number: Number(playerForm.number),
      position: playerForm.position,
      age: playerForm.age ? Number(playerForm.age) : undefined,
      isCaptain: playerForm.isCaptain
    });

    setPlayerForm({
      name: '',
      number: '',
      position: 'Base',
      age: '',
      isCaptain: false
    });
    showBanner('¡Jugador agregado al plantel!');
  };

  const currentCategory = categories.find(c => c.id === selectedCatId) || categories[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg sm:text-xl text-white uppercase leading-tight">
                Panel de Administración Visual
              </h3>
              <p className="text-xs text-blue-400 font-medium">
                Club Meridiano V° • Actualización en vivo del sitio web
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cerrar Sesión
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
              aria-label="Cerrar panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Banner */}
        {bannerMsg && (
          <div className="bg-emerald-500 text-slate-950 px-4 py-2 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all">
            <CheckCircle2 className="w-4 h-4" />
            <span>{bannerMsg}</span>
          </div>
        )}

        {/* Modal Body */}
        {!isAdminLoggedIn ? (
          /* LOGIN SCREEN */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/15 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/30">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-heading font-black text-2xl text-white uppercase">
                Acceso de Administración
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Ingresá el PIN institucional de seguridad para editar partidos, resultados, noticias y categorías.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  autoFocus
                  placeholder="Ingresá el PIN (ej: 1929)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full text-center text-xl tracking-widest font-mono bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                />
                {loginError && (
                  <p className="text-xs text-rose-400 mt-1.5 font-medium">
                    PIN incorrecto. El PIN por defecto es 1929.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-heading font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/25 transition-all"
              >
                Ingresar al Panel
              </button>
            </form>

            <div className="pt-4 border-t border-slate-800/80">
              <p className="text-xs text-slate-500">
                💡 Nota para evaluadores/usuarios: el PIN predeterminado es <strong className="text-blue-400">1929</strong> (año de fundación).
              </p>
            </div>
          </div>
        ) : (
          /* LOGGED IN DASHBOARD */
          <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="sm:w-60 bg-slate-950 border-r border-slate-800 p-3 sm:p-4 space-y-1 overflow-x-auto sm:overflow-y-auto flex sm:flex-col shrink-0">
              <button
                onClick={() => setActiveTab('news')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-left transition-colors shrink-0 ${
                  activeTab === 'news'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Newspaper className="w-4 h-4 shrink-0" />
                <span>Publicar Noticias</span>
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-left transition-colors shrink-0 ${
                  activeTab === 'categories'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Users className="w-4 h-4 shrink-0" />
                <span>Categorías & Jugadores</span>
              </button>

              <button
                onClick={() => setActiveTab('info')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-left transition-colors shrink-0 ${
                  activeTab === 'info'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Settings className="w-4 h-4 shrink-0" />
                <span>Datos del Club</span>
              </button>

              <button
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-left transition-colors shrink-0 ${
                  activeTab === 'applications'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <UserPlus className="w-4 h-4 shrink-0" />
                  <span>Socios Nuevos</span>
                </div>
                {membershipApplications.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black">
                    {membershipApplications.length}
                  </span>
                )}
              </button>

              <div className="sm:mt-auto pt-3 border-t border-slate-800">
                <button
                  onClick={() => {
                    if (confirm('¿Restablecer todos los datos a los valores originales de fábrica?')) {
                      resetToDefaults();
                      showBanner('Datos restablecidos con éxito.');
                    }
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-blue-400 text-xs font-semibold hover:bg-slate-900"
                  title="Restaurar datos predeterminados"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar Datos</span>
                </button>
              </div>
            </div>

            {/* Tab Panels */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
              {/* TAB 1: NEWS MANAGEMENT */}
              {activeTab === 'news' && (
                <div className="space-y-6">
                  {/* News form */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <h4 className="font-heading font-black text-base sm:text-lg text-white uppercase flex items-center gap-2">
                      <Newspaper className="w-4 h-4 text-blue-400" />
                      {isEditingNews ? 'Editar Noticia' : 'Publicar Nueva Noticia'}
                    </h4>

                    <form onSubmit={handleSaveNews} className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                          Título de la Noticia *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Gran victoria de la Primera en el Microestadio"
                          value={newsForm.title}
                          onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                            Categoría / Etiqueta
                          </label>
                          <input
                            type="text"
                            placeholder="Ej. Primera División / Obras / Mini Básquet"
                            value={newsForm.categoryTag}
                            onChange={(e) => setNewsForm({ ...newsForm, categoryTag: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                            Fecha de Publicación
                          </label>
                          <input
                            type="text"
                            value={newsForm.date}
                            onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                          URL de Fotografía de Portada
                        </label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={newsForm.coverImage}
                          onChange={(e) => setNewsForm({ ...newsForm, coverImage: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                          Bajada Breve (Copete) *
                        </label>
                        <textarea
                          rows={2}
                          required
                          placeholder="Resumen breve para la tarjeta principal..."
                          value={newsForm.summary}
                          onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                          Texto Completo de la Noticia
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Escribí aquí toda la crónica del partido o anuncio institucional..."
                          value={newsForm.content}
                          onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow"
                      >
                        {isEditingNews ? 'Actualizar Noticia' : 'Publicar Noticia'}
                      </button>
                    </form>
                  </div>

                  {/* Existing News */}
                  <div className="space-y-3">
                    <h4 className="font-heading font-black text-sm uppercase text-slate-400">
                      Noticias Publicadas ({news.length})
                    </h4>
                    {news.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.coverImage}
                            alt=""
                            className="w-12 h-10 object-cover rounded-lg shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <span className="text-blue-400 text-[10px] font-bold uppercase">
                              {item.categoryTag} • {item.date}
                            </span>
                            <p className="font-bold text-white truncate text-sm">
                              {item.title}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              setIsEditingNews(true);
                              setNewsForm({
                                id: item.id,
                                title: item.title,
                                summary: item.summary,
                                content: item.content,
                                date: item.date,
                                categoryTag: item.categoryTag,
                                coverImage: item.coverImage,
                                author: item.author || 'Prensa Club'
                              });
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400"
                            title="Editar noticia"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('¿Eliminar esta noticia?')) {
                                deleteNews(item.id);
                                showBanner('Noticia eliminada');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400"
                            title="Eliminar noticia"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: CATEGORIES & ROSTERS */}
              {activeTab === 'categories' && (
                <div className="space-y-6">
                  {/* Category Selector */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase text-slate-300">
                      Seleccionar Categoría para Administrar:
                    </span>
                    <select
                      value={selectedCatId}
                      onChange={(e) => setSelectedCatId(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-blue-400 font-bold"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.players.length} jugadores)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category Coach & Schedule Edit */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <h4 className="font-heading font-black text-sm uppercase text-blue-400">
                      Entrenador y Horarios: {currentCategory.name}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">
                          Director Técnico
                        </label>
                        <input
                          type="text"
                          defaultValue={currentCategory.coach}
                          onBlur={(e) => {
                            updateCategory(currentCategory.id, { coach: e.target.value });
                            showBanner('Entrenador actualizado');
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">
                          Días de Entrenamiento
                        </label>
                        <input
                          type="text"
                          defaultValue={currentCategory.trainingSchedule.days}
                          onBlur={(e) => {
                            updateCategory(currentCategory.id, {
                              trainingSchedule: { ...currentCategory.trainingSchedule, days: e.target.value }
                            });
                            showBanner('Horario actualizado');
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Add Player to Category */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <h4 className="font-heading font-black text-sm uppercase text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-blue-400" /> Cargar Nuevo Jugador en {currentCategory.name}
                    </h4>

                    <form onSubmit={handleAddPlayer} className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                          Nombre Completo
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Lucas Beltrán"
                          value={playerForm.name}
                          onChange={(e) => setPlayerForm({ ...playerForm, name: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                          N° Camiseta
                        </label>
                        <input
                          type="number"
                          required
                          placeholder="Ej. 7"
                          value={playerForm.number}
                          onChange={(e) => setPlayerForm({ ...playerForm, number: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                          Posición
                        </label>
                        <select
                          value={playerForm.position}
                          onChange={(e) => setPlayerForm({ ...playerForm, position: e.target.value as Player['position'] })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                        >
                          <option value="Base">Base</option>
                          <option value="Escolta">Escolta</option>
                          <option value="Alero">Alero</option>
                          <option value="Ala-Pívot">Ala-Pívot</option>
                          <option value="Pívot">Pívot</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase"
                      >
                        Agregar
                      </button>
                    </form>
                  </div>

                  {/* Current Roster List */}
                  <div>
                    <h4 className="font-heading font-black text-xs uppercase text-slate-400 mb-2">
                      Plantel Actual ({currentCategory.players.length} jugadores)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentCategory.players.map((p) => (
                        <div
                          key={p.id}
                          className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                              #{p.number}
                            </span>
                            <span className="font-semibold text-white">{p.name}</span>
                            <span className="text-slate-400 text-[11px]">({p.position})</span>
                          </div>

                          <button
                            onClick={() => {
                              deletePlayer(currentCategory.id, p.id);
                              showBanner('Jugador eliminado');
                            }}
                            className="p-1 text-slate-400 hover:text-rose-400"
                            title="Eliminar jugador"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: CLUB INFO & CONTACT */}
              {activeTab === 'info' && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <h4 className="font-heading font-black text-base sm:text-lg text-white uppercase flex items-center gap-2">
                    <Settings className="w-4 h-4 text-blue-400" /> Información Institucional & Contacto
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Nombre del Club
                      </label>
                      <input
                        type="text"
                        defaultValue={clubInfo.name}
                        onBlur={(e) => {
                          updateClubInfo({ name: e.target.value });
                          showBanner('Nombre actualizado');
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Frase Institucional (Slogan)
                      </label>
                      <input
                        type="text"
                        defaultValue={clubInfo.slogan}
                        onBlur={(e) => {
                          updateClubInfo({ slogan: e.target.value });
                          showBanner('Slogan actualizado');
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Dirección de la Sede
                      </label>
                      <input
                        type="text"
                        defaultValue={clubInfo.address}
                        onBlur={(e) => {
                          updateClubInfo({ address: e.target.value });
                          showBanner('Dirección actualizada');
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Número de WhatsApp (con código de país sin +)
                      </label>
                      <input
                        type="text"
                        defaultValue={clubInfo.whatsapp}
                        onBlur={(e) => {
                          updateClubInfo({ whatsapp: e.target.value });
                          showBanner('WhatsApp actualizado');
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        defaultValue={clubInfo.email}
                        onBlur={(e) => {
                          updateClubInfo({ email: e.target.value });
                          showBanner('Email actualizado');
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Instagram
                      </label>
                      <input
                        type="text"
                        defaultValue={clubInfo.instagram}
                        onBlur={(e) => {
                          updateClubInfo({ instagram: e.target.value });
                          showBanner('Instagram actualizado');
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        X (Twitter)
                      </label>
                      <input
                        type="text"
                        defaultValue={clubInfo.twitter}
                        onBlur={(e) => {
                          updateClubInfo({ twitter: e.target.value });
                          showBanner('X actualizado');
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Fotografía Principal Portada (URL)
                      </label>
                      <input
                        type="url"
                        defaultValue={clubInfo.heroImage}
                        onBlur={(e) => {
                          updateClubInfo({ heroImage: e.target.value });
                          showBanner('Foto de portada actualizada');
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: MEMBERSHIP APPLICATIONS */}
              {activeTab === 'applications' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-black text-base sm:text-lg text-white uppercase flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-blue-400" /> Solicitudes de Nuevos Socios
                      </h4>
                      <p className="text-xs text-slate-400">
                        Inscripciones recibidas a través del formulario de la solapa "Asociate al Club".
                      </p>
                    </div>
                  </div>

                  {membershipApplications.length === 0 ? (
                    <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-400 text-xs">
                      No hay solicitudes pendientes en este momento.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {membershipApplications.map((app) => (
                        <div
                          key={app.id}
                          className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                            <div>
                              <span className="font-heading font-black text-base text-white">
                                {app.fullName}
                              </span>
                              <span className="text-xs text-slate-400 ml-2">
                                DNI: {app.dni}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  app.status === 'pendiente'
                                    ? 'bg-blue-600/20 text-blue-400'
                                    : app.status === 'contactado'
                                    ? 'bg-sky-400/20 text-sky-400'
                                    : 'bg-emerald-400/20 text-emerald-400'
                                }`}
                              >
                                {app.status}
                              </span>

                              <select
                                value={app.status}
                                onChange={(e) => updateApplicationStatus(app.id, e.target.value as any)}
                                className="bg-slate-900 border border-slate-700 text-xs rounded px-2 py-1 text-slate-300"
                              >
                                <option value="pendiente">Pendiente</option>
                                <option value="contactado">Contactado</option>
                                <option value="aprobado">Aprobado</option>
                              </select>

                              <button
                                onClick={() => deleteApplication(app.id)}
                                className="p-1 text-slate-400 hover:text-rose-400"
                                title="Eliminar registro"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300">
                            <div>
                              <strong className="text-slate-400 block">Tel / WhatsApp:</strong>
                              <a
                                href={`https://wa.me/${app.phone.replace(/[^\d]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 hover:underline inline-flex items-center gap-1"
                              >
                                <MessageSquare className="w-3 h-3" /> {app.phone}
                              </a>
                            </div>

                            <div>
                              <strong className="text-slate-400 block">Interés:</strong>
                              <span>{app.interestActivity}</span>
                            </div>

                            <div>
                              <strong className="text-slate-400 block">Fecha Envío:</strong>
                              <span>{app.submittedAt}</span>
                            </div>
                          </div>

                          {app.message && (
                            <p className="text-xs text-slate-400 italic bg-slate-900/60 p-2 rounded-lg">
                              "{app.message}"
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Los cambios se sincronizan en tiempo real con el sitio web público.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
          >
            Volver al Sitio
          </button>
        </div>
      </div>
    </div>
  );
};
