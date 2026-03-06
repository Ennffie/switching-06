import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import { useTransfer } from '../context/TransferContext';

interface Plan {
  id: string;
  name: string;
  subtitle: string;
  date: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  icon: string;
}

const SelectPlanPage = () => {
  const navigate = useNavigate();
  const { transferData, setStep1Data } = useTransfer();
  
  // 從 Context 讀取已選擇嘅計劃
  const [selectedPlan, setSelectedPlan] = useState<string>(() => {
    // 如果 Context 有資料，返返對應嘅 plan id
    if (transferData.step1?.planName.includes('友邦')) return 'aia';
    if (transferData.step1?.planName.includes('宏利')) return 'manulife';
    return 'aia'; // 預設
  });

  const plans: Plan[] = [
    {
      id: 'aia',
      name: '友邦強積金優選計劃',
      subtitle: '自 15/03/2015 | 成員帳戶號碼：38765432',
      date: '15/03/2015',
      accountNumber: '56442131',
      accountType: '一般僱員',
      balance: 122309.07,
      icon: './icons/aia-logo-new.jpg',
    },
    {
      id: 'manulife',
      name: '宏利環球精選（強積金）計劃',
      subtitle: '自 26/01/2011 | 成員帳戶號碼：29819644',
      date: '26/01/2011',
      accountNumber: '29819644',
      accountType: '個人帳戶',
      balance: 135050.05,
      icon: './icons/manulife-logo-new.jpg',
    },
  ];

  const handlePlanClick = (planId: string) => {
    if (planId === 'aia') {
      setSelectedPlan(planId);
      // 儲存到 Context
      const selectedPlanData = plans.find(p => p.id === planId);
      if (selectedPlanData) {
        setStep1Data({
          planName: selectedPlanData.name,
          trustee: '友邦(信託)有限',
          accountNumber: selectedPlanData.accountNumber,
          accountType: selectedPlanData.accountType,
          balance: selectedPlanData.balance,
          employerName: 'Taxable VC (Not Applicable)',
          icon: selectedPlanData.icon,
        });
      }
    }
    // 宏利按下無反應（不能選擇）
  };

  const handleNext = () => {
    if (selectedPlan) {
      navigate('/invest/fund-transfer');
    }
  };

  const formatBalance = (balance: number) => {
    return `$ ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Sticky Header + Step Bar Container */}
      <div className="sticky top-0 z-50 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-gray-600"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-base font-medium text-gray-900">現有帳戶結餘的投資</h1>
          <div className="w-8" />
        </div>

        {/* Step Bar */}
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex items-center justify-center">
            {/* Step 1 - Active */}
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full bg-[#E67E22] flex items-center justify-center">
                <span className="text-white text-sm font-medium">1</span>
              </div>
            </div>
            
            <div className="w-12 h-0.5 bg-gray-300 mx-1" />
            
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-sm">2</span>
              </div>
            </div>
            
            <div className="w-12 h-0.5 bg-gray-300 mx-1" />
            
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-sm">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-1">選擇計劃及帳戶</h2>
        <p className="text-gray-600 text-sm mb-4">請從下方選項中選擇</p>

        {/* Reminder Banner */}
        <div className="bg-[#FFF5F0] border border-[#FFE0D0] rounded-lg px-4 py-3 mb-4">
          <p className="text-sm">
            <span className="text-[#E67E22] font-medium">提醒你：</span>
            <span className="text-[#E67E22]">強積金屬長線投資</span>
          </p>
        </div>

        {/* Plan Cards */}
        <div className="space-y-4">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const isClickable = plan.id === 'aia';
            
            return (
              <div
                key={plan.id}
                onClick={() => isClickable && handlePlanClick(plan.id)}
                className={`
                  bg-white rounded-lg p-4 border-2 transition-all
                  ${isSelected ? 'border-[#E67E22]' : 'border-gray-200'}
                  ${isClickable ? 'cursor-pointer' : 'cursor-default'}
                `}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <img 
                      src={plan.icon} 
                      alt={plan.name}
                      className="w-10 h-10 object-contain mr-3"
                    />
                    <div>
                      <h3 className="text-base font-medium text-gray-900">{plan.name}</h3>
                      <p className="text-xs text-gray-500">{plan.subtitle}</p>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#E67E22] flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">帳戶類別</span>
                    <span className="text-sm text-gray-900">{plan.accountType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">帳戶結餘（港幣）</span>
                    <span className="text-sm font-medium text-gray-900">{formatBalance(plan.balance)}</span>
                  </div>
                </div>

                {/* Account Details Link */}
                <div className="mt-3">
                  <button 
                    className="text-sm text-blue-600 hover:text-blue-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    帳戶詳情
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
        <button
          onClick={handleNext}
          disabled={!selectedPlan}
          className={`
            w-full py-3 rounded-lg text-base font-medium transition-all
            ${selectedPlan 
              ? 'bg-[#1e3a5f] text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          下一步
        </button>
      </div>

      <div className="h-20" />
    </div>
  );
};

export default SelectPlanPage;