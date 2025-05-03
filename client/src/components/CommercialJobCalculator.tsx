import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Building2, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type BuildingType = 'office' | 'retail' | 'restaurant' | 'warehouse' | 'medical' | 'other';
type SystemType = 'standard' | 'high-efficiency' | 'custom';
type ProjectScope = 'installation' | 'replacement' | 'maintenance' | 'repair';

const buildingTypeBaseRates: Record<BuildingType, number> = {
  office: 20,
  retail: 22,
  restaurant: 28,
  warehouse: 15,
  medical: 32,
  other: 25
};

const systemTypeMultipliers: Record<SystemType, number> = {
  standard: 1,
  'high-efficiency': 1.45,
  custom: 1.8
};

const projectScopeMultipliers: Record<ProjectScope, number> = {
  installation: 1.5,
  replacement: 1,
  maintenance: 0.25,
  repair: 0.6
};

export default function CommercialJobCalculator() {
  const [squareFootage, setSquareFootage] = useState<number>(5000);
  const [buildingType, setBuildingType] = useState<BuildingType>('office');
  const [systemType, setSystemType] = useState<SystemType>('standard');
  const [projectScope, setProjectScope] = useState<ProjectScope>('installation');
  const [numFloors, setNumFloors] = useState<number>(1);
  const [existingDuctwork, setExistingDuctwork] = useState<boolean>(false);
  const [accessComplexity, setAccessComplexity] = useState<number>(1);
  const [afterHoursService, setAfterHoursService] = useState<boolean>(false);
  const [expeditedTimeline, setExpeditedTimeline] = useState<boolean>(false);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [lineItems, setLineItems] = useState<{description: string, cost: number}[]>([]);
  
  // Calculate total cost whenever inputs change
  useEffect(() => {
    calculateTotalCost();
  }, [
    squareFootage, 
    buildingType, 
    systemType, 
    projectScope, 
    numFloors, 
    existingDuctwork, 
    accessComplexity,
    afterHoursService,
    expeditedTimeline
  ]);
  
  const calculateTotalCost = () => {
    // Base calculation
    const baseRatePerSqFt = buildingTypeBaseRates[buildingType];
    const baseCost = squareFootage * baseRatePerSqFt * systemTypeMultipliers[systemType] * projectScopeMultipliers[projectScope];
    
    // Adjustments
    const floorMultiplier = numFloors > 1 ? 1 + ((numFloors - 1) * 0.15) : 1;
    const ductworkDiscount = existingDuctwork ? 0.9 : 1;
    const accessMultiplier = 1 + ((accessComplexity - 1) * 0.25);
    const afterHoursMultiplier = afterHoursService ? 1.35 : 1;
    const expeditedMultiplier = expeditedTimeline ? 1.5 : 1;
    
    // Final calculation
    const adjustedCost = baseCost * floorMultiplier * ductworkDiscount * accessMultiplier * afterHoursMultiplier * expeditedMultiplier;
    
    // Generate line items for transparency
    const newLineItems = [
      {
        description: `Base cost (${squareFootage} sq.ft @ $${baseRatePerSqFt.toFixed(2)}/sq.ft)`,
        cost: squareFootage * baseRatePerSqFt
      },
      {
        description: `System type (${systemType}) adjustment`,
        cost: (squareFootage * baseRatePerSqFt * systemTypeMultipliers[systemType]) - (squareFootage * baseRatePerSqFt)
      },
      {
        description: `Project scope (${projectScope}) adjustment`,
        cost: (squareFootage * baseRatePerSqFt * systemTypeMultipliers[systemType] * projectScopeMultipliers[projectScope]) - 
              (squareFootage * baseRatePerSqFt * systemTypeMultipliers[systemType])
      },
      {
        description: `Multi-floor adjustment (${numFloors} ${numFloors === 1 ? 'floor' : 'floors'})`,
        cost: baseCost * floorMultiplier - baseCost
      }
    ];
    
    if (existingDuctwork) {
      newLineItems.push({
        description: 'Existing ductwork discount',
        cost: baseCost * floorMultiplier * ductworkDiscount - baseCost * floorMultiplier
      });
    }
    
    if (accessComplexity > 1) {
      newLineItems.push({
        description: `Access complexity adjustment (Level ${accessComplexity})`,
        cost: baseCost * floorMultiplier * ductworkDiscount * accessMultiplier - baseCost * floorMultiplier * ductworkDiscount
      });
    }
    
    if (afterHoursService) {
      newLineItems.push({
        description: 'After-hours service premium',
        cost: baseCost * floorMultiplier * ductworkDiscount * accessMultiplier * afterHoursMultiplier - 
              baseCost * floorMultiplier * ductworkDiscount * accessMultiplier
      });
    }
    
    if (expeditedTimeline) {
      newLineItems.push({
        description: 'Expedited timeline premium',
        cost: adjustedCost - (baseCost * floorMultiplier * ductworkDiscount * accessMultiplier * afterHoursMultiplier)
      });
    }
    
    setLineItems(newLineItems);
    setTotalCost(adjustedCost);
  };
  
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };
  
  const handleSliderChange = (value: number[]) => {
    setSquareFootage(value[0]);
  };
  
  return (
    <Card className="w-full shadow-xl border border-gray-800 bg-black">
      <CardHeader className="bg-gray-900 border-b border-gray-800">
        <CardTitle className="flex items-center text-white">
          <Building2 className="mr-2 h-5 w-5 text-primary" />
          Commercial HVAC Project Cost Calculator
        </CardTitle>
        <CardDescription>
          Get an accurate estimate for your commercial HVAC project based on building specifications
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="calculator">
              <Calculator className="mr-2 h-4 w-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="results">
              <Check className="mr-2 h-4 w-4" />
              Results
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Building Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Building Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="building-type">Building Type</Label>
                  <Select value={buildingType} onValueChange={(value) => setBuildingType(value as BuildingType)}>
                    <SelectTrigger id="building-type">
                      <SelectValue placeholder="Select building type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Office Building</SelectItem>
                      <SelectItem value="retail">Retail Space</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="warehouse">Warehouse/Industrial</SelectItem>
                      <SelectItem value="medical">Medical Facility</SelectItem>
                      <SelectItem value="other">Other Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="square-footage">Square Footage</Label>
                    <span className="text-gray-400 text-sm">{squareFootage.toLocaleString()} sq.ft</span>
                  </div>
                  <Slider
                    id="square-footage"
                    value={[squareFootage]}
                    min={1000}
                    max={100000}
                    step={500}
                    onValueChange={handleSliderChange}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1,000 sq.ft</span>
                    <span>100,000 sq.ft</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="num-floors">Number of Floors</Label>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-r-none"
                      onClick={() => setNumFloors(prev => Math.max(1, prev - 1))}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Input
                      id="num-floors"
                      type="number"
                      value={numFloors}
                      onChange={(e) => setNumFloors(parseInt(e.target.value) || 1)}
                      min={1}
                      max={50}
                      className="rounded-none text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-l-none"
                      onClick={() => setNumFloors(prev => Math.min(50, prev + 1))}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="existing-ductwork"
                    checked={existingDuctwork}
                    onCheckedChange={setExistingDuctwork}
                  />
                  <Label htmlFor="existing-ductwork" className="cursor-pointer">Existing Usable Ductwork</Label>
                </div>
              </div>
              
              {/* Project Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Project Details</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="system-type">System Type</Label>
                  <Select value={systemType} onValueChange={(value) => setSystemType(value as SystemType)}>
                    <SelectTrigger id="system-type">
                      <SelectValue placeholder="Select system type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Efficiency</SelectItem>
                      <SelectItem value="high-efficiency">High Efficiency</SelectItem>
                      <SelectItem value="custom">Custom/Specialized</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="project-scope">Project Scope</Label>
                  <Select value={projectScope} onValueChange={(value) => setProjectScope(value as ProjectScope)}>
                    <SelectTrigger id="project-scope">
                      <SelectValue placeholder="Select project scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="installation">New Installation</SelectItem>
                      <SelectItem value="replacement">System Replacement</SelectItem>
                      <SelectItem value="maintenance">Maintenance Contract</SelectItem>
                      <SelectItem value="repair">Repairs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="access-complexity">Access Complexity</Label>
                  <Select 
                    value={accessComplexity.toString()} 
                    onValueChange={(value) => setAccessComplexity(parseInt(value))}
                  >
                    <SelectTrigger id="access-complexity">
                      <SelectValue placeholder="Select access complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Level 1 - Easy Access</SelectItem>
                      <SelectItem value="2">Level 2 - Normal Access</SelectItem>
                      <SelectItem value="3">Level 3 - Difficult Access</SelectItem>
                      <SelectItem value="4">Level 4 - Very Difficult Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="after-hours"
                    checked={afterHoursService}
                    onCheckedChange={setAfterHoursService}
                  />
                  <Label htmlFor="after-hours" className="cursor-pointer">After-Hours Service</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="expedited"
                    checked={expeditedTimeline}
                    onCheckedChange={setExpeditedTimeline}
                  />
                  <Label htmlFor="expedited" className="cursor-pointer">Expedited Timeline</Label>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-4">
            <div className="text-center py-8 px-4 bg-gray-900 rounded-lg">
              <h3 className="text-2xl font-semibold text-white">Estimated Project Cost</h3>
              <motion.div
                className="text-5xl font-bold text-primary my-4"
                key={totalCost}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {formatCurrency(totalCost)}
              </motion.div>
              <p className="text-gray-400">
                Based on a {squareFootage.toLocaleString()} sq.ft {buildingType} building with {numFloors} floor{numFloors > 1 ? 's' : ''}
              </p>
            </div>
            
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={() => setDetailsOpen(!detailsOpen)}
            >
              {detailsOpen ? 'Hide' : 'Show'} Cost Breakdown
              {detailsOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
            
            {detailsOpen && (
              <motion.div
                className="space-y-3 pt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-lg font-semibold text-white">Detailed Cost Breakdown</h4>
                <div className="space-y-2">
                  {lineItems.map((item, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-300">{item.description}</span>
                      <span className={`font-medium ${item.cost < 0 ? 'text-green-500' : 'text-gray-200'}`}>
                        {formatCurrency(item.cost)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between py-3 border-t border-gray-700 font-bold">
                    <span className="text-white">Total Estimated Cost</span>
                    <span className="text-primary">{formatCurrency(totalCost)}</span>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="pt-4">
              <p className="text-sm text-gray-400">
                This estimate is based on industry standards and local rates in Calgary. Final costs may vary based on exact 
                requirements, site inspection, and material/equipment selection. Contact us for a detailed quote.
              </p>
              <div className="flex justify-center mt-6">
                <Button className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-8 rounded-lg">
                  Request Detailed Commercial Quote
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}