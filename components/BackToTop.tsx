"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const R = 16;
const CIRC = 2 * Math.PI * R;

export default function BackToTop() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const dashOffset = useTransform(smooth, [0, 1], [CIRC, 0]);

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.button
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 16,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      data-cursor-label="TOP"
      aria-label="Back to top"
      className="fixed bottom-6 left-6 z-[55] w-12 h-12 rounded-full glass-strong flex items-center justify-center group"
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0 -rotate-90"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-hidden
      >
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
        />
        <motion.circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          style={{ strokeDashoffset: dashOffset }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <ArrowUp
        size={16}
        className="relative text-ink-300 group-hover:text-white group-hover:-translate-y-0.5 transition-all"
      />
    </motion.button>
  );
}
