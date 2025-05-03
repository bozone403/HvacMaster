import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ServiceBooking from '@/components/ServiceBooking';

const Booking: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <section className="bg-darkgray py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Schedule Your HVAC Service</h1>
            <p className="text-lightgray max-w-2xl mx-auto">
              Book your installation, maintenance, or repair service with our convenient online scheduler.
            </p>
          </div>
        </section>
        <ServiceBooking />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Booking;