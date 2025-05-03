import { useRef, useState } from "react";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handlePrev = () => {
    if (!carouselRef.current) return;
    
    carouselRef.current.scrollBy({ 
      left: -300, 
      behavior: 'smooth' 
    });
    
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };
  
  const handleNext = () => {
    if (!carouselRef.current) return;
    
    carouselRef.current.scrollBy({ 
      left: 300, 
      behavior: 'smooth' 
    });
    
    setActiveIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : testimonials.length - 1));
  };
  
  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[#121212] mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Don't just take our word for it — hear from the Alberta homeowners who trust AfterHours HVAC.</p>
        </div>
        
        {/* Testimonial Carousel */}
        <div className="relative overflow-hidden">
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto carousel snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4"
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 carousel-item"
              >
                <div className="bg-gray-50 rounded-xl p-6 shadow-md h-full flex flex-col">
                  <div className="text-yellow-400 mb-3 flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 flex-grow italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                      <img 
                        src={testimonial.imageSrc} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Controls */}
          <button 
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 left-2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center text-[#121212] hover:bg-gray-100 transition"
            aria-label="Previous testimonial"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 right-2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center text-[#121212] hover:bg-gray-100 transition"
            aria-label="Next testimonial"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="https://www.google.com/maps" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#DC2626] font-bold hover:text-red-700 transition"
          >
            <span>See All 50+ 5-Star Reviews on Google</span>
            <i className="fas fa-external-link-alt ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
