"use client";

import { motion } from "framer-motion";
import { Shield, Users, Globe, FlaskConical } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Safety by design",
    body: "Red-team testing, alignment research, and policy evaluation built into every release cycle.",
  },
  {
    icon: Users,
    title: "Broadly beneficial",
    body: "Our mission is AGI that benefits all of humanity — not just a single company or country.",
  },
  {
    icon: Globe,
    title: "Global collaboration",
    body: "Partnering with governments, researchers, and civil society on standards and oversight.",
  },
  {
    icon: FlaskConical,
    title: "Open research",
    body: "We share findings, evaluations, and tools so the broader community can build safer AI.",
  },
];

export default function Safety() {
  return (
    <section id="safety" className="relative py-32 overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-aurora opacity-10 blur-3xl rounded-full animate-spin-slow" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-accent-lime mb-4">
              <span className="w-8 h-px bg-accent-lime" />
              Safety
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight leading-tight">
              Building AI that{" "}
              <span className="text-gradient">earns trust.</span>
            </h2>
            <p className="mt-6 text-lg text-ink-300 leading-relaxed">
              We believe the path to beneficial AI requires deep technical work
              on alignment, transparent evaluation, and ongoing dialogue with the
              communities AI will affect most. Safety isn't a feature — it's the
              foundation of everything we ship.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-ink-950 text-sm font-medium hover:bg-ink-100 transition"
              >
                Read our approach →
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-white/15 text-sm font-medium hover:bg-white/5 transition"
              >
                Preparedness framework
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="p-6 rounded-2xl glass hover:bg-white/[0.06] transition group"
                >
                  <div className="w-11 h-11 rounded-xl glass-strong flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={18} className="text-white" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-ink-300 leading-relaxed">{p.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
