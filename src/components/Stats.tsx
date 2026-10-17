import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Kicker, Reveal, CountUp, In } from "../lib/ui";

const STATS = [
  { value: 50, prefix: "−", suffix: "%", label: "расходы на кассовые операции", sub: "меньше ручного труда и ошибок кассиров" },
  { value: 70, prefix: "−", suffix: "%", label: "бумажного документооборота", sub: "электронные чеки и автоматическая отчётность" },
  { value: 14, prefix: "", suffix: " дн", label: "от запуска до первого прохода", sub: "типовой срок внедрения на площадке" },
  { value: 1, prefix: "", suffix: " с", label: "проход через турникет", sub: "локальная проверка — без ожидания сети" },
];

export default function Stats() {
  const bandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: bandRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="effect" className="relative scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 pt-28 sm:px-8 lg:pt-40">
        <Kicker index="05" label="Эффект в цифрах" />
        <h2 className="mt-8 font-display text-[clamp(2.2rem,5vw,4.6rem)] font-medium uppercase leading-[1.02] text-white">
          <Reveal text="Меньше операций." />
          <br />
          <span className="text-stroke-strong">
            <Reveal text="Больше прибыли." delay={0.15} />
          </span>
        </h2>

        <In delay={0.2} className="mt-16 grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial="rest"
              whileHover="hover"
              className="group relative border-b border-line p-8 transition-colors duration-500 hover:bg-white/[0.02] sm:border-l sm:first:border-l-0 lg:border-b-0 lg:py-12"
              data-hover
            >
              <motion.div
                variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0 h-full w-[2px] origin-top bg-glacier sm:left-auto sm:right-[-1px] sm:origin-bottom"
              />
              <div className="font-display text-6xl font-semibold text-white tabular xl:text-7xl">
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} format={false} />
              </div>
              <div className="mt-5 max-w-[24ch] text-sm font-semibold leading-snug text-white/90">{s.label}</div>
              <div className="mt-2 text-xs leading-relaxed text-mist">{s.sub}</div>
              <div className="mt-6 font-mono text-[10px] tracking-[0.3em] text-glacier/50">0{i + 1}</div>
            </motion.div>
          ))}
        </In>
      </div>

      {/* cinematic band */}
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:py-32">
        <In>
          <div ref={bandRef} className="group relative h-[62vh] min-h-[420px] overflow-hidden rounded-3xl border border-line" data-hover>
            <motion.img
              src="./img/rental.jpg"
              alt="Стена проката: ряды лыж и сноубордов в драматичном свете"
              width={1920}
              height={1280}
              loading="lazy"
              decoding="async"
              style={{ y: imgY }}
              className="absolute inset-0 h-[124%] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />
            <div className="absolute bottom-0 left-0 max-w-2xl p-8 sm:p-12">
              <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-glacier">
                <span className="h-px w-8 bg-glacier/60" />
                дополнительные продажи
              </div>
              <h3 className="font-display text-2xl font-medium uppercase leading-tight text-white sm:text-4xl">
                Прокат, кафе и парковка —{" "}
                <span className="text-glacier">в одном кошельке гостя</span>
              </h3>
              <p className="mt-5 max-w-md leading-relaxed text-white/70">
                Курорт зарабатывает на каждом проходе и каждой покупке: точки питания, снаряжение
                и услуги перестают быть «серой зоной».
              </p>
            </div>
            <div className="absolute right-8 top-8 hidden rounded-full border border-white/25 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.26em] text-white/80 backdrop-blur-md sm:block">
              выручка на территории ↑
            </div>
          </div>
        </In>
      </div>
    </section>
  );
}
