import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageCarousel from '@/components/ImageCarousel';
import BackToTop from '@/components/BackToTop';

// Gallery image data
const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1599619585752-c3edb42a414c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'High-efficiency furnace installation - AfterHours HVAC',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'Ductwork installation in residential home',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1581775231124-4f70b143b85c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'AC condenser unit installation',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1627903509738-6d868723ba0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'Thermostat installation and programming',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1580943943894-ea22268366cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'HVAC technician servicing equipment',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1591184510259-b6f1be3d7aff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'Air duct cleaning in progress',
  },
];

// Project showcase data
const projectShowcase = [
  {
    id: 1,
    title: 'High-Efficiency Furnace Upgrade',
    location: 'Calgary SW',
    description: 'Complete replacement of 20-year-old furnace with a new 96% AFUE two-stage model, featuring improved temperature control and significantly lower energy costs.',
    image: 'https://images.unsplash.com/photo-1599619585752-c3edb42a414c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    before: 'Noisy, inefficient 78% AFUE furnace with frequent breakdowns',
    after: 'Whisper-quiet operation, even heat ***REMOVED***ribution, 25% energy savings',
  },
  {
    id: 2,
    title: 'Whole-Home Air Conditioning',
    location: 'Airdrie, AB',
    description: 'New construction project featuring a complete HVAC system installation with high-SEER AC unit and zoned temperature control for maximum comfort.',
    image: 'https://images.unsplash.com/photo-1581775231124-4f70b143b85c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    before: 'No central air conditioning, reliance on window units',
    after: 'Efficient central AC with smart thermostat control and consistent cooling',
  },
  {
    id: 3,
    title: 'Smart Home HVAC Integration',
    location: 'Calgary NW',
    description: 'Complete upgrade of existing HVAC controls with smart technology, including zone control, mobile app management, and energy monitoring.',
    image: 'https://images.unsplash.com/photo-1627903509738-6d868723ba0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    before: 'Basic thermostat with limited programming and no remote access',
    after: 'Full smart control, occupancy sensing, and 18% reduction in energy usage',
  },
];

export default function Gallery() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-black relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black to-black/90 z-10" />
            <div className="absolute inset-0 bg-black opacity-80" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Our Work <span className="text-primary">Gallery</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Browse through our completed projects and see the AfterHours difference
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Image Carousel Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Recent Installations</h2>
            <div className="max-w-5xl mx-auto">
              <ImageCarousel images={galleryImages} />
            </div>
          </div>
        </section>
        
        {/* Project Showcase Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Featured Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectShowcase.map((project) => (
                <motion.div 
                  key={project.id}
                  className="bg-gray-900 rounded-lg overflow-hidden shadow-xl border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <span className="text-sm px-3 py-1 bg-primary text-white rounded-full">{project.location}</span>
                    </div>
                    
                    <p className="text-gray-400 mb-6">{project.description}</p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <span className="font-semibold text-red-500 mr-2">Before:</span>
                        <span className="text-gray-300">{project.before}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold text-green-500 mr-2">After:</span>
                        <span className="text-gray-300">{project.after}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <a 
                href="/booking" 
                className="inline-block bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
              >
                Schedule Your Project
              </a>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Home Comfort?
              </h2>
              <p className="text-xl text-gray-300 mb-10">
                Contact us today for a free consultation and join our growing list of satisfied customers
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="tel:+1234567890" 
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-lg transition duration-300"
                >
                  <i className="fas fa-phone mr-2"></i>
                  Call Now
                </a>
                <a 
                  href="/quote" 
                  className="inline-flex items-center justify-center bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                >
                  <i className="fas fa-calculator mr-2"></i>
                  Get a Quote
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
}
