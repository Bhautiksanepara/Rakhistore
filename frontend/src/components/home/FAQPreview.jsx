import { Link } from 'react-router-dom';
import FAQAccordion from '../common/FAQAccordion.jsx';
import { FAQ_ITEMS } from '../../data/faq.js';

export default function FAQPreview() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="text-center font-heading text-3xl text-maroon dark:text-cream">
        Frequently Asked Questions
      </h2>
      <div className="mt-8">
        <FAQAccordion items={FAQ_ITEMS.slice(0, 4)} />
      </div>
      <div className="mt-6 text-center">
        <Link
          to="/faq"
          className="text-sm font-medium text-saffron-text hover:underline dark:text-saffron"
        >
          View all FAQs
        </Link>
      </div>
    </section>
  );
}
