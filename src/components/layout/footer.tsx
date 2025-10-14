import Link from "next/link";
import { ScootixLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/data";
import { Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <ScootixLogo className="h-8 w-auto" />
          </Link>
          <p className="text-sm text-secondary-foreground/80">
            Energy that moves you.
          </p>
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
        <div>
          <h3 className="mb-4 font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            {navLinks.slice(0, 5).map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground"
              >
                Warranty
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Contact</h3>
          <p className="text-sm text-secondary-foreground/80">
            123 Electric Ave,
            <br />
            Metropolis, 12345
            <br />
            <a href="mailto:hello@scootix.com" className="hover:underline">
              hello@scootix.com
            </a>
            <br />
            <a href="tel:+1234567890" className="hover:underline">
              (123) 456-7890
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-border/40 py-6">
        <p className="text-center text-sm text-secondary-foreground/60">
          © {new Date().getFullYear()} Scootix Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
