import { useTranslation } from "react-i18next";
import { Instagram, Twitter } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export function Footer() {
    const { t } = useTranslation();
    const { photographer } = usePortfolio();

    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full mt-20 sm:mt-32 py-12 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-widest text-muted-foreground/60 transition-colors hover:text-muted-foreground/80">

            {/* Social Links */}
            <div className="flex items-center gap-8 order-2 md:order-1">
                {photographer?.socials?.instagram && (
                    <a
                        href={photographer.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-all duration-300 hover:scale-110 p-2 -m-2 opacity-70 hover:opacity-100"
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
                        className="hover:text-foreground transition-all duration-300 hover:scale-110 p-2 -m-2 opacity-70 hover:opacity-100"
                        aria-label="Twitter"
                    >
                        <Twitter className="w-4 h-4" />
                    </a>
                )}
            </div>

            {/* Copyright & Branding */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 order-1 md:order-2 text-center md:text-right">

                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
                    <span className="font-serif text-foreground/80 tracking-widest text-xs">
                        {t(photographer?.name || 'Photographer')}
                    </span>
                    <span className="hidden md:inline text-border/40">|</span>
                    <span className="opacity-60">© {currentYear} {t('footer.rights_reserved')}</span>
                </div>

                <span className="hidden md:inline text-border/40">|</span>

                <a
                    href="https://github.com/marjuzdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-1 hover:text-foreground transition-colors opacity-60 hover:opacity-100"
                >
                    <span>{t('footer.created_by')}</span>
                    <span className="text-foreground font-medium relative">
                        marjuz
                        <span className="absolute -bottom-1 left-0 w-full h-[0.5px] bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </span>
                </a>
            </div>
        </footer>
    );
}
