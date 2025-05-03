import { services } from "@/data/services";

interface ServicesSectionProps {
  openBookingCalendar: (service: string) => void;
}

export default function ServicesSection({ openBookingCalendar }: ServicesSectionProps) {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[#121212] mb-4">Our High-Performance HVAC Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">We specialize in furnace repair, AC installation, boiler systems, ductwork design, hydronic heating, and indoor air quality optimization.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition group"
            >
              <div 
                className="h-56 bg-cover bg-center" 
                style={{ backgroundImage: `url('${service.imageSrc}')` }}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#121212] mb-2 group-hover:text-[#DC2626] transition">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-500">{service.price}</span>
                  <a 
                    href={service.detailsLink}
                    className="text-[#DC2626] font-bold hover:text-red-700 transition flex items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      if (service.detailsLink.startsWith('#')) {
                        const section = document.getElementById(service.detailsLink.substring(1));
                        section?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        openBookingCalendar(service.title);
                      }
                    }}
                  >
                    <span>View Details</span>
                    <i className="fas fa-arrow-right ml-1"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#contact"
            className="inline-block bg-[#121212] text-white font-bold py-3 px-8 rounded-md hover:bg-gray-800 transition"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById('contact');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get a Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}
