import { GalleryImage } from "@/types/gallery";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ImageModalProps {
  image: GalleryImage | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function ImageModal({ image, isOpen, onClose, onPrevious, onNext }: ImageModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrevious) onPrevious();
      if (e.key === "ArrowRight" && onNext) onNext();
    },
    [onClose, onPrevious, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
          onClick={onClose}
        >
          {/* Close Button - Optimized for Touch */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 z-[110] p-3 rounded-full bg-black/10 hover:bg-black/20 text-foreground transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-foreground/10"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Navigation Controls - Optimized for Touch */}
          {onPrevious && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrevious(); }}
              className="absolute left-2 sm:left-8 z-[110] p-3 rounded-full bg-black/5 hover:bg-black/20 text-foreground transition-all duration-300 backdrop-blur-sm hidden sm:flex items-center justify-center group"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-8 h-8 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}

          {onNext && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-2 sm:right-8 z-[110] p-3 rounded-full bg-black/5 hover:bg-black/20 text-foreground transition-all duration-300 backdrop-blur-sm hidden sm:flex items-center justify-center group"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-8 h-8 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Mobile Navigation Areas (Invisible tap zones) */}
          <div className="absolute inset-y-0 left-0 w-[15%] z-[105] sm:hidden" onClick={(e) => { e.stopPropagation(); if (onPrevious) onPrevious(); }} />
          <div className="absolute inset-y-0 right-0 w-[15%] z-[105] sm:hidden" onClick={(e) => { e.stopPropagation(); if (onNext) onNext(); }} />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
            className="relative w-full h-full max-w-7xl mx-auto flex flex-col items-center justify-center p-4 sm:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[85vh] w-full flex items-center justify-center">
              <img
                src={image.src}
                alt={image.alt}
                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                draggable={false}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-center max-w-2xl px-4"
            >
              <h3 className="text-foreground font-serif text-xl sm:text-2xl font-light tracking-wide mb-1">
                {image.caption.subject}
              </h3>
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm tracking-widest text-muted-foreground uppercase">
                <span>{image.caption.profession}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span>{image.metadata.year}</span>
              </div>
              {image.metadata.location && (
                <p className="text-xs text-muted-foreground/60 mt-2 font-light italic">
                  {image.metadata.location}
                </p>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
