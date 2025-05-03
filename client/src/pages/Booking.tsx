import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createAppointmentEvent, getGoogleCalendarLinkUrl } from '@/lib/googleCalendar';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon, CheckCircle2, Clock, MapPin, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Booking form schema
const bookingFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  address: z.string().optional(),
  service: z.string().min(1, { message: 'Please select a service.' }),
  date: z.date({ required_error: 'Please select a date.' }),
  timeSlot: z.string().min(1, { message: 'Please select a time slot.' }),
  notes: z.string().optional(),
});

type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [calendarLink, setCalendarLink] = useState('');
  const { toast } = useToast();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      service: '',
      notes: '',
    },
  });

  // Generate time slots for the selected date (8am to 8pm, 1.5 hour intervals)
  useEffect(() => {
    if (selectedDate) {
      const slots: TimeSlot[] = [];
      const now = new Date();
      const isToday = selectedDate.toDateString() === now.toDateString();
      const startHour = isToday ? Math.max(8, now.getHours() + 1) : 8; // Start at 8 AM or next hour if today
      
      for (let hour = startHour; hour < 20; hour++) {
        // Skip generating past slots for today
        if (isToday && hour < now.getHours()) continue;

        const isPM = hour >= 12;
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        
        // Generate two slots per hour: XX:00 and XX:30
        const times = [0, 30];
        times.forEach(minutes => {
          // For today, skip times that have already passed
          if (isToday && hour === now.getHours() && minutes <= now.getMinutes()) return;
          
          slots.push({
            id: `${hour}-${minutes}`,
            time: `${displayHour}:${minutes === 0 ? '00' : minutes} ${isPM ? 'PM' : 'AM'}`,
            available: Math.random() > 0.3, // Simulate some slots being unavailable
          });
        });
      }
      
      setTimeSlots(slots);
      form.setValue('timeSlot', ''); // Reset time slot when date changes
    }
  }, [selectedDate, form]);

  // Handle time slot selection
  const handleTimeSelect = (slot: TimeSlot) => {
    if (!slot.available) return;
    form.setValue('timeSlot', slot.time);
  };

  // Submit booking
  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, we would save the booking to the database here
      // await fetch('/api/bookings', {...})
      
      // Create Google Calendar event
      const calendarEvent = createAppointmentEvent({
        customerName: data.name,
        phone: data.phone,
        service: data.service,
        address: data.address,
        date: data.date.toISOString(),
        timeSlot: data.timeSlot,
      });
      
      // Generate calendar link
      const googleCalendarLink = getGoogleCalendarLinkUrl(calendarEvent);
      setCalendarLink(googleCalendarLink);
      
      setIsSuccess(true);
      toast({
        title: 'Booking Successful!',
        description: 'Your appointment has been scheduled. Check your email for confirmation.',
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: 'Something went wrong',
        description: 'Could not submit your booking. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setIsSuccess(false);
    form.reset();
    setSelectedDate(undefined);
    setTimeSlots([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-12 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Schedule Your HVAC Service</h1>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Book your preferred date and time for a consultation, inspection or service call. Our team will confirm your appointment within 2 hours during business hours.
            </p>
            
            {!isSuccess ? (
              <div className="grid md:grid-cols-12 gap-8 max-w-5xl mx-auto">
                <div className="md:col-span-7 space-y-8">
                  <Card>
                    <CardContent className="pt-6">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                <FormLabel>Service Address <span className="text-muted-foreground">(Optional)</span></FormLabel>
                                <FormControl>
                                  <Input placeholder="Where should we provide service?" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="service"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Service Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="emergency">Emergency Repair</SelectItem>
                                    <SelectItem value="maintenance">Preventative Maintenance</SelectItem>
                                    <SelectItem value="install-furnace">Furnace Installation</SelectItem>
                                    <SelectItem value="install-ac">AC Installation</SelectItem>
                                    <SelectItem value="inspection">HVAC Inspection</SelectItem>
                                    <SelectItem value="consultation">Consultation</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="date"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Preferred Date</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(date) => {
                                          field.onChange(date);
                                          setSelectedDate(date || undefined);
                                        }}
                                        disabled={(date) => 
                                          date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                                          date > new Date(new Date().setMonth(new Date().getMonth() + 3)) ||
                                          date.getDay() === 0 // Disable Sundays
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="timeSlot"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Preferred Time</FormLabel>
                                  <FormControl>
                                    <Input readOnly value={field.value} placeholder="Select a date first" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Additional Notes <span className="text-muted-foreground">(Optional)</span></FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Tell us anything else we should know" 
                                    className="resize-none" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-primary hover:bg-primary/90" 
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Processing...' : 'Book Appointment'}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-5">
                  <Card className="bg-muted/50 h-full">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4">Available Time Slots</h3>
                      {selectedDate ? (
                        <>
                          <p className="text-muted-foreground mb-4">
                            Available times for {format(selectedDate, 'EEEE, MMMM do')}:
                          </p>
                          
                          <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map((slot) => (
                              <Button
                                key={slot.id}
                                variant={form.getValues().timeSlot === slot.time ? 'default' : 'outline'}
                                className={cn(
                                  'justify-start',
                                  !slot.available && 'opacity-50 cursor-not-allowed'
                                )}
                                onClick={() => handleTimeSelect(slot)}
                                disabled={!slot.available}
                              >
                                <Clock className="mr-2 h-4 w-4" />
                                {slot.time}
                              </Button>
                            ))}
                          </div>
                          
                          {timeSlots.length === 0 && (
                            <p className="text-center text-muted-foreground py-6">
                              No available slots for this date. Please select another date.
                            </p>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-12">
                          <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground/60 mb-4" />
                          <p className="text-muted-foreground">
                            Select a date to see available time slots
                          </p>
                        </div>
                      )}
                      
                      <div className="mt-8 space-y-4 pt-4 border-t">
                        <h3 className="text-lg font-medium">Need Immediate Service?</h3>
                        <p className="text-sm text-muted-foreground">
                          For urgent issues requiring same-day service, please call us directly:
                        </p>
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 mr-2 text-primary" />
                          <a href="tel:+14034014822" className="text-lg font-bold hover:text-primary">(403) 401-4822</a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card className="max-w-3xl mx-auto">
                <CardContent className="pt-6 text-center">
                  <div className="mb-6">
                    <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
                    <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
                    <p className="text-muted-foreground mt-2">
                      We've received your booking request and will confirm your appointment within 2 hours (during business hours).
                    </p>
                  </div>
                  
                  <div className="space-y-4 text-left border p-4 rounded-lg bg-muted/30 mb-6">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{form.getValues().name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{form.getValues().phone}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Service</p>
                      <p className="font-medium">{form.getValues().service}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">{format(form.getValues().date, 'PPP')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium">{form.getValues().timeSlot}</p>
                      </div>
                    </div>
                    
                    {form.getValues().address && (
                      <div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Service Address</p>
                            <p className="font-medium">{form.getValues().address}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <a 
                      href={calendarLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button variant="outline" className="w-full" type="button">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Add to Google Calendar
                      </Button>
                    </a>
                    
                    <Button onClick={handleReset} className="w-full" variant="default">
                      Book Another Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
        
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose AfterHours HVAC?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-muted/30 p-6 rounded-lg text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Extended Hours</h3>
                <p className="text-muted-foreground">
                  We're available nights and weekends when other HVAC companies are closed. Your comfort doesn't wait, and neither do we.
                </p>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Response Time</h3>
                <p className="text-muted-foreground">
                  Quick booking confirmation and rapid dispatch of technicians means your HVAC issues are resolved promptly.
                </p>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-muted-foreground">
                  All our work is backed by our satisfaction guarantee. If you're not happy with our service, we'll make it right.
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