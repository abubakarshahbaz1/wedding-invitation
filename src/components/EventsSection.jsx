import { events } from '../data/wedding.js';
import SectionHeading from './SectionHeading.jsx';
import EventCard from './EventCard.jsx';

export default function EventsSection() {
  return (
    <section className="events-section" id="celebrations">
      <SectionHeading
        eyebrow="One beautiful beginning"
        title={
          <>
            Come celebrate <em>with us</em>
          </>
        }
      >
        We can’t imagine these moments without you.
      </SectionHeading>
      <div className="event-grid">
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </section>
  );
}
