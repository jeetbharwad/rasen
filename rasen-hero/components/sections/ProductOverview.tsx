import { Container } from "@/components/ui/Container";
import { Stat } from "@/components/ui/Stat";
import { ProductPreviewCard } from "@/components/sections/ProductPreviewCard";
import {
  PRODUCT_OVERVIEW_CONTENT,
  PRODUCT_STATS,
} from "@/lib/constants";

export function ProductOverview() {
  return (
    <section className="relative mt-52">
      <Container>
        <div
          className="
            grid
            gap-24
            px-4
            pb-20
            pt-12
            sm:px-6
            md:gap-16
            md:px-8
            md:pb-24
            md:pt-16
            lg:grid-cols-2
            lg:items-start
            lg:pt-20
          "
        >
          {/* LEFT */}
          <div>
            <p
              className="
                text-[18px]
                font-bold
                leading-none
                text-neutral-900
                sm:text-[20px]
                md:text-[24px]
              "
            >
              {PRODUCT_OVERVIEW_CONTENT.eyebrow}
            </p>

            <h2
              className="
                mt-2
                max-w-[560px]
                font-sans
                text-[40px]
                font-normal
                leading-[0.95]
                tracking-[-1.8px]
                text-neutral-900
                sm:text-[46px]
                md:text-5xl
                lg:text-[52px]
              "
            >
              {PRODUCT_OVERVIEW_CONTENT.headline}
            </h2>

            <div className="mt-8 md:mt-10">
              <ProductPreviewCard />
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              flex
              flex-col
              justify-center
              gap-5
              pt-4
              sm:pt-8
              md:pt-12
              lg:pt-24
              lg:ml-20
              max-w-[400px]
              self-center
          "
          >
            <p
              className="
                text-base
                font-semibold
                leading-[1.4]
                text-neutral-900
                sm:text-lg
              "
            >
              {PRODUCT_OVERVIEW_CONTENT.description}
            </p>

            <div className="h-[2px] w-full max-w-[430px] bg-neutral-400" />

            <div
              className="
                flex
                w-full
                max-w-[430px]
                items-start
                justify-between
                gap-8
                pt-4
              "
            >
              {PRODUCT_STATS.map((stat) => (
                <Stat
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}