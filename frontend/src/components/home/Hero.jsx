import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-beige to-saffron/20 dark:from-maroon-deep dark:via-maroon dark:to-maroon-deep">
      <motion.div
        aria-hidden="true"
        className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-saffron/20 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-gold/20 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-full bg-white/70 px-4 py-1 text-sm font-medium text-maroon shadow-sm backdrop-blur dark:bg-maroon/60 dark:text-cream"
        >
          This Raksha Bandhan, gift a story
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-3xl font-heading text-4xl text-maroon dark:text-cream md:text-6xl"
        >
          Handpicked Rakhis, delivered with love
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-xl text-maroon-deep/70 dark:text-cream/70"
        >
          Browse our premium festive collection and order your favourite in
          seconds — straight through WhatsApp, no fuss.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-saffron px-8 py-3 font-medium text-white shadow-lg shadow-saffron/30 transition hover:bg-saffron-light"
          >
            Explore Collection
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
