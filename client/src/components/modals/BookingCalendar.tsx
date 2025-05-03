import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { BookingDetails } from "@/types";

interface BookingCalendarProps {
  onClose: () => void;
  service?: string;
}

const bookingFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

// Sample available time slots
const timeSlots = [
  "9:00 AM",
  "10:30 AM",
  "1:00 PM",
  "2:30 PM",
  "4:00 PM",
  "5:30 PM",
];

// Get dates for the next 7 days
const getNextWeekDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 1; i <= 7; i++) {
    const nextDate = new Date();
    nextDate.setDate(today.getDate() + i);
    dates.push({
      date: format(nextDate, "yyyy-MM-dd"),
      display: format(nextDate, "EEE, MMM d"),
    });
  }
  
  return dates;
};

export default function BookingCalendar({ onClose, service = "Consultation" }: BookingCalendarProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { toast } = useToast();
  const availableDates = getNextWeekDates();
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: service,
      date: "",
      time: "",
    },
  });

  const onDateSelect = (date: string) => {
    setSelectedDate(date);
    form.setValue("date", date);
  };

  async function onSubmit(data: BookingFormValues) {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/bookings", data);
      
      toast({
        title: "Appointment confirmed!",
        description: `Your appointment is scheduled for ${format(new Date(data.date), "MMMM d")} at ${data.time}`,
        variant: "default",
      });
      
      onClose();
    } catch (error) {
      console.error("Failed to book appointment:", error);
      toast({
        title: "Failed to book appointment",
        description: "Please try calling us directly to schedule.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
        
        <h3 className="text-xl font-bold text-[#121212] mb-4">Schedule Your Appointment</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Service Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#DC2626] focus:border-[#DC2626]">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Consultation - Furnace">Consultation - Furnace</SelectItem>
                      <SelectItem value="Consultation - AC">Consultation - AC</SelectItem>
                      <SelectItem value="Maintenance Visit">Maintenance Visit</SelectItem>
                      <SelectItem value="Bronze Maintenance Plan">Bronze Maintenance Plan</SelectItem>
                      <SelectItem value="Gold Maintenance Plan">Gold Maintenance Plan</SelectItem>
                      <SelectItem value="Platinum Maintenance Plan">Platinum Maintenance Plan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600 mb-2">Select a Date</p>
              <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                {availableDates.map((date) => (
                  <button
                    key={date.date}
                    type="button"
                    className={cn(
                      "p-2 rounded text-sm text-center transition-colors",
                      selectedDate === date.date
                        ? "bg-[#DC2626] text-white"
                        : "bg-white border border-gray-300 hover:bg-gray-50"
                    )}
                    onClick={() => onDateSelect(date.date)}
                  >
                    {date.display}
                  </button>
                ))}
              </div>
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <p className="text-sm text-gray-600 mt-4 mb-2">Select a Time</p>
              
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant="outline"
                          className={cn(
                            "bg-white p-2 rounded border border-gray-300 text-sm hover:bg-gray-50",
                            field.value === time && "bg-[#DC2626] text-white hover:bg-[#DC2626]"
                          )}
                          onClick={() => field.onChange(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Your Name</FormLabel>
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Phone Number</FormLabel>
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
            
            <Button 
              type="submit" 
              className="w-full bg-[#DC2626] text-white font-bold py-3 rounded-md hover:bg-red-700 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm Appointment"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
