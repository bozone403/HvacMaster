import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface EmergencyFormData {
  name: string;
  phone: string;
  location: string;
  issue: string;
}

const EmergencyForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<EmergencyFormData>({
    defaultValues: {
      name: '',
      phone: '',
      location: '',
      issue: ''
    }
  });

  const onSubmit = async (data: EmergencyFormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/emergency', data);
      
      toast({
        title: "Priority Emergency Request Confirmed",
        description: "Your case has been escalated to our emergency response team. A master technician will contact you within minutes.",
        variant: "default",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error submitting request",
        description: "Please try calling us directly at (403) 555-0123",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="emergency-form" className="bg-darkgray py-12">
      <div className="container mx-auto px-4">
        <div className="bg-dark p-6 md:p-8 rounded-lg border border-lightgray max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="bg-primary inline-block px-3 py-1 rounded-md mb-4">
                <span className="text-dark font-bold text-sm flex items-center">
                  <i className="fas fa-bolt mr-1"></i> PRIORITY EMERGENCY RESPONSE
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4 leading-tight">
                When Others Can't Help, We're Already On The Way
              </h2>
              <p className="text-lightgray mb-6 text-lg">
                While other companies leave you waiting, our elite emergency team is mobilizing now. Direct access to Alberta's most qualified HVAC expert for critical situations.
              </p>
              
              <div className="bg-darkgray p-5 rounded-md mb-6 border border-primary/20">
                <div className="flex items-center mb-3">
                  <i className="fas fa-shield-alt text-primary mr-3 text-lg"></i>
                  <span className="font-semibold">Guaranteed same-day resolution</span>
                </div>
                <div className="flex items-center mb-3">
                  <i className="fas fa-truck-loading text-primary mr-3 text-lg"></i>
                  <span className="font-semibold">Fully-stocked emergency vehicles</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-user-md text-primary mr-3 text-lg"></i>
                  <span className="font-semibold">Master-level technicians on call</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center mr-4 shadow-lg shadow-primary/30">
                  <i className="fas fa-headset text-dark text-xl"></i>
                </div>
                <div>
                  <p className="font-semibold text-white">VIP Emergency Direct Line</p>
                  <a href="tel:+14036136014" className="text-primary font-bold text-xl hover:text-red-600 transition duration-300 hover:translate-x-1 inline-block">(403) 613-6014</a>
                  <p className="text-xs text-lightgray mt-1">Direct access to owner - immediate response</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="emergency-name">Your Name</label>
                  <input 
                    type="text" 
                    id="emergency-name"
                    className={`w-full bg-darkgray border ${errors.name ? 'border-red-500' : 'border-lightgray'} rounded-md px-4 py-3 focus:border-primary focus:outline-none`}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="emergency-phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="emergency-phone"
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
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="emergency-location">Location in Calgary</label>
                  <input 
                    type="text" 
                    id="emergency-location"
                    placeholder="Your neighborhood"
                    className={`w-full bg-darkgray border ${errors.location ? 'border-red-500' : 'border-lightgray'} rounded-md px-4 py-3 focus:border-primary focus:outline-none`}
                    {...register('location', { required: 'Location is required' })}
                  />
                  {errors.location && <p className="mt-1 text-red-500 text-xs">{errors.location.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="emergency-issue">Describe Your Emergency</label>
                  <textarea 
                    id="emergency-issue"
                    rows={3}
                    className={`w-full bg-darkgray border ${errors.issue ? 'border-red-500' : 'border-lightgray'} rounded-md px-4 py-3 focus:border-primary focus:outline-none`}
                    {...register('issue', { required: 'Please describe your emergency' })}
                  ></textarea>
                  {errors.issue && <p className="mt-1 text-red-500 text-xs">{errors.issue.message}</p>}
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
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-bolt mr-2"></i> Dispatch Technician Now
                    </>
                  )}
                </button>
                
                <p className="text-xs text-lightgray text-center">
                  Average response time: <span className="text-primary font-bold">37 minutes</span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyForm;
