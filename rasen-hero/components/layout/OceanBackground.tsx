export function OceanBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden max-w-[2000px] mx-auto"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-cover object-top"
      >
        <source src="/video/rasen-hero-video.mp4" type="video/mp4" />
      </video>
      {/* SMOOTH BOTTOM FADE OVERLAY */}
    <div className="absolute inset-x-0 bottom-0 h-40 sm:h-56 md:h-72 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
    </div>
  );
}