import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HERO_CONTENT, PARTNER_LOGOS } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative">
      <Container>
        <div
          className="
            mx-auto
            flex
            min-h-[560px]
            max-w-2xl
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
          {/* Announcement */}
          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/20
              bg-white
              px-4
              py-1.5
              font-mono
              text-[10px]
              text-neutral-600
              shadow-sm
              sm:text-xs
            "
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[#746D6D]"
            />

            <span>{HERO_CONTENT.announcement}</span>
          </div>

          {/* Heading */}
          <h1
            className="
              mt-6
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
            "
          >
            {HERO_CONTENT.headline}
          </h1>

          {/* CTA */}
          <Button
            variant="filled"
            className="mt-8"
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
          "
        >
          {PARTNER_LOGOS.map((logo, index) => (
            <li key={index}>
              <div
                className="
                  flex
                  h-[38px]
                  w-[145px]
                  items-center
                  justify-center
                  rounded-[15px_0_15px_15px]
                  border-[2px]
                  border-white
                  px-5
                  text-[10px]
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