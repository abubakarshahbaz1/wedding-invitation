# Bilal & Ayesha — Wedding Invitation

React + Vite (JavaScript, plain CSS) recreation of the original envelope-style wedding invitation.

## Run

```bash
npm install
npm run assets     # downloads the original images + music into public/assets (see below)
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
npm run preview    # serve the production build locally
```

## Assets

Already included in `public/assets/`:

| File | Used for |
| --- | --- |
| `invitation-art.png` | Hero invitation card (shown when the envelope opens) |
| `mehndi.png` | Mehndi card background (marigold garlands) |
| `barat.png` | Barat card background (pink roses) |
| `walima.png` | Walima card background (green florals) |

**Still needed: `alfaaz.mp3`.** The background music was never included in the source files. Either run
`npm run assets` (downloads it from the original site) or save the file yourself as
`public/assets/alfaaz.mp3`. Until then the music button shows "Music unavailable" and everything else works.

To swap any image, replace the file in `public/assets/` and keep the same filename.

## Project structure

```
src/
  App.jsx                  page flow: envelope → invitation, music wiring
  main.jsx
  data/wedding.js          names, dates, venues, map link, countdown target, asset paths
  hooks/useMusic.js        <audio> play / pause + state
  hooks/useCountdown.js    1-second countdown ticker
  components/              MusicButton, Intro (envelope), Hero, DateSection, ScratchCard,
                           EventsSection, EventCard, Closing, Countdown, Footer, SectionHeading
  styles/                  one stylesheet per component, imported in original cascade order
public/assets/             images + audio
scripts/fetch-assets.mjs   asset downloader
```

Edit `src/data/wedding.js` to change any name, date, venue, map link or the countdown target
(currently `2026-12-04T00:00:00+05:00`, Pakistan time).

## Deploy

**Vercel:** push to GitHub → *Add New Project* → import the repo. `vercel.json` already sets the Vite
framework, `npm run build` and `dist`. Commit `public/assets/*` first so they deploy with the site.

Vite's hashed bundles are emitted to `dist/bundle/` (not `dist/assets/`) so they never collide with
the invitation's own `public/assets/`.
