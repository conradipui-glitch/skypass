import { motion } from "motion/react";
import { ArrowUp, Phone } from "lucide-react";
import { scrollToId, getLenis } from "../lib/scroll";

const LINKS = [
  { label: "Система", href: "#flow" },
  { label: "Задачи", href: "#pain" },
  { label: "Технологии", href: "#tech" },
  { label: "Эффект", href: "#effect" },
  { label: "Расчёт", href: "#calc" },
  { label: "Контакты", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8">
        <div className="grid gap-12 pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-line-2 bg-panel text-glacier">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
                </svg>
              </span>
              <span className="font-display text-base font-medium text-white">Ски-Пасс</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
              Единый цифровой слой для доступа, платежей и аналитики на горных курортах.
            </p>
            <a
              href="tel:+79039251002"
              className="mt-6 inline-flex items-center gap-3 font-mono text-sm tracking-[0.14em] text-white/80 transition-colors hover:text-glacier"
            >
              <Phone className="h-4 w-4 text-glacier" /> +7 903 925 10 02
            </a>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">Навигация</div>
            <nav className="mt-5 flex flex-col items-start gap-2.5">
              {LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollToId(l.href)}
                  className="group relative text-sm text-white/75 transition-colors hover:text-white"
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-glacier transition-transform duration-400 group-hover:origin-left group-hover:scale-x-100" />
                </button>
              ))}
            </nav>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">Документы</div>
            <div className="mt-5 flex flex-col gap-2.5 text-sm text-white/45">
              <span className="cursor-default">Политика конфиденциальности</span>
              <span className="cursor-default">Документация API — по запросу</span>
            </div>
          </div>

          <div className="flex md:col-span-2 md:justify-end">
            <button
              onClick={() => getLenis()?.scrollTo(0, { duration: 1.6 })}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-line-2 text-white transition-all duration-500 hover:border-glacier/70 hover:text-glacier hover:shadow-[0_0_28px_rgba(110,233,255,0.35)]"
              aria-label="Наверх"
            >
              <ArrowUp className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      {/* giant word */}
      <div className="relative border-t border-line">
        <motion.h2
          initial={{ y: "42%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="group cursor-default select-none px-2 text-center font-display text-[12.5vw] font-semibold uppercase leading-[0.95] tracking-[-0.02em] text-stroke transition-colors duration-700 hover:text-white"
          data-hover
        >
          Ски-Пасс
        </motion.h2>
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-6 font-mono text-[10px] uppercase tracking-[0.24em] text-mist sm:px-8">
          <span>© 2026 Ски-Пасс</span>
          <span className="hidden md:block">платежи + пропуск + аналитика</span>
          <span>создано для мест, где важен поток</span>
        </div>
      </div>
    </footer>
  );
}
