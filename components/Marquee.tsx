"use client";

const COMPANIES = [
  "Stripe",
  "Morgan Stanley",
  "Klarna",
  "Shopify",
  "Salesforce",
  "Canva",
  "Duolingo",
  "Notion",
  "Airbnb",
  "Khan Academy",
  "Lowe's",
  "T-Mobile",
];

export default function Marquee() {
  return (
    <section className="py-16 border-y border-white/5 bg-ink-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium tracking-widest uppercase text-ink-500 mb-8">
          Trusted by teams building the future
        </p>
        <div className="relative overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...COMPANIES, ...COMPANIES].map((c, i) => (
              <span
                key={i}
                className="font-display text-2xl sm:text-3xl font-semibold text-ink-500 hover:text-white transition-colors"
              >
                {c}
              </span>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950 to-transparent pointer-events-none" />
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
