import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { formatPrice } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdvancedPricingCalculator from '@/components/AdvancedPricingCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Form schema
const quoteFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  address: z.string().min(5, { message: 'Please enter your address.' }),
  propertyType: z.enum(['residential', 'commercial'], { 
    required_error: 'Please select a property type.'
  }),
  serviceType: z.enum(['install-furnace', 'install-ac', 'install-both', 'repair', 'maintenance'], {
    required_error: 'Please select a service type.'
  }),
  squareFootage: z.coerce.number().min(500, { message: 'Square footage must be at least 500.' }),
  numBedrooms: z.coerce.number().min(1, { message: 'Please enter number of bedrooms.' }).optional(),
  currentSystem: z.string().optional(),
  urgency: z.enum(['asap', 'within-week', 'within-month', 'planning']),
  budget: z.enum(['standard', 'mid-range', 'premium', 'not-sure']),
  notes: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

// Price estimator function based on form data and Calgary HVAC pricing guide
const calculateEstimate = (data: QuoteFormData): {minPrice: number, maxPrice: number, estimatedPrice: number} => {
  let minPrice = 0;
  let maxPrice = 0;
  
  // Base pricing from Calgary HVAC pricing guide
  const pricing = {
    furnace: {
      standard: { min: 3645, max: 4885 },
      midRange: { min: 4500, max: 5800 },
      premium: { min: 5500, max: 7200 }
    },
    ac: {
      standard: { min: 3660, max: 6065 },
      midRange: { min: 4500, max: 7200 },
      premium: { min: 6800, max: 9500 }
    },
    repair: { min: 250, max: 1800 },
    maintenance: { min: 179, max: 299 }
  };
  
  // Size adjustments
  const sizeMultiplier = data.squareFootage <= 1500 ? 1 :
                       data.squareFootage <= 2000 ? 1.15 :
                       data.squareFootage <= 2500 ? 1.3 :
                       data.squareFootage <= 3000 ? 1.45 : 1.6;
                       
  // Budget tier selection
  const tier = data.budget === 'standard' ? 'standard' :
              data.budget === 'mid-range' ? 'midRange' :
              data.budget === 'premium' ? 'premium' : 'standard';
  
  // Calculate based on service type
  if (data.serviceType === 'install-furnace') {
    minPrice = pricing.furnace[tier].min * sizeMultiplier;
    maxPrice = pricing.furnace[tier].max * sizeMultiplier;
  } 
  else if (data.serviceType === 'install-ac') {
    minPrice = pricing.ac[tier].min * sizeMultiplier;
    maxPrice = pricing.ac[tier].max * sizeMultiplier;
  }
  else if (data.serviceType === 'install-both') {
    // Combined with package discount
    minPrice = (pricing.furnace[tier].min + pricing.ac[tier].min) * sizeMultiplier * 0.9; // 10% discount
    maxPrice = (pricing.furnace[tier].max + pricing.ac[tier].max) * sizeMultiplier * 0.9;
  }
  else if (data.serviceType === 'repair') {
    minPrice = pricing.repair.min;
    maxPrice = pricing.repair.max;
  }
  else if (data.serviceType === 'maintenance') {
    minPrice = pricing.maintenance.min;
    maxPrice = pricing.maintenance.max;
  }
  
  // Commercial properties have higher costs
  if (data.propertyType === 'commercial') {
    minPrice *= 1.25;
    maxPrice *= 1.25;
  }
  
  // Calculate an estimated price (middle of range, slightly weighted to lower end)
  const estimatedPrice = Math.round(minPrice * 0.4 + maxPrice * 0.6);
  
  return {
    minPrice: Math.round(minPrice),
    maxPrice: Math.round(maxPrice),
    estimatedPrice
  };
};

