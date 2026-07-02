import SEO from '../components/common/SEO.jsx';

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <SEO
        title="Privacy Policy"
        description="How Rakhi Store handles your information — no online payments, no tracking cookies, WhatsApp-based ordering."
      />
      <h1 className="font-heading text-4xl text-maroon dark:text-cream">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-maroon-deep/50 dark:text-cream/50">
        Last updated: July 2026
      </p>

      <div className="mt-8 space-y-6 text-maroon-deep/70 dark:text-cream/70">
        <section>
          <h2 className="font-heading text-xl text-maroon dark:text-cream">
            What we collect
          </h2>
          <p className="mt-2">
            We do not require an account to browse or order from Rakhi
            Store. Your wishlist and recently viewed items are stored only
            in your browser&rsquo;s local storage and are never sent to our
            servers.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-maroon dark:text-cream">
            Orders and payments
          </h2>
          <p className="mt-2">
            We do not process any payments or store any payment information
            on this website. Orders are placed and confirmed through a
            direct WhatsApp conversation, which is subject to WhatsApp&rsquo;s
            own privacy policy.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-maroon dark:text-cream">
            Cookies and tracking
          </h2>
          <p className="mt-2">
            We do not use tracking or advertising cookies. Your theme
            preference (light/dark) is also stored only in your browser.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-maroon dark:text-cream">
            Contact us
          </h2>
          <p className="mt-2">
            If you have questions about this policy, message us on
            WhatsApp or write to hello@rakhistore.example.
          </p>
        </section>
      </div>
    </div>
  );
}
