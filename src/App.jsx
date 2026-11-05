import { useCallback, useEffect, useRef, useState } from 'react';
import { assets, music } from './data/wedding.js';
import useMusic from './hooks/useMusic.js';
import MusicButton from './components/MusicButton.jsx';
import Intro from './components/Intro.jsx';
import Hero from './components/Hero.jsx';
import DateSection from './components/DateSection.jsx';
import EventsSection from './components/EventsSection.jsx';
import Closing from './components/Closing.jsx';
import Footer from './components/Footer.jsx';

// Time the envelope animation plays before the invitation takes over (ms).
const OPEN_DELAY = 950;

export default function App() {
  const [opened, setOpened] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const timerRef = useRef(null);
  const { audioProps, playing, unavailable, start, toggle } = useMusic();

  const handleOpen = useCallback(() => {
    if (opened) return;
    setOpened(true);
    start(); // browsers require a user gesture before audio can start
    timerRef.current = window.setTimeout(() => {
      setUnlocked(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, OPEN_DELAY);
  }, [opened, start]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  return (
    <main id="top">
      <audio {...audioProps} loop preload="none" src={assets.music} />
      <MusicButton title={music.title} playing={playing} unavailable={unavailable} onToggle={toggle} />

      <Intro opened={opened} hidden={unlocked} onOpen={handleOpen} />

      <div className={`invitation${unlocked ? '' : ' invitation-locked'}`} id="invitation">
        <Hero />
        <DateSection />
        <EventsSection />
        <Closing />
        <Footer />
      </div>
    </main>
  );
}
