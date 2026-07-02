import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO.jsx';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
      <SEO title="Page Not Found" noIndex />
      <p className="font-heading text-6xl text-saffron-text dark:text-saffron">404</p>
      <h1 className="mt-4 font-heading text-2xl text-maroon dark:text-cream">
        Page not found
      </h1>
      <p className="mt-2 text-maroon-deep/70 dark:text-cream/70">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-saffron px-6 py-2 text-sm font-medium text-maroon-deep transition hover:bg-saffron-light"
      >
        Back to Home
      </Link>
    </div>
  );
}
