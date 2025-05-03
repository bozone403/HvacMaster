import React from 'react';
import { Link } from 'wouter';
import ReferralProgram from '@/components/ReferralProgram';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Referral: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-darkgray py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Refer a Friend Program</h1>
          <p className="text-lightgray max-w-2xl mx-auto">
            Share the gift of premium HVAC service with your friends and family while earning rewards for yourself.
            For every successful referral, you'll receive a $100 voucher towards your next service with AfterHours HVAC.
          </p>
          <div className="mt-8">
            <Link href="/">
              <a className="inline-block bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition duration-300 mr-4">
                Back to Home
              </a>
            </Link>
            <Link href="/contact">
              <a className="inline-block bg-dark border-2 border-primary hover:bg-primary hover:text-dark text-primary font-bold py-3 px-8 rounded-md transition duration-300">
                Contact Us
              </a>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <ReferralProgram />
      
      {/* Benefits Section */}
      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Why Refer Your Friends to AfterHours HVAC?</h2>
            <p className="text-lightgray">Beyond the $100 voucher, there are many reasons to share our services with your network.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-darkgray p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
                <i className="fas fa-medal text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Elite Service Quality</h3>
              <p className="text-lightgray">Your friends deserve the premium service experience that you've already enjoyed. Alberta's highest-rated HVAC professionals.</p>
            </div>
            
            <div className="bg-darkgray p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
                <i className="fas fa-tools text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Emergency Support</h3>
              <p className="text-lightgray">When others close shop, we're just getting started. Share reliable support that's available whenever your friends need it most.</p>
            </div>
            
            <div className="bg-darkgray p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
                <i className="fas fa-cog text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Master Craftsmanship</h3>
              <p className="text-lightgray">Share the opportunity to experience our signature attention to detail and unmatched technical expertise on every job.</p>
            </div>
            
            <div className="bg-darkgray p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
                <i className="fas fa-check-circle text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Satisfaction Guaranteed</h3>
              <p className="text-lightgray">Our industry-leading satisfaction guarantee ensures your friends will thank you for the recommendation.</p>
            </div>
            
            <div className="bg-darkgray p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
                <i className="fas fa-dollar-sign text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Energy Bill Savings</h3>
              <p className="text-lightgray">Help your friends reduce their utility bills with our ultra-efficient systems and optimization services.</p>
            </div>
            
            <div className="bg-darkgray p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
                <i className="fas fa-gift text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Unlimited Referrals</h3>
              <p className="text-lightgray">There's no limit to how many friends you can refer or how many $100 vouchers you can earn. Keep sharing the HVAC excellence!</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-darkgray">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lightgray">Everything you need to know about our referral program</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-dark p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">How soon will I receive my $100 voucher?</h3>
              <p className="text-lightgray">Your voucher will be emailed to you within 48 hours after your referred friend completes their first service with us.</p>
            </div>
            
            <div className="bg-dark p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Is there a limit to how many friends I can refer?</h3>
              <p className="text-lightgray">No, there's absolutely no limit! Refer as many friends as you like and earn a $100 voucher for each successful referral.</p>
            </div>
            
            <div className="bg-dark p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">How long are the vouchers valid for?</h3>
              <p className="text-lightgray">Your $100 vouchers are valid for 12 months from the date of issue, giving you plenty of time to use them on your next service.</p>
            </div>
            
            <div className="bg-dark p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Can I combine multiple vouchers?</h3>
              <p className="text-lightgray">Yes! If you've earned multiple vouchers, you can combine up to 3 vouchers ($300 maximum) on a single service.</p>
            </div>
            
            <div className="bg-dark p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">What services qualify for the referral program?</h3>
              <p className="text-lightgray">Any service valued at $250 or more qualifies, including installations, repairs, maintenance, and consulting services.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4 text-white">Ready to Start Referring?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Start earning $100 vouchers today by referring your friends and family to AfterHours HVAC.
            It's our way of saying thank you for spreading the word about Calgary's premier HVAC service.
          </p>
          <a href="#referral-program" className="inline-block bg-dark hover:bg-black text-white font-bold py-3 px-8 rounded-md transition duration-300">
            Refer a Friend Now
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Referral;