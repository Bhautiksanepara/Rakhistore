import PropTypes from 'prop-types';
import { useCategories } from '../../hooks/useCategories.js';

export default function CategoryFilter({ value, onChange }) {
  const { categories } = useCategories();

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by category"
      className="rounded-full border border-beige bg-white px-4 py-2 text-sm text-maroon-deep focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/40 dark:border-maroon dark:bg-maroon dark:text-cream"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category._id} value={category.slug}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

CategoryFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
