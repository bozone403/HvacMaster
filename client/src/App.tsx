import { Switch, Route } from "wouter";
import { useState, useEffect } from "react";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Purchase from "@/pages/Purchase";
import Referral from "@/pages/Referral";
import Quote from "@/pages/Quote";
import NotFound from "@/pages/NotFound";
import ExitIntentPopup from "@/components/modals/ExitIntentPopup";
import BookingCalendar from "@/components/modals/BookingCalendar";
import PricingSection from "@/components/PricingSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

// Import all page components
function App() {
  const [showExitPopup, setShowExitPopup] = useState(false);
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
        
        {/* Pages still in development */}
        <Route path="/gallery">
          {() => <div className="min-h-screen flex items-center justify-center">Gallery page coming soon</div>}
        </Route>
        <Route path="/pricing">
          {() => <div className="flex flex-col min-h-screen"><Header /><div className="flex-grow flex items-center justify-center"><PricingSection /></div><Footer /><BackToTop /></div>}
        </Route>
        <Route path="/booking">
          {() => <div className="min-h-screen flex items-center justify-center">Booking page coming soon</div>}
        </Route>
        <Route path="/quote" component={Quote} />
        <Route path="/contact">
          {() => <div className="min-h-screen flex items-center justify-center">Contact page coming soon</div>}
        </Route>
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
    </>
  );
}

export default App;
