import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Check, Loader2, ArrowUpRight, RotateCcw } from "lucide-react";
import { Kicker, Reveal, In, Magnet } from "../lib/ui";

const BULLETS = [
  "Первичная оценка инфраструктуры",
  "Интеграция с вашим оборудованием",
  "Без обязательств на старте",
];

const formatPhone = (v: string) => {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (d && !d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p = d.slice(1);
  let out = d.length ? "+7" : "";
  if (p.length > 0) out += " " + p.slice(0, 3);
  if (p.length > 3) out += " " + p.slice(3, 6);
  if (p.length > 6) out += " " + p.slice(6, 8);
  if (p.length > 8) out += " " + p.slice(8, 10);
  return out;
};

const fieldCls =
  "w-full rounded-xl border border-line bg-ink/60 px-4 py-3.5 text-[15px] text-white placeholder:text-mist/50 outline-none transition-all duration-300 focus:border-glacier/70 focus:bg-ink focus:shadow-[0_0_0_3px_rgba(110,233,255,0.12)]";

const labelCls = "mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-mist";

export default function Contact() {
  const [name, setName] = useState("");
  const [resort, setResort] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState<string | null>(null);
  const [shake, setShake] = useState(0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = name.trim().length >= 2 && phone.replace(/\D/g, "").length === 11 && consent;
    if (!ok) {
      setErr("Заполните имя и телефон полностью и подтвердите согласие.");
      setShake((k) => k + 1);
      return;
    }
    setErr(null);
    setState("sending");
    window.setTimeout(() => {
      try {
        const leads = JSON.parse(localStorage.getItem("skipass-leads") ?? "[]");
        leads.push({ name: name.trim(), resort: resort.trim(), phone, at: new Date().toISOString() });
        localStorage.setItem("skipass-leads", JSON.stringify(leads));
      } catch {
        /* приватный режим — просто пропускаем сохранение */
      }
      setState("done");
    }, 1400);
  };

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-ink-2/40">
      <div
        className="pointer-events-none absolute -bottom-52 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full opacity-25 blur-[150px]"
        style={{ background: "radial-gradient(circle, rgba(110,233,255,0.5), transparent 62%)" }}
      />
      <div className="relative mx-auto grid max-w-[1440px] gap-16 px-5 py-28 sm:px-8 lg:grid-cols-2 lg:py-40">
        <div>
          <Kicker index="07" label="Контакты" />
          <h2 className="mt-8 font-display text-[clamp(2.1rem,4vw,3.8rem)] font-medium uppercase leading-[1.04] text-white">
            <Reveal text="Начните сезон" />
            <br />
            <span className="text-glacier">
              <Reveal text="без очередей" delay={0.15} />
            </span>
          </h2>
          <In delay={0.25} className="mt-8 max-w-lg leading-relaxed text-mist">
            Расскажите о курорте — обсудим инфраструктуру, подберём формат внедрения
            и подготовим коммерческое предложение.
          </In>

          <In delay={0.3} className="mt-10">
            <a
              href="tel:+79039251002"
              className="group inline-flex items-center gap-4 font-display text-2xl font-medium text-white transition-colors hover:text-glacier sm:text-4xl"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-line-2 text-glacier transition-all duration-500 group-hover:border-glacier/70 group-hover:shadow-[0_0_28px_rgba(110,233,255,0.4)] sm:h-14 sm:w-14">
                <Phone className="h-5 w-5" />
              </span>
              +7 903 925 10 02
            </a>
          </In>

          <div className="mt-12 flex flex-col gap-4">
            {BULLETS.map((b, i) => (
              <In key={b} delay={0.2 + i * 0.1} className="flex items-center gap-3 text-sm text-white/80">
                <span className="grid h-6 w-6 place-items-center rounded-full border border-glacier/40 text-glacier">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {b}
              </In>
            ))}
          </div>
        </div>

        {/* form card */}
        <In delay={0.15} className="flex items-center">
          <motion.div
            key={shake}
            animate={shake ? { x: [0, -9, 9, -5, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="relative w-full overflow-hidden rounded-3xl border border-line bg-panel/90 p-7 shadow-[0_50px_100px_-40px_rgba(2,14,24,0.95)] sm:p-10"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-glacier/70 to-transparent" />
            <AnimatePresence mode="wait">
              {state === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-h-[480px] flex-col items-center justify-center text-center"
                >
                  <motion.svg viewBox="0 0 72 72" className="h-20 w-20">
                    <motion.circle
                      cx="36" cy="36" r="32" fill="none" stroke="#6ee9ff" strokeWidth="2"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <motion.path
                      d="M23 37l9 9 17-19" fill="none" stroke="#6ee9ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </motion.svg>
                  <h3 className="mt-8 font-display text-2xl font-medium text-white">Заявка сохранена</h3>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
                    Демо-режим без сервера: данные остались только в этом браузере и никуда не отправлены.
                    Чтобы заявка дошла до нас — позвоните или отправьте её по телефону ниже.
                  </p>
                  <a
                    href="tel:+79039251002"
                    className="mt-6 flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-glacier"
                  >
                    <Phone className="h-4 w-4" /> +7 903 925 10 02
                  </a>
                  <button
                    onClick={() => setState("idle")}
                    className="mt-4 flex items-center gap-2 rounded-full border border-line-2 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-glacier/60 hover:text-glacier"
                  >
                    <RotateCcw className="h-4 w-4" /> Отправить ещё одну
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  noValidate
                >
                  <h3 className="font-display text-xl font-medium text-white sm:text-2xl">Оставить заявку</h3>
                  <p className="mt-2 text-sm text-mist">Ответим в течение рабочего дня.</p>

                  <div className="mt-8 flex flex-col gap-5">
                    <div>
                      <label htmlFor="f-name" className={labelCls}>Ваше имя *</label>
                      <input id="f-name" className={fieldCls} placeholder="Иван Петров" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                    </div>
                    <div>
                      <label htmlFor="f-resort" className={labelCls}>Курорт / площадка</label>
                      <input id="f-resort" className={fieldCls} placeholder="Название курорта" value={resort} onChange={(e) => setResort(e.target.value)} autoComplete="organization" />
                    </div>
                    <div>
                      <label htmlFor="f-phone" className={labelCls}>Телефон для связи *</label>
                      <input id="f-phone" className={fieldCls} placeholder="+7 900 000 00 00" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} inputMode="tel" autoComplete="tel" />
                    </div>

                    <label className="group flex cursor-pointer items-start gap-3 select-none" data-hover>
                      <input type="checkbox" className="sr-only" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                      <span
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-all duration-300 ${
                          consent ? "border-glacier bg-glacier" : "border-line-2 group-hover:border-glacier/50"
                        }`}
                      >
                        <Check
                          className={`h-3 w-3 text-ink transition-opacity duration-200 ${consent ? "opacity-100" : "opacity-0"}`}
                          strokeWidth={4}
                        />
                      </span>
                      <span className="text-xs leading-relaxed text-mist">
                        Согласен(на) на обработку персональных данных для ответа на запрос.
                      </span>
                    </label>

                    <AnimatePresence>
                      {err && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden rounded-lg border border-ember/40 bg-ember/10 px-4 py-3 text-xs text-ember"
                        >
                          {err}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Magnet strength={0.15} className="w-full">
                      <button
                        type="submit"
                        disabled={state === "sending"}
                        className="group flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:bg-glacier hover:shadow-[0_0_40px_rgba(110,233,255,0.45)] disabled:cursor-wait disabled:opacity-80"
                      >
                        {state === "sending" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> Отправляем запрос…
                          </>
                        ) : (
                          <>
                            Запросить предложение
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </>
                        )}
                      </button>
                    </Magnet>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </In>
      </div>
    </section>
  );
}
