import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { useToast } from "@/hooks/use-toast";

// Define the form schema
const quoteFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  propertyType: z.enum(["residential", "commercial", "multi-family"]),
  serviceType: z.enum(["furnace", "ac", "both", "other"]),
  acTonnage: z.enum(["1.5", "2", "2.5", "3", "3.5", "4", "5"]).optional(),
  buildingSize: z.number().min(500, { message: "Building size is required" }),
  bedroomCount: z.number().min(0),
  bathroomCount: z.number().min(0),
  existingSystem: z.enum(["yes", "no", "unsure"]),
  estimatedAge: z.enum(["new", "1-5", "6-10", "11-15", "16+", "unknown"]).optional(),
  installationTimeframe: z.enum(["asap", "1-month", "3-months", "planning"]),
  budget: z.enum(["economy", "mid-tier", "premium", "unsure"]),
  additionalInfo: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

// System sizing pricing calculator logic
const calculateEstimate = (data: QuoteFormData): {minPrice: number, maxPrice: number, estimatedPrice: number} => {
  // Base prices for furnaces (based on 2025 Calgary pricing guide)
  const furnacePrices = {
    economy: { // Single-Stage 95% AFUE
      min: 4500,
      max: 5500,
      avg: 5000
    },
    'mid-tier': { // Two-Stage 96% AFUE
      min: 5500,
      max: 6500,
      avg: 6000
    },
    premium: { // Modulating/Variable 97%+ AFUE
      min: 6500,
      max: 8000,
      avg: 7250
    },
    unsure: { // Default to mid-tier
      min: 5500,
      max: 6500,
      avg: 6000
    }
  };
  
  // AC prices by tonnage (based on 2025 Calgary pricing guide)
  const acPricesByTonnage = {
    '1.5': {
      min: 5600,
      max: 6500,
      avg: 6050
    },
    '2': {
      min: 6000,
      max: 7200,
      avg: 6600
    },
    '2.5': {
      min: 6400,
      max: 7600,
      avg: 7000
    },
    '3': {
      min: 6800,
      max: 8200,
      avg: 7500
    },
    '3.5': {
      min: 7200,
      max: 8500,
      avg: 7850
    },
    '4': {
      min: 7500,
      max: 8900,
      avg: 8200
    },
    '5': {
      min: 8000,
      max: 9500,
      avg: 8750
    }
  };
  
  // For higher efficiency AC (18 SEER)
  const premiumAcPrice = {
    min: 8600,
    max: 9800,
    avg: 9200
  };
  
  // Service rates for other services (hourly)
  const serviceRates = {
    diagnostic: 175,
    maintenance: 175,
    emergency: 250,
    other: 175
  };
  
  // Variables to calculate 
  let basePrice = 0;
  let estimatedPrice = 0;
  let minPrice = 0;
  let maxPrice = 0;
  
  // Adjustment factors
  let sizeFactor = 0;
  if (data.propertyType === 'residential') {
    sizeFactor = data.buildingSize > 2500 ? 0.5 : 0.3;
  } else if (data.propertyType === 'commercial') {
    sizeFactor = 0.7;
  } else {
    // multi-family
    sizeFactor = 0.6;
  }
  
  // Calculate size adjustment
  const sizeAdjustment = Math.floor(data.buildingSize * sizeFactor);
  
  // Property type adjustments
  const propertyFactor = {
    residential: 1.0,
    commercial: 1.3,
    'multi-family': 1.2
  }[data.propertyType];
  
  // Existing system adjustment
  const existingSystemFactor = {
    yes: 0.9, // discount for replacement
    no: 1.15, // new installation premium
    unsure: 1.0
  }[data.existingSystem];
  
  // Timeframe urgency adjustment
  const timeframeFactor = {
    asap: 1.1,
    '1-month': 1.05,
    '3-months': 1.0,
    planning: 0.95
  }[data.installationTimeframe];
  
  // Handle different service types with updated pricing
  if (data.serviceType === 'furnace') {
    // Get furnace price by budget/tier
    basePrice = furnacePrices[data.budget].avg;
    minPrice = furnacePrices[data.budget].min;
    maxPrice = furnacePrices[data.budget].max;
  } 
  else if (data.serviceType === 'ac') {
    // Use tonnage-specific pricing for AC
    if (data.acTonnage) {
      if (data.budget === 'premium') {
        // For premium, use higher efficiency AC pricing (18 SEER)
        basePrice = premiumAcPrice.avg;
        minPrice = premiumAcPrice.min;
        maxPrice = premiumAcPrice.max;
      } else {
        // Standard efficiency AC prices by tonnage (16 SEER)
        basePrice = acPricesByTonnage[data.acTonnage].avg;
        minPrice = acPricesByTonnage[data.acTonnage].min;
        maxPrice = acPricesByTonnage[data.acTonnage].max;
      }
    }
  } 
  else if (data.serviceType === 'both') {
    // For both furnace and AC, calculate separately and combine
    const furnaceBase = furnacePrices[data.budget].avg;
    const furnaceMin = furnacePrices[data.budget].min;
    const furnaceMax = furnacePrices[data.budget].max;
    
    // AC pricing depends on tonnage
    let acBase = 0;
    let acMin = 0;
    let acMax = 0;
    
    if (data.acTonnage) {
      if (data.budget === 'premium') {
        // Higher efficiency AC
        acBase = premiumAcPrice.avg;
        acMin = premiumAcPrice.min;
        acMax = premiumAcPrice.max;
      } else {
        // Standard efficiency AC by tonnage
        acBase = acPricesByTonnage[data.acTonnage].avg;
        acMin = acPricesByTonnage[data.acTonnage].min;
        acMax = acPricesByTonnage[data.acTonnage].max;
      }
    }
    
    // Combined price with a slight discount for bundling
    basePrice = (furnaceBase + acBase) * 0.95; // 5% bundle discount
    minPrice = (furnaceMin + acMin) * 0.9; // 10% bundle discount for min price
    maxPrice = (furnaceMax + acMax) * 0.95; // 5% bundle discount for max price
  } 
  else if (data.serviceType === 'other') {
    // For other services, use hourly service rates
    const hourlyRate = serviceRates.other;
    const estimatedHours = data.propertyType === 'commercial' ? 6 : data.propertyType === 'multi-family' ? 4 : 3;
    basePrice = hourlyRate * estimatedHours;
    minPrice = basePrice * 0.8; // 20% less for simple jobs
    maxPrice = basePrice * 1.4; // 40% more for complex jobs
  }
  
  // Combine all factors for estimated price
  estimatedPrice = (basePrice + sizeAdjustment) * propertyFactor * existingSystemFactor * timeframeFactor;
  
  // Apply adjustment factors to min/max prices
  minPrice = (minPrice + sizeAdjustment) * propertyFactor * existingSystemFactor * timeframeFactor;
  maxPrice = (maxPrice + sizeAdjustment) * propertyFactor * existingSystemFactor * timeframeFactor;
  
  // Round to nearest $100
  estimatedPrice = Math.ceil(estimatedPrice / 100) * 100;
  minPrice = Math.floor(minPrice / 100) * 100;
  maxPrice = Math.ceil(maxPrice / 100) * 100;
  
  return {
    minPrice,
    maxPrice,
    estimatedPrice
  };
};

