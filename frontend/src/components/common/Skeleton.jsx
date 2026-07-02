import PropTypes from 'prop-types';

export default function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-beige/60 dark:bg-maroon/60 ${className}`}
    />
  );
}

Skeleton.propTypes = {
  className: PropTypes.string,
};
