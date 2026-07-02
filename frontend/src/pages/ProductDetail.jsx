import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/common/SEO.jsx';
import { useProduct } from '../hooks/useProduct.js';
import { useRelatedProducts } from '../hooks/useRelatedProducts.js';
import ProductGallery from '../components/product/ProductGallery.jsx';
import WhatsAppButton from '../components/product/WhatsAppButton.jsx';
import WishlistButton from '../components/product/WishlistButton.jsx';
import ShareButtons from '../components/product/ShareButtons.jsx';
import RelatedProducts from '../components/product/RelatedProducts.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import { useRecentlyViewed } from '../context/RecentlyViewedContext.jsx';

export default function ProductDetail() {
  const { slug } = useParams();
  const { product, loading } = useProduct(slug);
  const { products: related, loading: relatedLoading } = useRelatedProducts(
    product?._id
  );
  const { recordView } = useRecentlyViewed();

  useEffect(() => {
    if (product?._id) recordView(product._id);
  }, [product?._id, recordView]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-2xl bg-beige/60 dark:bg-maroon/60" />
          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-beige/60 dark:bg-maroon/60" />
            <div className="h-8 w-2/3 animate-pulse rounded bg-beige/60 dark:bg-maroon/60" />
            <div className="h-6 w-32 animate-pulse rounded bg-beige/60 dark:bg-maroon/60" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="font-heading text-2xl text-maroon dark:text-cream">
          Product not found
        </h1>
        <Link
          to="/shop"
          className="mt-4 inline-block text-saffron-text hover:underline dark:text-saffron"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const hasDiscount = product.originalPrice > product.price;
  const discount = hasDiscount
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) *
          100
      )
    : null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: product.images?.map((img) => img.url),
    category: product.category?.name,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      availability: product.availability
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SEO
        title={product.name}
        description={
          product.description ||
          `${product.name} — premium Rakhi available at Rakhi Store.`
        }
        image={product.images?.[0]?.url}
        structuredData={structuredData}
      />
      <nav
        aria-label="Breadcrumb"
        className="mb-6 text-sm text-maroon-deep/50 dark:text-cream/50"
      >
        <Link to="/" className="hover:text-saffron-text dark:hover:text-saffron">
          Home
        </Link>{' '}
        /{' '}
        <Link to="/shop" className="hover:text-saffron-text dark:hover:text-saffron">
          Shop
        </Link>{' '}
        / <span>{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <ProductGallery images={product.images} productName={product.name} />

        <div>
          <p className="text-sm text-maroon-deep/50 dark:text-cream/50">
            {product.category?.name}
          </p>
          <h1 className="mt-1 font-heading text-3xl text-maroon dark:text-cream">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-semibold text-maroon dark:text-saffron">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-maroon-deep/40 line-through dark:text-cream/40">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="rounded-full bg-saffron px-2 py-0.5 text-xs font-semibold text-maroon-deep">
                  {discount}% off
                </span>
              </>
            )}
          </div>

          <p className="mt-2 text-sm">
            {product.availability ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </p>

          {product.description && (
            <p className="mt-6 text-maroon-deep/70 dark:text-cream/70">
              {product.description}
            </p>
          )}

          {product.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-beige px-3 py-1 text-xs text-maroon-deep dark:bg-maroon dark:text-cream"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton product={product} />
            <WishlistButton productId={product._id} />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm text-maroon-deep/50 dark:text-cream/50">
              Share:
            </span>
            <ShareButtons
              productName={product.name}
              url={window.location.href}
            />
          </div>
        </div>
      </div>

      <RelatedProducts products={related} loading={relatedLoading} />
    </div>
  );
}
