import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LayoutDashboard, Package, Tags, LogOut, Gift } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const LINKS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: Tags },
];

export default function AdminSidebar({ onNavigate = undefined }) {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-beige/60 bg-white dark:border-maroon/60 dark:bg-maroon">
      <div className="flex items-center gap-2 px-6 py-5">
        <Gift className="text-saffron" size={24} aria-hidden="true" />
        <span className="font-heading text-lg text-maroon dark:text-cream">
          Rakhi Store
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-saffron/10 text-saffron-text dark:text-saffron'
                  : 'text-maroon-deep hover:bg-beige/60 dark:text-cream dark:hover:bg-maroon-deep/60'
              }`
            }
          >
            <Icon size={18} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-beige/60 p-3 dark:border-maroon-deep/60">
        <p className="truncate px-3 text-xs text-maroon-deep/50 dark:text-cream/50">
          {admin?.email}
        </p>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-maroon-deep transition hover:bg-beige/60 dark:text-cream dark:hover:bg-maroon-deep/60"
        >
          <LogOut size={18} aria-hidden="true" />
          Logout
        </button>
      </div>
    </aside>
  );
}

AdminSidebar.propTypes = {
  onNavigate: PropTypes.func,
};
