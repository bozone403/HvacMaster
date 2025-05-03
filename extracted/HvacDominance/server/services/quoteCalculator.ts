/**
 * Quote calculator service for estimating HVAC project costs
 * Based on real pricing data from the company
 */

interface QuoteResult {
  price: string;
  details: string;
}

// Base prices from pricing document
const BASE_PRICES = {
  furnace: {
    standard: 6499, // Single Stage ECM (95–96%)
    premium: 6999,  // Two-Stage High-Efficiency
    ultimate: 7999  // Modulating/Communicating Furnace
  },
  ac: {
    standard: 6999, // 16 SEER2 (Entry-Level Legal Tier)
    premium: 7499,  // 17–18 SEER2 (Mid-Tier)
    ultimate: 8999  // Variable Speed / Inverter Systems
  },
  combo: {
    standard: 12999, // Combo Furnace + A/C Package
    premium: 13999,  // Higher efficiency combo
    ultimate: 15999  // Top tier combo
  },
  boiler: {
    standard: 8499,
    premium: 9499,
    ultimate: 10999
  },
  ductless: {
    standard: 4999, // Single-Zone
    premium: 6999,  // Multi-Zone
    ultimate: 8999  // Premium Multi-Zone
  },
  repair: {
    standard: 249,  // Basic repair
    premium: 399,   // Complex repair
    ultimate: 599   // Major repair
  },
  maintenance: {
    standard: 179.99, // Annual High-E Furnace Tune-Up
    premium: 349.99,  // Boiler or Hydronic Flush
    ultimate: 474.99  // Full System Deep Clean
  }
};

// Size multipliers for different home sizes
const SIZE_MULTIPLIERS = {
  small: 1,      // < 1,200 sq ft
  medium: 1.15,  // 1,200 - 2,000 sq ft
  large: 1.25,   // 2,000 - 3,000 sq ft
  xl: 1.4        // 3,000+ sq ft
};

// Property type adjustments
const PROPERTY_TYPE_ADJUSTMENTS = {
  'single-family': 0,      // Base price for single family homes
  'condo': -0.1,           // 10% discount for condos (smaller, easier installs)
  'townhouse': -0.05,      // 5% discount for townhouses
  'commercial': 0.25       // 25% premium for light commercial
};

/**
 * Calculates an estimated quote for HVAC services
 */
export function calculateQuote(
  serviceType: string,
  homeSize: string,
  efficiency: string,
  propertyType: string
): QuoteResult {
  // Default values in case calculation fails
  const defaultResult = {
    price: "$6,999",
    details: "This is a default estimate. For a more accurate quote, please contact our team directly."
  };

  try {
    // Get base price for service and efficiency level
    let basePrice = 0;
    const serviceCategory = serviceType as keyof typeof BASE_PRICES;
    const efficiencyLevel = efficiency as keyof typeof BASE_PRICES[typeof serviceCategory];
    
    if (BASE_PRICES[serviceCategory] && BASE_PRICES[serviceCategory][efficiencyLevel]) {
      basePrice = BASE_PRICES[serviceCategory][efficiencyLevel];
    } else {
      return defaultResult;
    }
    
    // Apply size multiplier
    const sizeMultiplier = SIZE_MULTIPLIERS[homeSize as keyof typeof SIZE_MULTIPLIERS] || 1;
    let adjustedPrice = basePrice * sizeMultiplier;
    
    // Apply property type adjustment
    const propertyAdjustment = PROPERTY_TYPE_ADJUSTMENTS[propertyType as keyof typeof PROPERTY_TYPE_ADJUSTMENTS] || 0;
    adjustedPrice = adjustedPrice * (1 + propertyAdjustment);
    
    // Round to nearest dollar
    const finalPrice = Math.round(adjustedPrice);
    
    // Format price with comma for thousands
    const formattedPrice = `$${finalPrice.toLocaleString()}`;
    
    // Generate details message based on selections
    let details = `This estimate is for a ${getEfficiencyLabel(efficiency)} ${getServiceLabel(serviceType)} in a ${getSizeLabel(homeSize)} ${getPropertyLabel(propertyType)}.`;
    
    if (serviceType === 'furnace' || serviceType === 'ac' || serviceType === 'combo') {
      details += " For a precise quote, we'll need to assess your specific requirements including ductwork condition, existing setup, and any additional needs.";
    }
    
    if (serviceType === 'repair' || serviceType === 'maintenance') {
      details += " Final price may vary based on the exact issue discovered during inspection.";
    }
    
    // Add prompt for rebates
    if (serviceType === 'furnace' || serviceType === 'ac' || serviceType === 'combo' || serviceType === 'boiler') {
      details += " You may qualify for additional rebates from Alberta energy efficiency programs.";
    }
    
    return {
      price: formattedPrice,
      details
    };
  } catch (error) {
    console.error("Quote calculation error:", error);
    return defaultResult;
  }
}

// Helper functions to get descriptive labels
function getServiceLabel(serviceType: string): string {
  const labels: Record<string, string> = {
    furnace: 'furnace installation',
    ac: 'air conditioning installation',
    combo: 'furnace and A/C combo installation',
    boiler: 'boiler system installation',
    ductless: 'ductless mini-split installation',
    repair: 'HVAC repair service',
    maintenance: 'maintenance service',
    other: 'HVAC service'
  };
  
  return labels[serviceType] || 'HVAC service';
}

function getEfficiencyLabel(efficiency: string): string {
  const labels: Record<string, string> = {
    standard: 'standard high-efficiency',
    premium: 'premium high-efficiency',
    ultimate: 'ultimate performance'
  };
  
  return labels[efficiency] || 'high-efficiency';
}

function getSizeLabel(homeSize: string): string {
  const labels: Record<string, string> = {
    small: 'small home (under 1,200 sq ft)',
    medium: 'medium-sized home (1,200-2,000 sq ft)',
    large: 'large home (2,000-3,000 sq ft)',
    xl: 'very large home (over 3,000 sq ft)'
  };
  
  return labels[homeSize] || 'home';
}

function getPropertyLabel(propertyType: string): string {
  const labels: Record<string, string> = {
    'single-family': 'single-family home',
    'condo': 'condominium',
    'townhouse': 'townhouse',
    'commercial': 'light commercial property'
  };
  
  return labels[propertyType] || 'property';
}
