import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { usePortfolio } from '@/context/PortfolioContext';
import { AboutPageLayout } from '@/components/about/AboutPageLayout';
import { SEO } from '@/components/seo/SEO';

export default function About() {
  const { photographer, loading, error } = usePortfolio();

  useEffect(() => {
    document.title = photographer
      ? `About ${photographer.name} - Travel & Exploration`
      : 'About - Wanderlust Chronicles';
  }, [photographer]);

  if (loading) {
    return (
      <Layout fullPage>
        <SEO title="About - Loading..." description="Loading photographer profile" />
        <div className="flex items-center justify-center h-[50vh]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !photographer) {
    return (
      <Layout fullPage>
        <SEO title="About - Error" description="Error loading photographer profile" />
        <div className="flex items-center justify-center h-[50vh]">
          <div className="text-center max-w-md px-4">
            <p className="text-destructive font-semibold">Error loading profile</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {error || "Could not load photographer profile"}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout fullPage>
      <SEO
        title={`About ${photographer.name} - Surrealist & Abstract Gallery`}
        description={photographer.tagline}
        image={photographer.portraitImage.src}
        type="profile"
      />
      <AboutPageLayout photographer={photographer} />
    </Layout>
  );
}
