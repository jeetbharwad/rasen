"use client";

import { useRef, useState } from "react";
import { BarChart3 } from "lucide-react";
import { Container } from "../ui/Container";
import { Stat } from "../ui/Stat";

const stories = [
  {
    metric: "15,000+",
    metricText: "words created with Rasen",
    company: "Amplitude",
    name: "Scott Mathson",
    role: "Sr. SEO Manager",
    background: "#73736f",
    logo: "A",
  },
  {
    metric: "93%",
    metricText: "faster creation of campaigns because of Rasen",
    company: "commercetools",
    name: "Jen Jones",
    role: "CMO",
    background: "#858580",
    logo: "◆",
  },
  {
    metric: "800%",
    metricText: "surge in website traffic with Rasen",
    company: "bestplaces",
    name: "Al Olsen",
    role: "CTO",
    background: "#686b6d",
    logo: "b",
  },
  {
    metric: "10,000+",
    metricText: "hours saved yearly with Rasen",
    company: "CUSHMAN & WAKEFIELD",
    name: "David Hoebbel",
    role: "Director of Research",
    background: "#858585",
    logo: "▥",
  },
  {
    metric: "42%",
    metricText: "increase in content production with Rasen",
    company: "ACME",
    name: "Michael Brown",
    role: "Marketing Director",
    background: "#70726f",
    logo: "A",
  },
  {
    metric: "3x",
    metricText: "faster workflows powered by Rasen",
    company: "NORTHSTAR",
    name: "Sarah Wilson",
    role: "VP Marketing",
    background: "#777875",
    logo: "N",
  },
];

