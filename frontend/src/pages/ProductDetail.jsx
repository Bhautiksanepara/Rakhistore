import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { slug } = useParams();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-heading text-3xl text-maroon dark:text-cream">
        Product: {slug}
      </h1>
      <p className="mt-2 text-maroon-deep/70 dark:text-cream/70">
        Product detail page coming soon.
      </p>
    </div>
  );
}
