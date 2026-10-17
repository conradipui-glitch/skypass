# Ски-Пасс — лендинг

Одностраничный лендинг платёжно-пропускной системы для горнолыжных курортов.
React 19 + Vite 7 + Tailwind 4, сборка в один HTML-файл (`vite-plugin-singlefile`).

- **Живой сайт:** https://conradipui-glitch.github.io/skypass/
- **Стек:** React, TypeScript, Vite, Tailwind CSS, motion (анимации), lenis (скролл), lucide-react (иконки)

## Локальный запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ — готовый сайт (index.html + img/)
npm run preview  # предпросмотр сборки
```

## Деплой

Ветка `main` — исходники. Каждый пуш в `main` собирает проект в GitHub Actions
(`.github/workflows/deploy.yml`) и публикует `dist/` в ветку `gh-pages`,
откуда GitHub Pages раздаёт сайт. Ручной деплой не нужен.

Ассеты в `public/img/` подключаются относительными путями (`./img/...`),
`base: "./"` в `vite.config.ts` — чтобы сайт работал и из подпапки Pages, и локально.
