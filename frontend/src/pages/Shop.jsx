import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/common/SEO.jsx';
import SearchBar from '../components/filters/SearchBar.jsx';
import CategoryFilter from '../components/filters/CategoryFilter.jsx';
import SortDropdown from '../components/filters/SortDropdown.jsx';
import ProductGrid from '../components/product/ProductGrid.jsx';
import { useInfiniteProducts } from '../hooks/useInfiniteProducts.js';
import { useDebounce } from '../hooks/useDebounce.js';

const PAGE_SIZE = 12;

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'newest';
  const newArrival = searchParams.get('newArrival') || undefined;

  const debouncedSearch = useDebounce(search, 400);

  const params = {
    search: debouncedSearch || undefined,
    category: category || undefined,
    sort,
    newArrival,
    limit: PAGE_SIZE,
  };

  const { items, total, loading, loadingMore, hasMore, loadMore } =
    useInfiniteProducts(params);

  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!hasMore) return undefined;
    const el = sentinelRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: '600px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SEO
        title="Shop"
        description="Browse and filter our full collection of premium Rakhis by category, price, and availability."
      />
      <h1 className="font-heading text-3xl text-maroon dark:text-cream">
        Shop Rakhis
      </h1>
      <p className="mt-1 text-maroon-deep/60 dark:text-cream/60">
        {loading
          ? 'Loading products…'
          : `${total} product${total === 1 ? '' : 's'} found`}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          value={search}
          onChange={(value) => updateParam('search', value)}
        />
        <div className="grid grid-cols-2 gap-3 sm:flex sm:w-auto sm:shrink-0">
          <CategoryFilter
            value={category}
            onChange={(value) => updateParam('category', value)}
          />
          <SortDropdown
            value={sort}
            onChange={(value) => updateParam('sort', value)}
          />
        </div>
      </div>

      <div className="mt-8">
        <ProductGrid products={items} loading={loading} />
      </div>

      {!loading && items.length > 0 && (
        <div ref={sentinelRef} className="mt-10 flex justify-center py-6">
          {loadingMore && (
            <span className="text-sm text-maroon-deep/50 dark:text-cream/50">
              Loading more…
            </span>
          )}
          {!hasMore && (
            <span className="text-sm text-maroon-deep/50 dark:text-cream/50">
              You&rsquo;ve seen all {total} product{total === 1 ? '' : 's'}.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
