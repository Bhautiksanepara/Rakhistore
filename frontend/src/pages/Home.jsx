import Hero from '../components/home/Hero.jsx';
import ProductShowcase from '../components/home/ProductShowcase.jsx';
import CategoryShowcase from '../components/home/CategoryShowcase.jsx';
import RecentlyViewedSection from '../components/home/RecentlyViewedSection.jsx';
import WhyChooseUs from '../components/home/WhyChooseUs.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import FAQPreview from '../components/home/FAQPreview.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <ProductShowcase
        title="Featured Rakhis"
        subtitle="Our most loved picks this season"
        params={{ featured: true, limit: 4 }}
      />
      <CategoryShowcase />
      <ProductShowcase
        title="New Arrivals"
        subtitle="Freshly added to the collection"
        params={{ newArrival: true, limit: 4 }}
        viewAllHref="/shop?newArrival=true"
      />
      <RecentlyViewedSection />
      <WhyChooseUs />
      <Testimonials />
      <FAQPreview />
    </>
  );
}
