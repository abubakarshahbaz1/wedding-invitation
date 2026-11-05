// Single source of truth for the wedding details shown on the page.

export const couple = {
  groom: 'Bilal',
  bride: 'Ayesha',
};

// Local files live in public/assets (run `npm run assets` to download the originals).
export const assets = {
  invitationArt: '/assets/invitation-art-6dec.png',
  music: '/assets/alfaaz.mp3',
  eventBackgrounds: {
    walima: '/assets/walima.png',
  },
};

export const music = {
  title: 'Alfaaz',
};

// Walima: 6 December 2026, 00:00 Pakistan time (UTC+05:00).
export const countdownTarget = '2026-12-06T00:00:00+05:00';

export const saveTheDate = '6 December 2026';
export const dateRange = '6 December 2026';

export const events = [
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
