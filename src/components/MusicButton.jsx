export default function MusicButton({ title, playing, unavailable, onToggle }) {
  const label = unavailable ? 'Music unavailable' : `${playing ? 'Pause' : 'Play'} ${title}`;

  return (
    <button
      className={`music-button${playing ? ' playing' : ''}`}
      type="button"
      aria-label={playing ? 'Pause background music' : 'Play background music'}
      onClick={onToggle}
    >
      <span className="music-bars" aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </span>
      <span>{label}</span>
      <span className="music-note">♫</span>
    </button>
  );
}
