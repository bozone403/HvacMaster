import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe if the public key is available
const stripeEnabled = import.meta.env.VITE_STRIPE_PUBLIC_KEY ? true : false;
const stripePromise = stripeEnabled 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY) 
  : null;

// Form schema for booking
const bookingFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  address: z.string().min(5, { message: 'Please enter your full address' }),
  city: z.string().min(2, { message: 'Please enter your city' }),
  serviceType: z.enum(['furnace', 'aircon', 'ducting', 'emergency', 'maintenance', 'custom']),
  appointmentDate: z.string().min(1, { message: 'Please select a date' }),
  appointmentTime: z.string().min(1, { message: 'Please select a time' }),
  description: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  })
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const servicePrices = {
  furnace: 175,
  aircon: 175,
  ducting: 175,
  emergency: 350,
  maintenance: 175,
  custom: 175
};

// Payment form component
const CheckoutForm: React.FC<{
  bookingData: BookingFormValues;
  onSuccess: () => void;
  onBack: () => void;
  servicePrice: number;
}> = ({ bookingData, onSuccess, onBack, servicePrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/booking-confirmation',
        },
        redirect: 'if_required',
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message || "An error occurred during payment processing.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Payment Successful",
          description: "Your booking has been confirmed!",
        });
        onSuccess();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during payment processing.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-4">Service Details</h3>
        <div className="bg-dark p-4 rounded-md">
          <div className="flex justify-between mb-2">
            <span className="text-lightgray">Service Type:</span>
            <span className="text-white font-medium">{
              {
                'furnace': 'Furnace Installation/Repair',
                'aircon': 'Air Conditioning',
                'ducting': 'Ductwork & Ventilation',
                'emergency': 'Emergency Repair',
                'maintenance': 'Preventative Maintenance',
                'custom': 'Custom Project'
              }[bookingData.serviceType]
            }</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-lightgray">Appointment:</span>
            <span className="text-white font-medium">{bookingData.appointmentDate} at {bookingData.appointmentTime}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-lightgray">Location:</span>
            <span className="text-white font-medium">{bookingData.address}, {bookingData.city}</span>
          </div>
          <div className="border-t border-gray-700 my-2 pt-2 flex justify-between">
            <span className="text-white font-medium">Service Fee:</span>
            <span className="text-primary font-bold">${servicePrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-4">Payment Information</h3>
        <div className="bg-dark p-4 rounded-md mb-4">
          <PaymentElement />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="bg-dark border border-primary text-primary py-2 px-4 rounded-md hover:bg-primary/10 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70"
        >
          {isProcessing ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Pay & Book Service"
          )}
        </button>
      </div>
    </form>
  );
};

// Calgary area postal codes typically start with T2 or T3
const isCalgaryArea = (city: string) => {
  // Simple check for Calgary area
  const calgaryAreaCities = ['calgary', 'airdrie', 'cochrane', 'okotoks', 'chestermere'];
  return calgaryAreaCities.includes(city.toLowerCase());
};

// Determine minimum booking date based on location
const getMinBookingDate = (city: string) => {
  const today = new Date();
  
  if (isCalgaryArea(city)) {
    // Calgary area - can book starting tomorrow
    today.setDate(today.getDate() + 1);
  } else {
    // Outside Calgary - must book at least a week in advance
    today.setDate(today.getDate() + 7);
  }
  
  return today.toISOString().split('T')[0];
};

