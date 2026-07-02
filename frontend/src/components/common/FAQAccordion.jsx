import { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="divide-y divide-beige/60 dark:divide-maroon/60">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left font-medium text-maroon-deep dark:text-cream"
            >
              {item.question}
              <ChevronDown
                size={18}
                className={`shrink-0 text-saffron transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <p className="pb-4 text-sm text-maroon-deep/70 dark:text-cream/70">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

FAQAccordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};
