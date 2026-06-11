"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "./TiltCard";

const PRODUCTS = [
  {
    n: "01",
    name: "ChatGPT",
    headline: "The most natural way to think with a machine.",
    body: "Hundreds of millions of people use it every week — to write, learn, plan, prototype, debug, and decide.",
    users: "400M+ weekly",
    accent: "from-emerald-400 to-cyan-400",
    rotate: -1.5,
  },
  {
    n: "02",
    name: "Sora",
    headline: "Imagine in motion.",
    body: "Generate cinematic video from a single line of text. Direct minute-long scenes with continuity, lighting, and camera control.",
    users: "Preview",
    accent: "from-fuchsia-500 to-rose-500",
    rotate: 1.2,
  },
  {
    n: "03",
    name: "DALL·E",
    headline: "Images, instantly.",
    body: "Photorealistic and stylized images from text. Reliable text rendering and consistent characters baked in.",
    users: "Public",
    accent: "from-amber-300 to-orange-500",
    rotate: -1.2,
  },
  {
    n: "04",
    name: "API Platform",
    headline: "Build with frontier models.",
    body: "Production-grade APIs, agents, batch, evals, and fine-tuning. The same models we ship in our own apps.",
    users: "92% F500",
    accent: "from-violet-500 to-fuchsia-500",
    rotate: 1.5,
  },
];

export default function Products() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax for the big background number
  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="products" ref={ref} className="relative py-32 overflow-hidden">
      {/* Huge editorial backdrop word */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
      >
        <div className="font-display text-[28vw] font-semibold tracking-[-0.05em] leading-none text-white/[0.025] text-center whitespace-nowrap">
          PRODUCTS
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-8">
        {/* Editorial header */}
        <div className="grid grid-cols-12 gap-6 mb-20">
          <div className="col-span-12 lg:col-span-6">
            <div className="font-mono text-[11px] uppercase tracking-widest text-accent-cyan mb-4">
              §02 — WHAT WE SHIP
            </div>
            <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.03em] leading-[0.9]">
              Four products.
              <br />
              <span
                className="italic text-gradient"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                One mission.
              </span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pt-24">
            <p className="text-lg text-ink-300 leading-relaxed">
              A family of frontier models and tools, designed to work together
              and adapt to whatever you're building — from a quick sketch to a
              production agent.
            </p>
          </div>
        </div>

        {/* Editorial cards — staggered, tilted, asymmetric */}
        <div className="space-y-32 sm:space-y-44">
          {PRODUCTS.map((p, i) => (
            <ProductRow key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductRow({
  product,
  index,
}: {
  product: (typeof PRODUCTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const tileY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const titleY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid grid-cols-12 gap-6 lg:gap-12 items-center ${
        isEven ? "" : "lg:[direction:rtl] lg:[&>*]:[direction:ltr]"
      }`}
    >
      {/* Visual tile */}
      <motion.div
        style={{ y: tileY, rotate: product.rotate }}
        className="col-span-12 lg:col-span-7 relative"
      >
        <TiltCard className="rounded-3xl">
          <div className="relative rounded-3xl overflow-hidden aspect-[16/10] glass">
            <div className={`absolute inset-0 bg-gradient-to-br ${product.accent}`} />
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-0 noise" />

            {/* Embedded product preview */}
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[11px] uppercase tracking-widest text-white/70">
                  {product.name}
                </div>
                <div className="font-mono text-[11px] text-white/70">
                  {product.users}
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Preview name={product.name} />
              </div>
              <div className="font-display text-[10rem] sm:text-[14rem] leading-[0.8] font-semibold text-white/15 absolute -bottom-12 -right-4 select-none pointer-events-none">
                {product.n}
              </div>
            </div>
          </div>
        </TiltCard>
      </motion.div>

      {/* Copy */}
      <motion.div
        style={{ y: titleY }}
        className={`col-span-12 lg:col-span-5 ${
          isEven ? "lg:pl-6" : "lg:pr-6"
        }`}
      >
        <div className="flex items-baseline gap-3 mb-4">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-500">
            {product.n}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-300">
            {product.name}
          </span>
        </div>
        <h3 className="font-display text-3xl sm:text-5xl font-semibold tracking-[-0.02em] leading-[1.02]">
          {product.headline}
        </h3>
        <p className="mt-5 text-ink-300 leading-relaxed max-w-md">
          {product.body}
        </p>
        <a
          href="#"
          data-cursor="hover"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium hover:gap-2.5 transition-all"
        >
          Explore {product.name} <ArrowUpRight size={16} />
        </a>
      </motion.div>
    </div>
  );
}

function Preview({ name }: { name: string }) {
  if (name === "ChatGPT")
    return (
      <div className="w-full max-w-sm space-y-2 text-sm">
        <div className="ml-auto max-w-[80%] bg-white/95 text-ink-950 rounded-2xl rounded-br-sm px-3 py-2">
          How do I get started with reinforcement learning?
        </div>
        <div className="max-w-[85%] bg-black/40 backdrop-blur text-white rounded-2xl rounded-bl-sm px-3 py-2">
          Start with the basics: MDPs, value functions, and a small Q-learning impl.
        </div>
      </div>
    );
  if (name === "Sora")
    return (
      <div className="w-full max-w-md aspect-video rounded-xl bg-black/30 backdrop-blur flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="black">
            <path d="M5 3.5v13l11-6.5L5 3.5Z" />
          </svg>
        </div>
      </div>
    );
  if (name === "DALL·E")
    return (
      <div className="grid grid-cols-3 gap-2 w-full max-w-md">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg bg-white/20 backdrop-blur border border-white/30"
          />
        ))}
      </div>
    );
  return (
    <div className="w-full max-w-md rounded-xl bg-black/40 backdrop-blur p-4 font-mono text-xs">
      <div className="text-white/60">// chat completion</div>
      <div className="text-white">
        await openai.chat.create({"{"} model: "gpt-next" {"}"})
      </div>
    </div>
  );
}
