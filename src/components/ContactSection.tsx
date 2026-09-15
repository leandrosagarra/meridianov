import React, { useState } from 'react';
import { useClubData } from '../context/ClubDataContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  MessageSquare, 
  Navigation, 
  Send, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { clubInfo } = useClubData();

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Consulta General',
    message: ''
  });

  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5" />
            Canales Oficiales
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            CONTACTO & UBICACIÓN
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Estamos en el histórico barrio Meridiano V°. Acercate a la sede o escribinos por cualquiera de nuestras vías directas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Address card */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Dirección de la Sede y Estadio
                  </span>
                  <p className="font-heading font-black text-lg text-white mt-0.5">
                    {clubInfo.address}
                  </p>
                  <p className="text-xs text-slate-400">
                    {clubInfo.city} (Barrio Meridiano V°)
                  </p>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`tel:${clubInfo.phone.replace(/\s+/g, '')}`}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-900/40 text-blue-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-slate-400 uppercase block">Teléfono</span>
                    <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                      {clubInfo.phone}
                    </span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${clubInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-colors flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-slate-400 uppercase block">WhatsApp</span>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-400 truncate block">
                      Chat Directo
                    </span>
                  </div>
                </a>
              </div>

              {/* Email */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Correo Electrónico
                  </span>
                  <a
                    href={`mailto:${clubInfo.email}`}
                    className="font-heading font-bold text-sm sm:text-base text-blue-400 hover:underline truncate block mt-0.5"
                  >
                    {clubInfo.email}
                  </a>
                  <span className="text-xs text-slate-400">
                    Atención a socios y secretaría deportiva
                  </span>
                </div>
              </div>

              {/* Social networks block */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Redes Sociales Institucionales
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={clubInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-pink-500/40 transition-all text-slate-300 hover:text-pink-400 text-xs font-semibold gap-1.5"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>Instagram</span>
                  </a>

                  <a
                    href={clubInfo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40 transition-all text-slate-300 hover:text-sky-400 text-xs font-semibold gap-1.5"
                  >
                    <span className="font-heading font-black text-sm">𝕏</span>
                    <span>X (Twitter)</span>
                  </a>

                  <a
                    href={clubInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/40 transition-all text-slate-300 hover:text-blue-400 text-xs font-semibold gap-1.5"
                  >
                    <Facebook className="w-5 h-5" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps External Directions */}
            <a
              href="https://maps.google.com/?q=Calle+67+1080+La+Plata+Buenos+Aires"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
            >
              <Navigation className="w-4 h-4 text-blue-400" />
              <span>Cómo llegar con Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          {/* Right Column: Embedded Map + Quick Contact */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Interactive Map Box */}
            <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-xl bg-slate-900 relative flex-1 min-h-[300px]">
              <div className="absolute top-3 left-3 z-10 bg-slate-950/90 backdrop-blur border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Microestadio Meridiano V° • Calle 67 e/ 16 y 17 nº1080</span>
              </div>

              {/* Responsive Google Maps Embed of Calle 67 e/16 y 17 La Plata */}
              <iframe
                title="Mapa Club Meridiano V"
                src="https://maps.google.com/maps?q=Calle%2067%20e%2F16%20y%2017%20n1080%20La%20Plata%20Buenos%20Aires&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="w-full h-full min-h-[320px] border-0 grayscale contrast-125 brightness-90 hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </div>

            {/* Quick message form */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
              {sent ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-heading font-black text-lg text-white">¡Mensaje Enviado!</h4>
                  <p className="text-xs text-slate-300">
                    Gracias por contactarte con Club Meridiano V°. Te responderemos a la brevedad.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-xs font-bold text-blue-400 underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="font-heading font-bold text-base text-white uppercase flex items-center gap-2">
                    <Send className="w-4 h-4 text-blue-400" /> Envianos tu Consulta
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Tu Nombre"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Tu Teléfono / WhatsApp"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <textarea
                    rows={3}
                    required
                    placeholder="Escribí tu consulta aquí..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow shadow-blue-600/30"
                  >
                    Enviar Mensaje Directo
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
