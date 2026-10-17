import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 26, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 300, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [data-hover], input, textarea, label, select"));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* core dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[300] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glacier"
        style={{ x, y }}
      />
      {/* trailing ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[299] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-glacier/60 mix-blend-difference"
        style={{ x: rx, y: ry }}
        animate={{
          scale: pressed ? 0.7 : hover ? 1.9 : 1,
          opacity: hover ? 0.95 : 0.55,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.span
          animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.4 }}
          className="h-1 w-1 rounded-full bg-glacier"
        />
      </motion.div>
    </>
  );
}
