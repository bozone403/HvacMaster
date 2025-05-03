import React from 'react';

interface FeatureBenefit {
  icon: string;
  title: string;
  description: string;
}

const keyFeatures: FeatureBenefit[] = [
  {
    icon: 'fa-clock',
    title: '24/7 Emergency Service',
    description: "We operate when others close — nights, weekends, and holidays. Because HVAC emergencies don't follow a 9-to-5 schedule."
  },
  {
    icon: 'fa-certificate',
    title: 'Code-Tight Installations',
    description: 'Every system we install meets or exceeds National Building Code, CSA B149.1, CEC, and NPC compliance. No shortcuts, ever.'
  },
  {
    icon: 'fa-user-hard-hat',
    title: 'Red Seal Expertise',
    description: "Our team consists of certified Red Seal technicians with extensive field experience in Calgary's unique climate conditions."
  }
];

const companyAdvantages: FeatureBenefit[] = [
  {
    icon: 'fa-check-circle',
    title: 'True After-Hours Availability',
    description: "Most HVAC companies in Calgary shut down at 5pm. We're available 24/7 with no outrageous overtime rates."
  },
  {
    icon: 'fa-check-circle',
    title: 'High-Efficiency Specialists',
    description: 'We only install 95%+ AFUE furnaces and SEER2-compliant AC systems that qualify for rebates and save you money.'
  },
  {
    icon: 'fa-check-circle',
    title: 'No Subcontractors',
    description: 'Unlike big box stores that outsource to the lowest bidder, our installations are performed by our own elite technicians.'
  },
  {
    icon: 'fa-check-circle',
    title: 'Complete Documentation',
    description: 'We provide all permits, AHRI certificates, warranty registrations, and rebate paperwork with every installation.'
  },
  {
    icon: 'fa-check-circle',
    title: 'AI-Enhanced Operations',
    description: 'Our AI support team ensures perfect documentation, parts ordering, and scheduling so our technicians focus on technical excellence.'
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-16 bg-darkgray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold">WHY AFTERHOURS HVAC</span>
          <h2 className="text-4xl font-heading font-bold mt-2 mb-4">Calgary's Elite Choice For HVAC</h2>
          <p className="text-lightgray">We don't just offer HVAC services — we deliver an unmatched technical standard when others aren't even available.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {keyFeatures.map((feature, index) => (
            <div key={index} className="bg-dark p-8 rounded-lg border-t-4 border-primary">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mr-4">
                  <i className={`fas ${feature.icon} text-dark text-xl`}></i>
                </div>
                <h3 className="text-xl font-heading font-bold">{feature.title}</h3>
              </div>
              <p className="text-lightgray">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-dark rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <span className="text-primary font-bold">THE AFTERHOURS DIFFERENCE</span>
              <h3 className="text-3xl font-heading font-bold mt-2 mb-6">Why Calgary Homeowners Choose Us Over Competitors</h3>
              
              <div className="space-y-4 mb-8">
                {companyAdvantages.map((advantage, index) => (
                  <div key={index} className="flex">
                    <i className={`fas ${advantage.icon} text-primary mr-3 mt-1`}></i>
                    <div>
                      <h4 className="font-bold mb-1">{advantage.title}</h4>
                      <p className="text-lightgray text-sm">{advantage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <a 
                href="#quote-calculator" 
                className="inline-block bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition duration-300 ease-in-out"
              >
                Experience the Difference
              </a>
            </div>
            
            <div 
              className="bg-cover bg-center hidden md:block" 
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1583246809394-1e54d8b070fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')` }}
              aria-label="HVAC technician working"
            >
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
