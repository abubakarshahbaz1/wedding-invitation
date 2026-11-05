import { couple } from '../data/wedding.js';

export default function Intro({ opened, hidden, onOpen }) {
  return (
    <section
      className={`intro${hidden ? ' hidden' : ''}`}
      id="intro"
      aria-label="Open your wedding invitation"
    >
      <div className="intro-grain"></div>
      <div className="envelope-wrap">
        <button
          className={`envelope-button${opened ? ' opened' : ''}`}
          id="open-invitation"
          type="button"
          aria-label="Tap to open your invitation"
          aria-pressed={opened}
          onClick={onOpen}
        >
          <span className="envelope-back"></span>
          <span className="envelope-letter">
            <span className="letter-small">Together with their families</span>
            <span className="letter-names">
              {couple.groom} <i>&amp;</i> {couple.bride}
            </span>
            <span className="letter-date">Request the pleasure of your company</span>
          </span>
          <span className="envelope-flap"></span>
          <span className="envelope-front"></span>
          <span className="envelope-bottom"></span>
          {/* Seal + hint sit in their own top layer; inside .envelope-front they are clipped and covered. */}
          <span className="envelope-front-copy">
            <span className="seal">
              {couple.groom[0]} <i>&amp;</i> {couple.bride[0]}
            </span>
            <span className="tap-copy">Tap anywhere to open</span>
          </span>
          <span className="envelope-corner">✦</span>
        </button>
      </div>
      <span className="intro-bottom">
        A little note, made with love <span>✦</span>
      </span>
      <div className="intro-flower flower-one">✿</div>
      <div className="intro-flower flower-two">✿</div>
    </section>
  );
}
