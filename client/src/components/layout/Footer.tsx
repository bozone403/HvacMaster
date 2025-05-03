import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-black mb-4 flex items-center">
              <span>AfterHours</span>
              <span className="text-[#DC2626]">HVAC</span>
            </div>
            <p className="text-gray-400 mb-4">Licensed. Code-compliant. Field-tested. Always ready.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-google"></i>
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <FooterLink href="#services" label="Furnace Installation & Repair" />
              <FooterLink href="#services" label="AC Installation & Service" />
              <FooterLink href="#services" label="Boiler & Hydronic Systems" />
              <FooterLink href="#services" label="Ductwork Design" />
              <FooterLink href="#services" label="Indoor Air Quality" />
            </ul>
          </div>
          
          {/* Service Areas */}
          <div>
            <h3 className="font-bold text-lg mb-4">Service Areas</h3>
            <ul className="space-y-2">
              <FooterLink href="#contact" label="Calgary, Alberta" />
              <FooterLink href="#contact" label="Lethbridge, Alberta" />
              <FooterLink href="#contact" label="Coaldale" />
              <FooterLink href="#contact" label="Taber" />
              <FooterLink href="#contact" label="Fort Macleod" />
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <i className="fas fa-phone-alt mr-2"></i>
                <a href="tel:+15875551234" className="hover:text-white transition">(587) 555-1234</a>
              </li>
              <li className="flex items-center text-gray-400">
                <i className="fas fa-envelope mr-2"></i>
                <a href="mailto:service@afterhourshvac.ca" className="hover:text-white transition">service@afterhourshvac.ca</a>
              </li>
              <li className="flex items-center text-gray-400">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span>Southern Alberta, Canada</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} AfterHours HVAC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  href: string;
  label: string;
}

function FooterLink({ href, label }: FooterLinkProps) {
  return (
    <li>
      <a 
        href={href} 
        className="text-gray-400 hover:text-white transition"
        onClick={(e) => {
          e.preventDefault();
          const section = document.getElementById(href.substring(1));
          section?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        {label}
      </a>
    </li>
  );
}
