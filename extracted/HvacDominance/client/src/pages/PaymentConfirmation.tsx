import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useStripe } from '@stripe/react-stripe-js';

const PaymentConfirmation: React.FC = () => {
  const stripe = useStripe();
  const [location, setLocation] = useLocation();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'processing' | 'error'>('processing');

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Extract the payment intent client secret from the URL
    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

    if (!clientSecret) {
      setMessage('Could not find payment information. Please contact customer support.');
      setPaymentStatus('error');
      setIsLoading(false);
      return;
    }

    stripe.retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        if (!paymentIntent) {
          setMessage('Could not retrieve payment information. Please contact customer support.');
          setPaymentStatus('error');
          return;
        }

        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Your payment was successful! We\'ll be in touch shortly to schedule your installation.');
            setPaymentStatus('success');
            break;
          case 'processing':
            setMessage('Your payment is processing. We\'ll update you when payment is received.');
            setPaymentStatus('processing');
            break;
          case 'requires_payment_method':
            setMessage('Your payment was not successful, please try again.');
            setPaymentStatus('error');
            break;
          default:
            setMessage('Something went wrong. Please contact customer support.');
            setPaymentStatus('error');
            break;
        }
      })
      .catch((err) => {
        setMessage('An error occurred. Please contact customer support.');
        setPaymentStatus('error');
        console.error('Error retrieving payment intent:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [stripe]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="py-20 bg-dark flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-darkgray rounded-lg p-8 shadow-xl">
            {isLoading ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                <h2 className="text-2xl font-heading font-bold mb-2">Processing Your Payment</h2>
                <p className="text-lightgray">Please wait while we confirm your payment...</p>
              </div>
            ) : (
              <div className="text-center py-6">
                {paymentStatus === 'success' && (
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-4">
                      <i className="fas fa-check text-2xl text-white"></i>
                    </div>
                    <h2 className="text-3xl font-heading font-bold mb-4">Payment Successful!</h2>
                  </div>
                )}

                {paymentStatus === 'processing' && (
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500 mb-4">
                      <i className="fas fa-clock text-2xl text-white"></i>
                    </div>
                    <h2 className="text-3xl font-heading font-bold mb-4">Payment Processing</h2>
                  </div>
                )}

                {paymentStatus === 'error' && (
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500 mb-4">
                      <i className="fas fa-exclamation-triangle text-2xl text-white"></i>
                    </div>
                    <h2 className="text-3xl font-heading font-bold mb-4">Payment Issue</h2>
                  </div>
                )}

                <p className="text-lightgray mb-8">{message}</p>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Link href="/">
                    <a className="inline-block bg-dark border-2 border-primary hover:bg-primary hover:text-dark text-primary font-bold py-3 px-6 rounded-md transition duration-300">
                      Return to Home
                    </a>
                  </Link>

                  {paymentStatus === 'success' && (
                    <a
                      href={`mailto:jordan@afterhourshvac.ca?subject=My%20Recent%20Purchase%20Confirmation&body=Hi%20AfterHours%20HVAC%2C%0A%0AI%20recently%20made%20a%20purchase%20on%20your%20website%20and%20would%20like%20to%20confirm%20my%20installation%20details.%0A%0AThank%20you!`}
                      className="inline-block bg-primary hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition duration-300"
                    >
                      Contact About Installation
                    </a>
                  )}

                  {paymentStatus === 'error' && (
                    <Link href="/purchase">
                      <a className="inline-block bg-primary hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition duration-300">
                        Try Again
                      </a>
                    </Link>
                  )}
                </div>

                {paymentStatus === 'success' && (
                  <div className="mt-10 p-6 bg-dark rounded-lg">
                    <h3 className="text-xl font-bold mb-2">What's Next?</h3>
                    <ol className="text-left list-decimal list-inside space-y-2 text-lightgray">
                      <li className="pl-2">You'll receive a confirmation email with your purchase details</li>
                      <li className="pl-2">Our team will contact you within 24 hours to confirm your installation date</li>
                      <li className="pl-2">We'll coordinate with you for any pre-installation requirements</li>
                      <li className="pl-2">Our technicians will arrive on the scheduled date to complete your installation</li>
                    </ol>
                    <p className="mt-4 text-sm">
                      If you have any questions, please contact us at <a href="tel:4036136014" className="text-primary hover:underline">(403) 613-6014</a> or 
                      <a href="mailto:jordan@afterhourshvac.ca" className="text-primary hover:underline ml-1">jordan@afterhourshvac.ca</a>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentConfirmation;