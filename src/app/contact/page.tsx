"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send, Loader2, Zap, MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { saveContactMessage } from "@/lib/actions/contact";
import { getSiteSettings } from "@/lib/actions/settings";

export default function ContactPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const res = await saveContactMessage(data);

    if (res.success) {
      toast({
        title: "¡Mensaje enviado! 🚀",
        description: "Nos pondremos en contacto contigo en menos de 24 horas.",
      });
      (e.target as HTMLFormElement).reset();
    } else {
      toast({
        title: "Error al enviar",
        description: res.error,
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email corporativo",
      value: settings?.email || "info@scootix.com",
      href: `mailto:${settings?.email || "info@scootix.com"}`,
      color: "#2563EB",
    },
    {
      icon: Phone,
      label: "Línea directa",
      value: settings?.phone || "+51 987 654 321",
      href: `tel:${settings?.phone || "+51987654321"}`,
      color: "#22C55E",
    },
    {
      icon: Clock,
      label: "Horario de atención",
      value: settings?.hours || "Lun–Sáb: 9am – 7pm",
      href: "#",
      color: "#94A3B8",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-[#0F172A] to-slate-900 py-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2563EB]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#22C55E]/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-black uppercase tracking-widest mb-6">
            <MessageSquare className="h-3.5 w-3.5" />
            Estamos aquí para ayudarte
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Contáctanos
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            ¿Tienes una pregunta o necesitas asistencia? Nuestro equipo de expertos en scooters eléctricos está listo para ayudarte.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-black text-slate-900 tracking-tight mb-6">
              Información de Contacto
            </h2>
            {contactInfo.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-blue-100 transition-all group"
              >
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}25` }}
                >
                  <item.icon className="h-5 w-5" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {item.label}
                  </p>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-[#2563EB] transition-colors">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-lg p-8">
              <h2 className="text-xl font-black text-slate-900 tracking-tight mb-1">Envíanos un mensaje</h2>
              <p className="text-slate-500 text-sm mb-8">Te responderemos en menos de 24 horas hábiles.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Nombre completo</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Ej: Juan Pérez"
                      required
                      className="h-12 rounded-xl border-slate-200 focus:border-[#2563EB] focus:ring-[#2563EB]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Correo electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                      className="h-12 rounded-xl border-slate-200 focus:border-[#2563EB] focus:ring-[#2563EB]/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Asunto</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="¿En qué podemos ayudarte?"
                    required
                    className="h-12 rounded-xl border-slate-200 focus:border-[#2563EB] focus:ring-[#2563EB]/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Mensaje</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Describe tu consulta o problema con tu scooter..."
                    rows={6}
                    required
                    className="rounded-xl border-slate-200 focus:border-[#2563EB] focus:ring-[#2563EB]/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-13 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-sm hover:shadow-blue-200 hover:shadow-lg"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
