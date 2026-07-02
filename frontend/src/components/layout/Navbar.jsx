import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, Menu, X, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../common/ThemeToggle.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { wishlist } = useWishlist();

  return (
    <header className="sticky top-0 z-50 border-b border-beige/60 bg-cream/80 backdrop-blur-md dark:border-maroon/60 dark:bg-maroon-deep/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 font-heading text-xl text-maroon dark:text-cream"
        >
          <Gift className="text-saffron" size={24} aria-hidden="true" />
          Rakhi Store
        </NavLink>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition hover:text-saffron-text dark:hover:text-saffron ${
                    isActive
                      ? 'text-saffron-text dark:text-saffron'
                      : 'text-maroon-deep dark:text-cream'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <NavLink
            to="/wishlist"
            aria-label="Wishlist"
            className="relative rounded-full p-2 text-maroon transition hover:bg-saffron/10 dark:text-cream dark:hover:bg-cream/10"
          >
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-saffron text-[10px] font-semibold text-maroon-deep">
                {wishlist.length}
              </span>
            )}
          </NavLink>
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-full p-2 text-maroon transition hover:bg-saffron/10 dark:text-cream dark:hover:bg-cream/10 md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-beige/60 bg-cream px-6 dark:border-maroon/60 dark:bg-maroon-deep md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <li
                key={link.to}
                className="border-b border-beige/40 py-3 last:border-none dark:border-maroon/40"
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block text-sm font-medium ${
                      isActive
                        ? 'text-saffron-text dark:text-saffron'
                        : 'text-maroon-deep dark:text-cream'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
