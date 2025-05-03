import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import PricingSection from '@/components/PricingSection';
import CtaSection from '@/components/CtaSection';

const Pricing: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <section className="bg-darkgray py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Transparent HVAC Pricing</h1>
            <p className="text-lightgray max-w-2xl mx-auto">
              View our competitive and transparent pricing for premium HVAC systems that meet or exceed all Alberta code requirements.
            </p>
          </div>
        </section>
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Pricing;