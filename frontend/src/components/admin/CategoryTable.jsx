import { useState } from 'react';
import PropTypes from 'prop-types';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { updateCategory, deleteCategory } from '../../services/api/categories.api.js';

export default function CategoryTable({ categories, onChanged }) {
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: '', description: '' });
  const [error, setError] = useState('');

  const startEdit = (category) => {
    setEditingId(category._id);
    setEditValues({ name: category.name, description: category.description || '' });
    setError('');
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = async (id) => {
    setError('');
    try {
      await updateCategory(id, editValues);
      setEditingId(null);
      onChanged();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save changes.');
    }
  };

  const handleDelete = async (category) => {
    if (!window.confirm(`Delete "${category.name}"? This cannot be undone.`)) {
      return;
    }
    try {
      await deleteCategory(category._id);
      onChanged();
    } catch (err) {
      window.alert(err.response?.data?.message || 'Could not delete category.');
    }
  };

  if (categories.length === 0) {
    return (
      <p className="mt-4 text-sm text-maroon-deep/60 dark:text-cream/60">
        No categories yet.
      </p>
    );
  }

  return (
    <div className="mt-4 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-beige/60 dark:bg-maroon dark:ring-maroon-deep/60">
      {error && <p className="px-4 pt-4 text-sm text-red-600">{error}</p>}
      <table className="w-full text-left text-sm">
        <thead className="border-b border-beige/60 text-xs uppercase text-maroon-deep/50 dark:border-maroon-deep/60 dark:text-cream/50">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-beige/60 dark:divide-maroon-deep/60">
          {categories.map((category) => {
            const isEditing = editingId === category._id;
            return (
              <tr key={category._id}>
                <td className="px-4 py-3">
                  {isEditing ? (
                    <input
                      value={editValues.name}
                      onChange={(e) =>
                        setEditValues((v) => ({ ...v, name: e.target.value }))
                      }
                      aria-label="Category name"
                      className="w-full rounded-lg border border-beige px-2 py-1 text-sm dark:border-maroon-deep dark:bg-maroon-deep"
                    />
                  ) : (
                    <span className="font-medium text-maroon-deep dark:text-cream">
                      {category.name}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-maroon-deep/70 dark:text-cream/70">
                  {isEditing ? (
                    <input
                      value={editValues.description}
                      onChange={(e) =>
                        setEditValues((v) => ({
                          ...v,
                          description: e.target.value,
                        }))
                      }
                      aria-label="Category description"
                      className="w-full rounded-lg border border-beige px-2 py-1 text-sm dark:border-maroon-deep dark:bg-maroon-deep"
                    />
                  ) : (
                    category.description || '—'
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => saveEdit(category._id)}
                          aria-label="Save"
                          className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          aria-label="Cancel"
                          className="rounded-lg p-2 text-maroon-deep/60 hover:bg-beige/60"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => startEdit(category)}
                          aria-label="Edit"
                          className="rounded-lg p-2 text-maroon-deep/60 hover:bg-beige/60 dark:text-cream/60"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(category)}
                          aria-label="Delete"
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

CategoryTable.propTypes = {
  categories: PropTypes.array.isRequired,
  onChanged: PropTypes.func.isRequired,
};
