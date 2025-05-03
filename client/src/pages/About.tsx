import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { fieldTeam, aiTeam } from "@/data/teamMembers";

const About = () => {
  const [activeTab, setActiveTab] = useState<'field' | 'ai'>('field');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-black relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black to-black/90 z-10" />
            <div className="absolute inset-0 bg-black opacity-80" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                About <span className="text-primary">AfterHours HVAC</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Alberta's elite HVAC service provider, delivering expert-level heating, cooling, ventilation, 
                and mechanical solutions with unmatched precision — even when the other guys call it a day.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => setActiveTab('field')} 
                  className={`px-6 py-3 rounded-full font-bold transition-colors duration-300 ${activeTab === 'field' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  Field Operations Team
                </button>
                <button 
                  onClick={() => setActiveTab('ai')} 
                  className={`px-6 py-3 rounded-full font-bold transition-colors duration-300 ${activeTab === 'ai' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  AI Support Staff
                </button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Company Overview */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6 text-white">
                  What Sets Us <span className="text-primary">Apart</span>
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-clock text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Emergency-Ready Service</h3>
                      <p className="text-gray-400">
                        We operate after hours, weekends, and holidays — because breakdowns don't wait for 9 to 5.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-certificate text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Code-Tight Installations</h3>
                      <p className="text-gray-400">
                        Every system we touch is installed to National Building Code, CSA B149.1, CEC, and NPC compliance — no shortcuts, ever.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-user-graduate text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Apprentice-Driven Legacy</h3>
                      <p className="text-gray-400">
                        We're not just fixing systems — we're building tradesmen and raising the standard for HVAC in Canada.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="relative p-1 bg-gradient-to-br from-primary via-gray-800 to-gray-900 rounded-lg"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
                  {/* Replace with an actual image of your work */}
                  <img 
                    src="/images/team/jordan-profile.jpg" 
                    alt="AfterHours HVAC Team" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-primary text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg">
                  <span>Est. 2023</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Team Section - Dynamic based on tab selection */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Meet Our <span className="text-primary">Team</span>
            </h2>
            
            {/* Field Team */}
            {activeTab === 'field' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {fieldTeam.map((member, index) => (
                  <TeamMemberCard 
                    key={member.id}
                    member={member}
                    index={index}
                  />
                ))}
              </div>
            )}
            
            {/* AI Team */}
            {activeTab === 'ai' && (
              <div>
                <div className="text-center mb-10">
                  <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                    Our AI-driven support staff works 24/7 behind the scenes, providing unmatched service, 
                    precision documentation, and intelligent dispatch to keep operations running smoothly.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {aiTeam.map((member, index) => (
                    <TeamMemberCard 
                      key={member.id}
                      member={member}
                      index={index}
                      isCompact
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Our <span className="text-primary">Values</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                At AfterHours HVAC, our core values guide everything we do
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                className="bg-black p-6 rounded-xl shadow-lg border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-tools text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Excellence</h3>
                <p className="text-gray-400">
                  We maintain the highest standards in every install and repair, with no exceptions or shortcuts.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-black p-6 rounded-xl shadow-lg border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-shield-alt text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Integrity</h3>
                <p className="text-gray-400">
                  We do what we say, when we say we'll do it, with complete transparency and honesty.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-black p-6 rounded-xl shadow-lg border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-fire-alt text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Reliability</h3>
                <p className="text-gray-400">
                  We're there when others aren't, providing emergency service when comfort matters most.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-black p-6 rounded-xl shadow-lg border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-graduation-cap text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Education</h3>
                <p className="text-gray-400">
                  We continuously train our team and educate our clients about their systems for optimal performance.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary to-red-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to Experience the AfterHours Difference?
            </h2>
            <p className="text-white text-lg mb-8 max-w-3xl mx-auto">
              Join our family of satisfied customers across Alberta. We're standing by to deliver the quality HVAC service you deserve.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/booking" 
                className="bg-white hover:bg-gray-100 text-primary font-bold px-8 py-3 rounded-full transition duration-300 transform hover:scale-105"
              >
                Schedule a Service
              </a>
              <a 
                href="/contact" 
                className="bg-black hover:bg-gray-900 text-white font-bold px-8 py-3 rounded-full transition duration-300 transform hover:scale-105"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

type TeamMemberCardProps = {
  member: {
    id: string;
    name: string;
    title: string;
    bio: string;
    imageSrc: string;
    isAI?: boolean;
  };
  index: number;
  isCompact?: boolean;
};

const TeamMemberCard = ({ member, index, isCompact = false }: TeamMemberCardProps) => {
  return (
    <motion.div
      className={`bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg ${isCompact ? '' : 'flex flex-col'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className={`${isCompact ? 'h-48' : 'h-64'} relative overflow-hidden`}>
        <img 
          src={member.imageSrc} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          onError={(e) => {
            // Fallback to placeholder on image load error
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=dc2626&color=fff&size=256`;
          }}
        />
        {member.isAI && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded-full">
            AI
          </div>
        )}
      </div>
      
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
        <p className="text-primary font-medium mb-3">{member.title}</p>
        
        {!isCompact && (
          <p className="text-gray-400">{member.bio}</p>
        )}
      </div>
    </motion.div>
  );
};

export default About;
