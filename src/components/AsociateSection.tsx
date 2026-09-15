import React, { useState } from 'react';
import { useClubData } from '../context/ClubDataContext';
import { 
  UserPlus, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  MessageSquare, 
  CreditCard, 
  HeartHandshake,
  Send,
  HelpCircle
} from 'lucide-react';

export const AsociateSection: React.FC = () => {
  const { membershipPlans, submitMembershipApplication, clubInfo } = useClubData();
  
  const [selectedPlanId, setSelectedPlanId] = useState<string>(membershipPlans[0]?.id || 'socio-deportivo');
  
  // Form fields
  const [formData, setFormData] = useState({
    fullName: '',
    dni: '',
    birthDate: '',
    phone: '',
    email: '',
    interestActivity: 'Básquet Formativo / Competitivo',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.dni) {
      alert('Por favor completá los campos obligatorios (Nombre, DNI y Teléfono).');
      return;
    }

    submitMembershipApplication({
      fullName: formData.fullName,
      dni: formData.dni,
      birthDate: formData.birthDate,
      phone: formData.phone,
      email: formData.email,
      planId: selectedPlanId,
      interestActivity: formData.interestActivity,
      message: formData.message
    });

    setSubmitted(true);
  };

  const handleWhatsAppJoin = () => {
    const plan = membershipPlans.find(p => p.id === selectedPlanId);
    const planName = plan ? plan.name : 'Socio';
    const message = `¡Hola Club Meridiano V°! Quiero asociarme al club.
Mi nombre es: ${formData.fullName || '[Mi Nombre]'}
DNI: ${formData.dni || '[Mi DNI]'}
Plan de interés: ${planName}
Actividad: ${formData.interestActivity}
¡Agradezco que me indiquen los pasos para completar mi carnet!`;

    const url = `https://wa.me/${clubInfo.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="asociate" className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 to-slate-950 border-t-2 border-blue-500/40 relative">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs sm:text-sm font-black uppercase tracking-wider mb-3 shadow-md shadow-blue-600/30 ring-1 ring-white/20">
            <UserPlus className="w-4 h-4" />
            SOLAPA ESPECIAL: ASOCIATE AL CLUB
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            HACETE SOCIO DE MERIDIANO V°
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Formá parte de la gran familia de Meridiano V°. Apoyá al básquet, accedé a todos los partidos de local, disfrutá de las instalaciones y fortalecé nuestro club de barrio.
          </p>
        </div>

        {/* Membership Plans Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {membershipPlans.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-slate-900 border-2 border-blue-500 shadow-xl shadow-blue-600/20 -translate-y-1'
                    : 'bg-slate-950/80 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-black text-[10px] uppercase tracking-wider shadow-md ring-1 ring-white/30">
                      Más Elegido
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                      Categoría
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-blue-500 bg-blue-600 text-white'
                          : 'border-slate-600'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>

                  <h3 className="font-heading font-black text-xl text-white uppercase leading-tight mb-2">
                    {plan.name}
                  </h3>

                  <div className="mb-4">
                    <span className="font-heading font-black text-3xl text-white">
                      {plan.monthlyFee}
                    </span>
                    <span className="text-xs text-blue-300 ml-1">/ mes</span>
                  </div>

                  <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-800">
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                      Beneficios incluidos:
                    </span>
                    {plan.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <button
                    type="button"
                    className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {isSelected ? 'Plan Seleccionado' : 'Elegir este plan'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enrollment Form */}
        <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-blue-600/20 text-blue-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-black text-2xl text-white uppercase">
                ¡Solicitud de Asociación Recibida!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Muchas gracias <strong className="text-blue-400">{formData.fullName}</strong>. Tus datos ya quedaron registrados en la secretaría del club. En breve nos comunicaremos vía WhatsApp al <strong className="text-white">{formData.phone}</strong> para coordinar el retiro de tu carnet de socio y método de pago.
              </p>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleWhatsAppJoin}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Confirmar rápido por WhatsApp
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition-colors"
                >
                  Cargar otra solicitud
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="font-heading font-black text-xl sm:text-2xl text-white uppercase flex items-center gap-2">
                  <HeartHandshake className="w-6 h-6 text-blue-400" /> Formulario de Asociación Digital
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Completá tus datos en 1 minuto. La secretaría deportiva se pondrá en contacto para darte la bienvenida.
                </p>
              </div>

              {/* Selected Plan indicator */}
              <div className="p-3.5 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">
                    Plan Seleccionado:
                  </span>
                  <span className="font-bold text-white text-sm">
                    {membershipPlans.find(p => p.id === selectedPlanId)?.name} (
                    {membershipPlans.find(p => p.id === selectedPlanId)?.monthlyFee}/mes)
                  </span>
                </div>
                <span className="text-xs text-blue-300 underline">
                  Podés cambiarlo arriba
                </span>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ej. Juan Manuel Pérez"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400 placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    DNI / Documento *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.dni}
                    onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                    placeholder="Ej. 42.123.456"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400 placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ej. 221-555-1234"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400 placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Ej. juan@gmail.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400 placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Interés Principal
                  </label>
                  <select
                    value={formData.interestActivity}
                    onChange={(e) => setFormData({ ...formData, interestActivity: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="Básquet Formativo / Competitivo">Básquet Formativo / Competitivo</option>
                    <option value="Mini Básquet & Escuelita (4 a 12 años)">Mini Básquet & Escuelita (4 a 12 años)</option>
                    <option value="Básquet Femenino">Básquet Femenino</option>
                    <option value="Socio Hincha / Apoyo Social">Socio Hincha / Apoyo Social</option>
                    <option value="Biblioteca y Actividades Culturales">Biblioteca y Actividades Culturales</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Mensaje o Consulta (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Comentarios adicionales, experiencia previa en básquet, etc."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-400 placeholder:text-slate-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-heading font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-600/30 ring-1 ring-white/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>ENVIAR SOLICITUD DE ASOCIACIÓN</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppJoin}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-black text-sm uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>ASOCIARME POR WHATSAPP</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 justify-center text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tus datos son privados y se usarán exclusivamente para el registro en la secretaría del club.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
