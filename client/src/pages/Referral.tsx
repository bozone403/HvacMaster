import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { useToast } from "@/hooks/use-toast";

// Referral form schema
const referralSchema = z.object({
  yourName: z.string().min(3, { message: "Your name is required" }),
  yourEmail: z.string().email({ message: "Valid email is required" }),
  yourPhone: z.string().min(10, { message: "Valid phone number is required" }),
  friendName: z.string().min(3, { message: "Friend's name is required" }),
  friendEmail: z.string().email({ message: "Valid email is required" }),
  friendPhone: z.string().min(10, { message: "Valid phone number is required" }),
  message: z.string().optional(),
});

type ReferralFormData = z.infer<typeof referralSchema>;

const Referral = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<ReferralFormData>({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      yourName: '',
      yourEmail: '',
      yourPhone: '',
      friendName: '',
      friendEmail: '',
      friendPhone: '',
      message: ''
    }
  });
  
  const onSubmit = async (data: ReferralFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, we would call an API endpoint here
      // For now, we'll simulate a successful submission after a short delay
      setTimeout(() => {
        // Show success toast
        toast({
          title: "Referral Submitted!",
          description: "Your referral has been sent. We'll contact your friend shortly."
        });
        
        setSubmitted(true);
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your referral. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main>
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
                Referral Program & <span className="text-primary">Discounts</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Refer your friends and family to AfterHours HVAC and earn rewards for both of you!
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Referral Program Benefits */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-white">
                How The Program <span className="text-primary">Works</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our referral program rewards both you and your friends with exclusive benefits
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-black p-8 rounded-xl border border-gray-800 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-user-plus text-2xl text-primary"></i>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">1. Refer a Friend</h3>
                <p className="text-gray-400">
                  Fill out the referral form with your friend's details or share your unique referral code.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-black p-8 rounded-xl border border-gray-800 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-tools text-2xl text-primary"></i>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">2. They Book a Service</h3>
                <p className="text-gray-400">
                  When your friend books any qualified service with AfterHours HVAC, they receive $50 off their first service.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-black p-8 rounded-xl border border-gray-800 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-gift text-2xl text-primary"></i>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">3. You Get Rewarded</h3>
                <p className="text-gray-400">
                  You earn a $100 credit toward your next service or maintenance plan. No limits on how many friends you can refer!
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Referral Form Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="text-center mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4 text-white">
                  Refer a <span className="text-primary">Friend</span>
                </h2>
                <p className="text-gray-400">
                  Fill out the form below to refer a friend and start earning rewards
                </p>
              </motion.div>
              
              {!submitted ? (
                <motion.div
                  className="bg-gray-900 rounded-xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white border-b border-gray-800 pb-2">Your Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="yourName" className="block text-gray-300 mb-2">Your Name</label>
                          <input
                            type="text"
                            id="yourName"
                            {...form.register("yourName")}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          {form.formState.errors.yourName && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.yourName.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="yourEmail" className="block text-gray-300 mb-2">Your Email</label>
                          <input
                            type="email"
                            id="yourEmail"
                            {...form.register("yourEmail")}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          {form.formState.errors.yourEmail && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.yourEmail.message}</p>
                          )}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label htmlFor="yourPhone" className="block text-gray-300 mb-2">Your Phone Number</label>
                          <input
                            type="tel"
                            id="yourPhone"
                            {...form.register("yourPhone")}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          {form.formState.errors.yourPhone && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.yourPhone.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white border-b border-gray-800 pb-2 pt-4">Friend's Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="friendName" className="block text-gray-300 mb-2">Friend's Name</label>
                          <input
                            type="text"
                            id="friendName"
                            {...form.register("friendName")}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          {form.formState.errors.friendName && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.friendName.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="friendEmail" className="block text-gray-300 mb-2">Friend's Email</label>
                          <input
                            type="email"
                            id="friendEmail"
                            {...form.register("friendEmail")}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          {form.formState.errors.friendEmail && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.friendEmail.message}</p>
                          )}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label htmlFor="friendPhone" className="block text-gray-300 mb-2">Friend's Phone Number</label>
                          <input
                            type="tel"
                            id="friendPhone"
                            {...form.register("friendPhone")}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          {form.formState.errors.friendPhone && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.friendPhone.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-gray-300 mb-2">Personal Message (Optional)</label>
                      <textarea
                        id="message"
                        {...form.register("message")}
                        rows={4}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Add a personal message to your friend..."
                      ></textarea>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Submitting...
                          </>
                        ) : (
                          'Submit Referral'
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  className="bg-gray-900 rounded-xl p-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-check-circle text-4xl text-primary"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Referral Submitted!</h3>
                  <p className="text-gray-400 mb-6">
                    Thank you for referring your friend to AfterHours HVAC! We'll contact them shortly.
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      form.reset();
                    }}
                    className="bg-primary hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-block"
                  >
                    Refer Another Friend
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-white">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
            </motion.div>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <motion.div 
                  className="bg-black rounded-xl p-6 border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 text-white">How long does it take to receive my referral reward?</h3>
                  <p className="text-gray-400">
                    Your $100 referral credit will be applied to your account within 48 hours after your friend completes their first paid service with us.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-black rounded-xl p-6 border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 text-white">Is there a limit to how many people I can refer?</h3>
                  <p className="text-gray-400">
                    No, there is no limit! Refer as many friends and family members as you like. Each successful referral earns you a $100 credit.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-black rounded-xl p-6 border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 text-white">What services qualify for the referral program?</h3>
                  <p className="text-gray-400">
                    Any paid service over $200 qualifies for our referral program, including repairs, maintenance visits, and new installations.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-black rounded-xl p-6 border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 text-white">How long are referral credits valid?</h3>
                  <p className="text-gray-400">
                    Your referral credits are valid for 12 months from the date they're issued. They can be combined with other offers unless otherwise specified.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary to-red-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Start Referring Today!
            </h2>
            <p className="text-white text-lg mb-8 max-w-3xl mx-auto">
              Help your friends and family enjoy the AfterHours HVAC experience while earning rewards for yourself.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#referral-form" 
                className="bg-white hover:bg-gray-100 text-primary font-bold px-8 py-3 rounded-full transition duration-300 transform hover:scale-105"
              >
                Refer a Friend
              </a>
              <a 
                href="/contact" 
                className="bg-black hover:bg-gray-900 text-white font-bold px-8 py-3 rounded-full transition duration-300 transform hover:scale-105"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Referral;
