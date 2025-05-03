import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface QuoteFormData {
  serviceType: string;
  homeSize: string;
  systemEfficiency: string;
  propertyType: string;
  additionalDetails: string;
  name: string;
  phone: string;
}

interface QuoteResult {
  price: string;
  details: string;
}

const QuoteCalculator: React.FC = () => {
  const [showResult, setShowResult] = useState(false);
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<QuoteFormData>({
    defaultValues: {
      serviceType: '',
      homeSize: '',
      systemEfficiency: '',
      propertyType: '',
      additionalDetails: '',
      name: '',
      phone: ''
    }
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest('POST', '/api/quote', data);
      const result = await response.json();
      
      setQuoteResult(result);
      setShowResult(true);
      
      // Don't reset the form so user can see their inputs
    } catch (error) {
      toast({
        title: "Error calculating quote",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReviseQuote = () => {
    setShowResult(false);
  };

  return (
    <section id="quote-calculator" className="py-16 bg-darkgray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold">GET STARTED</span>
          <h2 className="text-4xl font-heading font-bold mt-2 mb-4">Instant Quote Calculator</h2>
          <p className="text-lightgray">Get an approximate price for your HVAC project. For precise quotes, our team will conduct a thorough assessment.</p>
        </div>
        
        <div className="bg-dark p-6 md:p-8 rounded-lg max-w-4xl mx-auto">
          {!showResult ? (
            <form id="quote-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="service-type">Service Type</label>
                  <select 
                    id="service-type"
                    className={`w-full bg-darkgray border ${errors.serviceType ? 'border-red-500' : 'border-lightgray'} rounded-md px-4 py-3 focus:border-primary focus:outline-none`}
                    {...register('serviceType', { required: 'Please select a service type' })}
                  >
                    <option value="" disabled>Select a service...</option>
                    <option value="furnace">Furnace Installation</option>
                    <option value="ac">AC Installation</option>
                    <option value="combo">Furnace + AC Combo</option>
                    <option value="boiler">Boiler System</option>
                    <option value="ductless">Ductless Mini-Split</option>
                    <option value="repair">Repair Service</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="other">Other Service</option>
                  </select>
                  {errors.serviceType && <p className="mt-1 text-red-500 text-xs">{errors.serviceType.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="home-size">Home Size</label>
                  <select 
                    id="home-size"
                    className={`w-full bg-darkgray border ${errors.homeSize ? 'border-red-500' : 'border-lightgray'} rounded-md px-4 py-3 focus:border-primary focus:outline-none`}
                    {...register('homeSize', { required: 'Please select your home size' })}
                  >
                    <option value="" disabled>Select home size...</option>
                    <option value="small">Small (&lt; 1,200 sq ft)</option>
                    <option value="medium">Medium (1,200 - 2,000 sq ft)</option>
                    <option value="large">Large (2,000 - 3,000 sq ft)</option>
                    <option value="xl">Extra Large (3,000+ sq ft)</option>
                  </select>
                  {errors.homeSize && <p className="mt-1 text-red-500 text-xs">{errors.homeSize.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="system-efficiency">System Efficiency</label>
                  <select 
                    id="system-efficiency"
                    className={`w-full bg-darkgray border ${errors.systemEfficiency ? 'border-red-500' : 'border-lightgray'} rounded-md px-4 py-3 focus:border-primary focus:outline-none`}
                    {...register('systemEfficiency', { required: 'Please select an efficiency level' })}
                  >
                    <option value="" disabled>Select efficiency level...</option>
                    <option value="standard">Standard High-Efficiency</option>
                    <option value="premium">Premium High-Efficiency</option>
                    <option value="ultimate">Ultimate Performance</option>
                  </select>
                  {errors.systemEfficiency && <p className="mt-1 text-red-500 text-xs">{errors.systemEfficiency.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="property-type">Property Type</label>
                  <select 
                    id="property-type"
                    className={`w-full bg-darkgray border ${errors.propertyType ? 'border-red-500' : 'border-lightgray'} rounded-md px-4 py-3 focus:border-primary focus:outline-none`}
                    {...register('propertyType', { required: 'Please select your property type' })}
                  >
                    <option value="" disabled>Select property type...</option>
                    <option value="single-family">Single Family Home</option>
                    <option value="condo">Condo/Apartment</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="commercial">Light Commercial</option>
                  </select>
                  {errors.propertyType && <p className="mt-1 text-red-500 text-xs">{errors.propertyType.message}</p>}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" htmlFor="additional-details">Additional Details</label>
                <textarea 
                  id="additional-details"
                  rows={3}
                  className="w-full bg-darkgray border border-lightgray rounded-md px-4 py-3 focus:border-primary focus:outline-none"
                  placeholder="Any specific requirements or questions?"
                  {...register('additionalDetails')}
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="quote-name">Your Name</label>
                  <input 
                    type="text" 
                    id="quote-name"
                    className={`w-full bg-darkgray border ${errors.name ? 'border-red-500' : 'border-lightgray'} rounded-md px-4 py-3 focus:border-primary focus:outline-none`}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="quote-phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="quote-phone"
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
                    <i className="fas fa-calculator mr-2"></i> Calculate My Quote
                  </>
                )}
              </button>
            </form>
          ) : (
            <div id="quote-result" className="mt-8 p-6 bg-darkgray rounded-lg border border-primary">
              <h3 className="text-xl font-heading font-bold mb-3">Your Estimated Quote</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-primary" id="quote-price">
                  {quoteResult?.price || '$6,499'}
                </span>
                <span className="text-lightgray text-sm ml-2">Approximate starting price</span>
              </div>
              <p className="text-lightgray mb-4">
                {quoteResult?.details || 'This is an approximate starting price based on your selections. For a precise quote, one of our technicians will need to assess your specific requirements.'}
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <a 
                  href="#contact" 
                  className="bg-primary hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
                >
                  <i className="fas fa-calendar-alt mr-2"></i> Schedule a Free Assessment
                </a>
                <button 
                  onClick={handleReviseQuote}
                  className="bg-dark border-2 border-lightgray hover:border-light text-light font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
                >
                  <i className="fas fa-edit mr-2"></i> Revise Quote
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuoteCalculator;
