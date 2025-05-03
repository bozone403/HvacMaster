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
    src: '/images/471495287_1105250150983520_1386073747227411333_n.jpg',
    alt: 'New furnace installation by AfterHours HVAC',
  },
  {
    id: 2,
    src: '/images/473328419_1117024396472762_1664679628641010003_n.jpg',
    alt: 'Completed ductwork installation in Calgary home',
  },
  {
    id: 3,
    src: '/images/474665667_1124835912358277_83973285220661963_n.jpg',
    alt: 'AC condenser unit installation by AfterHours HVAC',
  },
  {
    id: 4,
    src: '/images/472794268_1116016029906932_2148624852804770803_n.jpg',
    alt: 'Custom HVAC system installation in progress',
  },
  {
    id: 5,
    src: '/images/478388339_1139888574186344_8720464797129552041_n.jpg',
    alt: 'HVAC technician servicing equipment in Calgary',
  },
  {
    id: 6,
    src: '/images/479331527_1139888470853021_6780587306293107855_n.jpg',
    alt: 'High-efficiency furnace system installation',
  },
];

// Project showcase data
const projectShowcase = [
  {
    id: 1,
    title: 'High-Efficiency Furnace Upgrade',
    location: 'Calgary SW',
    description: 'Complete replacement of 20-year-old furnace with a new 96% AFUE two-stage model, featuring improved temperature control and significantly lower energy costs.',
    image: '/images/471495287_1105250150983520_1386073747227411333_n.jpg',
    before: 'Noisy, inefficient 78% AFUE furnace with frequent breakdowns',
    after: 'Whisper-quiet operation, even heat distribution, 25% energy savings',
  },
  {
    id: 2,
    title: 'Whole-Home Air Conditioning',
    location: 'Airdrie, AB',
    description: 'New construction project featuring a complete HVAC system installation with high-SEER AC unit and zoned temperature control for maximum comfort.',
    image: '/images/474665667_1124835912358277_83973285220661963_n.jpg',
    before: 'No central air conditioning, reliance on window units',
    after: 'Efficient central AC with smart thermostat control and consistent cooling',
  },
  {
    id: 3,
    title: 'Smart Home HVAC Integration',
    location: 'Calgary NW',
    description: 'Complete upgrade of existing HVAC controls with smart technology, including zone control, mobile app management, and energy monitoring.',
    image: '/images/473080806_1117022926472909_3203550033440273916_n.jpg',
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
                  href="tel:+14036136014" 
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-lg transition duration-300"
                >
                  <i className="fas fa-phone mr-2"></i>
                  (403) 613-6014
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
