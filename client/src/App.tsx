import { Switch, Route } from "wouter";
import { useState, useEffect } from "react";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import ExitIntentPopup from "@/components/modals/ExitIntentPopup";
import BookingCalendar from "@/components/modals/BookingCalendar";

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
        {/* Add additional routes - these pages will be created */}
        <Route path="/about">
          {() => <div className="min-h-screen flex items-center justify-center">About page coming soon</div>}
        </Route>
        <Route path="/gallery">
          {() => <div className="min-h-screen flex items-center justify-center">Gallery page coming soon</div>}
        </Route>
        <Route path="/pricing">
          {() => <div className="min-h-screen flex items-center justify-center">Pricing page coming soon</div>}
        </Route>
        <Route path="/booking">
          {() => <div className="min-h-screen flex items-center justify-center">Booking page coming soon</div>}
        </Route>
        <Route path="/quote">
          {() => <div className="min-h-screen flex items-center justify-center">Quote page coming soon</div>}
        </Route>
        <Route path="/purchase">
          {() => <div className="min-h-screen flex items-center justify-center">Purchase page coming soon</div>}
        </Route>
        <Route path="/contact">
          {() => <div className="min-h-screen flex items-center justify-center">Contact page coming soon</div>}
        </Route>
        <Route path="/referral">
          {() => <div className="min-h-screen flex items-center justify-center">Referral page coming soon</div>}
        </Route>
        <Route path="/payment-confirmation">
          {() => <div className="min-h-screen flex items-center justify-center">Payment confirmation page coming soon</div>}
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
