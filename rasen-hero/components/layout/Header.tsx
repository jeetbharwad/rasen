import Link from "next/link";
import Image from "next/image";
import { Container } from "../ui/Container";


export function Header() {
  return (
    <header className="w-full px-10 py-10 2xl:px-14 2xl:py-10">
      <Container className="px-0 2xl:max-w-[1920px] mx-auto">
        <div className="flex items-center justify-between gap-4 sm:gap-0">
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
              <ul className="flex items-center gap-10 2xl:gap-16 font-['Inter',sans-serif] text-base 2xl:text-[25px] font-bold leading-none tracking-normal text-white mt-1">
                <li>
                  <Link
                    href="/"
                    className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Product
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* <Link
              href="/signin"
              className="liquid-container inline-flex items-center w-32 2xl:h-[46px] 2xl:w-[165px] justify-center rounded-[10px_10px_10px_0px] bg-transparent px-5 py-2 text-sm 2xl:text-[22px] font-semibold text-white  border-black"
            > */}
              {/* Liquid Background (Activates on Hover) */}
              {/* <span className="liquid-bg" />
              <span className="z-10">Sign in</span>
            </Link> */}
            
            <Link
                  href="/"
                  className="
                    group
                    relative
                    overflow-hidden
                    inline-flex
                     w-[80px]
                    2xl:h-[46px]
                    2xl:w-[165px]
                    items-center
                    justify-center
                    rounded-[10px_10px_10px_0px]
                    bg-transparent
                    px-5
                    py-2
                    text-[10px]
                    sm:text-sm
                    2xl:text-[22px]
                    font-semibold
                    text-white
                    border border-white/30
                  "
                >            
                  {/* Shining Sweep Light Effect */}
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -inset-y-full
                      -left-1/2
                      z-10
                      h-[300%]
                      w-[60%]
                      -rotate-45
                      bg-gradient-to-r
                      from-transparent
                      via-white/30
                      to-transparent
                      transition-all
                      duration-700
                      ease-out
                      group-hover:translate-x-[350%]
                    "
                  />

                  {/* Button Text */}
                  <span className="relative">Sign in</span>
                </Link>

                  <Link
                  href="/"
                  className="
                    group
                    relative
                    overflow-hidden
                    inline-flex
                   w-[95px]
                    2xl:h-[46px]
                    2xl:w-[165px]
                    items-center
                    justify-center
                    rounded-[10px_10px_10px_0px]
                    bg-white
                    px-5
                    py-2
                   text-[10px]
                    sm:text-sm
                    2xl:text-[22px]
                    font-semibold
                    text-black
                    border border-white/30
                  "
                >            
                  {/* Shining Sweep Light Effect */}
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -inset-y-full
                      -left-1/2
                      z-10
                      h-[300%]
                      w-[60%]
                      -rotate-45
                      bg-gradient-to-r
                      from-transparent
                      via-black/20
                      to-transparent
                      transition-all
                      duration-700
                      ease-out
                      group-hover:translate-x-[350%]
                    "
                  />

                  {/* Button Text */}
                  <span className="relative">Contact Us</span>
                </Link>

            {/* <Link
              href="/contact"
              className="liquid-container inline-flex w-32 2xl:h-[46px] 2xl:w-[165px] items-center justify-center rounded-[10px_0px_10px_10px] !bg-white px-5 py-2 text-sm 2xl:text-[22px] font-semibold text-slate-900 transition-colors hover:text-white"
            > */}
              {/* Liquid Background (Activates on Hover) */}
              {/* <span className="liquid-bg" />
              <span className="z-10">Contact Us</span>
            </Link> */}
          </div>
        </div>
      </Container>
    </header>
  );
}
