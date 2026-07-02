import PropTypes from 'prop-types';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1 md:max-w-sm">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-maroon-deep/40 dark:text-cream/40"
        size={18}
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Rakhis..."
        aria-label="Search Rakhis"
        className="w-full rounded-full border border-beige bg-white py-2 pl-10 pr-4 text-sm text-maroon-deep focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/40 dark:border-maroon dark:bg-maroon dark:text-cream"
      />
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
