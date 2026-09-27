"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "../ui/Container";
import DNA3D from "./DNA3D";

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
  const [scrollProgress, setScrollProgress] = useState(0);

  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number | null = null;

    const updateStory = () => {
      if (!storyRef.current) return;

      const rect = storyRef.current.getBoundingClientRect();

      const scrollableDistance =
        storyRef.current.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const progress = Math.min(
        Math.max(-rect.top / scrollableDistance, 0),
        1
      );

      const stepIndex = Math.min(
        Math.floor(progress * steps.length),
        steps.length - 1
      );

      setScrollProgress(progress);
      setActiveStep(stepIndex);
    };

    const handleScroll = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        updateStory();
        frameId = null;
      });
    };

    updateStory();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateStory);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateStory);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <section className="relative bg-white">
      <Container>
        <div className="mx-auto px-8">
          {/* ================= HEADER ================= */}
          <div className="flex flex-col items-start justify-between gap-10 pt-6 md:flex-row">
            <div>
              <div className="relative mb-3 flex items-center gap-1.5 pb-2 text-xs font-medium text-[#292929] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-[120px] after:bg-gray-300 2xl:text-[14px]">
                <span className="text-[10px]">
                  ◉
                </span>

                <span>Rasen Everywhere</span>
              </div>

              <h2 className="text-[32px] font-medium leading-[1.02] tracking-[-1.2px] text-[#30302e] 2xl:text-[55px]">
                Rasen works
                <br />
                where you do
              </h2>
            </div>

            <div className="mt-0 max-w-[370px]">
              <p className="text-xs leading-[1.35] text-[#333] 2xl:text-lg">
                Get on-brand AI assistance everywhere with Rasen&apos;s
                browser extensions, integrations &amp; powerful API.
              </p>

              <button
                type="button"
                className="mt-2 h-[28px] rounded-[3px] border border-[#999] bg-white px-8 text-[8px] font-medium text-[#292929] transition hover:bg-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-black/10 2xl:h-[48px] 2xl:text-[14px]"
              >
                Explore Rasen Everywhere
              </button>
            </div>
          </div>

          {/* ================= SCROLL STORY ================= */}
          <div
            ref={storyRef}
            className="relative mt-8 min-h-[1800px]"
          >
            <div className="sticky top-0 flex h-screen items-center gap-5 flex-col md:flex-row md:gap-0">
              {/* ================= LEFT CONTENT ================= */}
              <div className="self-start pt-[55px] lg:w-[35%]">
                <h3 className="text-[27px] font-normal leading-none tracking-[-1px] text-black 2xl:text-[60px]">
                  How Rasen Works
                </h3>

                <p className="mt-5 text-xs leading-[1.35] text-[#222] 2xl:mt-8 2xl:text-[22px]">
                  Beyond just answers, Build an AI that understands
                  <br />
                  and responds with emotion.
                </p>
              </div>

              {/* ================= DNA / STORY AREA ================= */}
              <div className="relative h-[500px] w-full md:-mt-[15%] md:w-[45%]">
                {/* ================= DYNAMIC CONTENT ================= */}
                <div className="relative min-h-[100px] max-w-[255px] md:absolute md:left-[-78%] md:top-[33%] mt-0 md:mt-[88px] 2xl:max-w-[500px]">
                  <p
                    key={activeStep}
                    className="animate-fade-in text-base font-light leading-[1.18] text-[#3b3b3b] 2xl:text-[25px]"
                  >
                    {steps[activeStep].text}
                  </p>
                </div>

                {/* ================= 3D DNA ================= */}
                <div className="relative md:absolute inset-0 flex items-center justify-center  h-[300px] sm:h-[460px]
    md:h-[500px]
    lg:h-[560px]
    xl:h-[500px]
    2xl:h-[540px]">
                  <DNA3D scrollProgress={scrollProgress} />
                </div>

                {/* ================= STEP LABELS ================= */}
                {steps.map((step, index) => {
                  const positions = [
                    "left-[82%] top-[18%] sm:left-[55%] sm:top-[19%] md:left-[59%] md:top-[20%] lg:left-[59%] lg:top-[17%]",

                    "left-[82%] top-[29%] sm:left-[28%] sm:top-[30%] md:left-[32%] md:top-[31%] lg:left-[15%] lg:top-[31%]",

                    "left-[82%] top-[45%] sm:left-[59%] sm:top-[46%] md:left-[63%] md:top-[47%] lg:left-[69%] lg:top-[47%]",

                    "left-[82%] top-[62%] sm:left-[30%] sm:top-[63%] md:left-[35%] md:top-[64%] lg:left-[25%] lg:top-[64%]",

                    "left-[82%] top-[72%] sm:left-[63%] sm:top-[73%] md:left-[67%] md:top-[74%] lg:left-[75%] lg:top-[74%]",
                  ];

                  const active = activeStep === index;

                  return (
                    <div
                      key={step.label}
                      className={`absolute z-20 ${positions[index]}`}
                    >
                      {/* Active glow */}
                      <span
                        className={`pointer-events-none absolute -inset-4 rounded-full bg-[#d9f9e9] blur-md transition-opacity duration-500 ${
                          active
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() => handleStepClick(index)}
                        aria-current={
                          active ? "step" : undefined
                        }
                        className="group relative flex items-center gap-2 whitespace-nowrap text-[10px] text-[#383838]"
                      >
                        <span
                          className={`h-[6px] w-[6px] rounded-full border transition-all duration-300 ${
                            active
                              ? "scale-125 border-[#999] bg-[#d1d1d1]"
                              : "border-[#c7c7c7] bg-white"
                          }`}
                        />

                        <span
                          className={`transition-all duration-300 ${
                            active
                              ? "font-medium text-[#222]"
                              : "text-[#555]"
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

      {/* ================= ANIMATIONS ================= */}
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

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}