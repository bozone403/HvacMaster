import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const referralSchema = z.object({
  yourName: z.string().min(2, 'Your name is required'),
  yourEmail: z.string().email('Please enter a valid email address'),
  yourPhone: z.string().optional(),
  friendName: z.string().min(2, "Friend's name is required"),
  friendEmail: z.string().email('Please enter a valid email address'),
  friendPhone: z.string().min(10, 'Please enter a valid phone number'),
});

type ReferralFormData = z.infer<typeof referralSchema>;

const ReferralProgram = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReferralFormData>({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      yourName: '',
      yourEmail: '',
      yourPhone: '',
      friendName: '',
      friendEmail: '',
      friendPhone: '',
    },
  });

  const onSubmit = async (data: ReferralFormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest('/api/referrals', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      toast({
        title: 'Referral Successful!',
        description: 'Thanks for referring your friend. You\'ll receive your reward once they become a customer.',
        variant: 'success',
      });
      
      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Unable to submit your referral. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - Program Info */}
            <div className="flex flex-col justify-center">
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  <span className="text-primary">Refer</span> Your Friends, <br />
                  <span className="text-primary">Earn</span> Rewards
                </h2>
              </motion.div>

              <motion.p 
                variants={itemVariants} 
                className="text-gray-300 mb-8"
              >
                Our way of saying thanks for your trust. Refer a friend to AfterHours HVAC and you'll both receive a special gift.
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700"
              >
                <h3 className="text-xl font-bold mb-4 text-white">How It Works:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 text-white font-bold">
                      1
                    </div>
                    <p className="text-gray-300">Fill out the referral form with your information and your friend's details.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 text-white font-bold">
                      2
                    </div>
                    <p className="text-gray-300">We'll reach out to your friend and provide our expert HVAC services.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 text-white font-bold">
                      3
                    </div>
                    <p className="text-gray-300">Once they become a customer, you'll receive a $100 VISA gift card as our thanks!</p>
                  </li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className="text-primary font-bold mb-2">Special Bonus:</p>
                <p className="text-gray-300">Your friend also gets 10% off their first service with us!</p>
              </motion.div>
            </div>

            {/* Right Column - Form */}
            <motion.div 
              variants={itemVariants}
              className="bg-black/50 border border-gray-800 rounded-xl p-6 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-6 text-white text-center">Refer A Friend</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Your Information Section */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-4 text-primary">Your Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="yourName" className="block text-white text-sm font-medium mb-1">
                        Your Name *
                      </label>
                      <input
                        id="yourName"
                        type="text"
                        className={`w-full px-4 py-2 bg-gray-800 border ${errors.yourName ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white`}
                        placeholder="John Smith"
                        {...register('yourName')}
                      />
                      {errors.yourName && (
                        <p className="text-red-500 text-xs mt-1">{errors.yourName.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="yourEmail" className="block text-white text-sm font-medium mb-1">
                        Your Email *
                      </label>
                      <input
                        id="yourEmail"
                        type="email"
                        className={`w-full px-4 py-2 bg-gray-800 border ${errors.yourEmail ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white`}
                        placeholder="john@example.com"
                        {...register('yourEmail')}
                      />
                      {errors.yourEmail && (
                        <p className="text-red-500 text-xs mt-1">{errors.yourEmail.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="yourPhone" className="block text-white text-sm font-medium mb-1">
                        Your Phone (Optional)
                      </label>
                      <input
                        id="yourPhone"
                        type="tel"
                        className={`w-full px-4 py-2 bg-gray-800 border ${errors.yourPhone ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white`}
                        placeholder="(403) 123-4567"
                        {...register('yourPhone')}
                      />
                      {errors.yourPhone && (
                        <p className="text-red-500 text-xs mt-1">{errors.yourPhone.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Friend's Information Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-primary">Friend's Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="friendName" className="block text-white text-sm font-medium mb-1">
                        Friend's Name *
                      </label>
                      <input
                        id="friendName"
                        type="text"
                        className={`w-full px-4 py-2 bg-gray-800 border ${errors.friendName ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white`}
                        placeholder="Jane Doe"
                        {...register('friendName')}
                      />
                      {errors.friendName && (
                        <p className="text-red-500 text-xs mt-1">{errors.friendName.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="friendEmail" className="block text-white text-sm font-medium mb-1">
                        Friend's Email *
                      </label>
                      <input
                        id="friendEmail"
                        type="email"
                        className={`w-full px-4 py-2 bg-gray-800 border ${errors.friendEmail ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white`}
                        placeholder="jane@example.com"
                        {...register('friendEmail')}
                      />
                      {errors.friendEmail && (
                        <p className="text-red-500 text-xs mt-1">{errors.friendEmail.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="friendPhone" className="block text-white text-sm font-medium mb-1">
                        Friend's Phone *
                      </label>
                      <input
                        id="friendPhone"
                        type="tel"
                        className={`w-full px-4 py-2 bg-gray-800 border ${errors.friendPhone ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white`}
                        placeholder="(403) 123-4567"
                        {...register('friendPhone')}
                      />
                      {errors.friendPhone && (
                        <p className="text-red-500 text-xs mt-1">{errors.friendPhone.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-70 mt-6"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Submit Referral"
                  )}
                </motion.button>

                <p className="text-gray-500 text-xs text-center mt-4">
                  By submitting this form, you agree that we may contact your friend regarding our services.
                </p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReferralProgram;