export default function Quote() {
  const { toast } = useToast();
  const [tabValue, setTabValue] = useState('quick-quote');
  const [estimatedPrice, setEstimatedPrice] = useState<{minPrice: number, maxPrice: number, estimatedPrice: number} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);
  
  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      propertyType: 'residential',
      serviceType: 'install-both',
      squareFootage: 1800,
      numBedrooms: 3,
      currentSystem: '',
      urgency: 'within-month',
      budget: 'not-sure',
      notes: '',
    },
  });
  
  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    try {
      // Calculate price estimate
      const estimate = calculateEstimate(data);
      setEstimatedPrice(estimate);
      setIsCalculated(true);
      
      // In a real app, we would save the quote request to the database here
      // await fetch('/api/quotes', { method: 'POST', body: JSON.stringify({...data, estimate}) });
      
      toast({
        title: 'Quote Estimate Ready',
        description: 'Scroll down to see your personalized estimate.',
      });
      
      // Scroll to the estimate section
      setTimeout(() => {
        const estimateSection = document.getElementById('estimate-section');
        if (estimateSection) {
          estimateSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    } catch (error) {
      console.error('Error generating quote:', error);
      toast({
        title: 'Something went wrong',
        description: 'Could not generate your quote. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-12 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Get Your HVAC Quote</h1>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Get an accurate estimate for your HVAC project. Our detailed quote will outline all costs and options.
            </p>
            
            <Tabs value={tabValue} onValueChange={setTabValue} className="max-w-5xl mx-auto">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="quick-quote" className="text-lg py-3">Quick Quote</TabsTrigger>
                <TabsTrigger value="advanced-calculator" className="text-lg py-3">Advanced Calculator</TabsTrigger>
              </TabsList>
              
              <TabsContent value="quick-quote">
                <div className="grid md:grid-cols-12 gap-8">
                  <div className="md:col-span-7">
                    <Card>
                      <CardContent className="pt-6">
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                              <h3 className="text-xl font-semibold">Contact Information</h3>
                              
                              <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                  control={form.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Full Name</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Your full name" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="phone"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Phone Number</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Your phone number" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Your email address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Property Address</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Property address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="space-y-4 pt-6 border-t">
                              <h3 className="text-xl font-semibold">Project Details</h3>
                              
                              <FormField
                                control={form.control}
                                name="propertyType"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Property Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select property type" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="residential">Residential</SelectItem>
                                        <SelectItem value="commercial">Commercial</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="serviceType"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>What do you need?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select service type" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="install-furnace">Furnace Installation</SelectItem>
                                        <SelectItem value="install-ac">Air Conditioner Installation</SelectItem>
                                        <SelectItem value="install-both">Both Furnace & AC Installation</SelectItem>
                                        <SelectItem value="repair">Repair Existing System</SelectItem>
                                        <SelectItem value="maintenance">Maintenance Service</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                  control={form.control}
                                  name="squareFootage"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Square Footage</FormLabel>
                                      <FormControl>
                                        <Input 
                                          type="number" 
                                          placeholder="Property size" 
                                          {...field} 
                                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                        />
                                      </FormControl>
                                      <FormDescription>
                                        Approximate size of your home/property
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="numBedrooms"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Number of Bedrooms</FormLabel>
                                      <FormControl>
                                        <Input 
                                          type="number" 
                                          placeholder="Number of bedrooms" 
                                          {...field} 
                                          onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                                        />
                                      </FormControl>
                                      <FormDescription>
                                        Optional for residential properties
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              <FormField
                                control={form.control}
                                name="currentSystem"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Current System (Optional)</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="E.g., 15-year old Carrier furnace, no AC" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      Information about your current HVAC system
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="urgency"
                                render={({ field }) => (
                                  <FormItem className="space-y-3">
                                    <FormLabel>How soon do you need this?</FormLabel>
                                    <FormControl>
                                      <RadioGroup 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                      >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                          <FormControl>
                                            <RadioGroupItem value="asap" />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            Emergency/ASAP
                                          </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                          <FormControl>
                                            <RadioGroupItem value="within-week" />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            Within a week
                                          </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                          <FormControl>
                                            <RadioGroupItem value="within-month" />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            Within a month
                                          </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                          <FormControl>
                                            <RadioGroupItem value="planning" />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            Just planning ahead
                                          </FormLabel>
                                        </FormItem>
                                      </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="budget"
                                render={({ field }) => (
                                  <FormItem className="space-y-3">
                                    <FormLabel>Budget Range</FormLabel>
                                    <FormControl>
                                      <RadioGroup 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                      >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                          <FormControl>
                                            <RadioGroupItem value="standard" />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            Standard (Budget-conscious)
                                          </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                          <FormControl>
                                            <RadioGroupItem value="mid-range" />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            Mid-range (Balance of quality & price)
                                          </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                          <FormControl>
                                            <RadioGroupItem value="premium" />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            Premium (Top-tier efficiency & features)
                                          </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                          <FormControl>
                                            <RadioGroupItem value="not-sure" />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            Not sure (Show me options)
                                          </FormLabel>
                                        </FormItem>
                                      </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Additional Notes (Optional)</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="Any specific requirements or questions?" 
                                        className="resize-none min-h-[100px]" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <Button 
                              type="submit" 
                              className="w-full bg-primary hover:bg-primary/90" 
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? 'Calculating...' : 'Calculate Estimate'}
                            </Button>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="md:col-span-5">
                    <div className="sticky top-20">
                      <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                          <h3 className="text-xl font-semibold mb-4">Why Choose AfterHours HVAC?</h3>
                          
                          <div className="space-y-4">
                            <div className="flex gap-3">
                              <div className="mt-1 bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-medium">Premium Equipment</h4>
                                <p className="text-sm text-muted-foreground">
                                  We only install high-efficiency equipment that meets or exceeds industry standards.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex gap-3">
                              <div className="mt-1 bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-medium">24/7 Emergency Service</h4>
                                <p className="text-sm text-muted-foreground">
                                  Round-the-clock service for emergencies, nights, weekends, and holidays.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex gap-3">
                              <div className="mt-1 bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-medium">Satisfaction Guarantee</h4>
                                <p className="text-sm text-muted-foreground">
                                  Our work is backed by our 100% satisfaction guarantee and manufacturer warranties.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex gap-3">
                              <div className="mt-1 bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                  <path d="M12 2v20" />
                                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-medium">Competitive Pricing</h4>
                                <p className="text-sm text-muted-foreground">
                                  Transparent pricing with no hidden fees and financing options available.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex gap-3">
                              <div className="mt-1 bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-medium">Experienced Technicians</h4>
                                <p className="text-sm text-muted-foreground">
                                  Our certified technicians have years of experience and undergo continuous training.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-8 pt-6 border-t">
                            <div className="space-y-4">
                              <h4 className="font-semibold">For Immediate Assistance</h4>
                              <a 
                                href="tel:+14036136014" 
                                className="flex items-center gap-2 text-lg font-bold text-primary hover:text-primary/80 transition-colors"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                (403) 613-6014
                              </a>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {isCalculated && estimatedPrice && (
                        <Card className="mt-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20" id="estimate-section">
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <h3 className="text-xl font-semibold mb-4">Your Estimated Quote</h3>
                              
                              <div className="my-6">
                                <div className="text-4xl font-bold">{formatPrice(estimatedPrice.estimatedPrice)}</div>
                                <p className="text-sm text-muted-foreground mt-2">
                                  Price Range: {formatPrice(estimatedPrice.minPrice)} - {formatPrice(estimatedPrice.maxPrice)}
                                </p>
                              </div>
                              
                              <p className="text-sm mb-6">
                                This is an estimated price based on your requirements. For a detailed quote with exact pricing, we recommend scheduling an in-home consultation.
                              </p>
                              
                              <div className="flex flex-col gap-3">
                                <Button className="w-full bg-primary hover:bg-primary/90">
                                  Request Detailed Quote
                                </Button>
                                <Button variant="outline" className="w-full">
                                  Schedule Consultation
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="advanced-calculator">
                <AdvancedPricingCalculator />
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-muted/40 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">How accurate is the online quote?</h3>
                <p className="text-muted-foreground">
                  Our online quote is based on average pricing for similar projects in your area. For the most accurate quote, we recommend scheduling an in-home consultation where our technicians can assess your specific requirements.
                </p>
              </div>
              
              <div className="bg-muted/40 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">What factors affect the final price?</h3>
                <p className="text-muted-foreground">
                  Several factors can impact the final price, including your home's size and layout, existing ductwork condition, equipment efficiency levels, additional features (like air purifiers or smart thermostats), and any necessary electrical or structural modifications.
                </p>
              </div>
              
              <div className="bg-muted/40 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Do you offer financing options?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer flexible financing options with competitive rates and terms. Our team can help you explore payment plans that fit your budget during your consultation.
                </p>
              </div>
              
              <div className="bg-muted/40 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">How long does installation typically take?</h3>
                <p className="text-muted-foreground">
                  Installation times vary depending on the project. A standard furnace replacement typically takes 4-8 hours, while a complete system (furnace and AC) might take 1-2 days. More complex installations with new ductwork can take 2-5 days.
                </p>
              </div>
              
              <div className="bg-muted/40 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">What warranties do you offer?</h3>
                <p className="text-muted-foreground">
                  We provide manufacturer warranties on all equipment (typically 5-10 years for parts) and our own labor warranty on installations (typically 1-2 years). Extended warranties are also available for additional peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}