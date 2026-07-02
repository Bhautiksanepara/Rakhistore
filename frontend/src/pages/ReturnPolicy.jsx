import SEO from '../components/common/SEO.jsx';

export default function ReturnPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <SEO
        title="Return Policy"
        description="Return and exchange policy for Rakhi Store orders, handled directly over WhatsApp."
      />
      <h1 className="font-heading text-4xl text-maroon dark:text-cream">
        Return Policy
      </h1>
      <p className="mt-2 text-sm text-maroon-deep/50 dark:text-cream/50">
        Last updated: July 2026
      </p>

      <div className="mt-8 space-y-6 text-maroon-deep/70 dark:text-cream/70">
        <section>
          <h2 className="font-heading text-xl text-maroon dark:text-cream">
            Requesting a return or exchange
          </h2>
          <p className="mt-2">
            Since every order is confirmed over WhatsApp, returns and
            exchanges are also handled there. Message us within 7 days of
            delivery with your order details and a photo of the item, and
            we&rsquo;ll help sort it out.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-maroon dark:text-cream">
            Condition
          </h2>
          <p className="mt-2">
            Items should be unused and in their original packaging to be
            eligible for a return or exchange.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-maroon dark:text-cream">
            Damaged or incorrect items
          </h2>
          <p className="mt-2">
            If your Rakhi arrives damaged or isn&rsquo;t what you ordered,
            let us know right away on WhatsApp and we&rsquo;ll make it
            right.
          </p>
        </section>
      </div>
    </div>
  );
}
