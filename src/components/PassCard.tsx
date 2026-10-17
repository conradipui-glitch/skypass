import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useTransform,
} from "motion/react";
import { Nfc } from "lucide-react";

/**
 * Иммерсивная 3D-карта ски-пасса: tilt за курсором + голографический блик.
 */
const PassCard: React.FC<{ className?: string; small?: boolean }> = ({ className = "", small }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [14, -14]), { stiffness: 140, damping: 16 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-16, 16]), { stiffness: 140, damping: 16 });
  const glareX = useSpring(useTransform(mx, [0, 1], [15, 85]), { stiffness: 120, damping: 20 });
  const glareY = useSpring(useTransform(my, [0, 1], [10, 90]), { stiffness: 120, damping: 20 });
  const glare = useMotionTemplate`radial-gradient(340px circle at ${glareX}% ${glareY}%, rgba(140,240,255,0.20), rgba(255,255,255,0.05) 42%, transparent 66%)`;

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        ref={ref}
        data-hover
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onMouseLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className={`relative w-full overflow-hidden rounded-[22px] border border-white/12 shadow-[0_40px_80px_-24px_rgba(2,20,32,0.9),0_0_60px_-18px_rgba(110,233,255,0.4)] ${
          small ? "max-w-[300px]" : "max-w-[380px]"
        } aspect-[1.586/1] select-none bg-[linear-gradient(135deg,#0b1726_0%,#060c15_55%,#0a1420_100%)]`}
      >
        {/* snow micro-texture */}
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(140,220,255,0.10) 0 1px, transparent 1px 14px)",
          }}
        />
        {/* aurora blob */}
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-glacier/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-52 w-52 rounded-full bg-ember/10 blur-3xl" />
        {/* silver stripe */}
        <div className="absolute inset-y-0 right-[24%] w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

        {/* moving glare */}
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: glare }} />

        {/* watermark snowflake */}
        <svg
          viewBox="0 0 48 48"
          className="absolute -bottom-7 -right-5 h-36 w-36 text-white/[0.05]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <path d="M24 4v40M6.7 14l34.6 20M41.3 14L6.7 34" />
          <path d="M24 4l-4-4M24 4l4-4M24 44l-4 4M24 44l4 4" />
        </svg>

        {/* content */}
        <div className="relative flex h-full flex-col justify-between p-5 sm:p-6" style={{ transform: "translateZ(46px)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-glacier/15 text-glacier">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
                </svg>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-white/60">
                единый кошелёк курорта
              </span>
            </div>
            <Nfc className="h-5 w-5 text-glacier" />
          </div>

          <div>
            {/* chip */}
            <div className="mb-3 h-8 w-11 rounded-md border border-glacier/40 bg-gradient-to-br from-glacier/30 to-white/5">
              <div className="m-[5px] grid h-[18px] grid-cols-3 gap-px opacity-70">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={i} className="border border-glacier/40" />
                ))}
              </div>
            </div>
            <div className="font-mono text-[15px] tracking-[0.22em] text-white/90 sm:text-lg">
              8421&nbsp; 0039&nbsp; 7714&nbsp; 2026
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/40">держатель</div>
              <div className="text-[13px] font-semibold tracking-[0.14em] text-white/90">ГОСТЬ КУРОРТА</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/40">режим</div>
              <div className="font-display text-[12px] font-semibold tracking-[0.12em] text-glacier">24 / 7 · OFFLINE</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PassCard;
