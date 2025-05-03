import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import QuickPurchase from '@/components/QuickPurchase';

const Purchase: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <section className="bg-darkgray py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Online HVAC Purchase</h1>
            <p className="text-lightgray max-w-2xl mx-auto">
              Purchase your new furnace or air conditioning system directly online. 
              Select from our premium packages with transparent pricing and quick installation.
            </p>
          </div>
        </section>
        <QuickPurchase />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Purchase;