import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

// UI Components
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiRequest } from '@/lib/queryClient';

// Types and Utilities
type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

const serviceTypes = [
  { id: 'furnace-consultation', label: 'Furnace Consultation' },
  { id: 'ac-consultation', label: 'AC Consultation' },
  { id: 'maintenance', label: 'Maintenance Visit' },
  { id: 'emergency', label: 'Emergency Service' },
  { id: 'installation', label: 'New Installation' },
];

// Generate time slots from 8 AM to 6 PM
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const hours = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];
  
  hours.forEach((time, index) => {
    // Randomly mark some slots as unavailable for demo purposes
    const available = Math.random() > 0.3;
    slots.push({
      id: `slot-${index}`,
      time,
      available,
    });
  });
  
  return slots;
};

// Form schema for booking validation
const bookingFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  serviceType: z.string().min(1, "Please select a service"),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  // Initialize form
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "furnace-consultation",
      notes: "",
    },
  });
  
  // Regenerate time slots when date changes (simulating availability)
  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    form.setValue("date", date as Date);
    setTimeSlots(generateTimeSlots());
    setSelectedTime(null);
    form.setValue("time", "");
  };
  
  const handleTimeSelect = (slot: TimeSlot) => {
    if (!slot.available) return;
    
    setSelectedTime(slot.time);
    form.setValue("time", slot.time);
  };
  
  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Submit booking data to API
      await apiRequest("POST", "/api/bookings", data);
      
      toast({
        title: "Appointment Scheduled!",
        description: `Your appointment is confirmed for ${format(data.date, "MMMM d, yyyy")} at ${data.time}`,
      });
      
      // Reset form and show success message
      form.reset();
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Failed to book appointment:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error scheduling your appointment. Please try again or call us directly.",
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
                Book Your <span className="text-primary">HVAC Service</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Schedule a convenient time for your consultation, installation, or service
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Booking Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
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
                
                <h2 className="text-3xl font-bold text-white mb-4">Appointment Confirmed!</h2>
                <p className="text-gray-300 text-lg mb-8">
                  We've received your booking request. You'll receive a confirmation email shortly with all the details.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    onClick={() => setIsSuccess(false)}
                    className="bg-primary hover:bg-red-700 text-white font-bold"
                  >
                    Book Another Appointment
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
              <div className="max-w-5xl mx-auto">
                <motion.div 
                  className="bg-black rounded-xl overflow-hidden shadow-xl border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    {/* Calendar Column */}
                    <div className="lg:col-span-2 p-6 border-r border-gray-800">
                      <h2 className="text-2xl font-bold text-white mb-6">Select a Date & Time</h2>
                      
                      <div className="mb-6">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={handleDateChange}
                          disabled={{ before: new Date() }}
                          className="border border-gray-800 rounded-lg p-2 bg-black"
                        />
                      </div>
                      
                      <div className="mt-8">
                        <h3 className="text-lg font-medium text-white mb-4">Available Time Slots</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((slot) => (
                            <Button
                              key={slot.id}
                              variant={selectedTime === slot.time ? "default" : "outline"}
                              className={cn(
                                "text-sm h-10",
                                selectedTime === slot.time && "bg-primary",
                                !slot.available && "opacity-50 cursor-not-allowed"
                              )}
                              disabled={!slot.available}
                              onClick={() => handleTimeSelect(slot)}
                            >
                              {slot.time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Form Column */}
                    <div className="lg:col-span-3 p-6">
                      <h2 className="text-2xl font-bold text-white mb-6">Your Information</h2>
                      
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="serviceType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Service Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-gray-800 border-gray-700 focus:ring-primary">
                                      <SelectValue placeholder="Select service type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-gray-800 border-gray-700">
                                    {serviceTypes.map((type) => (
                                      <SelectItem key={type.id} value={type.id} className="text-white hover:bg-gray-700">
                                        {type.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
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
                          
                          {/* Hidden fields for date and time */}
                          <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem className="hidden">
                                <FormControl>
                                  <Input 
                                    {...field}
                                    value={field.value ? field.value.toISOString() : ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                              <FormItem className="hidden">
                                <FormControl>
                                  <Input {...field} />
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
                                <FormLabel className="text-white">Additional Notes (Optional)</FormLabel>
                                <FormControl>
                                  <textarea 
                                    {...field} 
                                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:ring-primary focus:border-primary min-h-[100px]"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          {/* Appointment Summary */}
                          {selectedDate && selectedTime && (
                            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mt-6">
                              <h3 className="text-white font-medium mb-2">Appointment Summary</h3>
                              <div className="flex justify-between items-center text-gray-300">
                                <div>
                                  <div className="flex items-center">
                                    <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
                                    <span>{format(selectedDate, "MMMM d, yyyy")}</span>
                                  </div>
                                  <div className="flex items-center mt-1">
                                    <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{selectedTime}</span>
                                  </div>
                                </div>
                                <div>
                                  <span className="text-xs bg-primary text-white px-3 py-1 rounded-full">
                                    {serviceTypes.find(type => type.id === form.getValues().serviceType)?.label || "Service"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-primary hover:bg-red-700 text-white font-bold mt-6 py-3"
                            disabled={isSubmitting || !selectedDate || !selectedTime}
                          >
                            {isSubmitting ? "Processing..." : "Confirm Booking"}
                          </Button>
                        </form>
                      </Form>
                    </div>
                  </div>
                </motion.div>
                
                {/* Information Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                  <motion.div 
                    className="bg-black p-6 rounded-xl border border-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Flexible Scheduling</h3>
                    <p className="text-gray-400">Book appointments that fit your schedule, including evenings and weekends</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-black p-6 rounded-xl border border-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Confirmed Instantly</h3>
                    <p className="text-gray-400">Get immediate confirmation of your appointment with email verification</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-black p-6 rounded-xl border border-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">No Cancellation Fees</h3>
                    <p className="text-gray-400">Reschedule or cancel up to 24 hours before your appointment with no penalties</p>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <motion.div 
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-white mb-3">How long does a typical consultation take?</h3>
                <p className="text-gray-400">Our standard consultations typically take 60-90 minutes, depending on the complexity of your HVAC needs and the size of your home.</p>
              </motion.div>
              
              <motion.div 
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-white mb-3">Do I need to be home for the appointment?</h3>
                <p className="text-gray-400">Yes, we require an adult (18+) to be present during all consultations and service appointments to provide access and approve any work.</p>
              </motion.div>
              
              <motion.div 
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-white mb-3">How soon can I get an appointment?</h3>
                <p className="text-gray-400">For standard consultations and maintenance, we typically can schedule within 1-3 business days. Emergency services are available 24/7 with same-day response.</p>
              </motion.div>
              
              <motion.div 
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-white mb-3">Is there a fee for consultations?</h3>
                <p className="text-gray-400">Standard HVAC consultations are $175, which is waived if you proceed with installation. Maintenance plan members receive free consultations.</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Need Emergency HVAC Service?
              </h2>
              <p className="text-xl text-gray-300 mb-10">
                Call our 24/7 emergency hotline for immediate assistance
              </p>
              <a 
                href="tel:+1234567890" 
                className="inline-flex items-center justify-center bg-primary hover:bg-red-700 text-white font-bold py-4 px-10 rounded-lg transition duration-300 text-xl"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Emergency Service
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
}
