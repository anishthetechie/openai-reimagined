"use client";

import { motion } from "framer-motion";

const VOICES = [
  {
    quote:
      "It's the first time in my career a tool has felt like a collaborator rather than a calculator. The team ships twice as fast and they're happier doing it.",
    name: "Maya Okafor",
    title: "Director of Engineering, Lumen",
    initials: "MO",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    quote:
      "Our researchers prototype hypotheses in an hour that used to take a week. It changes what's worth attempting.",
    name: "Dr. Hiro Tanaka",
    title: "Principal Scientist, AltOrbit Labs",
    initials: "HT",
    accent: "from-cyan-400 to-blue-500",
  },
  {
    quote:
      "We rebuilt our customer experience around an agent that actually understands intent. Resolution times dropped 64%.",
    name: "Priya Rao",
    title: "VP Product, Wayfound",
    initials: "PR",
    accent: "from-amber-300 to-rose-500",
  },
  {
    quote:
      "Used to think AI was a toy. Now I can't imagine doing my job without it. Literal extension of the team.",
    name: "Marcus Webb",
    title: "Senior Designer, Atlas Studio",
    initials: "MW",
    accent: "from-emerald-400 to-cyan-400",
  },
  {
    quote:
      "Onboarded 4 enterprise customers in a quarter with the API. It's the rare platform that scales as fast as we do.",
    name: "Sofía Martínez",
    title: "Co-founder, Nadir AI",
    initials: "SM",
    accent: "from-pink-500 to-violet-500",
  },
];

export default function Voices() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-accent-amber mb-4">
            <span className="w-8 h-px bg-accent-amber" />
            Voices
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight leading-tight">
            Built with —{" "}
            <span className="text-gradient-warm">and for —</span> the people
            using it.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VOICES.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className={`group relative rounded-3xl p-7 glass hover:-translate-y-1 transition-all duration-500 overflow-hidden ${
                i === 0 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${v.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
              />
              <svg
                className="text-white/10 mb-4"
                width="32"
                height="24"
                viewBox="0 0 32 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M0 24V12C0 5.4 5.4 0 12 0v6c-3.3 0-6 2.7-6 6h6v12H0Zm20 0V12C20 5.4 25.4 0 32 0v6c-3.3 0-6 2.7-6 6h6v12H20Z" />
              </svg>
              <p
                className={`relative leading-relaxed text-ink-100 ${
                  i === 0
                    ? "text-xl sm:text-2xl font-display"
                    : "text-base sm:text-lg"
                }`}
              >
                {v.quote}
              </p>
              <div className="relative mt-6 flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${v.accent} flex items-center justify-center text-sm font-semibold text-ink-950`}
                >
                  {v.initials}
                </div>
                <div>
                  <div className="font-medium text-sm">{v.name}</div>
                  <div className="text-xs text-ink-500">{v.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