const Quote = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quoteResult, setQuoteResult] = useState<{minPrice: number, maxPrice: number, estimatedPrice: number} | null>(null);
  const [showPropertyDetails, setShowPropertyDetails] = useState(false);
  
  // Initialize form
  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      propertyType: 'residential',
      serviceType: 'both',
      acTonnage: '3',
      buildingSize: 1500,
      bedroomCount: 3,
      bathroomCount: 2,
      existingSystem: 'yes',
      estimatedAge: '6-10',
      installationTimeframe: '1-month',
      budget: 'mid-tier',
      additionalInfo: ''
    }
  });
  
  const { watch } = form;
  const propertyType = watch('propertyType');
  const serviceType = watch('serviceType');
  const existingSystem = watch('existingSystem');
  const showAcTonnage = serviceType === 'ac' || serviceType === 'both';
  
  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    
    try {
      // Calculate quote estimate
      const estimate = calculateEstimate(data);
      setQuoteResult(estimate);
      
      // In a real implementation, we would also send the form data to the server
      // For now, we'll just simulate a successful submission after a delay
      setTimeout(() => {
        toast({
          title: "Quote Generated Successfully",
          description: "Your free quote has been generated. An email with these details has also been sent to you."
        });
        
        setSubmitted(true);
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Error Generating Quote",
        description: "There was an error generating your quote. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const resetForm = () => {
    form.reset();
    setSubmitted(false);
    setQuoteResult(null);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      
      <main className="flex-grow">
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
                Get Your Free <span className="text-primary">HVAC Quote</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Use our instant quote calculator to get an estimated price range for your project
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Quote Calculator Form */}
        <section className="py-12 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {!submitted ? (
                <motion.div
                  className="bg-black rounded-xl p-8 shadow-xl border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Instant Quote Calculator</h2>
                  <p className="text-gray-400 mb-8">Complete the form below to generate your personalized quote. This estimate is based on average installation costs in Alberta.</p>
                  
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Contact Information */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-white border-b border-gray-800 pb-2">Contact Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-gray-300 mb-2">Full Name</label>
                          <input
                            type="text"
                            id="name"
                            {...form.register("name")}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          {form.formState.errors.name && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            {...form.register("email")}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          {form.formState.errors.email && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-gray-300 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            {...form.register("phone")}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          {form.formState.errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="address" className="block text-gray-300 mb-2">Property Address</label>
                          <input
                            type="text"
                            id="address"
                            {...form.register("address")}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          {form.formState.errors.address && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.address.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Service Information */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-white border-b border-gray-800 pb-2">Service Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="propertyType" className="block text-gray-300 mb-2">Property Type</label>
                          <select
                            id="propertyType"
                            {...form.register("propertyType")}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            onChange={(e) => {
                              form.setValue('propertyType', e.target.value as any);
                              if (e.target.value !== 'residential') {
                                setShowPropertyDetails(false);
                              }
                            }}
                          >
                            <option value="residential">Residential Home</option>
                            <option value="commercial">Commercial Building</option>
                            <option value="multi-family">Multi-Family Building</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="serviceType" className="block text-gray-300 mb-2">Service Needed</label>
                          <select
                            id="serviceType"
                            {...form.register("serviceType")}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="furnace">Furnace Installation</option>
                            <option value="ac">Air Conditioner Installation</option>
                            <option value="both">Both Furnace & AC</option>
                            <option value="other">Other HVAC Service</option>
                          </select>
                        </div>
                        
                        {showAcTonnage && (
                          <div>
                            <label htmlFor="acTonnage" className="block text-gray-300 mb-2">AC Size (Tonnage)</label>
                            <select
                              id="acTonnage"
                              {...form.register("acTonnage")}
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              <option value="1.5">1.5 Ton (600-900 sq.ft)</option>
                              <option value="2">2 Ton (900-1200 sq.ft)</option>
                              <option value="2.5">2.5 Ton (1200-1500 sq.ft)</option>
                              <option value="3">3 Ton (1500-1800 sq.ft)</option>
                              <option value="3.5">3.5 Ton (1800-2100 sq.ft)</option>
                              <option value="4">4 Ton (2100-2400 sq.ft)</option>
                              <option value="5">5 Ton (2400+ sq.ft)</option>
                            </select>
                            <p className="text-gray-500 text-xs mt-1">Select the appropriate size for your home</p>
                          </div>
                        )}
                        
                        <div>
                          <label htmlFor="buildingSize" className="block text-gray-300 mb-2">Approximate Square Footage</label>
                          <input
                            type="number"
                            id="buildingSize"
                            {...form.register("buildingSize", { valueAsNumber: true })}
                            min="500"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          {form.formState.errors.buildingSize && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.buildingSize.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="existingSystem" className="block text-gray-300 mb-2">Existing System to Replace?</label>
                          <select
                            id="existingSystem"
                            {...form.register("existingSystem")}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="yes">Yes</option>
                            <option value="no">No (New Installation)</option>
                            <option value="unsure">Not Sure</option>
                          </select>
                        </div>
                      </div>
                      
                      {propertyType === 'residential' && (
                        <div>
                          <button
                            type="button"
                            className="text-primary hover:text-red-400 text-sm font-medium flex items-center"
                            onClick={() => setShowPropertyDetails(!showPropertyDetails)}
                          >
                            {showPropertyDetails ? 'Hide' : 'Show'} Additional Property Details
                            <svg className={`ml-1 w-4 h-4 transition-transform ${showPropertyDetails ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          {showPropertyDetails && (
                            <motion.div 
                              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              transition={{ duration: 0.3 }}
                            >
                              <div>
                                <label htmlFor="bedroomCount" className="block text-gray-300 mb-2">Number of Bedrooms</label>
                                <input
                                  type="number"
                                  id="bedroomCount"
                                  {...form.register("bedroomCount", { valueAsNumber: true })}
                                  min="0"
                                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                              
                              <div>
                                <label htmlFor="bathroomCount" className="block text-gray-300 mb-2">Number of Bathrooms</label>
                                <input
                                  type="number"
                                  id="bathroomCount"
                                  {...form.register("bathroomCount", { valueAsNumber: true })}
                                  min="0"
                                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {existingSystem === 'yes' && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white border-b border-gray-800 pb-2">Existing System Information</h3>
                        
                        <div>
                          <label htmlFor="estimatedAge" className="block text-gray-300 mb-2">Estimated Age of Current System</label>
                          <select
                            id="estimatedAge"
                            {...form.register("estimatedAge")}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="new">Less than 1 year</option>
                            <option value="1-5">1-5 years</option>
                            <option value="6-10">6-10 years</option>
                            <option value="11-15">11-15 years</option>
                            <option value="16+">16+ years</option>
                            <option value="unknown">Unknown</option>
                          </select>
                        </div>
                      </div>
                    )}
                    
                    {/* Project Preferences */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-white border-b border-gray-800 pb-2">Project Preferences</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="installationTimeframe" className="block text-gray-300 mb-2">Installation Timeframe</label>
                          <select
                            id="installationTimeframe"
                            {...form.register("installationTimeframe")}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="asap">As Soon As Possible</option>
                            <option value="1-month">Within 1 Month</option>
                            <option value="3-months">Within 3 Months</option>
                            <option value="planning">Just Planning Ahead</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="budget" className="block text-gray-300 mb-2">Budget Range / Quality Preference</label>
                          <select
                            id="budget"
                            {...form.register("budget")}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="economy">Economy (Code Minimum)</option>
                            <option value="mid-tier">Mid-Tier (Better Efficiency)</option>
                            <option value="premium">Premium (Best Efficiency/Features)</option>
                            <option value="unsure">Not Sure / Need Recommendations</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="additionalInfo" className="block text-gray-300 mb-2">Additional Information (Optional)</label>
                      <textarea
                        id="additionalInfo"
                        {...form.register("additionalInfo")}
                        rows={4}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Any specific requirements or questions about your project..."
                      ></textarea>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Calculating Quote...
                          </>
                        ) : (
                          'Generate My Free Quote'
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  className="bg-black rounded-xl p-8 shadow-xl border border-gray-800"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {quoteResult && (
                    <>
                      <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                          <i className="fas fa-calculator text-4xl text-primary"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Your Personalized Quote Estimate</h2>
                        <p className="text-gray-400">Based on the information you provided</p>
                      </div>
                      
                      <div className="bg-gray-900 rounded-xl p-6 mb-8">
                        <div className="text-center">
                          <p className="text-gray-400 text-sm mb-2">Estimated Price Range</p>
                          <div className="flex items-center justify-center space-x-3">
                            <span className="text-white text-lg">{formatPrice(quoteResult.minPrice)}</span>
                            <span className="text-gray-400">to</span>
                            <span className="text-3xl font-bold text-primary">{formatPrice(quoteResult.maxPrice)}</span>
                          </div>
                          <p className="text-gray-500 text-xs mt-2">*This is an estimated range and may change after a professional assessment</p>
                        </div>
                        
                        <div className="mt-6 border-t border-gray-800 pt-6">
                          <h3 className="text-lg font-semibold text-white mb-4">Quote Details</h3>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Base System Cost</span>
                              <span className="text-white">{formatPrice(quoteResult.estimatedPrice * 0.7)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Installation & Labor</span>
                              <span className="text-white">{formatPrice(quoteResult.estimatedPrice * 0.25)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Materials & Components</span>
                              <span className="text-white">{formatPrice(quoteResult.estimatedPrice * 0.05)}</span>
                            </div>
                            <div className="flex justify-between pt-3 border-t border-gray-800">
                              <span className="text-white font-medium">Estimated Total</span>
                              <span className="text-primary font-bold">{formatPrice(quoteResult.estimatedPrice)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                          <div className="flex items-start">
                            <i className="fas fa-info-circle text-primary mt-1 mr-3"></i>
                            <div>
                              <h4 className="text-white font-medium mb-1">What's Next?</h4>
                              <p className="text-gray-400 text-sm">
                                One of our HVAC specialists will contact you within 24 hours to discuss your project in more detail
                                and schedule an in-home assessment to provide a final quote.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <button
                            onClick={resetForm}
                            className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 flex-1"
                          >
                            Start New Quote
                          </button>
                          <a
                            href="tel:+14036136014"
                            className="bg-primary hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300 flex-1 text-center"
                          >
                            <i className="fas fa-phone-alt mr-2"></i>
                            Call for Details
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Common questions about our HVAC installation and quote process
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <motion.div 
                  className="bg-gray-900 rounded-xl p-6 border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 text-white">How accurate is this quote calculator?</h3>
                  <p className="text-gray-400">
                    Our calculator provides an estimated price range based on typical installations in Alberta. The final price may vary depending on your specific requirements, the condition of your home, and other factors that can only be determined during an in-home assessment.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-900 rounded-xl p-6 border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 text-white">Do I need to pay anything for a quote?</h3>
                  <p className="text-gray-400">
                    No, our quotes and in-home assessments are completely free with no obligation. We believe in providing transparent pricing information to help you make an informed decision.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-900 rounded-xl p-6 border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 text-white">What happens after I submit my information?</h3>
                  <p className="text-gray-400">
                    After you submit your information, one of our HVAC specialists will contact you within 24 hours to schedule an in-home assessment. During this assessment, we'll evaluate your home's specific needs and provide a detailed, final quote for the installation.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-900 rounded-xl p-6 border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 text-white">Are rebates and incentives included in the quote?</h3>
                  <p className="text-gray-400">
                    The estimated quote doesn't include potential rebates or incentives. During your consultation, we'll discuss all available rebates and energy efficiency programs that could reduce your final cost.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-900 rounded-xl p-6 border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 text-white">How long does installation typically take?</h3>
                  <p className="text-gray-400">
                    Most residential furnace or AC installations can be completed in a single day. Combined systems or more complex installations may take 1-2 days. We always provide a specific timeline during your consultation.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Quote;
