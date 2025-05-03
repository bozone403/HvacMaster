import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { EmergencyRequest } from "@/types";

const emergencyFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  issueType: z.string().min(1, "Please select an issue type"),
  description: z.string().min(5, "Brief description is required"),
});

type EmergencyFormValues = z.infer<typeof emergencyFormSchema>;

export default function EmergencyService() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<EmergencyFormValues>({
    resolver: zodResolver(emergencyFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      issueType: "",
      description: "",
    },
  });

  async function onSubmit(data: EmergencyFormValues) {
    setIsSubmitting(true);
    
    try {
      const response = await apiRequest("POST", "/api/emergency-requests", data);
      
      toast({
        title: "Emergency request sent!",
        description: "A technician will contact you shortly.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      console.error("Failed to submit emergency request:", error);
      toast({
        title: "Failed to send request",
        description: "Please try calling our emergency number directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="emergency" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-[#DC2626] rounded-xl overflow-hidden shadow-xl">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-2/3 text-white">
                <h2 className="text-3xl md:text-4xl font-black mb-4">Emergency HVAC Service</h2>
                <p className="text-xl mb-4">Heating or cooling emergency? We're ready to respond 24/7, weekends, and holidays. Don't wait in the cold or heat.</p>
                
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check-circle mr-2"></i>
                    <span>Average response time: 45 minutes or less</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle mr-2"></i>
                    <span>No extra charge for after-hours diagnostics</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle mr-2"></i>
                    <span>Service vehicles fully stocked with parts</span>
                  </li>
                </ul>
                
                <div className="flex items-center space-x-4">
                  <a 
                    href="tel:+15875551234" 
                    className="bg-white text-[#DC2626] hover:bg-gray-100 font-bold py-3 px-6 rounded-md shadow-md transition flex items-center space-x-2"
                  >
                    <i className="fas fa-phone-alt"></i>
                    <span>(587) 555-1234</span>
                  </a>
                  <span className="text-white font-bold">OR</span>
                  <Button 
                    className="bg-[#121212] text-white hover:bg-gray-800 font-bold py-3 px-6 rounded-md shadow-md transition"
                    onClick={() => {
                      const formElement = document.getElementById('emergency-form');
                      formElement?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Request Online
                  </Button>
                </div>
              </div>
              
              <div className="w-full md:w-1/3 mt-6 md:mt-0">
                <div id="emergency-form" className="bg-white p-6 rounded-lg shadow-inner">
                  <h3 className="text-xl font-bold text-[#121212] mb-4">Emergency Response Form</h3>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your full name" 
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
                            <FormLabel className="text-sm font-medium text-gray-700">Phone</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                placeholder="For immediate callback" 
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
                        name="issueType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Issue Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#DC2626] focus:border-[#DC2626]">
                                  <SelectValue placeholder="Select issue type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="No Heat">No Heat</SelectItem>
                                <SelectItem value="No Cooling">No Cooling</SelectItem>
                                <SelectItem value="Water Leak">Water Leak</SelectItem>
                                <SelectItem value="Unusual Noise">Unusual Noise</SelectItem>
                                <SelectItem value="Other Emergency">Other Emergency</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Brief Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                rows={2} 
                                placeholder="What's happening?" 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#DC2626] focus:border-[#DC2626]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-[#DC2626] text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 transition"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Emergency Request"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
