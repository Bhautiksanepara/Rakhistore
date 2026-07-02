import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCategories } from '../../hooks/useCategories.js';
import { createCategory } from '../../services/api/categories.api.js';
import CategoryTable from '../../components/admin/CategoryTable.jsx';

export default function Categories() {
  const { categories, loading, refetch } = useCategories();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setError('');
    try {
      await createCategory({ name: name.trim(), description: description.trim() });
      setName('');
      setDescription('');
      refetch();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create category.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="font-heading text-2xl text-maroon dark:text-cream">
        Categories
      </h1>
      <p className="mt-1 text-sm text-maroon-deep/60 dark:text-cream/60">
        New categories appear on the storefront automatically.
      </p>

      <form
        onSubmit={handleAdd}
        className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-beige/60 dark:bg-maroon dark:ring-maroon-deep/60"
      >
        <div className="min-w-[160px] flex-1">
          <label
            htmlFor="cat-name"
            className="block text-xs font-medium text-maroon-deep dark:text-cream"
          >
            Name
          </label>
          <input
            id="cat-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Couple Rakhi"
            className="mt-1 w-full rounded-lg border border-beige bg-cream px-3 py-2 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/40 dark:border-maroon-deep dark:bg-maroon-deep dark:text-cream"
          />
        </div>
        <div className="min-w-[200px] flex-1">
          <label
            htmlFor="cat-desc"
            className="block text-xs font-medium text-maroon-deep dark:text-cream"
          >
            Description (optional)
          </label>
          <input
            id="cat-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-lg border border-beige bg-cream px-3 py-2 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/40 dark:border-maroon-deep dark:bg-maroon-deep dark:text-cream"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-saffron px-5 py-2.5 text-sm font-medium text-maroon-deep transition hover:bg-saffron-light disabled:opacity-60"
        >
          <Plus size={16} /> Add
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="mt-6 text-sm text-maroon-deep/60 dark:text-cream/60">
          Loading…
        </p>
      ) : (
        <CategoryTable categories={categories} onChanged={refetch} />
      )}
    </div>
  );
}
