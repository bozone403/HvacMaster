import { useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface NavbarProps {
  openEmergencyService: () => void;
}

export default function Navbar({ openEmergencyService }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      {/* Emergency Alert Bar */}
      <div className="bg-[#DC2626] text-white py-1 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm font-semibold md:text-base">
            ❄️ <span className="hidden md:inline">Winter HVAC Emergencies?</span> We're available 24/7!
          </p>
          <a 
            href="#emergency" 
            className="text-sm md:text-base font-bold underline"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById('emergency');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get Emergency Service Now
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <a className="text-2xl font-black text-[#121212] flex items-center space-x-1">
              <span>AfterHours</span>
              <span className="text-[#DC2626]">HVAC</span>
            </a>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <ScrollLink href="#services" label="Services" />
          <ScrollLink href="#pricing" label="Pricing" />
          <ScrollLink href="#about" label="About Us" />
          <ScrollLink href="#testimonials" label="Testimonials" />
          <ScrollLink 
            href="#contact" 
            label="Get Quote" 
            className="bg-[#121212] text-white px-4 py-2 rounded-md font-bold hover:bg-gray-800 transition"
          />
          <button
            onClick={openEmergencyService}
            className="emergency-pulse bg-[#DC2626] text-white px-4 py-2 rounded-md font-bold hover:bg-red-700 transition flex items-center space-x-1"
          >
            <i className="fas fa-exclamation-circle"></i>
            <span>Emergency Service</span>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-3">
          <a href="tel:+15875551234" className="text-[#DC2626] font-bold hover:text-red-700">
            <i className="fas fa-phone-alt text-lg"></i>
          </a>
          <button 
            onClick={toggleMobileMenu}
            className="text-[#121212]"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu (hidden by default) */}
      <div className={cn("md:hidden bg-white border-t border-gray-200", !mobileMenuOpen && "hidden")}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
          <MobileScrollLink href="#services" label="Services" onClick={() => setMobileMenuOpen(false)} />
          <MobileScrollLink href="#pricing" label="Pricing" onClick={() => setMobileMenuOpen(false)} />
          <MobileScrollLink href="#about" label="About Us" onClick={() => setMobileMenuOpen(false)} />
          <MobileScrollLink href="#testimonials" label="Testimonials" onClick={() => setMobileMenuOpen(false)} />
          <MobileScrollLink 
            href="#contact" 
            label="Get Quote" 
            className="bg-[#121212] text-white px-4 py-2 rounded-md font-bold text-center"
            onClick={() => setMobileMenuOpen(false)}
          />
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openEmergencyService();
            }}
            className="bg-[#DC2626] text-white px-4 py-2 rounded-md font-bold text-center"
          >
            Emergency Service
          </button>
        </div>
      </div>
    </header>
  );
}

interface ScrollLinkProps {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

function ScrollLink({ href, label, className }: ScrollLinkProps) {
  return (
    <a 
      href={href}
      className={cn("text-[#121212] font-semibold hover:text-[#DC2626] transition", className)}
      onClick={(e) => {
        e.preventDefault();
        const section = document.getElementById(href.substring(1));
        section?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      {label}
    </a>
  );
}

function MobileScrollLink({ href, label, className, onClick }: ScrollLinkProps) {
  return (
    <a 
      href={href}
      className={cn("text-[#121212] font-semibold py-2", className)}
      onClick={(e) => {
        e.preventDefault();
        const section = document.getElementById(href.substring(1));
        section?.scrollIntoView({ behavior: 'smooth' });
        onClick?.();
      }}
    >
      {label}
    </a>
  );
}
