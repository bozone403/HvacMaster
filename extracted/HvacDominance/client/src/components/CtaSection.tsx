import React from 'react';
import { Link } from 'wouter';

const CtaSection: React.FC = () => {
  return (
    <section className="bg-hero-pattern bg-cover bg-center py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-heading font-bold mb-6">Ready to Experience the AfterHours Difference?</h2>
          <p className="text-lightgray text-xl mb-4">We're Calgary's elite HVAC provider for a reason. Contact us today to schedule service or request a quote.</p>
          
          <div className="mb-8 p-4 bg-dark/70 rounded-lg border border-primary inline-block">
            <div className="flex items-center mb-2">
              <i className="fas fa-shopping-cart text-xl text-primary mr-2"></i>
              <span className="text-lg font-bold">NEW: Buy Online and Save Time!</span>
            </div>
            <p className="text-sm text-lightgray mb-2">Purchase your furnace or AC installation directly through our website with secure online payment.</p>
            <Link href="/purchase">
              <span className="inline-block mt-2 bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out cursor-pointer">
                View Installation Packages
              </span>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="#emergency-form" 
              className="bg-primary hover:bg-red-700 text-white font-bold py-4 px-8 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
            >
              <i className="fas fa-bolt mr-2"></i> Emergency Service
            </a>
            <a 
              href="#quote-calculator" 
              className="bg-dark border-2 border-lightgray hover:border-light text-light font-bold py-4 px-8 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
            >
              <i className="fas fa-calculator mr-2"></i> Get a Quote
            </a>
            <a 
              href="#contact" 
              className="bg-darkgray hover:bg-gray-700 text-light font-bold py-4 px-8 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
            >
              <i className="fas fa-envelope mr-2"></i> Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
