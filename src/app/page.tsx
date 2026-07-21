import { CtaSection } from '@/components/home/cta-section';
import { FeaturedDoctors } from '@/components/home/featured-doctors';
import { HeroSection } from '@/components/home/hero-section';
import { HowItWorks } from '@/components/home/how-it-works';
import { Specializations } from '@/components/home/specializations';
import { StatsSection } from '@/components/home/stats-section';
import { Testimonials } from '@/components/home/testimonials';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <StatsSection />
      <Specializations />
      <FeaturedDoctors />
      <HowItWorks />
      <Testimonials />
      <CtaSection />
    </div>
  );
}
