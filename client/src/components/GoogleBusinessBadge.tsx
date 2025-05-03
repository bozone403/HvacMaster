import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink } from 'lucide-react';

export default function GoogleBusinessBadge() {
  return (
    <Card className="border border-gray-800 bg-gray-900 overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" 
                alt="Google" 
                className="h-5 mr-1" 
              />
              <span className="text-white font-medium">Business</span>
            </div>
            <div className="flex items-center bg-white/20 px-2 py-1 rounded">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-white text-xs font-bold">4.9</span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-1">AfterHours HVAC</h3>
          <p className="text-gray-400 text-sm mb-3">HVAC Contractor in Calgary, Alberta</p>
          
          <div className="flex items-center mb-3">
            <div className="flex mr-2">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 text-yellow-400 fill-yellow-400`} 
                />
              ))}
            </div>
            <span className="text-gray-300 text-sm">52 reviews</span>
          </div>
          
          <div className="space-y-1 text-sm text-gray-300 mb-4">
            <p>⚡ Emergency HVAC Service 24/7</p>
            <p>🔧 Professional Installation & Repair</p>
            <p>❄️ Heating & Cooling Specialists</p>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="default" 
              className="w-full"
              onClick={() => window.open('tel:+14036136014', '_blank')}
            >
              Call Now
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.open('https://g.co/kgs/2YoRKzS', '_blank')}
            >
              View Profile
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}