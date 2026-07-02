import PropTypes from 'prop-types';

export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-beige/60 dark:bg-maroon dark:ring-maroon-deep/60">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saffron/10 text-saffron">
          <Icon size={20} aria-hidden="true" />
        </div>
        <div>
          <p className="text-2xl font-semibold text-maroon dark:text-cream">
            {value}
          </p>
          <p className="text-sm text-maroon-deep/60 dark:text-cream/60">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
