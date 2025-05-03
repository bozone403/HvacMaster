import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Testimonial = {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'James Wilson',
    location: 'Lethbridge, AB',
    rating: 5,
    text: 'AfterHours HVAC saved us during a freezing winter night when our furnace stopped working. They arrived within 45 minutes and had everything fixed by midnight. Absolute lifesavers!'
  },
  {
    id: 2,
    name: 'Sarah Thompson',
    location: 'Calgary, AB',
    rating: 5,
    text: 'The team installed our new high-efficiency air conditioner and explained everything clearly. The installation was flawless, and they cleaned up perfectly afterward. Highly recommend!'
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    location: 'Coaldale, AB',
    rating: 5,
    text: 'We have been using their maintenance program for two years, and our HVAC system has never run better. Their technicians are always professional and take the time to answer all my questions.'
  },
  {
    id: 4,
    name: 'Jennifer Lee',
    location: 'Taber, AB',
    rating: 5,
    text: 'Unlike other companies that never showed up, AfterHours HVAC came exactly when promised and diagnosed our heating issue quickly. Fair pricing and excellent communication throughout.'
  },
  {
    id: 5,
    name: 'Robert Miller',
    location: 'Calgary, AB',
    rating: 5,
    text: 'I called at 9pm with a gas furnace issue during a cold snap. They were at my home by 10:15pm and had everything working again before midnight. Worth every penny for that peace of mind!'
  }
];

const TestimonialsSection = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const currentTestimonial = testimonials[currentTestimonialIndex];

  // Generate star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <i 
        key={index} 
        className={`fas fa-star ${index < rating ? 'text-yellow-400' : 'text-gray-500'}`}
      ></i>
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            What Our Customers Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it - see what homeowners across Alberta are saying about AfterHours HVAC
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial Controls */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button 
                onClick={prevTestimonial}
                className="bg-gray-900 hover:bg-gray-800 text-white rounded-full p-2 -ml-4 focus:outline-none shadow-lg z-10"
                aria-label="Previous testimonial"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
            </div>
            
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button 
                onClick={nextTestimonial}
                className="bg-gray-900 hover:bg-gray-800 text-white rounded-full p-2 -mr-4 focus:outline-none shadow-lg z-10"
                aria-label="Next testimonial"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            {/* Testimonial Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <div className="mb-6 flex justify-center">
                    {renderStars(currentTestimonial.rating)}
                  </div>
                  
                  <blockquote className="text-xl text-gray-300 text-center mb-6 italic">
                    "{currentTestimonial.text}"
                  </blockquote>
                  
                  <div className="flex flex-col items-center">
                    {currentTestimonial.image ? (
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                        <img 
                          src={currentTestimonial.image} 
                          alt={currentTestimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-3">
                        <span className="text-white text-xl font-bold">
                          {currentTestimonial.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="text-center">
                      <div className="font-bold text-white">{currentTestimonial.name}</div>
                      <div className="text-gray-500 text-sm">{currentTestimonial.location}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonialIndex(index)}
                className={`w-3 h-3 rounded-full focus:outline-none transition-colors duration-300 ${index === currentTestimonialIndex ? 'bg-primary' : 'bg-gray-700 hover:bg-gray-600'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-lg mb-4">
            Join our satisfied customers today
          </p>
          <div className="flex justify-center gap-3">
            <a 
              href="https://google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition duration-300"
            >
              <i className="fab fa-google text-xl"></i>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition duration-300"
            >
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a 
              href="https://yelp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition duration-300"
            >
              <i className="fab fa-yelp text-xl"></i>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;