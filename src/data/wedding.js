// Single source of truth for the wedding details shown on the page.

export const couple = {
  groom: 'Bilal',
  bride: 'Ayesha',
};

// Local files live in public/assets (run `npm run assets` to download the originals).
export const assets = {
  invitationArt: '/assets/invitation-art.png',
  music: '/assets/alfaaz.mp3',
  eventBackgrounds: {
    mehndi: '/assets/mehndi.png',
    barat: '/assets/barat.png',
    walima: '/assets/walima.png',
  },
};

export const music = {
  title: 'Alfaaz',
};

// First celebration: 4 December 2026, 00:00 Pakistan time (UTC+05:00).
export const countdownTarget = '2026-12-04T00:00:00+05:00';

export const saveTheDate = '4 December 2026';
export const dateRange = '4 — 6 December 2026';

export const events = [
  {
    id: 'mehndi',
    name: 'Mehndi',
    date: 'Friday, 4 December 2026',
    description: 'An evening of colour & celebration',
    venue: 'Home',
  },
  {
    id: 'barat',
    name: 'Barat',
    date: 'Saturday, 5 December 2026',
    description: 'The day we become one',
    venue: 'Home',
  },
  {
    id: 'walima',
    name: 'Walima',
    date: 'Sunday, 6 December 2026',
    description: 'A joyful first celebration together',
    venue: 'Qasar e Hussain Marquee · Baharwal',
    mapLabel: 'Qasar e Hussain Marquee',
    mapUrl: 'https://maps.app.goo.gl/jDLGhuTry6EGuqrq7',
  },
];
