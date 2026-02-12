import { Layout } from "@/components/layout/Layout";
import { usePortfolio } from "@/context/PortfolioContext";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";
import { GallerySkeleton } from "@/components/gallery/GallerySkeleton";
import { SEO } from "@/components/seo/SEO";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { destinations, photographer, loading, error } = usePortfolio();
  const { t } = useTranslation();

  const featuredDestination = destinations.find((d) => d.featured) || destinations[0];

  // Pick a few random images for the discovery section
  const discoveryImages = useMemo(() => {
    const allImages = destinations.flatMap(d => d.images);
    return [...allImages].sort(() => 0.5 - Math.random()).slice(0, 6);
  }, [destinations]);

  const seoTitle = featuredDestination
    ? `${t(featuredDestination.title)} - ${photographer?.name ? t(photographer.name) : "Wanderlust Chronicles"}`
    : photographer?.name ? t(photographer.name) : "Wanderlust Chronicles - Travel & Exploration";

  useEffect(() => {
    document.title = seoTitle;
  }, [seoTitle]);

  if (loading) {
    return (
      <Layout>
        <SEO title="Loading..." description="Loading destinations" />
        <div className="h-full flex items-center justify-center">
          <GallerySkeleton />
        </div>
      </Layout>
    );
  }

  if (error || !featuredDestination) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full text-muted-foreground font-serif italic">
          {t('home.preparing')}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title={seoTitle} description={featuredDestination.description} image={featuredDestination.images[0]?.src} type="website" />

      {/* Hero Section */}
      <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center text-center space-y-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full max-w-6xl aspect-[16/9] overflow-hidden rounded-sm shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]"
        >
          <img
            src={featuredDestination.images[0]?.src}
            alt={featuredDestination.title}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </motion.div>

        <div className="space-y-8 max-w-3xl px-4">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground/60 block font-medium">{t('home.featured_destination')}</span>
            <h1 className="text-5xl sm:text-8xl font-sans font-extralight tracking-tighter uppercase leading-[0.9] text-foreground">
              {t(featuredDestination.title)}
            </h1>
          </div>
          <p className="text-base sm:text-lg font-serif italic text-muted-foreground leading-relaxed max-w-xl mx-auto">
            {t(featuredDestination.description)}
          </p>

          <div className="pt-6">
            <Link
              to={`/destinations/${featuredDestination.slug}`}
              className="group inline-flex items-center space-x-4 text-[11px] uppercase tracking-[0.4em] border-b border-foreground/20 pb-3 hover:border-foreground transition-all duration-700"
            >
              <span className="font-light">{t('home.explore_destination')}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-700 group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Discovery Masonry Section */}
      <section className="py-32 sm:py-48 border-t border-border/5">
        <div className="space-y-20">
          <div className="flex flex-col sm:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground/60 font-medium">{t('home.curated_selection')}</span>
              <h2 className="text-4xl sm:text-6xl font-sans font-extralight tracking-tighter uppercase leading-[0.9] whitespace-pre-line">{t('home.discover_world')}</h2>
            </div>
            <Link
              to="/gallery"
              className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-all duration-500 flex items-center gap-3 group border-b border-transparent hover:border-foreground/20 pb-1"
            >
              {t('home.full_collection')} <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>

          <MasonryGallery images={discoveryImages} />
        </div>
      </section>
    </Layout>
  );
}
