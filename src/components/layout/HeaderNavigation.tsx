import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

export function HeaderNavigation() {
  const { photographer, destinations } = usePortfolio();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  if (!photographer) return null;

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative w-full flex flex-col sm:flex-row justify-between items-end gap-6 sm:gap-12">
      <Link to="/" className="group relative p-3 -m-3">
        <div className="relative">
          {/* Top Border */}
          <span className="absolute top-0 left-0 w-full h-[1px] bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out" />
          {/* Right Border */}
          <span className="absolute top-0 right-0 w-[1px] h-full bg-foreground transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top ease-out delay-100" />
          {/* Bottom Border */}
          <span className="absolute bottom-0 right-0 w-full h-[1px] bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right ease-out delay-200" />
          {/* Left Border */}
          <span className="absolute bottom-0 left-0 w-[1px] h-full bg-foreground transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom ease-out delay-300" />

          <div className="px-3 py-2">
            <h1 className="font-serif text-2xl sm:text-3xl leading-none font-light tracking-wide text-foreground uppercase">
              {t(photographer.name)}
            </h1>
            <p className="text-[8px] uppercase tracking-[0.4em] text-muted-foreground mt-1 ml-1">
              {t(photographer.tagline)}
            </p>
          </div>
        </div>
      </Link>

      <div className="flex items-center gap-4 sm:gap-8 pb-1">
        <nav className="hidden sm:block">
          <div className="flex flex-row items-baseline gap-6">
            <Link
              to="/"
              className={cn(
                "text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative py-1",
                isActive("/")
                  ? "text-foreground font-medium border-b border-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t('navigation.home')}
            </Link>
            {destinations.map((destination) => (
              <Link
                key={destination.id}
                to={`/destinations/${destination.slug}`}
                className={cn(
                  "text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative py-1",
                  isActive(`/destinations/${destination.slug}`)
                    ? "text-foreground font-medium border-b border-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(destination.title)}
              </Link>
            ))}
            <Link
              to="/gallery"
              className={cn(
                "text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative py-1",
                isActive("/gallery")
                  ? "text-foreground font-medium border-b border-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t('navigation.collection')}
            </Link>
            <Link
              to="/about"
              className={cn(
                "text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative py-1",
                isActive("/about")
                  ? "text-foreground font-medium border-b border-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t('navigation.information')}
            </Link>

            {/* Desktop Language Switcher */}
            <div className="flex items-center gap-2 ml-4 border-l border-border pl-4">
              <button
                onClick={() => i18n.changeLanguage('es')}
                className={cn(
                  "text-[9px] tracking-widest transition-all duration-300 hover:text-foreground",
                  i18n.language === 'es' ? "text-foreground font-bold border-b border-foreground" : "text-muted-foreground font-medium"
                )}
              >
                ES
              </button>
              <span className="text-[9px] text-border/40">|</span>
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={cn(
                  "text-[9px] tracking-widest transition-all duration-300 hover:text-foreground",
                  i18n.language === 'en' ? "text-foreground font-bold border-b border-foreground" : "text-muted-foreground font-medium"
                )}
              >
                EN
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile: Hamburger Menu */}
        <div className="sm:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 -m-2 opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full bg-background border-none flex flex-col p-8">
              <Link to="/" className="group relative block mb-12" onClick={handleNavClick}>
                <div className="relative inline-block p-2 border border-border/20">
                  <h1 className="font-serif text-2xl leading-tight font-extralight tracking-tight text-foreground uppercase">
                    {t(photographer.name)}
                  </h1>
                </div>
              </Link>
              <nav className="mt-8 flex-1">
                <ul className="flex flex-col gap-10 text-center">
                  <li>
                    <Link
                      to="/"
                      onClick={handleNavClick}
                      className={cn(
                        "text-sm uppercase tracking-[0.3em] transition-colors",
                        isActive("/") ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {t('navigation.home')}
                    </Link>
                  </li>
                  {destinations.map((destination) => (
                    <li key={destination.id}>
                      <Link
                        to={`/destinations/${destination.slug}`}
                        onClick={handleNavClick}
                        className={cn(
                          "text-sm uppercase tracking-[0.3em] transition-colors",
                          isActive(`/destinations/${destination.slug}`) ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {t(destination.title)}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      to="/gallery"
                      onClick={handleNavClick}
                      className={cn(
                        "text-sm uppercase tracking-[0.3em] transition-colors",
                        isActive("/gallery") ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {t('navigation.collection')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      onClick={handleNavClick}
                      className={cn(
                        "text-sm uppercase tracking-[0.3em] transition-colors",
                        isActive("/about") ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {t('navigation.information')}
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Mobile Language Switcher */}
              <div className="flex justify-center items-center gap-6 pb-12">
                <button
                  onClick={() => { i18n.changeLanguage('es'); handleNavClick(); }}
                  className={cn(
                    "text-sm tracking-widest transition-all duration-300",
                    i18n.language === 'es' ? "text-foreground font-bold border-b border-foreground" : "text-muted-foreground font-medium"
                  )}
                >
                  ES
                </button>
                <button
                  onClick={() => { i18n.changeLanguage('en'); handleNavClick(); }}
                  className={cn(
                    "text-sm tracking-widest transition-all duration-300",
                    i18n.language === 'en' ? "text-foreground font-bold border-b border-foreground" : "text-muted-foreground font-medium"
                  )}
                >
                  EN
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
