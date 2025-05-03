import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import Gallery from "@/pages/Gallery";
import Purchase from "@/pages/Purchase";
import PaymentConfirmation from "@/pages/PaymentConfirmation";
import Pricing from "@/pages/Pricing";
import Booking from "@/pages/Booking";
import Quote from "@/pages/Quote";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Referral from "@/pages/Referral";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/purchase" component={Purchase} />
        <Route path="/payment-confirmation" component={PaymentConfirmation} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/booking" component={Booking} />
        <Route path="/quote" component={Quote} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/referral" component={Referral} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
