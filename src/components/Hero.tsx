import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Mouse } from "lucide-react";
import { scrollToId } from "../lib/scroll";
import { Magnet } from "../lib/ui";
import PassCard from "./PassCard";

/* ---------------- snowfall particle field ---------------- */
const SnowCanvas: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0,
      h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let running = true;
    type Flake = { x: number; y: number; r: number; s: number; ph: number; amp: number; o: number };
    let flakes: Flake[] = [];
    const resize = () => {
      const pr = canvas.parentElement?.getBoundingClientRect();
      if (!pr) return;
      w = pr.width;
      h = pr.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(180, Math.max(70, Math.floor(w / 9)));
      flakes = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.9 + 0.5,
        s: Math.random() * 0.85 + 0.25,
        ph: Math.random() * Math.PI * 2,
        amp: Math.random() * 1.4 + 0.3,
        o: Math.random() * 0.55 + 0.25,
      }));
    };
    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.y += f.s;
        f.ph += 0.012;
        f.x += Math.sin(f.ph) * f.amp * 0.35 + 0.14;
        if (f.y > h + 5) {
          f.y = -5;
          f.x = Math.random() * w;
        }
        if (f.x > w + 5) f.x = -5;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,248,255,${f.o})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          tick();
        } else if (!e.isIntersecting) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    resize();
    tick();
    window.addEventListener("resize", resize);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0" aria-hidden />;
};

/* ---------------- headline ---------------- */
const LINES: { text: string; cls?: string }[] = [
  { text: "ГОРА ДОЛЖНА" },
  { text: "РАБОТАТЬ.", cls: "text-glacier" },
  { text: "НЕ ОЧЕРЕДЬ.", cls: "text-stroke-strong" },
];

const Headline: React.FC<{ started: boolean }> = ({ started }) => (
  <h1
    className="font-display text-[clamp(2.7rem,8.6vw,7.6rem)] font-semibold uppercase leading-[0.98] tracking-[-0.01em] text-white"
    aria-label="Гора должна работать. Не очередь."
  >
    {LINES.map((line, li) => (
      <motion.span
        key={li}
        className="block"
        initial="hidden"
        animate={started ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 + li * 0.14 } },
        }}
      >
        {line.text.split(" ").map((w, wi) => (
          <span key={wi} className="inline-block overflow-hidden pb-[0.06em] -mb-[0.06em] align-bottom">
            <motion.span
              className={`inline-block will-change-transform ${line.cls ?? ""}`}
              variants={{
                hidden: { y: "112%", rotate: 6 },
                show: { y: "0%", rotate: 0, transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {w}
            </motion.span>
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </motion.span>
    ))}
  </h1>
);

/* ---------------- hero ---------------- */
export default function Hero({ started }: { started: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-26%"]);

  return (
    <section id="top" ref={ref} className="relative flex h-[100svh] min-h-[680px] flex-col overflow-hidden">
      {/* backdrop */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <img
          src="./img/hero-mountain.jpg"
          alt="Горнолыжный курорт в синий час — канатная дорога над заснеженными склонами"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
      <SnowCanvas />

      {/* content */}
      <motion.div
        style={{ opacity: fade, y: contentY }}
        className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pb-40 pt-28 sm:px-8 lg:pb-44"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ice sm:text-[11px]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glacier opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-glacier" />
          </span>
          платёжно-пропускная система для горных курортов
        </motion.div>

        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Headline started={started} />

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl text-base leading-relaxed text-mist sm:text-lg"
            >
              Единый цифровой слой курорта: продажа и пополнение ски-пассов, доступ на подъёмники
              и платежи — от кафе на вершине до проката и парковки.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Magnet strength={0.3}>
                <button
                  onClick={() => scrollToId("#contact")}
                  className="group flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:bg-glacier hover:shadow-[0_0_40px_rgba(110,233,255,0.45)]"
                >
                  Получить предложение
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Magnet>
              <Magnet strength={0.3}>
                <button
                  onClick={() => scrollToId("#flow")}
                  className="group flex items-center gap-3 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-glacier/70 hover:text-glacier"
                >
                  Как это работает
                  <Mouse className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
              </Magnet>
            </motion.div>
          </div>

          {/* floating pass card */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: -4 }}
            animate={started ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ duration: 1.3, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-4 hidden justify-end lg:flex"
          >
            <motion.div
              animate={{ y: [0, -14, 0], rotate: [0, -1.2, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <PassCard />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* bottom strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-ink/40 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-10 gap-y-3 px-5 py-5 sm:px-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mist sm:text-[11px]">
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-glacier" />
              турникеты Perco · Skidata · Axess
            </span>
            <span className="hidden items-center gap-2 md:flex">
              <span className="h-1 w-1 rounded-full bg-glacier" />
              офлайн-режим без остановки
            </span>
            <span className="hidden items-center gap-2 xl:flex">
              <span className="h-1 w-1 rounded-full bg-glacier" />
              API для 1С
            </span>
          </div>
          <button
            onClick={() => scrollToId("#pain")}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-glacier"
          >
            листайте вниз
            <span className="relative h-8 w-4 rounded-full border border-white/30 group-hover:border-glacier/60">
              <motion.span
                className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-glacier"
                animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
