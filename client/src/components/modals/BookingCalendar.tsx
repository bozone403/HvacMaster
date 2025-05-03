import { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { createAppointmentEvent, getGoogleCalendarLinkUrl } from '@/lib/googleCalendar';

interface BookingCalendarProps {
  onClose: () => void;
  service?: string;
}

export default function BookingCalendar({ onClose, service = 'Consultation' }: BookingCalendarProps) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [calendarLink, setCalendarLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Generate available time slots for the selected date
  const getTimeSlots = () => {
    if (!date) return [];
    
    const slots = [];
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
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
    
    return slots;
  };
  
  const timeSlots = getTimeSlots();
  
  const goToStep = (nextStep: number) => {
    setStep(nextStep);
  };
  
  const handleSelectTime = (slot: string) => {
    setTimeSlot(slot);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !timeSlot || !name || !email || !phone) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would save the booking to the database here
      // await fetch('/api/bookings', {...})
      
      // Create Google Calendar event
      const calendarEvent = createAppointmentEvent({
        customerName: name,
        phone: phone,
        service: service,
        date: date.toISOString(),
        timeSlot: timeSlot,
      });
      
      // Generate calendar link
      const googleCalendarLink = getGoogleCalendarLinkUrl(calendarEvent);
      setCalendarLink(googleCalendarLink);
      
      // Move to confirmation step
      goToStep(3);
      
      toast({
        title: "Booking Successful!",
        description: "Your appointment has been scheduled.",
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Something went wrong",
        description: "Could not complete your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
      <Card className="max-w-2xl w-full overflow-hidden shadow-xl animate-in fade-in-80 zoom-in-90 duration-300">
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">
            {step === 1 && "Select a Date & Time"}
            {step === 2 && "Your Information"}
            {step === 3 && "Booking Confirmed!"}
          </h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-white/80 transition-colors"
            aria-label="Close calendar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <CardContent className="p-0">
          {/* Step indicators */}
          <div className="flex border-b">
            <div 
              className={cn(
                "flex-1 text-center py-3 text-sm font-medium cursor-pointer transition-colors",
                step >= 1 ? "bg-primary/10 text-primary" : "bg-muted/50 text-muted-foreground"
              )}
              onClick={() => step > 1 && goToStep(1)}
            >
              1. Select Date & Time
            </div>
            <div 
              className={cn(
                "flex-1 text-center py-3 text-sm font-medium cursor-pointer transition-colors",
                step >= 2 ? "bg-primary/10 text-primary" : "bg-muted/50 text-muted-foreground"
              )}
              onClick={() => step > 2 && goToStep(2)}
            >
              2. Your Information
            </div>
            <div 
              className={cn(
                "flex-1 text-center py-3 text-sm font-medium",
                step >= 3 ? "bg-primary/10 text-primary" : "bg-muted/50 text-muted-foreground"
              )}
            >
              3. Confirmation
            </div>
          </div>
          
          {/* Step 1: Date & Time Selection */}
          {step === 1 && (
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Select a Date</h4>
                <div className="border rounded-md p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => 
                      date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                      date > new Date(new Date().setMonth(new Date().getMonth() + 3)) ||
                      date.getDay() === 0 // Disable Sundays
                    }
                    initialFocus
                  />
                </div>
              </div>
              
              {date && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Select a Time</h4>
                  <div className="border rounded-md p-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Available times for {format(date, 'EEEE, MMMM do')}:
                    </p>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.length > 0 ? (
                        timeSlots.map((slot) => (
                          <Button
                            key={slot.id}
                            variant={timeSlot === slot.time ? 'default' : 'outline'}
                            className={cn(
                              'justify-start',
                              !slot.available && 'opacity-50 cursor-not-allowed'
                            )}
                            onClick={() => slot.available && handleSelectTime(slot.time)}
                            disabled={!slot.available}
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            {slot.time}
                          </Button>
                        ))
                      ) : (
                        <p className="text-center text-muted-foreground col-span-3 py-4">
                          No available slots for this date. Please select another date.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => goToStep(2)} 
                  disabled={!date || !timeSlot}
                  className="gap-2"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 2: Contact Information */}
          {step === 2 && (
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="service">
                      Service Type
                    </label>
                    <Input 
                      id="service" 
                      value={service} 
                      readOnly 
                      className="bg-muted/50"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="date">
                        Date
                      </label>
                      <Input 
                        id="date" 
                        value={date ? format(date, 'PPP') : ''} 
                        readOnly 
                        className="bg-muted/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="time">
                        Time
                      </label>
                      <Input 
                        id="time" 
                        value={timeSlot} 
                        readOnly 
                        className="bg-muted/50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">
                      Full Name*
                    </label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email Address*
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        placeholder="Your email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="phone">
                        Phone Number*
                      </label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="notes">
                      Additional Notes (Optional)
                    </label>
                    <Textarea 
                      id="notes" 
                      value={notes} 
                      onChange={(e) => setNotes(e.target.value)} 
                      placeholder="Any specific requirements or questions?"
                      rows={4}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => goToStep(1)}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !name || !email || !phone}
                  >
                    {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="p-6 text-center">
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
                    <p className="text-sm text-muted-foreground">Service</p>
                    <p className="font-medium">{service}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{name}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{date ? format(date, 'PPP') : ''}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{timeSlot}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium">{phone} | {email}</p>
                </div>
                
                {notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p className="font-medium">{notes}</p>
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
                
                <Button onClick={onClose} className="w-full" variant="default">
                  Done
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}