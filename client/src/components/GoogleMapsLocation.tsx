import { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation, Clock, Phone, Star } from 'lucide-react';

const BUSINESS_INFO = {
  name: "AfterHours HVAC",
  address: "Calgary, AB T3J 5E3, Canada",
  phone: "(403) 613-6014",
  googleMapsUrl: "https://maps.google.com/maps?cid=7222293398155608799",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir//AfterHours+HVAC+Calgary,+AB+T3J+5E3+Canada/",
  businessHours: [
    { day: "Monday", hours: "9:00 AM - 9:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 9:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 9:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 9:00 PM" },
    { day: "Friday", hours: "9:00 AM - 9:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 9:00 PM" },
    { day: "Sunday", hours: "9:00 AM - 9:00 PM" }
  ],
  rating: 4.9,
  reviews: 52
};

export default function GoogleMapsLocation() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Maps embed when component mounts
    if (mapRef.current) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.7592901209992!2d-114.10234908422982!3d51.08975507956924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x643d29c8b4a6e65f!2sAfterHours%20HVAC!5e0!3m2!1sen!2sus!4v1652914521884!5m2!1sen!2sus`;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.border = '0';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.loading = 'lazy';
      iframe.title = 'AfterHours HVAC Location';
      mapRef.current.appendChild(iframe);
    }

    return () => {
      // Cleanup when component unmounts
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="w-full grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2 border border-gray-800 bg-gray-900">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-white">
            <MapPin className="mr-2 h-5 w-5 text-primary" />
            Our Location
          </CardTitle>
          <CardDescription>
            Serving all of Calgary and surrounding areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={mapRef} className="w-full h-[300px] rounded-md overflow-hidden" />
        </CardContent>
      </Card>
      
      <Card className="border border-gray-800 bg-gray-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Contact & Hours</CardTitle>
          <CardDescription>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="font-medium text-yellow-400">{BUSINESS_INFO.rating}</span>
              <span className="text-gray-400 text-sm ml-1">({BUSINESS_INFO.reviews} reviews)</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center text-white font-medium mb-1">
              <MapPin className="h-4 w-4 text-primary mr-2" />
              <span>Address</span>
            </div>
            <p className="text-gray-400 text-sm pl-6">{BUSINESS_INFO.address}</p>
            <a 
              href={BUSINESS_INFO.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-primary/80 text-sm mt-1 pl-6"
            >
              <Navigation className="h-3 w-3 mr-1" />
              Get Directions
            </a>
          </div>
          
          <div>
            <div className="flex items-center text-white font-medium mb-1">
              <Phone className="h-4 w-4 text-primary mr-2" />
              <span>Phone</span>
            </div>
            <a 
              href={`tel:+14036136014`} 
              className="text-gray-400 hover:text-primary text-sm pl-6 transition-colors"
            >
              {BUSINESS_INFO.phone}
            </a>
          </div>
          
          <div>
            <div className="flex items-center text-white font-medium mb-1">
              <Clock className="h-4 w-4 text-primary mr-2" />
              <span>Business Hours</span>
            </div>
            <div className="space-y-1 pl-6">
              {BUSINESS_INFO.businessHours.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-400 w-24">{item.day}</span>
                  <span className="text-gray-300">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}