import { cn } from "@/lib/utils";
import { maintenancePlans } from "@/data/maintenancePlans";
import { formatPrice } from "@/lib/utils";

interface PricingSectionProps {
  openBookingCalendar: (service: string) => void;
}

export default function PricingSection({ openBookingCalendar }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[#121212] mb-4">Transparent Pricing for 2025</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">High-efficiency systems only. Fully compliant with Alberta & Canada Greener Homes / NRCan regulations.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Furnaces Pricing Card */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <div className="bg-[#121212] text-white p-6">
              <h3 className="text-2xl font-bold">High-Efficiency Furnaces</h3>
              <p className="text-gray-300">95%+ AFUE Only</p>
            </div>
            
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-left">System Tier</th>
                    <th className="py-3 text-right">Starting Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3">
                      <span className="font-semibold">Single Stage ECM (95-96%)</span>
                      <p className="text-sm text-gray-500">Alberta-legal minimum tier</p>
                    </td>
                    <td className="py-3 text-right font-bold">$5,999</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3">
                      <span className="font-semibold">Two-Stage High-Efficiency</span>
                      <p className="text-sm text-gray-500">Quieter, better airflow balance</p>
                    </td>
                    <td className="py-3 text-right font-bold">$6,499</td>
                  </tr>
                  <tr>
                    <td className="py-3">
                      <span className="font-semibold">Modulating/Communicating Furnace</span>
                      <p className="text-sm text-gray-500">Best-in-class efficiency + smart control</p>
                    </td>
                    <td className="py-3 text-right font-bold">$7,499+</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">All systems include venting, gas flex, condensate, electrical tie-in, and full commissioning.</p>
              </div>
              
              <div className="mt-6">
                <button 
                  onClick={() => openBookingCalendar("Furnace Consultation")}
                  className="block w-full bg-[#121212] text-white text-center font-bold py-3 rounded-md hover:bg-gray-800 transition"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
          
          {/* AC Pricing Card */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <div className="bg-[#DC2626] text-white p-6">
              <h3 className="text-2xl font-bold">High-Efficiency A/C</h3>
              <p className="text-gray-100">Minimum SEER2-Compliant</p>
            </div>
            
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-left">System Type</th>
                    <th className="py-3 text-right">Starting Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3">
                      <span className="font-semibold">16 SEER2 (Entry-Level)</span>
                      <p className="text-sm text-gray-500">Basic high-efficiency split system</p>
                    </td>
                    <td className="py-3 text-right font-bold">$6,499</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3">
                      <span className="font-semibold">17-18 SEER2 (Mid-Tier)</span>
                      <p className="text-sm text-gray-500">Better energy savings + quieter operation</p>
                    </td>
                    <td className="py-3 text-right font-bold">$6,999-$7,499</td>
                  </tr>
                  <tr>
                    <td className="py-3">
                      <span className="font-semibold">Variable Speed / Inverter</span>
                      <p className="text-sm text-gray-500">Maximum comfort + zone-ready</p>
                    </td>
                    <td className="py-3 text-right font-bold">$8,499+</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">All A/C systems include SEER2/CEER/ENERGY STAR compliance paperwork + permit-ready installation.</p>
              </div>
              
              <div className="mt-6">
                <button 
                  onClick={() => openBookingCalendar("AC Consultation")}
                  className="block w-full bg-[#DC2626] text-white text-center font-bold py-3 rounded-md hover:bg-red-700 transition"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Maintenance Plans */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-[#121212] text-center mb-6">Maintenance Plans</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {maintenancePlans.map((plan) => (
              <div 
                key={plan.id}
                className={cn(
                  "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition",
                  plan.popular && "scale-105 z-10"
                )}
              >
                <div className={cn(`bg-${plan.color} text-white p-6 text-center`, plan.popular && "relative")}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-[#DC2626] text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                      MOST POPULAR
                    </div>
                  )}
                  <h4 className="text-xl font-bold">{plan.name}</h4>
                  <div className="text-3xl font-black mt-2">
                    ${plan.price}<span className="text-base font-normal">/year</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <i className={cn(`fas fa-check-circle text-${plan.color} mt-1 mr-2`)}></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => openBookingCalendar(`${plan.name} Maintenance Plan`)}
                    className={cn(
                      "block w-full font-bold py-3 rounded-md mt-6 transition text-center",
                      plan.id === "bronze" && "bg-gray-200 text-[#121212] hover:bg-gray-300",
                      plan.id === "gold" && "bg-yellow-500 text-white hover:bg-yellow-600",
                      plan.id === "platinum" && "bg-gray-800 text-white hover:bg-black"
                    )}
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
