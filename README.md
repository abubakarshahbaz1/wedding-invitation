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

## Assets (important)

The source ZIP contained **no image or audio files** — the original page hotlinked them from
`card-olive-pi.vercel.app`. `npm run assets` downloads them into `public/assets/` under clean names
(existing files are never overwritten):

| Local file (`public/assets/`) | Original file on the reference site | Used for |
| --- | --- | --- |
| `invitation-art.png` | `Blush and Gold Wedding Invitation.png` | Hero artwork |
| `mehndi.png` | `Mahndi.png` | Mehndi card background |
| `barat.png` | `Barat.png` | Barat card background |
| `walima.png` | `Walima.png` | Walima card background |
| `alfaaz.mp3` | `Alfaaz (Lyrics) - Hamza Malik & Zain Zohaib … (mp3cut.net).mp3` | Background music |

**Check the hero artwork.** The reference site currently shows another couple's names. If
`invitation-art.png` has those names printed into the image, replace it with your own artwork
(same filename, ideally the same proportions). Event-card backgrounds sit under a 76–82 % cream wash,
so they can be swapped the same way.

Until the files exist the site still loads: event cards show the cream wash only, and the music button
reports "Music unavailable". The browser console says which file is missing.

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
