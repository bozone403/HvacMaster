import { Link } from "wouter";
import { motion } from "framer-motion";

const EmergencyHero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  return (
    <div className="relative bg-black overflow-hidden">
      {/* Background Image - Positioned Absolute with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black/90 z-10" />
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex flex-col items-center justify-center min-h-[90vh] text-center py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 text-white">
              <span className="text-primary">After</span>
              <span className="text-white">Hours HVAC</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-300 max-w-4xl">
              When everyone else closes, <br />
              <span className="text-primary font-bold">we keep the heat on.</span>
            </h2>
          </motion.div>

          <motion.p 
            variants={itemVariants} 
            className="text-gray-300 text-lg mb-12 max-w-2xl"
          >
            Professional HVAC services in Lethbridge, Calgary, and across southern Alberta. 
            We handle furnace repair, AC installation, and 24/7 emergency service.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link href="/quote">
              <motion.button 
                className="bg-primary hover:bg-red-600 text-white font-bold px-6 py-4 rounded-full transition duration-300 text-lg min-w-[200px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get a Free Quote
              </motion.button>
            </Link>

            <Link href="/booking">
              <motion.button 
                className="bg-white hover:bg-gray-100 text-black font-bold px-6 py-4 rounded-full transition duration-300 text-lg min-w-[200px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a Service
              </motion.button>
            </Link>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center mt-4"
          >
            <motion.div 
              className="bg-primary text-white font-bold py-3 px-6 rounded-lg flex items-center gap-3"
              variants={pulseVariants}
              animate="pulse"
            >
              <i className="fas fa-phone-alt animate-pulse text-lg"></i>
              <a 
                href="tel:+14036136014" 
                className="font-bold text-xl"
              >
                (403) 613-6014
              </a>
              <span className="text-sm text-white bg-black bg-opacity-30 px-2 py-1 rounded">
                24/7 EMERGENCY
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmergencyHero;
