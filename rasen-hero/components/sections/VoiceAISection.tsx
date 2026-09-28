"use client";

import { useState } from "react";
import {  FileCode2, Check } from "lucide-react";
import { Container } from "../ui/Container";
import DNALoader from "./DNA/DNAloader";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion"

type Language = "Python" | "Node.js" | "cURL" | ".NET";

const tabs: Language[] = ["Python", "Node.js", "cURL", ".NET"];

const codeExamples: Record<Language, string[]> = {
  Python: [
    "from deepgram import Deepgram",
    "import json",
    "",
    "DEEPGRAM_API_KEY = 'YOUR_SECRET'",
    "",
    "AUDIO_URL = 'https://static.deepgram.com/examples/Bueller-",
    "Life-moves-pretty-fast.wav'",
    "",
    "def main():",
    "    dg_client = Deepgram(DEEPGRAM_API_KEY)",
    "    response = dg_client.transcription.sync_prerecorded(",
    "        {",
    "            'url': AUDIO_URL,",
    "        },",
    "        {",
    "            'model': 'nova-2',",
    "            'language': 'en',",
    "            'smart_format': True,",
    "            'summarize': 'v2',",
    "            'detect_topics': True,",
    "        }",
  ],

  "Node.js": [
    "import { createClient } from '@deepgram/sdk';",
    "import fs from 'fs';",
    "",
    "const DEEPGRAM_API_KEY = 'YOUR_SECRET';",
    "",
    "const AUDIO_URL = 'https://static.deepgram.com/audio.wav';",
    "",
    "async function main() {",
    "    const deepgram = createClient(DEEPGRAM_API_KEY);",
    "    const response = await deepgram.listen.prerecorded.transcribeUrl(",
    "        { url: AUDIO_URL },",
    "        {",
    "            model: 'nova-2',",
    "            language: 'en',",
    "            smart_format: true,",
    "        },",
    "    );",
    "}",
    "",
    "main();",
  ],

  cURL: [
    "curl --request POST \\",
    "  --url https://api.deepgram.com/v1/listen \\",
    "  --header 'Authorization: Token YOUR_SECRET' \\",
    "  --header 'Content-Type: application/json' \\",
    "  --data '{",
    '    "url": "https://static.deepgram.com/audio.wav",',
    '    "model": "nova-2",',
    '    "language": "en",',
    '    "smart_format": true,',
    '    "summarize": "v2",',
    '    "detect_topics": true',
    "  }'",
  ],

  ".NET": [
    "using Deepgram;",
    "using Deepgram.Models.Listen.v2;",
    "",
    "var client = new DeepgramClient(",
    '    "YOUR_SECRET"',
    ");",
    "",
    "var response = await client.Listen(",
    "    new ListenRequest",
    "    {",
    '        Model = "nova-2",',
    '        Language = "en",',
    "        SmartFormat = true,",
    '        Summarize = "v2",',
    "        DetectTopics = true",
    "    });",
    "",
    "Console.WriteLine(response);",
  ],
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightCode(line: string, language: Language) {
  let escaped = escapeHtml(line);

  if (!escaped) {
    return "&nbsp;";
  }

  /*
   * Strings first so keywords inside strings aren't
   * incorrectly highlighted.
   */
  const strings: string[] = [];

  escaped = escaped.replace(
    /(["'])(.*?)(\1)/g,
    (match) => {
      const index = strings.push(match) - 1;
      return `___STRING_${index}___`;
    },
  );

  escaped = escaped
    .replace(
      /\b(import|from|def|const|let|var|async|function|using|new|await|curl|return|class|public|private|true|false)\b/g,
      '<span class="text-[#c586c0]">$1</span>',
    )
    .replace(
      /\b(True|False|true|false)\b/g,
      '<span class="text-[#569cd6]">$1</span>',
    )
    .replace(
      /\b(DEEPGRAM_API_KEY|AUDIO_URL)\b/g,
      '<span class="text-[#9cdcfe]">$1</span>',
    )
    .replace(
      /\b(model|language|smart_format|summarize|detect_topics|url)\b/g,
      '<span class="text-[#9cdcfe]">$1</span>',
    )
    .replace(
      /\b(nova-2|v2|en)\b/g,
      '<span class="text-[#b5cea8]">$1</span>',
    )
    .replace(
      /\b(Deepgram|DeepgramClient|ListenRequest)\b/g,
      '<span class="text-[#4ec9b0]">$1</span>',
    );

  strings.forEach((string, index) => {
    escaped = escaped.replace(
      `___STRING_${index}___`,
      `<span class="text-[#ce9178]">${string}</span>`,
    );
  });

  return escaped;
}

function TabIcon({ tab }: { tab: Language }) {
  if (tab === "Python") {
    return (
      <span
        className="relative inline-flex h-[10px] w-[10px] items-center justify-center"
        aria-hidden="true"
      >
        <span className="absolute left-[1px] top-0 h-[6px] w-[6px] rounded-[2px] bg-[#3776ab]" />
        <span className="absolute bottom-0 right-[1px] h-[6px] w-[6px] rounded-[2px] bg-[#ffd343]" />
      </span>
    );
  }

  if (tab === "Node.js") {
    return (
      <span
        className="text-[8px] text-[#85858a]"
        aria-hidden="true"
      >
        ◈
      </span>
    );
  }

  if (tab === "cURL") {
    return (
      <span
        className="font-mono text-[8px] text-[#85858a]"
        aria-hidden="true"
      >
        &gt;_
      </span>
    );
  }

  return (
    <span
      className="text-[8px] text-[#85858a]"
      aria-hidden="true"
    >
      ◈
    </span>
  );
}

export default function VoiceAISection() {
  const [activeTab, setActiveTab] =
    useState<Language>("Python");

  // Inside your component:
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCode = () => {
    // Join the current tab's code array into a single string
    const contentToCopy = Array.isArray(code) ? code.join("\n") : code;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(contentToCopy).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2s
      });
    }
  };

  const code = codeExamples[activeTab];

  const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each child
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

  return (
    <section className="w-full bg-white">
      <Container>
        <motion.div
        variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2}}
        className="mx-auto flex flex-col lg:flex-row  items-center lg:items-start justify-between lg:justify-start gap-12 px-8 py-8 lg:gap-16">

          {/* =========================
              LEFT CONTENT
          ========================== */}
          <motion.div variants={itemVariants}  className="w-full lg:w-1/2 ">
            <div className="relative mb-3 flex items-center gap-1.5 pb-2 text-sm 2xl:text-[18px] font-medium text-[#292929] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-[120px] after:bg-gray-300">
              <span>↗</span>

              <span>
                Lightning-Fast Text To Speech For Voice AI Agents
              </span>
            </div>

            <h2 className="lg:max-w-[430px] text-4xl 2xl:text-[55px] font-medium leading-[1.05] tracking-[-1.4px] text-[#292929]">
              Build voice with
              Rasen AI
            </h2>

            <p className="mt-8 lg:max-w-[350px] 2xl:max-w-[450px] text-sm 2xl:text-lg leading-[1.55] text-[#858585]">
              Rasen’s voice AI platform provides APIs for speech-to-text,
              text-to-speech, and language understanding. From medical
              transcription to autonomous agents, Rasen is the go-to choice
              for developers of voice AI experiences.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <div className="mt-5 flex items-center gap-2">
                {/* Try For Free Button */}
                <button
                  type="button"
                  className="
      h-[25px] md:h-[30px] 2xl:h-[38px]
      rounded-[3px]
      border
      border-[#e5e5e5]
      bg-white
      px-4
      text-xs 2xl:text-base
      font-semibold
      text-[#222]
      shadow-[rgba(0,0,0,0.09)_0px_2px_1px,rgba(0,0,0,0.09)_0px_4px_2px,rgba(0,0,0,0.09)_0px_8px_4px,rgba(0,0,0,0.09)_0px_16px_8px,rgba(0,0,0,0.09)_0px_32px_16px]
      transition-all
      duration-200
      ease-out
      hover:-translate-y-0.5
      hover:bg-[#f7f7f7]
      hover:shadow-[rgba(0,0,0,0.12)_0px_4px_2px,rgba(0,0,0,0.12)_0px_8px_4px,rgba(0,0,0,0.12)_0px_16px_8px,rgba(0,0,0,0.12)_0px_24px_12px]
      active:translate-y-0
      focus:outline-none
      focus:ring-2
      focus:ring-black/20
    "
                >
                  Try For Free
                </button>

                {/* Book A Demo Button */}
                <button
                  type="button"
                  className="
                   h-[25px] md:h-[30px] 2xl:h-[38px]
                    rounded-[3px]
                    bg-black
                    px-3
                    text-xs 2xl:text-base
                    font-semibold
                    text-white
                    shadow-[rgba(0,0,0,0.09)_0px_2px_1px,rgba(0,0,0,0.09)_0px_4px_2px,rgba(0,0,0,0.09)_0px_8px_4px,rgba(0,0,0,0.09)_0px_16px_8px,rgba(0,0,0,0.09)_0px_32px_16px]
                    transition-all
                    duration-200
                    ease-out
                    hover:-translate-y-0.5
                    hover:bg-[#222]
                    hover:shadow-[rgba(0,0,0,0.12)_0px_4px_2px,rgba(0,0,0,0.12)_0px_8px_4px,rgba(0,0,0,0.12)_0px_16px_8px,rgba(0,0,0,0.12)_0px_24px_12px]
                    active:translate-y-0
                    focus:outline-none
                    focus:ring-2
                    focus:ring-black/30
                  "
                >
                  Book A Demo
                </button>
              </div>
            </div>
          </motion.div>

          {/* =========================
              RIGHT CODE EDITOR
          ========================== */}
          <motion.div variants={itemVariants}  className="w-full lg:w-1/2 max-w-[600px]">
            <div
              className="
                overflow-hidden
                rounded-[26px]
                border-[6px]
                border-[#17171a]
                bg-[#1e1e22]
                shadow-[0_3px_14px_rgba(0,0,0,0.16)]
              "
            >

            {/* =====================
    TABS CONTAINER
====================== */}
<div
  className="
    flex
    h-[32px]
    w-full
    overflow-x-auto
    no-scrollbar
    border-b
    border-[#111114]
    bg-[#1b1b1f]
    sm:overflow-x-visible
  "
>
  {tabs.map((tab) => {
    const active = activeTab === tab;

    return (
      <button
        key={tab}
        type="button"
        role="tab"
        aria-selected={active}
        onClick={() => setActiveTab(tab)}
        className={`
          relative
          flex
          flex-1
          min-w-[85px]
          shrink-0
          items-center
          justify-center
          gap-1.5
          border-r
          border-[#29292d]
          px-3
          text-[10px] 2xl:text-xs
          transition-colors
          duration-200
          ${
            active
              ? "bg-[#252529] text-white"
              : "text-[#8d8d92] hover:bg-[#222226] hover:text-white"
          }
        `}
      >
        <TabIcon tab={tab} />

        <span className="whitespace-nowrap">{tab}</span>

        {active && (
          <span className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
        )}
      </button>
    );
  })}
</div>

              {/* =====================
                  CODE AREA
              ====================== */}
              <div className="overflow-hidden bg-[#1e1e22] px-[2px] py-[3px]">
                <div
                  className="
                    h-full
                    overflow-hidden
                    rounded-[13px]
                    border
                    border-[#303035]
                    bg-[#18181c]
                    min-h-[300px]
                  "
                >
                  <div className="flex h-full font-mono text-[9px] 2xl:text-xs leading-[13px]">

                    {/* Line numbers */}
                    <div
                      className="
                        w-[38px]
                        shrink-0
                        select-none
                        border-r
                        border-[#28282d]
                        bg-[#17171a]
                        px-[7px]
                        py-[10px]
                        text-right
                        text-[#77777d]
                      "
                    >
                      {code.map((_, index) => (
                        <div
                          key={`${activeTab}-number-${index}`}
                          className="h-[13px]"
                        >
                          {index + 1}
                        </div>
                      ))}
                    </div>

                    {/* Code */}
                    <pre
                      className="
                        m-0
                        min-w-0
                        flex-1
                        overflow-hidden
                        px-[12px]
                        py-[10px]
                        text-[#d4d4d4]
                        overflow-x-auto
                         no-scrollbar
                      "
                    >
                      {code.map((line, index) => (
                        <div
                          key={`${activeTab}-code-${index}`}
                          className="h-[13px] whitespace-pre"
                          dangerouslySetInnerHTML={{
                            __html: highlightCode(
                              line,
                              activeTab,
                            ),
                          }}
                        />
                      ))}
                    </pre>
                  </div>
                </div>
              </div>

              {/* =====================
                  BOTTOM CONTROLS
              ====================== */}
              {/* =====================
    BOTTOM CONTROLS
====================== */}
              <div className="flex h-[43px] items-center bg-[#19191d] px-1">

                {/* Voice / DNA Button */}
                <button
                  type="button"
                  aria-label="Play voice sample and copy code"
                  onClick={handleCopyCode}
                  className="
                 hidden xs:flex
      group
      relative
      h-[37px]
      w-[73px]
      shrink-0
      items-center
      justify-center
      rounded-[15px]
      border
      border-[#303035]
      bg-[#16161a]
      text-white
      transition
      hover:bg-[#252529]
      focus:outline-none
      focus:ring-2
      focus:ring-white/30
    "
                >
                  <DNALoader width={40} height={40} />

                  {/* Tooltip Label */}
                  <span
                    className="
        pointer-events-none
        absolute
        -top-9
        left-1/2
        z-20
        -translate-x-1/2
        whitespace-nowrap
        rounded-md
        border
        border-white/10
        bg-[#222226]
        px-2.5
        py-1
        text-[11px]
        font-medium
        text-white
        shadow-lg
        opacity-0
        scale-95
        transition-all
        duration-200
        ease-out
        group-hover:opacity-100
        group-hover:scale-100
      "
                  >
                    {isCopied ? "Copied!" : "Integrate Rasen"}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-[#222226]" />
                  </span>
                </button>

                {/* Integration button */}
                <div
                  className="
      group
      relative
      mx-[4px]
      h-[34px]
      flex-1
      overflow-hidden
      rounded-[9px]
      transition-all
      duration-300
      ease-out
      hover:brightness-110
      active:scale-[0.98]
    "
                >
                  {/* Main green gradient */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(90deg, #06150f 0%, #0b2d1e 12%, #155b3d 27%, #32966b 47%, #50bd91 65%, #54c396 82%, #4dbb8c 100%)",
                    }}
                  />

                  {/* Soft central light */}
                  <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at 55% 50%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 32%, transparent 70%)",
                    }}
                  />

                  {/* Left dark atmospheric fade */}
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 w-[35%]"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(0,0,0,0.45), transparent)",
                    }}
                  />

                  {/* Light Sweep (Shimmer) Layer */}
                  <div
                    className="
        pointer-events-none
        absolute
        inset-0
        -translate-x-full
        bg-gradient-to-r
        from-transparent
        via-white/20
        to-transparent
        transition-transform
        duration-1000
        ease-in-out
        group-hover:translate-x-full
      "
                  />

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="
        relative
        flex
        h-full
        w-full
        items-center
        justify-center
        rounded-[9px]
        px-3
        text-[10px]
        font-semibold
        text-white
        focus:outline-none
        focus:ring-2
        focus:ring-white/30
      "
                  >
                    {isCopied ? "Code Copied to Clipboard!" : "Integrate with Rasen AI"}
                  </button>
                </div>

                {/* Code/file button */}
                <button
                  type="button"
                  aria-label="Copy code"
                  onClick={handleCopyCode}
                  className="
      group
      relative
      hidden xs:flex
      h-[37px]
      w-[73px]
      shrink-0
      items-center
      justify-center
      rounded-[15px]
      border
      border-[#303035]
      bg-[#16161a]
      text-white
      transition
      hover:bg-[#252529]
      focus:outline-none
      focus:ring-2
      focus:ring-white/30
    "
                >
                  {isCopied ? (
                    <Check size={17} className="text-emerald-400" />
                  ) : (
                    <FileCode2 size={17} strokeWidth={1.8} />
                  )}

                  {/* Tooltip Label */}
                  <span
                    className="
        pointer-events-none
        absolute
        -top-9
        left-1/2
        z-20
        -translate-x-1/2
        whitespace-nowrap
        rounded-md
        border
        border-white/10
        bg-[#222226]
        px-2.5
        py-1
        text-[11px]
        font-medium
        text-white
        shadow-lg
        opacity-0
        scale-95
        transition-all
        duration-200
        ease-out
        group-hover:opacity-100
        group-hover:scale-100
      "
                  >
                    {isCopied ? "Copied!" : "Copy Code"}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-[#222226]" />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}