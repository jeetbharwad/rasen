import Link from "next/link";
import Image from "next/image";


export function Header() {
  return (
    <header className="w-full px-10 py-10 2xl:px-14 2xl:py-10">
      <div className="flex items-center justify-between">
        {/* Logo & Navigation Section */}
        <div className="flex items-center gap-12 md:gap-16 2xl:gap-28">
          <Link href="/" className="inline-block">
            <Image
              src="/images/rasen.png"
              alt="Rasen Logo"
              width={139}
              height={41}
              priority
              className="h-auto w-[120px] 2xl:w-[139px]"
            />
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-10 2xl:gap-16 font-['Inter',sans-serif] text-[25px] font-bold leading-none tracking-normal text-white">
              <li>
                <Link href="/" className="transition-colors hover:text-white/80">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/product" className="transition-colors hover:text-white/80">
                  Product
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/signin"
            className="inline-flex items-center w-32 2xl:w-[165px] justify-center rounded-[10px_10px_10px_0px] bg-transparent px-5 py-2 text-sm font-semibold text-white border border-black transition-colors hover:bg-white/10"
          >
            Sign in
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-32 2xl:w-[165px] items-center justify-center rounded-[10px_0px_10px_10px] bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-white/90"
          >
            Talk to Us
          </Link>
        </div>
      </div>
    </header>
  );
}
