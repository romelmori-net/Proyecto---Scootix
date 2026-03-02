"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { services } from "@/lib/data";
import { useLanguage } from "@/context/language-context";
import { CalendarDays, Clock, User, Mail, Phone, Wrench, Zap, CheckCircle2 } from "lucide-react";
import { createBooking } from "@/lib/actions/bookings";

export default function BookingPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      date: date || new Date(),
      time: formData.get("time") as string,
    };

    if (!data.service || !data.time) {
      toast({
        title: "Error",
        description: "Por favor selecciona un servicio y una hora.",
        variant: "destructive"
      });
      return;
    }

    setIsPending(true);
    try {
      const result = await createBooking(data);
      if (result.success) {
        setSubmitted(true);
        toast({
          title: t('appointmentBookedToastTitle') || "¡Cita Reservada!",
          description: t('appointmentBookedToastDescription') || "Te contactaremos para confirmar tu cita.",
          className: "bg-green-500 text-white font-bold"
        });
        setTimeout(() => setSubmitted(false), 4000);
        (e.target as HTMLFormElement).reset();
        setDate(new Date());
      } else {
        toast({
          title: "Error",
          description: result.error || "No se pudo procesar la reserva",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error en booking:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar tu reserva.",
        variant: "destructive"
      });
    } finally {
      setIsPending(false);
    }
  };

  const inputClass = "w-full bg-white/5 border border-[#0EA5E9]/30 text-white placeholder:text-slate-500 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all duration-300";
  const labelClass = "flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0EA5E9] mb-2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050d1a] via-[#0F172A] to-[#0a1628] relative overflow-hidden">
      {/* Decorative glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0EA5E9]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2DD4BF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#0EA5E9]/3 rounded-full blur-3xl pointer-events-none" />

      {/* Grid decorativo de fondo */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(14,165,233,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative container mx-auto px-4 py-16 md:py-24 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 text-[#0EA5E9] text-xs font-black uppercase tracking-widest mb-6">
            <Zap className="h-3.5 w-3.5" />
            Diagnóstico y Servicio Rápido
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            {t('bookAppointment') || 'Reservar'}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#2DD4BF]">
              Cita
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            {t('bookAppointmentDescription') || 'Agenda tu servicio de scooter con nosotros. Es rápido y fácil.'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Panel izquierdo — Datos personales */}
            <div className="rounded-3xl border border-[#0EA5E9]/15 bg-white/[0.03] backdrop-blur-xl p-8 space-y-6 shadow-[0_0_50px_rgba(14,165,233,0.05)]">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-xl bg-[#0EA5E9]/15 flex items-center justify-center">
                  <User className="h-5 w-5 text-[#0EA5E9]" />
                </div>
                <div>
                  <p className="font-black text-white text-base">Datos Personales</p>
                  <p className="text-xs text-slate-500">Información de contacto</p>
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  <User className="h-3 w-3" />
                  {t('fullName') || 'Nombre Completo'}
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder={t('fullNamePlaceholder') || 'Juan Pérez'}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <Mail className="h-3 w-3" />
                  {t('emailAddress') || 'Correo Electrónico'}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('emailAddressPlaceholder') || 'juan@ejemplo.com'}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <Phone className="h-3 w-3" />
                  {t('phoneNumber') || 'Número de Teléfono'}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t('phoneNumberPlaceholder') || '(123) 456-7890'}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <Wrench className="h-3 w-3" />
                  {t('serviceType') || 'Tipo de Servicio'}
                </label>
                <Select name="service" required>
                  <SelectTrigger className="w-full bg-white/5 border-[#0EA5E9]/30 text-white rounded-xl h-12 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9]">
                    <SelectValue placeholder={t('selectServicePlaceholder') || 'Selecciona un servicio'} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0F172A] border-[#0EA5E9]/30 text-white rounded-xl">
                    {services.map((service) => (
                      <SelectItem
                        key={service.title}
                        value={service.title}
                        className="hover:bg-[#0EA5E9]/10 focus:bg-[#0EA5E9]/10 rounded-lg cursor-pointer"
                      >
                        {t(service.title)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Panel derecho — Fecha y hora */}
            <div className="rounded-3xl border border-[#0EA5E9]/15 bg-white/[0.03] backdrop-blur-xl p-8 space-y-6 shadow-[0_0_50px_rgba(14,165,233,0.05)]">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-xl bg-[#2DD4BF]/15 flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-[#2DD4BF]" />
                </div>
                <div>
                  <p className="font-black text-white text-base">Fecha y Hora</p>
                  <p className="text-xs text-slate-500">Elige tu horario preferido</p>
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  <CalendarDays className="h-3 w-3" />
                  {t('selectDate') || 'Selecciona una Fecha'}
                </label>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-2xl border border-[#0EA5E9]/20 bg-white/5 text-white p-3"
                    disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() - 1))}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  <Clock className="h-3 w-3" />
                  {t('selectTime') || 'Selecciona una Hora'}
                </label>
                <Select name="time" required>
                  <SelectTrigger className="w-full bg-white/5 border-[#0EA5E9]/30 text-white rounded-xl h-12 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9]">
                    <SelectValue placeholder={t('selectTimePlaceholder') || 'Selecciona un horario'} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0F172A] border-[#0EA5E9]/30 text-white rounded-xl">
                    {['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'].map(time => (
                      <SelectItem
                        key={time}
                        value={time}
                        className="hover:bg-[#0EA5E9]/10 focus:bg-[#0EA5E9]/10 rounded-lg cursor-pointer"
                      >
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Botón de submit */}
              <button
                type="submit"
                disabled={isPending}
                className={`w-full mt-2 h-14 rounded-2xl font-black text-base transition-all duration-300 flex items-center justify-center gap-3 ${submitted
                  ? 'bg-green-500/20 border-2 border-green-500/50 text-green-400'
                  : 'bg-gradient-to-r from-[#0EA5E9] to-[#2DD4BF] text-white hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:scale-[1.02] active:scale-[0.98]'
                  } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isPending ? (
                  <>
                    <Clock className="h-5 w-5 animate-spin" />
                    Procesando...
                  </>
                ) : submitted ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    ¡Cita Confirmada!
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    {t('bookNow') || 'Reservar Ahora'}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Features bottom */}
        <div className="grid grid-cols-3 gap-4 mt-10">
          {[
            { icon: Zap, text: 'Confirmación Instantánea', color: '#0EA5E9' },
            { icon: Clock, text: 'Atención en 24h', color: '#2DD4BF' },
            { icon: CheckCircle2, text: 'Garantía de Servicio', color: '#22C55E' },
          ].map(({ icon: Icon, text, color }) => (
            <div key={text} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <Icon className="h-5 w-5 shrink-0" style={{ color }} />
              <span className="text-xs font-bold text-slate-300">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
