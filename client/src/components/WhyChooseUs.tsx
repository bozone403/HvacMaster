import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const features = [
    {
      icon: 'fa-clock',
      title: '24/7 Emergency Service',
      description: 'Available nights, weekends, and holidays when other HVAC companies are closed.'
    },
    {
      icon: 'fa-certificate',
      title: 'Certified Technicians',
      description: 'Red Seal certified experts with years of field experience in all HVAC systems.'
    },
    {
      icon: 'fa-tools',
      title: 'Code-Compliant Work',
      description: 'All installations meet National Building Code and CSA B149.1 standards.'
    },
    {
      icon: 'fa-star',
      title: 'Premium Quality',
      description: 'We only install high-efficiency systems from trusted manufacturers.'
    },
    {
      icon: 'fa-map-marker-alt',
      title: 'Local Expertise',
      description: 'Specialized knowledge of Alberta climate needs and building requirements.'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Satisfaction Guaranteed',
      description: 'We stand behind our work with industry-leading warranties and support.'
    }
  ];

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose <span className="text-primary">AfterHours HVAC</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We deliver expert heating, cooling, and ventilation solutions with unmatched precision — even when other companies call it a day.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg hover:shadow-primary/20 transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <i className={`fas ${feature.icon} text-xl`}></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
