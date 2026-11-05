import { useEffect, useState } from 'react';

const pad = (value) => String(value).padStart(2, '0');

function getTimeLeft(targetMs) {
  let remaining = Math.max(0, targetMs - Date.now());
  const days = Math.floor(remaining / 86400000);
  remaining %= 86400000;
  const hours = Math.floor(remaining / 3600000);
  remaining %= 3600000;
  const minutes = Math.floor(remaining / 60000);
  remaining %= 60000;
  const seconds = Math.floor(remaining / 1000);
  return { days: pad(days), hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) };
}

/** Ticks once a second and returns zero-padded days / hours / minutes / seconds. */
export default function useCountdown(target) {
  const targetMs = new Date(target).getTime();
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetMs));

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(targetMs));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  return timeLeft;
}
