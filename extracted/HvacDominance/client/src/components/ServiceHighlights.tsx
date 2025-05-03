import React, { useState } from 'react';
import { Link } from 'wouter';
import useEmblaCarousel from 'embla-carousel-react';
interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  price?: string;
  priceLabel?: string;
}

interface ServiceHighlightsProps {
  services?: ServiceCard[];
}

const defaultServiceCards: ServiceCard[] = [
  {
    id: 'furnace',
    title: 'Premium Furnace Installation',
    description: 'Experience industry-leading 97%+ AFUE systems that slash heating bills by up to 40%. Our master-level installations exceed all building codes with lifetime craftsmanship guarantee. Whisper-quiet operation with perfect temperature distribution.',
    icon: 'fa-fire-alt',
    image: 'https://images.unsplash.com/photo-1503575240752-d2d1a4be4031?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: '$6,999',
    priceLabel: 'Systems from'
  },
  {
    id: 'ac',
    title: 'Elite AC Installation',
    description: 'Ultra-efficient SEER2-18+ cooling systems deliver precision comfort while dramatically reducing energy costs. Our exclusive installation protocol guarantees perfect performance and industry-leading 15-year compressor protection.',
    icon: 'fa-snowflake',
    image: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: '$7,499',
    priceLabel: 'Systems from'
  },
  {
    id: 'boiler',
    title: 'Luxury Hydronic Heating',
    description: "Experience the gold standard in radiant comfort with our signature hydronic systems. Engineered specifically for Western Canada's extreme conditions with up to 96% efficiency rating. Includes industry-exclusive extended parts warranty.",
    icon: 'fa-temperature-high',
    image: 'https://images.unsplash.com/photo-1524647429215-60ce0b616bed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: '$9,499',
    priceLabel: 'Signature systems from'
  },
  {
    id: 'commercial',
    title: 'Commercial Sheet Metal Mastery',
    description: 'Precision-engineered ductwork and commercial systems from Alberta\'s most respected fabrication team. Our sheet metal delivers superior airflow dynamics, minimal pressure drop, and exceptional durability for demanding applications.',
    icon: 'fa-industry',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    priceLabel: 'Enterprise Solutions'
  },
  {
    id: 'roughin',
    title: 'New Construction Excellence',
    description: 'Future-proof your property with our award-winning new construction installations. Our custom rough-in service includes comprehensive energy modeling, premium materials, and meticulous attention to detail that builders consistently choose for luxury homes.',
    icon: 'fa-home',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    priceLabel: 'Premium Quote'
  },
  {
    id: 'ductwork',
    title: 'Advanced Air Distribution',
    description: 'Transform your existing system with our signature ductwork optimization. Using aerospace-inspired flow dynamics, we eliminate hot/cold spots, reduce noise by up to 50%, and maximize system efficiency for whole-home perfect comfort.',
    icon: 'fa-wind',
    image: 'https://images.unsplash.com/photo-1621155346394-7a4a67ba2220?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    priceLabel: 'Master Craftsmanship'
  },
  {
    id: 'airquality',
    title: 'Hospital-Grade Air Purification',
    description: 'Protect your family with our comprehensive air quality solutions featuring medical-grade MERV-13+ filtration, germicidal UV-C technology, and intelligent humidity control. Clinically proven to reduce allergens, viruses and contaminants by up to 99.97%.',
    icon: 'fa-lungs',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    priceLabel: 'Premium Wellness Systems'
  },
  {
    id: 'emergency',
    title: '24/7 Emergency Resolution',
    description: 'When disaster strikes, our elite emergency team responds with unmatched speed and expertise. While others make excuses, we guarantee same-day resolution with our exclusive after-hours support, fully-stocked service vehicles, and master-level technicians.',
    icon: 'fa-tools',
    image: 'https://images.unsplash.com/photo-1626248801379-51a0748e0aeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: '$149',
    priceLabel: 'Priority service from'
  },
  {
    id: 'consulting',
    title: 'Master HVAC Consulting',
    description: 'Access elite industry expertise for complex projects, challenging designs, and critical performance issues that other companies cannot solve. Our consulting service provides actionable solutions with remarkable ROI for discriminating clients.',
    icon: 'fa-clipboard-check',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: '$350/hr',
    priceLabel: 'Expert solutions at'
  }
];

