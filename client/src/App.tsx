import { Switch, Route } from "wouter";
import { useState, useEffect } from "react";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Purchase from "@/pages/Purchase";
import Referral from "@/pages/Referral";
import Quote from "@/pages/Quote";
import Gallery from "@/pages/Gallery";
import Booking from "@/pages/Booking";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import ExitIntentPopup from "@/components/modals/ExitIntentPopup";
import BookingCalendar from "@/components/modals/BookingCalendar";
import UrgencyPopup from "@/components/modals/UrgencyPopup";
import PricingSection from "@/components/PricingSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";


// Import all page components
function App() {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showUrgencyPopup, setShowUrgencyPopup] = useState(false);
  const [showBookingCalendar, setShowBookingCalendar] = useState(false);
  const [bookingService, setBookingService] = useState<string>("");

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY < 0 &&
        !localStorage.getItem("popupShown") &&
        !showExitPopup
      ) {
        setShowExitPopup(true);
        localStorage.setItem("popupShown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [showExitPopup]);

  const openBookingCalendar = (service?: string) => {
    setBookingService(service || "Consultation");
    setShowBookingCalendar(true);
  };

  const closeBookingCalendar = () => {
    setShowBookingCalendar(false);
  };

  const closeExitPopup = () => {
    setShowExitPopup(false);
  };

  const closeUrgencyPopup = () => {
    setShowUrgencyPopup(false);
    // Set cookie to prevent showing again for 24 hours
    localStorage.setItem("urgencyPopupShown", "true");
  };
  
  // Show urgency popup after 30 seconds on pages related to purchasing
  useEffect(() => {
    const path = window.location.pathname;
    const purchaseRelatedPages = ["/purchase", "/quote", "/pricing", "/booking"];
    
    if (purchaseRelatedPages.some(page => path.includes(page)) && !localStorage.getItem("urgencyPopupShown")) {
      const timer = setTimeout(() => {
        setShowUrgencyPopup(true);
      }, 30000); // 30 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <Switch>
        <Route 
          path="/" 
          component={() => (
            <Home 
              openBookingCalendar={openBookingCalendar} 
            />
          )} 
        />
        {/* Main pages */}
        <Route path="/about" component={About} />
        <Route path="/referral" component={Referral} />
        <Route path="/purchase" component={Purchase} />
        
        {/* Completed Pages */}
        <Route path="/gallery" component={Gallery} />
        <Route path="/pricing">
          {() => <div className="flex flex-col min-h-screen"><Header /><div className="flex-grow flex items-center justify-center"><PricingSection /></div><Footer /><BackToTop /></div>}
        </Route>
        <Route path="/booking" component={Booking} />
        <Route path="/quote" component={Quote} />
        <Route path="/contact" component={Contact} />
        <Route path="/purchase-confirmation">
          {() => <div className="min-h-screen flex items-center justify-center">Thank you for your purchase! We'll contact you shortly to confirm your installation details.</div>}
        </Route>
        
        <Route component={NotFound} />
      </Switch>

      {showExitPopup && (
        <ExitIntentPopup onClose={closeExitPopup} />
      )}

      {showBookingCalendar && (
        <BookingCalendar 
          onClose={closeBookingCalendar} 
          service={bookingService}
        />
      )}

      {showUrgencyPopup && (
        <UrgencyPopup onClose={closeUrgencyPopup} />
      )}
    </>
  );
}

export default App;
