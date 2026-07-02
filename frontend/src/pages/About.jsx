import { Gem, Heart, Users } from 'lucide-react';

const VALUES = [
  {
    icon: Gem,
    title: 'Handpicked Quality',
    desc: 'Every Rakhi is chosen for its craftsmanship and finish.',
  },
  {
    icon: Heart,
    title: 'Made with Care',
    desc: 'Packed and shared with the same warmth as the festival itself.',
  },
  {
    icon: Users,
    title: 'Personal Service',
    desc: 'Real conversations on WhatsApp, not a faceless checkout.',
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-heading text-4xl text-maroon dark:text-cream">
        Our Story
      </h1>
      <p className="mt-4 text-maroon-deep/70 dark:text-cream/70">
        Rakhi Store began with a simple idea: make it effortless to find a
        Rakhi that feels personal, without scrolling through hundreds of
        WhatsApp photos. Every design in our collection is handpicked for
        its craftsmanship, so you can spend less time searching and more
        time celebrating.
      </p>
      <p className="mt-4 text-maroon-deep/70 dark:text-cream/70">
        We believe Raksha Bandhan is about the thought behind the thread —
        so we keep things simple: browse, pick your favourite, and confirm
        your order directly on WhatsApp. No accounts, no checkout forms,
        just a quick conversation.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {VALUES.map(({ icon: Icon, title, desc }) => (
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
    </div>
  );
}
