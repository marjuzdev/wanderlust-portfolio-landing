import { GalleryImage } from "@/types/gallery";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useCallback } from "react";

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
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 text-primary-foreground" />
          </button>

          {onPrevious && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrevious(); }}
              className="absolute left-4 z-10 p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6 text-primary-foreground" />
            </button>
          )}

          {onNext && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 z-10 p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6 text-primary-foreground" />
            </button>
          )}

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            <div className="mt-3 text-center">
              <p className="text-primary-foreground font-semibold text-sm">
                {image.caption.subject}
              </p>
              <p className="text-primary-foreground/70 text-xs">
                {image.caption.profession} · {image.metadata.year}
              </p>
              {image.metadata.location && (
                <p className="text-primary-foreground/50 text-xs mt-1">
                  {image.metadata.location}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
