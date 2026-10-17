import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Menu, X, Phone } from "lucide-react";
import { scrollToId } from "../lib/scroll";
import { Magnet } from "../lib/ui";

const LINKS = [
  { label: "Система", href: "#flow" },
  { label: "Задачи", href: "#pain" },
  { label: "Технологии", href: "#tech" },
  { label: "Эффект", href: "#effect" },
  { label: "Расчёт", href: "#calc" },
];

const Logo = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="group flex items-center gap-3" aria-label="Ски-Пасс — на главную">
    <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-lg border border-line-2 bg-panel text-glacier transition-all duration-500 group-hover:border-glacier/60 group-hover:shadow-[0_0_24px_rgba(110,233,255,0.35)]">
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 transition-transform duration-700 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
      </svg>
    </span>
    <span className="font-display text-[15px] font-medium tracking-wide text-white">
      Ски<span className="text-glacier">-</span>Пасс
    </span>
  </button>
);

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  useEffect(() => scrollY.on("change", (v) => setScrolled(v > 40)), [scrollY]);

  const go = (hash: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(hash), open ? 350 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-all duration-500 ${
          scrolled ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        {/* scroll progress */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-glacier via-ice to-ember"
          style={{ scaleX: progress }}
        />
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8">
          <Logo onClick={() => go("#top")} />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Основная навигация">
            {LINKS.map((l, i) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="group relative flex items-baseline gap-1.5 text-[13px] font-medium tracking-[0.12em] text-white/70 uppercase transition-colors hover:text-white"
              >
                <span className="font-mono text-[9px] text-glacier/70">0{i + 1}</span>
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-glacier transition-transform duration-400 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnet className="hidden sm:block" strength={0.25}>
              <button
                onClick={() => go("#contact")}
                className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold tracking-wide text-ink transition-colors duration-300 hover:bg-glacier"
              >
                Обсудить проект
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnet>
            <button
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-white lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[85] flex flex-col justify-between bg-ink/95 px-6 pb-8 pt-28 backdrop-blur-2xl"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
              {LINKS.map((l, i) => (
                <div key={l.href} className="overflow-hidden border-b border-line">
                  <motion.button
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => go(l.href)}
                    className="flex w-full items-center justify-between py-4 text-left"
                  >
                    <span className="font-display text-3xl font-light text-white">{l.label}</span>
                    <span className="font-mono text-xs text-glacier">0{i + 1}</span>
                  </motion.button>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <button
                onClick={() => go("#contact")}
                className="flex items-center justify-center gap-2 rounded-full bg-white py-4 text-sm font-semibold text-ink"
              >
                Обсудить проект <ArrowUpRight className="h-4 w-4" />
              </button>
              <a
                href="tel:+79039251002"
                className="flex items-center justify-center gap-2 font-mono text-sm tracking-[0.18em] text-mist"
              >
                <Phone className="h-4 w-4 text-glacier" /> +7 903 925 10 02
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
