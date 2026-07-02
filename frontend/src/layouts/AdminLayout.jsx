import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/common/ScrollToTop.jsx';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-beige dark:bg-maroon-deep">
      <ScrollToTop />
      <Outlet />
    </div>
  );
}
