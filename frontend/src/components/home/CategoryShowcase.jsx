import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useCategories } from '../../hooks/useCategories.js';

export default function CategoryShowcase() {
  const { categories, loading } = useCategories();

  if (!loading && categories.length === 0) return null;

  return (
    <section className="bg-beige/40 py-16 dark:bg-maroon/20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center font-heading text-3xl text-maroon dark:text-cream">
          Browse by Category
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  className="h-32 animate-pulse rounded-2xl bg-white/60 dark:bg-maroon-deep/40"
                />
              ))
            : categories.map((category, i) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link
                    to={`/shop?category=${category.slug}`}
                    className="flex h-32 flex-col items-center justify-center rounded-2xl bg-white text-center shadow-sm ring-1 ring-beige/60 transition hover:shadow-md dark:bg-maroon dark:ring-maroon-deep/60"
                  >
                    {category.image?.url ? (
                      <img
                        src={category.image.url}
                        alt=""
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <Sparkles
                        className="text-saffron"
                        size={26}
                        aria-hidden="true"
                      />
                    )}
                    <span className="mt-2 px-2 text-sm font-medium text-maroon-deep dark:text-cream">
                      {category.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
