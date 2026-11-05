import { useCallback, useRef, useState } from 'react';

/**
 * Controls the background-music <audio> element.
 * - `start`  : best-effort autoplay triggered by the envelope tap (silent on failure)
 * - `toggle` : play / pause from the music button (reports a missing/blocked file)
 */
export default function useMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const start = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // Must be called synchronously from a user gesture so browsers allow playback.
    audio.play().then(() => setUnavailable(false)).catch(() => {});
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) await audio.play();
      else audio.pause();
      setUnavailable(false);
    } catch {
      setUnavailable(true);
    }
  }, []);

  // Wired to the audio element so the button always mirrors the real state.
  const audioProps = {
    ref: audioRef,
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
  };

  return { audioProps, playing, unavailable, start, toggle };
}
