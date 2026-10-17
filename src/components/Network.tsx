import React from "react";
import { motion } from "motion/react";
import { Globe2, WifiOff, ShieldCheck } from "lucide-react";
import { Kicker, Reveal, In } from "../lib/ui";

const CX = 300;
const CY = 300;
const R = 236;
const NODES = Array.from({ length: 6 }, (_, i) => {
  const a = (-90 + i * 60) * (Math.PI / 180);
  return {
    id: i,
    label: `Курорт 0${i + 1}`,
    x: CX + R * Math.cos(a),
    y: CY + R * Math.sin(a),
  };
});

const NetworkMap: React.FC = () => (
  <div className="relative aspect-square w-full max-w-[560px]" data-hover>
    {/* rotating rings */}
    <motion.div
      className="absolute inset-[8%] rounded-full border border-dashed border-glacier/20"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, ease: "linear", repeat: Infinity }}
    />
    <motion.div
      className="absolute inset-[22%] rounded-full border border-glacier/12"
      animate={{ rotate: -360 }}
      transition={{ duration: 46, ease: "linear", repeat: Infinity }}
    />

    <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="net-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6ee9ff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#6ee9ff" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {NODES.map((n, i) => (
        <motion.line
          key={i}
          id={`net-line-${i}`}
          x1={CX}
          y1={CY}
          x2={n.x}
          y2={n.y}
          stroke="url(#net-line)"
          strokeWidth="1.4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.6, delay: 0.2 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {/* travelling pulses */}
      {NODES.map((_, i) => (
        <circle key={`p-${i}`} r="3.5" fill="#6ee9ff" opacity="0.9">
          <animateMotion
            dur={`${2.6 + i * 0.35}s`}
            begin={`${i * 0.5}s`}
            repeatCount="indefinite"
            calcMode="spline"
            keyPoints="0;1"
            keyTimes="0;1"
            keySplines="0.42 0 0.58 1"
          >
            <mpath href={`#net-line-${i}`} />
          </animateMotion>
        </circle>
      ))}
    </svg>

    {/* center hub */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.1 }}
        className="relative grid h-32 w-32 place-items-center rounded-3xl border border-glacier/40 bg-ink/80 shadow-[0_0_60px_-10px_rgba(110,233,255,0.5)] backdrop-blur-md sm:h-36 sm:w-36"
      >
        <motion.div
          className="absolute inset-0 rounded-3xl border border-glacier/40"
          animate={{ scale: [1, 1.25], opacity: [0.55, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
        <div className="text-center">
          <svg viewBox="0 0 24 24" className="mx-auto mb-2 h-6 w-6 text-glacier" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
          </svg>
          <div className="font-display text-sm text-white">Ски-Пасс</div>
          <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.28em] text-mist">единая база карт</div>
        </div>
      </motion.div>
    </div>

    {/* satellite chips */}
    {NODES.map((n, i) => (
      <motion.div
        key={n.id}
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.5 + i * 0.12, type: "spring", stiffness: 160, damping: 16 }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${(n.x / 600) * 100}%`, top: `${(n.y / 600) * 100}%` }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line-2 bg-ink/85 px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-md sm:text-[10px]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-glacier shadow-[0_0_10px_rgba(110,233,255,0.9)]" />
          {n.label}
        </motion.div>
      </motion.div>
    ))}
  </div>
);

const FEATURES = [
  {
    icon: Globe2,
    title: "Единый кошелёк",
    text: "Гость, купивший ски-пасс на одном курорте, пользуется им на всех ваших площадках:",
  },
  {
    icon: WifiOff,
    title: "Автономность",
    text: "Каждая система работает самостоятельно — даже при полной потере связи с интернетом.",
  },
  {
    icon: ShieldCheck,
    title: "Данные под контролем",
    text: "Общая база карт доступна онлайн, история операций синхронизируется после восстановления связи.",
  },
];

export default function Network() {
  return (
    <section id="network" className="relative overflow-hidden border-t border-line">
      {/* backdrop */}
      <img
        src="./img/resort-aerial.jpg"
        alt="Ночной вид курорта сверху: подсвеченные трассы как единая сеть"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.32]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/78 to-ink" />

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-16 px-5 py-28 sm:px-8 lg:grid-cols-2 lg:py-40">
        <div>
          <Kicker index="03" label="Единая сеть" />
          <h2 className="mt-8 font-display text-[clamp(2rem,4vw,3.6rem)] font-medium uppercase leading-[1.05] text-white">
            <Reveal text="Одна карта —" />
            <br />
            <span className="text-glacier">
              <Reveal text="все ваши курорты" delay={0.15} />
            </span>
          </h2>
          <In delay={0.25} className="mt-8 max-w-lg leading-relaxed text-mist">
            База карт доступна онлайн: прокат, кафе и парковка — в одном кошельке гостя. При этом
            каждая площадка остаётся автономной и продолжает принимать и фиксировать платежи
            даже без интернета.
          </In>

          <div className="mt-12 flex flex-col gap-6">
            {FEATURES.map((f, i) => (
              <In key={f.title} delay={0.15 + i * 0.12} className="group flex items-start gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line-2 bg-panel/80 text-glacier transition-all duration-500 group-hover:border-glacier/60 group-hover:shadow-[0_0_24px_rgba(110,233,255,0.3)]">
                  <f.icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="font-display text-base font-medium text-white sm:text-lg">{f.title}</h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-mist">{f.text}</p>
                </div>
              </In>
            ))}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <NetworkMap />
        </div>
      </div>
    </section>
  );
}
