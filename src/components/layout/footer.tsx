"use client";

import Link from "next/link";
import { ScootixLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/data";
import { Github, Twitter, Instagram } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <ScootixLogo className="h-7 w-auto" />
            <span className="font-bold text-lg">Scootix Hub</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground"
              >
                {t(link.name)}
              </Link>
            ))}
          </nav>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#">
                <Twitter className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#">
                <Instagram className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between border-t border-border/40 pt-6 sm:flex-row">
            <p className="text-center text-sm text-secondary-foreground/60">
                © {new Date().getFullYear()} Scootix Hub. {t('allRightsReserved')}.
            </p>
            <div className="mt-4 flex gap-6 sm:mt-0">
                <Link href="#" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground">{t('privacyPolicy')}</Link>
                <Link href="#" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground">{t('termsOfService')}</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
