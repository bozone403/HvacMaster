import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Static Google Business review data
// In a real application, this would come from a Google API
const googleReviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    date: "2 months ago",
    text: "After Hours HVAC saved us during a terrible cold snap when our furnace quit working. They came out at 11pm and had our heat back on within an hour. Reasonable emergency rates too. Highly recommend!"
  },
  {
    id: 2,
    author: "Michael Thompson",
    rating: 5,
    date: "1 month ago",
    text: "Excellent service from start to finish. They installed a new AC system for us and were professional, clean, and thorough. The technician took time to explain everything about the new system. Very happy with the results."
  },
  {
    id: 3,
    author: "Amanda Wilson",
    rating: 4,
    date: "3 months ago",
    text: "Good service overall. They were a bit late for the appointment but called ahead to let us know. The work was done efficiently and our heating system is working much better now."
  },
  {
    id: 4,
    author: "David Chen",
    rating: 5,
    date: "2 weeks ago",
    text: "I've used AfterHours HVAC twice now and both experiences have been excellent. Fair pricing, knowledgeable technicians, and they don't try to upsell you on things you don't need. My go-to for all HVAC needs."
  },
  {
    id: 5,
    author: "Jennifer Lopez",
    rating: 5,
    date: "1 month ago",
    text: "I'm so impressed with their attention to detail. The technician spent extra time making sure everything was perfect with our new furnace installation. They even followed up a week later to make sure everything was working well."
  }
];

export default function GoogleReviews() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  
  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % googleReviews.length);
  };
  
  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + googleReviews.length) % googleReviews.length);
  };
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
      />
    ));
  };

  return (
    <Card className="border border-gray-800 bg-gray-900">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white flex items-center">
            <img 
              src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" 
              alt="Google" 
              className="h-5 mr-2" 
            />
            Reviews
          </CardTitle>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="font-medium text-white">4.9</span>
            <span className="text-gray-400 text-sm ml-1">(52 reviews)</span>
          </div>
        </div>
        <CardDescription>
          See what our customers are saying about us
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="h-[220px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReviewIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center mb-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg mr-3">
                    {googleReviews[currentReviewIndex].author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{googleReviews[currentReviewIndex].author}</h4>
                    <div className="flex items-center">
                      <div className="flex">
                        {renderStars(googleReviews[currentReviewIndex].rating)}
                      </div>
                      <span className="text-gray-400 text-xs ml-2">{googleReviews[currentReviewIndex].date}</span>
                    </div>
                  </div>
                </div>
                
                <blockquote className="text-gray-300 italic text-sm mt-3">
                  "{googleReviews[currentReviewIndex].text}"
                </blockquote>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={prevReview}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={nextReview}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-xs text-gray-400">
                  {currentReviewIndex + 1} of {googleReviews.length}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-800">
          <a 
            href="https://g.co/kgs/2YoRKzS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:text-primary/80"
          >
            View all reviews on Google
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}