import { useState, useCallback, useMemo } from "react";
import { GalleryImage } from "@/types/gallery";
import { ImageModal } from "./ImageModal";
import { ArtworkCard } from "./ArtworkCard";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface MasonryGalleryProps {
  images: GalleryImage[];
  columns?: number;
  className?: string;
}

export function MasonryGallery({ images, columns, className }: MasonryGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  // If columns not provided, use responsive defaults
  const effectiveColumns = useMemo(() => {
    if (columns) return columns;
    if (isMobile) return 1;
    return 3; // Default for desktop
  }, [columns, isMobile]);

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  const handleClose = useCallback(() => setSelectedIndex(null), []);
  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);
  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  const columnData = useMemo(() => {
    const cols: { image: GalleryImage; originalIndex: number }[][] = Array.from(
      { length: effectiveColumns },
      () => []
    );
    const colHeights = new Array(effectiveColumns).fill(0);

    images.forEach((image, index) => {
      const shortestCol = colHeights.indexOf(Math.min(...colHeights));
      cols[shortestCol].push({ image, originalIndex: index });
      // Calculate height based on aspect ratio to balance columns
      colHeights[shortestCol] += 1 / (image.aspectRatio || 0.75);
    });

    return cols;
  }, [images, effectiveColumns]);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground font-serif italic text-sm">No artworks available in this collection.</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "grid gap-6 sm:gap-8 md:gap-10",
          effectiveColumns === 1 ? "grid-cols-1" :
            effectiveColumns === 2 ? "grid-cols-2" :
              effectiveColumns === 3 ? "grid-cols-3" :
                "grid-cols-4", // Support up to 4 columns if needed elsewhere
          className
        )}
      >
        {columnData.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-6 sm:gap-8 md:gap-10">
            {col.map(({ image, originalIndex }) => (
              <ArtworkCard
                key={image.id}
                artwork={image}
                onClick={() => setSelectedIndex(originalIndex)}
              />
            ))}
          </div>
        ))}
      </div>

      <ImageModal
        image={selectedImage}
        isOpen={selectedIndex !== null}
        onClose={handleClose}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  );
}
