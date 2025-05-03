import { Switch, Route } from "wouter";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import { useState, useEffect } from "react";
import ExitIntentPopup from "@/components/modals/ExitIntentPopup";
import BookingCalendar from "@/components/modals/BookingCalendar";

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
