import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Pencil, Copy, Trash2 } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice.js';
import { optimizeImageUrl } from '../../utils/cloudinary.js';

export default function ProductMobileCard({
  product,
  selected,
  onToggleSelect,
  onDuplicate,
  onDelete,
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-beige/60 dark:bg-maroon dark:ring-maroon-deep/60">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggleSelect}
          aria-label={`Select ${product.name}`}
          className="shrink-0"
        />
        <img
          src={optimizeImageUrl(product.images?.[0]?.url, 80)}
          alt=""
          loading="lazy"
          className="h-12 w-12 shrink-0 rounded-lg bg-beige/40 object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-maroon-deep dark:text-cream">
            {product.name}
          </p>
          <p className="truncate text-xs text-maroon-deep/50 dark:text-cream/50">
            {product.sku} · {product.category?.name}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="font-medium text-maroon-deep dark:text-cream">
            {formatPrice(product.price)}
          </span>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
              product.availability
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {product.availability ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Link
            to={`/admin/products/${product._id}/edit`}
            aria-label="Edit"
            className="rounded-lg p-2 text-maroon-deep/60 hover:bg-beige/60 dark:text-cream/60"
          >
            <Pencil size={16} />
          </Link>
          <button
            type="button"
            onClick={onDuplicate}
            aria-label="Duplicate"
            className="rounded-lg p-2 text-maroon-deep/60 hover:bg-beige/60 dark:text-cream/60"
          >
            <Copy size={16} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete"
            className="rounded-lg p-2 text-red-500 hover:bg-red-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

ProductMobileCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sku: PropTypes.string,
    price: PropTypes.number.isRequired,
    availability: PropTypes.bool,
    images: PropTypes.array,
    category: PropTypes.shape({ name: PropTypes.string }),
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onToggleSelect: PropTypes.func.isRequired,
  onDuplicate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
