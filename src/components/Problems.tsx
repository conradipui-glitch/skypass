import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Kicker, Reveal } from "../lib/ui";

const PROBLEMS = [
  {
    n: "01",
    title: "Очереди в кассах",
    text: "В высокий сезон каждая задержка у кассы — потерянное время гостя и прямая потеря выручки курорта.",
  },
  {
    n: "02",
    title: "Разрозненные точки продаж",
    text: "Прокат, кафе, парковка и ски-бар живут каждый в своей системе. Гость платит везде по-разному, курорт не видит картинку целиком.",
  },
  {
    n: "03",
    title: "Ошибки и «серые» пропуска",
    text: "Ручные операции без контроля прохода: двойные продажи, перепутанные тарифы, неучтённые дни катания.",
  },
  {
    n: "04",
    title: "Нет данных в реальном времени",
    text: "Сколько гостей сейчас на склоне, как загружены подъёмники и где тратят деньги — узнаёте только в конце недели.",
  },
];

export default function Problems() {
  return (
    <section id="pain" className="relative mx-auto max-w-[1440px] scroll-mt-24 px-5 py-28 sm:px-8 lg:py-40">
      <div className="grid gap-16 lg:grid-cols-12">
        {/* sticky left column */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Kicker index="01" label="Сложность → Решение" />
            <h2 className="mt-8 font-display text-[clamp(2rem,4.2vw,3.6rem)] font-medium uppercase leading-[1.04] text-white">
              <Reveal text="Что съедает" />
              <br />
              <Reveal text="выручку" delay={0.15} />
              <br />
              <span className="text-stroke-glacier">
                <Reveal text="курорта" delay={0.3} />
              </span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-md leading-relaxed text-mist"
            >
              Автоматизация убирает ручной труд и потери. Курорт зарабатывает на каждом проходе
              и каждой покупке — пока вы смотрите сводку, а не разбираете кассовые расхождения.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 h-px w-full origin-left bg-gradient-to-r from-glacier/70 via-line to-transparent"
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-mist"
            >
              меньше операций — <span className="text-glacier">больше прибыли</span>
            </motion.div>
          </div>
        </div>

        {/* rows */}
        <div className="lg:col-span-7">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.85, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover="hover"
              className="group relative cursor-default border-t border-line px-2 py-10 transition-colors duration-500 last:border-b hover:bg-white/[0.025] sm:px-6"
            >
              <div className="flex items-start gap-6">
                <motion.span
                  variants={{ hover: { color: "#6ee9ff", x: 6 } }}
                  className="font-mono text-sm text-mist/60 transition-colors pt-2"
                >
                  {p.n}
                </motion.span>
                <div className="flex-1">
                  <motion.h3
                    variants={{ hover: { x: 10 } }}
                    transition={{ type: "spring", stiffness: 200, damping: 22 }}
                    className="font-display text-xl font-medium text-white sm:text-3xl"
                  >
                    {p.title}
                  </motion.h3>
                  <p className="mt-4 max-w-lg leading-relaxed text-mist">{p.text}</p>
                </div>
                <motion.span
                  variants={{ hover: { opacity: 1, x: 0, rotate: -45 } }}
                  initial={{ opacity: 0.25, x: -8 }}
                  className="mt-2 text-glacier"
                >
                  <ArrowRight className="h-6 w-6" />
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
