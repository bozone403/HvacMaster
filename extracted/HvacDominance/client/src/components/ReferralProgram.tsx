import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const ReferralProgram: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    yourName: '',
    yourEmail: '',
    yourPhone: '',
    friendName: '',
    friendEmail: '',
    friendPhone: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Send referral to backend
      await apiRequest('POST', '/api/referral', formData);
      
      // Show success message
      setShowSuccess(true);
      setFormData({
        yourName: '',
        yourEmail: '',
        yourPhone: '',
        friendName: '',
        friendEmail: '',
        friendPhone: '',
        message: ''
      });
      
      toast({
        title: "Referral Submitted",
        description: "Your referral has been sent. You'll receive your $100 voucher once your friend books a service.",
      });
    } catch (error) {
      console.error('Error submitting referral:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your referral. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="referral-program" className="py-16 bg-darkgray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary font-bold">REFER A FRIEND</span>
          <h2 className="text-4xl font-heading font-bold mt-2 mb-4">Earn $100 With Our Referral Program</h2>
          <p className="text-lightgray">
            For every friend you refer who books a service with AfterHours HVAC, you'll receive a $100 voucher 
            toward your next service. It's our way of saying thanks for spreading the word!
          </p>
        </div>

        <div className="bg-dark rounded-lg p-6 md:p-8 max-w-4xl mx-auto shadow-xl">
          {!showSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Your Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-white font-medium block mb-1">Your Name*</label>
                      <input
                        type="text"
                        name="yourName"
                        value={formData.yourName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-darkgray text-white rounded-md border border-gray-700 focus:outline-none focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="text-white font-medium block mb-1">Your Email*</label>
                      <input
                        type="email"
                        name="yourEmail"
                        value={formData.yourEmail}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-darkgray text-white rounded-md border border-gray-700 focus:outline-none focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="text-white font-medium block mb-1">Your Phone*</label>
                      <input
                        type="tel"
                        name="yourPhone"
                        value={formData.yourPhone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-darkgray text-white rounded-md border border-gray-700 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Friend's Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-white font-medium block mb-1">Friend's Name*</label>
                      <input
                        type="text"
                        name="friendName"
                        value={formData.friendName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-darkgray text-white rounded-md border border-gray-700 focus:outline-none focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="text-white font-medium block mb-1">Friend's Email*</label>
                      <input
                        type="email"
                        name="friendEmail"
                        value={formData.friendEmail}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-darkgray text-white rounded-md border border-gray-700 focus:outline-none focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="text-white font-medium block mb-1">Friend's Phone*</label>
                      <input
                        type="tel"
                        name="friendPhone"
                        value={formData.friendPhone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-darkgray text-white rounded-md border border-gray-700 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-white font-medium block mb-1">Personal Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-darkgray text-white rounded-md border border-gray-700 focus:outline-none focus:border-primary"
                  placeholder="Add a personal message to your friend"
                ></textarea>
              </div>
              
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
                  ) : 'Send Referral'}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-dark p-8 rounded-lg text-center">
              <div className="mx-auto w-16 h-16 mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Referral Sent Successfully!</h3>
              <p className="text-lightgray mb-6">
                Thank you for referring your friend to AfterHours HVAC. Once they book a service,
                we'll send your $100 voucher to your email.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="bg-primary hover:bg-primary/90 text-dark font-bold py-2 px-6 rounded-md transition duration-300"
              >
                Refer Another Friend
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-dark p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h4 className="text-white font-bold mb-2">Refer a Friend</h4>
              <p className="text-lightgray">Fill out the form with your friend's information</p>
            </div>
            
            <div className="bg-dark p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h4 className="text-white font-bold mb-2">Friend Books Service</h4>
              <p className="text-lightgray">We'll contact your friend and schedule their service</p>
            </div>
            
            <div className="bg-dark p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h4 className="text-white font-bold mb-2">Get $100 Voucher</h4>
              <p className="text-lightgray">Receive your $100 voucher to use on your next service</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralProgram;