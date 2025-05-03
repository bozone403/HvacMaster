import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { useToast } from "@/hooks/use-toast";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'furnace' | 'ac' | 'maintenance';
  isAnnual?: boolean;
};

const products: Product[] = [
  // Furnaces
  {
    id: 'furnace-single-stage',
    name: 'Single Stage ECM Furnace',
    description: 'Basic high-efficiency furnace with single-stage heating and ECM motor. Includes standard installation and manufacturers warranty.',
    price: 5999,
    category: 'furnace'
  },
  {
    id: 'furnace-two-stage',
    name: 'Two-Stage High-Efficiency Furnace',
    description: 'Mid-tier high-efficiency furnace with two-stage heating for better temperature control. Includes standard installation and enhanced warranty.',
    price: 6499,
    category: 'furnace'
  },
  {
    id: 'furnace-modulating',
    name: 'Modulating/Communicating Furnace',
    description: 'Premium high-efficiency modulating furnace with variable-speed blower for perfect comfort. Includes premium installation and extended warranty.',
    price: 7499,
    category: 'furnace'
  },
  
  // Air Conditioners
  {
    id: 'ac-16-seer',
    name: '16 SEER2 Entry-Level A/C',
    description: 'Basic high-efficiency air conditioner. Includes standard installation and manufacturers warranty.',
    price: 6499,
    category: 'ac'
  },
  {
    id: 'ac-18-seer',
    name: '17-18 SEER2 Mid-Tier A/C',
    description: 'Enhanced efficiency air conditioner with better comfort control. Includes standard installation and enhanced warranty.',
    price: 6999,
    category: 'ac'
  },
  {
    id: 'ac-variable-speed',
    name: 'Variable Speed / Inverter A/C',
    description: 'Premium high-efficiency variable speed air conditioner for perfect comfort. Includes premium installation and extended warranty.',
    price: 8499,
    category: 'ac'
  },
  
  // Maintenance Plans
  {
    id: 'plan-bronze',
    name: 'Bronze Maintenance Plan',
    description: 'Basic annual maintenance plan with one furnace tune-up per year and 10% discount on repairs.',
    price: 275,
    category: 'maintenance',
    isAnnual: true
  },
  {
    id: 'plan-gold',
    name: 'Gold Maintenance Plan',
    description: 'Enhanced maintenance plan with furnace and A/C service, priority booking, and 12% discount on repairs.',
    price: 899,
    category: 'maintenance',
    isAnnual: true
  },
  {
    id: 'plan-platinum',
    name: 'Platinum Maintenance Plan',
    description: 'Premium maintenance plan with full spring and fall service, emergency fees waived, and 15% discount on all work.',
    price: 2500,
    category: 'maintenance',
    isAnnual: true
  }
];

