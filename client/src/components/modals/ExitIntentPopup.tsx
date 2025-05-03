import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ExitIntentPopupProps {
  onClose: () => void;
}

export default function ExitIntentPopup({ onClose }: ExitIntentPopupProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email) {
      // In a real app, we would send this to the server
      // await fetch('/api/exit-intent-claims', {...})
      
      setSubmitted(true);
      toast({
        title: "Success!",
        description: "Your $250 discount has been claimed. Check your email for details.",
      });
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
      <Card className="max-w-lg w-full mx-4 overflow-hidden shadow-xl animate-in fade-in-80 zoom-in-90 duration-300">
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">Wait! Don't Leave Yet!</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-white/80 transition-colors"
            aria-label="Close popup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <CardContent className="p-6">
          {!submitted ? (
            <div className="space-y-4">
              <h4 className="text-2xl font-bold text-center">Claim Your $250 Discount</h4>
              
              <p className="text-center text-muted-foreground mb-4">
                Enter your email to receive your exclusive $250 discount voucher on any furnace or AC installation. Limited time offer!
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <p className="font-medium text-amber-800 text-center">
                  This special offer is available to first-time visitors only. Don't miss out!
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input 
                    type="email" 
                    placeholder="Your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="w-full py-6"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6 text-lg">
                  Claim My $250 Discount
                </Button>
              </form>
              
              <div className="text-center mt-4">
                <button 
                  onClick={onClose}
                  className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
                >
                  No thanks, I don't need to save money
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6 py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h4 className="text-2xl font-bold">Your Discount is on the Way!</h4>
              <p className="text-muted-foreground">
                We've sent your $250 discount voucher to <strong>{email}</strong>. Please check your inbox (and spam folder) for instructions on how to redeem it.
              </p>
              
              <div className="pt-4">
                <Button 
                  onClick={onClose}
                  className="bg-primary hover:bg-primary/90 px-6 py-2"
                >
                  Continue Browsing
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}