import React from 'react';

const OwnerProfile: React.FC = () => {
  return (
    <section id="about-owner" className="py-16 bg-darkgray">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
          <div className="md:w-1/3">
            <div className="relative">
              <div className="rounded-full overflow-hidden h-64 w-64 mx-auto border-4 border-primary shadow-xl">
                <img 
                  src="/images/jordan-profile.jpg" 
                  alt="Jordan - Owner of AfterHours HVAC"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-dark font-bold py-2 px-6 rounded-full shadow-md">
                Owner & Master Tech
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 text-center md:text-left">
            <span className="text-primary font-bold">MEET THE OWNER</span>
            <h2 className="text-4xl font-heading font-bold mt-2 mb-4">Jordan</h2>
            
            <div className="space-y-4 text-lightgray">
              <p>
                With over 15 years in the HVAC industry, I founded AfterHours HVAC to provide unmatched service when others aren't available. My commitment is to deliver exceptional craftsmanship and honest service on every project.
              </p>
              <p>
                As a Red Seal certified HVAC technician with extensive experience in both residential and commercial systems, I personally oversee every installation to ensure it meets our exacting standards.
              </p>
              <p>
                When you work with AfterHours HVAC, you're working directly with me—the owner and master technician—ensuring you receive the highest quality service possible.
              </p>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center">
                <i className="fas fa-phone text-primary mr-2"></i>
                <a 
                  href="tel:403-613-6014" 
                  className="text-white hover:text-primary transition duration-300"
                >
                  403-613-6014
                </a>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope text-primary mr-2"></i>
                <a 
                  href="mailto:jordan@afterhourshvac.ca" 
                  className="text-white hover:text-primary transition duration-300"
                >
                  jordan@afterhourshvac.ca
                </a>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              <a 
                href="#contact" 
                className="inline-block bg-dark border-2 border-primary hover:bg-primary hover:text-dark text-primary font-bold py-3 px-8 rounded-md transition duration-300 ease-in-out"
              >
                Contact Me Directly
              </a>
              <a 
                href="/gallery" 
                className="inline-block bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition duration-300 ease-in-out"
              >
                View Our Work
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-dark p-6 rounded-lg text-center">
            <div className="h-16 w-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-certificate text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Red Seal Certified</h3>
            <p className="text-lightgray">Nationally recognized certification demonstrating the highest level of skill and knowledge in the HVAC trade.</p>
          </div>
          
          <div className="bg-dark p-6 rounded-lg text-center">
            <div className="h-16 w-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-tools text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">15+ Years Experience</h3>
            <p className="text-lightgray">Extensive experience with all major brands and systems, from residential furnaces to complex commercial installations.</p>
          </div>
          
          <div className="bg-dark p-6 rounded-lg text-center">
            <div className="h-16 w-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-handshake text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Owner-Operated</h3>
            <p className="text-lightgray">Direct accountability and communication. The owner who quotes your job is the same expert who will complete it.</p>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <div className="inline-block bg-dark p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-center mb-4">
              <i className="fab fa-google text-2xl text-primary mr-2"></i>
              <h3 className="text-xl font-bold text-white">Happy with our service?</h3>
            </div>
            <p className="text-lightgray mb-4">Your review helps us grow and serve more customers like you.</p>
            <a 
              href="https://g.page/r/CQEE3GNkblpDEAI/review" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 ease-in-out"
            >
              Leave a Review
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerProfile;