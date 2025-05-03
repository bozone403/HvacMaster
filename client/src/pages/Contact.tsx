import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import GoogleMapsLocation from '@/components/GoogleMapsLocation';
import GoogleReviews from '@/components/GoogleReviews';
import GoogleBusinessBadge from '@/components/GoogleBusinessBadge';

// Define form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Please provide more details in your message"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Submit contact form data to API
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll respond to your inquiry as soon as possible.",
      });
      
      // Reset form and show success message
      form.reset();
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Message Failed",
        description: "There was an error sending your message. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                Contact <span className="text-primary">AfterHours HVAC</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                We're here to answer your questions and provide the support you need
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {isSuccess ? (
                <motion.div 
                  className="bg-black p-8 rounded-xl border border-gray-800 max-w-3xl mx-auto text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-white mb-4">Message Received!</h2>
                  <p className="text-gray-300 text-lg mb-8">
                    Thank you for reaching out to AfterHours HVAC. One of our representatives will get back to you shortly.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button 
                      onClick={() => setIsSuccess(false)}
                      className="bg-primary hover:bg-red-700 text-white font-bold"
                    >
                      Send Another Message
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => window.location.href = "/"}
                    >
                      Return to Home
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Contact Form */}
                  <motion.div 
                    className="bg-black rounded-xl p-8 shadow-xl border border-gray-800"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Full Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="bg-gray-800 border-gray-700 text-white focus:ring-primary" 
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
                                <FormLabel className="text-white">Phone Number</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="bg-gray-800 border-gray-700 text-white focus:ring-primary" 
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
                              <FormLabel className="text-white">Email Address</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="email"
                                  className="bg-gray-800 border-gray-700 text-white focus:ring-primary" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Subject</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  className="bg-gray-800 border-gray-700 text-white focus:ring-primary" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  className="bg-gray-800 border-gray-700 text-white focus:ring-primary h-32" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-primary hover:bg-red-700 text-white font-bold mt-6 py-3"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Processing..." : "Send Message"}
                        </Button>
                      </form>
                    </Form>
                  </motion.div>
                  
                  {/* Contact Information */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-black rounded-xl p-8 shadow-xl border border-gray-800 mb-8">
                      <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
                      
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">Phone</h3>
                            <p className="text-gray-400">Regular Hours: <a href="tel:+14036136014" className="text-primary hover:underline">(403) 613-6014</a></p>
                            <p className="text-gray-400">Emergency Service: <a href="tel:+14036136014" className="text-primary hover:underline">(403) 613-6014</a></p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">Email</h3>
                            <p className="text-gray-400">Customer Service: <a href="mailto:info@afterhourshvac.com" className="text-primary hover:underline">info@afterhourshvac.com</a></p>
                            <p className="text-gray-400">Support: <a href="mailto:support@afterhourshvac.com" className="text-primary hover:underline">support@afterhourshvac.com</a></p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">Address</h3>
                            <p className="text-gray-400">1234 HVAC Way</p>
                            <p className="text-gray-400">Calgary, AB T2P 1N9</p>
                            <p className="text-gray-400 mt-1">Service Area: Calgary and surrounding areas</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">Business Hours</h3>
                            <p className="text-gray-400">Monday - Friday: 8:00 AM - 6:00 PM</p>
                            <p className="text-gray-400">Saturday: 9:00 AM - 4:00 PM</p>
                            <p className="text-gray-400">Sunday: Closed (Emergency service available)</p>
                            <p className="text-gray-400 mt-1"><span className="text-primary font-semibold">24/7 Emergency Service Available</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-black rounded-xl p-8 shadow-xl border border-gray-800">
                      <h2 className="text-2xl font-bold text-white mb-6">Service Area</h2>
                      
                      {/* Embed a map image for now (could be replaced with an interactive map) */}
                      <div className="aspect-video rounded-lg overflow-hidden mb-4">
                        <img 
                          src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                          alt="Calgary Service Area Map" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="space-y-4 mt-6">
                        <h3 className="text-lg font-bold text-white">Communities We Serve:</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-gray-400">• Northwest Calgary</div>
                          <div className="text-gray-400">• Northeast Calgary</div>
                          <div className="text-gray-400">• Southwest Calgary</div>
                          <div className="text-gray-400">• Southeast Calgary</div>
                          <div className="text-gray-400">• Airdrie</div>
                          <div className="text-gray-400">• Cochrane</div>
                          <div className="text-gray-400">• Okotoks</div>
                          <div className="text-gray-400">• Chestermere</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Emergency Contact Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="bg-gradient-to-r from-primary/20 to-black p-8 rounded-xl border border-red-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="mb-6 md:mb-0 md:mr-8">
                    <svg className="w-16 h-16 text-primary mx-auto md:mx-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Emergency HVAC Service</h2>
                    <p className="text-gray-300 mb-4">Available 24/7, including holidays. Call now for immediate assistance.</p>
                    <a 
                      href="tel:+14036136014" 
                      className="inline-block bg-primary hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                    >
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        (403) 613-6014
                      </span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
}
