import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import useScrollPosition from '@/hooks/useScrollPosition';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  
  // Close mobile menu when scrolling
  useEffect(() => {
    if (mobileMenuOpen && scrollPosition > 100) {
      setMobileMenuOpen(false);
    }
  }, [scrollPosition, mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const headerClasses = `sticky top-0 z-50 bg-darkgray shadow-md`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fas fa-fire-burner text-primary text-3xl"></i>
          <div>
            <h1 className="text-xl font-heading font-bold text-light">AfterHours<span className="text-primary">HVAC</span></h1>
            <p className="text-xs text-lightgray">When Everyone Else Closes, We Keep the Heat On</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-light hover:text-primary transition">Home</Link>
          <Link href="/about" className="text-light hover:text-primary transition">About Us</Link>
          <Link href="/gallery" className="text-light hover:text-primary transition">Gallery</Link>
          <Link href="/pricing" className="text-light hover:text-primary transition">Pricing</Link>
          <Link href="/quote" className="text-light hover:text-primary transition">Quote</Link>
          <Link href="/booking" className="text-light hover:text-primary transition">Book Service</Link>
          <Link href="/purchase" className="text-light hover:text-primary transition font-medium">Buy Online</Link>
          <Link href="/contact" className="text-light hover:text-primary transition">Contact</Link>
        </div>
        
        <div className="flex items-center">
          <a href="tel:+14036136014" className="hidden md:flex items-center text-primary font-bold">
            <i className="fas fa-phone-alt mr-2 animate-pulse"></i>
            (403) 613-6014
          </a>
          <button 
            className="md:hidden text-light" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`bg-darkgray md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
          <Link href="/" className="text-light hover:text-primary transition py-2">Home</Link>
          <Link href="/about" className="text-light hover:text-primary transition py-2">About Us</Link>
          <Link href="/gallery" className="text-light hover:text-primary transition py-2">Gallery</Link>
          <Link href="/pricing" className="text-light hover:text-primary transition py-2">Pricing</Link>
          <Link href="/quote" className="text-light hover:text-primary transition py-2">Quote</Link>
          <Link href="/booking" className="text-light hover:text-primary transition py-2">Book Service</Link>
          <Link href="/purchase" className="text-light hover:text-primary transition py-2 font-medium">Buy Online</Link>
          <Link href="/contact" className="text-light hover:text-primary transition py-2">Contact</Link>
          <a href="tel:+14036136014" className="flex items-center text-primary font-bold py-2">
            <i className="fas fa-phone-alt mr-2 animate-pulse"></i>
            (403) 613-6014
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
