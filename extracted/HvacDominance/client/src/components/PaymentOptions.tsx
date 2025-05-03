import React from 'react';
import { FaCreditCard, FaMoneyBillWave, FaRegCreditCard } from 'react-icons/fa';

interface PaymentOptionsProps {
  totalAmount: number;
  onOptionSelect: (option: string) => void;
  selectedOption: string;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ 
  totalAmount, 
  onOptionSelect, 
  selectedOption 
}) => {
  // Calculate Afterpay installments (4 equal payments)
  const afterpayAmount = (totalAmount / 4).toFixed(2);
  
  return (
    <div className="payment-options bg-darkgray rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-white">Choose Payment Method</h3>
      
      <div className="space-y-4">
        {/* Full Payment Option */}
        <div 
          className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 
            ${selectedOption === 'full' 
              ? 'bg-primary/20 border border-primary' 
              : 'bg-dark border border-gray-700 hover:border-primary/50'}`}
          onClick={() => onOptionSelect('full')}
        >
          <div className="flex-shrink-0 mr-4">
            <FaCreditCard className="text-2xl text-primary" />
          </div>
          <div className="flex-grow">
            <h4 className="font-bold text-white">Pay in Full</h4>
            <p className="text-sm text-lightgray">Pay the full amount of ${totalAmount.toFixed(2)} now</p>
          </div>
          <div className="flex-shrink-0 ml-2">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
              ${selectedOption === 'full' ? 'border-primary' : 'border-gray-500'}`}>
              {selectedOption === 'full' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
            </div>
          </div>
        </div>
        
        {/* Afterpay Option */}
        <div 
          className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200
            ${selectedOption === 'afterpay' 
              ? 'bg-primary/20 border border-primary' 
              : 'bg-dark border border-gray-700 hover:border-primary/50'}`}
          onClick={() => onOptionSelect('afterpay')}
        >
          <div className="flex-shrink-0 mr-4">
            <FaRegCreditCard className="text-2xl text-primary" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center">
              <h4 className="font-bold text-white">Afterpay</h4>
              <span className="ml-2 bg-dark text-xs text-white px-2 py-1 rounded">Buy Now, Pay Later</span>
            </div>
            <p className="text-sm text-lightgray">
              4 interest-free payments of ${afterpayAmount}
            </p>
            <p className="text-xs text-lightgray mt-1">First payment today, remaining payments every 2 weeks</p>
          </div>
          <div className="flex-shrink-0 ml-2">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
              ${selectedOption === 'afterpay' ? 'border-primary' : 'border-gray-500'}`}>
              {selectedOption === 'afterpay' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
            </div>
          </div>
        </div>
        
        {/* Financing Option */}
        <div 
          className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200
            ${selectedOption === 'financing' 
              ? 'bg-primary/20 border border-primary' 
              : 'bg-dark border border-gray-700 hover:border-primary/50'}`}
          onClick={() => onOptionSelect('financing')}
        >
          <div className="flex-shrink-0 mr-4">
            <FaMoneyBillWave className="text-2xl text-primary" />
          </div>
          <div className="flex-grow">
            <h4 className="font-bold text-white">Monthly Financing</h4>
            <p className="text-sm text-lightgray">
              As low as ${(totalAmount / 24).toFixed(2)}/month for 24 months
            </p>
            <p className="text-xs text-lightgray mt-1">Subject to credit approval, 0% interest for qualified buyers</p>
          </div>
          <div className="flex-shrink-0 ml-2">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
              ${selectedOption === 'financing' ? 'border-primary' : 'border-gray-500'}`}>
              {selectedOption === 'financing' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-xs text-lightgray">
        <p>
          * Financing options available for purchases over $1,000. Credit check required for financing options.
          Afterpay available for purchases up to $2,000.
        </p>
      </div>
    </div>
  );
};

export default PaymentOptions;