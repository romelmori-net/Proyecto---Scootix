"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart, ChevronDown } from "lucide-react";
import { ScootixLogo } from "@/components/icons";
import { navLinks } from "@/lib/data";
import { useLanguage } from "@/context/language-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Globe } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import { User } from "lucide-react";

const serviceLinks = navLinks.filter(l => ['services', 'diyKits', 'subscriptions'].includes(l.name));
const aboutLinks = navLinks.filter(l => ['about', 'contact', 'blog'].includes(l.name));
const mainLinks = navLinks.filter(l => ['store'].includes(l.name));

export function Header() {
  const { t, setLanguage } = useLanguage();
  const { cart } = useCart();
  const { data: session, status } = useSession();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  // Filtrar links para el Admin
  const filteredMainLinks = isAdmin
    ? mainLinks
    : mainLinks;

  const showMarketingLinks = !isAdmin;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0F172A]/90 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0F172A]/80 shadow-2xl transition-all duration-300">
      <div className="container flex h-24 max-w-7xl items-center px-4">
        <div className="mr-6 flex flex-1 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2 group outline-none shrink-0">
            <ScootixLogo className="h-10 w-auto group-hover:rotate-6 transition-transform duration-500" />
          </Link>
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              {filteredMainLinks.map((link) => (
                <NavigationMenuItem key={link.name}>
                  <Link href={link.href} className="inline-flex items-center justify-center cursor-pointer px-4 font-bold text-white hover:text-[#0EA5E9] hover:bg-white/5 transition-all h-14 text-base rounded-xl whitespace-nowrap">
                    {link.name === 'home' ? 'Scootix' : t(link.name)}
                  </Link>
                </NavigationMenuItem>
              ))}

              {showMarketingLinks && (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-14 font-bold text-base bg-transparent text-white hover:text-white hover:bg-white/5 focus:bg-white/5 data-[state=open]:bg-white/5 px-4">{t('services')}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] border-none bg-[#0F172A] backdrop-blur-md shadow-2xl">
                        {serviceLinks.map((component) => (
                          <ListItem
                            key={t(component.name)}
                            title={t(component.name)}
                            href={component.href}
                            className="text-white hover:bg-white/10"
                          >
                            <span className="text-slate-400 group-hover:text-slate-100">{t(`${component.name}Description`)}</span>
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-14 font-bold text-base bg-transparent text-white hover:text-white hover:bg-white/5 focus:bg-white/5 data-[state=open]:bg-white/5 px-4">{t('about')}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] border-none bg-[#0F172A] backdrop-blur-md shadow-2xl">
                        {aboutLinks.map((component) => (
                          <ListItem
                            key={t(component.name)}
                            title={t(component.name)}
                            href={component.href}
                            className="text-white hover:bg-white/10"
                          >
                            <span className="text-slate-400 group-hover:text-slate-100">{t(`${component.name}NavDescription`)}</span>
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/blog" className="inline-flex items-center justify-center cursor-pointer px-4 font-bold text-white hover:text-[#0EA5E9] hover:bg-white/5 transition-all h-14 text-base rounded-xl whitespace-nowrap">
                      {t('blog') || 'Blog'}
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/contact" className="inline-flex items-center justify-center cursor-pointer px-4 font-bold text-white hover:text-[#0EA5E9] hover:bg-white/5 transition-all h-14 text-base rounded-xl whitespace-nowrap">
                      {t('contact') || 'Contacto'}
                    </Link>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center justify-end space-x-3 shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-all">
                <Globe className="h-6 w-6" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl shadow-2xl border-white/5 bg-[#0F172A] text-white p-2">
              <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer text-base py-3 px-4 rounded-xl hover:bg-white/5 hover:text-primary transition-colors">
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("es")} className="cursor-pointer text-base py-3 px-4 rounded-xl hover:bg-white/5 hover:text-primary transition-colors">
                Español
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!isAdmin && (
            <Button variant="ghost" size="icon" asChild className="relative h-12 w-12 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-all">
              <Link href="/cart">
                <ShoppingCart className="h-7 w-7" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-black text-white shadow-[0_0_15px_rgba(14,165,233,0.5)] animate-in zoom-in duration-300">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>
          )}

          {status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-white/10 border border-white/10">
                  <User className="h-6 w-6 text-primary" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 rounded-2xl shadow-2xl border-white/5 bg-[#0F172A] text-white p-2">
                <div className="px-3 py-3 mb-2 bg-white/5 rounded-xl">
                  <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1">Cuenta Scootix</p>
                  <p className="text-sm font-black truncate">{session.user?.name || session.user?.email}</p>
                </div>

                {isAdmin && (
                  <DropdownMenuItem asChild className="bg-[#0EA5E9] text-white font-black hover:bg-[#0EA5E9]/90 transition-all rounded-xl mb-1 cursor-pointer py-3">
                    <Link href="/admin">Panel de Administración</Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem asChild className="rounded-xl cursor-pointer hover:bg-white/5 py-3">
                  <Link href="/admin/orders">{t('myOrders') || 'Mis Pedidos'}</Link>
                </DropdownMenuItem>
                <div className="h-px bg-white/5 my-2 mx-1" />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })} className="text-red-400 font-bold rounded-xl cursor-pointer hover:bg-red-500/10 py-3">
                  {t('signOut') || 'Cerrar Sesión'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex text-white font-black hover:bg-white/5 h-12 px-6 rounded-xl text-base">
              <Link href="/auth/signin">{t('signIn') || 'Entrar'}</Link>
            </Button>
          )}

          {showMarketingLinks && (
            <Button className="hidden sm:inline-flex rounded-xl px-6 h-12 text-base font-black bg-[#0EA5E9] shadow-[0_10px_20px_-5px_rgba(14,165,233,0.4)] hover:shadow-[#0EA5E9]/60 hover:scale-105 transition-all duration-300 shrink-0" asChild>
              <Link href="/booking">{t('bookAppointment') || 'Reservar Cita'}</Link>
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-2 py-1 text-lg"
                  >
                    {t(link.name)}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
