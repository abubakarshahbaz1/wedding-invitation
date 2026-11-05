import useCountdown from '../hooks/useCountdown.js';

const UNITS = [
  ['days', 'Days'],
  ['hours', 'Hours'],
  ['minutes', 'Minutes'],
  ['seconds', 'Seconds'],
];

export default function Countdown({ target }) {
  const timeLeft = useCountdown(target);

  return (
    <div className="countdown" role="timer" aria-label="Countdown to Mehndi">
      {UNITS.map(([key, label]) => (
        <div className="countdown-unit" key={key}>
          <strong>{timeLeft[key]}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
