import ProductGrid from '../product/ProductGrid.jsx';
import { useRecentlyViewed } from '../../context/RecentlyViewedContext.jsx';
import { useProductsByIds } from '../../hooks/useProductsByIds.js';

export default function RecentlyViewedSection() {
  const { recentlyViewed } = useRecentlyViewed();
  const { products, loading } = useProductsByIds(recentlyViewed);

  if (!loading && products.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-heading text-3xl text-maroon dark:text-cream">
        Recently Viewed
      </h2>
      <div className="mt-8">
        <ProductGrid products={products} loading={loading} />
      </div>
    </section>
  );
}
