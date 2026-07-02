import SEO from '../components/common/SEO.jsx';

export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <SEO
        title="Terms & Conditions"
        description="Terms and conditions for browsing and ordering from Rakhi Store."
      />
      <h1 className="font-heading text-4xl text-maroon dark:text-cream">
        Terms & Conditions
      </h1>
      <p className="mt-2 text-sm text-maroon-deep/50 dark:text-cream/50">
        Last updated: July 2026
      </p>

      <div className="mt-8 space-y-6 text-maroon-deep/70 dark:text-cream/70">
        <section>
          <h2 className="font-heading text-xl text-maroon dark:text-cream">
            Browsing and ordering
          </h2>
          <p className="mt-2">
            This website is a catalogue for browsing our Rakhi collection.
            No order is confirmed, and no payment is taken, until you and
            our team agree on the details over WhatsApp.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-maroon dark:text-cream">
            Pricing and availability
          </h2>
          <p className="mt-2">
            Prices and stock shown on the site are updated regularly but
            are only guaranteed once confirmed in your WhatsApp order
            conversation.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-maroon dark:text-cream">
            Product images
          </h2>
          <p className="mt-2">
            Our Rakhis are handcrafted, so slight variations in colour or
            finish compared to photos may occur.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-maroon dark:text-cream">
            Intellectual property
          </h2>
          <p className="mt-2">
            All content on this site, including photos and text, belongs to
            Rakhi Store and may not be reused without permission.
          </p>
        </section>
      </div>
    </div>
  );
}
