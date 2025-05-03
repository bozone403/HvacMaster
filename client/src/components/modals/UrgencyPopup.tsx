import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UrgencyPopupProps {
  onClose: () => void;
  showDelay?: number; // Time in ms to wait before showing the popup
}

export default function UrgencyPopup({ onClose, showDelay = 30000 }: UrgencyPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Wait for the specified delay before showing the popup
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, showDelay);
    
    return () => clearTimeout(timer);
  }, [showDelay]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <Card className="max-w-lg w-full mx-4 overflow-hidden shadow-xl animate-in fade-in duration-300">
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">Limited Time Offer</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-white/80 transition-colors"
            aria-label="Close popup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            <h4 className="text-2xl font-bold text-center">Save Up To 30% On Your HVAC Installation</h4>
            
            <p className="text-center text-muted-foreground mb-2">
              Special pricing available for a limited time for Calgary homeowners looking to upgrade their home comfort systems.
            </p>
            
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg my-4">
              <p className="font-medium text-amber-800 text-center">
                This seasonal promotion ends soon! Get your quote locked in before prices increase.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Link href="/quote" onClick={onClose}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3">
                  Get My Free Quote
                </Button>
              </Link>
              
              <Link href="/purchase" onClick={onClose}>
                <Button variant="outline" className="w-full py-3">
                  View Current Pricing
                </Button>
              </Link>
            </div>
            
            <div className="text-center mt-4">
              <button 
                onClick={onClose}
                className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
              >
                No thanks, I'll continue browsing
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}