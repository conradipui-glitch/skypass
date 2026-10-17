import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  DoorClosed,
  CableCar,
  Snowflake,
  Database,
  WifiOff,
  ShieldCheck,
  LogIn,
  Coffee,
  Wallet,
  Package,
  RefreshCw,
  UtensilsCrossed,
  CarFront,
  type LucideIcon,
} from "lucide-react";
import { Kicker, Reveal, In } from "../lib/ui";

const INTEGRATIONS = [
  { icon: DoorClosed, name: "Perco", sub: "турникеты и СКУД" },
  { icon: CableCar, name: "Skidata", sub: "гейты подъёмников" },
  { icon: Snowflake, name: "Axess", sub: "контроль доступа" },
  { icon: Database, name: "API 1С", sub: "учёт и документы" },
  { icon: WifiOff, name: "Офлайн-режим", sub: "локальный контур" },
  { icon: ShieldCheck, name: "Защита данных", sub: "роли и доступы" },
];

type EventItem = { icon: LucideIcon; label: string; place: string; meta: string; hot?: boolean };
const EVENTS: EventItem[] = [
  { icon: LogIn, label: "Проход", place: "КУРОРТ 03 · ТУРНИКЕТ 12", meta: "0.8 c" },
  { icon: Coffee, label: "Оплата", place: "СКИ-БАР «ВЕРШИНА»", meta: "420 ₽" },
  { icon: Wallet, label: "Пополнение", place: "КАССА 02", meta: "+3 000 ₽" },
  { icon: Snowflake, label: "Проход", place: "КУРОРТ 01 · ГОНДОЛА «СЕВЕР»", meta: "0.9 c" },
  { icon: Package, label: "Прокат", place: "ПРОКАТ · КОМПЛЕКТ PRO", meta: "1 800 ₽" },
  { icon: RefreshCw, label: "Синхронизация", place: "ОФЛАЙН-КОНТУР", meta: "148 событий", hot: true },
  { icon: UtensilsCrossed, label: "Оплата", place: "КАФЕ «ПАНОРАМА»", meta: "1 240 ₽" },
  { icon: CarFront, label: "Парковка", place: "ШЛАГБАУМ «ЮГ»", meta: "300 ₽" },
];

const LiveFeed: React.FC = () => {
  const [items, setItems] = useState<{ uid: number; e: EventItem }[]>(
    EVENTS.slice(0, 4).map((e, i) => ({ uid: i, e })),
  );
  const counter = useRef(4);

  useEffect(() => {
    const id = window.setInterval(() => {
      setItems((prev) => {
        const next = EVENTS[counter.current % EVENTS.length];
        counter.current += 1;
        return [{ uid: counter.current, e: next }, ...prev].slice(0, 5);
      });
    }, 1900);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="overflow-hidden rounded-3xl border border-line-2 bg-panel shadow-[0_40px_90px_-30px_rgba(2,16,26,0.9)]">
      {/* header */}
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-ember/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-glacier/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        </div>
        <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-mist">
          поток событий · live
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-glacier opacity-70" />
            <span className="relative h-2 w-2 rounded-full bg-glacier" />
          </span>
        </div>
      </div>

      {/* rows */}
      <ul className="min-h-[330px] sm:min-h-[360px]">
        <AnimatePresence initial={false}>
          {items.map(({ uid, e }) => (
            <motion.li
              key={uid}
              layout
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.35 } }}
              transition={{ type: "spring", stiffness: 210, damping: 26 }}
              className="flex items-center gap-4 border-b border-line/60 px-6 py-4"
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg border ${
                  e.hot ? "border-ember/50 text-ember" : "border-line-2 text-glacier"
                }`}
              >
                <e.icon className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-white">{e.label}</div>
                <div className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-mist">
                  {e.place}
                </div>
              </div>
              <div className={`font-mono text-sm tabular ${e.hot ? "text-ember" : "text-glacier"}`}>
                {e.meta}
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* footer */}
      <div className="flex items-center justify-between px-6 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-mist">
        <span>локальная синхронизация</span>
        <span className="text-glacier">
          0 потерянных событий
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>_</motion.span>
        </span>
      </div>
    </div>
  );
};

export default function Tech() {
  return (
    <section id="tech" className="relative overflow-hidden border-t border-line bg-ink-2/50">
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-[560px] w-[560px] rounded-full opacity-30 blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(14,95,120,0.5), transparent 65%)" }}
      />
      <div className="relative mx-auto grid max-w-[1440px] gap-16 px-5 py-28 sm:px-8 lg:grid-cols-2 lg:py-40">
        <div>
          <Kicker index="04" label="Технологии" />
          <h2 className="mt-8 font-display text-[clamp(2rem,4vw,3.6rem)] font-medium uppercase leading-[1.05] text-white">
            <Reveal text="Надёжная система." />
            <br />
            <span className="text-glacier">
              <Reveal text="В любую погоду." delay={0.15} />
            </span>
          </h2>
          <In delay={0.25} className="mt-8 max-w-lg leading-relaxed text-mist">
            Цифровая инфраструктура выдерживает не только хороший Wi-Fi, но и реальный зимний
            сезон. Данные выгружаются в 1С и учётные системы — кассы и оборудование работают
            в общем контуре.
          </In>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4">
            {INTEGRATIONS.map((it, i) => (
              <In key={it.name} delay={0.1 + i * 0.07}>
                <div className="group rounded-2xl border border-line bg-panel/60 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-glacier/50 hover:bg-panel hover:shadow-[0_16px_40px_-16px_rgba(110,233,255,0.35)]" data-hover>
                  <it.icon className="h-6 w-6 text-glacier transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.6} />
                  <div className="mt-4 font-display text-sm font-medium text-white sm:text-base">{it.name}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-mist">{it.sub}</div>
                </div>
              </In>
            ))}
          </div>
        </div>

        <In delay={0.2} className="flex items-center">
          <div className="w-full">
            <LiveFeed />
            <p className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-mist">
              <span className="h-px w-8 bg-glacier/60" />
              работает, даже когда нет связи
            </p>
          </div>
        </In>
      </div>
    </section>
  );
}
