import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OpenAI — Reimagined",
  description:
    "Creating safe AGI that benefits all of humanity. A reimagined visual experience.",
  metadataBase: new URL("https://openai-reimagined.vercel.app"),
  openGraph: {
    title: "OpenAI — Reimagined",
    description: "A visually stunning reimagining of the OpenAI homepage.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="font-sans antialiased bg-ink-950 text-ink-100 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
