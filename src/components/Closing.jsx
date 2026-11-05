import { couple, countdownTarget } from '../data/wedding.js';
import Countdown from './Countdown.jsx';

export default function Closing() {
  return (
    <section className="closing">
      <span className="closing-flower">✿</span>
      <span className="eyebrow">It would mean the world</span>
      <h2>
        To have you
        <br />
        <em>by our side.</em>
      </h2>
      <p>
        With love, {couple.groom} &amp; {couple.bride}
      </p>
      <div className="closing-date">
        <Countdown target={countdownTarget} />
      </div>
    </section>
  );
}
