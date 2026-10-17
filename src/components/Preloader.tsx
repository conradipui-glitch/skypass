import { useEffect, useState } from "react";
import { motion, animate } from "motion/react";

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const [num, setNum] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.9,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setNum(Math.round(v)),
      onComplete: () => {
        window.setTimeout(() => {
          setLeaving(true);
          onFinish();
        }, 280);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-ink px-6 py-8 sm:px-10"
      initial={{ y: 0 }}
      animate={leaving ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => leaving && setGone(true)}
      style={{ pointerEvents: leaving ? "none" : "auto" }}
    >
      {/* faint blueprint rings */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.15]">
        <div className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-glacier/30" />
        <div className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-glacier/25" />
        <div className="absolute left-1/2 top-1/2 h-[46vmin] w-[46vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-glacier/35" />
      </div>

      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-mist">
        <span>Ски-Пасс</span>
        <span className="text-glacier">v.2026</span>
      </div>

      <div className="relative flex flex-col items-center">
        {/* rotating snowflake mark */}
        <motion.svg
          viewBox="0 0 48 48"
          className="mb-8 h-12 w-12 text-glacier"
          animate={{ rotate: 360 }}
          transition={{ duration: 9, ease: "linear", repeat: Infinity }}
        >
          <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none">
            <path d="M24 6v36M8.4 15l31.2 18M39.6 15L8.4 33" />
            <path d="M24 6l-3.5-3.5M24 6l3.5-3.5M24 42l-3.5 3.5M24 42l3.5 3.5" />
          </g>
        </motion.svg>
        <div className="font-display text-[22vw] leading-none font-light tracking-tight text-white tabular sm:text-[11rem]">
          {num}
          <span className="text-glacier">%</span>
        </div>
        <div className="mt-6 h-px w-56 overflow-hidden bg-white/10 sm:w-72">
          <motion.div
            className="h-full bg-glacier"
            style={{ width: `${num}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </div>

      <div className="flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-mist">
        <span className="max-w-[220px] leading-relaxed">
          загрузка цифрового слоя курорта
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          >
            _
          </motion.span>
        </span>
        <span className="hidden text-right sm:block">
          платежи / пропуск / аналитика
        </span>
      </div>
    </motion.div>
  );
}
