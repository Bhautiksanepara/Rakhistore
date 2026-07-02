import { Gem, Wallet, Zap, ShieldCheck } from 'lucide-react';
import AnimatedCounter from '../common/AnimatedCounter.jsx';

const FEATURES = [
  {
    icon: Gem,
    title: 'High Quality',
    desc: 'Handpicked, premium craftsmanship in every Rakhi.',
  },
  {
    icon: Wallet,
    title: 'Affordable Prices',
    desc: 'Festive pricing without compromising on quality.',
  },
  {
    icon: Zap,
    title: 'Fast WhatsApp Ordering',
    desc: 'Order in seconds — no accounts, no hassle.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Seller',
    desc: 'Serving happy customers every Raksha Bandhan.',
  },
];

const STATS = [
  { to: 500, suffix: '+', label: 'Happy Customers' },
  { to: 100, suffix: '+', label: 'Rakhi Designs' },
  { to: 100, suffix: '%', label: 'Handpicked Quality' },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-center font-heading text-3xl text-maroon dark:text-cream">
        Why Choose Us
      </h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-beige/60 dark:bg-maroon dark:ring-maroon-deep/60"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-saffron/10 text-saffron">
              <Icon size={22} aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-medium text-maroon-deep dark:text-cream">
              {title}
            </h3>
            <p className="mt-2 text-sm text-maroon-deep/60 dark:text-cream/60">
              {desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-3 gap-4 rounded-2xl bg-maroon px-6 py-8 text-center text-cream">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="font-heading text-3xl text-gold">
              <AnimatedCounter to={stat.to} suffix={stat.suffix} />
            </p>
            <p className="mt-1 text-xs text-cream/70 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
