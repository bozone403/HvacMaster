import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';

// Import images from assets
import furnaceInstallImage from '@assets/475770561_1133188698189665_2585899269754271329_n.jpg';
import acUnitImage from '@assets/476163767_1133188881522980_8450546870015534213_n.jpg';
import furnaceImage from '@assets/475771512_1133188988189636_6401281412215625464_n.jpg';
import ductworkImage from '@assets/475763078_1133188581523010_3495680572806769540_n.jpg';
import acServiceImage from '@assets/475772735_1133188828189652_372679368187531477_n.jpg';
import image1 from '@assets/475774175_1133188821522986_269924575679222180_n.jpg';
import image2 from '@assets/475843380_1133188818189653_543182595673987322_n.jpg';
import image3 from '@assets/475948287_1133188574856344_2683621347232425887_n.jpg';
import ownerPhotoImage from '@assets/484096665_1163158445192690_8075246581175071232_n.jpg';

// Define the type for carousel images
interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
  category?: string;
}

interface SimpleImage {
  id: number;
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images?: (CarouselImage | SimpleImage)[];
}

const defaultCarouselImages = [
  {
    src: furnaceInstallImage,
    alt: "High-efficiency furnace installation",
    caption: "Professional Furnace Installation",
    category: "furnace"
  },
  {
    src: acUnitImage,
    alt: "Premier AC unit installation",
    caption: "Premier AC Systems",
    category: "ac"
  },
  {
    src: ductworkImage,
    alt: "Custom ductwork installation",
    caption: "Expert Ductwork Solutions",
    category: "ductwork"
  },
  {
    src: acServiceImage,
    alt: "Winter AC unit service",
    caption: "Year-round AC Service",
    category: "ac"
  },
  {
    src: image1,
    alt: "Professional HVAC installation",
    caption: "Precision HVAC Work",
    category: "install"
  },
  {
    src: image2,
    alt: "Custom HVAC solutions",
    caption: "Custom System Design",
    category: "install"
  },
  {
    src: image3,
    alt: "HVAC maintenance service",
    caption: "Professional Maintenance",
    category: "service"
  },
  {
    src: furnaceImage,
    alt: "Furnace repair and maintenance",
    caption: "Expert Furnace Repair",
    category: "furnace"
  }
];

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images = defaultCarouselImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-scroll the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    
    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    
    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section className="py-12 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-primary font-bold">OUR PORTFOLIO</span>
          <h2 className="text-4xl font-heading font-bold mt-2 mb-4">Recent HVAC Projects</h2>
          <p className="text-lightgray">Browse through our recent work showcasing premium installations and service across Calgary and Southern Alberta.</p>
        </div>
        
        <div className="relative max-w-5xl mx-auto overflow-hidden rounded-lg shadow-xl group">
          {/* Main carousel container */}
          <div 
            className="relative aspect-w-16 aspect-h-9 overflow-hidden"
          >
            {images.map((image, index) => (
              <div 
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                  index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{'caption' in image ? image.caption : 'HVAC Project'}</h3>
                  <p className="text-white/80 text-sm">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-primary text-white rounded-full p-2 opacity-70 hover:opacity-100 transition-all duration-300"
            aria-label="Previous slide"
          >
            <i className="fas fa-chevron-left text-xl"></i>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-primary text-white rounded-full p-2 opacity-70 hover:opacity-100 transition-all duration-300"
            aria-label="Next slide"
          >
            <i className="fas fa-chevron-right text-xl"></i>
          </button>
          
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary w-6' : 'bg-white/60 hover:bg-white'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link href="/gallery">
            <span className="inline-block bg-primary hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out hover:scale-105 cursor-pointer">
              View Full Gallery <i className="fas fa-arrow-right ml-2"></i>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;