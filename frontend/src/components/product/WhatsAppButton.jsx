import PropTypes from 'prop-types';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '../../utils/whatsapp.js';

export default function WhatsAppButton({ product }) {
  return (
    <a
      href={buildWhatsAppLink(product)}
      target="_blank"
      rel="noreferrer"
      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3 font-medium text-white shadow-lg shadow-[#25D366]/30 transition hover:brightness-95"
    >
      <MessageCircle size={20} />
      Buy on WhatsApp
    </a>
  );
}

WhatsAppButton.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
