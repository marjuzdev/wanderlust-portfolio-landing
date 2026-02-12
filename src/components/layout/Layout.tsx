import { ReactNode } from "react";
import { HeaderNavigation } from "./HeaderNavigation";
import { Footer } from "./Footer";
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
    <div className="w-full min-h-screen bg-background selection:bg-accent/20 selection:text-accent flex flex-col items-center safe-p-t safe-p-b">
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
        <Footer />
      </div>
    </div>
  );
}
