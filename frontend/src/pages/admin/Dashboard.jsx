import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Dashboard() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="p-8">
      <h1 className="font-heading text-2xl text-maroon dark:text-cream">
        Welcome, {admin?.name}
      </h1>
      <p className="mt-1 text-sm text-maroon-deep/60 dark:text-cream/60">
        Full dashboard with stats and product management coming soon.
      </p>
      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 rounded-lg bg-maroon px-4 py-2 text-sm text-white transition hover:bg-maroon-deep"
      >
        Logout
      </button>
    </div>
  );
}
