import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HERO_CONTENT, PARTNER_LOGOS } from "@/lib/constants";
import { AutoTypeReveal } from "./Title";

export function Hero() {
  return (
    <section className="relative">
      <Container>
        <div className="mx-auto flex min-h-[560px] max-w-[1150px] flex-col items-center justify-center text-center px-4 pt-24 pb-20 sm:min-h-[600px] sm:pt-28 md:min-h-[500px] md:pt-32 md:pb-24">
          {/* Announcement */}
          <div className="item-hints">
            <div className="hint" data-position="4">

              {/* YOUR ORIGINAL DIV */}
              <div className="flex items-center gap-2 2xl:gap-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 font-['Courier_Prime',monospace] text-[10px] text-white shadow-sm sm:text-xs 2xl:min-w-[523px] 2xl:min-h-[46px]">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 2xl:w-2 2xl:h-2 rounded-full bg-emerald-400 animate-pulse"
                />
                <span className="2xl:text-xl">{HERO_CONTENT.announcement}</span>
              </div>

              {/* Hover Callout Box */}
              <div className="hint-content hidden md:flex do--split-children">
                <p className="hint-content-text text-xs text-slate-200">
                  Use chrome extensions on your system now !
                </p>
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="my-6 2xl:mt-4 2xl:mb-8 drop-shadow-lg text-4xl font-bold leading-[0.98] tracking-[-1.5px] text-white sm:text-5xl md:text-6xl lg:text-[64px] w-full 2xl:text-[80px] 2xl:leading-[85px] 2xl:px-3">
            <AutoTypeReveal />
          </div>

          {/* CTA */}
          <Button
            variant="filled"
            className="anatomy-trigger mt-8 gap-2 font-semibold 2xl:w-[185px] 2xl:h-[46px] 2xl:text-[22px] 2xl:leading-none"
          >


            {/* Original Button Text */}
            <span>{HERO_CONTENT.cta}</span>

            {/* Hover Annotations */}
            <div className="padding-left anatomy-hide">
              <div className="padding-left-line">
                <span className="padding-left-text">Powered</span>
              </div>
            </div>

            <div className="padding-right anatomy-hide">
              <div className="padding-right-line">
                <span className="padding-right-text">Voice</span>
              </div>
            </div>

            <div className="anatomy-bg-overlay anatomy-hide">
              <span className="background-text">Feeling</span>
            </div>

            <div className="anatomy-border anatomy-hide">
              <span className="border-text">Words</span>
            </div>
          </Button>
        </div>

        {/* Partner logos */}
      {/* Partner logos */}
<ul
  className="
    w-full
    max-w-[1662px]
    mx-auto
    flex
    flex-nowrap
    items-center
    justify-between
    gap-2
    sm:gap-3
    2xl:gap-4
    px-4
    pb-16
    sm:pb-20
    md:pb-24
    2xl:mt-24
  "
>
  {PARTNER_LOGOS.map((logo, index) => (
    <li key={index} className="flex-1 min-w-0">
      <div
        className="
          liquid-container
          flex
          h-[38px]
          sm:h-[48px]
          2xl:h-[65px]
          w-full
          items-center
          justify-center
          rounded-[12px]
          2xl:rounded-[15px_0_15px_15px]
          px-2
          sm:px-4
          group
          cursor-pointer
        "
      >
        {/* Liquid Background (Activates on Hover) */}
        <span className="liquid-bg" />

        {/* Partner Logo */}
        <img
          src={"/images/gemini.png"}
          alt="Partner logo"
          className="
            relative
            z-10
            max-h-4
            sm:max-h-5
            2xl:max-h-7
            max-w-full
            w-auto
            object-contain
            brightness-0
            invert
            opacity-75
            group-hover:opacity-100
            transition-all
            duration-300
          "
        />
      </div>
    </li>
  ))}
</ul>
      </Container>
    </section>
  );
}