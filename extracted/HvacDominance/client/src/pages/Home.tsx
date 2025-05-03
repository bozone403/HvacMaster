import React from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmergencyHero from '@/components/EmergencyHero';
import EmergencyForm from '@/components/EmergencyForm';
import ServiceHighlights from '@/components/ServiceHighlights';
import TestimonialsSection from '@/components/TestimonialsSection';
import ImageCarousel from '@/components/ImageCarousel';
import WhyChooseUs from '@/components/WhyChooseUs';
import ReferralProgram from '@/components/ReferralProgram';
import BackToTop from '@/components/BackToTop';

// Import service images 
import furnaceImg from '@assets/475763078_1133188581523010_3495680572806769540_n.jpg';
import acImg from '@assets/475770561_1133188698189665_2585899269754271329_n.jpg';
import emergencyImg from '@assets/475771512_1133188988189636_6401281412215625464_n.jpg';
import maintenanceImg from '@assets/475772735_1133188828189652_372679368187531477_n.jpg';
import installImg from '@assets/475774175_1133188821522986_269924575679222180_n.jpg';
import commercialImg from '@assets/484096665_1163158445192690_8075246581175071232_n.jpg';

const Home: React.FC = () => {
  // Service cards data
  const services = [
    {
      id: 'furnace',
      title: 'Furnace Services',
      description: 'Professional furnace installation, repair and maintenance for all makes and models.',
      icon: 'fa-fire',
      image: furnaceImg,
      price: 'Starting at $99',
      priceLabel: 'Maintenance'
    },
    {
      id: 'ac',
      title: 'Air Conditioning',
      description: 'Expert AC installation, repair and maintenance for comfortable cooling year-round.',
      icon: 'fa-snowflake',
      image: acImg,
      price: 'Starting at $99',
      priceLabel: 'Maintenance'
    },
    {
      id: 'emergency',
      title: 'Emergency Service',
      description: '24/7 emergency HVAC service when you need it most - we are always available.',
      icon: 'fa-exclamation-triangle',
      image: emergencyImg,
      price: 'From $149',
      priceLabel: 'After Hours'
    },
    {
      id: 'maintenance',
      title: 'Maintenance Plans',
      description: 'Preventative maintenance programs to keep your systems running efficiently.',
      icon: 'fa-tools',
      image: maintenanceImg,
      price: '$180/year',
      priceLabel: 'Basic Plan'
    },
    {
      id: 'installation',
      title: 'New Installations',
      description: 'Professional installation of high-efficiency furnaces and air conditioners.',
      icon: 'fa-home',
      image: installImg,
      price: 'From $4,299',
      priceLabel: 'Basic Furnace'
    },
    {
      id: 'commercial',
      title: 'Commercial HVAC',
      description: 'Specialized commercial HVAC solutions for businesses of all sizes.',
      icon: 'fa-building',
      image: commercialImg,
      price: 'Custom Quote',
      priceLabel: 'Business Rates'
    }
  ];

  // Recent work photos for mini carousel
  const recentWorkPhotos = [
    { id: 1, src: furnaceImg, alt: 'Recent Furnace Installation' },
    { id: 2, src: acImg, alt: 'AC Service Call' },
    { id: 3, src: maintenanceImg, alt: 'Maintenance Visit' },
    { id: 4, src: installImg, alt: 'New System Installation' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        {/* Emergency Hero Section with Immediate Assistance */}
        <EmergencyHero />
        
        {/* Emergency Form */}
        <section className="bg-darkerGray py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
                Need Emergency Service Now?
              </h2>
              <EmergencyForm />
              <div className="text-center mt-4">
                <p className="text-light">Or call our 24/7 emergency line</p>
                <a href="tel:+14036136014" className="text-primary text-xl font-bold hover:text-primaryDark transition">
                  (403) 613-6014
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Carousel */}
        <section className="bg-darkgray py-12" id="services">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-lightgray max-w-2xl mx-auto">
                Professional HVAC services delivered by Alberta's most responsive team.
                All services require online booking and payment.
              </p>
            </div>
            
            <ServiceHighlights services={services} />
            
            <div className="text-center mt-10">
              <Link href="/booking">
                <button className="bg-primary hover:bg-primaryDark text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primaryDark">
                  Book a Service
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Highlights */}
        <WhyChooseUs />

        {/* Recent Work Mini Gallery */}
        <section className="bg-darkgray py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Projects</h2>
              <p className="text-lightgray max-w-2xl mx-auto">
                Take a look at some of our recent work
              </p>
            </div>
            
            <ImageCarousel images={recentWorkPhotos} />
            
            <div className="text-center mt-8">
              <Link href="/gallery">
                <button className="bg-primary hover:bg-primaryDark text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primaryDark">
                  View Full Gallery
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Preview */}
        <TestimonialsSection />
        
        {/* Referral Program */}
        <ReferralProgram />

        {/* Call to Action */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-white mb-8 max-w-2xl mx-auto">
              All of our services require online booking and payment. 
              Book now and experience AfterHours HVAC's premium service.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/booking">
                <button className="bg-darkgray hover:bg-darkerGray text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-darkgray">
                  Book a Service
                </button>
              </Link>
              <Link href="/quote">
                <button className="bg-white hover:bg-lightgray text-primary font-bold py-3 px-8 rounded-full transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white">
                  Get a Quote
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
};

export default Home;