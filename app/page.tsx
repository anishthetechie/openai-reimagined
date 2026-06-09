import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TelemetryTicker from "@/components/TelemetryTicker";
import Marquee from "@/components/Marquee";
import Capabilities from "@/components/Capabilities";
import Products from "@/components/Products";
import Benchmarks from "@/components/Benchmarks";
import Research from "@/components/Research";
import Today from "@/components/Today";
import Voices from "@/components/Voices";
import Safety from "@/components/Safety";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CursorPro from "@/components/CursorPro";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <CursorPro />
      <Nav />
      <Hero />
      <TelemetryTicker />
      <Marquee />
      <Capabilities />
      <Products />
      <Benchmarks />
      <Research />
      <Today />
      <Voices />
      <Safety />
      <CTA />
      <Footer />
      <Chatbot />
    </main>
  );
}
