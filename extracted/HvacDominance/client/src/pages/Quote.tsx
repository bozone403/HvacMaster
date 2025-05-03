import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import QuoteCalculator from '@/components/QuoteCalculator';

const Quote: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <section className="bg-darkgray py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Instant HVAC Quote Calculator</h1>
            <p className="text-lightgray max-w-2xl mx-auto">
              Get an accurate estimate for your HVAC installation or service in seconds. Our calculator provides transparent pricing based on your specific needs.
            </p>
          </div>
        </section>
        <QuoteCalculator />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Quote;