import PropTypes from 'prop-types';
import Dropdown from '../common/Dropdown.jsx';

const OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High', shortLabel: 'Price ↑' },
  { value: 'price_desc', label: 'Price: High to Low', shortLabel: 'Price ↓' },
  { value: 'featured', label: 'Featured' },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <Dropdown
      options={OPTIONS}
      value={value}
      onChange={onChange}
      ariaLabel="Sort products"
      className="w-full sm:w-44"
    />
  );
}

SortDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
