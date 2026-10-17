import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Wallet,
  CreditCard,
  DoorOpen,
  Coffee,
  BarChart3,
  MoveRight,
  type LucideIcon,
} from "lucide-react";
import { useMediaQuery } from "../lib/scroll";
import { Kicker } from "../lib/ui";
import PassCard from "./PassCard";

type Step = {
  n: string;
  tag: string;
  title: string;
  text: string;
  icon: LucideIcon;
  type: "typo" | "card" | "chart";
  img?: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    tag: "Касса",
    title: "Продажа и пополнение за минуту",
    text: "Гость покупает карту ски-пасс и пополняет её в кассе курорта. Остаток всегда под рукой — без бумажных билетов и пересчёта.",
    icon: Wallet,
    type: "typo",
  },
  {
    n: "02",
    tag: "Карта",
    title: "Уникальный номер в базе",
    text: "Каждая карта привязана к записи в базе курорта. Номер регистрируется при покупке — гость сразу идёт кататься.",
    icon: CreditCard,
    type: "card",
  },
  {
    n: "03",
    tag: "Турникет",
    title: "Проход за секунду",
    text: "Совместимо с турникетами Perco, Skidata и Axess. Проверка доступа — локальная, мгновенная, в любую погоду.",
    icon: DoorOpen,
    type: "typo",
    img: "./img/gate.jpg",
  },
  {
    n: "04",
    tag: "Расчёты",
    title: "Кафе, прокат и ски-бар",
    text: "Один кошелёк на все точки курорта: обед на вершине, снаряжение и вечерний глинтвейн — по одной карте.",
    icon: Coffee,
    type: "typo",
    img: "./img/cafe.jpg",
  },
  {
    n: "05",
    tag: "Аналитика",
    title: "Каждая цифра под контролем",
    text: "Проходы, выручка, загрузка подъёмников — живые отчёты и автоматическая выгрузка в 1С и учётные системы.",
    icon: BarChart3,
    type: "chart",
  },
];

/* animated mini bar-chart */
export const BarViz: React.FC = () => {
  const [heights, setHeights] = useState<number[]>(() =>
    Array.from({ length: 14 }, () => Math.random() * 0.72 + 0.22),
  );
  useEffect(() => {
    const id = window.setInterval(
      () => setHeights(Array.from({ length: 14 }, () => Math.random() * 0.72 + 0.22)),
      1200,
    );
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="flex h-24 items-end gap-[6px] sm:h-28" aria-hidden>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className={`grow rounded-t-[3px] ${i === 10 ? "bg-ember" : "bg-glacier/70"}`}
          initial={false}
          animate={{ height: `${h * 100}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
};

const StepPanel: React.FC<{ step: Step; className?: string }> = ({ step, className = "" }) => {
  const hasImg = !!step.img;
  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line ${
        hasImg ? "" : "bg-panel"
      } ${className}`}
    >
      {hasImg && (
        <>
          <img
            src={step.img}
            alt={step.tag}
            width={1920}
            height={1280}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/15" />
        </>
      )}

      {/* watermark number */}
      <div className="pointer-events-none absolute -bottom-6 -right-2 font-display text-[10rem] font-semibold leading-none text-white/[0.05] transition-colors duration-700 group-hover:text-glacier/10 sm:text-[12rem]">
        {step.n}
      </div>

      <div className="relative p-7 sm:p-9">
        <div className="flex items-center justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-xl border border-line-2 bg-ink/50 text-glacier backdrop-blur-sm">
            <step.icon className="h-5 w-5" strokeWidth={1.7} />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-glacier/80">
            {step.n} · {step.tag}
          </span>
        </div>
      </div>

      <div className="relative p-7 pt-0 sm:p-9 sm:pt-0">
        {step.type === "card" && (
          <div className="mb-6 scale-90">
            <PassCard small />
          </div>
        )}
        {step.type === "chart" && <div className="mb-6"><BarViz /></div>}
        <h3 className="max-w-[16ch] font-display text-xl font-medium leading-snug text-white sm:text-2xl">
          {step.title}
        </h3>
        <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-mist sm:text-[15px]">{step.text}</p>
      </div>
    </div>
  );
};

/* ---------------- desktop: pinned horizontal ---------------- */
const FlowDesktop: React.FC = () => {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0.02, 0.98], [0, -dist]);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDist(trackRef.current.scrollWidth - window.innerWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    const id = window.setTimeout(measure, 600);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(id);
    };
  }, []);

  return (
    <div ref={targetRef} className="relative h-[460vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-stretch gap-[2.5vw] px-[5vw] will-change-transform">
          {/* intro panel */}
          <div className="flex w-[36vw] min-w-[400px] flex-col justify-between py-14">
            <div>
              <Kicker index="02" label="Система" />
              <h2 className="mt-8 font-display text-[clamp(1.9rem,3.1vw,3.2rem)] font-medium uppercase leading-[1.06] text-white">
                Один контур — <br />
                <span className="text-glacier">от кассы</span>
                <br />
                до аналитики
              </h2>
              <p className="mt-8 max-w-sm leading-relaxed text-mist">
                Гость покупает карту ски-пасс и пополняет её в кассе, проходит на трассу и
                расплачивается ею в кафе, прокате и ски-баре. Все точки работают в единой системе.
              </p>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.28em] text-mist">
              продолжайте скролл
              <motion.span
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <MoveRight className="h-5 w-5 text-glacier" />
              </motion.span>
            </div>
          </div>

          {STEPS.map((s) => (
            <StepPanel key={s.n} step={s} className="h-[72vh] w-[30vw] min-w-[400px]" />
          ))}

          {/* outro */}
          <div className="flex w-[26vw] min-w-[320px] flex-col items-start justify-center">
            <span className="font-display text-4xl font-medium uppercase leading-tight text-white">
              Стабильный поток гостей.
              <span className="block text-stroke-glacier">Прозрачная работа курорта.</span>
            </span>
          </div>
        </motion.div>

        {/* progress */}
        <div className="absolute bottom-9 left-[5vw] right-[5vw]">
          <div className="h-px w-full bg-white/10">
            <motion.div className="h-px origin-left bg-glacier" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- mobile: vertical ---------------- */
const FlowMobile: React.FC = () => (
  <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8">
    <Kicker index="02" label="Система" />
    <h2 className="mt-8 font-display text-3xl font-medium uppercase leading-tight text-white">
      Один контур — <span className="text-glacier">от кассы</span> до аналитики
    </h2>
    <p className="mt-6 leading-relaxed text-mist">
      Гость покупает карту ски-пасс и пополняет её в кассе, проходит на трассу и расплачивается ею
      в кафе, прокате и ски-баре. Все точки работают в единой системе.
    </p>
    <div className="mt-12 flex flex-col gap-6">
      {STEPS.map((s, i) => (
        <motion.div
          key={s.n}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <StepPanel step={s} className="min-h-[380px]" />
        </motion.div>
      ))}
    </div>
  </div>
);

export default function Flow() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <section id="flow" className="relative scroll-mt-20 border-t border-line bg-ink-2/60">
      {isDesktop ? <FlowDesktop /> : <FlowMobile />}
    </section>
  );
}
