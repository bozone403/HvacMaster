import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type BeforeAfterImage = {
  id: string;
  title: string;
  before: string;
  after: string;
  description: string;
  savingsText?: string;
};

const transformationCases: BeforeAfterImage[] = [
  {
    id: '1',
    title: 'Outdated Furnace Replacement',
    before: '/images/471426275_1105250467650155_751799492974306867_n.jpg',
    after: '/images/471495287_1105250150983520_1386073747227411333_n.jpg',
    description: 'This Calgary family was dealing with cold spots and high energy bills due to an inefficient 15-year-old furnace. We installed a high-efficiency modulating system.',
    savingsText: 'Reduced heating costs by 32%'
  },
  {
    id: '2',
    title: 'Inefficient AC Upgrade',
    before: '/images/474154540_1123772532464615_2768856845004807639_n.jpg',
    after: '/images/474665667_1124835912358277_83973285220661963_n.jpg',
    description: 'This home had an outdated 10 SEER air conditioner that struggled during summer heat waves. We installed a modern 18 SEER system with smart controls.',
    savingsText: 'Cooling costs reduced by 45%'
  },
  {
    id: '3',
    title: 'Complete HVAC Transformation',
    before: '/images/472761308_1116569543184914_2305615839065844388_n.jpg',
    after: '/images/478388339_1139888574186344_8720464797129552041_n.jpg',
    description: 'This Edmonton residence had outdated, inefficient HVAC equipment that failed during extreme weather. We installed a complete high-efficiency system.',
    savingsText: 'Annual energy savings of $1,250'
  }
];

export default function BeforeAfterGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComparing, setIsComparing] = useState(false);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === transformationCases.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? transformationCases.length - 1 : prevIndex - 1
    );
  };
  
  const currentCase = transformationCases[currentIndex];
  
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
          <h2 className="text-3xl font-bold text-white mb-2">Real Results: Before & After</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See how our HVAC solutions transformed these homes from uncomfortable to perfectly climate-controlled while saving money.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/70 text-white p-2 rounded-full z-10 hover:bg-black/90"
              aria-label="Previous case"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 text-white p-2 rounded-full z-10 hover:bg-black/90"
              aria-label="Next case"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Image Comparison Container */}
            <div 
              className="relative w-full aspect-video cursor-pointer"
              onMouseEnter={() => setIsComparing(true)}
              onMouseLeave={() => setIsComparing(false)}
              onTouchStart={() => setIsComparing(true)}
              onTouchEnd={() => setIsComparing(false)}
            >
              {/* Before Image (Full Width) */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={currentCase.before} 
                  alt={`Before: ${currentCase.title}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  BEFORE
                </div>
              </div>
              
              {/* After Image (Overlay) */}
              <div 
                className={`absolute inset-0 h-full transition-all duration-300 ease-in-out ${isComparing ? 'w-1/2' : 'w-0'}`}
                style={{ borderRight: '3px solid white' }}
              >
                <div className="relative w-[200%] h-full overflow-hidden">
                  <img 
                    src={currentCase.after} 
                    alt={`After: ${currentCase.title}`} 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    AFTER
                  </div>
                </div>
              </div>
              
              {/* Comparison Hint */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap pointer-events-none">
                {isComparing ? 'Release to reset' : 'Click and hold to compare'}
              </div>
            </div>
            
            {/* Case Information */}
            <div className="p-6 bg-gray-900">
              <h3 className="text-xl font-bold text-white mb-2">{currentCase.title}</h3>
              <p className="text-gray-400 mb-4">{currentCase.description}</p>
              
              {currentCase.savingsText && (
                <div className="bg-green-900/30 border border-green-700/30 rounded-lg p-3 inline-block">
                  <div className="flex items-center">
                    <div className="mr-3 text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <span className="text-green-500 font-semibold">{currentCase.savingsText}</span>
                  </div>
                </div>
              )}
              
              {/* Navigation Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {transformationCases.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-gray-700'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
