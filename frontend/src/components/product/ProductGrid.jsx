import PropTypes from 'prop-types';
import ProductCard from './ProductCard.jsx';
import ProductCardSkeleton from './ProductCardSkeleton.jsx';

export default function ProductGrid({
  products,
  loading,
  emptyMessage = 'No products found.',
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-maroon-deep/60 dark:text-cream/60">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
};
