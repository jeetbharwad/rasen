"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HERO_CONTENT, PARTNER_LOGOS } from "@/lib/constants";

// Header Icons for the Summer style
const IntersectIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    className="w-6 h-6 sm:w-8 sm:h-8 text-white/90 drop-shadow"
  >
    <circle cx="9" cy="12" r="6" />
    <circle cx="15" cy="12" r="6" />
  </svg>
);

const SparkleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 sm:w-7 sm:h-7 text-white/90 drop-shadow"
  >
    <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
    <path d="M6 3L6.8 5.2L9 6L6.8 6.8L6 9L5.2 6.8L3 6L5.2 5.2L6 3Z" />
    <path d="M18 15L18.8 17.2L21 18L18.8 18.8L18 21L17.2 18.8L15 18L17.2 17.2L18 15Z" />
  </svg>
);

export function Hero2() {
  const [showSummerStyle, setShowSummerStyle] = useState(true);

  return (
    <section className="relative">
      <Container>
        <div
          className="
            mx-auto
            flex
            min-h-[560px]
            flex-col
            items-center
            justify-center
            text-center
            px-4
            pt-24
            pb-20
            sm:min-h-[600px]
            sm:pt-28
            md:min-h-[500px]
            md:pt-32
            md:pb-24
          "
        >
          {showSummerStyle ? (
            /* --- NEW SUMMER STYLE (Click anywhere to return to original) --- */
            <div
              className="
                group
                cursor-pointer
                w-full
                flex
                flex-col
                items-center
                justify-center
                py-4
                transition-all
                duration-300
                hover:opacity-95
              "
              title="Click to switch back to original style"
            >
              {/* Top Icons Bar */}
              <div onClick={() => setShowSummerStyle(false)}
                className="flex items-center justify-between w-full max-w-xs sm:max-w-md mb-6 px-4">
                <IntersectIcon />
                <SparkleIcon />
                <IntersectIcon />
              </div>

              {/* HELLO Serif Title */}
              <h2
                className="
                  font-serif
                  text-3xl
                  sm:text-5xl
                  md:text-6xl
                  2xl:text-[72px]
                  tracking-[0.25em]
                  font-light
                  leading-none
                  uppercase
                  text-white
                  drop-shadow-md
                "
              >
                {HERO_CONTENT.announcement}
              </h2>

              {/* Summer Cursive Script Title */}
              <h1
                className="
                  font-script
                  text-6xl
                  sm:text-8xl
                  md:text-9xl
                  2xl:text-[130px]
                  font-normal
                  text-white
                  -mt-3
                  sm:-mt-6
                  md:-mt-8
                  2xl:-mt-10
                  transform
                  -rotate-1
                  drop-shadow-lg
                "
              >
                {HERO_CONTENT.headline}
              </h1>

              {/* Description Paragraph */}
              <p
                className="
                  font-sans
                  text-xs
                  sm:text-sm
                  md:text-base
                  2xl:text-lg
                  font-normal
                  tracking-wide
                  leading-relaxed
                  text-white/90
                  max-w-xs
                  sm:max-w-md
                  mt-4
                  sm:mt-6
                  drop-shadow-sm
                "
              >
                Time for vacations, laughter, and sunshine! Enjoy your best
                moments in this colorful season.
              </p>
            </div>
          ) : (
            /* --- ORIGINAL ANNOUNCEMENT + HEADING --- */
            <>
              {/* Announcement */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                  2xl:gap-4
                  rounded-full
                  border
                  border-white/20
                  bg-white
                  px-4
                  py-1.5
                  font-['Courier_Prime',monospace]
                  text-[10px]
                  text-neutral-600
                  shadow-sm
                  sm:text-xs
                  2xl:min-w-[523px]
                  2xl:min-h-[46px]
                "
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 2xl:w-2 2xl:h-2 rounded-full bg-[#746D6D]"
                />

                <span className="2xl:text-xl">
                  {HERO_CONTENT.announcement}
                </span>
              </div>

              {/* Heading */}
              <h1
                className="
                  my-6
                  2xl:mt-4
                  2xl:mb-8
                  max-w-[720px]
                  font-['Fraunces',serif]
                  text-4xl
                  font-bold
                  leading-[0.98]
                  tracking-[-1.5px]
                  text-white
                  sm:text-5xl
                  md:text-6xl
                  lg:text-[64px]
                  2xl:max-w-[1097px]
                  2xl:text-[80px]
                  2xl:leading-[85px]
                  2xl:px-3
                "
              >
                {HERO_CONTENT.headline}
              </h1>
            </>
          )}

          {/* CTA */}
          <Button
            variant="filled"
            className="mt-8 font-semibold 2xl:w-[185px] 2xl:h-[46px] 2xl:text-[22px] 2xl:leading-none"
          >
            {HERO_CONTENT.cta}
          </Button>
        </div>

        {/* Partner logos */}
        <ul
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
            px-4
            pb-16
            sm:gap-4
            sm:pb-20
            md:gap-5
            md:pb-24
            2xl:w-[1662px]
            2xl:justify-self-center
            2xl:mt-24
          "
        >
          {PARTNER_LOGOS.map((logo, index) => (
            <li key={index}>
              <div
                className="
                  flex
                  h-[38px]
                  w-[145px]
                  2xl:w-[247px]
                  2xl:h-[65px]
                  items-center
                  justify-center
                  rounded-[15px_0_15px_15px]
                  border-[2px]
                  border-white
                  px-5
                  text-[10px]
                  2xl:text-[22px]
                  2xl:leading-[35px]
                  font-semibold
                  tracking-wide
                  text-white
                  sm:w-[150px]
                  md:w-[155px]
                "
              >
                {logo.label}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}