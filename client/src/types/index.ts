export interface ServiceRequest {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  createdAt?: Date;
}

export interface EmergencyRequest {
  id?: string;
  name: string;
  phone: string;
  issueType: string;
  description: string;
  createdAt?: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  imageSrc: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  price: string;
  detailsLink: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageSrc: string;
  isAI?: boolean;
}

export interface MaintenancePlan {
  id: string;
  name: string;
  price: number;
  color: string;
  popular?: boolean;
  features: string[];
}

export interface BookingDetails {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}
