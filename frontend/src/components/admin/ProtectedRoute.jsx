import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ProtectedRoute() {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream dark:bg-maroon-deep">
        <p className="text-sm text-maroon-deep/60 dark:text-cream/60">
          Loading…
        </p>
      </div>
    );
  }

  if (!admin) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
}
