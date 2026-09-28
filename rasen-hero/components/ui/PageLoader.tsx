"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DNALoader from "../sections/DNA/DNAloader";

export function PageLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for initial render / DOM mount
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // Adjust duration (in ms) if needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-white"
          >
            {/* Spinner / Brand Logo */}
            <div className="flex flex-col items-center gap-4">
              <DNALoader/>
              <span className="font-['Courier_Prime',monospace] text-xs tracking-wider text-neutral-400">
                LOADING RASEN AI...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render page content behind or after load */}
      <div className={isLoading ? "invisible h-screen overflow-hidden" : "visible"}>
        {children}
      </div>
    </>
  );
}