import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { usePortfolio } from "@/context/PortfolioContext";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";
import { GallerySkeleton } from "@/components/gallery/GallerySkeleton";
import { SEO } from "@/components/seo/SEO";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

import { useTranslation } from "react-i18next";

export default function Gallery() {
  const { destinations, photographer, loading } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const allImages = useMemo(
    () => destinations.flatMap((d) => d.images),
    [destinations]
  );

  const filteredImages = useMemo(() => {
    if (activeFilter === "all") return allImages;
    return allImages.filter((img) => img.metadata.series === activeFilter);
  }, [allImages, activeFilter]);

  const filters = useMemo(
    () => [
      { id: "all", label: t('gallery.all_destinations') },
      ...destinations.map((d) => ({ id: d.slug, label: t(d.title) })),
    ],
    [destinations, t]
  );

  const columns = isMobile ? 1 : 2; // More focus on each artwork

  if (loading) {
    return (
      <Layout fullPage>
        <SEO title="Collection" description="Photo collection" />
        <div className="py-8">
          <GallerySkeleton />
        </div>
      </Layout>
    );
  }

  return (
    <Layout fullPage>
      <SEO
        title={`${t('navigation.collection')} - ${photographer?.name ? t(photographer.name) : "Wanderlust Chronicles"}`}
        description="The complete collection of travel photography."
      />

      <div className="py-6 space-y-12">
        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">{t('gallery.archive')}</span>
          <h1 className="text-4xl sm:text-6xl font-sans font-extralight tracking-tight uppercase">{t('gallery.world_gallery')}</h1>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-8 sm:gap-12 mb-12 overflow-x-auto hide-scrollbar pb-4 sticky top-0 z-10 bg-background/80 backdrop-blur-md pt-4 -mt-4 border-b border-border/10">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "text-[10px] uppercase tracking-[0.2em] whitespace-nowrap pb-2 border-b transition-all duration-300",
                activeFilter === filter.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <MasonryGallery images={filteredImages} />
      </div>
    </Layout>
  );
}
