import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UrgencyPopupProps {
  onClose: () => void;
  displayDelay?: number; // Delay in milliseconds
}

export default function UrgencyPopup({ onClose, displayDelay = 10000 }: UrgencyPopupProps) {
  const [countdown, setCountdown] = useState(59 * 60 + 59); // 59 minutes and 59 seconds
  const [visitorsCount] = useState(Math.floor(Math.random() * 4) + 8); // Random between 8-12
  const [peopleViewingNow] = useState(Math.floor(Math.random() * 3) + 3); // Random between 3-5
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    
    return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
        <motion.div 
          className="relative w-full max-w-lg mx-4 bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top Banner */}
          <div className="bg-primary px-4 py-2 text-center">
            <p className="text-white font-bold text-sm">
              ⚠️ SPECIAL PROMOTION: ALBERTA GOVERNMENT REBATE ENDS SOON
            </p>
          </div>
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-2 right-3 text-white/70 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          
          <div className="p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
              Limited-Time HVAC Offer
            </h2>
            
            {/* Urgency Timer */}
            <div className="mb-6 text-center">
              <p className="text-primary/90 font-medium mb-2">
                This offer expires in:
              </p>
              <div className="bg-black/40 inline-block px-6 py-2 rounded-lg">
                <span className="font-mono text-2xl font-bold text-white">
                  {formatTime(countdown)}
                </span>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="space-y-5">
              <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Save Up To $2,500</h3>
                    <p className="text-gray-300 text-sm">With Alberta energy rebates</p>
                  </div>
                </div>
                <div className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full">
                  TIME-SENSITIVE
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">0% Financing</h3>
                    <p className="text-gray-300 text-sm">For qualified customers</p>
                  </div>
                </div>
                <div className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full">
                  5 SPOTS LEFT
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Limited Availability</h3>
                    <p className="text-gray-300 text-sm">Installation slots filling quickly</p>
                  </div>
                </div>
                <div className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full">
                  HIGH DEMAND
                </div>
              </div>
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center mt-6 mb-4 bg-gray-900/60 p-2 rounded-lg">
              <div className="relative flex -space-x-2 mr-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gray-600 border border-gray-800"></div>
                ))}
              </div>
              <p className="text-sm text-gray-300">
                <span className="text-primary font-semibold">{visitorsCount} people</span> purchased this deal today
              </p>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-400 mb-6">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                <span>{peopleViewingNow} people viewing this offer</span>
              </div>
              <div>
                <span>Limited quantities available</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              <Button
                className="sm:col-span-3 bg-primary hover:bg-red-800 text-white font-bold py-3 text-base animate-pulse group"
                onClick={() => window.location.href = '/purchase'}
              >
                <span className="group-hover:scale-105 transition-transform duration-200 inline-block">
                  Claim Your Offer Now
                </span>
              </Button>
              
              <Button
                variant="outline"
                className="sm:col-span-2 border-gray-600 text-white hover:bg-gray-800 transition-all"
                onClick={() => window.location.href = '/quote'}
              >
                Get Free Quote
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
