import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { CableCar, Users, ArrowUpRight, Info, type LucideIcon } from "lucide-react";
import { Kicker, Reveal, In, Magnet } from "../lib/ui";
import { scrollToId, rub } from "../lib/scroll";

const Slider: React.FC<{
  icon: LucideIcon;
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  unit: string;
  onChange: (v: number) => void;
}> = ({ icon: Icon, label, min, max, step = 1, value, unit, onChange }) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="rounded-2xl border border-line bg-panel/70 p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-line-2 text-glacier">
            <Icon className="h-4.5 w-4.5" strokeWidth={1.7} />
          </span>
          <span className="text-sm font-semibold text-white sm:text-base">{label}</span>
        </div>
        <div className="text-right">
          <span className="font-display text-2xl font-medium text-glacier tabular sm:text-3xl">
            {rub(value)}
          </span>
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        className="slider mt-5"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ "--fill": `${pct}%` } as React.CSSProperties}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
      <div className="mt-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-mist/60">
        <span>{rub(min)}</span>
        <span>{rub(max)}</span>
      </div>
    </div>
  );
};

export default function Calculator() {
  const [lifts, setLifts] = useState(12);
  const [guests, setGuests] = useState(2500);
  const rawTotal = lifts * 50000 + guests * 50;

  const mv = useMotionValue(rawTotal);
  const spring = useSpring(mv, { stiffness: 80, damping: 22, mass: 0.6 });
  const display = useTransform(spring, (v) => `${rub(v)} ₽`);

  useEffect(() => {
    mv.set(rawTotal);
  }, [rawTotal, mv]);

  return (
    <section id="calc" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-ink-2/50">
      <div className="pointer-events-none absolute -right-32 top-0 select-none font-display text-[26rem] font-semibold leading-none text-white/[0.025]">
        ₽
      </div>
      <div className="relative mx-auto grid max-w-[1440px] gap-16 px-5 py-28 sm:px-8 lg:grid-cols-2 lg:py-40">
        <div>
          <Kicker index="06" label="Расчёт" />
          <h2 className="mt-8 font-display text-[clamp(2rem,3.6vw,3.4rem)] font-medium uppercase leading-[1.07] text-white">
            <Reveal text="Посмотрите, какой" />
            <br />
            <span className="text-glacier">
              <Reveal text="потенциал у курорта" delay={0.15} />
            </span>
          </h2>
          <In delay={0.25} className="mt-8 max-w-lg leading-relaxed text-mist">
            Предварительная оценка месячного эффекта по простой модели. Настройте параметры
            под свою площадку — точную модель с сезонностью подготовим после аудита.
          </In>

          <div className="mt-12 flex flex-col gap-4">
            <Slider icon={CableCar} label="Количество подъёмников" min={1} max={60} value={lifts} unit="шт" onChange={setLifts} />
            <Slider icon={Users} label="Лыжников в день" min={100} max={20000} step={100} value={guests} unit="гостей" onChange={setGuests} />
          </div>

          <In delay={0.2} className="mt-6">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
              формула
              <span className="text-glacier">подъёмники × 50 000 ₽</span>+
              <span className="text-glacier">гости в день × 50 ₽</span>
            </div>
          </In>
        </div>

        {/* result */}
        <In delay={0.15} className="flex items-center">
          <div className="relative w-full overflow-hidden rounded-3xl border border-glacier/30 bg-gradient-to-br from-panel-2 to-ink p-8 shadow-[0_0_80px_-24px_rgba(110,233,255,0.45)] sm:p-12">
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-glacier/15 blur-3xl" />
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
              потенциальный эффект в месяц
            </div>
            <motion.div className="mt-6 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-none text-white tabular">
              {display}
            </motion.div>
            <div className="mt-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-glacier">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-glacier opacity-70" />
                <span className="relative h-2 w-2 rounded-full bg-glacier" />
              </span>
              живой пересчёт при движении ползунков
            </div>

            <div className="my-8 h-px w-full bg-gradient-to-r from-glacier/40 via-line to-transparent" />

            <div className="flex items-start gap-3 text-xs leading-relaxed text-mist">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-glacier/70" />
              Расчёт является предварительным и не гарантирует финансовый результат.
              Точные цифры — после аудита курорта.
            </div>

            <Magnet strength={0.2} className="mt-8 w-full">
              <button
                onClick={() => scrollToId("#contact")}
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:bg-glacier hover:shadow-[0_0_40px_rgba(110,233,255,0.45)]"
              >
                Обсудить расчёт
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnet>
          </div>
        </In>
      </div>
    </section>
  );
}
