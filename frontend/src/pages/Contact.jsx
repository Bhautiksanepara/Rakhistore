import { MessageCircle, Mail, Clock } from 'lucide-react';
import { getWhatsAppBaseLink } from '../utils/whatsapp.js';

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h1 className="font-heading text-4xl text-maroon dark:text-cream">
        Get in Touch
      </h1>
      <p className="mt-4 text-maroon-deep/70 dark:text-cream/70">
        Questions about a Rakhi, an order, or delivery? We&rsquo;re just a
        message away.
      </p>

      <a
        href={getWhatsAppBaseLink()}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3 font-medium text-white shadow-lg shadow-[#25D366]/30 transition hover:brightness-95"
      >
        <MessageCircle size={20} />
        Chat on WhatsApp
      </a>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-beige/60 dark:bg-maroon dark:ring-maroon-deep/60">
          <Mail className="mx-auto text-saffron" size={22} aria-hidden="true" />
          <p className="mt-3 text-sm font-medium text-maroon-deep dark:text-cream">
            Email
          </p>
          <p className="mt-1 text-sm text-maroon-deep/60 dark:text-cream/60">
            hello@rakhistore.example
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-beige/60 dark:bg-maroon dark:ring-maroon-deep/60">
          <Clock
            className="mx-auto text-saffron"
            size={22}
            aria-hidden="true"
          />
          <p className="mt-3 text-sm font-medium text-maroon-deep dark:text-cream">
            Response Time
          </p>
          <p className="mt-1 text-sm text-maroon-deep/60 dark:text-cream/60">
            Usually within a few hours
          </p>
        </div>
      </div>
    </div>
  );
}
