import PropTypes from 'prop-types';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext.jsx';

export default function WishlistButton({ productId }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(productId);

  return (
    <button
      type="button"
      onClick={() => toggleWishlist(productId)}
      className={`flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-medium transition ${
        wishlisted
          ? 'border-saffron bg-saffron/10 text-saffron'
          : 'border-beige text-maroon-deep hover:border-saffron hover:text-saffron dark:border-maroon dark:text-cream'
      }`}
    >
      <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
      {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
    </button>
  );
}

WishlistButton.propTypes = {
  productId: PropTypes.string.isRequired,
};
