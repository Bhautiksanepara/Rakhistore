import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import ScrollToTop from '../components/common/ScrollToTop.jsx';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream text-maroon-deep dark:bg-maroon-deep dark:text-cream">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
