import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useProductsByIds } from '../hooks/useProductsByIds.js';
import ProductGrid from '../components/product/ProductGrid.jsx';
import SEO from '../components/common/SEO.jsx';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const { products, loading } = useProductsByIds(wishlist);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SEO title="Your Wishlist" noIndex />
      <h1 className="font-heading text-3xl text-maroon dark:text-cream">
        Your Wishlist
      </h1>
      <p className="mt-1 text-maroon-deep/60 dark:text-cream/60">
        {wishlist.length === 0
          ? 'Items you save will appear here.'
          : `${wishlist.length} item${wishlist.length === 1 ? '' : 's'} saved`}
      </p>

      <div className="mt-8">
        {wishlist.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-maroon-deep/60 dark:text-cream/60">
              Your wishlist is empty.
            </p>
            <Link
              to="/shop"
              className="mt-4 inline-block text-saffron-text hover:underline dark:text-saffron"
            >
              Browse Rakhis
            </Link>
          </div>
        ) : (
          <ProductGrid products={products} loading={loading} />
        )}
      </div>
    </div>
  );
}
