import React from 'react';
import { Check } from 'lucide-react';

interface StepBarProps {
  currentStep: number;
}

const StepBar: React.FC<StepBarProps> = ({ currentStep }) => {
  const steps = [1, 2, 3];

  return (
    <div className="w-full bg-white px-6 py-6 border-b border-gray-100 mb-2">
      <div className="w-full relative flex items-center justify-between">
        {/* Connecting Lines */}
        <div className="absolute top-5 left-0 right-0 h-[2px] bg-gray-200 -z-0" />
        <div 
          className="absolute top-5 left-0 h-[2px] bg-[#E67E22] transition-all duration-300 -z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {/* Step Items */}
        {steps.map((stepNumber, index) => {
          const isCompleted = index + 1 < currentStep;
          const isActive = index + 1 === currentStep;

          return (
            <div key={stepNumber} className="relative z-10 flex flex-col items-center">
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold transition-all duration-300
                  ${isCompleted 
                    ? 'bg-[#E67E22] text-white shadow-md' 
                    : isActive 
                      ? 'bg-[#E67E22] text-white shadow-md' 
                      : 'bg-gray-200 text-white'
                  }
                `}
              >
                {isCompleted ? <Check size={20} strokeWidth={3} /> : stepNumber}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepBar;
