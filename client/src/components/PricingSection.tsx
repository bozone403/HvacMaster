import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'wouter';

type PricingCategory = 'furnace' | 'ac' | 'maintenance';
type PricingTier = 'standard' | 'high-efficiency' | 'premium';

const PricingSection = () => {
  const [category, setCategory] = useState<PricingCategory>('furnace');
  
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our 2025 pricing for high-efficiency systems - fully compliant with Alberta & Canada Greener Homes regulations.
          </p>
        </motion.div>
        
        {/* Category Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setCategory('furnace')}
            className={`px-6 py-3 rounded-full font-bold text-lg transition-colors duration-300 ${category === 'furnace' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            <i className="fas fa-fire mr-2"></i>
            Furnace Systems
          </button>
          <button
            onClick={() => setCategory('ac')}
            className={`px-6 py-3 rounded-full font-bold text-lg transition-colors duration-300 ${category === 'ac' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            <i className="fas fa-snowflake mr-2"></i>
            A/C Systems
          </button>
          <button
            onClick={() => setCategory('maintenance')}
            className={`px-6 py-3 rounded-full font-bold text-lg transition-colors duration-300 ${category === 'maintenance' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            <i className="fas fa-tools mr-2"></i>
            Maintenance Plans
          </button>
        </div>
        
        {/* Furnace Pricing */}
        {category === 'furnace' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Single Stage ECM"
              category="furnace"
              tier="standard"
              price={5999}
              features={[
                'Alberta-legal minimum tier',
                '95-96% AFUE efficiency',
                'Lower upfront cost',
                'Standard warranty',
                'Basic air filtration',
                'Code-compliant installation'
              ]}
              productId="furnace-single-stage"
            />
            
            <PricingCard
              title="Two-Stage High-Efficiency"
              category="furnace"
              tier="high-efficiency"
              price={6499}
              popular
              features={[
                'Quieter operation',
                'Better airflow balance',
                'Enhanced temperature control',
                'Premium warranty',
                'Improved efficiency',
                'Code-compliant installation'
              ]}
              productId="furnace-two-stage"
            />
            
            <PricingCard
              title="Modulating/Communicating"
              category="furnace"
              tier="premium"
              price={7499}
              features={[
                'Best-in-class efficiency',
                'Ultra-quiet operation',
                'Perfect temperature control',
                'Smart home integration',
                'Extended warranty coverage',
                'Code-compliant installation'
              ]}
              productId="furnace-modulating"
            />
          </div>
        )}
        
        {/* AC Pricing */}
        {category === 'ac' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="16 SEER2 Entry-Level"
              category="ac"
              tier="standard"
              price={6499}
              features={[
                'Basic high-efficiency split system',
                'SEER2-Compliant',
                'Energy-saving operation',
                'Standard warranty',
                'Reliable cooling performance',
                'Code-compliant installation'
              ]}
              productId="ac-16-seer"
            />
            
            <PricingCard
              title="17-18 SEER2 Mid-Tier"
              category="ac"
              tier="high-efficiency"
              price={6999}
              popular
              features={[
                'Better energy savings',
                'Quieter operation',
                'Enhanced cooling performance',
                'Premium warranty',
                'Higher indoor comfort',
                'Code-compliant installation'
              ]}
              productId="ac-18-seer"
            />
            
            <PricingCard
              title="Variable Speed / Inverter"
              category="ac"
              tier="premium"
              price={8499}
              features={[
                'Maximum comfort & efficiency',
                'Ultra-quiet operation',
                'Zone-ready capabilities',
                'Smart thermostat compatible',
                'Extended warranty coverage',
                'Code-compliant installation'
              ]}
              productId="ac-variable-speed"
            />
          </div>
        )}
        
        {/* Maintenance Plans */}
        {category === 'maintenance' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Bronze Plan"
              category="maintenance"
              tier="standard"
              price={199}
              isAnnual
              features={[
                '1 Furnace Tune-Up per year',
                '10% Off all repairs',
                'Priority scheduling',
                'Filter replacement reminder',
                'System efficiency check',
                'Safety inspection'
              ]}
              productId="plan-bronze"
            />
            
            <PricingCard
              title="Gold Plan"
              category="maintenance"
              tier="high-efficiency"
              price={349}
              popular
              isAnnual
              features={[
                'Furnace + A/C Clean',
                'Priority booking',
                'Filter supply included',
                '12% Off all repairs',
                'Twice-yearly inspections',
                '24hr emergency response'
              ]}
              productId="plan-gold"
            />
            
            <PricingCard
              title="Platinum Plan"
              category="maintenance"
              tier="premium"
              price={499}
              isAnnual
              features={[
                'Full Spring + Fall service',
                '15% Off all work',
                'Emergency fees waived',
                'Front-of-line service',
                'All filters + parts included',
                '24/7 VIP support line'
              ]}
              productId="plan-platinum"
            />
          </div>
        )}
        
        {/* Disclaimer and Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm max-w-3xl mx-auto mb-6">
            All systems we install are Alberta-compliant, high-efficiency, and rebate-eligible. We don't touch outdated units — we build systems the right way, the legal way, the AfterHours way.
          </p>
          
          <Link href="/quote">
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Need a Custom Quote?
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

type PricingCardProps = {
  title: string;
  category: PricingCategory;
  tier: PricingTier;
  price: number;
  features: string[];
  popular?: boolean;
  productId: string;
  isAnnual?: boolean;
};

const PricingCard = ({ 
  title, 
  category, 
  tier, 
  price, 
  features, 
  popular, 
  productId,
  isAnnual = false
}: PricingCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  let backgroundColor = 'bg-gray-900';
  let borderColor = 'border-gray-800';
  let buttonClass = 'bg-primary hover:bg-red-600';
  
  if (tier === 'premium') {
    backgroundColor = 'bg-gray-900';
    borderColor = 'border-primary/40';
  }
  
  return (
    <motion.div
      className={`${backgroundColor} ${popular ? 'border-2 border-primary' : `border ${borderColor}`} rounded-xl overflow-hidden shadow-xl ${popular ? 'scale-105 relative z-10' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {popular && (
        <div className="bg-primary text-white text-center py-2 font-bold">
          MOST POPULAR
        </div>
      )}
      
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
        
        <div className="mb-6">
          <span className="text-4xl font-bold text-white">{formatPrice(price)}</span>
          {isAnnual && <span className="text-gray-400 ml-1">/year</span>}
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <i className="fas fa-check text-primary mt-1 mr-2"></i>
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Link href={`/purchase?product=${productId}`}>
          <button className={`${buttonClass} text-white font-bold w-full py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105`}>
            Buy Now
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default PricingSection;
