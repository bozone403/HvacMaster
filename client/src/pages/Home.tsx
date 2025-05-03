import { useState, useRef } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmergencyHero from "@/components/EmergencyHero";
import EmergencyForm from "@/components/EmergencyForm";
import ServiceHighlights from "@/components/ServiceHighlights";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import BackToTop from "@/components/BackToTop";

interface HomeProps {
  openBookingCalendar?: (service?: string) => void;
}

export default function Home({ openBookingCalendar }: HomeProps) {
  // Service data
  const services = [
    {
      id: "furnace",
      title: "Furnace Services",
      description: "Professional furnace installation, repair and maintenance for all makes and models.",
      icon: "fa-fire",
      price: "Starting at $179.99",
      priceLabel: "Maintenance"
    },
    {
      id: "ac",
      title: "Air Conditioning",
      description: "Expert AC installation, repair and maintenance for comfortable cooling year-round.",
      icon: "fa-snowflake",
      price: "Starting at $189.99",
      priceLabel: "Maintenance"
    },
    {
      id: "emergency",
      title: "Emergency Service",
      description: "24/7 emergency HVAC service when you need it most - we are always available.",
      icon: "fa-exclamation-triangle",
      price: "From $249",
      priceLabel: "After Hours"
    },
    {
      id: "maintenance",
      title: "Maintenance Plans",
      description: "Preventative maintenance programs to keep your systems running efficiently.",
      icon: "fa-tools",
      price: "$275/year",
      priceLabel: "Bronze Plan"
    },
    {
      id: "installation",
      title: "New Installations",
      description: "Professional installation of high-efficiency furnaces and air conditioners.",
      icon: "fa-home",
      price: "From $5,999",
      priceLabel: "Basic Furnace"
    },
    {
      id: "commercial",
      title: "Commercial HVAC",
      description: "Specialized commercial HVAC solutions for businesses of all sizes.",
      icon: "fa-building",
      price: "Custom Quote",
      priceLabel: "Business Rates"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <EmergencyHero />
        
        {/* Emergency Form Section */}
        <section className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need Emergency Service Now?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Fill out this form and our team will contact you within 15 minutes, or call our emergency line directly.
              </p>
            </div>
            
            <div className="max-w-xl mx-auto">
              <EmergencyForm />
              
              <div className="text-center mt-6">
                <p className="text-gray-400 mb-2">Or call our 24/7 emergency line</p>
                <a 
                  href="tel:+14036136014" 
                  className="text-primary text-2xl font-bold hover:text-red-500 transition duration-300"
                >
                  (403) 613-6014
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="bg-black py-16" id="services">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our <span className="text-primary">Services</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Professional HVAC services delivered by Alberta's most responsive team. 
                We specialize in all aspects of heating, cooling, and ventilation.
              </p>
            </div>
            
            <ServiceHighlights services={services} />
            
            <div className="text-center mt-12">
              <Link href="/booking">
                <button className="bg-primary hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none">
                  Book a Service
                </button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <WhyChooseUs />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Call to Action Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready for Professional HVAC Service?
            </h2>
            <p className="text-white mb-8 max-w-2xl mx-auto">
              Experience the AfterHours HVAC difference. We're available when others aren't, 
              and we deliver quality that exceeds expectations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/booking">
                <button className="bg-white hover:bg-gray-100 text-primary font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none">
                  Book a Service
                </button>
              </Link>
              <Link href="/quote">
                <button className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none mr-4">
                  Get a Free Quote
                </button>
              </Link>
              <Link href="/referral">
                <button className="mt-4 sm:mt-0 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none">
                  Referral Program & Discounts
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
}
