import { motion } from 'framer-motion';

type Certification = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

type Award = {
  id: string;
  name: string;
  year: string;
  organization: string;
  description: string;
};

type PartnerLogo = {
  id: string;
  name: string;
  logo: string;
  tier?: 'platinum' | 'gold' | 'silver';
};

const certifications: Certification[] = [
  {
    id: 'cert-1',
    name: 'NATE Certified Technicians',
    icon: '/certifications/nate.svg',
    description: 'North American Technician Excellence certification represents the highest standard in HVAC service and installation proficiency.'
  },
  {
    id: 'cert-2',
    name: 'ENERGY STAR Partner',
    icon: '/certifications/energy-star.svg',
    description: 'Authorized to install ENERGY STAR certified equipment that meets strict energy efficiency guidelines set by the EPA.'
  },
  {
    id: 'cert-3',
    name: 'BBB A+ Rating',
    icon: '/certifications/bbb.svg',
    description: 'Highest rating from the Better Business Bureau demonstrating our commitment to resolving customer issues.'
  },
  {
    id: 'cert-4',
    name: 'AHRI Certified',
    icon: '/certifications/ahri.svg',
    description: 'We install equipment certified by the Air Conditioning, Heating & Refrigeration Institute to ensure performance claims are verified.'
  }
];

const awards: Award[] = [
  {
    id: 'award-1',
    name: 'Best of Calgary',
    year: '2023',
    organization: 'Calgary Choice Awards',
    description: 'Voted #1 HVAC Service Provider in Calgary for outstanding service and customer satisfaction.'
  },
  {
    id: 'award-2',
    name: 'Energy Efficiency Leader',
    year: '2023',
    organization: 'Alberta Sustainability Council',
    description: 'Recognized for promoting and installing high-efficiency HVAC systems across Alberta.'
  },
  {
    id: 'award-3',
    name: 'Customer Service Excellence',
    year: '2022',
    organization: 'HomeStars',
    description: 'Top-rated HVAC company based on verified customer reviews and satisfaction metrics.'
  }
];

const partners: PartnerLogo[] = [
  {
    id: 'partner-1',
    name: 'Carrier',
    logo: '/partners/carrier.svg',
    tier: 'platinum'
  },
  {
    id: 'partner-2',
    name: 'Lennox',
    logo: '/partners/lennox.svg',
    tier: 'gold'
  },
  {
    id: 'partner-3',
    name: 'Trane',
    logo: '/partners/trane.svg',
    tier: 'platinum'
  },
  {
    id: 'partner-4',
    name: 'Rheem',
    logo: '/partners/rheem.svg',
    tier: 'gold'
  },
  {
    id: 'partner-5',
    name: 'Mitsubishi Electric',
    logo: '/partners/mitsubishi.svg',
    tier: 'silver'
  },
  {
    id: 'partner-6',
    name: 'Honeywell',
    logo: '/partners/honeywell.svg',
    tier: 'silver'
  }
];

export default function AuthorityIndicators() {
  const getTierColor = (tier?: string) => {
    switch(tier) {
      case 'platinum': return 'bg-gradient-to-r from-indigo-200 to-purple-300 border-purple-400';
      case 'gold': return 'bg-gradient-to-r from-yellow-100 to-amber-200 border-amber-300';
      case 'silver': return 'bg-gradient-to-r from-gray-200 to-gray-300 border-gray-400';
      default: return 'bg-gray-800 border-gray-700';
    }
  };
  
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Alberta's Most Trusted HVAC Experts</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our qualifications, certifications, and industry recognition demonstrate our commitment to excellence in HVAC service and installation.
          </p>
        </motion.div>
        
        {/* Certifications Section */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Our Professional Certifications</h3>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div 
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center h-full"
              >
                {/* Using placeholder icons until SVGs are provided */}
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary text-xl font-bold">{cert.name.substring(0, 2)}</span>
                </div>
                <h4 className="text-white font-bold mb-2">{cert.name}</h4>
                <p className="text-gray-400 text-sm">{cert.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Awards Section */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Industry Recognition</h3>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {awards.map((award, index) => (
              <motion.div 
                key={award.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6 h-full"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary/20 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{award.name}</h4>
                    <p className="text-primary text-sm">{award.year} • {award.organization}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{award.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Manufacturer Partners */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 text-center">Our Manufacturer Partners</h3>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {partners.map((partner, index) => (
              <motion.div 
                key={partner.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`${getTierColor(partner.tier)} border rounded-lg p-4 flex flex-col items-center justify-center h-24`}
              >
                {/* Using placeholder text until logos are provided */}
                <p className="font-bold text-black">{partner.name}</p>
                {partner.tier && (
                  <span className="text-xs mt-1 capitalize">{partner.tier} Partner</span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Comfort Guarantee */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 text-center max-w-3xl mx-auto"
        >
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Our 100% Satisfaction Guarantee</h3>
          <p className="text-gray-300 mb-6">
            If you're not completely satisfied with our service or installation within the first year, we'll make it right at no additional cost to you. That's our promise.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-gray-800 rounded-lg px-4 py-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white">10-Year Parts Warranty</span>
            </div>
            <div className="bg-gray-800 rounded-lg px-4 py-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white">2-Year Labor Warranty</span>
            </div>
            <div className="bg-gray-800 rounded-lg px-4 py-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white">No-Hassle Service</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
