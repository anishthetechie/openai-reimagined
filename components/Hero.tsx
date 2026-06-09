"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import NeuralCanvas from "./NeuralCanvas";
import { ArrowUp, Sparkles, ArrowDown } from "lucide-react";

const VERBS = [
  { word: "building", color: "from-violet-400 to-fuchsia-400" },
  { word: "training", color: "from-cyan-400 to-blue-400" },
  { word: "aligning", color: "from-emerald-400 to-cyan-400" },
  { word: "shipping", color: "from-amber-300 to-rose-400" },
  { word: "scaling", color: "from-fuchsia-400 to-pink-400" },
];

const STREAM_DEMO = [
  {
    q: "Design a logo for a coffee shop in Tokyo",
    a: "Here are three directions: a minimalist torii-gate cup mark, a brush-stroked steam wordmark in indigo & ochre, and a kawaii bean character.",
  },
  {
    q: "Plan a 7-day itinerary through coastal Italy",
    a: "Day 1: Naples — pizza at Sorbillo. Day 2: Amalfi drive, lunch in Positano. Day 3: Capri & the Blue Grotto. Day 4–6: Rome. Day 7: slow morning, fly out.",
  },
  {
    q: "Explain quantum entanglement to a 10-year-old",
    a: "Imagine two magic coins. Flip them in different cities and they always match. Nobody knows the result until you peek — but the moment you do, the other one's answer is decided too.",
  },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const fadeOut = useTransform(scrollYProgress, [0.4, 1], [1, 0]);

  const [verbIdx, setVerbIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setVerbIdx((v) => (v + 1) % VERBS.length), 2400);
    return () => clearInterval(id);
  }, []);

  const [timestamp, setTimestamp] = useState("");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setTimestamp(
        `${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())} · ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden pt-28 pb-20"
    >
      {/* Neural canvas background */}
      <motion.div
        style={{ opacity: canvasOpacity }}
        className="absolute inset-0 pointer-events-auto"
      >
        <NeuralCanvas />
      </motion.div>

      {/* Dark vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,transparent_30%,#05060a_85%)]" />

      <motion.div
        style={{ y: titleY, opacity: fadeOut }}
        className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-8 pt-16"
      >
        {/* Top meta row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-3 text-[11px] font-mono text-ink-500 tracking-widest uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan" />
            </span>
            <span>SYS · v8.2.1</span>
            <span className="text-ink-700">/</span>
            <span className="text-ink-300">{timestamp || "—"}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[11px] font-mono text-ink-500 tracking-widest uppercase"
          >
            CHAPTER 01 / MISSION
          </motion.div>
        </div>

        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Massive editorial title */}
          <div className="col-span-12 lg:col-span-9">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div
                className="font-display tracking-[-0.04em] leading-[1.02] font-semibold"
                style={{ fontSize: "clamp(3rem, 10.5vw, 9.5rem)" }}
              >
                <Reveal delay={0.2}>
                  <span>We are</span>
                </Reveal>
                <Reveal delay={0.35}>
                  <span className="relative inline-flex items-baseline">
                    <span className="relative inline-flex items-baseline overflow-hidden align-baseline pr-[0.08em] pb-[0.18em] -mb-[0.18em]">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={VERBS[verbIdx].word}
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: "0%", opacity: 1 }}
                          exit={{ y: "-100%", opacity: 0 }}
                          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
                          className={`block italic bg-gradient-to-r ${VERBS[verbIdx].color} bg-clip-text text-transparent`}
                          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >
                          {VERBS[verbIdx].word}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </span>
                </Reveal>
                <Reveal delay={0.5}>
                  <span className="block">intelligence.</span>
                </Reveal>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="mt-10 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-end"
            >
              <p className="text-base sm:text-lg text-ink-300 max-w-xl leading-relaxed">
                Not chatbots. Not tools. Collaborators that reason, see, listen,
                and act — so people can do work that wasn't possible yesterday.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#products"
                  data-cursor="hover"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-ink-950 text-sm font-medium hover:bg-ink-100 transition"
                >
                  See what we ship →
                </a>
                <a
                  href="#research"
                  data-cursor="hover"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium hover:bg-white/10 transition"
                >
                  Read the research
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right rail: tag column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hidden lg:block col-span-12 lg:col-span-3 lg:pt-24"
          >
            <div className="space-y-3 font-mono text-[11px] uppercase tracking-widest text-ink-500">
              <div className="pb-3 border-b border-white/5">
                <div className="text-ink-300">// dispatch</div>
                <div className="mt-2 text-white text-sm font-sans normal-case tracking-normal leading-snug">
                  GPT-Next preview is rolling out to 10,000 more developers today.
                </div>
              </div>
              <div className="pt-2 text-ink-700">
                LAT 37.7749°N · LON 122.4194°W
              </div>
              <div className="text-ink-700">
                MODEL CLUSTER · 12,448 H-CHIPS ONLINE
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom: streaming demo (compact) + scroll hint */}
        <div className="mt-16 grid grid-cols-12 gap-6 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="col-span-12 lg:col-span-7"
          >
            <StreamingDemo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="col-span-12 lg:col-span-5 flex flex-col gap-3"
          >
            <div className="text-[11px] font-mono uppercase tracking-widest text-ink-500">
              Status · all systems
            </div>
            <div className="grid grid-cols-3 gap-3">
              <MiniStat label="weekly users" value="400M+" />
              <MiniStat label="languages" value="180+" />
              <MiniStat label="uptime" value="99.99%" />
            </div>
            <a
              href="#manifesto"
              data-cursor="hover"
              className="mt-3 inline-flex items-center gap-2 self-start text-xs font-mono text-ink-300 hover:text-white transition"
            >
              <ArrowDown size={14} className="animate-bounce" />
              Continue
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  // pb + -mb extends the overflow box below the baseline so descenders (g, y, p)
  // aren't clipped, while keeping the visual position unchanged.
  return (
    <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl p-3 glass">
      <div className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
        {value}
      </div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-ink-500 mt-0.5">
        {label}
      </div>
    </div>
  );
}

function StreamingDemo() {
  const [idx, setIdx] = useState(0);
  const [typedQ, setTypedQ] = useState("");
  const [typedA, setTypedA] = useState("");
  const [phase, setPhase] = useState<"q" | "thinking" | "a" | "pause">("q");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const current = STREAM_DEMO[idx];
    if (phase === "q") {
      if (typedQ.length < current.q.length) {
        timeout = setTimeout(() => setTypedQ(current.q.slice(0, typedQ.length + 1)), 30);
      } else {
        timeout = setTimeout(() => setPhase("thinking"), 400);
      }
    } else if (phase === "thinking") {
      timeout = setTimeout(() => setPhase("a"), 800);
    } else if (phase === "a") {
      if (typedA.length < current.a.length) {
        timeout = setTimeout(() => setTypedA(current.a.slice(0, typedA.length + 1)), 14);
      } else {
        timeout = setTimeout(() => setPhase("pause"), 2200);
      }
    } else {
      timeout = setTimeout(() => {
        setTypedQ("");
        setTypedA("");
        setIdx((i) => (i + 1) % STREAM_DEMO.length);
        setPhase("q");
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [typedQ, typedA, phase, idx]);

  return (
    <div className="rounded-2xl glass-strong p-2">
      <div className="flex items-center gap-3 px-3 py-2 border-b border-white/5">
        <Sparkles size={16} className="text-accent-violet flex-shrink-0" />
        <div className="flex-1 text-sm text-white min-h-[20px]">
          {typedQ}
          {phase === "q" && (
            <span className="inline-block w-[2px] h-[14px] bg-white align-middle ml-0.5 animate-pulse" />
          )}
        </div>
        <button
          aria-label="Submit"
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-white text-ink-950 flex items-center justify-center"
        >
          <ArrowUp size={14} />
        </button>
      </div>
      <div className="mt-1 p-4 text-sm leading-relaxed text-ink-100 min-h-[80px]">
        {phase === "thinking" && (
          <div className="flex items-center gap-2 text-ink-300">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-violet animate-bounce" style={{ animationDelay: "120ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-fuchsia animate-bounce" style={{ animationDelay: "240ms" }} />
            </div>
            <span className="text-xs">Thinking…</span>
          </div>
        )}
        {(phase === "a" || phase === "pause") && (
          <div>
            {typedA}
            {phase === "a" && (
              <span className="inline-block w-[2px] h-[14px] bg-accent-cyan align-middle ml-0.5 animate-pulse" />
            )}
          </div>
        )}
        {phase === "q" && (
          <div className="text-ink-500 text-xs font-mono">// awaiting prompt</div>
        )}
      </div>
    </div>
  );
}
