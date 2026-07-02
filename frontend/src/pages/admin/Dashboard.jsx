import { Link } from 'react-router-dom';
import { Package, Star, Tags } from 'lucide-react';
import StatCard from '../../components/admin/StatCard.jsx';
import { useStats } from '../../hooks/useStats.js';
import { formatPrice } from '../../utils/formatPrice.js';
import { optimizeImageUrl } from '../../utils/cloudinary.js';

export default function Dashboard() {
  const { stats, loading } = useStats();

  return (
    <div>
      <h1 className="font-heading text-2xl text-maroon dark:text-cream">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-maroon-deep/60 dark:text-cream/60">
        A quick look at your catalogue.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={Package}
          label="Total Products"
          value={loading ? '—' : stats.totalProducts}
        />
        <StatCard
          icon={Star}
          label="Featured Products"
          value={loading ? '—' : stats.featuredProducts}
        />
        <StatCard
          icon={Tags}
          label="Categories"
          value={loading ? '—' : stats.totalCategories}
        />
      </div>

      <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-beige/60 dark:bg-maroon dark:ring-maroon-deep/60">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-maroon-deep dark:text-cream">
            Recent Products
          </h2>
          <Link
            to="/admin/products"
            className="text-sm text-saffron-text hover:underline dark:text-saffron"
          >
            View all
          </Link>
        </div>

        {!loading && stats.recentProducts.length === 0 && (
          <p className="mt-4 text-sm text-maroon-deep/60 dark:text-cream/60">
            No products yet.
          </p>
        )}

        <div className="mt-4 divide-y divide-beige/60 dark:divide-maroon-deep/60">
          {!loading &&
            stats.recentProducts.map((product) => (
              <div key={product._id} className="flex items-center gap-3 py-3">
                <img
                  src={optimizeImageUrl(product.images?.[0]?.url, 80)}
                  alt=""
                  loading="lazy"
                  className="h-10 w-10 rounded-lg bg-beige/40 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-maroon-deep dark:text-cream">
                    {product.name}
                  </p>
                  <p className="text-xs text-maroon-deep/50 dark:text-cream/50">
                    {product.category?.name}
                  </p>
                </div>
                <p className="text-sm font-medium text-maroon dark:text-saffron">
                  {formatPrice(product.price)}
                </p>
              </div>
            ))}
        </div>
      </div>

      <Link
        to="/admin/products/new"
        className="mt-8 inline-block rounded-full bg-saffron px-6 py-2.5 text-sm font-medium text-maroon-deep transition hover:bg-saffron-light"
      >
        + Add New Product
      </Link>
    </div>
  );
}
