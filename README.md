# 💖 Pandu Love — 3-Theme React App

A private love page built with **Vite + React + React Router + GSAP**.
Three fully distinct visual themes, a real music player, scroll-triggered animations, and proper accessibility throughout.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
# Open http://localhost:5173
```

## 🗺️ Routes

| URL | Theme |
|-----|-------|
| `localhost:5173/` | Style picker |
| `localhost:5173/glass` | ✨ Glassmorphism |
| `localhost:5173/minimal` | 🌿 Editorial minimal |
| `localhost:5173/dark` | 🌙 Cinematic dark |

**Password (all themes):** `pandumylove`

---

## 🎵 Adding Your Songs

Edit `src/data.js` → fill in `src` for each item in `PLAYLIST`:

```
GitHub raw:   https://raw.githubusercontent.com/USER/REPO/main/song.mp3
Google Drive: https://drive.google.com/uc?export=download&id=FILE_ID
AWS S3:       https://your-bucket.s3.amazonaws.com/song.mp3
```

---

## 📁 Structure

```
src/
├── data.js                  ← All content: playlist, gallery, notes, letter
├── App.jsx                  ← Router (glass / minimal / dark)
├── components/
│   ├── MusicPlayer.jsx      ← Shared player, theme-aware CSS class map
│   ├── ScrollSymbols.jsx    ← GSAP ScrollTrigger love symbols
│   └── Gallery.jsx          ← Image grid + lightbox
├── pages/
│   ├── StylePicker.jsx
│   ├── GlassPage.jsx
│   ├── MinimalPage.jsx
│   └── DarkPage.jsx
└── styles/
    ├── shared.css
    ├── glass.css / minimal.css / dark.css
    └── player.css           ← gp- / mp- / dp- namespaced per theme
```

---

## ✨ Key Features

**Music Player** — play/pause, prev/next, shuffle, repeat, seek bar (click or ←/→ keys), volume, mute, EQ bars, album spinner, neon glow ring (dark theme).

**GSAP Scroll Symbols** — 22 love symbols in 5-symbol waves, triggered at scroll intervals with scrub=1.4. Ambient idle pulse. Reduced-motion aware. Auto-cleanup on unmount.

**Accessibility** — full ARIA tabs, arrow key nav, aria-modal dialogs, aria-expanded accordion, aria-live error messages, lazy images, focus-visible outlines.

---

## 🛠️ Build

```bash
npm run build   # → dist/
```
