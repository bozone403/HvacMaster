import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { formatPrice } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Info, Save, Printer, Filter, ArrowRight, FileCheck, ChevronDown, ChevronUp } from 'lucide-react';

// Based on detailed HVAC pricing from Calgary 2025
const PRICING = {
  furnace: {
    unit: {
      standard: { min: 2000, max: 2600 }, // 80-100 MBH, 96%+ ECM
    },
    plenum: { min: 100, max: 160 },
    fittings: { min: 50, max: 90 },
    electrical: { min: 35, max: 55 },
    gasLine: { min: 45, max: 70 },
    ventPipe: { min: 250, max: 320 }, // 25-30ft average
    ventFittings: { min: 100, max: 160 }, // 6-10 pieces
    sealant: { min: 15, max: 30 },
    labour: { hourly: 175, hours: { min: 6, max: 8 } },
  },
  ac: {
    unit: {
      '1.5ton': { min: 1850, max: 2200 },
      '2ton': { min: 2200, max: 2600 },
      '2.5ton': { min: 2600, max: 3000 },
      '3ton': { min: 3000, max: 3200 },
      '3.5ton': { min: 3200, max: 3400 },
      '4ton': { min: 3300, max: 3400 },
      '5ton': { min: 3350, max: 3500 },
    },
    coil: { min: 550, max: 850 },
    lineSet: { min: 250, max: 375 },
    pad: { min: 110, max: 180 },
    statWire: { min: 25, max: 35 },
    labour: { hourly: 175, hours: { min: 5, max: 7 } },
  },
  ductwork: {
    pipe: { min: 320, max: 440 }, // 120 ft
    fittings: { min: 280, max: 420 }, // 30-50 pieces
    boots: { min: 135, max: 360 }, // 18-30 boots
    dampeners: { min: 160, max: 240 }, // Y's, Tees, Dampers (10-15)
    plenums: { min: 300, max: 550 },
    flexDuct: { min: 150, max: 275 },
    sealant: { min: 60, max: 90 },
    labour: { min: 2600, max: 4000 }, // 3-5 days, 2 techs
  },
  hrv: {
    unit: { min: 1100, max: 1800 },
    ductKit: { min: 220, max: 320 },
    dampers: { min: 120, max: 180 },
    condensate: { min: 30, max: 45 },
    labour: { hourly: 175, hours: { min: 2, max: 3 } },
  },
  bathFans: {
    unit: { min: 90, max: 140 },
    duct: { min: 25, max: 40 },
    damper: { min: 35, max: 60 },
    cap: { min: 40, max: 65 },
    kitchen: { min: 60, max: 90 }, // Kitchen range hood duct
    labour: { hourly: 175, hours: { min: 1, max: 1.5 } },
  },
  gasFitting: {
    pipe: { min: 180, max: 320 }, // CSST / Black Iron (25-40 ft)
    fittings: { min: 60, max: 110 },
    testing: 30,
    pressureTest: 10,
    labour: { hourly: 175, hours: { min: 3, max: 4 } },
  },
  misc: {
    primer: { min: 28, max: 38 },
    straps: { min: 40, max: 70 },
    drainLine: { min: 25, max: 40 },
    silicone: { min: 20, max: 35 },
    supplies: { min: 25, max: 40 },
  },
  roofPenetrations: {
    vent: { min: 45, max: 70 },
    flashing: { min: 15, max: 30 },
    labour: 175, // 1 hr
  },
  extras: {
    breakers: { min: 80, max: 120 },
    condensatePump: { min: 95, max: 140 },
    wifiThermostat: { min: 150, max: 350 },
    atticInsulation: { min: 150, max: 400 },
    returnAir: { min: 200, max: 300 },
    permitFee: { min: 50, max: 150 },
    garbage: { min: 180, max: 300 },
  },
  homeSizes: {
    '1500': { min: 14000, max: 18000 },
    '2000': { min: 17000, max: 21000 },
    '2500': { min: 20000, max: 25000 },
    '3000plus': { min: 24000, max: 30000 },
  },
};

const getAcTonnage = (squareFootage: number): string => {
  if (squareFootage < 1000) return '1.5ton';
  if (squareFootage < 1500) return '2ton';
  if (squareFootage < 2000) return '2.5ton';
  if (squareFootage < 2500) return '3ton';
  if (squareFootage < 3000) return '3.5ton';
  if (squareFootage < 3500) return '4ton';
  return '5ton';
};

const DEFAULT_HOME_SIZE = 1500;
const DEFAULT_NUM_BATH_FANS = 2;

