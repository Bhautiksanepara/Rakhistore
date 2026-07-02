import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatPrice } from '../../utils/formatPrice.js';
import { optimizeImageUrl } from '../../utils/cloudinary.js';
import { useWishlist } from '../../context/WishlistContext.jsx';

export default function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product._id);
  const image = optimizeImageUrl(product.images?.[0]?.url, 400);
  const hasDiscount = product.originalPrice > product.price;
  const discount = hasDiscount
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) *
          100
      )
    : null;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-beige/60 transition hover:shadow-lg dark:bg-maroon dark:ring-maroon-deep/60"
    >
      <button
        type="button"
        onClick={() => toggleWishlist(product._id)}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-maroon shadow-sm transition hover:scale-110 dark:bg-maroon-deep/90 dark:text-cream"
      >
        <Heart
          size={16}
          fill={wishlisted ? 'currentColor' : 'none'}
          className={wishlisted ? 'text-saffron' : ''}
        />
      </button>

      {(product.featured || product.newArrival || discount) && (
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
          {product.newArrival && (
            <span className="rounded-full bg-maroon px-2 py-0.5 text-[10px] font-semibold uppercase text-cream">
              New
            </span>
          )}
          {product.featured && (
            <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-semibold uppercase text-maroon-deep">
              Featured
            </span>
          )}
          {discount && (
            <span className="rounded-full bg-saffron px-2 py-0.5 text-[10px] font-semibold uppercase text-maroon-deep">
              {discount}% off
            </span>
          )}
        </div>
      )}

      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-beige/40">
          {image ? (
            <img
              src={image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-maroon-deep/40">
              No image
            </div>
          )}
          {!product.availability && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-maroon">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs text-maroon-deep/50 dark:text-cream/50">
            {product.category?.name}
          </p>
          <h3 className="mt-1 truncate font-medium text-maroon-deep dark:text-cream">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-semibold text-maroon dark:text-saffron">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-maroon-deep/40 line-through dark:text-cream/40">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    featured: PropTypes.bool,
    newArrival: PropTypes.bool,
    availability: PropTypes.bool,
    images: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })),
    category: PropTypes.shape({ name: PropTypes.string }),
  }).isRequired,
};
