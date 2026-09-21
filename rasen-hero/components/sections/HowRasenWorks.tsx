"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "../ui/Container";

const steps = [
  {
    label: "Step - 1",
    text: "Built for modern businesses that demand intelligent automation, this AI assistant is designed to handle both text-to-text and text-to-speech seamlessly.",
  },
  {
    label: "Step - 2",
    text: "Connect Rasen with your existing tools and workflows to automate repetitive tasks and create faster, more efficient customer experiences.",
  },
  {
    label: "Step - 3",
    text: "Give your team intelligent assistance that understands context, processes information quickly, and helps turn complex workflows into simple actions.",
  },
  {
    label: "Step - 4",
    text: "Create powerful AI-powered experiences across your website, applications, and business systems without rebuilding your existing technology stack.",
  },
  {
    label: "Step - 5",
    text: "Scale your AI experience as your business grows with flexible integrations, powerful automation, and seamless voice and text interactions.",
  },
];

export default function HowRasenWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const storyRef = useRef<HTMLDivElement>(null);

  /*
   * Change the active step based on how far the user
   * has scrolled through the How Rasen Works story.
   */
  useEffect(() => {
    const handleScroll = () => {
      if (!storyRef.current) return;

      const rect = storyRef.current.getBoundingClientRect();

      const scrollableDistance =
        storyRef.current.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);

      const stepIndex = Math.min(
        Math.floor(progress * steps.length),
        steps.length - 1,
      );

      setActiveStep(stepIndex);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  /*
   * Clicking a step ONLY changes the content.
   * It does NOT scroll the page.
   */
  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <section className="relative bg-white">
      <Container>
        <div className="mx-auto px-8">
          {/* Header */}
          <div className="flex flex-col gap-10 md:flex-row items-start justify-between pt-6">
            <div>
              <div className="relative mb-3 flex items-center gap-1.5 pb-2 text-xs 2xl:text-[14px] font-medium text-[#292929] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-[120px] after:bg-gray-300">
                <span className="text-[10px]">◉</span>

                <span>Rasen Everywhere</span>
              </div>

              <h2 className="text-[32px] 2xl:text-[55px] font-medium leading-[1.02] tracking-[-1.2px] text-[#30302e]">
                Rasen works
                <br />
                where you do
              </h2>
            </div>

            <div className="mt-0 max-w-[370px]">
              <p className="text-xs 2xl:text-lg leading-[1.35] text-[#333]">
                Get on-brand AI assistance everywhere with Rasen&apos;s browser
                extensions, integrations &amp; powerful API.
              </p>

              <button
                type="button"
                className="mt-2
                  h-[28px]
                  2xl:h-[48px]
                  rounded-[3px]
                  border
                  border-[#999]
                  bg-white
                  px-8
                  text-[8px]
                  2xl:text-[14px]
                  font-medium
                  text-[#292929]
                  transition
                  hover:bg-[#f5f5f5]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-black/10
                "
              >
                Explore Rasen Everywhere
              </button>
            </div>
          </div>

          {/* Scroll story */}
          <div ref={storyRef} className="relative mt-8 min-h-[1500px]">
            {/* Sticky content */}
            <div className="sticky top-0 flex flex-col md:flex-row gap-5 md:gap-0 h-screen -mb-[22%]  items-center">
              {/* Left content */}
              <div className="lg:w-[35%] self-start pt-[55px]">
                <h3 className="text-[27px] 2xl:text-[60px] font-normal leading-none tracking-[-1px] text-black">
                  How Rasen Works
                </h3>

                <p className="mt-5 2xl:mt-8 text-xs 2xl:text-[22px] leading-[1.35] text-[#222]">
                  Beyond just answers,Build an AI that understands
                  <br />
                  and responds with emotion .
                </p>
              </div>

              {/* DNA / steps */}
              <div className="relative flex flex-col  h-[500px] md:w-[45%] md:-mt-[15%]">
                {/* Dynamic step content */}
                <div className="relative md:absolute md:top-[33%] md:left-[-78%] md:mt-[88px] min-h-[100px] max-w-[255px] 2xl:max-w-[500px]">
                  <p
                    key={activeStep}
                    className="animate-fade-in font-light text-base 2xl:text-[25px] leading-[1.18] text-[#3b3b3b]"
                  >
                    {steps[activeStep].text}
                  </p>
                </div>
                {/* DNA path */}
                <svg
                  viewBox="0 0 330 520"
                  className="relative md:absolute inset-0 h-full w-full overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    {/* Linear gradient for the inner shining strands */}
                    <linearGradient
                      id="shineGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#151515" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                      <stop
                        offset="100%"
                        stopColor="#151515"
                        stopOpacity="0.8"
                      />
                    </linearGradient>
                  </defs>

                  {/* Left / outer DNA path */}
                  <path
                    d="M105 5
       C105 75 105 75 180 110
       C255 145 255 175 175 230
       C95 285 95 320 190 350
       C285 380 285 420 180 475
       C145 492 145 505 145 520"
                    stroke="#151515"
                    strokeWidth="1.5"
                  />

                  {/* Right / outer DNA path */}
                  <path
                    d="M190 25
       C120 65 90 100 105 145
       C120 190 210 195 230 235
       C250 275 170 315 150 355
       C130 395 175 425 235 455
       C260 468 260 490 260 520"
                    stroke="#151515"
                    strokeWidth="1.5"
                  />

                  {/* Inner DNA strands (shining effect applied) */}
                  <path
                    d="M102 129 C135 111 184 116 230 145"
                    stroke="url(#shineGradient)"
                    strokeWidth="1.5"
                    className="animate-pulse"
                  />

                  {/* Path 2 */}
                  <path
                    d="M109 144 C142 126 191 131 237 160"
                    stroke="url(#shineGradient)"
                    strokeWidth="1.5"
                    className="animate-pulse"
                  />

                  {/* Path 3 */}
                  <path
                    d="M116 159 C149 141 198 146 237 169"
                    stroke="url(#shineGradient)"
                    strokeWidth="1.5"
                    className="animate-pulse"
                  />

                  {/* Path 4 */}
                  <path
                    d="M123 174 C156 156 205 161 230 180"
                    stroke="url(#shineGradient)"
                    strokeWidth="1.5"
                    className="animate-pulse"
                  />

                  {/* Path 5 */}
                  <path
                    d="M142 183 C170 172 212 176 224 191"
                    stroke="url(#shineGradient)"
                    strokeWidth="1.5"
                    className="animate-pulse"
                  />
                  {/* second stands */}

                  {activeStep >= 2 && (
                    <>
                    <g className="animate-fade-in">
                      <path
                        className="animate-pulse"
                        d="M122 283 C140 242 262 256 214 287"
                        stroke="url(#shineGradient)"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M122 297 C140 272 232 270 209 294"
                        stroke="url(#shineGradient)"
                        strokeWidth="1.5"
                        className="animate-pulse"
                      />
                      <path
                        d="M122 313 C140 302 202 286 204 300"
                        stroke="url(#shineGradient)"
                        strokeWidth="1.5"
                        className="animate-pulse"
                      />
                      </g>
                    </>
                  )}
                  {activeStep >= 4 && (
                    <g className="animate-fade-in">
                      <path
                        d="M155 393 C140 392 202 366 254 390"
                        stroke="url(#shineGradient)"
                        strokeWidth="1.5"
                        className="animate-pulse"
                      />
                      <path
                        d="M160 403 C140 412 190 366 254 400"
                        stroke="url(#shineGradient)"
                        strokeWidth="1.5"
                        className="animate-pulse"
                      />
                      <path
                        d="M 169 409 C 150 432 190 366 254 410"
                        stroke="url(#shineGradient)"
                        strokeWidth="1.5"
                        className="animate-pulse"
                      />
                    </g>
                  )}
                </svg>

                {/* Interactive steps */}
                {steps.map((step, index) => {
                  const positions = [
                    // Step 1
                    "left-[82%] top-[18%] sm:left-[55%] sm:top-[19%] md:left-[59%] md:top-[20%] lg:left-[59%] lg:top-[20%]",

                    // Step 2
                    "left-[82%] top-[29%] sm:left-[28%] sm:top-[30%] md:left-[32%] md:top-[31%] lg:left-[32%] lg:top-[31%]",

                    // Step 3
                    "left-[82%] top-[45%] sm:left-[59%] sm:top-[46%] md:left-[63%] md:top-[47%] lg:left-[63%] lg:top-[47%]",

                    // Step 4
                    "left-[82%] top-[62%] sm:left-[30%] sm:top-[63%] md:left-[35%] md:top-[64%] lg:left-[35%] lg:top-[64%]",

                    // Step 5
                    "left-[82%] top-[72%] sm:left-[63%] sm:top-[73%] md:left-[67%] md:top-[74%] lg:left-[67%] lg:top-[74%]",
                  ];

                  const active = activeStep === index;

                  return (
                    <div
                      key={step.label}
                      className={`absolute ${positions[index]}`}
                    >
                      {/* Active glow */}
                      <span
                        className={`pointer-events-none absolute -inset-4 rounded-full bg-[#d9f9e9] blur-md transition-opacity duration-500 ${
                          active ? "opacity-100" : "opacity-0"
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() => handleStepClick(index)}
                        aria-current={active ? "step" : undefined}
                        className="group relative flex items-center gap-2 whitespace-nowrap text-[10px] text-[#383838]"
                      >
                        {/* Step dot */}
                        <span
                          className={`h-[6px] w-[6px] rounded-full border transition-all duration-300 ${
                            active
                              ? "scale-125 border-[#999] bg-[#d1d1d1]"
                              : "border-[#c7c7c7] bg-white"
                          }`}
                        />

                        {/* Step label */}
                        <span
                          className={`transition-all duration-300 ${
                            active ? "font-medium text-[#222]" : "text-[#555]"
                          }`}
                        >
                          {step.label}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </section>
  );
}
