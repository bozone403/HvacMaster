import { Link } from "wouter";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-white mr-1">AfterHours</span>
              <span className="text-primary">HVAC</span>
            </h3>
            <p className="text-gray-400 mb-4">
              When everyone else closes, we keep the heat on.
            </p>
            <div className="flex items-center gap-2">
              <a 
                href="tel:+14036136014" 
                className="text-primary font-bold hover:text-red-500 transition duration-300"
              >
                (403) 613-6014
              </a>
              <span className="text-xs text-primary bg-gray-800 px-2 py-1 rounded">24/7 EMERGENCY</span>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-primary transition duration-300 cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-gray-400 hover:text-primary transition duration-300 cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <span className="text-gray-400 hover:text-primary transition duration-300 cursor-pointer">Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <span className="text-gray-400 hover:text-primary transition duration-300 cursor-pointer">Pricing</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-400 hover:text-primary transition duration-300 cursor-pointer">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/booking">
                  <span className="text-gray-400 hover:text-primary transition duration-300 cursor-pointer">Furnace Services</span>
                </Link>
              </li>
              <li>
                <Link href="/booking">
                  <span className="text-gray-400 hover:text-primary transition duration-300 cursor-pointer">Air Conditioning</span>
                </Link>
              </li>
              <li>
                <Link href="/booking">
                  <span className="text-gray-400 hover:text-primary transition duration-300 cursor-pointer">Boiler Systems</span>
                </Link>
              </li>
              <li>
                <Link href="/booking">
                  <span className="text-gray-400 hover:text-primary transition duration-300 cursor-pointer">Ductwork Design</span>
                </Link>
              </li>
              <li>
                <Link href="/booking">
                  <span className="text-gray-400 hover:text-primary transition duration-300 cursor-pointer">Emergency Service</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Service Areas */}
          <div>
            <h4 className="text-lg font-bold mb-4">Service Areas</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Lethbridge, Alberta</li>
              <li className="text-gray-400">Calgary, Alberta</li>
              <li className="text-gray-400">Coaldale</li>
              <li className="text-gray-400">Taber</li>
              <li className="text-gray-400">Fort Macleod</li>
              <li className="text-gray-400">Surrounding rural zones</li>
            </ul>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center my-8">
          <Link href="/booking">
            <button className="bg-primary hover:bg-red-600 text-white font-bold px-6 py-3 rounded-full transition duration-300 transform hover:scale-105">
              Book a Service
            </button>
          </Link>
          <Link href="/quote">
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-full transition duration-300 transform hover:scale-105">
              Request a Quote
            </button>
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} AfterHours HVAC. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary transition duration-300"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary transition duration-300"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="https://google.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary transition duration-300"
              >
                <i className="fab fa-google"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
