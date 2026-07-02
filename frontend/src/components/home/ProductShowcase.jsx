import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ArrowRight } from 'lucide-react';
import ProductGrid from '../product/ProductGrid.jsx';
import { useProducts } from '../../hooks/useProducts.js';

export default function ProductShowcase({
  title,
  subtitle,
  params,
  viewAllHref = '/shop',
}) {
  const { items, loading } = useProducts(params);

  if (!loading && items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-heading text-3xl text-maroon dark:text-cream">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-maroon-deep/60 dark:text-cream/60">
              {subtitle}
            </p>
          )}
        </div>
        <Link
          to={viewAllHref}
          className="hidden items-center gap-1 text-sm font-medium text-saffron hover:underline sm:flex"
        >
          View all <ArrowRight size={14} />
        </Link>
      </div>

      <div className="mt-8">
        <ProductGrid products={items} loading={loading} />
      </div>
    </section>
  );
}

ProductShowcase.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  params: PropTypes.object.isRequired,
  viewAllHref: PropTypes.string,
};
