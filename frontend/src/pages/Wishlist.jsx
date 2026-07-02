import { useWishlist } from '../context/WishlistContext.jsx';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-heading text-3xl text-maroon dark:text-cream">
        Your Wishlist
      </h1>
      <p className="mt-2 text-maroon-deep/70 dark:text-cream/70">
        {wishlist.length === 0
          ? 'No items saved yet.'
          : `${wishlist.length} item(s) saved.`}{' '}
        Full wishlist page coming soon.
      </p>
    </div>
  );
}
