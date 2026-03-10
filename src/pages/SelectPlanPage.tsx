import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X } from 'lucide-react';
import { useTransfer } from '../context/TransferContext';
import StepBar from '../components/StepBar';

interface Plan {
  id: string;
  name: string;
  date: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  icon: string;
  mandatoryBalance?: number;
  voluntaryBalance?: number;
  gain?: number;
}

const SelectPlanPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { transferData, setStep1Data } = useTransfer();
  const [showModal, setShowModal] = useState(false);
  const [modalPlan, setModalPlan] = useState<Plan | null>(null);
  
  // 從 Context 讀取已選擇嘅計劃
  const [selectedPlan, setSelectedPlan] = useState<string>(() => {
    // 如果 Context 有資料，返返對應嘅 plan id
    if (transferData.step1?.planName.includes('友邦')) return 'aia';
    if (transferData.step1?.planName.includes('宏利')) return 'manulife';
    return ''; // 預設為冇選擇
  });

  const plans: Plan[] = [
    {
      id: 'aia',
      name: '友邦強積金優選計劃',
      date: '29/12/2023',
      accountNumber: '56442131',
      accountType: '一般僱員',
      balance: 128396.91,
      mandatoryBalance: 68389.17,
      voluntaryBalance: 60007.74,
      gain: 58508.93,
      icon: './icons/aia-logo-new.jpg',
    },
    {
      id: 'manulife',
      name: '宏利環球精選（強積金）計劃',
      date: '26/01/2011',
      accountNumber: '29819644',
      accountType: '個人帳戶',
      balance: 44905.94,
      gain: 33109.71,
      icon: './icons/manulife-logo-new.jpg',
    },
    {
      id: 'hsbc',
      name: '滙豐強積金智選計劃',
      date: '15/03/2019',
      accountNumber: '88273645',
      accountType: '個人帳戶',
      balance: 82622.89,
      gain: 60043.27,
      icon: './icons/hsbc-logo.jpg',
    },
  ];

  const handlePlanClick = (planId: string) => {
    setSelectedPlan(planId);
    
    // 只有選擇 AIA 才會儲存到 Context，因為只有 AIA 可以落下一頁
    if (planId === 'aia') {
      const selectedPlanData = plans.find(p => p.id === planId);
      if (selectedPlanData) {
        setStep1Data({
          planName: selectedPlanData.name,
          trustee: '友邦(信託)有限',
          accountNumber: selectedPlanData.accountNumber,
          accountType: selectedPlanData.accountType,
          balance: selectedPlanData.balance,
          employerName: '實運有限公司',
          icon: selectedPlanData.icon,
        });
      }
    }
  };

  const handleOpenModal = (e: React.MouseEvent, plan: Plan) => {
    e.stopPropagation();
    setModalPlan(plan);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalPlan(null);
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
        <StepBar currentStep={1} />
      </div>

      <div className="px-4 py-6">
        {/* Title - 橙色 */}
        <h2 className="text-[22px] font-bold text-[#E67E22] mb-4">選擇計劃及帳戶</h2>
        
        {/* 說明文字 */}
        <p className="text-[15px] text-gray-700 mb-4 leading-relaxed">
          請從下方選項中選擇你想要作出基金轉換／重組投資組合的強積金帳戶，並按「下一步」繼續。
        </p>

        {/* 提醒文字 - 紅色，切勿有底線 */}
        <p className="text-[15px] text-red-600 mb-6 leading-relaxed">
          提提你：強積金屬長線投資，<span className="underline">切勿</span>因短期市場波動而經常轉換基金。
        </p>

        {/* Plan Cards */}
        <div className="space-y-4">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const isClickable = true; // 所有都可以選擇
            
            return (
              <div
                key={plan.id}
                onClick={() => isClickable && handlePlanClick(plan.id)}
                className={`
                  bg-white rounded-2xl p-5 border-2 transition-all cursor-pointer
                  ${isSelected ? 'border-[#E67E22]' : 'border-gray-200'}
                `}
              >
                {/* Logo - 置中 */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img 
                      src={plan.icon} 
                      alt={plan.name}
                      className="w-14 h-14 object-contain"
                    />
                  </div>
                </div>
                
                {/* 計劃名稱 - 置中 */}
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{plan.name}</h3>
                
                {/* 日期同帳戶號碼 - 置中 */}
                <p className="text-base text-gray-500 text-center mb-6">
                  自{plan.date} | 成員帳戶號碼： {plan.accountNumber}
                </p>
                
                {/* 帳戶類別 - 靠左 */}
                <div className="mb-4">
                  <p className="text-base text-gray-500 mb-1">帳戶類別</p>
                  <p className="text-xl text-gray-900">{plan.accountType}</p>
                </div>
                
                {/* 帳戶結餘 - 靠左 */}
                <div className="mb-4">
                  <p className="text-base text-gray-500 mb-1">帳戶結餘（港幣）</p>
                  <p className="text-xl text-gray-900">{formatBalance(plan.balance)}</p>
                </div>
                
                {/* 帳戶詳情 - 靠左 */}
                <div>
                  <button 
                    className="text-base text-gray-900 underline"
                    onClick={(e) => handleOpenModal(e, plan)}
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
          disabled={selectedPlan !== 'aia'}
          className={`
            w-full py-3 rounded-lg text-base font-medium transition-all
            ${selectedPlan === 'aia'
              ? 'bg-[#1e3a5f] text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          下一步
        </button>
      </div>

      <div className="h-20" />

      {/* Account Details Modal */}
      {showModal && modalPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={handleCloseModal}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl w-full max-w-sm p-6">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500"
            >
              <X size={24} />
            </button>
            
            {/* Title */}
            <h2 className="text-xl font-bold text-[#E67E22] text-center mb-6">帳戶詳情</h2>
            
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img 
                src={modalPlan.icon} 
                alt={modalPlan.name}
                className="w-16 h-16 object-contain"
              />
            </div>
            
            {/* Plan Name */}
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{modalPlan.name}</h3>
            
            {/* Date and Account Number */}
            <p className="text-base text-gray-500 text-center mb-6">
              自 {modalPlan.date} | 成員帳戶號碼： {modalPlan.accountNumber}
            </p>
            
            {/* Account Details */}
            <div className="space-y-4">
              {/* 帳戶類別 */}
              <div>
                <p className="text-base text-gray-500 mb-1">帳戶類別</p>
                <p className="text-lg font-medium text-gray-900">{modalPlan.accountType}</p>
              </div>
              
              {/* 強制性供款結餘 */}
              <div>
                <p className="text-base text-gray-500 mb-1">強制性供款結餘（港幣）</p>
                <p className="text-lg font-medium text-gray-900">
                  {formatBalance(modalPlan.mandatoryBalance || 68389.17)}
                </p>
              </div>
              
              {/* 自願性供款結餘 */}
              <div>
                <p className="text-base text-gray-500 mb-1">自願性供款結餘（港幣）</p>
                <p className="text-lg font-medium text-gray-900">
                  {formatBalance(modalPlan.voluntaryBalance || 60007.74)}
                </p>
              </div>
              
              {/* 投資收益 */}
              <div>
                <p className="text-base text-gray-500 mb-1">投資收益（虧損）（港幣）</p>
                <p className="text-lg font-medium text-gray-900">
                  {formatBalance(modalPlan.gain || 122309.07)}
                </p>
              </div>
              
              {/* 帳戶結餘 */}
              <div>
                <p className="text-base text-gray-500 mb-1">帳戶結餘（港幣）</p>
                <p className="text-lg font-medium text-gray-900">{formatBalance(modalPlan.balance)}</p>
              </div>
            </div>
            
            {/* Date */}
            <p className="text-sm text-gray-400 text-right mt-4">截至 05/03/2026</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectPlanPage;