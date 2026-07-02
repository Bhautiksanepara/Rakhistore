import { NavLink } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppBaseLink } from '../../utils/whatsapp.js';

const LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
  { to: '/faq', label: 'FAQ' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms & Conditions' },
  { to: '/return-policy', label: 'Return Policy' },
];

export default function Footer() {
  return (
    <footer className="border-t border-beige/60 bg-white dark:border-maroon/60 dark:bg-maroon">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-heading text-xl text-maroon dark:text-cream">
              Rakhi Store
            </p>
            <p className="mt-3 max-w-xs text-sm text-maroon-deep/70 dark:text-cream/70">
              Handpicked, premium Rakhis for a Raksha Bandhan to remember.
              Browse, choose, and order in seconds — right on WhatsApp.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-maroon dark:text-cream">
              Quick Links
            </p>
            <ul className="mt-3 space-y-2">
              {LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="text-sm text-maroon-deep/70 transition hover:text-saffron dark:text-cream/70"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-maroon dark:text-cream">
              Get in Touch
            </p>
            <div className="mt-3 flex gap-3">
              <a
                href={getWhatsAppBaseLink()}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="rounded-full bg-saffron/10 p-2 text-saffron transition hover:bg-saffron hover:text-white"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-beige/60 pt-6 text-center text-xs text-maroon-deep/50 dark:border-maroon/60 dark:text-cream/50">
          © {new Date().getFullYear()} Rakhi Store. Made with love for Raksha
          Bandhan.
        </p>
      </div>
    </footer>
  );
}
