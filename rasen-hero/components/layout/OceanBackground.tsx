"use client";

import { useState, useRef, useEffect } from "react";

export function OceanBackground() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if the video is already ready or playing on initial load
    if (videoRef.current && videoRef.current.readyState >= 2) {
      setIsVideoLoaded(true);
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden max-w-[2000px] mx-auto bg-[#003651]"
    >
      {/* 1. PLACEHOLDER / SKELETON LAYER */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ease-out ${
          isVideoLoaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="h-full w-full bg-gradient-to-b from-slate-900 via-indigo-950/80 to-slate-900 animate-pulse" />
      </div>

      {/* 2. VIDEO LAYER */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setIsVideoLoaded(true)}
        onPlaying={() => setIsVideoLoaded(true)}
        className={`h-full w-full object-cover object-top transition-opacity duration-300 ease-in ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/video/rasen-hero-video.mp4" type="video/mp4" />
      </video>

      {/* 3. SMOOTH BOTTOM FADE OVERLAY */}
      <div className="absolute inset-x-0 bottom-0 h-40 sm:h-56 md:h-72 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
    </div>
  );
}