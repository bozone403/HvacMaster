import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  isEmergency: boolean;
}

const serviceOptions = [
  { value: 'furnace', label: 'Premium Furnace Installation' },
  { value: 'ac', label: 'Elite AC Systems' },
  { value: 'boiler', label: 'Luxury Hydronic Heating' },
  { value: 'ductwork', label: 'Advanced Air Distribution' },
  { value: 'maintenance', label: 'Precision Maintenance Program' },
  { value: 'emergency', label: '24/7 Emergency Resolution' },
  { value: 'commercial', label: 'Commercial Sheet Metal Mastery' },
  { value: 'consulting', label: 'Expert HVAC Consultation ($350/hr)' },
  { value: 'roughin', label: 'New Construction Excellence' },
  { value: 'airquality', label: 'Hospital-Grade Air Purification' },
  { value: 'other', label: 'Custom Solutions' }
];

const contactInfo = [
  {
    icon: 'fa-phone-alt',
    title: 'Direct Line',
    content: '(403) 613-6014',
    link: 'tel:+14036136014',
    subtitle: 'Expert response 24/7 for urgent situations'
  },
  {
    icon: 'fa-envelope',
    title: 'Professional Inquiries',
    content: 'service@afterhourshvac.ca',
    link: 'mailto:service@afterhourshvac.ca',
    subtitle: 'Premium quotes & personalized solutions'
  },
  {
    icon: 'fa-map-marker-alt',
    title: 'Service Coverage',
    content: 'Calgary, Lethbridge to Edmonton, Greater Vancouver Area',
    subtitle: 'Exclusive service throughout Western Canada'
  },
  {
    icon: 'fa-clock',
    title: 'Availability',
    content: 'Standard Operations: 8AM - 5PM, Monday - Friday',
    subtitle: 'Elite Emergency Response: 24/7/365'
  }
];

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: '',
      message: '',
      isEmergency: false
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/contact', data);
      
      toast({
        title: "Message sent successfully",
        description: data.isEmergency 
          ? "We'll contact you immediately regarding your emergency." 
          : "We'll get back to you as soon as possible.",
        variant: "default",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or call us directly at (403) 613-6014",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-darkgray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-wider uppercase">Exclusive Access</span>
          <h2 className="text-4xl font-bold mt-2 mb-4 leading-tight">Direct Line to Alberta's Master HVAC Engineer</h2>
          <p className="text-lightgray text-lg">Stop settling for average contractors. Connect directly with Western Canada's most respected HVAC specialist for expert consultations and priority solutions that <span className="text-white font-medium">deliver measurable results other companies simply can't match.</span></p>
        </div>
        
        <div className="bg-dark p-6 md:p-8 rounded-lg max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="contact-name">Your Name</label>
                    <input 
                      type="text" 
                      id="contact-name"
                      className={`w-full bg-darkgray border ${errors.name ? 'border-red-500' : 'border-lightgray'} rounded-md px-4 py-3 focus:border-primary focus:outline-none`}
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="contact-phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="contact-phone"
                      className={`w-full bg-darkgray border ${errors.phone ? 'border-red-500' : 'border-lightgray'} rounded-md px-4 py-3 focus:border-primary focus:outline-none`}
                      {...register('phone', { 
                        required: 'Phone number is required',
                        pattern: {
                          value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                          message: 'Please enter a valid phone number'
                        } 
                      })}
                    />
                    {errors.phone && <p className="mt-1 text-red-500 text-xs">{errors.phone.message}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="contact-email">Email Address</label>
                  <input 
                    type="email" 
                    id="contact-email"
                    className={`w-full bg-darkgray border ${errors.email ? 'border-red-500' : 'border-lightgray'} rounded-md px-4 py-3 focus:border-primary focus:outline-none`}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                  />
                  {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="contact-service">Service Interested In</label>
                  <select 
                    id="contact-service"
                    className={`w-full bg-darkgray border ${errors.service ? 'border-red-500' : 'border-lightgray'} rounded-md px-4 py-3 focus:border-primary focus:outline-none`}
                    {...register('service', { required: 'Please select a service' })}
                  >
                    <option value="" disabled>Select a service...</option>
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  {errors.service && <p className="mt-1 text-red-500 text-xs">{errors.service.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="contact-message">Your Message</label>
                  <textarea 
                    id="contact-message"
                    rows={4}
                    className={`w-full bg-darkgray border ${errors.message ? 'border-red-500' : 'border-lightgray'} rounded-md px-4 py-3 focus:border-primary focus:outline-none`}
                    {...register('message', { required: 'Please enter your message' })}
                  ></textarea>
                  {errors.message && <p className="mt-1 text-red-500 text-xs">{errors.message.message}</p>}
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="emergency-contact" 
                    className="mr-2"
                    {...register('isEmergency')}
                  />
                  <label htmlFor="emergency-contact">This is an emergency - I need service ASAP</label>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-red-700 text-white font-bold py-4 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i> Send Message
                    </>
                  )}
                </button>
                
                <p className="text-xs text-lightgray text-center">
                  Average response time: <span className="text-primary font-bold">Under 2 hours</span> during business hours, <span className="text-primary font-bold">Under 30 minutes</span> for emergencies
                </p>
              </form>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-darkgray p-6 rounded-lg h-full">
                <h3 className="text-xl font-heading font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-4 mt-1">
                        <i className={`fas ${item.icon} text-dark`}></i>
                      </div>
                      <div>
                        <p className="font-bold mb-1">{item.title}</p>
                        {item.link ? (
                          <a href={item.link} className="text-primary font-bold hover:text-red-600 transition duration-300 hover:scale-105 inline-block">{item.content}</a>
                        ) : (
                          <p className="text-lightgray">{item.content}</p>
                        )}
                        {item.subtitle && (
                          <p className="text-lightgray text-sm">{item.subtitle}</p>
                        )}
                        {item.title === 'Hours' && (
                          <p className="text-primary font-bold">Emergency: 24/7/365</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-lightgray border-opacity-20">
                  <h4 className="font-bold mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="h-10 w-10 rounded-full bg-darkgray border border-lightgray flex items-center justify-center hover:border-primary transition">
                      <i className="fab fa-facebook-f text-lightgray hover:text-primary transition"></i>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-darkgray border border-lightgray flex items-center justify-center hover:border-primary transition">
                      <i className="fab fa-instagram text-lightgray hover:text-primary transition"></i>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-darkgray border border-lightgray flex items-center justify-center hover:border-primary transition">
                      <i className="fab fa-linkedin-in text-lightgray hover:text-primary transition"></i>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-darkgray border border-lightgray flex items-center justify-center hover:border-primary transition">
                      <i className="fab fa-youtube text-lightgray hover:text-primary transition"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
