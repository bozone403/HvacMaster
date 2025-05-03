import React, { useState } from 'react';
import { Link } from 'wouter';

// Import images from assets
import furnaceInstallImage from '@assets/475770561_1133188698189665_2585899269754271329_n.jpg';
import acUnitImage from '@assets/476163767_1133188881522980_8450546870015534213_n.jpg';
import furnaceImage from '@assets/475771512_1133188988189636_6401281412215625464_n.jpg';
import ductworkImage from '@assets/475763078_1133188581523010_3495680572806769540_n.jpg';
import acServiceImage from '@assets/475772735_1133188828189652_372679368187531477_n.jpg';
import airQualityImage from '@assets/475843380_1133188818189653_543182595673987322_n.jpg';
import emergencyImage from '@assets/473080806_1117022926472909_3203550033440273916_n.jpg';
import commercialImage from '@assets/475948287_1133188574856344_2683621347232425887_n.jpg';
import image1 from '@assets/475774175_1133188821522986_269924575679222180_n.jpg';
import roughInImage from '@assets/475763078_1133188581523010_3495680572806769540_n.jpg';
import consultingImage from '@assets/475692661_1133188831522985_727560307702391405_n.jpg';

// Additional images
import img1 from '@assets/469102287_1094547672053768_3981462549918868260_n.jpg';
import img2 from '@assets/469380421_1094654148709787_9091060881476314125_n.jpg';
import img3 from '@assets/469464037_1094654482043087_8597174151060595138_n.jpg';
import img4 from '@assets/469502728_1094654452043090_2662092360447380308_n.jpg';
import img5 from '@assets/469523149_1095198485322020_3131406992010297172_n.jpg';
import img6 from '@assets/469524536_1094654172043118_1590899244871259819_n.jpg';
import img7 from '@assets/469535844_1094549642053571_1245132361216164613_n.jpg';
import img8 from '@assets/469607079_1094651308710071_1572291675519729241_n.jpg';
import img9 from '@assets/469634104_1095198168655385_5779094454075646710_n.jpg';
import img10 from '@assets/469650833_1095198275322041_8662534359236694429_n.jpg';
import img11 from '@assets/470469972_1104662171042318_5497272886374491547_n.jpg';
import img12 from '@assets/471173909_1105250617650140_195807907258660801_n.jpg';
import img13 from '@assets/471249938_1105250370983498_197923358555025939_n.jpg';
import img14 from '@assets/471426275_1105250467650155_751799492974306867_n.jpg';
import img15 from '@assets/471495287_1105250150983520_1386073747227411333_n.jpg';
import img16 from '@assets/472761308_1116569543184914_2305615839065844388_n.jpg';
import img17 from '@assets/472794268_1116016029906932_2148624852804770803_n.jpg';
import img18 from '@assets/473328419_1117024396472762_1664679628641010003_n.jpg';
import img19 from '@assets/474154540_1123772532464615_2768856845004807639_n.jpg';
import img20 from '@assets/474164811_1124843065690895_816892682575494635_n.jpg';
import img21 from '@assets/474665667_1124835912358277_83973285220661963_n.jpg';
import img22 from '@assets/478388339_1139888574186344_8720464797129552041_n.jpg';
import img23 from '@assets/479331527_1139888470853021_6780587306293107855_n.jpg';

