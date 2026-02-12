import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PhotographerProfile } from '@/types/photographer';
import { Destination } from '@/types/gallery';

interface PortfolioState {
  photographer: PhotographerProfile | null;
  destinations: Destination[];
  loading: boolean;
  error: string | null;
}

interface PortfolioContextType extends PortfolioState {
  getDestinationBySlug: (slug: string) => Destination | undefined;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PortfolioState>({
    photographer: null,
    destinations: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const photographerResponse = await fetch('/data/photographer.json');
        const photographerData = await photographerResponse.json();

        // Load configured destinations
        const destinationSlugs = ['kyoto', 'iceland'];
        const destinationPromises = destinationSlugs.map(async (slug) => {
          const response = await fetch(`/data/destinations/${slug}.json`);
          if (!response.ok) {
            throw new Error(`Failed to load ${slug}`);
          }
          return response.json();
        });

        const destinationsData = await Promise.all(destinationPromises);

        setState({
          photographer: photographerData,
          destinations: destinationsData,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error loading data:', error);
        setState({
          photographer: null,
          destinations: [],
          loading: false,
          error: 'Failed to load portfolio data',
        });
      }
    };

    loadData();
  }, []);

  const getDestinationBySlug = (slug: string) => {
    return state.destinations.find((d) => d.slug === slug);
  };

  const value = {
    ...state,
    getDestinationBySlug
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
