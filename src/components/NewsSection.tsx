import React, { useState } from 'react';
import { useClubData } from '../context/ClubDataContext';
import { NewsArticle } from '../types';
import { 
  Newspaper, 
  Calendar, 
  User, 
  ArrowRight, 
  X, 
  Images, 
  ChevronRight,
  Share2
} from 'lucide-react';

export const NewsSection: React.FC = () => {
  const { news } = useClubData();
  const [showAllNews, setShowAllNews] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null);

  // Show only 3 or 4 latest news on home by default, or all if toggled
  const displayedNews = showAllNews ? news : news.slice(0, 4);

  return (
    <section id="noticias" className="py-14 sm:py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Newspaper className="w-3.5 h-3.5" />
              Actualidad y Novedades
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
              NOTICIAS DEL CLUB
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-300">
              Enterate de los comunicados oficiales y vida institucional del club.
            </p>
          </div>

          {news.length > 4 && (
            <button
              onClick={() => setShowAllNews(!showAllNews)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold text-sm border border-slate-700 hover:border-blue-400/40 transition-all active:scale-95"
            >
              <span>{showAllNews ? 'Mostrar Menos' : 'VER TODAS LAS NOTICIAS'}</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${showAllNews ? 'rotate-90' : ''}`} />
            </button>
          )}
        </div>

        {/* News Container */}
        {displayedNews.length === 1 ? (
          <div className="max-w-3xl mx-auto">
            {displayedNews.map((article) => (
              <article
                key={article.id}
                onClick={() => {
                  setSelectedArticle(article);
                  setActiveGalleryImage(article.coverImage);
                }}
                className="group cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-blue-500/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col md:flex-row"
              >
                {/* Cover Photo */}
                <div className="relative md:w-1/2 aspect-[16/10] md:aspect-auto overflow-hidden bg-slate-900 shrink-0 min-h-[220px]">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 md:hidden" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded text-xs font-black bg-blue-600 text-white uppercase tracking-wider shadow-md">
                      {article.categoryTag}
                    </span>
                  </div>

                  {article.gallery && article.gallery.length > 1 && (
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-950/85 text-white border border-slate-700 backdrop-blur shadow">
                        <Images className="w-3.5 h-3.5 text-blue-400" />
                        {article.gallery.length} fotos
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span>{article.date}</span>
                    </div>

                    <h3 className="font-heading font-black text-xl sm:text-2xl text-white group-hover:text-blue-400 transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-sm text-slate-300 line-clamp-4 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:text-blue-300">
                    <span>Leer comunicado completo</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedNews.map((article) => (
              <article
                key={article.id}
                onClick={() => {
                  setSelectedArticle(article);
                  setActiveGalleryImage(article.coverImage);
                }}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-blue-500/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Cover Photo */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-600 text-white uppercase tracking-wide">
                      {article.categoryTag}
                    </span>
                  </div>

                  {article.gallery && article.gallery.length > 1 && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-950/80 text-white border border-slate-700 backdrop-blur">
                        <Images className="w-3 h-3 text-blue-400" />
                        +{article.gallery.length} fotos
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span>{article.date}</span>
                    </div>

                    <h3 className="font-heading font-black text-lg text-white group-hover:text-blue-400 transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:text-blue-300">
                    <span>Leer nota completa</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* FULL ARTICLE MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            {/* Modal Header Cover */}
            <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-slate-950">
              <img
                src={activeGalleryImage || selectedArticle.coverImage}
                alt={selectedArticle.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />

              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-900 border border-slate-700 transition-colors z-10"
                aria-label="Cerrar noticia"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 sm:left-6 right-6">
                <span className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold text-xs uppercase tracking-wider">
                  {selectedArticle.categoryTag}
                </span>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-2 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    {selectedArticle.date}
                  </span>
                  {selectedArticle.author && (
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-blue-400" />
                      {selectedArticle.author}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Body with Gallery and Content */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white leading-tight">
                {selectedArticle.title}
              </h2>

              <p className="text-base sm:text-lg text-blue-200/90 font-medium italic border-l-4 border-blue-500 pl-4 py-1">
                {selectedArticle.summary}
              </p>

              {/* Optional Gallery thumbnails */}
              {selectedArticle.gallery && selectedArticle.gallery.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Images className="w-4 h-4 text-blue-400" /> Galería de imágenes (hacé clic para ampliar)
                  </h4>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {selectedArticle.gallery.map((imgUrl, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveGalleryImage(imgUrl)}
                        className={`relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                          activeGalleryImage === imgUrl
                            ? 'border-blue-500 scale-105'
                            : 'border-slate-700 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Text */}
              <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
                {selectedArticle.content}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Mirá esta noticia de Club Meridiano V°: "${selectedArticle.title}"`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                <Share2 className="w-4 h-4" />
                Compartir por WhatsApp
              </a>

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-colors"
              >
                Cerrar Noticia
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
