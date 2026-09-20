"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface StatProps {
  value: string; // Required prop
  label?: string; // Optional prop
  className?: string; // Optional custom styling/font-size for value
}

export function Stat({ label, value, className = "" }: StatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const numericMatch = value.match(/[\d.]+/);
  const targetNumber = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const prefix = value.slice(0, value.indexOf(numericMatch?.[0] || ""));
  const suffix = value.slice(
    (value.indexOf(numericMatch?.[0] || "") + (numericMatch?.[0].length || 0))
  );

  const count = useMotionValue(0);
  const springValue = useSpring(count, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      count.set(targetNumber);
    }
  }, [isInView, count, targetNumber]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        const hasDecimals = targetNumber % 1 !== 0;
        const formatted = latest.toFixed(hasDecimals ? 1 : 0);
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix, targetNumber]);

  return (
    <div>
      {label && (
        <p className="2xl:text-[22px] leading-none text-xs font-normal uppercase tracking-wide">
          {label}
        </p>
      )}
      <p className={` font-sans text-5xl  ${className}`}>
        <span ref={ref}>{prefix}0{suffix}</span>
      </p>
    </div>
  );
}