export default function AdvancedPricingCalculator() {
  const [advancedMode, setAdvancedMode] = useState(false);
  const [activeTab, setActiveTab] = useState('furnace');
  const [squareFootage, setSquareFootage] = useState(DEFAULT_HOME_SIZE);
  const [numBathFans, setNumBathFans] = useState(DEFAULT_NUM_BATH_FANS);
  const [options, setOptions] = useState({
    furnace: true,
    ac: true,
    ductwork: false,
    hrv: false,
    bathFans: true,
    gasFitting: true,
    roofPenetrations: true,
    wifiThermostat: true,
    permitFee: true,
  });
  
  // Advanced Options
  const [advancedOptions, setAdvancedOptions] = useState({
    furnace: {
      efficiency: 'standard', // standard, high, premium
      includeLabor: true,
      includePlenum: true,
      includeFittings: true,
      includeElectrical: true,
      includeGasLine: true,
      includeVentPipe: true,
      includeVentFittings: true,
      includeSealant: true,
    },
    ac: {
      tonnage: getAcTonnage(squareFootage),
      includeCoil: true,
      includeLineSet: true,
      includePad: true,
      includeStatWire: true,
      includeLabor: true,
    },
    ductwork: {
      includeLabor: true,
      includePipe: true,
      includeFittings: true,
      includeBoots: true,
      includeDampeners: true,
      includePlenums: true,
      includeFlexDuct: true,
      includeSealant: true,
    },
    hrv: {
      includeLabor: true,
      includeDuctKit: true,
      includeDampers: true,
      includeCondensate: true,
    },
    extras: {
      includeBreakers: false,
      includeCondensatePump: false,
      includeAtticInsulation: false,
      includeReturnAir: false,
      includeGarbage: false,
    },
  });
  
  // Calculate totals
  const calculateTotals = () => {
    let furnaceTotal = { min: 0, max: 0 };
    let acTotal = { min: 0, max: 0 };
    let ductworkTotal = { min: 0, max: 0 };
    let hrvTotal = { min: 0, max: 0 };
    let bathFansTotal = { min: 0, max: 0 };
    let gasFittingTotal = { min: 0, max: 0 };
    let roofPenetrationsTotal = { min: 0, max: 0 };
    let extrasTotal = { min: 0, max: 0 };
    
    // Calculate furnace total
    if (options.furnace) {
      const { furnace } = PRICING;
      const opts = advancedOptions.furnace;
      
      // Add furnace unit
      furnaceTotal.min += furnace.unit[opts.efficiency]?.min || furnace.unit.standard.min;
      furnaceTotal.max += furnace.unit[opts.efficiency]?.max || furnace.unit.standard.max;
      
      // Add components based on options
      if (opts.includePlenum) {
        furnaceTotal.min += furnace.plenum.min;
        furnaceTotal.max += furnace.plenum.max;
      }
      
      if (opts.includeFittings) {
        furnaceTotal.min += furnace.fittings.min;
        furnaceTotal.max += furnace.fittings.max;
      }
      
      if (opts.includeElectrical) {
        furnaceTotal.min += furnace.electrical.min;
        furnaceTotal.max += furnace.electrical.max;
      }
      
      if (opts.includeGasLine) {
        furnaceTotal.min += furnace.gasLine.min;
        furnaceTotal.max += furnace.gasLine.max;
      }
      
      if (opts.includeVentPipe) {
        furnaceTotal.min += furnace.ventPipe.min;
        furnaceTotal.max += furnace.ventPipe.max;
      }
      
      if (opts.includeVentFittings) {
        furnaceTotal.min += furnace.ventFittings.min;
        furnaceTotal.max += furnace.ventFittings.max;
      }
      
      if (opts.includeSealant) {
        furnaceTotal.min += furnace.sealant.min;
        furnaceTotal.max += furnace.sealant.max;
      }
      
      // Add labor
      if (opts.includeLabor) {
        furnaceTotal.min += furnace.labour.hourly * furnace.labour.hours.min;
        furnaceTotal.max += furnace.labour.hourly * furnace.labour.hours.max;
      }
    }
    
    // Calculate AC total
    if (options.ac) {
      const { ac } = PRICING;
      const opts = advancedOptions.ac;
      const tonnage = opts.tonnage || getAcTonnage(squareFootage);
      
      // Add AC unit
      acTotal.min += ac.unit[tonnage]?.min || ac.unit['3ton'].min;
      acTotal.max += ac.unit[tonnage]?.max || ac.unit['3ton'].max;
      
      // Add components based on options
      if (opts.includeCoil) {
        acTotal.min += ac.coil.min;
        acTotal.max += ac.coil.max;
      }
      
      if (opts.includeLineSet) {
        acTotal.min += ac.lineSet.min;
        acTotal.max += ac.lineSet.max;
      }
      
      if (opts.includePad) {
        acTotal.min += ac.pad.min;
        acTotal.max += ac.pad.max;
      }
      
      if (opts.includeStatWire) {
        acTotal.min += ac.statWire.min;
        acTotal.max += ac.statWire.max;
      }
      
      // Add labor
      if (opts.includeLabor) {
        acTotal.min += ac.labour.hourly * ac.labour.hours.min;
        acTotal.max += ac.labour.hourly * ac.labour.hours.max;
      }
    }
    
    // Calculate ductwork total
    if (options.ductwork) {
      const { ductwork } = PRICING;
      const opts = advancedOptions.ductwork;
      
      if (opts.includePipe) {
        ductworkTotal.min += ductwork.pipe.min;
        ductworkTotal.max += ductwork.pipe.max;
      }
      
      if (opts.includeFittings) {
        ductworkTotal.min += ductwork.fittings.min;
        ductworkTotal.max += ductwork.fittings.max;
      }
      
      if (opts.includeBoots) {
        ductworkTotal.min += ductwork.boots.min;
        ductworkTotal.max += ductwork.boots.max;
      }
      
      if (opts.includeDampeners) {
        ductworkTotal.min += ductwork.dampeners.min;
        ductworkTotal.max += ductwork.dampeners.max;
      }
      
      if (opts.includePlenums) {
        ductworkTotal.min += ductwork.plenums.min;
        ductworkTotal.max += ductwork.plenums.max;
      }
      
      if (opts.includeFlexDuct) {
        ductworkTotal.min += ductwork.flexDuct.min;
        ductworkTotal.max += ductwork.flexDuct.max;
      }
      
      if (opts.includeSealant) {
        ductworkTotal.min += ductwork.sealant.min;
        ductworkTotal.max += ductwork.sealant.max;
      }
      
      // Add labor
      if (opts.includeLabor) {
        ductworkTotal.min += ductwork.labour.min;
        ductworkTotal.max += ductwork.labour.max;
      }
    }
    
    // Calculate HRV total
    if (options.hrv) {
      const { hrv } = PRICING;
      const opts = advancedOptions.hrv;
      
      // Add unit
      hrvTotal.min += hrv.unit.min;
      hrvTotal.max += hrv.unit.max;
      
      if (opts.includeDuctKit) {
        hrvTotal.min += hrv.ductKit.min;
        hrvTotal.max += hrv.ductKit.max;
      }
      
      if (opts.includeDampers) {
        hrvTotal.min += hrv.dampers.min;
        hrvTotal.max += hrv.dampers.max;
      }
      
      if (opts.includeCondensate) {
        hrvTotal.min += hrv.condensate.min;
        hrvTotal.max += hrv.condensate.max;
      }
      
      // Add labor
      if (opts.includeLabor) {
        hrvTotal.min += hrv.labour.hourly * hrv.labour.hours.min;
        hrvTotal.max += hrv.labour.hourly * hrv.labour.hours.max;
      }
    }
    
    // Calculate bath fans total
    if (options.bathFans) {
      const { bathFans } = PRICING;
      
      // Multiply by number of fans
      bathFansTotal.min += numBathFans * (
        bathFans.unit.min + 
        bathFans.duct.min + 
        bathFans.damper.min + 
        bathFans.cap.min + 
        (bathFans.labour.hourly * bathFans.labour.hours.min)
      );
      
      bathFansTotal.max += numBathFans * (
        bathFans.unit.max + 
        bathFans.duct.max + 
        bathFans.damper.max + 
        bathFans.cap.max + 
        (bathFans.labour.hourly * bathFans.labour.hours.max)
      );
    }
    
    // Calculate gas fitting total
    if (options.gasFitting) {
      const { gasFitting } = PRICING;
      
      gasFittingTotal.min = gasFitting.pipe.min + gasFitting.fittings.min + 
        gasFitting.testing + gasFitting.pressureTest + 
        (gasFitting.labour.hourly * gasFitting.labour.hours.min);
      
      gasFittingTotal.max = gasFitting.pipe.max + gasFitting.fittings.max + 
        gasFitting.testing + gasFitting.pressureTest + 
        (gasFitting.labour.hourly * gasFitting.labour.hours.max);
    }
    
    // Calculate roof penetrations total
    if (options.roofPenetrations) {
      const { roofPenetrations } = PRICING;
      
      // Assume 2 roof penetrations
      const numPenetrations = 2;
      
      roofPenetrationsTotal.min = numPenetrations * (
        roofPenetrations.vent.min + 
        roofPenetrations.flashing.min + 
        roofPenetrations.labour
      );
      
      roofPenetrationsTotal.max = numPenetrations * (
        roofPenetrations.vent.max + 
        roofPenetrations.flashing.max + 
        roofPenetrations.labour
      );
    }
    
    // Calculate extras total
    const { extras } = PRICING;
    const extraOpts = advancedOptions.extras;
    
    if (options.wifiThermostat) {
      extrasTotal.min += extras.wifiThermostat.min;
      extrasTotal.max += extras.wifiThermostat.max;
    }
    
    if (options.permitFee) {
      extrasTotal.min += extras.permitFee.min;
      extrasTotal.max += extras.permitFee.max;
    }
    
    if (extraOpts.includeBreakers) {
      extrasTotal.min += extras.breakers.min;
      extrasTotal.max += extras.breakers.max;
    }
    
    if (extraOpts.includeCondensatePump) {
      extrasTotal.min += extras.condensatePump.min;
      extrasTotal.max += extras.condensatePump.max;
    }
    
    if (extraOpts.includeAtticInsulation) {
      extrasTotal.min += extras.atticInsulation.min;
      extrasTotal.max += extras.atticInsulation.max;
    }
    
    if (extraOpts.includeReturnAir) {
      extrasTotal.min += extras.returnAir.min;
      extrasTotal.max += extras.returnAir.max;
    }
    
    if (extraOpts.includeGarbage) {
      extrasTotal.min += extras.garbage.min;
      extrasTotal.max += extras.garbage.max;
    }
    
    // Calculate grand total
    const grandTotal = {
      min: furnaceTotal.min + acTotal.min + ductworkTotal.min + hrvTotal.min + 
           bathFansTotal.min + gasFittingTotal.min + roofPenetrationsTotal.min + extrasTotal.min,
      max: furnaceTotal.max + acTotal.max + ductworkTotal.max + hrvTotal.max + 
           bathFansTotal.max + gasFittingTotal.max + roofPenetrationsTotal.max + extrasTotal.max
    };
    
    return {
      furnace: furnaceTotal,
      ac: acTotal,
      ductwork: ductworkTotal,
      hrv: hrvTotal,
      bathFans: bathFansTotal,
      gasFitting: gasFittingTotal,
      roofPenetrations: roofPenetrationsTotal,
      extras: extrasTotal,
      grandTotal,
    };
  };
  
  const totals = calculateTotals();
  
  // Toggle system options
  const toggleOption = (option: string) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };
  
  // Update advanced options
  const updateAdvancedOption = (category: string, option: string, value: any) => {
    setAdvancedOptions(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [option]: value
      }
    }));
  };
  
  // Effect to update AC tonnage when square footage changes
  useEffect(() => {
    const tonnage = getAcTonnage(squareFootage);
    setAdvancedOptions(prev => ({
      ...prev,
      ac: {
        ...prev.ac,
        tonnage
      }
    }));
  }, [squareFootage]);
  
  // Calculate estimated price from the total range
  const getEstimatedPrice = (min: number, max: number) => {
    return Math.round((min + max) / 2);
  };
  
  // Get a printable estimate of all costs
  const getPrintableEstimate = () => {
    return JSON.stringify({
      date: new Date().toISOString().split('T')[0],
      homeSize: squareFootage,
      systems: options,
      advancedOptions,
      totals,
    }, null, 2);
  };
  
  return (
    <div className="w-full">
      <Card>
        <CardHeader className="bg-primary/5 rounded-t-lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">HVAC System Pricing Calculator</CardTitle>
              <CardDescription>2025 Accurate Calgary HVAC Pricing Breakdown</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="advanced-mode" className="font-medium">
                Pro Mode
              </Label>
              <Switch
                id="advanced-mode"
                checked={advancedMode}
                onCheckedChange={setAdvancedMode}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-12 gap-8">
            {/* Configuration Panel */}
            <div className="md:col-span-5 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Property Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="square-footage" className="mb-2 block">
                      Square Footage: {squareFootage} sq.ft
                    </Label>
                    <Slider
                      id="square-footage"
                      value={[squareFootage]}
                      min={800}
                      max={4000}
                      step={100}
                      onValueChange={(values) => setSquareFootage(values[0])}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>800 sq.ft</span>
                      <span>4,000 sq.ft</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bath-fans" className="mb-2 block">
                      Bathroom Fans: {numBathFans}
                    </Label>
                    <Slider
                      id="bath-fans"
                      value={[numBathFans]}
                      min={0}
                      max={6}
                      step={1}
                      onValueChange={(values) => setNumBathFans(values[0])}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0</span>
                      <span>6</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Systems to Include</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="furnace-option"
                      checked={options.furnace}
                      onCheckedChange={() => toggleOption('furnace')}
                    />
                    <Label
                      htmlFor="furnace-option"
                      className="font-medium cursor-pointer"
                    >
                      Furnace Install
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ac-option"
                      checked={options.ac}
                      onCheckedChange={() => toggleOption('ac')}
                    />
                    <Label
                      htmlFor="ac-option"
                      className="font-medium cursor-pointer"
                    >
                      Air Conditioner
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ductwork-option"
                      checked={options.ductwork}
                      onCheckedChange={() => toggleOption('ductwork')}
                    />
                    <Label
                      htmlFor="ductwork-option"
                      className="font-medium cursor-pointer"
                    >
                      Ductwork & Takeoffs
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hrv-option"
                      checked={options.hrv}
                      onCheckedChange={() => toggleOption('hrv')}
                    />
                    <Label
                      htmlFor="hrv-option"
                      className="font-medium cursor-pointer"
                    >
                      HRV System
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bath-fans-option"
                      checked={options.bathFans}
                      onCheckedChange={() => toggleOption('bathFans')}
                    />
                    <Label
                      htmlFor="bath-fans-option"
                      className="font-medium cursor-pointer"
                    >
                      Bath & Range Hood Fans
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="gas-fitting-option"
                      checked={options.gasFitting}
                      onCheckedChange={() => toggleOption('gasFitting')}
                    />
                    <Label
                      htmlFor="gas-fitting-option"
                      className="font-medium cursor-pointer"
                    >
                      Gas Fitting
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="roof-penetrations-option"
                      checked={options.roofPenetrations}
                      onCheckedChange={() => toggleOption('roofPenetrations')}
                    />
                    <Label
                      htmlFor="roof-penetrations-option"
                      className="font-medium cursor-pointer"
                    >
                      Roof Penetrations
                    </Label>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Extras & Add-ons</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wifi-thermostat-option"
                      checked={options.wifiThermostat}
                      onCheckedChange={() => toggleOption('wifiThermostat')}
                    />
                    <Label
                      htmlFor="wifi-thermostat-option"
                      className="font-medium cursor-pointer"
                    >
                      WiFi Thermostat
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="permit-fee-option"
                      checked={options.permitFee}
                      onCheckedChange={() => toggleOption('permitFee')}
                    />
                    <Label
                      htmlFor="permit-fee-option"
                      className="font-medium cursor-pointer"
                    >
                      Permit Admin Fee
                    </Label>
                  </div>
                  
                  {advancedMode && (
                    <>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="breakers-option"
                          checked={advancedOptions.extras.includeBreakers}
                          onCheckedChange={(checked) => updateAdvancedOption('extras', 'includeBreakers', checked)}
                        />
                        <Label
                          htmlFor="breakers-option"
                          className="font-medium cursor-pointer"
                        >
                          Electrical Breakers
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="condensate-pump-option"
                          checked={advancedOptions.extras.includeCondensatePump}
                          onCheckedChange={(checked) => updateAdvancedOption('extras', 'includeCondensatePump', checked)}
                        />
                        <Label
                          htmlFor="condensate-pump-option"
                          className="font-medium cursor-pointer"
                        >
                          Condensate Pump
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="attic-insulation-option"
                          checked={advancedOptions.extras.includeAtticInsulation}
                          onCheckedChange={(checked) => updateAdvancedOption('extras', 'includeAtticInsulation', checked)}
                        />
                        <Label
                          htmlFor="attic-insulation-option"
                          className="font-medium cursor-pointer"
                        >
                          Attic Insulation Lift
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="return-air-option"
                          checked={advancedOptions.extras.includeReturnAir}
                          onCheckedChange={(checked) => updateAdvancedOption('extras', 'includeReturnAir', checked)}
                        />
                        <Label
                          htmlFor="return-air-option"
                          className="font-medium cursor-pointer"
                        >
                          Return Air Framing
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="garbage-option"
                          checked={advancedOptions.extras.includeGarbage}
                          onCheckedChange={(checked) => updateAdvancedOption('extras', 'includeGarbage', checked)}
                        />
                        <Label
                          htmlFor="garbage-option"
                          className="font-medium cursor-pointer"
                        >
                          Garbage Bin / Dump Run
                        </Label>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Results Panel */}
            <div className="md:col-span-7">
              {/* Price Range Card */}
              <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">Estimated Price Range</h3>
                    <div className="flex justify-center items-baseline gap-2 my-4">
                      <span className="text-3xl font-bold">
                        {formatPrice(getEstimatedPrice(totals.grandTotal.min, totals.grandTotal.max))}
                      </span>
                      <span className="text-muted-foreground">
                        (Range: {formatPrice(totals.grandTotal.min)} - {formatPrice(totals.grandTotal.max)})
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on a {squareFootage} sq.ft home with selected options.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* System Breakdown */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">System Cost Breakdown</h3>
                
                <div className="space-y-3">
                  {options.furnace && (
                    <div className="flex justify-between items-center p-3 bg-muted/40 rounded-lg">
                      <div>
                        <h4 className="font-medium">Furnace System</h4>
                        <p className="text-sm text-muted-foreground">
                          96%+ ECM Furnace with installation
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(getEstimatedPrice(totals.furnace.min, totals.furnace.max))}</p>
                        <p className="text-xs text-muted-foreground">
                          Range: {formatPrice(totals.furnace.min)} - {formatPrice(totals.furnace.max)}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {options.ac && (
                    <div className="flex justify-between items-center p-3 bg-muted/40 rounded-lg">
                      <div>
                        <h4 className="font-medium">Air Conditioning</h4>
                        <p className="text-sm text-muted-foreground">
                          {advancedOptions.ac.tonnage} 16 SEER+ System with installation
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(getEstimatedPrice(totals.ac.min, totals.ac.max))}</p>
                        <p className="text-xs text-muted-foreground">
                          Range: {formatPrice(totals.ac.min)} - {formatPrice(totals.ac.max)}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {options.ductwork && (
                    <div className="flex justify-between items-center p-3 bg-muted/40 rounded-lg">
                      <div>
                        <h4 className="font-medium">Ductwork & Takeoffs</h4>
                        <p className="text-sm text-muted-foreground">
                          Complete duct system for {squareFootage} sq.ft home
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(getEstimatedPrice(totals.ductwork.min, totals.ductwork.max))}</p>
                        <p className="text-xs text-muted-foreground">
                          Range: {formatPrice(totals.ductwork.min)} - {formatPrice(totals.ductwork.max)}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {options.hrv && (
                    <div className="flex justify-between items-center p-3 bg-muted/40 rounded-lg">
                      <div>
                        <h4 className="font-medium">HRV System</h4>
                        <p className="text-sm text-muted-foreground">
                          Standard 70-130 CFM HRV with installation
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(getEstimatedPrice(totals.hrv.min, totals.hrv.max))}</p>
                        <p className="text-xs text-muted-foreground">
                          Range: {formatPrice(totals.hrv.min)} - {formatPrice(totals.hrv.max)}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {options.bathFans && (
                    <div className="flex justify-between items-center p-3 bg-muted/40 rounded-lg">
                      <div>
                        <h4 className="font-medium">Bath & Range Hood Fans</h4>
                        <p className="text-sm text-muted-foreground">
                          {numBathFans} fan{numBathFans !== 1 ? 's' : ''} with ducting and installation
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(getEstimatedPrice(totals.bathFans.min, totals.bathFans.max))}</p>
                        <p className="text-xs text-muted-foreground">
                          Range: {formatPrice(totals.bathFans.min)} - {formatPrice(totals.bathFans.max)}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {options.gasFitting && (
                    <div className="flex justify-between items-center p-3 bg-muted/40 rounded-lg">
                      <div>
                        <h4 className="font-medium">Gas Fitting</h4>
                        <p className="text-sm text-muted-foreground">
                          Gas lines, fittings, and testing
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(getEstimatedPrice(totals.gasFitting.min, totals.gasFitting.max))}</p>
                        <p className="text-xs text-muted-foreground">
                          Range: {formatPrice(totals.gasFitting.min)} - {formatPrice(totals.gasFitting.max)}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {options.roofPenetrations && (
                    <div className="flex justify-between items-center p-3 bg-muted/40 rounded-lg">
                      <div>
                        <h4 className="font-medium">Roof Penetrations</h4>
                        <p className="text-sm text-muted-foreground">
                          Vent jacks, flashing, and installation
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(getEstimatedPrice(totals.roofPenetrations.min, totals.roofPenetrations.max))}</p>
                        <p className="text-xs text-muted-foreground">
                          Range: {formatPrice(totals.roofPenetrations.min)} - {formatPrice(totals.roofPenetrations.max)}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {(options.wifiThermostat || options.permitFee || 
                    (advancedMode && (
                      advancedOptions.extras.includeBreakers || 
                      advancedOptions.extras.includeCondensatePump || 
                      advancedOptions.extras.includeAtticInsulation || 
                      advancedOptions.extras.includeReturnAir || 
                      advancedOptions.extras.includeGarbage
                    ))
                  ) && (
                    <div className="flex justify-between items-center p-3 bg-muted/40 rounded-lg">
                      <div>
                        <h4 className="font-medium">Extras & Add-ons</h4>
                        <p className="text-sm text-muted-foreground">
                          Selected additional components
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(getEstimatedPrice(totals.extras.min, totals.extras.max))}</p>
                        <p className="text-xs text-muted-foreground">
                          Range: {formatPrice(totals.extras.min)} - {formatPrice(totals.extras.max)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Advanced Configuration (if in advanced mode) */}
              {advancedMode && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Advanced Configuration</h3>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="furnace" disabled={!options.furnace}>Furnace</TabsTrigger>
                      <TabsTrigger value="ac" disabled={!options.ac}>AC</TabsTrigger>
                      <TabsTrigger value="other" >Other</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="furnace" className="p-4 border rounded-md mt-2">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="furnace-efficiency" className="block mb-2">Furnace Efficiency</Label>
                          <Select
                            value={advancedOptions.furnace.efficiency}
                            onValueChange={(value) => updateAdvancedOption('furnace', 'efficiency', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select efficiency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard (96% AFUE)</SelectItem>
                              <SelectItem value="high">High Efficiency (97-98% AFUE)</SelectItem>
                              <SelectItem value="premium">Premium (98%+ AFUE + Modulating)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="include-plenum"
                              checked={advancedOptions.furnace.includePlenum}
                              onCheckedChange={(checked) => updateAdvancedOption('furnace', 'includePlenum', checked)}
                            />
                            <Label htmlFor="include-plenum">Include Plenums</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="include-fittings"
                              checked={advancedOptions.furnace.includeFittings}
                              onCheckedChange={(checked) => updateAdvancedOption('furnace', 'includeFittings', checked)}
                            />
                            <Label htmlFor="include-fittings">Include Fittings</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="include-electrical"
                              checked={advancedOptions.furnace.includeElectrical}
                              onCheckedChange={(checked) => updateAdvancedOption('furnace', 'includeElectrical', checked)}
                            />
                            <Label htmlFor="include-electrical">Include Electrical</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="include-gas-line"
                              checked={advancedOptions.furnace.includeGasLine}
                              onCheckedChange={(checked) => updateAdvancedOption('furnace', 'includeGasLine', checked)}
                            />
                            <Label htmlFor="include-gas-line">Include Gas Line</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="include-vent-pipe"
                              checked={advancedOptions.furnace.includeVentPipe}
                              onCheckedChange={(checked) => updateAdvancedOption('furnace', 'includeVentPipe', checked)}
                            />
                            <Label htmlFor="include-vent-pipe">Include Vent Pipe</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="include-vent-fittings"
                              checked={advancedOptions.furnace.includeVentFittings}
                              onCheckedChange={(checked) => updateAdvancedOption('furnace', 'includeVentFittings', checked)}
                            />
                            <Label htmlFor="include-vent-fittings">Include Vent Fittings</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="include-sealant"
                              checked={advancedOptions.furnace.includeSealant}
                              onCheckedChange={(checked) => updateAdvancedOption('furnace', 'includeSealant', checked)}
                            />
                            <Label htmlFor="include-sealant">Include Sealant</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="include-furnace-labor"
                              checked={advancedOptions.furnace.includeLabor}
                              onCheckedChange={(checked) => updateAdvancedOption('furnace', 'includeLabor', checked)}
                            />
                            <Label htmlFor="include-furnace-labor">Include Labor</Label>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="ac" className="p-4 border rounded-md mt-2">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="ac-tonnage" className="block mb-2">AC Size</Label>
                          <Select
                            value={advancedOptions.ac.tonnage}
                            onValueChange={(value) => updateAdvancedOption('ac', 'tonnage', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select AC size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1.5ton">1.5 Ton (600-900 sq.ft)</SelectItem>
                              <SelectItem value="2ton">2 Ton (900-1500 sq.ft)</SelectItem>
                              <SelectItem value="2.5ton">2.5 Ton (1500-2000 sq.ft)</SelectItem>
                              <SelectItem value="3ton">3 Ton (2000-2500 sq.ft)</SelectItem>
                              <SelectItem value="3.5ton">3.5 Ton (2500-3000 sq.ft)</SelectItem>
                              <SelectItem value="4ton">4 Ton (3000-3500 sq.ft)</SelectItem>
                              <SelectItem value="5ton">5 Ton (3500+ sq.ft)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="include-coil"
                              checked={advancedOptions.ac.includeCoil}
                              onCheckedChange={(checked) => updateAdvancedOption('ac', 'includeCoil', checked)}
                            />
                            <Label htmlFor="include-coil">Include A-Coil</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="include-line-set"
                              checked={advancedOptions.ac.includeLineSet}
                              onCheckedChange={(checked) => updateAdvancedOption('ac', 'includeLineSet', checked)}
                            />
                            <Label htmlFor="include-line-set">Include Line Set</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="include-pad"
                              checked={advancedOptions.ac.includePad}
                              onCheckedChange={(checked) => updateAdvancedOption('ac', 'includePad', checked)}
                            />
                            <Label htmlFor="include-pad">Include Pad & Whip</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="include-stat-wire"
                              checked={advancedOptions.ac.includeStatWire}
                              onCheckedChange={(checked) => updateAdvancedOption('ac', 'includeStatWire', checked)}
                            />
                            <Label htmlFor="include-stat-wire">Include Stat Wire</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="include-ac-labor"
                              checked={advancedOptions.ac.includeLabor}
                              onCheckedChange={(checked) => updateAdvancedOption('ac', 'includeLabor', checked)}
                            />
                            <Label htmlFor="include-ac-labor">Include Labor</Label>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="other" className="p-4 border rounded-md mt-2">
                      <div className="space-y-4">
                        {options.ductwork && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">Ductwork Options</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="include-ductwork-labor"
                                  checked={advancedOptions.ductwork.includeLabor}
                                  onCheckedChange={(checked) => updateAdvancedOption('ductwork', 'includeLabor', checked)}
                                />
                                <Label htmlFor="include-ductwork-labor">Include Labor</Label>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="include-pipe"
                                  checked={advancedOptions.ductwork.includePipe}
                                  onCheckedChange={(checked) => updateAdvancedOption('ductwork', 'includePipe', checked)}
                                />
                                <Label htmlFor="include-pipe">Include Pipe</Label>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="include-duct-fittings"
                                  checked={advancedOptions.ductwork.includeFittings}
                                  onCheckedChange={(checked) => updateAdvancedOption('ductwork', 'includeFittings', checked)}
                                />
                                <Label htmlFor="include-duct-fittings">Include Fittings</Label>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="include-boots"
                                  checked={advancedOptions.ductwork.includeBoots}
                                  onCheckedChange={(checked) => updateAdvancedOption('ductwork', 'includeBoots', checked)}
                                />
                                <Label htmlFor="include-boots">Include Boots</Label>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {options.hrv && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">HRV Options</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="include-hrv-labor"
                                  checked={advancedOptions.hrv.includeLabor}
                                  onCheckedChange={(checked) => updateAdvancedOption('hrv', 'includeLabor', checked)}
                                />
                                <Label htmlFor="include-hrv-labor">Include Labor</Label>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="include-duct-kit"
                                  checked={advancedOptions.hrv.includeDuctKit}
                                  onCheckedChange={(checked) => updateAdvancedOption('hrv', 'includeDuctKit', checked)}
                                />
                                <Label htmlFor="include-duct-kit">Include Duct Kit</Label>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="include-dampers"
                                  checked={advancedOptions.hrv.includeDampers}
                                  onCheckedChange={(checked) => updateAdvancedOption('hrv', 'includeDampers', checked)}
                                />
                                <Label htmlFor="include-dampers">Include Dampers</Label>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="include-condensate"
                                  checked={advancedOptions.hrv.includeCondensate}
                                  onCheckedChange={(checked) => updateAdvancedOption('hrv', 'includeCondensate', checked)}
                                />
                                <Label htmlFor="include-condensate">Include Condensate</Label>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 border-t pt-4">
          <div className="text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span>All prices shown include materials and labor unless specified otherwise.</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              <span>Save Quote</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
