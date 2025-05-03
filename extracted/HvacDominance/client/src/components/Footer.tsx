import React from 'react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const serviceLinks: FooterLink[] = [
  { label: 'Furnace Installation & Repair', href: '#services' },
  { label: 'AC Installation & Service', href: '#services' },
  { label: 'Boiler & Hydronic Heating', href: '#services' },
  { label: 'Ductwork & Air Balancing', href: '#services' },
  { label: 'Indoor Air Quality', href: '#services' },
  { label: 'Emergency Repairs', href: '#services' }
];

const locationLinks: FooterLink[] = [
  { label: 'Calgary Metro', href: '#service-area' },
  { label: 'Lethbridge to Edmonton', href: '#service-area' },
  { label: 'Central Alberta', href: '#service-area' },
  { label: 'Southern Alberta', href: '#service-area' },
  { label: 'Vancouver Greater Area', href: '#service-area' },
  { label: 'All Service Areas', href: '#service-area' }
];

const contactItems = [
  {
    icon: 'fa-phone-alt',
    title: 'Phone',
    content: '(403) 613-6014',
    link: 'tel:+14036136014'
  },
  {
    icon: 'fa-envelope',
    title: 'Email',
    content: 'jordan@afterhourshvac.ca',
    link: 'mailto:jordan@afterhourshvac.ca'
  },
  {
    icon: 'fa-clock',
    title: 'Emergency Service',
    content: 'Available 24/7/365'
  }
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <i className="fas fa-fire-burner text-primary text-3xl"></i>
              <div>
                <h3 className="text-xl font-heading font-bold text-light">AfterHours<span className="text-primary">HVAC</span></h3>
                <p className="text-xs text-lightgray">When Everyone Else Closes, We Keep the Heat On</p>
              </div>
            </div>
            
            <p className="text-lightgray mb-6">
              Calgary's elite HVAC service provider, delivering expert-level heating, cooling, ventilation, and mechanical solutions with unmatched precision — even when the other guys call it a day.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-lightgray hover:text-primary transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-lightgray hover:text-primary transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-lightgray hover:text-primary transition">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-lightgray hover:text-primary transition">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-lightgray hover:text-primary transition">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold mb-6">Service Areas</h4>
            <ul className="space-y-3">
              {locationLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-lightgray hover:text-primary transition">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold mb-6">Contact Us</h4>
            <ul className="space-y-6">
              {contactItems.map((item, index) => (
                <li key={index} className="flex items-start">
                  <i className={`fas ${item.icon} text-primary mr-3 mt-1`}></i>
                  <div>
                    <p className="font-bold mb-1">{item.title}</p>
                    {item.link ? (
                      <a href={item.link} className="text-primary font-bold">{item.content}</a>
                    ) : (
                      <p className="text-lightgray">{item.content}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-lightgray border-opacity-20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-lightgray text-sm">
                &copy; {new Date().getFullYear()} AfterHours HVAC. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-lightgray hover:text-primary transition text-sm">Privacy Policy</a>
              <a href="#" className="text-lightgray hover:text-primary transition text-sm">Terms of Service</a>
              <a href="#" className="text-lightgray hover:text-primary transition text-sm">Sitemap</a>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-lightgray text-xs">
              Licensed. Code-compliant. Field-tested. Always ready.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
