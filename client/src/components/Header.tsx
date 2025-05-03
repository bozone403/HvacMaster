import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navClasses = isScrolled
    ? "fixed w-full bg-black shadow-lg transition-all duration-300 z-50"
    : "absolute w-full bg-black bg-opacity-75 transition-all duration-300 z-50";

  return (
    <header className={navClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <span className="text-2xl font-bold text-white mr-1">AfterHours</span>
              <span className="text-2xl font-bold text-primary">HVAC</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <NavLink href="/" label="Home" active={location === "/"} />
            <NavLink href="/about" label="About" active={location === "/about"} />
            <NavLink href="/gallery" label="Gallery" active={location === "/gallery"} />
            <NavLink href="/pricing" label="Pricing" active={location === "/pricing"} />
            <NavLink href="/contact" label="Contact" active={location === "/contact"} />
          </nav>

          {/* Emergency Phone */}
          <div className="hidden md:flex items-center">
            <a 
              href="tel:+14036136014" 
              className="flex items-center gap-2 bg-primary hover:bg-red-600 text-white font-bold px-4 py-2 rounded-full transition duration-300 transform hover:scale-105"
            >
              <i className="fas fa-phone-alt"></i>
              <span>(403) 613-6014</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? (
              <i className="fas fa-times text-2xl"></i>
            ) : (
              <i className="fas fa-bars text-2xl"></i>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col gap-4">
              <MobileNavLink href="/" label="Home" active={location === "/"} />
              <MobileNavLink href="/about" label="About" active={location === "/about"} />
              <MobileNavLink href="/gallery" label="Gallery" active={location === "/gallery"} />
              <MobileNavLink href="/pricing" label="Pricing" active={location === "/pricing"} />
              <MobileNavLink href="/contact" label="Contact" active={location === "/contact"} />
              <a 
                href="tel:+14036136014" 
                className="flex items-center gap-2 text-primary font-semibold py-2"
              >
                <i className="fas fa-phone-alt"></i>
                <span>(403) 613-6014</span>
              </a>
              <div className="flex gap-3 mt-4">
                <Link href="/booking">
                  <button className="bg-primary hover:bg-red-600 text-white font-bold px-4 py-2 rounded-full transition duration-300 w-full">
                    Book Now
                  </button>
                </Link>
                <Link href="/quote">
                  <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded-full transition duration-300 w-full">
                    Get Quote
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

type NavLinkProps = {
  href: string;
  label: string;
  active: boolean;
};

const NavLink = ({ href, label, active }: NavLinkProps) => {
  return (
    <Link href={href}>
      <span className={`font-medium text-lg transition-colors duration-300 cursor-pointer ${active ? 'text-primary' : 'text-white hover:text-primary'}`}>
        {label}
      </span>
    </Link>
  );
};

const MobileNavLink = ({ href, label, active }: NavLinkProps) => {
  return (
    <Link href={href}>
      <span className={`font-medium text-lg transition-colors duration-300 cursor-pointer ${active ? 'text-primary' : 'text-white hover:text-primary'}`}>
        {label}
      </span>
    </Link>
  );
};

export default Header;
