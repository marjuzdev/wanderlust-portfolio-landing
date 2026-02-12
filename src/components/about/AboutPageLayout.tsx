import { PhotographerProfile } from '@/types/photographer';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

import { useTranslation } from 'react-i18next';

interface AboutPageLayoutProps {
  photographer: PhotographerProfile;
}

export function AboutPageLayout({ photographer }: AboutPageLayoutProps) {
  const { t } = useTranslation();

  if (!photographer) return null;

  const { biography, portraitImage, contact, clients } = photographer;

  return (
    <div className="py-12 sm:py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24 items-start">
          {/* Left Column - Biography & Content (60% = 3/5) */}
          <div className="lg:col-span-3 space-y-16">
            <div className="space-y-12">
              <section className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground/60 font-medium">{t('photographer.sections.manifest')}</span>
                <h2 className="text-3xl sm:text-4xl font-sans font-extralight tracking-tighter uppercase text-foreground">
                  {t('photographer.sections.philosophy')}
                </h2>
                <p className="text-base sm:text-lg font-serif italic text-muted-foreground leading-relaxed max-w-2xl">
                  {t(biography?.philosophy || "Exploring the boundaries of perception and the subconscious through digital and traditional media.")}
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <section className="space-y-4">
                  <h3 className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60 font-medium border-b border-border/10 pb-2">
                    {t('photographer.sections.background')}
                  </h3>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                    {t(biography?.background)}
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60 font-medium border-b border-border/10 pb-2">
                    {t('photographer.sections.experience')}
                  </h3>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                    {t(biography?.experience)}
                  </p>
                </section>
              </div>

              <section className="space-y-4">
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60 font-medium border-b border-border/10 pb-2">
                  {t('photographer.sections.current_focus')}
                </h3>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                  {t(biography?.currentFocus)}
                </p>
              </section>

              <section className="pt-12">
                <h2 className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground/60 font-medium mb-8">
                  {t('photographer.sections.recent_collaborations')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {clients?.map((clientCategory, index) => (
                    <div key={index} className="space-y-3">
                      <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground/80">
                        {t(clientCategory.category)}
                      </h4>
                      <ul className="space-y-1.5 border-l border-border/10 pl-4 py-1">
                        {clientCategory.clients.map((client, clientIndex) => (
                          <li
                            key={clientIndex}
                            className="text-[13px] font-sans text-muted-foreground tracking-wide"
                          >
                            {client}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Contact Information Section */}
            <section className="pt-16 border-t border-border/10 flex flex-col sm:flex-row justify-between gap-8 sm:items-center">
              <div className="space-y-4">
                <h2 className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground/60 font-medium">
                  {t('photographer.contact.direct_channel')}
                </h2>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4 group">
                    <Mail className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-foreground transition-colors" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all duration-300 border-b border-muted/20 hover:border-foreground pb-0.5"
                    >
                      {contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <Phone className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-foreground transition-colors" />
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all duration-300 border-b border-muted/20 hover:border-foreground pb-0.5"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/40 max-w-[200px] leading-relaxed">
                {t('photographer.contact.available_message')}
              </p>
            </section>
          </div>

          {/* Right Column - Professional Portrait (40% = 2/5) */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="lg:col-span-2 sticky top-32"
          >
            <div className="relative group">
              <div className="absolute inset-0 border border-foreground/5 -m-4 transition-all duration-700 group-hover:m-0" />
              <img
                src={portraitImage?.src}
                alt={portraitImage?.alt || "Photographer Portfolio"}
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl relative z-10"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
