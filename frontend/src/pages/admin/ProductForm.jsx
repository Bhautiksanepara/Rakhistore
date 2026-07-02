import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUploader from '../../components/admin/ImageUploader.jsx';
import { useCategories } from '../../hooks/useCategories.js';
import {
  createProduct,
  updateProduct,
  getProductById,
} from '../../services/api/products.api.js';

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { categories } = useCategories();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: '',
      tags: '',
      featured: false,
      newArrival: false,
      availability: true,
    },
  });

  useEffect(() => {
    if (!isEdit) return;
    getProductById(id).then((product) => {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice || '',
        category: product.category?._id || '',
        tags: (product.tags || []).join(', '),
        featured: product.featured,
        newArrival: product.newArrival,
        availability: product.availability,
      });
      setImages(product.images || []);
      setLoading(false);
    });
  }, [id, isEdit, reset]);

  const onSubmit = async (values) => {
    setError('');
    setSaving(true);
    try {
      const payload = {
        name: values.name,
        description: values.description,
        price: Number(values.price),
        originalPrice: values.originalPrice
          ? Number(values.originalPrice)
          : undefined,
        category: values.category,
        tags: values.tags
          ? values.tags
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        featured: values.featured,
        newArrival: values.newArrival,
        availability: values.availability,
        images,
      };

      if (isEdit) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      navigate('/admin/products');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <p className="text-maroon-deep/60 dark:text-cream/60">Loading…</p>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl text-maroon dark:text-cream">
        {isEdit ? 'Edit Product' : 'Add Product'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-maroon-deep dark:text-cream"
          >
            Product Name
          </label>
          <input
            id="name"
            {...register('name', { required: 'Name is required' })}
            className="mt-1 w-full rounded-lg border border-beige bg-white px-3 py-2 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/40 dark:border-maroon dark:bg-maroon dark:text-cream"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-maroon-deep dark:text-cream"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            {...register('description')}
            className="mt-1 w-full rounded-lg border border-beige bg-white px-3 py-2 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/40 dark:border-maroon dark:bg-maroon dark:text-cream"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-maroon-deep dark:text-cream"
            >
              Price (₹)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              {...register('price', {
                required: 'Price is required',
                min: { value: 0, message: 'Must be positive' },
              })}
              className="mt-1 w-full rounded-lg border border-beige bg-white px-3 py-2 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/40 dark:border-maroon dark:bg-maroon dark:text-cream"
            />
            {errors.price && (
              <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="originalPrice"
              className="block text-sm font-medium text-maroon-deep dark:text-cream"
            >
              Original Price (optional)
            </label>
            <input
              id="originalPrice"
              type="number"
              step="0.01"
              {...register('originalPrice')}
              className="mt-1 w-full rounded-lg border border-beige bg-white px-3 py-2 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/40 dark:border-maroon dark:bg-maroon dark:text-cream"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-maroon-deep dark:text-cream"
          >
            Category
          </label>
          <select
            id="category"
            {...register('category', { required: 'Category is required' })}
            className="mt-1 w-full rounded-lg border border-beige bg-white px-3 py-2 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/40 dark:border-maroon dark:bg-maroon dark:text-cream"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-xs text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-maroon-deep dark:text-cream"
          >
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            {...register('tags')}
            placeholder="golden, premium, zardosi"
            className="mt-1 w-full rounded-lg border border-beige bg-white px-3 py-2 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/40 dark:border-maroon dark:bg-maroon dark:text-cream"
          />
        </div>

        <div>
          <span className="block text-sm font-medium text-maroon-deep dark:text-cream">
            Images
          </span>
          <div className="mt-2">
            <ImageUploader images={images} onChange={setImages} />
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-maroon-deep dark:text-cream">
            <input type="checkbox" {...register('featured')} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm text-maroon-deep dark:text-cream">
            <input type="checkbox" {...register('newArrival')} />
            New Arrival
          </label>
          <label className="flex items-center gap-2 text-sm text-maroon-deep dark:text-cream">
            <input type="checkbox" {...register('availability')} />
            In Stock
          </label>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-saffron px-6 py-2.5 text-sm font-medium text-maroon-deep transition hover:bg-saffron-light disabled:opacity-60"
          >
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Product'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="rounded-full border border-beige px-6 py-2.5 text-sm font-medium text-maroon-deep transition hover:border-saffron dark:border-maroon dark:text-cream"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
