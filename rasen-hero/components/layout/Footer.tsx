// components/sections/Footer.tsx

import Link from "next/link";
import { Container } from "../ui/Container";
import Image from "next/image";

const contactDetails = {
  address: {
    title: "Address :",
    lines: ["301, Silver Heights,", "150 Feet Ring Road,", "Rajkot, Gujarat - 360005, India"],
  },
  email: {
    title: "Email :",
    links: [
      {
        label: "support@yourcompany.com",
        href: "mailto:support@yourcompany.com",
      },
      {
        label: "info@yourcompany.com",
        href: "mailto:info@yourcompany.com",
      },
    ],
  },
  phone: {
    title: "Phone :",
    links: [
      {
        label: "+99 98798 74321",
        href: "tel:+999879874321",
      },
      {
        label: "+11 12345 55998",
        href: "tel:+111234555998",
      },
    ],
  },
};

export default function Footer() {
  return (
    <footer className=" relative z-[2] w-full bg-black text-white">
      <Container>
      <div className="mx-auto px-[30px] py-[68px] 2xl:py-[100px] sm:px-[40px] lg:px-0">
        {/* Top divider */}
        <div className="h-px w-full bg-[#444]" />

        {/* Main footer content */}
        <div className="flex min-h-[190px] flex-col justify-between py-[47px] lg:flex-row lg:items-center">
          {/* Brand / description */}
          <div className="lg:w-[42%]">
            <Link
              href="/"
              aria-label="Rasen home"
              className="inline-block text-[52px] font-medium leading-none tracking-[-4px] text-white"
            >
              <Image
                            src="/images/rasen.png"
                            alt="Rasen Logo"
                            width={139}
                            height={41}
                            priority
                            className="h-auto w-[120px] 2xl:w-[224px]"
                          />
            </Link>

            <p className="mt-[8px]  text-[13px] 2xl:text-[22px] font-normal leading-[1.55] tracking-[-0.1px] text-[#e2e2e2]">
              Designed for flexibility, it supports multiple languages
              <br className="hidden sm:block" />
              and diverse use cases, making it ideal for both startups
              <br className="hidden sm:block" />
              and enterprises.
            </p>
          </div>

          {/* Contact information */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-[1.45fr_1fr_1fr]   md:gap-x-[34px] text-[11px] 2xl:text-[18px] lg:mt-0 lg:w-[45%]">
            {/* Address */}
            <div>
              <div className="mb-[18px] flex items-center gap-[6px]  font-normal text-[#dedede]">
                <span>{contactDetails.address.title}</span>
              </div>

              <address className="not-italic  leading-[1.5] text-[#777]">
                {contactDetails.address.lines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </address>
            </div>

            {/* Email */}
            <div>
              <div className="mb-[18px] flex items-center gap-[6px]  font-normal text-[#dedede]">
                <span>{contactDetails.email.title}</span>
              </div>

              <div className="flex flex-col gap-[10px]">
                {contactDetails.email.links.map((email) => (
                  <a
                    key={email.href}
                    href={email.href}
                    className=" leading-none text-[#777] transition-colors duration-200 hover:text-white focus:outline-none focus-visible:text-white"
                  >
                    {email.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Phone */}
            <div>
              <div className="mb-[18px] flex items-center gap-[6px]  font-normal text-[#dedede]">
                <span>{contactDetails.phone.title}</span>
              </div>

              <div className="flex flex-col gap-[10px]">
                {contactDetails.phone.links.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    className=" leading-none text-[#777] transition-colors duration-200 hover:text-white focus:outline-none focus-visible:text-white"
                  >
                    {phone.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="h-px w-full bg-[#333]" />
      </div>
      </Container>
    </footer>
  );
}