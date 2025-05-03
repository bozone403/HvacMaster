export default function WhyChooseUsSection() {
  return (
    <section className="py-16 bg-[#121212] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">What Sets Us Apart</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-300">We're not just another HVAC company. We're the team that delivers when others can't—or won't.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-[#5A5A5A] bg-opacity-25 rounded-xl p-6 hover:bg-opacity-40 transition">
            <div className="text-[#DC2626] text-4xl mb-4">
              <i className="fas fa-clock"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Emergency-Ready Service</h3>
            <p className="text-gray-300">We operate after hours, weekends, and holidays — because breakdowns don't wait for 9 to 5.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-[#5A5A5A] bg-opacity-25 rounded-xl p-6 hover:bg-opacity-40 transition">
            <div className="text-[#DC2626] text-4xl mb-4">
              <i className="fas fa-certificate"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Code-Tight Installations</h3>
            <p className="text-gray-300">Every system we touch is installed to National Building Code, CSA B149.1, CEC, and NPC compliance — no shortcuts, ever.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-[#5A5A5A] bg-opacity-25 rounded-xl p-6 hover:bg-opacity-40 transition">
            <div className="text-[#DC2626] text-4xl mb-4">
              <i className="fas fa-users"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Apprentice-Driven Legacy</h3>
            <p className="text-gray-300">We're not just fixing systems — we're building tradesmen and raising the standard for HVAC in Canada.</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#testimonials"
            className="inline-block border-2 border-white text-white font-bold py-3 px-8 rounded-md hover:bg-white hover:text-[#121212] transition"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById('testimonials');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            See What Customers Say
          </a>
        </div>
      </div>
    </section>
  );
}
