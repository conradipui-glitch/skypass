import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  animate,
  type MotionProps,
} from "motion/react";

/* ---------------- Word-by-word masked reveal ---------------- */
export const Reveal: React.FC<{
  text: string;
  className?: string;
  wordClassName?: (word: string, i: number) => string | undefined;
  delay?: number;
  step?: number;
  once?: boolean;
  as?: "span" | "div";
}> = ({ text, className, wordClassName, delay = 0, step = 0.06, once = true, as = "span" }) => {
  const words = text.split(" ");
  const Comp: any = as === "div" ? motion.div : motion.span;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.6 }}
      transition={{ staggerChildren: step, delayChildren: delay }}
      style={{ display: as === "div" ? "block" : "inline-block" }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`inline-block will-change-transform ${wordClassName?.(w, i) ?? ""}`}
            variants={{
              hidden: { y: "115%", rotate: 5, opacity: 0 },
              show: {
                y: "0%",
                rotate: 0,
                opacity: 1,
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Comp>
  );
};

/* ---------------- Magnetic hover wrapper ---------------- */
export const Magnet: React.FC<{
  children: React.ReactNode;
  strength?: number;
  className?: string;
}> = ({ children, strength = 0.35, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 14, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 160, damping: 14, mass: 0.2 });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

/* ---------------- Count-up number on in-view ---------------- */
export const CountUp: React.FC<{
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  format?: boolean;
}> = ({ to, prefix = "", suffix = "", duration = 1.8, className, format = true }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (!ref.current) return;
        const n = format ? new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(v) : String(Math.round(v));
        ref.current.textContent = `${prefix}${n}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, duration, prefix, suffix, format]);
  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
};

/* ---------------- Section micro-label ---------------- */
export const Kicker: React.FC<{ index: string; label: string; className?: string }> = ({
  index,
  label,
  className = "",
}) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.8 }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className={`flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] uppercase text-glacier ${className}`}
  >
    <span className="inline-block h-px w-10 bg-glacier/60" />
    <span>
      {index} / {label}
    </span>
  </motion.div>
);

/* ---------------- Fade-y entrance ---------------- */
export const In: React.FC<MotionProps & { children: React.ReactNode; className?: string; delay?: number }> = ({
  children,
  className,
  delay = 0,
  ...rest
}) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.35 }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);
