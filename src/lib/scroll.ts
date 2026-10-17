import { useEffect, useState } from "react";
import Lenis from "lenis";

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};
export const getLenis = () => lenis;

export const scrollToId = (hash: string) => {
  const el = document.querySelector(hash) as HTMLElement | null;
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -76, duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
  }
};

export const rub = (n: number) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(n));

export const useMediaQuery = (queryToMatch: string): boolean => {
  const [matches, setMatches] = useState<boolean>(
    () => typeof window !== "undefined" && window.matchMedia(queryToMatch).matches,
  );
  useEffect(() => {
    const m = window.matchMedia(queryToMatch);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, [queryToMatch]);
  return matches;
};
