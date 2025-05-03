interface CTASectionProps {
  openBookingCalendar: () => void;
}

export default function CTASection({ openBookingCalendar }: CTASectionProps) {
  return (
    <section className="py-12 bg-[#DC2626] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-6">Ready for Elite HVAC Service?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">All systems we install are Alberta-compliant, high-efficiency, and rebate-eligible. We don't touch outdated units — we build systems the right way, the legal way, the AfterHours way.</p>
        
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <a 
            href="#emergency"
            className="bg-white text-[#DC2626] font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById('emergency');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Emergency Service
          </a>
          <a 
            href="#contact"
            className="bg-[#121212] text-white font-bold py-3 px-8 rounded-md hover:bg-gray-800 transition"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById('contact');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Request a Quote
          </a>
          <button 
            onClick={openBookingCalendar}
            className="border-2 border-white text-white font-bold py-3 px-8 rounded-md hover:bg-white hover:text-[#DC2626] transition"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
