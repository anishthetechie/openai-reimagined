"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Image as ImageIcon, Film, Mic, Code2 } from "lucide-react";

const PANELS = [
  {
    id: "01",
    label: "Conversation",
    icon: MessageSquare,
    title: "Talk through anything",
    body: "From quick questions to deep research — models that listen, reason, and remember context across very long sessions.",
    accent: "from-emerald-400 to-cyan-400",
    preview: "text" as const,
  },
  {
    id: "02",
    label: "Imagery",
    icon: ImageIcon,
    title: "Make images that obey",
    body: "Photorealistic and stylized images with reliable text rendering, character consistency, and precise layout control.",
    accent: "from-amber-300 to-rose-500",
    preview: "image" as const,
  },
  {
    id: "03",
    label: "Video",
    icon: Film,
    title: "Direct cinematic scenes",
    body: "Generate, edit, and extend video with physical realism — minutes-long clips with continuity and camera control.",
    accent: "from-fuchsia-500 to-violet-500",
    preview: "video" as const,
  },
  {
    id: "04",
    label: "Voice",
    icon: Mic,
    title: "Real-time, lifelike voice",
    body: "Low-latency conversation in 50+ languages. Interrupt and steer naturally, mid-sentence, with sub-300ms latency.",
    accent: "from-cyan-400 to-blue-500",
    preview: "voice" as const,
  },
  {
    id: "05",
    label: "Code",
    icon: Code2,
    title: "Agents that ship code",
    body: "Plan, write, run, and review code — with tool use, file editing, and long-horizon reasoning baked in.",
    accent: "from-violet-500 to-fuchsia-500",
    preview: "code" as const,
  },
];

export default function Capabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Slide horizontally — translate the panels container
  // PANELS.length panels in a row; we want to traverse (n-1) panels of width = 100vw approx
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(PANELS.length - 1) * 100}%`]
  );

  return (
    <section
      ref={ref}
      id="capabilities"
      className="relative"
      style={{ height: `${PANELS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        {/* Header rail */}
        <div className="absolute inset-x-0 top-0 z-20 pt-24 px-4 sm:px-8 max-w-[1500px] mx-auto">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-accent-violet mb-3">
                <span className="w-8 h-px bg-accent-violet" />
                Capabilities · scroll →
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-tight">
                One model.{" "}
                <span className="italic" style={{ fontFamily: "Georgia, serif" }}>
                  <span className="text-gradient">Every modality.</span>
                </span>
              </h2>
            </div>
            <ProgressDots progress={scrollYProgress} />
          </div>
        </div>

        {/* Panels strip */}
        <motion.div
          style={{ x }}
          className="absolute inset-0 flex"
        >
          {PANELS.map((p, i) => (
            <Panel key={p.id} panel={p} index={i} />
          ))}
        </motion.div>

        {/* Floating index */}
        <div className="absolute bottom-8 left-0 right-0 px-4 sm:px-8 max-w-[1500px] mx-auto flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-ink-500">
          <span>SCROLL VERTICALLY · MOVES HORIZONTALLY</span>
          <span className="text-ink-300">{PANELS.length} CHAPTERS</span>
        </div>
      </div>
    </section>
  );
}

function ProgressDots({ progress }: { progress: any }) {
  return (
    <div className="flex items-center gap-2">
      {PANELS.map((p, i) => {
        const start = i / PANELS.length;
        const end = (i + 1) / PANELS.length;
        const opacity = useTransform(progress, [start, end], [0.3, 1]);
        return (
          <motion.div
            key={p.id}
            style={{ opacity }}
            className="flex items-center gap-1.5"
          >
            <span className="font-mono text-[10px] text-ink-300">{p.id}</span>
            <span className="w-8 h-px bg-white/60" />
          </motion.div>
        );
      })}
    </div>
  );
}

function Panel({ panel, index }: { panel: (typeof PANELS)[number]; index: number }) {
  const Icon = panel.icon;
  return (
    <div className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center px-4 sm:px-8">
      <div className="relative w-full max-w-[1500px] grid grid-cols-12 gap-8 items-center pt-32 pb-16">
        {/* Big numeral */}
        <div className="col-span-12 lg:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center">
              <Icon size={18} />
            </div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-ink-300">
              <span className={`bg-gradient-to-r ${panel.accent} bg-clip-text text-transparent`}>
                {panel.label}
              </span>
            </div>
          </div>
          <div className="relative">
            <div
              aria-hidden
              className={`absolute -top-8 -left-2 font-display text-[16rem] sm:text-[22rem] leading-[0.8] font-semibold bg-gradient-to-br ${panel.accent} bg-clip-text text-transparent opacity-10 pointer-events-none select-none`}
            >
              {panel.id}
            </div>
            <h3 className="relative font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95]">
              {panel.title}
            </h3>
          </div>
          <p className="mt-6 text-ink-300 max-w-md leading-relaxed">
            {panel.body}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#"
              data-cursor="hover"
              className="inline-flex items-center gap-1.5 text-sm text-white hover:gap-2.5 transition-all"
            >
              Learn more <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {/* Preview */}
        <div className="col-span-12 lg:col-span-7 relative h-[60vh] lg:h-[70vh]">
          <div
            className={`absolute inset-0 rounded-3xl overflow-hidden glass`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${panel.accent} opacity-[0.08]`}
            />
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-0 p-8 sm:p-12">
              {panel.preview === "text" && <TextPreview />}
              {panel.preview === "image" && <ImagePreview />}
              {panel.preview === "video" && <VideoPreview />}
              {panel.preview === "voice" && <VoicePreview />}
              {panel.preview === "code" && <CodePreview />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextPreview() {
  const lines = [
    { side: "user", text: "Summarize this paper in plain English" },
    { side: "ai", text: "The authors train one model across text, vision, and audio — and find that scaling unifies emergent reasoning across modalities." },
    { side: "user", text: "What's the catch?" },
    { side: "ai", text: "Compute. Training requires ~10× the FLOPs of the prior generation, though inference cost is roughly comparable." },
  ];
  return (
    <div className="absolute inset-x-8 sm:inset-x-12 bottom-8 sm:bottom-12 flex flex-col gap-2.5 overflow-hidden">
      {lines.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ root: undefined, once: false, margin: "-10%" }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
          className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm sm:text-base ${
            l.side === "user"
              ? "ml-auto bg-white text-ink-950 rounded-br-sm"
              : "bg-white/10 text-white rounded-bl-sm"
          }`}
        >
          {l.text}
        </motion.div>
      ))}
    </div>
  );
}

