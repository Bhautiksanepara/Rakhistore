import { formatPrice } from './formatPrice.js';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export function buildWhatsAppLink(product) {
  const message = [
    'Hello, I would like to order this Rakhi.',
    '',
    `Product Name: ${product.name}`,
    `Product ID: ${product.sku}`,
    `Price: ${formatPrice(product.price)}`,
    `Product Link: ${window.location.href}`,
    '',
    'Please let me know the ordering process.',
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppBaseLink() {
  return `https://wa.me/${WHATSAPP_NUMBER}`;
}
