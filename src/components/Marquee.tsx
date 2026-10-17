import React from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform } from "motion/react";
import { Snowflake } from "lucide-react";

const ITEMS = [
  "Платежи",
  "Пропуск",
  "Аналитика",
  "Офлайн-режим",
  "Единый кошелёк",
  "Сеть курортов",
  "API 1С",
  "Контроль доступа",
];

const Row: React.FC<{ hidden?: boolean }> = ({ hidden }) => (
  <div className="flex shrink-0 items-center" aria-hidden={hidden}>
    {ITEMS.map((item, i) => (
      <span key={i} className="flex items-center">
        <span
          className={`whitespace-nowrap px-6 font-display text-4xl font-medium uppercase leading-none tracking-tight sm:px-10 sm:text-6xl ${
            i % 2 === 0 ? "text-white" : "text-stroke"
          }`}
        >
          {item}
        </span>
        <Snowflake className={`h-6 w-6 shrink-0 sm:h-8 sm:w-8 ${i % 3 === 0 ? "text-ember" : "text-glacier"}`} strokeWidth={1.4} />
      </span>
    ))}
  </div>
);

export default function Marquee() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 120, damping: 40, mass: 0.6 });
  const skewX = useTransform(smooth, [-2400, 2400], [-5, 5], { clamp: true });

  return (
    <section className="relative overflow-hidden border-y border-line bg-ink-2 py-8 sm:py-10" aria-label="Возможности системы">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-2 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-2 to-transparent" />
      <motion.div className="flex w-max animate-marquee will-change-transform" style={{ skewX }}>
        <Row />
        <Row />
        <Row hidden />
        <Row hidden />
      </motion.div>
    </section>
  );
}
