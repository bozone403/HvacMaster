import React, { useState } from 'react';
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useToast } from '@/hooks/use-toast';
import PaymentOptions from '@/components/PaymentOptions';

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface PackageOption {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  image: string;
}

// Quick purchase packages offered
const packages: PackageOption[] = [
  {
    id: 'furnace-standard',
    name: 'Standard Furnace Installation',
    description: 'High-efficiency (95%+ AFUE) single-stage furnace with ECM motor. Complete installation with all permits and inspections.',
    price: 6499,
    features: [
      'Single-stage 95%+ AFUE high-efficiency furnace',
      'ECM variable-speed motor for better efficiency',
      'New filter rack and filter',
      'Full installation including permit',
      'Removal of old equipment',
      '10-year parts warranty'
    ],
    image: 'https://images.unsplash.com/photo-1505501231541-9d7536c59915?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'furnace-premium',
    name: 'Premium Furnace Installation',
    description: 'Two-stage high-efficiency furnace (96%+ AFUE) with additional comfort features. Includes programmable thermostat.',
    price: 6999,
    features: [
      'Two-stage 96%+ AFUE high-efficiency furnace',
      'Advanced ECM motor for optimal efficiency',
      'Programmable smart thermostat',
      'New filter system and humidifier',
      'Full installation including permit',
      'Removal of old equipment',
      '10-year parts and labor warranty'
    ],
    image: 'https://images.unsplash.com/photo-1524647429215-60ce0b616bed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ac-standard',
    name: 'Standard AC Installation',
    description: '16 SEER2 air conditioning system with complete installation. Meets all Alberta energy codes.',
    price: 6499,
    features: [
      '16 SEER2 energy-efficient air conditioner',
      'Proper sizing for your home',
      'New refrigerant lines',
      'New thermostat if needed',
      'Full installation including permit',
      '10-year parts warranty'
    ],
    image: 'https://images.unsplash.com/photo-1595514535415-dae8970c381a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ac-premium',
    name: 'Premium AC Installation',
    description: '17+ SEER2 air conditioning system with enhanced cooling and noise reduction. Perfect for Calgary summers.',
    price: 6999,
    features: [
      '17+ SEER2 higher-efficiency air conditioner',
      'Quieter operation (as low as 69 decibels)',
      'Enhanced comfort features',
      'Smart thermostat included',
      'Full installation including permit',
      'Removal of old equipment if needed',
      '10-year parts and labor warranty'
    ],
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'combo-standard',
    name: 'Furnace & AC Combo Installation',
    description: 'Complete heating and cooling solution with matched high-efficiency equipment. Save by bundling both services.',
    price: 11999,
    features: [
      'High-efficiency 95%+ AFUE furnace',
      '16 SEER2 air conditioning system',
      'Matched system for optimal performance',
      'New filter system and refrigerant lines',
      'Programmable thermostat',
      'Full installation including permits',
      'Removal of old equipment',
      '10-year parts warranty',
      'Save $1,000 compared to purchasing separately'
    ],
    image: 'https://images.unsplash.com/photo-1621155346394-7a4a67ba2220?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

// Customer information form component
const CustomerInfoForm = ({ 
  onSubmit, 
  onCancel, 
  selectedPackage 
}: { 
  onSubmit: (customerInfo: any) => void; 
  onCancel: () => void; 
  selectedPackage: PackageOption; 
}) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    preferredDate: '',
    specialInstructions: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Calgary area postal codes typically start with T2 or T3
  const isCalgaryArea = (postalCode: string) => {
    return postalCode.toUpperCase().startsWith('T2') || postalCode.toUpperCase().startsWith('T3');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
    
    // When postal code changes, update date restrictions
    if (name === 'postalCode' && value.length >= 3) {
      const dateInput = document.getElementById('preferredDate') as HTMLInputElement;
      if (dateInput) {
        const today = new Date();
        
        if (isCalgaryArea(value)) {
          // Calgary area - can book starting tomorrow
          today.setDate(today.getDate() + 1);
        } else {
          // Outside Calgary - must book at least a week in advance
          today.setDate(today.getDate() + 7);
        }
        
        dateInput.min = today.toISOString().split('T')[0];
        
        // Clear date if it's now invalid
        if (customerInfo.preferredDate && new Date(customerInfo.preferredDate) < today) {
          setCustomerInfo(prev => ({ ...prev, preferredDate: '' }));
        }
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!customerInfo.name.trim()) newErrors.name = 'Name is required';
    if (!customerInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(customerInfo.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(customerInfo.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!customerInfo.address.trim()) newErrors.address = 'Address is required';
    if (!customerInfo.city.trim()) newErrors.city = 'City is required';
    if (!customerInfo.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    } else if (!/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(customerInfo.postalCode)) {
      newErrors.postalCode = 'Please enter a valid Canadian postal code (e.g., A1A 1A1)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(customerInfo);
    }
  };

  return (
    <div className="bg-darkgray rounded-lg p-6 mt-6">
      <h3 className="text-xl font-bold mb-4">Complete Your Purchase</h3>
      
      <div className="mb-6 p-4 bg-dark rounded-md">
        <div className="flex items-center">
          <img 
            src={selectedPackage.image} 
            alt={selectedPackage.name} 
            className="w-16 h-16 object-cover rounded-md mr-4"
          />
          <div>
            <h4 className="font-bold">{selectedPackage.name}</h4>
            <p className="text-primary font-bold text-xl">${selectedPackage.price.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">Full Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerInfo.name}
              onChange={handleChange}
              className={`w-full bg-dark border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-md px-3 py-2 focus:border-primary focus:outline-none`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerInfo.email}
              onChange={handleChange}
              className={`w-full bg-dark border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-md px-3 py-2 focus:border-primary focus:outline-none`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={customerInfo.phone}
              onChange={handleChange}
              className={`w-full bg-dark border ${errors.phone ? 'border-red-500' : 'border-gray-600'} rounded-md px-3 py-2 focus:border-primary focus:outline-none`}
              placeholder="(123) 456-7890"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="preferredDate">Preferred Installation Date</label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              value={customerInfo.preferredDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full bg-dark border border-gray-600 rounded-md px-3 py-2 focus:border-primary focus:outline-none"
            />
            {customerInfo.postalCode && customerInfo.postalCode.length >= 3 && !isCalgaryArea(customerInfo.postalCode) && (
              <p className="text-amber-400 text-xs mt-1">
                Outside Calgary area: Installation dates must be at least 7 days in advance.
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="address">Street Address*</label>
            <input
              type="text"
              id="address"
              name="address"
              value={customerInfo.address}
              onChange={handleChange}
              className={`w-full bg-dark border ${errors.address ? 'border-red-500' : 'border-gray-600'} rounded-md px-3 py-2 focus:border-primary focus:outline-none`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="city">City*</label>
            <input
              type="text"
              id="city"
              name="city"
              value={customerInfo.city}
              onChange={handleChange}
              className={`w-full bg-dark border ${errors.city ? 'border-red-500' : 'border-gray-600'} rounded-md px-3 py-2 focus:border-primary focus:outline-none`}
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="postalCode">Postal Code*</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={customerInfo.postalCode}
              onChange={handleChange}
              className={`w-full bg-dark border ${errors.postalCode ? 'border-red-500' : 'border-gray-600'} rounded-md px-3 py-2 focus:border-primary focus:outline-none`}
              placeholder="A1A 1A1"
            />
            {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="specialInstructions">Special Instructions (Optional)</label>
          <textarea
            id="specialInstructions"
            name="specialInstructions"
            value={customerInfo.specialInstructions}
            onChange={handleChange}
            rows={3}
            className="w-full bg-dark border border-gray-600 rounded-md px-3 py-2 focus:border-primary focus:outline-none"
          ></textarea>
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="bg-dark border border-gray-600 hover:border-lightgray text-white px-4 py-2 rounded-md transition duration-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-md transition duration-300"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

// Payment processing component
const CheckoutForm = ({ 
  customerInfo, 
  selectedPackage, 
  onSuccess, 
  onCancel 
}: { 
  customerInfo: any; 
  selectedPackage: PackageOption; 
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentOption, setPaymentOption] = useState('full'); // 'full', 'afterpay', or 'financing'
  const { toast } = useToast();
  
  // Handle payment option change
  const handlePaymentOptionChange = async (option: string) => {
    // Only update if the option actually changed
    if (option === paymentOption) return;
    
    setPaymentOption(option);
    
    // If changing to/from Afterpay, we need to update the payment intent on the server
    if (option === 'afterpay' || paymentOption === 'afterpay') {
      setIsProcessing(true);
      
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: selectedPackage.price,
            serviceType: selectedPackage.id,
            paymentOption: option,
            bookingDetails: {
              name: customerInfo.name,
              phone: customerInfo.phone,
              address: customerInfo.address,
              city: customerInfo.city,
              postalCode: customerInfo.postalCode,
              date: customerInfo.preferredDate
            }
          }),
        });
        
        const data = await response.json();
        
        if (data.error) {
          toast({
            title: "Error",
            description: data.error.message || "Failed to update payment method.",
            variant: "destructive",
          });
          // Revert to previous option if there was an error
          setPaymentOption(paymentOption);
        } else {
          // Need to reload the Elements with the new payment intent
          window.location.reload();
        }
      } catch (error) {
        console.error('Error updating payment option:', error);
        toast({
          title: "Error",
          description: "Failed to update payment method. Please try again.",
          variant: "destructive",
        });
        // Revert to previous option
        setPaymentOption(paymentOption);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    try {
      // For all payment options, add the payment method specific metadata
      const paymentMethodOptions: any = {
        billing_details: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: {
            line1: customerInfo.address,
            city: customerInfo.city,
            postal_code: customerInfo.postalCode,
            country: 'CA',
          }
        }
      };

      // If using Afterpay, specify that payment method
      if (paymentOption === 'afterpay') {
        paymentMethodOptions.afterpay_clearpay = {};
      }

      const confirmOptions: any = {
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmation`,
          payment_method_data: paymentMethodOptions,
          payment_method_options: paymentOption === 'afterpay' 
            ? { afterpay_clearpay: { setup_future_usage: 'off_session' } } 
            : undefined,
          // Include metadata about the payment type
          metadata: {
            payment_option: paymentOption,
            // For financing, include details for follow-up
            financing_requested: paymentOption === 'financing' ? 'yes' : 'no',
            financing_term: paymentOption === 'financing' ? '24 months' : ''
          }
        },
      };

      const { error } = await stripe.confirmPayment(confirmOptions);

      if (error) {
        setPaymentError(error.message || 'An error occurred during payment processing');
        
        // Special handling for Afterpay/financing errors
        if (paymentOption === 'afterpay' && error.message?.includes('afterpay')) {
          toast({
            title: "Afterpay Error",
            description: "There was an issue with the Afterpay payment option. Please try a different payment method.",
            variant: "destructive",
          });
        } else if (paymentOption === 'financing' && error.message?.includes('amount')) {
          toast({
            title: "Financing Error",
            description: "There was an issue with the financing option. Our team will contact you to discuss alternative financing.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Payment Failed",
            description: error.message || "Your payment could not be processed. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        onSuccess();
      }
    } catch (err: any) {
      setPaymentError(err.message || 'An error occurred during payment processing');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-darkgray rounded-lg p-6 mt-6">
      <h3 className="text-xl font-bold mb-4">Payment Information</h3>
      
      <div className="mb-6 p-4 bg-dark rounded-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={selectedPackage.image} 
              alt={selectedPackage.name} 
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
            <div>
              <h4 className="font-bold">{selectedPackage.name}</h4>
              <p className="text-sm text-lightgray">Installation at: {customerInfo.address}, {customerInfo.city}</p>
            </div>
          </div>
          <p className="text-primary font-bold text-xl">${selectedPackage.price.toLocaleString()}</p>
        </div>
      </div>
      
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentOptions 
          totalAmount={selectedPackage.price}
          selectedOption={paymentOption}
          onOptionSelect={handlePaymentOptionChange}
        />
        
        <div className="mt-6">
          <PaymentElement />
        </div>
        
        {paymentOption === 'afterpay' && (
          <div className="mt-4 p-3 bg-dark border border-primary/30 rounded-md">
            <h4 className="font-bold text-white text-sm mb-1">Afterpay Selected</h4>
            <p className="text-sm text-lightgray">
              You'll make your first payment today, and the remaining 3 payments will be automatically charged to your payment method every 2 weeks.
            </p>
          </div>
        )}
        
        {paymentOption === 'financing' && (
          <div className="mt-4 p-3 bg-dark border border-primary/30 rounded-md">
            <h4 className="font-bold text-white text-sm mb-1">Financing Selected</h4>
            <p className="text-sm text-lightgray">
              After payment confirmation, our team will contact you to complete the credit application process and finalize your financing terms.
            </p>
          </div>
        )}
        
        {paymentError && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-md text-red-200">
            <p>{paymentError}</p>
          </div>
        )}
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="bg-dark border border-gray-600 hover:border-lightgray text-white px-4 py-2 rounded-md transition duration-300"
            disabled={isProcessing}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className={`bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-md transition duration-300 flex items-center ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>Complete Payment</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// Package selection component
const PackageSelection = ({ 
  packages, 
  onSelect 
}: { 
  packages: PackageOption[]; 
  onSelect: (pkg: PackageOption) => void; 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {packages.map(pkg => (
        <div key={pkg.id} className="bg-darkgray rounded-lg overflow-hidden border border-gray-800 hover:border-primary transition-all duration-300 flex flex-col">
          <div 
            className="h-48 bg-cover bg-center" 
            style={{ backgroundImage: `url(${pkg.image})` }}
          ></div>
          <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-lg font-bold mb-2">{pkg.name}</h3>
            <p className="text-lightgray text-sm mb-4">{pkg.description}</p>
            <div className="mb-4 flex-grow">
              <ul className="text-sm text-lightgray">
                {pkg.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start mb-2">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span>{feature}</span>
                  </li>
                ))}
                {pkg.features.length > 3 && (
                  <li className="text-primary text-sm">+ {pkg.features.length - 3} more features</li>
                )}
              </ul>
            </div>
            <div className="mt-auto">
              <div className="flex items-baseline mb-4">
                <span className="text-2xl font-bold text-primary">${pkg.price.toLocaleString()}</span>
                <span className="text-sm text-lightgray ml-2">Complete Installation</span>
              </div>
              <button
                onClick={() => onSelect(pkg)}
                className="w-full bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
              >
                <i className="fas fa-shopping-cart mr-2"></i> Purchase Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const QuickPurchaseWrapper = () => {
  const [selectedPackage, setSelectedPackage] = useState<PackageOption | null>(null);
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const { toast } = useToast();

  const handleSelectPackage = (pkg: PackageOption) => {
    setSelectedPackage(pkg);
  };

  const handleCustomerInfoSubmit = async (info: any) => {
    setCustomerInfo(info);
    
    try {
      // Create payment intent on the server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedPackage?.price,
          serviceType: selectedPackage?.id,
          paymentOption: 'full', // Default to full payment initially
          bookingDetails: {
            name: info.name,
            phone: info.phone,
            address: info.address,
            city: info.city,
            postalCode: info.postalCode,
            date: info.preferredDate,
            specialInstructions: info.specialInstructions
          }
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        toast({
          title: "Error",
          description: data.error.message || "Failed to initialize payment. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      toast({
        title: "Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
    toast({
      title: "Payment Successful",
      description: "Your purchase has been confirmed! You'll receive a confirmation email shortly.",
    });
  };

  const handleBack = () => {
    if (clientSecret) {
      setClientSecret('');
    } else if (customerInfo) {
      setCustomerInfo(null);
    } else {
      setSelectedPackage(null);
    }
  };

  const resetPurchaseFlow = () => {
    setSelectedPackage(null);
    setCustomerInfo(null);
    setClientSecret('');
    setPaymentCompleted(false);
  };

  // Render payment confirmation
  if (paymentCompleted) {
    return (
      <section id="quick-purchase" className="py-16 bg-dark">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-4">
                <i className="fas fa-check text-2xl text-white"></i>
              </div>
              <h2 className="text-3xl font-heading font-bold mt-2 mb-4">Payment Successful!</h2>
              <p className="text-lightgray mb-8">
                Thank you for your purchase. Your {selectedPackage?.name} has been confirmed and you'll receive a confirmation email shortly with all the details.
              </p>
              <button
                onClick={resetPurchaseFlow}
                className="bg-primary hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 inline-block"
              >
                Return to Packages
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quick-purchase" className="py-16 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-primary font-bold">QUICK PURCHASE</span>
          <h2 className="text-4xl font-heading font-bold mt-2 mb-4">Direct HVAC Installation Packages</h2>
          <p className="text-lightgray">
            Select and purchase your heating or cooling solution in minutes. Fixed pricing with no surprises - every package includes complete installation with all permits.
          </p>
        </div>
        
        {!selectedPackage ? (
          // Step 1: Package selection
          <PackageSelection packages={packages} onSelect={handleSelectPackage} />
        ) : !customerInfo ? (
          // Step 2: Customer information
          <CustomerInfoForm 
            onSubmit={handleCustomerInfoSubmit} 
            onCancel={handleBack} 
            selectedPackage={selectedPackage} 
          />
        ) : (
          // Step 3: Payment with Stripe
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm 
              customerInfo={customerInfo}
              selectedPackage={selectedPackage}
              onSuccess={handlePaymentSuccess}
              onCancel={handleBack}
            />
          </Elements>
        )}
      </div>
    </section>
  );
};

export default QuickPurchaseWrapper;