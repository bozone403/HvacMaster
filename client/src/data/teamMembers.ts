import { TeamMember } from "@/types";

export const fieldTeam: TeamMember[] = [
  {
    id: "jordan",
    name: "Jordan Boisclair",
    title: "Owner, Lead Field Technician",
    bio: "Veteran HVAC/R expert with Red Seal certifications and a reputation for clean installs, surgical diagnostics, and rock-solid client relationships.",
    imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "earl",
    name: "Earl MacRae",
    title: "Co-Founder, Code Compliance Commander",
    bio: "40+ years of trade wisdom. Expert in gas fitting, sheet metal, and code enforcement. Keeps our installs bulletproof and our techs razor-sharp.",
    imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "derek",
    name: "Derek Thompson",
    title: "Senior Service Technician",
    bio: "Goodman specialist and retrofit wizard. Fast, clean, and highly respected by homeowners and contractors alike.",
    imageSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  }
];

export const aiTeam: TeamMember[] = [
  {
    id: "penny",
    name: "Penny Ledger",
    title: "Admin & Invoicing Manager",
    bio: "Handles quotes, payments, job costing, WCB records, and makes sure we get paid on time — every time.",
    imageSrc: "",
    isAI: true
  },
  {
    id: "rosie",
    name: "Rosie Flow",
    title: "Client Dispatch & Scheduler",
    bio: "The voice behind the phone. Books appointments, handles reminders, and keeps our day tight.",
    imageSrc: "",
    isAI: true
  },
  {
    id: "ty",
    name: "Ty the Tech Whisperer",
    title: "Remote Field Support",
    bio: "Diagnoses systems live, confirms part numbers, and keeps our techs armed with manuals, SOPs, and specs.",
    imageSrc: "",
    isAI: true
  },
  {
    id: "nash",
    name: "Nash Sparks",
    title: "Electrical & Controls Specialist",
    bio: "Designs zoning layouts, solves thermostat nightmares, and wires smarter than most journeymen.",
    imageSrc: "",
    isAI: true
  }
];
