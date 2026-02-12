import { GalleryImage } from "@/types/gallery";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

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

  const modalContent = (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={onClose}
          onDoubleClick={onClose}
        >
          {/* Close Button - Minimalist */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[110] p-2 text-white/60 hover:text-white transition-colors duration-300 group"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" />
          </button>

          {/* Navigation Controls - Minimalist */}
          {onPrevious && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrevious(); }}
              className="absolute left-4 sm:left-12 z-[110] p-4 text-white/40 hover:text-white transition-colors duration-300 hidden sm:flex items-center justify-center group"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-10 h-10 group-hover:-translate-x-1 transition-transform" />
            </button>
          )}

          {onNext && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 sm:right-12 z-[110] p-4 text-white/40 hover:text-white transition-colors duration-300 hidden sm:flex items-center justify-center group"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-10 h-10 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          {/* Mobile Navigation Areas */}
          <div className="absolute inset-y-0 left-0 w-[20%] z-[105] sm:hidden" onClick={(e) => { e.stopPropagation(); if (onPrevious) onPrevious(); }} />
          <div className="absolute inset-y-0 right-0 w-[20%] z-[105] sm:hidden" onClick={(e) => { e.stopPropagation(); if (onNext) onNext(); }} />

          <motion.div
            initial={{ scale: 0.99, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.99, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full h-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center p-8 lg:p-12 gap-12 lg:gap-20"
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[65vh] lg:max-h-[75vh] w-full lg:w-3/5 flex items-center justify-center">
              <img
                src={image.src}
                alt={image.alt}
                className="max-w-full max-h-[60vh] lg:max-h-[75vh] object-contain shadow-2xl grayscale-[0.1] hover:grayscale-0 transition-all duration-700"
                draggable={false}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center lg:text-left max-w-sm lg:flex-1"
            >
              <h3 className="text-white font-serif text-lg sm:text-xl lg:text-2xl font-normal tracking-[0.12em] mb-4 uppercase leading-tight">
                {image.caption.subject}
              </h3>
              <div className="flex items-center justify-center lg:justify-start gap-4 text-[11px] sm:text-xs tracking-[0.3em] text-white/80 uppercase font-medium">
                <span>{image.caption.profession}</span>
                <span className="w-[1.5px] h-3 bg-white/20" />
                <span>{image.metadata.year}</span>
              </div>
              {image.metadata.location && (
                <p className="text-[10px] sm:text-[11px] text-white/70 mt-8 font-normal italic tracking-[0.4em] uppercase border-t border-white/10 pt-8 inline-block lg:block">
                  {image.metadata.location}
                </p>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