const Purchase = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: 'Alberta',
    postalCode: '',
    installationDate: '',
    additionalNotes: ''
  });
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  
  useEffect(() => {
    // Get the product ID from URL query params
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    
    if (productId) {
      const foundProduct = products.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Product not found
        toast({
          title: 'Product Not Found',
          description: 'The requested product could not be found.',
          variant: 'destructive'
        });
        setLocation('/pricing');
      }
    } else {
      // No product specified
      setLocation('/pricing');
    }
    
    setLoading(false);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep(2);
  };
  
  const handlePayment = async () => {
    setPaymentProcessing(true);
    
    // In a real implementation, we would integrate with Stripe or another payment processor here
    // For now, we'll simulate a successful payment after a short delay
    try {
      // Simulating API call to process payment
      setTimeout(() => {
        // Show success toast
        toast({
          title: 'Payment Successful!',
          description: 'Your purchase has been completed successfully. We will contact you shortly to confirm your installation details.',
        });
        
        // Redirect to confirmation page
        setLocation('/purchase-confirmation');
      }, 2000);
    } catch (error) {
      toast({
        title: 'Payment Failed',
        description: 'There was an issue processing your payment. Please try again.',
        variant: 'destructive'
      });
      setPaymentProcessing(false);
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
              <p className="text-gray-400 mb-8">The requested product could not be found.</p>
              <button 
                onClick={() => setLocation('/pricing')}
                className="bg-primary hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
              >
                Return to Pricing
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-black">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">
              Purchase {product.name}
            </h1>
            <p className="text-gray-400 mb-8">
              Complete your order details below to schedule your installation.
            </p>
          </motion.div>
          
          {/* Checkout Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${checkoutStep >= 1 ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}>
                1
              </div>
              <div className={`w-24 h-1 ${checkoutStep >= 2 ? 'bg-primary' : 'bg-gray-700'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${checkoutStep >= 2 ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}>
                2
              </div>
              <div className={`w-24 h-1 ${checkoutStep >= 3 ? 'bg-primary' : 'bg-gray-700'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${checkoutStep >= 3 ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}>
                3
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <p className="text-sm text-gray-400">
                {checkoutStep === 1 ? 'Contact Information' : checkoutStep === 2 ? 'Review Order' : 'Payment'}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Side - Form or Review */}
            <div className="lg:col-span-2">
              {checkoutStep === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-900 rounded-xl p-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-gray-300 mb-2">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-gray-300 mb-2">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-gray-300 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label htmlFor="address" className="block text-gray-300 mb-2">Street Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div>
                        <label htmlFor="city" className="block text-gray-300 mb-2">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="province" className="block text-gray-300 mb-2">Province</label>
                        <select
                          id="province"
                          name="province"
                          value={formData.province}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="Alberta">Alberta</option>
                          <option value="British Columbia">British Columbia</option>
                          <option value="Saskatchewan">Saskatchewan</option>
                          <option value="Manitoba">Manitoba</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="postalCode" className="block text-gray-300 mb-2">Postal Code</label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    
                    {(product.category === 'furnace' || product.category === 'ac') && (
                      <div className="mt-6">
                        <label htmlFor="installationDate" className="block text-gray-300 mb-2">Preferred Installation Date</label>
                        <input
                          type="date"
                          id="installationDate"
                          name="installationDate"
                          value={formData.installationDate}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <label htmlFor="additionalNotes" className="block text-gray-300 mb-2">Additional Notes (Optional)</label>
                      <textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      ></textarea>
                    </div>
                    
                    <div className="mt-8">
                      <button
                        type="submit"
                        className="w-full bg-primary hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                      >
                        Continue to Review
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
              
              {checkoutStep === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-900 rounded-xl p-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Review Your Order</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-300 mb-2">Contact Information</h3>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <p className="text-white">{formData.firstName} {formData.lastName}</p>
                        <p className="text-gray-400">{formData.email}</p>
                        <p className="text-gray-400">{formData.phone}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-300 mb-2">Installation Address</h3>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <p className="text-white">{formData.address}</p>
                        <p className="text-gray-400">{formData.city}, {formData.province} {formData.postalCode}</p>
                      </div>
                    </div>
                    
                    {formData.installationDate && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-300 mb-2">Installation Details</h3>
                        <div className="bg-gray-800 rounded-lg p-4">
                          <p className="text-white">Preferred Date: {new Date(formData.installationDate).toLocaleDateString()}</p>
                          {formData.additionalNotes && (
                            <div className="mt-2">
                              <p className="text-gray-400">Notes: {formData.additionalNotes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={() => setCheckoutStep(1)}
                      className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCheckoutStep(3)}
                      className="flex-1 bg-primary hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </motion.div>
              )}
              
              {checkoutStep === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-900 rounded-xl p-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Payment Information</h2>
                  
                  <div className="mb-8">
                    <div className="bg-gray-800 rounded-lg p-4 mb-6">
                      <p className="text-gray-400 text-sm mb-2">This is a demonstration payment form. In a real implementation, this would be connected to a payment processor like Stripe.</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="cardName" className="block text-gray-300 mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          placeholder="John Doe"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cardNumber" className="block text-gray-300 mb-2">Card Number</label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="4242 4242 4242 4242"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="expDate" className="block text-gray-300 mb-2">Expiration Date</label>
                          <input
                            type="text"
                            id="expDate"
                            name="expDate"
                            placeholder="MM/YY"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cvv" className="block text-gray-300 mb-2">CVV</label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={() => setCheckoutStep(2)}
                      className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                      disabled={paymentProcessing}
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePayment}
                      className="flex-1 bg-primary hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                      disabled={paymentProcessing}
                    >
                      {paymentProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>Complete Payment</>  
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Right Side - Order Summary */}
            <div>
              <div className="bg-gray-900 rounded-xl p-6 sticky top-6">
                <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
                
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gray-800 w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0">
                      <i className={`fas ${product.category === 'furnace' ? 'fa-fire' : product.category === 'ac' ? 'fa-snowflake' : 'fa-tools'} text-primary`}></i>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{product.name}</h3>
                      <p className="text-gray-400 text-sm">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-800 pt-4">
                    <p className="text-gray-400 text-sm mb-2">{product.description}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">{formatPrice(product.price)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">GST (5%)</span>
                    <span className="text-white">{formatPrice(product.price * 0.05)}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-lg font-bold text-primary">{formatPrice(product.price * 1.05)}</span>
                  </div>
                  {product.isAnnual && (
                    <p className="text-gray-400 text-xs mt-1">Annual subscription</p>
                  )}
                </div>
                
                <div className="mt-6 text-sm text-gray-500">
                  <p>Your data is secured with 256-bit SSL encryption.</p>
                  <div className="flex items-center gap-2 mt-2">
                    <i className="fas fa-lock text-green-500"></i>
                    <span>Secure transaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Purchase;
