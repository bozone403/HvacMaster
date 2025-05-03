import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import TeamSection from '@/components/TeamSection';
import OwnerProfile from '@/components/OwnerProfile';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <section className="bg-darkgray py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">About AfterHours HVAC</h1>
            <p className="text-lightgray max-w-2xl mx-auto">
              Meet our team of HVAC professionals dedicated to bringing you the best heating and cooling solutions throughout Calgary and surrounding areas.
            </p>
          </div>
        </section>
        <OwnerProfile />
        <WhyChooseUs />
        <TeamSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default About;