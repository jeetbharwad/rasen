"use client";

import { useState } from "react";
import { Volume2, FileCode2 } from "lucide-react";
import { Container } from "../ui/Container";

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

  const code = codeExamples[activeTab];

  return (
    <section className="w-full bg-white">
      <Container>
        <div className="mx-auto flex items-center justify-between gap-12 px-8 py-8 lg:gap-16">

          {/* =========================
              LEFT CONTENT
          ========================== */}
          <div className="w-1/2 ">
            <div className="relative mb-3 flex items-center gap-1.5 pb-2 text-xs 2xl:text-[18px] font-medium text-[#292929] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-[120px] after:bg-gray-300">
              <span>↗</span>

              <span>
                Lightning-Fast Text To Speech For Voice AI Agents
              </span>
            </div>

            <h2 className="max-w-[530px] text-3xl 2xl:text-[55px] font-medium leading-[1.05] tracking-[-1.4px] text-[#292929]">
              Build voice with
              <br />
              Rasen AI
            </h2>

            <p className="mt-8 max-w-[315px] 2xl:max-w-[450px] text-xs 2xl:text-lg leading-[1.55] text-[#858585]">
              Rasen’s voice AI platform provides APIs for speech-to-text,
              text-to-speech, and language understanding. From medical
              transcription to autonomous agents, Rasen is the go-to choice
              for developers of voice AI experiences.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <button
                type="button"
                className="h-[23px] 2xl:h-[38px] rounded-[3px] border border-[#e5e5e5] bg-white px-4 text-[9px] 2xl:text-base font-semibold text-[#222] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:bg-[#f7f7f7] focus:outline-none focus:ring-2 focus:ring-black/20"
              >
                Try For Free
              </button>

              <button
                type="button"
                className="h-[23px] 2xl:h-[38px] rounded-[3px] bg-black px-3 text-[9px] 2xl:text-base font-semibold text-white transition hover:bg-[#222] focus:outline-none focus:ring-2 focus:ring-black/30"
              >
                Book A Demo
              </button>
            </div>
          </div>

          {/* =========================
              RIGHT CODE EDITOR
          ========================== */}
          <div className="w-1/2">
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
                  TABS
              ====================== */}
              <div
                className="
                  flex
                  h-[30px]
                  border-b
                  border-[#111114]
                  bg-[#1b1b1f]
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
                        items-center
                        justify-center
                        gap-[5px]
                        border-r
                        border-[#29292d]
                        text-[9px] 2xl:text-xs
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

                      <span>{tab}</span>

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
              <div className="h-[300px] overflow-hidden bg-[#1e1e22] px-[2px] py-[3px]">
                <div
                  className="
                    h-full
                    overflow-hidden
                    rounded-[13px]
                    border
                    border-[#303035]
                    bg-[#18181c]
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
              <div className="flex h-[43px] items-center bg-[#19191d]">

                {/* Voice */}
                <button
                  type="button"
                  aria-label="Play voice sample"
                  className="
                    flex
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
                  <Volume2
                    size={17}
                    strokeWidth={2}
                  />
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
    hover:scale-[1.02]
    hover:brightness-110
    active:scale-[0.98]
  "
>
  {/* Main green gradient */}
  <div
    className="
      absolute
      inset-0
      transition-opacity
      duration-300
    "
    style={{
      background:
        "linear-gradient(90deg, #06150f 0%, #0b2d1e 12%, #155b3d 27%, #32966b 47%, #50bd91 65%, #54c396 82%, #4dbb8c 100%)",
    }}
  />

  {/* Soft central light */}
  <div
    className="
      pointer-events-none 
      absolute 
      inset-0 
      transition-opacity 
      duration-300 
      group-hover:opacity-100
    "
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
    Integrate with Rasen AI
  </button>
</div>

                {/* Code/file */}
                <button
                  type="button"
                  aria-label="Open code"
                  className="
                    flex
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
                  <FileCode2
                    size={17}
                    strokeWidth={1.8}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}