"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Fraunces } from "next/font/google";

// SVG Icons replacing the video emojis
const IntersectIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-7 h-7 sm:w-9 sm:h-9 text-indigo-600 inline-block align-middle"
  >
    <circle cx="9" cy="12" r="6" />
    <circle cx="15" cy="12" r="6" />
  </svg>
);

const SparkleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500 inline-block align-middle"
  >
    <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
    <path d="M6 3L6.8 5.2L9 6L6.8 6.8L6 9L5.2 6.8L3 6L5.2 5.2L6 3Z" />
    <path d="M18 15L18.8 17.2L21 18L18.8 18.8L18 21L17.2 17.2L18 15Z" />
  </svg>
);

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
});

// Parent Container Variant (Controls Staggering)
const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Time gap between each word/icon animation
      delayChildren: 0.1,
    },
  },
};

// Word Text Variant (Smooth fade & slight scale up)
const wordVariants: Variants = {
  hidden: {
    opacity: 0.2,
    scale: 0.95,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

// Icon Variant (Pop-in spring effect like the video)
const iconVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.2,
    y: 8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 18,
    },
  },
};

export function AutoTypeReveal() {
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full mx-auto py-8 px-4 text-center"
      onAnimationComplete={() => setIsAnimationFinished(true)}
    >
      <div className={`${fraunces.className} font-bold text-3xl sm:text-5xl md:text-6xl 2xl:text-[80px] text-white leading-[1.35] tracking-[0%]`}>
        
        {/* Word 1 */}
        <motion.span variants={wordVariants} className="inline-block mr-[0.2em]">
          Your
        </motion.span>

        {/* Word 2 */}
        <motion.span variants={wordVariants} className="inline-block mr-[0.2em]">
          words,
        </motion.span>

        {/* Word 3 */}
        <motion.span variants={wordVariants} className="inline-block mr-[0.2em]">
          powered
        </motion.span>

        {/* Word 4 */}
        <motion.span variants={wordVariants} className="inline-block mr-[0.2em]">
          with
        </motion.span>
        <br />
        {/* Word 5 */}
        <motion.span variants={wordVariants} className="inline-block mr-[0.2em]">
          voice
        </motion.span>

        {/* First Pop-in Icon */}
        {/* <motion.span
          variants={iconVariants}
          className="inline-flex items-center justify-center mx-1 px-2 py-1 bg-white rounded-xl shadow-sm border border-neutral-200 align-middle"
        >
          <SparkleIcon />
        </motion.span> */}

        {/* Word 6 */}
        <motion.span variants={wordVariants} className="inline-block ml-[0.2em] mr-[0.2em]">
          and
        </motion.span>

        {/* Word 7 */}
        <motion.span variants={wordVariants} className="inline-block mr-[0.2em]">
          feeling.
        </motion.span>
      </div>
    </motion.h1>
  );
}