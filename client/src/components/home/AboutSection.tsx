import { fieldTeam, aiTeam } from "@/data/teamMembers";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[#121212] mb-4">Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our crew is lean, lethal, and legendary — a blend of real-world grit and AI-powered mastery.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fieldTeam.map((member) => (
            <div key={member.id} className="bg-white rounded-xl overflow-hidden shadow-md">
              <div 
                className="h-56 bg-cover bg-center" 
                style={{ backgroundImage: `url('${member.imageSrc}')` }}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#121212]">{member.name}</h3>
                <p className="text-[#DC2626] font-semibold mb-3">{member.title}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* AI Team */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-[#121212] text-center mb-8">AI-Driven Support Staff</h3>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">Our human expertise is backed by cutting-edge AI specialists ensuring 24/7 precision, documentation, dispatch, and scale.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiTeam.map((member) => (
              <div key={member.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="font-bold text-[#121212]">{member.name}</div>
                <p className="text-sm text-[#DC2626]">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
