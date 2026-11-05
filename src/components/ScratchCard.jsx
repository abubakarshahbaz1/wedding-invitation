import { useEffect, useRef, useState } from 'react';

const BRUSH_RADIUS = 22;
const REVEAL_THRESHOLD = 0.43; // share of the surface that must be cleared
const CHECK_INTERVAL = 250; // ms between reveal checks while scratching

/**
 * Canvas scratch-off surface laid over the revealed date.
 * Drawing logic is kept identical to the original script.js.
 */
export default function ScratchCard({ date }) {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false); // starts the fade-out
  const [gone, setGone] = useState(false); // removes canvas + hint after the fade

  useEffect(() => {
    const card = cardRef.current;
    const canvas = canvasRef.current;
    if (!card || !canvas) return undefined;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let scratching = false;
    let done = false;
    let touched = false;
    let lastCheck = 0;
    let paintedW = 0;
    let paintedH = 0;
    let hideTimer;

    function paintScratchSurface() {
      const rect = card.getBoundingClientRect();
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      paintedW = rect.width;
      paintedH = rect.height;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, '#b99578');
      gradient.addColorStop(0.5, '#d6b99f');
      gradient.addColorStop(1, '#b58e70');
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.strokeStyle = 'rgba(255,248,240,.35)';
      ctx.lineWidth = 1;
      for (let x = -rect.height; x < rect.width; x += 18) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + rect.height, rect.height);
        ctx.stroke();
      }

      ctx.fillStyle = '#fff5eb';
      ctx.font = '10px DM Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '2px';
      ctx.fillText('A DATE TO REMEMBER', rect.width / 2, rect.height / 2 - 5);
      ctx.font = '9px DM Sans, sans-serif';
      ctx.fillText('✦  SCRATCH TO REVEAL  ✦', rect.width / 2, rect.height / 2 + 17);
      ctx.globalCompositeOperation = 'destination-out';
    }

    function pointFromEvent(event) {
      const rect = canvas.getBoundingClientRect();
      const touch = event.touches && event.touches[0];
      return {
        x: (touch ? touch.clientX : event.clientX) - rect.left,
        y: (touch ? touch.clientY : event.clientY) - rect.top,
      };
    }

    function checkReveal() {
      if (done) return;
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0;
      let total = 0;
      for (let i = 3; i < pixels.length; i += 4 * 16) {
        total += 1;
        if (pixels[i] < 40) clear += 1;
      }
      if (clear / total > REVEAL_THRESHOLD) {
        done = true;
        setRevealed(true);
        hideTimer = window.setTimeout(() => setGone(true), 700);
      }
    }

    function scratch(event) {
      if (!scratching || done) return;
      if (event.cancelable) event.preventDefault();
      touched = true;
      const p = pointFromEvent(event);
      ctx.beginPath();
      ctx.arc(p.x, p.y, BRUSH_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      const now = Date.now();
      if (now - lastCheck > CHECK_INTERVAL) {
        lastCheck = now;
        checkReveal();
      }
    }

    function startScratch(event) {
      if (done) return;
      scratching = true;
      scratch(event);
    }

    function stopScratch() {
      scratching = false;
      checkReveal();
    }

    function handleResize() {
      if (done) return;
      const rect = card.getBoundingClientRect();
      // Mobile browsers fire resize when the address bar collapses; only repaint on a real size change.
      if (Math.abs(rect.width - paintedW) < 1 && Math.abs(rect.height - paintedH) < 1) return;
      paintScratchSurface();
    }

    paintScratchSurface();
    // Repaint once web fonts are ready (only if the visitor hasn't started scratching).
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!done && !touched) paintScratchSurface();
      });
    }

    canvas.addEventListener('pointerdown', startScratch);
    canvas.addEventListener('pointermove', scratch);
    window.addEventListener('pointerup', stopScratch);
    canvas.addEventListener('touchstart', startScratch, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    window.addEventListener('touchend', stopScratch);
    window.addEventListener('resize', handleResize);

    return () => {
      window.clearTimeout(hideTimer);
      canvas.removeEventListener('pointerdown', startScratch);
      canvas.removeEventListener('pointermove', scratch);
      window.removeEventListener('pointerup', stopScratch);
      canvas.removeEventListener('touchstart', startScratch);
      canvas.removeEventListener('touchmove', scratch);
      window.removeEventListener('touchend', stopScratch);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="scratch-card" id="scratch-card" ref={cardRef}>
      <div className="scratch-under">
        <span>Save the date</span>
        <strong>{date}</strong>
        <small>Our celebrations begin</small>
      </div>
      {!gone && (
        <>
          <canvas
            className={`scratch-overlay${revealed ? ' revealed' : ''}`}
            id="scratch-canvas"
            ref={canvasRef}
            aria-label="Scratch to reveal the wedding date"
          ></canvas>
          <div className={`scratch-hint${revealed ? ' revealed' : ''}`} id="scratch-hint">
            <span>✦</span> Scratch gently to reveal <span>✦</span>
          </div>
        </>
      )}
    </div>
  );
}
