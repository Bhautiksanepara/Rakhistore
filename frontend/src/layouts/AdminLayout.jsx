import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import AdminSidebar from '../components/admin/AdminSidebar.jsx';
import ScrollToTop from '../components/common/ScrollToTop.jsx';
import SEO from '../components/common/SEO.jsx';

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-beige/30 dark:bg-maroon-deep">
      <SEO title="Admin" noIndex />
      <ScrollToTop />

      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="relative">
            <AdminSidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-beige/60 bg-white px-4 py-3 dark:border-maroon/60 dark:bg-maroon md:hidden">
          <span className="font-heading text-lg text-maroon dark:text-cream">
            Rakhi Store Admin
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="text-maroon-deep dark:text-cream"
          >
            <Menu size={22} />
          </button>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
