import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/home/HeroCarousel";
import EmergencyService from "@/components/home/EmergencyService";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import CTASection from "@/components/home/CTASection";

interface HomeProps {
  openBookingCalendar: (service?: string) => void;
}

export default function Home({ openBookingCalendar }: HomeProps) {
  const emergencyRef = useRef<HTMLDivElement>(null);
  
  const scrollToEmergency = () => {
    emergencyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    // Check if URL includes #emergency hash
    if (window.location.hash === '#emergency') {
      setTimeout(() => {
        scrollToEmergency();
      }, 100);
    }
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar openEmergencyService={scrollToEmergency} />
      
      <main className="flex-grow">
        <HeroCarousel openBookingCalendar={openBookingCalendar} />
        
        <div ref={emergencyRef}>
          <EmergencyService />
        </div>
        
        <ServicesSection openBookingCalendar={openBookingCalendar} />
        <WhyChooseUsSection />
        <PricingSection openBookingCalendar={openBookingCalendar} />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
        <CTASection openBookingCalendar={openBookingCalendar} />
      </main>
      
      <Footer />
    </div>
  );
}
