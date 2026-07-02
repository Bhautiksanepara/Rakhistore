import PropTypes from 'prop-types';
import Dropdown from '../common/Dropdown.jsx';
import { useCategories } from '../../hooks/useCategories.js';

export default function CategoryFilter({ value, onChange }) {
  const { categories } = useCategories();

  const options = [
    { value: '', label: 'All Categories', shortLabel: 'Category' },
    ...categories.map((category) => ({
      value: category.slug,
      label: category.name,
    })),
  ];

  return (
    <Dropdown
      options={options}
      value={value}
      onChange={onChange}
      ariaLabel="Filter by category"
      className="w-full sm:w-44"
    />
  );
}

CategoryFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
