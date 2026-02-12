import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export function SplashScreen() {
    const { loading } = usePortfolio();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!loading) {
            // Keep splash screen visible for a minimum time or just fade out when loaded
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 1500); // Minimum duration for effect
            return () => clearTimeout(timer);
        }
    }, [loading]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex flex-col items-center space-y-6"
                    >
                        <div className="w-24 h-24 border border-foreground/20 flex items-center justify-center relative overflow-hidden">
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                                className="absolute inset-0 bg-foreground/5 z-0"
                            />
                            <span className="font-serif text-4xl text-foreground relative z-10">WC</span>
                        </div>

                        <div className="space-y-2 text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="font-serif text-2xl tracking-[0.2em] uppercase"
                            >
                                Wanderlust
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="text-[10px] tracking-[0.5em] uppercase text-muted-foreground"
                            >
                                Chronicles
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
