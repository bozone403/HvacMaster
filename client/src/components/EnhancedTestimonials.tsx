import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

type Testimonial = {
  id: string;
  name: string;
  location: string;
  date: string;
  system: string;
  benefit: string;
  text: string;
  image: string;
  rating: number;
  verifiedPurchase?: boolean;
  savings?: string;
};

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Mark Thompson',
    location: 'Calgary, AB',
    date: 'January 2024',
    system: 'High-Efficiency Furnace & AC',
    benefit: 'Reduced monthly bills by 37%',
    text: 'After our first winter with the new heating system, I was shocked at how much we saved on our gas bill. The installation team was professional and finished in one day. The house stays at a consistent temperature, and we no longer have the cold spots we experienced with our old furnace.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop',
    rating: 5,
    verifiedPurchase: true,
    savings: '$127/month'
  },
  {
    id: '2',
    name: 'Sarah & David Miller',
    location: 'Edmonton, AB',
    date: 'August 2023',
    system: 'Premium AC System',
    benefit: 'Home cools evenly during heat waves',
    text: 'Last summer was unbearable with our old AC struggling to keep up. AfterHours HVAC installed a new system just before this year\'s heat wave, and what a difference! Our home stays perfectly cool even on 30°C days, and it\'s whisper quiet compared to our old unit. The energy efficiency has been incredible too.',
    image: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=200&h=200&fit=crop',
    rating: 5,
    verifiedPurchase: true,
    savings: '$95/month in summer'
  },
  {
    id: '3',
    name: 'Robert Chen',
    location: 'Airdrie, AB',
    date: 'December 2023',
    system: 'Whole Home Comfort System',
    benefit: 'Perfect temperature year-round',
    text: 'After researching several HVAC companies, I chose AfterHours because of their expertise and fair pricing. They installed a complete system with smart controls that I can manage from my phone. Even during the -30°C cold snap, our house stayed perfectly warm, and the air quality has improved significantly with the new filtration system.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop',
    rating: 5,
    verifiedPurchase: true,
    savings: '$1,450 annually'
  }
];

export default function EnhancedTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (autoplay) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [autoplay]);

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Real Customer Results</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. See how we've helped Alberta homeowners solve their HVAC problems and save money.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <motion.div 
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-800"
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
            >
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Left - Customer Image */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                  <img 
                    src={current.image} 
                    alt={current.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 p-6 z-20">
                    <div className="flex space-x-1 mb-2">
                      {[...Array(current.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    
                    {current.verifiedPurchase && (
                      <div className="flex items-center mb-2">
                        <div className="mr-2 bg-green-800/30 px-2 py-0.5 rounded text-green-400 text-xs font-semibold border border-green-700/30">
                          ✓ Verified Purchase
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Right - Testimonial Content */}
                <div className="col-span-2 p-8">
                  <div className="flex items-start mb-6">
                    <Quote className="h-8 w-8 text-primary/70 mr-3 flex-shrink-0" />
                    <p className="text-gray-300 italic">{current.text}</p>
                  </div>
                  
                  <div className="mt-8">
                    <div className="flex flex-wrap items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{current.name}</h3>
                        <p className="text-gray-400">{current.location} • {current.date}</p>
                      </div>
                      
                      <div className="mt-4 md:mt-0">
                        <div className="bg-gray-800 rounded-lg px-4 py-2">
                          <p className="text-sm text-gray-400">System Installed</p>
                          <p className="text-white font-medium">{current.system}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 border-t border-gray-800 pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="flex items-center">
                            <div className="p-2 bg-green-900/30 rounded-full mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-gray-400 text-xs">Primary Benefit</p>
                              <p className="text-white font-medium">{current.benefit}</p>
                            </div>
                          </div>
                        </div>
                        
                        {current.savings && (
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="flex items-center">
                              <div className="p-2 bg-blue-900/30 rounded-full mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-gray-400 text-xs">Cost Savings</p>
                                <p className="text-white font-medium">{current.savings}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setAutoplay(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-8' : 'bg-gray-700'}`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