const ServiceHighlights: React.FC<ServiceHighlightsProps> = ({ services = defaultServiceCards }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  
  // Setup Embla Carousel
  React.useEffect(() => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList());
      
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);
  
  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );
  
  const onPrevious = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  
  const onNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  
  // Group services into sets of 3 for desktop, 2 for tablet, 1 for mobile
  const serviceGroups = services.reduce((acc, service, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(service);
    return acc;
  }, [] as ServiceCard[][]);

  return (
    <section id="services" className="py-16 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-wider uppercase">Calgary's Premium HVAC Authority</span>
          <h2 className="text-4xl font-bold mt-2 mb-4 leading-tight">Master-Engineered Solutions When Others Fail to Deliver</h2>
          <p className="text-lightgray text-lg">Where other companies compromise, we excel. Delivering industry-leading efficiency ratings, precision installations, and 24/7 elite service across Calgary, Edmonton, and the Greater Vancouver area. <span className="text-white font-medium">Guaranteed results from Alberta's most trusted HVAC expert.</span></p>
        </div>
        
        {/* Embla Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {services.map((service) => (
                <div key={service.id} className="flex-grow-0 flex-shrink-0 w-full md:w-1/2 lg:w-1/3 pl-4 pr-4">
                  <div className="bg-darkgray rounded-lg overflow-hidden transition-transform hover:scale-105 h-full">
                    <div 
                      className="h-56 bg-cover bg-center" 
                      style={{ backgroundImage: `url('${service.image}')` }}
                      aria-label={`${service.title} image`}
                    ></div>
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-3">
                          <i className={`fas ${service.icon} text-dark`}></i>
                        </div>
                        <h3 className="text-xl font-heading font-bold">{service.title}</h3>
                      </div>
                      <p className="text-lightgray mb-4">{service.description}</p>
                      
                      <div className="flex items-center text-sm text-primary font-bold">
                        <span>{service.priceLabel} </span>
                        {service.price && <span className="text-2xl ml-2">{service.price}</span>}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <a 
                          href={service.id === 'emergency' ? '#emergency-form' : '#quote-calculator'} 
                          className="inline-block text-primary font-bold transition-transform duration-300 hover:translate-x-1"
                        >
                          {service.id === 'emergency' ? 'Request Emergency Service' : 'Get Quote'} <i className="fas fa-arrow-right ml-1"></i>
                        </a>
                        
                        {(service.id === 'furnace' || service.id === 'ac') && (
                          <a 
                            href="/purchase" 
                            className="inline-block text-white bg-primary px-3 py-1 rounded-md text-sm font-bold hover:bg-red-700 transition duration-300"
                          >
                            <i className="fas fa-shopping-cart mr-1"></i> Buy Now
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10 hover:bg-red-700 transition-colors"
            onClick={onPrevious}
            aria-label="Previous service"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10 hover:bg-red-700 transition-colors"
            onClick={onNext}
            aria-label="Next service"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                  index === selectedIndex ? 'bg-primary' : 'bg-gray-600'
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lightgray mb-4 text-lg">Have a complex HVAC challenge that demands expert attention?</p>
          <p className="text-white mb-8 font-medium text-xl">Get direct access to Alberta's most qualified HVAC professional.</p>
          <a 
            href="#contact" 
            className="inline-block bg-dark border-2 border-primary hover:bg-primary hover:text-dark text-primary font-bold py-4 px-10 rounded-md transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-red-800/40 text-lg tracking-wide"
          >
            Consult With The Expert <i className="fas fa-arrow-right ml-2"></i>
          </a>
          <div className="mt-6 flex justify-center items-center">
            <span className="text-primary mr-2"><i className="fas fa-shield-alt"></i></span>
            <p className="text-sm text-lightgray">Exclusive solutions backed by our industry-leading satisfaction guarantee</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
