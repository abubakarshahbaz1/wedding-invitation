import { saveTheDate } from '../data/wedding.js';
import SectionHeading from './SectionHeading.jsx';
import ScratchCard from './ScratchCard.jsx';

export default function DateSection() {
  return (
    <section className="date-section" id="save-the-date">
      <SectionHeading
        eyebrow="A date to remember"
        title={
          <>
            A little <em>something</em>
            <br />
            to uncover
          </>
        }
      >
        A day that will stay in our hearts, forever.
      </SectionHeading>
      <ScratchCard date={saveTheDate} />
      <span className="section-ornament">✳</span>
    </section>
  );
}
