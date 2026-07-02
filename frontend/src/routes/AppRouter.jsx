import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import ProtectedRoute from '../components/admin/ProtectedRoute.jsx';

const Home = lazy(() => import('../pages/Home.jsx'));
const Shop = lazy(() => import('../pages/Shop.jsx'));
const ProductDetail = lazy(() => import('../pages/ProductDetail.jsx'));
const Wishlist = lazy(() => import('../pages/Wishlist.jsx'));
const About = lazy(() => import('../pages/About.jsx'));
const Contact = lazy(() => import('../pages/Contact.jsx'));
const FAQ = lazy(() => import('../pages/FAQ.jsx'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy.jsx'));
const Terms = lazy(() => import('../pages/Terms.jsx'));
const ReturnPolicy = lazy(() => import('../pages/ReturnPolicy.jsx'));
const NotFound = lazy(() => import('../pages/NotFound.jsx'));

const AdminLogin = lazy(() => import('../pages/admin/Login.jsx'));
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard.jsx'));
const AdminProducts = lazy(() => import('../pages/admin/Products.jsx'));
const AdminProductForm = lazy(() => import('../pages/admin/ProductForm.jsx'));
const AdminCategories = lazy(() => import('../pages/admin/Categories.jsx'));

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream dark:bg-maroon-deep">
      <p className="text-sm text-maroon-deep/60 dark:text-cream/60">
        Loading…
      </p>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route
              path="/admin/products/new"
              element={<AdminProductForm />}
            />
            <Route
              path="/admin/products/:id/edit"
              element={<AdminProductForm />}
            />
            <Route path="/admin/categories" element={<AdminCategories />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
