import { assets, couple } from '../data/wedding.js';

const warnMissing = () =>
  console.warn(
    `Invitation artwork not found at ${assets.invitationArt}. Run "npm run assets" or add the file to public/assets/.`
  );

export default function Hero() {
  return (
    <section className="hero" aria-label="Wedding invitation artwork">
      <div className="hero-art">
        <img
          src={assets.invitationArt}
          alt={`Blush and gold wedding invitation for ${couple.groom} and ${couple.bride}`}
          // lowercase attribute: supported by React 18 without an unknown-prop warning
          fetchpriority="high"
          onError={warnMissing}
        />
      </div>
    </section>
  );
}
