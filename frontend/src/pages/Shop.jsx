import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/filters/SearchBar.jsx';
import CategoryFilter from '../components/filters/CategoryFilter.jsx';
import SortDropdown from '../components/filters/SortDropdown.jsx';
import ProductGrid from '../components/product/ProductGrid.jsx';
import { useProducts } from '../hooks/useProducts.js';
import { useDebounce } from '../hooks/useDebounce.js';

const PAGE_SIZE = 12;

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'newest';
  const newArrival = searchParams.get('newArrival') || undefined;
  const page = Number(searchParams.get('page')) || 1;

  const debouncedSearch = useDebounce(search, 400);

  const params = {
    search: debouncedSearch || undefined,
    category: category || undefined,
    sort,
    newArrival,
    page,
    limit: PAGE_SIZE,
  };

  const { items, total, pages, loading } = useProducts(params);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete('page');
    setSearchParams(next);
  };

  const goToPage = (nextPage) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(nextPage));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-heading text-3xl text-maroon dark:text-cream">
        Shop Rakhis
      </h1>
      <p className="mt-1 text-maroon-deep/60 dark:text-cream/60">
        {loading
          ? 'Loading products…'
          : `${total} product${total === 1 ? '' : 's'} found`}
      </p>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchBar
          value={search}
          onChange={(value) => updateParam('search', value)}
        />
        <div className="flex gap-3">
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

      {pages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={
                // eslint-disable-next-line react/no-array-index-key
                i
              }
              type="button"
              onClick={() => goToPage(i + 1)}
              className={`h-9 w-9 rounded-full text-sm font-medium transition ${
                page === i + 1
                  ? 'bg-saffron text-white'
                  : 'bg-white text-maroon-deep hover:bg-saffron/10 dark:bg-maroon dark:text-cream'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
