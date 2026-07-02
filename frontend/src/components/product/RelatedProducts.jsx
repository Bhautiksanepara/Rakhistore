import PropTypes from 'prop-types';
import ProductGrid from './ProductGrid.jsx';

export default function RelatedProducts({ products, loading }) {
  if (!loading && products.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-heading text-2xl text-maroon dark:text-cream">
        You May Also Like
      </h2>
      <div className="mt-6">
        <ProductGrid products={products} loading={loading} emptyMessage="" />
      </div>
    </section>
  );
}

RelatedProducts.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};