function ImagePreview() {
  const tiles = [
    "from-orange-300 via-rose-400 to-pink-500",
    "from-cyan-300 via-violet-500 to-fuchsia-500",
    "from-lime-300 via-emerald-500 to-teal-500",
    "from-amber-200 via-yellow-400 to-orange-500",
    "from-sky-300 via-blue-500 to-indigo-500",
    "from-rose-300 via-pink-500 to-purple-500",
  ];
  return (
    <div className="absolute inset-8 sm:inset-12 grid grid-cols-3 grid-rows-2 gap-3">
      {tiles.map((g, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
          className={`rounded-2xl bg-gradient-to-br ${g} relative overflow-hidden`}
        >
          <div className="absolute inset-0 noise" />
          <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/90">
            #{String(i + 1).padStart(2, "0")}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function VideoPreview() {
  return (
    <div className="absolute inset-8 sm:inset-12 rounded-2xl overflow-hidden">
      <div className="relative w-full h-full bg-gradient-to-br from-fuchsia-600 via-violet-600 to-cyan-500">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
        <div className="absolute inset-x-6 bottom-6 flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="black">
              <path d="M5 3.5v13l11-6.5L5 3.5Z" />
            </svg>
          </div>
          <div className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="h-full bg-white"
            />
          </div>
          <div className="text-xs font-mono text-white/90">4K · 60fps</div>
        </div>
        <div className="absolute top-4 left-4 text-xs font-mono text-white/80 px-2 py-1 rounded glass-strong max-w-[80%]">
          prompt: "drone over a snowy mountain pass at golden hour"
        </div>
      </div>
    </div>
  );
}

function VoicePreview() {
  const bars = Array.from({ length: 56 });
  return (
    <div className="absolute inset-8 sm:inset-12 flex flex-col justify-end gap-6">
      <div className="flex items-end gap-1 h-44">
        {bars.map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [`${10 + Math.random() * 30}%`, `${30 + Math.random() * 70}%`, `${10 + Math.random() * 30}%`] }}
            transition={{
              duration: 1.2 + (i % 5) * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.04,
            }}
            className="flex-1 rounded-full bg-gradient-to-t from-accent-cyan via-accent-violet to-accent-fuchsia"
            style={{ minHeight: "8%" }}
          />
        ))}
      </div>
      <div className="flex items-center gap-3 text-sm">
        <div className="w-3 h-3 rounded-full bg-accent-cyan animate-pulse" />
        <span className="text-ink-300">Listening — interrupt anytime</span>
        <span className="ml-auto font-mono text-xs text-ink-500">240ms latency</span>
      </div>
    </div>
  );
}

function CodePreview() {
  return (
    <div className="absolute inset-8 sm:inset-12 rounded-2xl glass-strong p-6 font-mono text-xs sm:text-sm overflow-hidden">
      <div className="flex items-center gap-1.5 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <span className="ml-2 text-ink-500">agent.ts</span>
      </div>
      <div className="space-y-1.5">
        <div className="text-ink-500">// agent that books a meeting</div>
        <div>
          <span className="text-accent-fuchsia">const</span>{" "}
          <span className="text-accent-cyan">agent</span> ={" "}
          <span className="text-accent-amber">await</span> openai.agents.run({"{"}
        </div>
        <div className="pl-4">model: <span className="text-accent-lime">"gpt-next"</span>,</div>
        <div className="pl-4">tools: [calendar, email, slack],</div>
        <div className="pl-4">goal: <span className="text-accent-lime">"book lunch with Anya next week"</span>,</div>
        <div>{"}"});</div>
        <div className="text-ink-500 mt-4">// → checked 3 calendars · sent invite · confirmed</div>
        <div className="text-emerald-400">✓ Lunch booked for Tue 12:30 at Tartine</div>
      </div>
    </div>
  );
}
