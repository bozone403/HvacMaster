import React, { useState, useEffect } from 'react';

const EmergencyHero: React.FC = () => {
  const [responseTime, setResponseTime] = useState(37);

  // Randomly update response time between 30-45 minutes (for psychological urgency)
  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.floor(Math.random() * 16) + 30;
      setResponseTime(newValue);
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-hero-pattern bg-cover bg-center relative">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="inline-block bg-primary px-4 py-1 rounded-full mb-4">
            <p className="text-[#121212] font-bold text-sm">24/7 EMERGENCY SERVICE AVAILABLE</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-light mb-6">
            Calgary's Elite HVAC Provider <span className="text-primary">When Others Call It a Day</span>
          </h1>
          <p className="text-xl text-lightgray mb-8 max-w-2xl">
            Expert heating, cooling, and ventilation solutions with unmatched precision and code-tight installations. Serving Calgary, Lethbridge, and surrounding areas.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
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
              <i className="fas fa-calculator mr-2"></i> Get an Instant Quote
            </a>
          </div>
          
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center">
              <i className="fas fa-certificate text-primary mr-2"></i>
              <span>Red Seal Certified</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-star text-primary mr-2"></i>
              <span>5-Star Rated</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-shield-alt text-primary mr-2"></i>
              <span>Code-Compliant Guarantee</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-clock text-primary mr-2"></i>
              <span>After-Hours Available</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Emergency response time overlay - psychological urgency trigger */}
      <div className="hidden md:block absolute right-10 top-1/3 bg-darkgray bg-opacity-90 p-6 rounded-lg border-l-4 border-primary max-w-xs">
        <div className="text-primary font-bold text-lg mb-2">Average Response Time</div>
        <div className="text-3xl font-heading font-bold mb-3">
          <span className="text-primary">{responseTime}</span> Minutes
        </div>
        <p className="text-lightgray text-sm">Our current emergency response time in Calgary. While other companies make you wait until morning.</p>
      </div>
    </section>
  );
};

export default EmergencyHero;
