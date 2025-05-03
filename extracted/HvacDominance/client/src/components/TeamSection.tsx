import React from 'react';

// Import team photos
import jordanPhoto from '@assets/484096665_1163158445192690_8075246581175071232_n.jpg';

interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
  socialLinks?: {
    linkedin?: string;
    email?: string;
  };
}

interface AiTeamMember {
  name: string;
  title: string;
  description: string;
  style?: string;
  tools?: string;
}

const fieldTeam: TeamMember[] = [
  {
    name: 'Jordan Boisclair',
    title: 'Owner, Lead Field Technician',
    description: 'Veteran HVAC/R expert with Red Seal certifications and a reputation for clean installs, surgical diagnostics, and rock-solid client relationships.',
    image: jordanPhoto,
    socialLinks: {
      linkedin: '#',
      email: 'jordan@afterhourshvac.ca'
    }
  },
  {
    name: 'Earl MacRae',
    title: 'Co-Founder, Code Compliance Commander',
    description: '40+ years of trade wisdom. Expert in gas fitting, sheet metal, and code enforcement. Keeps our installs bulletproof and our techs razor-sharp.',
    image: 'https://images.unsplash.com/photo-1551727028-e7b68aee5827?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    socialLinks: {
      linkedin: '#',
      email: 'earl@afterhourshvac.ca'
    }
  },
  {
    name: 'Derek Thompson',
    title: 'Senior Service Technician',
    description: 'Goodman specialist and retrofit wizard. Fast, clean, and highly respected by homeowners and contractors alike.',
    image: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    socialLinks: {
      linkedin: '#',
      email: 'derek@afterhourshvac.ca'
    }
  }
];

const aiTeam: AiTeamMember[] = [
  {
    name: 'Penny Ledger',
    title: 'Bookkeeper & Admin Manager',
    description: 'Creates invoices, tracks payments, logs WCB records, ensures CRA compliance.',
    tools: 'Stripe, QuickBooks, Jobber integration',
    style: 'Sharp, organized, zero tolerance for missed receipts.'
  },
  {
    name: 'Rosie Flow',
    title: 'Client Dispatcher & CRM Manager',
    description: 'Schedules appointments, handles follow-ups, manages reminders and job calendar entries.',
    style: 'Friendly, fast-talker, the voice that gets us booked solid.'
  },
  {
    name: 'Ty the Tech Whisperer',
    title: 'Remote Diagnostic Assistant',
    description: 'Helps techs during jobs by pulling manuals, wiring diagrams, sequences, part #s, and confirming procedures.',
    style: 'Fast-twitch, AI-enhanced apprentice with a manual in his mind.'
  },
  {
    name: 'Nash Sparks',
    title: 'Electrical & Controls Specialist',
    description: 'Handles wiring logic, ECM motor issues, zone control systems, and high/low-voltage safety.',
    style: 'Calm, clinical, circuit board wizard.'
  },
  {
    name: 'Cassie Code',
    title: 'Code Compliance & Permit Officer',
    description: 'Interprets NBC, CEC, NPC, CSA B149.1. Files permits, handles inspection prep, ensures all installs are legal and tight.',
    style: 'Laser-focused, precise, no corner-cutting.'
  },
  {
    name: 'Big Red',
    title: 'Marketing & Client Retention Lead',
    description: 'Runs Google My Business, digital ads, seasonal promos, referral campaigns, and review pushes.',
    style: 'Straight-shooter, branding beast.'
  },
  {
    name: 'Mac Drafton',
    title: 'Ductwork & System Design Engineer',
    description: 'Designs airflow systems, static pressure balancing, return optimization, and load calc support.',
    style: 'Drafts clean, builds quiet, measures twice.'
  },
  {
    name: 'Mona Grit',
    title: 'Safety & HR Compliance Officer',
    description: 'Tracks COR safety paperwork, PPE logs, apprentice status, onboarding forms, and jobsite compliance.',
    style: 'Stern but fair — protects the crew and the company.'
  },
  {
    name: 'Chuck Ledger',
    title: 'Estimator & Profit Guardian',
    description: 'Builds quotes, estimates time/materials, tracks margin per job, forecasts overhead.',
    style: 'Spreadsheet-samurai with street sense.'
  },
  {
    name: 'Lynx',
    title: 'Legal Ops & Risk Manager',
    description: 'Preps lien claims, tracks disputes, manages contracts, protects AfterHours from shady clients.',
    style: 'Silent assassin in a suit — legal bulletproofing expert.'
  }
];

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-16 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold">OUR ELITE CREW</span>
          <h2 className="text-4xl font-heading font-bold mt-2 mb-4">Lean, Lethal, Legendary</h2>
          <p className="text-lightgray">Our team combines real-world expertise with AI-powered support for unmatched HVAC service in Calgary.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {fieldTeam.map((member, index) => (
            <div key={index} className="bg-darkgray rounded-lg overflow-hidden transition-transform hover:scale-105">
              <div 
                className="h-64 bg-cover bg-center" 
                style={{ backgroundImage: `url('${member.image}')` }}
                aria-label={`${member.name}'s photo`}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-bold mb-3">{member.title}</p>
                <p className="text-lightgray mb-4">{member.description}</p>
                
                {member.socialLinks && (
                  <div className="flex space-x-3">
                    {member.socialLinks.linkedin && (
                      <a href={member.socialLinks.linkedin} className="text-lightgray hover:text-primary transition">
                        <i className="fab fa-linkedin text-xl"></i>
                      </a>
                    )}
                    {member.socialLinks.email && (
                      <a href={`mailto:${member.socialLinks.email}`} className="text-lightgray hover:text-primary transition">
                        <i className="fas fa-envelope text-xl"></i>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* AI Support Team */}
        <div className="bg-darkgray rounded-lg overflow-hidden p-8 md:p-12">
          <div className="text-center mb-12">
            <span className="text-primary font-bold">AI-DRIVEN SUPPORT STAFF</span>
            <h3 className="text-3xl font-heading font-bold mt-2 mb-4">Digital Crew Running 24/7 Ops Behind the Scenes</h3>
            <p className="text-lightgray max-w-3xl mx-auto">Our AI team ensures perfect documentation, scheduling, and technical support so our technicians can focus on delivering excellence.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {aiTeam.map((member, index) => (
              <div key={index} className="bg-dark p-5 rounded-lg border-l-4 border-primary hover:border-primary-600 transition-all hover:translate-y-[-5px]">
                <div className="flex items-center mb-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3">
                    <i className="fas fa-robot"></i>
                  </div>
                  <h4 className="font-bold">{member.name}</h4>
                </div>
                <p className="text-primary text-sm font-semibold mb-2">{member.title}</p>
                <p className="text-lightgray text-sm mb-3">{member.description}</p>
                {member.style && (
                  <div className="pt-2 border-t border-gray-700">
                    <p className="text-xs text-gray-400 italic">"{member.style}"</p>
                  </div>
                )}
                {member.tools && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {member.tools.split(', ').map((tool, i) => (
                      <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{tool}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
