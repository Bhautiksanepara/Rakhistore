import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Priya S.',
    text: 'Beautiful Rakhis and super quick WhatsApp ordering. My brother loved it!',
    rating: 5,
  },
  {
    name: 'Ankit M.',
    text: 'Great quality for the price. Will definitely order again next year.',
    rating: 5,
  },
  {
    name: 'Neha R.',
    text: 'Loved the variety. The ordering process was so simple.',
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-beige/40 py-16 dark:bg-maroon/20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center font-heading text-3xl text-maroon dark:text-cream">
          What Our Customers Say
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-beige/60 dark:bg-maroon dark:ring-maroon-deep/60"
            >
              <div className="flex gap-0.5 text-gold" aria-hidden="true">
                {Array.from({ length: review.rating }).map((_, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 text-sm text-maroon-deep/70 dark:text-cream/70">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="mt-4 text-sm font-medium text-maroon dark:text-cream">
                {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