// Import the gallery images
const galleryImages = [
  // Furnace installations
  { id: 1, src: furnaceInstallImage, alt: "Furnace installation", category: "furnace" },
  { id: 2, src: furnaceImage, alt: "High-efficiency furnace installation", category: "furnace" },
  { id: 3, src: img1, alt: "Furnace replacement project", category: "furnace" },
  { id: 4, src: img4, alt: "High-efficiency unit installation", category: "furnace" },
  { id: 5, src: img7, alt: "Basement furnace installation", category: "furnace" },
  { id: 6, src: img15, alt: "New construction furnace", category: "furnace" },
  
  // AC installations
  { id: 7, src: acUnitImage, alt: "Outdoor AC unit installation", category: "ac" },
  { id: 8, src: acServiceImage, alt: "AC service maintenance", category: "ac" },
  { id: 9, src: img2, alt: "AC installation in progress", category: "ac" },
  { id: 10, src: img11, alt: "Premium outdoor unit setup", category: "ac" },
  { id: 11, src: img14, alt: "Multi-zone cooling system", category: "ac" },
  
  // Ductwork
  { id: 12, src: ductworkImage, alt: "Custom ductwork installation", category: "ductwork" },
  { id: 13, src: image1, alt: "Meticulous ductwork setup", category: "ductwork" },
  { id: 14, src: img3, alt: "Commercial ductwork project", category: "ductwork" },
  { id: 15, src: img9, alt: "Air ***REMOVED***ribution system", category: "ductwork" },
  { id: 16, src: img13, alt: "Sheet metal fabrication", category: "ductwork" },
  { id: 17, src: img16, alt: "Professional duct sealing", category: "ductwork" },
  { id: 18, src: img18, alt: "Commercial vent system", category: "ductwork" },
  
  // Commercial Projects
  { id: 19, src: commercialImage, alt: "Commercial HVAC project", category: "commercial" },
  { id: 20, src: img10, alt: "Restaurant HVAC installation", category: "commercial" },
  { id: 21, src: img19, alt: "Office building system", category: "commercial" },
  { id: 22, src: img22, alt: "Retail space climate control", category: "commercial" },
  
  // Emergency & Technical work
  { id: 23, src: emergencyImage, alt: "Emergency repair service", category: "tech" },
  { id: 24, src: img5, alt: "HVAC system diagnostics", category: "tech" },
  { id: 25, src: img6, alt: "Gas line installation", category: "tech" },
  { id: 26, src: img8, alt: "Technical troubleshooting", category: "tech" },
  { id: 27, src: img12, alt: "Home energy assessment", category: "tech" },
  { id: 28, src: img17, alt: "Control system wiring", category: "tech" },
  { id: 29, src: img20, alt: "Precision maintenance work", category: "tech" },
  { id: 30, src: img21, alt: "System optimization", category: "tech" },
  { id: 31, src: img23, alt: "Comprehensive inspection", category: "tech" },
  
  // New construction and rough-ins
  { id: 32, src: roughInImage, alt: "New construction rough-in", category: "roughin" },
  { id: 33, src: consultingImage, alt: "HVAC consulting project", category: "roughin" },
  { id: 34, src: airQualityImage, alt: "Air quality system installation", category: "roughin" },
];

