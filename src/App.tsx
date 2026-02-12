import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { Suspense, lazy } from "react";
import { GallerySkeleton } from "@/components/gallery/GallerySkeleton";
import { Layout } from "@/components/layout/Layout";
import { SplashScreen } from "@/components/ui/SplashScreen";

const Home = lazy(() => import("./pages/Home"));
const DestinationPage = lazy(() => import("./pages/DestinationPage"));
const About = lazy(() => import("./pages/About"));
const Gallery = lazy(() => import("./pages/Gallery"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <Layout>
    <div className="h-full flex items-center justify-center">
      <GallerySkeleton />
    </div>
  </Layout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PortfolioProvider>
          <SplashScreen />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destinations/:slug" element={<DestinationPage />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PortfolioProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
