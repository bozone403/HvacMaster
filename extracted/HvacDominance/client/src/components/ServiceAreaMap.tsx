import React from 'react';

interface AreaLocation {
  name: string;
  locations: string[];
}

const serviceAreas: AreaLocation[] = [
  {
    name: 'Calgary Metro',
    locations: ['Downtown', 'NW Calgary', 'NE Calgary', 'SW Calgary', 'SE Calgary', 'Surrounding Areas']
  },
  {
    name: 'Southern Alberta',
    locations: ['Lethbridge', 'Coaldale', 'Taber', 'Fort Macleod', 'Okotoks', 'High River', 'Rural Areas']
  },
  {
    name: 'Central & Northern Alberta',
    locations: ['Red Deer', 'Edmonton', 'Sherwood Park', 'St. Albert', 'Leduc', 'Surrounding Areas']
  },
  {
    name: 'Vancouver Greater Area',
    locations: ['Vancouver', 'Burnaby', 'Richmond', 'Surrey', 'Coquitlam', 'Surrounding Areas']
  }
];

const ServiceAreaMap: React.FC = () => {
  return (
    <section className="py-16 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold">EXTENSIVE SERVICE AREA</span>
          <h2 className="text-4xl font-heading font-bold mt-2 mb-4">Where We Deliver Excellence</h2>
          <p className="text-lightgray">Serving across Alberta from Lethbridge to Edmonton, plus the Greater Vancouver area with 24/7 elite HVAC service.</p>
        </div>
        
        <div className="bg-darkgray p-6 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-dark w-full h-96 rounded-lg overflow-hidden">
                {/* Using Google Maps embed (would be replaced with actual Google Maps in production) */}
                <iframe 
                  title="AfterHours HVAC Service Area"
                  className="w-full h-full border-0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d321382.6783288143!2d-114.36250709225893!3d51.030219715597835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537170039f843fd5%3A0x266d3bb1b652b63a!2sCalgary%2C%20AB%2C%20Canada!5e0!3m2!1sen!2sus!4v1686847945159!5m2!1sen!2sus"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-heading font-bold mb-6">Areas We Serve</h3>
              
              <div className="space-y-6">
                {serviceAreas.map((area, index) => (
                  <div key={index}>
                    <h4 className="font-bold mb-3 flex items-center">
                      <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                      {area.name}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {area.locations.map((location, i) => (
                        <div key={i} className="flex items-center">
                          <i className="fas fa-check text-primary mr-2"></i>
                          <span>{location}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="pt-4">
                  <h4 className="font-bold mb-2">Need service in your area?</h4>
                  <p className="text-lightgray text-sm mb-4">Contact us to confirm if we service your location.</p>
                  <a 
                    href="#contact" 
                    className="inline-block bg-primary hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 ease-in-out"
                  >
                    Check Availability
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;