const ServiceBooking: React.FC = () => {
  const { toast } = useToast();
  const [showPayment, setShowPayment] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [minBookingDate, setMinBookingDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      serviceType: 'maintenance',
      appointmentDate: '',
      appointmentTime: '',
      description: '',
      termsAccepted: false
    }
  });

  // Create payment intent and get client secret
  const createPaymentIntent = async (serviceType: string) => {
    try {
      const response = await apiRequest('POST', '/api/create-booking-payment-intent', {
        amount: servicePrices[serviceType as keyof typeof servicePrices]
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
      return data.clientSecret;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  };

  const onSubmit = async (data: BookingFormValues) => {
    setIsLoading(true);
    try {
      // Save booking data for payment step
      setBookingData(data);
      
      // If Stripe is enabled, create payment intent and show payment form
      if (stripeEnabled) {
        await createPaymentIntent(data.serviceType);
        setShowPayment(true);
      } else {
        // Otherwise, just submit the form without payment
        await submitBookingWithoutPayment(data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'There was a problem submitting your booking. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const submitBookingWithoutPayment = async (data: BookingFormValues) => {
    // Submit booking without payment
    await apiRequest('POST', '/api/booking', data);
    toast({
      title: 'Booking Submitted',
      description: 'Your service has been booked! We will contact you to confirm shortly.',
    });
    form.reset();
  };

  const availableTimes = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', 
    '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
  ];

  return (
    <section id="book-service" className="py-16 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary font-bold">SCHEDULE WITH CONFIDENCE</span>
          <h2 className="text-4xl font-heading font-bold mt-2 mb-4">Book Your HVAC Service</h2>
          <p className="text-lightgray">
            Book and pay for your service appointment online. Our expert technicians are ready to serve from 
            Lethbridge to Edmonton and across the Vancouver greater area.
          </p>
        </div>

        <div className="bg-darkgray rounded-lg p-6 md:p-8 max-w-4xl mx-auto shadow-xl">
          {!showPayment ? (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white font-medium">Full Name</label>
                  <input
                    {...form.register('name')}
                    className="w-full px-4 py-2 bg-dark text-white rounded-md border border-gray-700 focus:outline-none focus:border-primary"
                    placeholder="Your full name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">Phone Number</label>
                  <input
                    {...form.register('phone')}
                    className="w-full px-4 py-2 bg-dark text-white rounded-md border border-gray-700 focus:outline-none focus:border-primary"
                    placeholder="Your phone number"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-red-500 text-sm">{form.formState.errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">Email Address</label>
                  <input
                    {...form.register('email')}
                    className="w-full px-4 py-2 bg-dark text-white rounded-md border border-gray-700 focus:outline-none focus:border-primary"
                    placeholder="Your email address"
                    type="email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">Service Address</label>
                  <input
                    {...form.register('address')}
                    className="w-full px-4 py-2 bg-dark text-white rounded-md border border-gray-700 focus:outline-none focus:border-primary"
                    placeholder="Service address"
                  />
                  {form.formState.errors.address && (
                    <p className="text-red-500 text-sm">{form.formState.errors.address.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">City</label>
                  <input
                    {...form.register('city', {
                      onChange: (e) => {
                        const city = e.target.value;
                        if (city.length > 2) {
                          setMinBookingDate(getMinBookingDate(city));
                          
                          // Clear date if it's now invalid with the new min date
                          const currentDate = form.getValues('appointmentDate');
                          if (currentDate && new Date(currentDate) < new Date(getMinBookingDate(city))) {
                            form.setValue('appointmentDate', '');
                          }
                        }
                      }
                    })}
                    className="w-full px-4 py-2 bg-dark text-white rounded-md border border-gray-700 focus:outline-none focus:border-primary"
                    placeholder="City"
                  />
                  {form.formState.errors.city && (
                    <p className="text-red-500 text-sm">{form.formState.errors.city.message}</p>
                  )}
                  {form.getValues('city') && !isCalgaryArea(form.getValues('city')) && form.getValues('city').length > 2 && (
                    <p className="text-amber-400 text-xs mt-1">
                      Outside Calgary area: Appointments must be booked at least 7 days in advance.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">Service Type</label>
                  <select
                    {...form.register('serviceType')}
                    className="w-full px-4 py-2 bg-dark text-white rounded-md border border-gray-700 focus:outline-none focus:border-primary"
                  >
                    <option value="furnace">Furnace Installation/Repair</option>
                    <option value="aircon">Air Conditioning</option>
                    <option value="ducting">Ductwork & Ventilation</option>
                    <option value="emergency">Emergency Repair</option>
                    <option value="maintenance">Preventative Maintenance</option>
                    <option value="custom">Custom Project</option>
                  </select>
                  {form.formState.errors.serviceType && (
                    <p className="text-red-500 text-sm">{form.formState.errors.serviceType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">Preferred Date</label>
                  <input
                    {...form.register('appointmentDate')}
                    className="w-full px-4 py-2 bg-dark text-white rounded-md border border-gray-700 focus:outline-none focus:border-primary"
                    type="date"
                    min={minBookingDate}
                  />
                  {form.formState.errors.appointmentDate && (
                    <p className="text-red-500 text-sm">{form.formState.errors.appointmentDate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">Preferred Time</label>
                  <select
                    {...form.register('appointmentTime')}
                    className="w-full px-4 py-2 bg-dark text-white rounded-md border border-gray-700 focus:outline-none focus:border-primary"
                  >
                    <option value="">Select a time</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {form.formState.errors.appointmentTime && (
                    <p className="text-red-500 text-sm">{form.formState.errors.appointmentTime.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium">Description of Service Needed</label>
                <textarea
                  {...form.register('description')}
                  className="w-full px-4 py-2 bg-dark text-white rounded-md border border-gray-700 focus:outline-none focus:border-primary min-h-[100px]"
                  placeholder="Please describe your HVAC issue or project needs"
                ></textarea>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  {...form.register('termsAccepted')}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-white text-sm">
                  I agree to the <a href="#" className="text-primary underline">terms and conditions</a>. 
                  I understand a service fee of ${servicePrices[form.getValues('serviceType') as keyof typeof servicePrices]} 
                  will be charged and applied towards any work performed.
                </label>
              </div>
              {form.formState.errors.termsAccepted && (
                <p className="text-red-500 text-sm">{form.formState.errors.termsAccepted.message}</p>
              )}

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90 text-dark font-bold py-3 px-8 rounded-md transition duration-300 ease-in-out disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : stripeEnabled ? 'Continue to Payment' : 'Book Service'}
                </button>
              </div>
            </form>
          ) : (
            <div className="payment-container">
              {bookingData && clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm 
                    bookingData={bookingData} 
                    servicePrice={servicePrices[bookingData.serviceType as keyof typeof servicePrices]}
                    onSuccess={() => {
                      // Handle successful payment
                      submitBookingWithoutPayment(bookingData);
                      setShowPayment(false);
                      form.reset();
                    }}
                    onBack={() => setShowPayment(false)}
                  />
                </Elements>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-primary font-medium">Preparing payment form...</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-12 text-center text-lightgray max-w-2xl mx-auto">
          <h3 className="text-white text-lg font-medium mb-2">Service Areas</h3>
          <p>We proudly serve customers throughout <span className="text-primary">Alberta</span> (from Lethbridge to Edmonton) and the <span className="text-primary">Vancouver greater area</span> in British Columbia.</p>
          
          <div className="mt-6">
            <h3 className="text-white text-lg font-medium mb-2">Need Immediate Help?</h3>
            <p className="mb-4">For emergency service, call our 24/7 hotline</p>
            <a 
              href="tel:403-613-6014" 
              className="text-2xl font-bold text-primary hover:underline transition duration-300 hover:scale-105 inline-block"
            >
              403-613-6014
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBooking;