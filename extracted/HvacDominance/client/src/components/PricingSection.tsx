import React from 'react';

interface FurnaceOption {
  title: string;
  description: string;
  price: string;
  isPremium?: boolean;
}

interface ACOption {
  title: string;
  description: string;
  price: string;
  isPremium?: boolean;
}

interface MaintenanceOption {
  title: string;
  description: string;
  price: string;
}

interface MaintenancePlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
}

const furnaceOptions: FurnaceOption[] = [
  {
    title: 'Single Stage ECM (95–96%)',
    description: 'Alberta-legal minimum tier',
    price: '$5,999'
  },
  {
    title: 'Two-Stage High-Efficiency',
    description: 'Quieter, better airflow balance',
    price: '$6,499'
  },
  {
    title: 'Modulating/Communicating Furnace',
    description: 'Best-in-class efficiency + smart control',
    price: '$7,499'
  }
];

const acOptions: ACOption[] = [
  {
    title: '16 SEER2 (Entry-Level Legal Tier)',
    description: 'Basic high-efficiency split system',
    price: '$6,499'
  },
  {
    title: '17–18 SEER2 (Mid-Tier)',
    description: 'Better energy savings + quieter operation',
    price: '$6,999'
  },
  {
    title: 'Variable Speed / Inverter Systems',
    description: 'Maximum comfort + zone-ready',
    price: '$8,499',
    isPremium: true
  }
];

const maintenanceOptions: MaintenanceOption[] = [
  {
    title: 'Condenser Coil Cleaning',
    description: 'Spring/Summer essential maintenance',
    price: '$249.99'
  },
  {
    title: 'Full System Deep Clean',
    description: 'Complete furnace & A/C cleaning',
    price: '$474.99'
  },
  {
    title: 'Annual Furnace Tune-Up',
    description: 'Code-required maintenance',
    price: '$179.99'
  },
  {
    title: 'Boiler/Hydronic Flush',
    description: 'Complete system service',
    price: '$349.99'
  }
];

const maintenancePlans: MaintenancePlan[] = [
  {
    name: 'Bronze Plan',
    price: '$199',
    period: '/year',
    features: [
      '1 Furnace Tune-Up',
      '10% Off All Repairs',
      'Priority Scheduling'
    ]
  },
  {
    name: 'Gold Plan',
    price: '$349',
    period: '/year',
    features: [
      'Furnace + A/C Clean',
      'Priority Booking',
      'Filter Supply',
      '12% Off All Repairs'
    ],
    isPopular: true
  },
  {
    name: 'Platinum Plan',
    price: '$499',
    period: '/year',
    features: [
      'Full Spring + Fall Clean',
      '15% Off All Work',
      'Emergency Fee Waived',
      'VIP Priority Scheduling',
      'Annual System Inspection'
    ]
  }
];

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-16 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold">TRANSPARENT PRICING</span>
          <h2 className="text-4xl font-heading font-bold mt-2 mb-4">Elite Systems, Competitive Pricing</h2>
          <p className="text-lightgray">Our pricing is transparent and competitive. We only install high-efficiency systems that are fully compliant with Alberta and Canada Greener Homes regulations.</p>
        </div>
        
        {/* Furnace & AC Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Furnace Pricing */}
          <div className="bg-darkgray rounded-lg overflow-hidden">
            <div className="bg-dark p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mr-4">
                  <i className="fas fa-fire-alt text-dark text-xl"></i>
                </div>
                <h3 className="text-2xl font-heading font-bold">High-Efficiency Furnaces</h3>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {furnaceOptions.map((option, index) => (
                  <div key={index} className={`flex justify-between items-center py-4 ${index !== furnaceOptions.length - 1 ? 'border-b border-lightgray border-opacity-20' : ''}`}>
                    <div>
                      <h4 className="font-bold mb-1">{option.title}</h4>
                      <p className="text-lightgray text-sm">{option.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-primary font-bold text-2xl">{option.price}</span>
                      <p className="text-lightgray text-xs">Starting at</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-lightgray border-opacity-20">
                <h4 className="font-bold mb-3">All installations include:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Complete venting</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Gas flex</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Condensate line</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Electrical tie-in</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Full commissioning</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Rebate paperwork</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* AC Pricing */}
          <div className="bg-darkgray rounded-lg overflow-hidden">
            <div className="bg-dark p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mr-4">
                  <i className="fas fa-snowflake text-dark text-xl"></i>
                </div>
                <h3 className="text-2xl font-heading font-bold">High-Efficiency A/C Systems</h3>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {acOptions.map((option, index) => (
                  <div key={index} className={`flex justify-between items-center py-4 ${index !== acOptions.length - 1 ? 'border-b border-lightgray border-opacity-20' : ''}`}>
                    <div>
                      <h4 className="font-bold mb-1">{option.title}</h4>
                      <p className="text-lightgray text-sm">{option.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-primary font-bold text-2xl">{option.price}</span>
                      <p className="text-lightgray text-xs">Starting at</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-lightgray border-opacity-20">
                <h4 className="font-bold mb-3">SEER2 Compliance Included:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>AHRI certificates</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Permit-ready documentation</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Refrigerant logbooks</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Energy Star compliance</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Full commissioning</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Rebate eligibility</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Maintenance Section */}
        <div className="bg-darkgray rounded-lg overflow-hidden mb-16">
          <div className="bg-dark p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mr-4">
                <i className="fas fa-tools text-dark text-xl"></i>
              </div>
              <h3 className="text-2xl font-heading font-bold">System Maintenance & Cleaning</h3>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {maintenanceOptions.map((option, index) => (
                <div key={index} className="bg-dark p-5 rounded-lg">
                  <h4 className="font-bold mb-2">{option.title}</h4>
                  <p className="text-lightgray text-sm mb-3">{option.description}</p>
                  <div className="text-primary font-bold text-2xl mb-2">{option.price}</div>
                  <a href="#contact" className="text-sm text-primary font-bold">Schedule Now</a>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Maintenance Plans */}
        <div className="bg-darkgray rounded-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-12">
              <span className="text-primary font-bold">MAINTENANCE PLANS</span>
              <h3 className="text-3xl font-heading font-bold mt-2 mb-4">Protect Your Investment</h3>
              <p className="text-lightgray max-w-3xl mx-auto">Our maintenance plans keep your high-efficiency equipment running at peak performance and extend its lifespan.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {maintenancePlans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`bg-dark rounded-lg overflow-hidden transition-transform hover:scale-105 ${plan.isPopular ? 'border-2 border-primary relative' : ''}`}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 right-0 bg-primary text-dark px-4 py-1 text-sm font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="p-6 bg-darkgray">
                    <h4 className="text-xl font-heading font-bold">{plan.name}</h4>
                    <div className="flex items-baseline mt-2">
                      <span className="text-primary font-bold text-3xl">{plan.price}</span>
                      <span className="text-lightgray ml-1">{plan.period}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <i className="fas fa-check text-primary mr-3"></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <a 
                      href="#contact" 
                      className={`mt-6 block w-full ${
                        plan.isPopular 
                          ? 'bg-primary hover:bg-red-700 text-white' 
                          : 'bg-dark border-2 border-primary hover:bg-primary hover:text-dark text-primary'
                      } font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out text-center`}
                    >
                      Select {plan.name.split(' ')[0]}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
