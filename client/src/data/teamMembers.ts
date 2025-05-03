// Type definitions
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageSrc: string;
  isAI?: boolean;
}

// Field Operations Team
export const fieldTeam: TeamMember[] = [
  {
    id: 'jordan',
    name: 'Jordan Boisclair',
    title: 'Owner, Lead Field Technician',
    bio: 'Veteran HVAC/R expert with Red Seal certifications and a reputation for clean installs, surgical diagnostics, and rock-solid client relationships.',
    imageSrc: '/images/team/jordan-profile.jpg'
  },
  {
    id: 'earl',
    name: 'Earl MacRae',
    title: 'Co-Founder, Code Compliance Commander',
    bio: '40+ years of trade wisdom. Expert in gas fitting, sheet metal, and code enforcement. Keeps our installs bulletproof and our techs razor-sharp.',
    imageSrc: '/images/team/earl-profile.jpg'
  },
  {
    id: 'derek',
    name: 'Derek Thompson',
    title: 'Senior Service Technician',
    bio: 'Goodman specialist and retrofit wizard. Fast, clean, and highly respected by homeowners and contractors alike.',
    imageSrc: '/images/team/derek-profile.jpg'
  }
];

// AI Support Team
export const aiTeam: TeamMember[] = [
  {
    id: 'penny',
    name: 'Penny Ledger',
    title: 'Admin & Invoicing Manager',
    bio: 'Handles quotes, payments, job costing, WCB records, and makes sure we get paid on time — every time.',
    imageSrc: '/images/team/penny-profile.jpg',
    isAI: true
  },
  {
    id: 'rosie',
    name: 'Rosie Flow',
    title: 'Client Dispatch & Scheduler',
    bio: 'The voice behind the phone. Books appointments, handles reminders, and keeps our day tight.',
    imageSrc: '/images/team/rosie-profile.jpg',
    isAI: true
  },
  {
    id: 'ty',
    name: 'Ty the Tech Whisperer',
    title: 'Remote Field Support',
    bio: 'Diagnoses systems live, confirms part numbers, and keeps our techs armed with manuals, SOPs, and specs.',
    imageSrc: '/images/team/ty-profile.jpg',
    isAI: true
  },
  {
    id: 'nash',
    name: 'Nash Sparks',
    title: 'Electrical & Controls Specialist',
    bio: 'Designs zoning layouts, solves thermostat nightmares, and wires smarter than most journeymen.',
    imageSrc: '/images/team/nash-profile.jpg',
    isAI: true
  },
  {
    id: 'cassie',
    name: 'Cassie Code',
    title: 'Permits & Regulatory Oversight',
    bio: 'Our code queen. Ensures all installs pass inspection and stay compliant with Alberta and BC codes.',
    imageSrc: '/images/team/cassie-profile.jpg',
    isAI: true
  },
  {
    id: 'bigred',
    name: 'Big Red',
    title: 'Marketing & Reputation Manager',
    bio: 'Runs digital campaigns, Google My Business optimization, seasonal promos, and referral engines.',
    imageSrc: '/images/team/bigred-profile.jpg',
    isAI: true
  },
  {
    id: 'mac',
    name: 'Mac Drafton',
    title: 'Ductwork & Load Calc Engineer',
    bio: 'Designs airflow systems, return sizing, and static pressure layouts to maximize comfort and system longevity.',
    imageSrc: '/images/team/mac-profile.jpg',
    isAI: true
  },
  {
    id: 'mona',
    name: 'Mona Grit',
    title: 'Safety & Apprenticeship Officer',
    bio: 'Maintains safety compliance, PPE standards, COR documentation, and apprentice tracking.',
    imageSrc: '/images/team/mona-profile.jpg',
    isAI: true
  },
  {
    id: 'chuck',
    name: 'Chuck Ledger',
    title: 'Estimator & Profit Analyst',
    bio: 'Builds profitable quotes, material forecasts, and ensures no job goes out underpriced.',
    imageSrc: '/images/team/chuck-profile.jpg',
    isAI: true
  },
  {
    id: 'lynx',
    name: 'Lynx',
    title: 'Legal Operations & Risk Management',
    bio: 'Drafts contracts, enforces lien rights, and protects AfterHours HVAC from sketchy clients and late payments.',
    imageSrc: '/images/team/lynx-profile.jpg',
    isAI: true
  }
];
