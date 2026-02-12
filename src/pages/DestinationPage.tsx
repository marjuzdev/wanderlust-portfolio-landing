import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { usePortfolio } from "@/context/PortfolioContext";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";
import { GallerySkeleton } from "@/components/gallery/GallerySkeleton";
import { SEO } from "@/components/seo/SEO";
import NotFound from "./NotFound";
import { motion } from "framer-motion";

import { useTranslation } from "react-i18next";

export default function DestinationPage() {
  const { slug } = useParams<{ slug: string }>();
  // Use the new context method and property
  const { getDestinationBySlug, photographer, loading } = usePortfolio();
  const { t } = useTranslation();

  const destination = slug ? getDestinationBySlug(slug) : null;

  const seoTitle = destination
    ? `${t(destination.title)} - ${photographer?.name ? t(photographer.name) : "Wanderlust Chronicles"}`
    : photographer?.name ? t(photographer.name) : "Wanderlust Chronicles";

  useEffect(() => {
    if (destination) {
      document.title = seoTitle;
    }
  }, [destination, seoTitle]);

  if (loading) {
    return (
      <Layout fullPage>
        <div className="h-full flex items-center justify-center">
          <GallerySkeleton />
        </div>
      </Layout>
    );
  }

  if (!destination) {
    return <NotFound />;
  }

  return (
    <Layout fullPage>
      <SEO
        title={seoTitle}
        description={destination.description}
        image={destination.images[0]?.src}
        type="article"
      />

      <div className="mb-16 sm:mb-24 space-y-8">
        <div className="space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
          >
            {t('destination.destination_label')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-sans font-extralight tracking-tight uppercase"
          >
            {t(destination.title)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-serif italic text-muted-foreground max-w-2xl"
          >
            {t(destination.description)}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm leading-relaxed text-muted-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-foreground font-semibold uppercase tracking-widest text-xs mb-4">{t('destination.history')}</h3>
            <p>{t(destination.history)}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-foreground font-semibold uppercase tracking-widest text-xs mb-4">{t('destination.why_visit')}</h3>
            <p>{t(destination.whyVisit)}</p>
          </motion.div>
        </div>
      </div>

      <MasonryGallery images={destination.images} />
    </Layout>
  );
}
