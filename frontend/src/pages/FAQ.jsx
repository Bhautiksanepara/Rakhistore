import FAQAccordion from '../components/common/FAQAccordion.jsx';
import { FAQ_ITEMS } from '../data/faq.js';
import { getWhatsAppBaseLink } from '../utils/whatsapp.js';

export default function FAQ() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-center font-heading text-4xl text-maroon dark:text-cream">
        Frequently Asked Questions
      </h1>
      <p className="mt-3 text-center text-maroon-deep/60 dark:text-cream/60">
        Everything you need to know about ordering with us.
      </p>

      <div className="mt-10">
        <FAQAccordion items={FAQ_ITEMS} />
      </div>

      <div className="mt-10 rounded-2xl bg-beige/40 p-6 text-center dark:bg-maroon/20">
        <p className="text-maroon-deep/70 dark:text-cream/70">
          Still have a question?
        </p>
        <a
          href={getWhatsAppBaseLink()}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block font-medium text-saffron hover:underline"
        >
          Ask us on WhatsApp
        </a>
      </div>
    </div>
  );
}
