import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ContactForm from '@/components/ContactForm';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <section className="bg-darkgray py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Contact Us</h1>
            <p className="text-lightgray max-w-2xl mx-auto">
              Have questions or need assistance? Our team is ready to help with all your HVAC needs.
            </p>
          </div>
        </section>
        <ContactForm />
        <ServiceAreaMap />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Contact;