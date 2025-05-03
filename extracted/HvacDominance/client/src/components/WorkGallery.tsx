import React, { useState } from 'react';
import furnaceImg from '@assets/475774175_1133188821522986_269924575679222180_n_1746163343223.jpg';
import ductwork1 from '@assets/83942920_128172848691260_5768935982485209088_n.jpg';
import ductwork2 from '@assets/84770527_128448595330352_3832721148710223872_n.jpg';
import ductwork3 from '@assets/83885340_128448618663683_8624391748816207872_n.jpg';
import ductwork4 from '@assets/84143961_128448641997014_6836653986003550208_n.jpg';
import ductwork5 from '@assets/83908479_128448668663678_6940057947879768064_n.jpg';
import ductwork6 from '@assets/84840831_128486411993237_2510215141048451072_n.jpg';
import ducting1 from '@assets/469535844_1094549642053571_1245132361216164613_n.jpg';
import ducting2 from '@assets/469102287_1094547672053768_3981462549918868260_n.jpg';
import ducting3 from '@assets/469464037_1094654482043087_8597174151060595138_n.jpg';
import ducting4 from '@assets/469524536_1094654172043118_1590899244871259819_n.jpg';
import ducting5 from '@assets/469607079_1094651308710071_1572291675519729241_n.jpg';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: furnaceImg,
    alt: 'High-efficiency furnace installation',
    category: 'furnace'
  },
  {
    id: 2,
    src: ductwork1,
    alt: 'Custom sheet metal fabrication',
    category: 'ductwork'
  },
  {
    id: 3,
    src: ductwork2,
    alt: 'Custom plenum installation',
    category: 'ductwork'
  },
  {
    id: 4,
    src: ductwork3,
    alt: 'Commercial HVAC installation',
    category: 'commercial'
  },
  {
    id: 5,
    src: ductwork4,
    alt: 'Custom ductwork fabrication',
    category: 'ductwork'
  },
  {
    id: 6,
    src: ductwork5,
    alt: 'Commercial ductwork installation',
    category: 'commercial'
  },
  {
    id: 7,
    src: ductwork6,
    alt: 'Ceiling ductwork installation',
    category: 'commercial'
  },
  {
    id: 8,
    src: ducting1,
    alt: 'Residential ductwork installation',
    category: 'residential'
  },
  {
    id: 9,
    src: ducting2,
    alt: 'Commercial HVAC framing',
    category: 'commercial'
  },
  {
    id: 10,
    src: ducting3,
    alt: 'Basement ductwork installation',
    category: 'residential'
  },
  {
    id: 11,
    src: ducting4,
    alt: 'Custom ductwork corner installation',
    category: 'ductwork'
  },
  {
    id: 12,
    src: ducting5,
    alt: 'Commercial ceiling ductwork',
    category: 'commercial'
  }
];

const WorkGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Get unique categories without using Set
  const uniqueCategories: string[] = [];
  galleryImages.forEach(img => {
    if (!uniqueCategories.includes(img.category)) {
      uniqueCategories.push(img.category);
    }
  });
  const categories = ['all', ...uniqueCategories];
  
  const filteredImages = selectedCategory && selectedCategory !== 'all'
    ? galleryImages.filter(img => img.category === selectedCategory)
    : galleryImages;

  return (
    <section id="our-work" className="py-16 bg-darkgray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold">OUR CRAFTSMANSHIP</span>
          <h2 className="text-4xl font-heading font-bold mt-2 mb-4">Professional HVAC Installations</h2>
          <p className="text-lightgray">Browse our gallery of custom installations across Alberta and British Columbia.</p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === 'all' ? null : category)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                (category === 'all' && !selectedCategory) || selectedCategory === category
                  ? 'bg-primary text-dark'
                  : 'bg-dark text-lightgray hover:bg-primary/20'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map(image => (
            <div 
              key={image.id} 
              className="relative group overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-103 shadow-md hover:shadow-lg"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-w-4 aspect-h-3">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                  <span className="text-primary text-xs">{image.category.charAt(0).toUpperCase() + image.category.slice(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-white bg-primary/80 rounded-full p-2 hover:bg-primary transition-colors z-10"
                onClick={() => setSelectedImage(null)}
              >
                <i className="fas fa-times"></i>
              </button>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              <div className="bg-dark/90 p-4 text-white">
                <h3 className="text-lg font-medium">{selectedImage.alt}</h3>
                <p className="text-primary text-sm">
                  Category: {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-lightgray">We take pride in our workmanship on every job, large or small.</p>
          <a 
            href="#contact" 
            className="inline-block bg-primary hover:bg-primary/90 text-dark font-bold py-3 px-6 rounded-md mt-4 transition duration-300 ease-in-out hover:scale-105 shadow-lg"
          >
            Schedule Your Installation
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorkGallery;