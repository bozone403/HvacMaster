import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ServiceRequest } from "@/types";

const quoteFormSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  serviceType: z.string().min(1, "Please select a service type"),
  message: z.string().min(10, "Please provide more details about your request"),
  consent: z.boolean().refine((value) => value === true, {
    message: "You must consent to be contacted",
  }),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      serviceType: "",
      message: "",
      consent: false,
    },
  });

  async function onSubmit(data: QuoteFormValues) {
    setIsSubmitting(true);
    
    try {
      const response = await apiRequest("POST", "/api/quote-requests", data);
      
      toast({
        title: "Quote request submitted!",
        description: "We'll be in touch with you shortly.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      console.error("Failed to submit quote request:", error);
      toast({
        title: "Failed to send request",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-black text-[#121212] mb-6">Get a Custom Quote</h2>
            <p className="text-gray-600 mb-8">Tell us about your HVAC needs and we'll provide you with a detailed quote. All quotes include energy efficiency analysis and potential savings calculation.</p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-gray-700 mb-1">First Name</FormLabel>
                        <FormControl>
                          <Input 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#DC2626] focus:border-[#DC2626]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#DC2626] focus:border-[#DC2626]" 
                            {...field} 
                          />
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
                      <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#DC2626] focus:border-[#DC2626]" 
                          {...field} 
                        />
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
                      <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Phone</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#DC2626] focus:border-[#DC2626]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Service Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#DC2626] focus:border-[#DC2626]">
                            <SelectValue placeholder="Select a service..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Furnace Installation">Furnace Installation</SelectItem>
                          <SelectItem value="AC Installation">AC Installation</SelectItem>
                          <SelectItem value="Furnace Repair">Furnace Repair</SelectItem>
                          <SelectItem value="AC Repair">AC Repair</SelectItem>
                          <SelectItem value="Boiler/Hydronic System">Boiler/Hydronic System</SelectItem>
                          <SelectItem value="Ductwork Design">Ductwork Design</SelectItem>
                          <SelectItem value="Indoor Air Quality">Indoor Air Quality</SelectItem>
                          <SelectItem value="Maintenance Plan">Maintenance Plan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4} 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#DC2626] focus:border-[#DC2626]" 
                          placeholder="Tell us about your needs or the issue you're experiencing..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-600">
                          I consent to being contacted about my HVAC needs. AfterHours HVAC respects your privacy and will never share your information.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#DC2626] text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Service Area Map */}
          <div>
            <h2 className="text-3xl font-black text-[#121212] mb-6">Service Area</h2>
            <p className="text-gray-600 mb-6">We proudly serve Calgary, Lethbridge, Coaldale, Taber, Fort Macleod, and surrounding rural zones throughout Southern Alberta.</p>
            
            <div className="bg-gray-200 rounded-xl h-80 mb-6 relative overflow-hidden">
              {/* This would be replaced with an actual Google Maps embed */}
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Southern_Alberta.png/640px-Southern_Alberta.png')` }}
              >
                {/* Map Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 text-white p-4">
                  <p className="font-bold text-xl mb-2">Interactive Map Coming Soon</p>
                  <p>After Hours HVAC serves all of Southern Alberta</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#121212] mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-[#DC2626] mr-3 mt-1">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p><a href="tel:+15875551234" className="text-[#DC2626] hover:text-red-700">(587) 555-1234</a></p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-[#DC2626] mr-3 mt-1">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p><a href="mailto:service@afterhourshvac.ca" className="text-[#DC2626] hover:text-red-700">service@afterhourshvac.ca</a></p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-[#DC2626] mr-3 mt-1">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <p className="font-semibold">Hours</p>
                    <p>24/7 Emergency Service Available</p>
                    <p>Regular Office Hours: 8AM - 9PM, 7 days a week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
