import { useState } from 'react';
import { Clock, X, Award, AlertTriangle, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface UrgencyPopupProps {
  onClose: () => void;
}

export default function UrgencyPopup({ onClose }: UrgencyPopupProps) {
  const [countdown, setCountdown] = useState<number>(15 * 60);
  const [tab, setTab] = useState<string>('limited');
  
  // Format countdown as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // List of limited-time offers
  const limitedTimeOffers = [
    {
      id: 1,
      title: 'Complimentary Smart Thermostat',
      original: '$350',
      current: '$0',
      description: 'With any high-efficiency furnace installation',
      badge: 'Most Popular',
    },
    {
      id: 2,
      title: '15% Off Winter Maintenance Package',
      original: '$399',
      current: '$339',
      description: 'Complete tune-up and safety inspection for your heating system',
    },
    {
      id: 3,
      title: 'Free 5-Year Extended Warranty',
      original: '$599',
      current: '$0',
      description: 'With any premium HVAC system purchase',
      badge: 'Best Value',
    },
  ];
  
  // List of current surge in demand
  const demandSurgeInfo = [
    { area: 'Calgary NW', demand: 'Very High', waitTime: '3-5 days' },
    { area: 'Calgary NE', demand: 'High', waitTime: '2-4 days' },
    { area: 'Calgary SW', demand: 'Critical', waitTime: '5-7 days' },
    { area: 'Calgary SE', demand: 'Moderate', waitTime: '1-3 days' },
    { area: 'Airdrie', demand: 'High', waitTime: '3-5 days' },
  ];
  
  const getDemandColor = (demand: string): string => {
    switch (demand) {
      case 'Critical':
        return 'text-red-500';
      case 'Very High':
        return 'text-orange-500';
      case 'High':
        return 'text-amber-500';
      case 'Moderate':
        return 'text-yellow-500';
      default:
        return 'text-green-500';
    }
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="relative w-full max-w-3xl bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Header with countdown */}
        <div className="bg-primary px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Time-Sensitive HVAC Alert
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="bg-black/30 px-3 py-1 rounded-full flex items-center">
              <Clock className="h-4 w-4 text-white mr-2" />
              <span className="text-white font-mono font-bold">{formatTime(countdown)}</span>
            </div>
            
            <button
              onClick={onClose}
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Close popup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Tab navigation */}
        <Tabs defaultValue="limited" className="w-full" onValueChange={setTab}>
          <div className="px-6 pt-6">
            <TabsList className="w-full">
              <TabsTrigger value="limited" className="flex-1">
                <Award className="mr-2 h-4 w-4" />
                Limited-Time Offers
              </TabsTrigger>
              <TabsTrigger value="demand" className="flex-1">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Current Demand
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-6">
            {/* Limited-time offers tab */}
            <TabsContent value="limited" className="mt-0">
              <div className="space-y-4">
                <p className="text-amber-400 font-semibold flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  These special offers expire when the timer reaches zero
                </p>
                
                <div className="grid gap-4 md:grid-cols-3">
                  {limitedTimeOffers.map((offer) => (
                    <div 
                      key={offer.id}
                      className="relative bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-primary/50 transition-colors"
                    >
                      {offer.badge && (
                        <div className="absolute -top-3 -right-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          {offer.badge}
                        </div>
                      )}
                      
                      <h3 className="text-lg font-bold text-white mb-2">{offer.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-gray-500 line-through text-sm">{offer.original}</span>
                        <span className="text-primary font-bold text-xl">{offer.current}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{offer.description}</p>
                      <Button className="w-full" variant="default">
                        Claim Offer
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
                  <div className="flex items-center">
                    <div className="bg-green-500/20 p-2 rounded-full mr-3">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Guaranteed Fast Service</h4>
                      <p className="text-gray-400 text-sm">Book now to secure your spot before our schedule fills up</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Current demand tab */}
            <TabsContent value="demand" className="mt-0">
              <div className="space-y-4">
                <div className="bg-red-900/20 border border-red-900/30 rounded-lg p-4">
                  <h3 className="text-white font-bold flex items-center">
                    <AlertTriangle className="text-red-500 mr-2 h-5 w-5" />
                    Urgent Notice: High Seasonal Demand
                  </h3>
                  <p className="text-gray-300 mt-2">
                    Due to the current weather conditions, we're experiencing extremely high call volume. 
                    Booking now ensures you'll receive service as soon as possible.
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="p-3 text-left text-gray-300 font-semibold">Service Area</th>
                        <th className="p-3 text-left text-gray-300 font-semibold">Current Demand</th>
                        <th className="p-3 text-left text-gray-300 font-semibold">Est. Wait Time</th>
                        <th className="p-3 text-left text-gray-300 font-semibold">Priority Booking</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {demandSurgeInfo.map((area, index) => (
                        <tr key={index} className="hover:bg-gray-800/50">
                          <td className="p-3 text-gray-300">{area.area}</td>
                          <td className="p-3">
                            <span className={`font-medium ${getDemandColor(area.demand)}`}>
                              {area.demand}
                            </span>
                          </td>
                          <td className="p-3 text-gray-300">{area.waitTime}</td>
                          <td className="p-3">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="sm" variant="outline" className="text-xs">
                                    Book Priority Service
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Guarantees service within 24 hours</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="bg-primary/20 p-2 rounded-full mr-3">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Don't Wait Until It's Too Late</h4>
                      <p className="text-gray-400 text-sm">Our emergency service rates are higher than standard appointments</p>
                    </div>
                  </div>
                  <Button>
                    Book Now
                  </Button>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
        
        <div className="border-t border-gray-800 bg-gray-900 px-6 py-4 flex justify-between items-center">
          <div className="text-white">
            <span className="text-sm">Questions? Call us: </span>
            <a href="tel:+14036136014" className="font-bold hover:text-primary transition-colors">
              (403) 613-6014
            </a>
          </div>
          
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>
              Remind Me Later
            </Button>
            <Button onClick={onClose}>
              {tab === 'limited' ? 'View Offers' : 'Book Priority Service'}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}