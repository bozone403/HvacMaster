import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

type HouseSize = 'small' | 'medium' | 'large';
type SystemEfficiency = 'standard' | 'high' | 'premium';
type FuelType = 'gas' | 'electric';

const HOUSE_SIZE_MULTIPLIER = {
  small: 1,   // 1000-1500 sq ft
  medium: 1.5, // 1500-2500 sq ft
  large: 2.2,  // 2500+ sq ft
};

const EFFICIENCY_SAVINGS_PERCENTAGE = {
  standard: 0,    // 16 SEER AC or 92% AFUE Furnace (baseline)
  high: 0.15,     // 17-18 SEER AC or 95% AFUE Furnace (15% better efficiency)
  premium: 0.30,  // 20+ SEER AC or 98% AFUE Furnace (30% better efficiency)
};

const FUEL_TYPE_COST = {
  gas: 1200,      // Average annual cost for gas heating in Alberta
  electric: 1800, // Average annual cost for electric heating in Alberta
};

// Average equipment age in Alberta homes is 12 years
const DEFAULT_EQUIPMENT_AGE = 12;

export default function EnergySavingsCalculator() {
  const [houseSize, setHouseSize] = useState<HouseSize>('medium');
  const [currentSystemAge, setCurrentSystemAge] = useState<number>(DEFAULT_EQUIPMENT_AGE);
  const [systemEfficiency, setSystemEfficiency] = useState<SystemEfficiency>('high');
  const [fuelType, setFuelType] = useState<FuelType>('gas');
  const [annualSavings, setAnnualSavings] = useState<number>(0);
  const [tenYearSavings, setTenYearSavings] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Calculate approximate savings
  const calculateSavings = () => {
    // Base annual energy cost based on home size and fuel type
    const baseAnnualCost = FUEL_TYPE_COST[fuelType] * HOUSE_SIZE_MULTIPLIER[houseSize];
    
    // Age penalty factor (older systems are less efficient)
    const agePenalty = Math.min(0.40, currentSystemAge * 0.025); // Max 40% penalty for old systems
    
    // Current annual cost with age penalty
    const currentAnnualCost = baseAnnualCost * (1 + agePenalty);
    
    // New system cost with efficiency savings
    const newSystemAnnualCost = baseAnnualCost * (1 - EFFICIENCY_SAVINGS_PERCENTAGE[systemEfficiency]);
    
    // Annual savings
    const savings = currentAnnualCost - newSystemAnnualCost;
    
    setAnnualSavings(Math.round(savings));
    setTenYearSavings(Math.round(savings * 10));
    setShowResults(true);
  };
  
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Calculate Your HVAC Energy Savings</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See how much you could save by upgrading to a modern, energy-efficient heating and cooling system.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Inputs */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Your Current System</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Home Size
                    </label>
                    <Select 
                      onValueChange={(value: string) => setHouseSize(value as HouseSize)} 
                      defaultValue={houseSize}
                    >
                      <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select home size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (1000-1500 sq.ft.)</SelectItem>
                        <SelectItem value="medium">Medium (1500-2500 sq.ft.)</SelectItem>
                        <SelectItem value="large">Large (2500+ sq.ft.)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Current System Age: {currentSystemAge} years
                    </label>
                    <Slider
                      min={1}
                      max={25}
                      step={1}
                      value={[currentSystemAge]}
                      onValueChange={(values) => setCurrentSystemAge(values[0])}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>New</span>
                      <span>25+ Years</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Primary Heat Source
                    </label>
                    <Select 
                      onValueChange={(value: string) => setFuelType(value as FuelType)} 
                      defaultValue={fuelType}
                    >
                      <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gas">Natural Gas</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      New System Efficiency
                    </label>
                    <Select 
                      onValueChange={(value: string) => setSystemEfficiency(value as SystemEfficiency)} 
                      defaultValue={systemEfficiency}
                    >
                      <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select system type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Efficiency (16 SEER/92% AFUE)</SelectItem>
                        <SelectItem value="high">High Efficiency (18 SEER/95% AFUE)</SelectItem>
                        <SelectItem value="premium">Premium (20+ SEER/98% AFUE)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={calculateSavings}
                    className="w-full bg-primary hover:bg-red-700 text-white"
                  >
                    Calculate My Savings
                  </Button>
                </div>
              </div>
              
              {/* Right Column - Results */}
              <div className="flex flex-col justify-center">
                {showResults ? (
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-4">Your Estimated Savings</h3>
                    
                    <div className="mb-8">
                      <p className="text-gray-400 text-sm mb-2">Annual Energy Savings</p>
                      <div className="text-3xl md:text-4xl font-bold text-primary">
                        ${annualSavings}
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <p className="text-gray-400 text-sm mb-2">10-Year Energy Savings</p>
                      <div className="text-3xl md:text-4xl font-bold text-green-500">
                        ${tenYearSavings}
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4 mt-4">
                      <p className="text-white text-sm">
                        <span className="font-bold">Pro Tip:</span> Upgrading your HVAC system could qualify you for up to $5,000 in government rebates!
                      </p>
                      <Button 
                        className="mt-4 bg-primary/80 hover:bg-primary text-white w-full"
                        onClick={() => window.location.href = '/quote'}
                      >
                        Get a Detailed Quote
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-gray-800/50 rounded-xl">
                    <div className="text-5xl text-primary mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">Calculate Your Savings</h3>
                    <p className="text-gray-400 text-sm">
                      Adjust the settings on the left and click "Calculate My Savings" to see how much you could save with a new HVAC system
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>*Estimated savings based on average Alberta energy costs and typical usage patterns. Actual savings may vary.</p>
        </div>
      </div>
    </section>
  );
}
