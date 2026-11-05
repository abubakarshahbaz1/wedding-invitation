export default function EventCard({ event, index }) {
  const { id, name, date, description, venue, mapUrl, mapLabel } = event;
  const number = String(index + 1).padStart(2, '0');

  return (
    <article className={`event-card ${id}`}>
      <span className="event-number">
        {number} <i>—</i> CELEBRATION
      </span>
      <h3>{name}</h3>
      <p className="event-date">{date}</p>
      <span className="event-rule"></span>
      <p className="event-description">{description}</p>
      <div className="venue-note">
        <strong>{venue}</strong>
        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${mapLabel || venue} on Google Maps`}
          >
            <span aria-hidden="true">⌖</span>
            <span>View location</span>
          </a>
        )}
      </div>
    </article>
  );
}
