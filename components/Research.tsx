"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const papers = [
  {
    tag: "Foundations",
    date: "May 28, 2026",
    title: "Scaling reasoning with reinforcement-trained latent chains",
    summary:
      "A new family of reasoning models that internalize chain-of-thought and outperform prior baselines on math, code, and scientific benchmarks.",
  },
  {
    tag: "Multimodal",
    date: "Apr 14, 2026",
    title: "Unified perception across vision, audio, and language",
    summary:
      "We introduce a single architecture trained end-to-end across modalities, with state-of-the-art results on 27 benchmarks.",
  },
  {
    tag: "Alignment",
    date: "Mar 02, 2026",
    title: "Deliberative alignment for high-stakes decisions",
    summary:
      "A method for training models to deliberate over policies before acting, improving safety in agentic settings.",
  },
  {
    tag: "Robotics",
    date: "Feb 11, 2026",
    title: "Foundation policies for general-purpose manipulation",
    summary:
      "A robotics foundation model that transfers across embodiments and tasks with minimal fine-tuning.",
  },
];

export default function Research() {
  return (
    <section id="research" className="relative py-32">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-accent-fuchsia mb-4">
              <span className="w-8 h-px bg-accent-fuchsia" />
              Research
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight leading-tight">
              Pushing the{" "}
              <span className="text-gradient-warm">frontier</span> of what's
              possible.
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-medium px-5 py-2.5 rounded-full border border-white/15 hover:bg-white hover:text-ink-950 transition-all"
          >
            View all publications <ArrowUpRight size={16} />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {papers.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group block p-8 rounded-3xl glass hover:bg-white/[0.06] transition-colors"
            >
              <div className="flex items-center gap-3 text-xs text-ink-500 mb-5">
                <span className="px-2.5 py-1 rounded-full glass-strong text-ink-300">
                  {p.tag}
                </span>
                <span>{p.date}</span>
              </div>
              <h3 className="font-display text-2xl font-semibold tracking-tight leading-snug group-hover:text-gradient transition-all">
                {p.title}
              </h3>
              <p className="mt-3 text-ink-300 leading-relaxed">{p.summary}</p>
              <div className="mt-6 inline-flex items-center gap-1 text-sm text-white group-hover:gap-2 transition-all">
                Read paper <ArrowUpRight size={14} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
