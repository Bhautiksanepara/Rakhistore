import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Copy, Trash2, Plus, Search } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import {
  deleteProduct,
  duplicateProduct,
  bulkDeleteProducts,
} from '../../services/api/products.api.js';
import { formatPrice } from '../../utils/formatPrice.js';
import { optimizeImageUrl } from '../../utils/cloudinary.js';
import ProductMobileCard from '../../components/admin/ProductMobileCard.jsx';

export default function Products() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const debouncedSearch = useDebounce(search, 400);

  const { items, loading, total, refetch } = useProducts({
    search: debouncedSearch || undefined,
    limit: 100,
    sort: 'newest',
  });

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelected((prev) =>
      prev.length === items.length ? [] : items.map((p) => p._id)
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product? This cannot be undone.')) return;
    await deleteProduct(id);
    refetch();
  };

  const handleDuplicate = async (id) => {
    await duplicateProduct(id);
    refetch();
  };

  const handleBulkDelete = async () => {
    if (selected.length === 0) return;
    if (
      !window.confirm(
        `Delete ${selected.length} product(s)? This cannot be undone.`
      )
    ) {
      return;
    }
    await bulkDeleteProducts(selected);
    setSelected([]);
    refetch();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl text-maroon dark:text-cream">
            Products
          </h1>
          <p className="mt-1 text-sm text-maroon-deep/60 dark:text-cream/60">
            {total} total
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 rounded-full bg-saffron px-5 py-2.5 text-sm font-medium text-maroon-deep transition hover:bg-saffron-light"
        >
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-maroon-deep/40"
            size={16}
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full rounded-full border border-beige bg-white py-2 pl-9 pr-4 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/40 dark:border-maroon dark:bg-maroon dark:text-cream"
          />
        </div>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={handleBulkDelete}
            className="flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            <Trash2 size={16} /> Delete {selected.length} selected
          </button>
        )}
      </div>

      {/* Mobile/tablet: card list. The table needs ~1024px+ to fit its five
          columns alongside the sidebar, so this covers the sidebar's own
          md-and-up range too, not just phone widths. */}
      <div className="mt-6 space-y-3 lg:hidden">
        {!loading && items.length > 0 && (
          <label className="flex items-center gap-2 px-1 text-sm text-maroon-deep/70 dark:text-cream/70">
            <input
              type="checkbox"
              checked={selected.length === items.length}
              onChange={toggleSelectAll}
            />
            Select all
          </label>
        )}
        {loading ? (
          <p className="py-8 text-center text-maroon-deep/50">Loading…</p>
        ) : items.length === 0 ? (
          <p className="py-8 text-center text-maroon-deep/50">
            No products found.
          </p>
        ) : (
          items.map((product) => (
            <ProductMobileCard
              key={product._id}
              product={product}
              selected={selected.includes(product._id)}
              onToggleSelect={() => toggleSelect(product._id)}
              onDuplicate={() => handleDuplicate(product._id)}
              onDelete={() => handleDelete(product._id)}
            />
          ))
        )}
      </div>

      {/* Desktop: full table */}
      <div className="mt-6 hidden overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-beige/60 dark:bg-maroon dark:ring-maroon-deep/60 lg:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-beige/60 text-xs uppercase text-maroon-deep/50 dark:border-maroon-deep/60 dark:text-cream/50">
            <tr>
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={items.length > 0 && selected.length === items.length}
                  onChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-beige/60 dark:divide-maroon-deep/60">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-maroon-deep/50">
                  Loading…
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-maroon-deep/50">
                  No products found.
                </td>
              </tr>
            ) : (
              items.map((product) => (
                <tr key={product._id}>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(product._id)}
                      onChange={() => toggleSelect(product._id)}
                      aria-label={`Select ${product.name}`}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={optimizeImageUrl(product.images?.[0]?.url, 80)}
                        alt=""
                        loading="lazy"
                        className="h-10 w-10 rounded-lg bg-beige/40 object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-maroon-deep dark:text-cream">
                          {product.name}
                        </p>
                        <p className="text-xs text-maroon-deep/50 dark:text-cream/50">
                          {product.sku}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-maroon-deep/70 dark:text-cream/70">
                    {product.category?.name}
                  </td>
                  <td className="px-4 py-3 font-medium text-maroon-deep dark:text-cream">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        product.availability
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {product.availability ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        aria-label="Edit"
                        className="rounded-lg p-2 text-maroon-deep/60 hover:bg-beige/60 dark:text-cream/60"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDuplicate(product._id)}
                        aria-label="Duplicate"
                        className="rounded-lg p-2 text-maroon-deep/60 hover:bg-beige/60 dark:text-cream/60"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product._id)}
                        aria-label="Delete"
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
