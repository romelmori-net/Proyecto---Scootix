"use client";

import Link from "next/link";
import { ScootixLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram, Github } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/language-context";

// Links que SÍ aparecen en el footer (quitamos 'home' y 'subscriptions')
const footerLinks = [
  { name: 'services', href: '/services', label: 'Servicios' },
  { name: 'store', href: '/store', label: 'Tienda' },
  { name: 'diyKits', href: '/diy-kits', label: 'Kits de Bricolaje' },
  { name: 'contact', href: '/contact', label: 'Contacto' },
  { name: 'blog', href: '/blog', label: 'Blog' },
];

export function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-b from-[#0F172A] via-[#1a2744] to-[#0d1b2e] text-white py-16 border-t border-[#0EA5E9]/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between">
          {/* Logo — solo el ícono, sin texto "Hub" */}
          <Link href="/" className="flex items-center gap-3 group">
            <ScootixLogo className="h-9 w-auto group-hover:rotate-12 transition-transform duration-500" />
            <span className="font-black text-2xl tracking-tighter text-white">Scootix</span>
          </Link>

          {/* Links del footer */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-bold text-slate-400 hover:text-[#0EA5E9] transition-colors"
              >
                {t(link.name) || link.label}
              </Link>
            ))}
          </nav>

          {/* Redes sociales */}
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" asChild className="h-12 w-12 rounded-full bg-white/5 hover:bg-[#0EA5E9] hover:text-white transition-all text-slate-400">
              <Link href="#"><Twitter className="h-6 w-6" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="h-12 w-12 rounded-full bg-white/5 hover:bg-[#0EA5E9] hover:text-white transition-all text-slate-400">
              <Link href="#"><Instagram className="h-6 w-6" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="h-12 w-12 rounded-full bg-white/5 hover:bg-[#0EA5E9] hover:text-white transition-all text-slate-400">
              <Link href="#"><Github className="h-6 w-6" /></Link>
            </Button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/5 pt-10 sm:flex-row">
          <p className="text-center text-sm text-slate-500 font-medium">
            © {new Date().getFullYear()} Scootix. {t('allRightsReserved') || 'Todos los derechos reservados'}.
          </p>
          <div className="mt-6 flex gap-10 sm:mt-0">
            <Link href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">{t('privacyPolicy') || 'Política de Privacidad'}</Link>
            <Link href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">{t('termsOfService') || 'Términos de Servicio'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
