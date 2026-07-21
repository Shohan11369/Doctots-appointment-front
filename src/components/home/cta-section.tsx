import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const CtaSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="bg-gray-400 rounded-2xl p-12 text-center text-black flex flex-col items-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold  text-black tracking-tight max-w-xl">
            Ready to prioritize your health?
          </h2>
          <Button size="lg" variant="secondary" asChild className="px-8 shadow-lg">
            <Link href="/doctors">Book Your Appointment Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
