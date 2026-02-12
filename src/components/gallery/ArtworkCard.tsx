import { GalleryImage } from "@/types/gallery";
import { motion } from "framer-motion";

interface ArtworkCardProps {
    artwork: GalleryImage;
    onClick?: (artwork: GalleryImage) => void;
}

export const ArtworkCard = ({ artwork, onClick }: ArtworkCardProps) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-muted/20"
            onClick={() => onClick?.(artwork)}
        >
            <div
                className="overflow-hidden relative"
                style={{ aspectRatio: artwork.aspectRatio || 0.75 }}
            >
                <img
                    src={artwork.src}
                    alt={artwork.alt}
                    className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Clean Pinterest-style Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-700 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100">
                    <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-700 space-y-3">
                        <div className="flex justify-between items-baseline gap-4 text-white">
                            <h3 className="text-base font-sans font-light uppercase tracking-[0.2em] line-clamp-1 border-b border-white/30 pb-1">
                                {artwork.metadata.title}
                            </h3>
                            <span className="text-[9px] font-sans opacity-60 uppercase tracking-[0.3em] shrink-0">
                                {artwork.metadata.year}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Always visible minimal info below image for accessibility/scannability */}

        </motion.div>
    );
};
