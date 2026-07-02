import SEO from '../components/common/SEO.jsx';
import Hero from '../components/home/Hero.jsx';
import ProductShowcase from '../components/home/ProductShowcase.jsx';
import CategoryShowcase from '../components/home/CategoryShowcase.jsx';
import RecentlyViewedSection from '../components/home/RecentlyViewedSection.jsx';
import WhyChooseUs from '../components/home/WhyChooseUs.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import FAQPreview from '../components/home/FAQPreview.jsx';

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'OnlineStore',
  name: 'Rakhi Store',
  description:
    'Premium, handpicked Rakhis for Raksha Bandhan — browse the collection and order instantly on WhatsApp.',
  url: typeof window !== 'undefined' ? window.location.origin : undefined,
};

export default function Home() {
  return (
    <>
      <SEO
        description="Handpicked, premium Rakhis for Raksha Bandhan. Browse the collection and order instantly on WhatsApp — no accounts, no checkout."
        structuredData={STRUCTURED_DATA}
      />
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
