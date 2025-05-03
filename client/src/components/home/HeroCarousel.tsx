import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface HeroCarouselProps {
  openBookingCalendar: () => void;
}

const carouselImages = [
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1585155967849-aee9a56a8cf0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
];

export default function HeroCarousel({ openBookingCalendar }: HeroCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const goToNextImage = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };
  
  useEffect(() => {
    const interval = setInterval(goToNextImage, 5000);
    
    return () => {
      clearInterval(interval);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [isTransitioning]);
  
  return (
    <section className="relative bg-[#121212] overflow-hidden" style={{ height: "80vh" }}>
      {/* Carousel */}
      <div className="relative h-full overflow-hidden">
        {/* Current Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ 
            backgroundImage: `url('${carouselImages[currentImageIndex]}')`,
            opacity: isTransitioning ? 0.3 : 0.8
          }}
        />
        
        {/* Next Image (pre-loaded) */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ 
            backgroundImage: `url('${carouselImages[(currentImageIndex + 1) % carouselImages.length]}')`,
            opacity: isTransitioning ? 0.8 : 0,
            zIndex: isTransitioning ? 1 : 0
          }}
        />
        
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
              When Everyone Else Closes,<br/>
              <span className="text-[#DC2626]">We Keep the Heat On.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-medium">
              Alberta's elite HVAC service provider, delivering expert-level heating, cooling, and ventilation solutions with unmatched precision — even when the other guys call it a day.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
              <a 
                href="#emergency" 
                className="emergency-pulse bg-[#DC2626] hover:bg-red-700 text-white font-bold py-4 px-8 rounded-md text-lg shadow-lg transition flex items-center justify-center space-x-2"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById('emergency');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <i className="fas fa-bolt"></i>
                <span>Emergency Service 24/7</span>
              </a>
              <a 
                href="#services" 
                className="bg-white hover:bg-gray-100 text-[#121212] font-bold py-4 px-8 rounded-md text-lg shadow-lg transition"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById('services');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Our Services
              </a>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
                <p className="text-xl font-bold">500+</p>
                <p className="text-sm">Emergency Calls Answered</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
                <p className="text-xl font-bold">100%</p>
                <p className="text-sm">Code-Compliant Installs</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
                <p className="text-xl font-bold">24/7</p>
                <p className="text-sm">After-Hours Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentImageIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
            )}
            onClick={() => {
              if (isTransitioning) return;
              setIsTransitioning(true);
              setCurrentImageIndex(index);
              if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
              }
              transitionTimeoutRef.current = setTimeout(() => {
                setIsTransitioning(false);
              }, 500);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
