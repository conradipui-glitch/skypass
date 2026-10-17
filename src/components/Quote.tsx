import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal, In } from "../lib/ui";

export default function Quote() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);

  return (
    <section ref={ref} className="relative flex min-h-[88vh] items-center overflow-hidden border-t border-line">
      <motion.img
        src="./img/action.jpg"
        alt="Сноубордист в прыжке на фоне зимнего солнца"
        width={1920}
        height={1280}
        loading="lazy"
        decoding="async"
        style={{ y }}
        className="absolute inset-0 h-[128%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/72" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-28 sm:px-8">
        <In className="mb-10">
          <span className="inline-flex items-center gap-3 rounded-full border border-ember/50 bg-ink/60 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-ember backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_12px_rgba(255,138,92,0.9)]" />
            очереди в кассах −80%
          </span>
        </In>

        <blockquote className="font-display text-[clamp(1.5rem,3.4vw,3.1rem)] font-medium leading-[1.25] text-white">
          <span className="text-glacier">«</span>
          <Reveal text="Внедрили систему за две недели. Гости теперь покупают ски-пасс в отеле, не вставая с кровати" step={0.045} />
          <span className="text-glacier">».</span>
        </blockquote>

        <In delay={0.35} className="mt-10 flex items-center gap-4">
          <span className="h-px w-12 bg-ember" />
          <div>
            <div className="text-sm font-semibold tracking-wide text-white">Руководитель курорта</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist">сезон 2025 / 26 · партнёрская площадка</div>
          </div>
        </In>
      </div>
    </section>
  );
}
