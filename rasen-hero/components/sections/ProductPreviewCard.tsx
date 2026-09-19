import { PRODUCT_PREVIEW_TAGS } from "@/lib/constants";
import Image from "next/image";

export function ProductPreviewCard() {
  return (
    <div
      role="img"
      aria-label="Rasen chat assistant answering a policy question, with sources cited from a knowledge base and a spreadsheet"
      className="w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl shadow-neutral-900/10"
    >
      <Image
        src="/images/product-overview.jpg"
        alt="Product overview image"
        width={700}
        height={800}
        priority
        className="h-auto w-full"
      />

      {/* custome code to make this image kind of layout with elements */}
      {/* <div className="h-6 bg-lavender-100" />

      <div className="flex aspect-[7/4] items-stretch">
        <div className="flex w-10 flex-col items-center gap-3 bg-teal-800 py-3">
          <span className="h-2 w-2 rounded-full bg-white/70" />
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={`h-2.5 w-2.5 rounded-full border ${
                index === 1
                  ? "border-white bg-transparent"
                  : "border-transparent bg-white/25"
              }`}
            />
          ))}
        </div>

        <div className="hidden w-24 flex-col gap-2 bg-teal-50 p-3 sm:flex">
          <span className="h-2 w-2 rounded-full bg-teal-800/40" />
          {Array.from({ length: 4 }).map((_, index) => (
            <span
              key={index}
              className="h-1.5 w-full rounded-full bg-neutral-900/10"
            />
          ))}
        </div>

        <div className="flex flex-1 flex-col justify-end gap-2 bg-white p-3">
          <div className="flex items-center justify-between gap-2 rounded-xl border border-lavender-400 px-3 py-2">
            <p className="text-[11px] leading-snug text-neutral-700">
              How much is urgent care visits with Select Gold HMO plan?
            </p>
            <span
              aria-hidden
              className="h-5 w-5 shrink-0 rounded-full bg-neutral-900"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {PRODUCT_PREVIEW_TAGS.map((tag) => (
              <span
                key={tag.label}
                className="rounded-pill border border-neutral-200 px-2.5 py-1 text-[10px] font-medium text-neutral-600"
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}
