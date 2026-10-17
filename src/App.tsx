import { useEffect, useState } from "react";
import Lenis from "lenis";
import { setLenis, getLenis } from "./lib/scroll";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Problems from "./components/Problems";
import Flow from "./components/Flow";
import Network from "./components/Network";
import Tech from "./components/Tech";
import Stats from "./components/Stats";
import Calculator from "./components/Calculator";
import Quote from "./components/Quote";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [started, setStarted] = useState(false);

  // smooth scroll engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    setLenis(lenis);
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // lock scroll during preloader
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (started) {
      lenis.start();
      document.documentElement.style.overflow = "";
    } else {
      lenis.stop();
      document.documentElement.style.overflow = "hidden";
    }
  }, [started]);

  return (
    <div className="relative min-h-screen bg-ink font-sans text-white selection:bg-glacier selection:text-ink">
      <Preloader onFinish={() => setStarted(true)} />
      <Cursor />
      {/* film grain */}
      <div className="grain pointer-events-none fixed inset-0 z-[140] opacity-[0.14]" aria-hidden />

      <Nav />
      <main>
        <Hero started={started} />
        <Marquee />
        <Problems />
        <Flow />
        <Network />
        <Tech />
        <Stats />
        <Calculator />
        <Quote />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
