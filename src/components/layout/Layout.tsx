import { ReactNode } from "react";
import { HeaderNavigation } from "./HeaderNavigation";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { motion } from "framer-motion";
import { Instagram, Twitter } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

interface LayoutProps {
  children: ReactNode;
  fullPage?: boolean;
}

export function Layout({ children, fullPage = false }: LayoutProps) {
  const { t } = useTranslation();
  const { photographer } = usePortfolio();

  return (
    <div className="w-full min-h-screen bg-background selection:bg-accent/20 selection:text-accent flex flex-col items-center">
      <div className="w-full max-w-screen-2xl px-6 sm:px-12 lg:px-16 pt-8 sm:pt-12">
        <header className="mb-8 sm:mb-12 flex flex-col sm:flex-row justify-between items-end gap-6">
          <HeaderNavigation />
        </header>
        <main className={cn(
          "flex-1 w-full",
          !fullPage && "flex flex-col items-center justify-center min-h-[50vh]"
        )}>
          {children}
        </main>
        <footer className="mt-12 py-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-widest text-muted-foreground">
          <div className="flex items-center gap-6">
            {photographer?.socials?.instagram && (
              <a
                href={photographer.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors p-2 -m-2"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {photographer?.socials?.twitter && (
              <a
                href={photographer.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors p-2 -m-2"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </div>
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-6">
            <span className="font-serif text-foreground tracking-widest">{t('photographer.name')}</span>
            <span className="hidden sm:inline text-border/40">|</span>
            <a
              href="https://github.com/marjuzdev"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <span>{t('footer.created_by')}</span>
              <span className="text-foreground font-medium relative">
                marjuz
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </span>
            </a>
            <span className="hidden sm:inline text-border/40">|</span>
            <span className="text-muted-foreground/80">© 2026 {t('footer.rights_reserved')}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
