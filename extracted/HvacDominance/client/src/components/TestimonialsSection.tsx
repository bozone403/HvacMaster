import React from 'react';

interface Testimonial {
  text: string;
  rating: number;
  name: string;
  location: string;
  image: string;
}

interface StatItem {
  value: string;
  label: string;
  icon: string;
  unit?: string;
}

const testimonials: Testimonial[] = [
  {
    text: 'My furnace died during the -30°C cold snap. While THREE other companies said they were booked solid, Jordan from AfterHours HVAC arrived in 45 minutes! He diagnosed a complex control board issue that others had missed previously and had us back up and running that same night. This level of service is simply unmatched in Calgary.',
    rating: 5,
    name: 'Sarah Mitchell',
    location: 'Edgemont, Calgary',
    image: 'https://randomuser.me/api/portraits/women/45.jpg'
  },
  {
    text: "After disappointing consultations with five different HVAC companies, we found AfterHours. The difference was immediate - Jordan's expertise was evident as he designed a custom high-efficiency system that perfectly matched our home's unique needs. No unnecessary upsells, no cookie-cutter solutions - just meticulous installation and performance that exceeded every expectation.",
    rating: 5,
    name: 'Michael Johnson',
    location: 'Panorama Hills, Calgary',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    text: 'Our 3,500 sq ft home had suffered from temperature imbalances for YEARS despite multiple "fixes" from other HVAC companies. Jordan completely redesigned our entire airflow system with computational modeling that identified and corrected issues other technicians completely missed. The results are extraordinary - perfect comfort in every room and our energy bills dropped by 32%. Absolute master of his craft.',
    rating: 5,
    name: 'Jennifer Wilson',
    location: 'Evergreen, Calgary',
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
];

const stats: StatItem[] = [
  {
    value: '5.0',
    label: 'Google Rating',
    icon: 'fa-star'
  },
  {
    value: '100%',
    label: 'Satisfaction Rate',
    icon: 'fa-thumbs-up'
  },
  {
    value: '500+',
    label: 'Projects Completed',
    icon: 'fa-check-circle'
  },
  {
    value: '37',
    unit: 'min',
    label: 'Average Response Time',
    icon: 'fa-bolt'
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 bg-darkgray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold">CLIENT EXPERIENCES</span>
          <h2 className="text-4xl font-heading font-bold mt-2 mb-4">What Calgary Homeowners Say</h2>
          <p className="text-lightgray">Don't take our word for it. Here's what our clients have to say about our service.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-dark p-8 rounded-lg relative">
              <div className="text-primary text-4xl absolute -top-4 left-6">
                <i className="fas fa-quote-left"></i>
              </div>
              <div className="mt-4">
                <p className="text-lightgray mb-4">{testimonial.text}</p>
                
                <div className="flex items-center">
                  <div className="text-primary">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fas fa-star ${i < testimonial.rating ? 'text-primary' : 'text-gray-500'}`}></i>
                    ))}
                  </div>
                  <span className="ml-2 font-bold">{testimonial.rating}.0</span>
                </div>
                
                <div className="mt-4 flex items-center">
                  <div 
                    className="h-12 w-12 rounded-full bg-cover bg-center mr-3" 
                    style={{ backgroundImage: `url('${testimonial.image}')` }}
                    aria-label={`${testimonial.name}'s photo`}
                  ></div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-lightgray">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Review Stats */}
        <div className="bg-dark p-8 rounded-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">
                  <span className="text-primary">{stat.value}</span>
                  {stat.unit && <span className="text-xl">{stat.unit}</span>}
                </div>
                <p className="text-sm font-bold mb-1">{stat.label}</p>
                <i className={`fas ${stat.icon} text-primary`}></i>
              </div>
            ))}
          </div>
        </div>
        
        {/* Google Review CTA */}
        <div className="text-center">
          <a 
            href="https://g.page/r/afterhourshvac/review" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-dark border-2 border-primary hover:bg-primary hover:text-dark text-primary font-bold py-3 px-8 rounded-md transition duration-300 ease-in-out"
          >
            <i className="fab fa-google mr-2"></i> Leave a Google Review
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