// Helper function to get descriptions based on category
const getImageDescription = (category: string): string => {
  switch (category) {
    case 'furnace':
      return 'High-efficiency furnace installation with professional setup and ducting. Featuring pristine workmanship and optimal system placement.';
    case 'ac':
      return 'Premium air conditioning system installation with optimal placement for maximum efficiency. Engineered for Western Canada\'s unique climate demands.';
    case 'ductwork':
      return 'Custom ductwork design and installation for optimal airflow throughout the property. Precision metal work that maximizes energy efficiency.';
    case 'commercial':
      return 'Commercial HVAC solutions for businesses across Alberta. Enterprise-grade equipment and compliance with all building codes.';
    case 'roughin':
      return 'New construction rough-in services for residential and commercial projects. Future-proofing properties with modern HVAC infrastructure.';
    case 'tech':
      return 'Professional HVAC technical work ensuring systems operate at peak performance. Diagnostics and repairs by certified experts.';
    default:
      return 'Professional HVAC installation and service work by AfterHours HVAC, serving Calgary, Edmonton and Vancouver regions.';
  }
};

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const handleImageClick = (id: number) => {
    setSelectedImage(id);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const getNextImageId = () => {
    if (selectedImage === null) return null;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    return filteredImages[(currentIndex + 1) % filteredImages.length]?.id || null;
  };

  const getPrevImageId = () => {
    if (selectedImage === null) return null;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    return filteredImages[(currentIndex - 1 + filteredImages.length) % filteredImages.length]?.id || null;
  };

  const selectedImageData = galleryImages.find(img => img.id === selectedImage);

  return (
    <main className="min-h-screen bg-dark text-white">
      {/* Hero Section */}
      <section className="bg-darkgray py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Work Gallery</h1>
          <p className="text-lightgray max-w-2xl mx-auto">
            Browse through our completed projects spanning furnace installations, AC systems, ductwork, and more. 
            See the quality and craftsmanship that sets AfterHours HVAC apart.
          </p>
          <div className="mt-8">
            <a href="/" className="inline-block bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition duration-300 mr-4">
              Back to Home
            </a>
            <a href="/#contact" className="inline-block bg-dark border-2 border-primary hover:bg-primary hover:text-dark text-primary font-bold py-3 px-8 rounded-md transition duration-300">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                filter === 'all' ? 'bg-primary text-white' : 'bg-darkgray text-lightgray hover:bg-gray-700'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('furnace')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                filter === 'furnace' ? 'bg-primary text-white' : 'bg-darkgray text-lightgray hover:bg-gray-700'
              }`}
            >
              Furnace Installations
            </button>
            <button
              onClick={() => setFilter('ac')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                filter === 'ac' ? 'bg-primary text-white' : 'bg-darkgray text-lightgray hover:bg-gray-700'
              }`}
            >
              AC Systems
            </button>
            <button
              onClick={() => setFilter('ductwork')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                filter === 'ductwork' ? 'bg-primary text-white' : 'bg-darkgray text-lightgray hover:bg-gray-700'
              }`}
            >
              Ductwork
            </button>
            <button
              onClick={() => setFilter('commercial')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                filter === 'commercial' ? 'bg-primary text-white' : 'bg-darkgray text-lightgray hover:bg-gray-700'
              }`}
            >
              Commercial Projects
            </button>
            <button
              onClick={() => setFilter('roughin')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                filter === 'roughin' ? 'bg-primary text-white' : 'bg-darkgray text-lightgray hover:bg-gray-700'
              }`}
            >
              New Construction
            </button>
            <button
              onClick={() => setFilter('tech')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                filter === 'tech' ? 'bg-primary text-white' : 'bg-darkgray text-lightgray hover:bg-gray-700'
              }`}
            >
              Technical Work
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-lg bg-darkgray cursor-pointer transform transition-all hover:scale-105 hover:shadow-lg"
                onClick={() => handleImageClick(image.id)}
              >
                <div className="aspect-w-4 aspect-h-3 relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 w-full">
                      <p className="text-white font-bold">{image.alt}</p>
                      <div className="flex items-center mt-2">
                        <span className="px-3 py-1 bg-primary/80 text-white text-xs rounded-full">
                          {image.category === 'furnace' && 'Furnace'}
                          {image.category === 'ac' && 'AC System'}
                          {image.category === 'ductwork' && 'Ductwork'}
                          {image.category === 'commercial' && 'Commercial'}
                          {image.category === 'roughin' && 'New Construction'}
                          {image.category === 'tech' && 'Technical'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <i className="fas fa-images text-6xl text-lightgray mb-4"></i>
              <h3 className="text-xl font-bold mb-2">No Images Found</h3>
              <p className="text-lightgray">
                No images match the current filter. Try selecting a different category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage !== null && selectedImageData && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={closeModal}
              className="text-white hover:text-primary text-3xl"
              aria-label="Close modal"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
            <button
              onClick={() => setSelectedImage(getPrevImageId() || 0)}
              className="text-white hover:text-primary text-4xl"
              aria-label="Previous image"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          </div>

          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
            <button
              onClick={() => setSelectedImage(getNextImageId() || 0)}
              className="text-white hover:text-primary text-4xl"
              aria-label="Next image"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          <div className="max-w-4xl mx-auto">
            <img
              src={selectedImageData.src}
              alt={selectedImageData.alt}
              className="max-h-[80vh] max-w-full object-contain"
            />
            <div className="mt-4 text-center">
              <h3 className="text-white text-xl font-bold">{selectedImageData.alt}</h3>
              <p className="text-lightgray mt-2">
                {getImageDescription(selectedImageData.category)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTA section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">Ready to upgrade your HVAC system?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Don't settle for anything less than the best. Contact AfterHours HVAC today for a free consultation and quote on your project.
          </p>
          <a href="/#contact" className="inline-block bg-dark hover:bg-black text-white font-bold py-3 px-8 rounded-md transition duration-300">
            Get a Free Quote
          </a>
        </div>
      </section>
    </main>
  );
};

export default Gallery;