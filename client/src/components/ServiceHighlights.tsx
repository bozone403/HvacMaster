import { motion } from "framer-motion";
import { Link } from "wouter";

type ServiceProps = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  price?: string;
  priceLabel?: string;
};

type ServiceHighlightsProps = {
  services: ServiceProps[];
};

const ServiceHighlights = ({ services }: ServiceHighlightsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ServiceCard 
          key={service.id} 
          service={service} 
          index={index} 
        />
      ))}
    </div>
  );
};

const ServiceCard = ({ service, index }: { service: ServiceProps; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col h-full shadow-xl hover:shadow-primary/20 transition-shadow duration-300"
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
    >
      {/* Service Image */}
      {service.image && (
        <div className="h-48 relative overflow-hidden">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          {service.price && (
            <div className="absolute bottom-4 right-4 bg-primary text-white text-sm font-bold py-1 px-3 rounded-full">
              {service.price} {service.priceLabel && <span className="text-xs">({service.priceLabel})</span>}
            </div>
          )}
        </div>
      )}

      {/* Service Content */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-3">
            {service.icon && (
              <i className={`fas ${service.icon} text-primary text-xl mr-2`}></i>
            )}
            <h3 className="text-xl font-bold text-white">{service.title}</h3>
          </div>
          <p className="text-gray-400 mb-4">{service.description}</p>
        </div>

        <div className="mt-auto">
          <Link href={`/booking?service=${service.id}`}>
            <button className="w-full bg-gray-800 hover:bg-primary text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2">
              Learn More
              <i className="fas fa-arrow-right"></i>
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceHighlights;
