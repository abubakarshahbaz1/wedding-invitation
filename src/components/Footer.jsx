import { couple, dateRange } from '../data/wedding.js';

export default function Footer() {
  return (
    <footer className="footer">
      <span>
        Made with love for {couple.groom} &amp; {couple.bride}
      </span>
      <span>{dateRange}</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