export default function CustomerStories() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScroll, setStartScroll] = useState(0);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;

    setIsDragging(true);
    setStartX(event.clientX);
    setStartScroll(sliderRef.current.scrollLeft);

    sliderRef.current.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;

    const distance = event.clientX - startX;

    sliderRef.current.scrollLeft = startScroll - distance;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;

    setIsDragging(false);

    if (sliderRef.current.hasPointerCapture(event.pointerId)) {
      sliderRef.current.releasePointerCapture(event.pointerId);
    }
  };

  const scrollCards = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const firstCard =
      sliderRef.current.querySelector<HTMLElement>("[data-story-card]");

    if (!firstCard) return;

    const gap = 12;
    const amount = firstCard.offsetWidth + gap;

    sliderRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full overflow-hidden bg-white py-10">
      <Container>
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="mx-auto flex items-start justify-between px-8">
          {/* LEFT */}
          <div>
            <div className="relative mb-3 flex items-center gap-1.5 pb-2 text-xs font-medium text-[#292929] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-[120px] after:bg-gray-300">
              {" "}
              <BarChart3 size={10} strokeWidth={1.5} />
              <span>Customer Stories</span>
            </div>

            <h2 className="max-w-[500px] text-[32px] font-medium leading-[1.08] tracking-[-1.5px] text-[#30302e]">
              Artificial Intelligence,
              <br />
              genuine results.
            </h2>
          </div>

          {/* RIGHT */}
          <div className="mt-7 flex flex-col items-start">
            <p className="mb-2 max-w-[240px] text-xs leading-[1.4] text-[#444]">
              How marketing leaders and their teams use Rasen to generate
              incredible value.
            </p>

            <div className="flex items-center gap-10">
              <button
                type="button"
                className="
                  h-[28px]
                  rounded-[3px]
                  border
                  border-[#999]
                  bg-white
                  px-8
                  text-[8px]
                  font-medium
                  text-[#292929]
                  transition
                  hover:bg-[#f5f5f5]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-black/10
                "
              >
                Explore Customer Stories
              </button>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  aria-label="Previous customer story"
                  onClick={() => scrollCards("left")}
                  className="
                    text-xl
                    leading-none
                    text-[#444]
                    transition
                    hover:text-black
                  "
                >
                  ←
                </button>

                <button
                  type="button"
                  aria-label="Next customer story"
                  onClick={() => scrollCards("right")}
                  className="
                    text-xl
                    leading-none
                    text-[#444]
                    transition
                    hover:text-black
                  "
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            CAROUSEL
        ====================================================== */}
        <div className="relative mt-12">
          {/* LEFT FADE */}
          <div
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              z-30
              h-full
              w-[55px]
              bg-gradient-to-r
              from-white
              via-white/85
              to-transparent
            "
          />

          {/* RIGHT FADE */}
          <div
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              z-30
              h-full
              w-[55px]
              bg-gradient-to-l
              from-white
              via-white/85
              to-transparent
            "
          />

          {/* =================================================
              SLIDER
          ================================================== */}
          <div
            ref={sliderRef}
            className={`
              customer-stories-scrollbar
              flex
              w-full
              gap-[12px]
              overflow-x-auto
              overflow-y-hidden
              px-[36px]
              pb-[7px]
              select-none
              touch-pan-x
              overscroll-x-contain
              ${isDragging ? "cursor-grabbing" : "cursor-grab"}
            `}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {stories.map((story, index) => (
              <article
                key={`${story.company}-${index}`}
                data-story-card
                className="
                  relative
                  h-[277px]
                  w-[187px]
                  min-w-[187px]
                  shrink-0
                  overflow-hidden
                  rounded-[12px]
                  bg-[#deddd3]

                  max-sm:h-[250px]
                  max-sm:w-[169px]
                  max-sm:min-w-[169px]

                  sm:h-[265px]
                  sm:w-[179px]
                  sm:min-w-[179px]

                  md:h-[400px]
                  md:w-[257px]
                  md:min-w-[257px]
                "
              >
                {/* =================================================
                    TOP BACKGROUND / IMAGE AREA
                ================================================== */}
                <div
                  className="
                    absolute
                    left-[7px]
                    right-[7px]
                    top-[8px]
                    bottom-0
                    overflow-hidden
                    rounded-t-[8px]
                  "
                  style={{
                    backgroundColor: story.background,
                  }}
                >
                  {/* Placeholder visual */}
                  <div
                    className="
                      absolute
                      inset-0
                     bg-[radial-gradient(circle_at_50%_30%,rgba(45,212,191,0.18),transparent_45%),linear-gradient(145deg,rgba(13,148,136,0.15),rgba(15,23,42,0.95))]"
                  />

                  {/* Fake image texture */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute left-[-15%] top-[20%] h-[65%] w-[65%] rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute bottom-[-15%] right-[-10%] h-[60%] w-[70%] rounded-full bg-black/10 blur-2xl" />
                  </div>
                </div>

                {/* =================================================
                    COMPANY NAME AT TOP OF VISUAL
                ================================================== */}
                <div
                  className="
                    absolute
                    left-[7px]
                    right-[7px]
                    top-[8px]
                    z-10
                    flex
                    h-[20px]
                    items-center
                    justify-center
                    bg-[#deddd3]
                  "
                />

                {/* =================================================
                    METRIC
                ================================================== */}
                <div
                  className="
                    absolute
                    left-[10%]
                    right-[10px]
                    bottom-[15%]
                    z-20
                    flex
                    items-center
                    gap-2
                    text-white
                  "
                >
                  <Stat
                    key={story.metricText}
                    className="text-[24px] font-bold"
                    value={story.metric}
                  />
                  <span
                    className="
                      min-w-0
                      text-[10px]
                      font-normal
                      leading-[1.15]
                      text-white
                    "
                  >
                    {story.metricText}
                  </span>
                </div>

                {/* =================================================
                    SEPARATOR
                ================================================== */}
                <div
                  className="
                    absolute
                    left-[14px]
                    right-[10px]
                    bottom-[35px]
                    z-20
                    h-px
                    bg-white/35
                  "
                />

                {/* =================================================
                    BOTTOM COMPANY INFO
                ================================================== */}
                <div
                  className="
                    absolute
                    inset-x-[7px]
                    bottom-0
                    z-20
                    h-[35px]
                    rounded-b-[8px]
                    bg-black/45
                  "
                >
                  {/* Logo / Company */}
                  <div
                    className="
                      absolute
                      left-[7px]
                      bottom-[7px]
                      flex
                      max-w-[105px]
                      items-center
                      justify-center
                      gap-[4px]
                      text-white
                    "
                  >
                    <span
                      className="
                        flex
                        h-[15px]
                        w-[15px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-base
                        font-semibold
                        text-[#555]
                      "
                    >
                      {story.logo}
                    </span>

                    <span
                      className="
                        truncate
                        text-[10px]
                        font-medium
                        leading-none
                        tracking-[-0.1px]
                      "
                    >
                      {story.company}
                    </span>
                  </div>

                  {/* Person */}
                  <div
                    className="
                      absolute
                      right-[6px]
                      bottom-[6px]
                      max-w-[100px]
                      text-right
                      text-white
                    "
                  >
                    <div className="truncate text-[10px] font-medium leading-[1.15]">
                      {story.name}
                    </div>

                    <div className="truncate text-[10px] leading-[1.15] text-white/75">
                      {story.role}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>

      {/* =========================================================
          SCROLLBAR
      ========================================================== */}
      <style jsx>{`
        .customer-stories-scrollbar {
          scrollbar-width: none;
          scrollbar-color: #8d8d8d transparent;
        }

        .customer-stories-scrollbar::-webkit-scrollbar {
          height: 7px;
        }

        .customer-stories-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 999px;
        }

        .customer-stories-scrollbar::-webkit-scrollbar-thumb {
          background: #8d8d8d;
          border-radius: 999px;
        }

        .customer-stories-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #666;
        }
      `}</style>
    </section>
  );
}
