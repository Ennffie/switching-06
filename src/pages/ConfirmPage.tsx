import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronUp, ChevronDown, Pencil } from 'lucide-react';
import { useTransfer } from '../context/TransferContext';

const ConfirmPage = () => {
  const navigate = useNavigate();
  const { transferData } = useTransfer();
  const [expandedSections, setExpandedSections] = useState({
    step1: true,
    transferOut: true,
    transferIn: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const formatCurrency = (amount: number) => {
    return `$ ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // 使用 Context 中的数据，如果没有则使用默认值
  const step1Data = transferData.step1 || {
    planName: '友邦強積金優選計劃',
    trustee: '友邦(信託)有限',
    accountNumber: '56442131',
    accountType: '一般僱員',
    balance: 122309.07,
    employerName: 'Taxable VC (Not Applicable)',
    icon: './icons/aia-logo-new.jpg',
  };

  const transferOutData = transferData.transferOut.length > 0 ? transferData.transferOut : [
    { title: '僱主強制性供款（港幣）', funds: [{ name: '保證組合', percentage: 10 }, { name: '環球債券基金', percentage: 10 }, { name: '全球基金', percentage: 10 }] },
    { title: '僱主自願性供款（港幣）', funds: [{ name: '保證組合', percentage: 20 }] },
    { title: '僱員強制性供款', funds: [{ name: '環球債券基金', percentage: 20 }] },
    { title: '僱員自願性供款', funds: [{ name: '全球基金', percentage: 20 }] },
  ];

  const transferInData = transferData.transferIn.length > 0 ? transferData.transferIn : [
    { title: '僱主強制性供款（港幣）', funds: [{ name: '亞洲債券基金', percentage: 50 }, { name: '中港基金', percentage: 50 }] },
    { title: '僱主自願性供款（港幣）', funds: [{ name: '亞歐基金', percentage: 50 }, { name: '北美股票基金', percentage: 50 }] },
    { title: '僱員強制性供款', funds: [{ name: '亞洲股票基金', percentage: 50 }, { name: '友邦強積金優選計劃-退休收益基金', percentage: 50 }] },
    { title: '僱員自願性供款', funds: [{ name: '65歲後基金', percentage: 50 }, { name: '亞洲股票基金', percentage: 50 }] },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      {/* Sticky Header + Step Bar */}
      <div className="sticky top-0 z-50 bg-white">
        {/* Header */}
        <div className="px-4 py-3 flex items-center border-b border-gray-200">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="flex-1 text-center text-base font-medium text-gray-900">
            現有帳戶結餘的投資
          </h1>
          <div className="w-10" />
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-center">
            {/* Step 1 - Completed */}
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full bg-[#E67E22] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <div className="w-12 h-0.5 bg-[#E67E22] mx-1" />
            
            {/* Step 2 - Completed */}
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full bg-[#E67E22] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <div className="w-12 h-0.5 bg-[#E67E22] mx-1" />
            
            {/* Step 3 - Active */}
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full bg-[#E67E22] flex items-center justify-center text-white text-sm font-medium">
                3
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-[#E67E22]">確認</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Step 1: 選擇計劃及帳戶 */}
        <div className="bg-white mb-3">
          <button 
            onClick={() => toggleSection('step1')}
            className="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100"
          >
            <h3 className="text-base font-medium text-gray-900">第1步：選擇計劃及帳戶</h3>
            {expandedSections.step1 ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
          </button>
          
          {expandedSections.step1 && (
            <div className="px-4 py-4">
              {/* 帳戶詳情 */}
              <div className="mb-4">
                <h4 className="text-sm text-gray-500 mb-3">帳戶詳情</h4>
                
                <div className="flex items-start gap-3 mb-4">
                  <img 
                    src={step1Data.icon || './icons/aia-logo-new.jpg'} 
                    alt={step1Data.planName}
                    className="w-12 h-12 object-contain flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h5 className="text-base font-medium text-gray-900">{step1Data.planName}</h5>
                    <p className="text-sm text-gray-500">{step1Data.trustee} | 成員帳戶號碼：{step1Data.accountNumber}</p>
                    <p className="text-sm text-gray-500">帳戶類別: {step1Data.accountType}</p>
                    <p className="text-base font-medium text-gray-900 mt-1">帳戶結餘（港幣）{formatCurrency(step1Data.balance)}</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <p className="text-sm text-gray-500">僱主名稱</p>
                  <p className="text-sm text-gray-900">{step1Data.employerName}</p>
                </div>
              </div>

              {/* 編輯按鈕 */}
              <button 
                onClick={() => navigate('/invest/select-plan')}
                className="flex items-center justify-center gap-2 w-full py-3 text-gray-600"
              >
                <Pencil size={18} />
                <span>編輯</span>
              </button>
            </div>
          )}
        </div>

        {/* Step 2: 基金轉換指示 */}
        <div className="bg-white">
          <div className="px-4 py-4 border-b border-gray-100">
            <h3 className="text-base font-medium text-gray-900">第2步：基金轉換指示</h3>
          </div>

          {/* 轉出 */}
          <div className="border-b border-gray-100">
            <button 
              onClick={() => toggleSection('transferOut')}
              className="w-full px-4 py-4 flex items-center justify-between"
            >
              <h4 className="text-base font-medium text-gray-900">基金轉換指示 1</h4>
              {expandedSections.transferOut ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
            </button>
            
            {expandedSections.transferOut && (
              <div className="px-4 pb-4">
                <h5 className="text-base font-medium text-gray-900 mb-3">轉出</h5>
                
                {transferOutData.map((section, index) => (
                  <div key={index} className="mb-4">
                    <h6 className="text-sm text-gray-600 mb-2">{section.title}</h6>
                    {section.funds.map((fund, fundIndex) => (
                      <div key={fundIndex} className="flex justify-between py-2">
                        <span className="text-sm text-gray-900">{fund.name}</span>
                        <span className="text-sm text-gray-900">{fund.percentage}%</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 轉入 */}
          <div className="border-b border-gray-100">
            <button 
              onClick={() => toggleSection('transferIn')}
              className="w-full px-4 py-4 flex items-center justify-between"
            >
              <span className="text-base font-medium text-gray-900">轉入</span>
              {expandedSections.transferIn ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
            </button>
            
            {expandedSections.transferIn && (
              <div className="px-4 pb-4">
                {transferInData.map((section, index) => (
                  <div key={index} className="mb-4">
                    <h6 className="text-sm text-gray-600 mb-2">{section.title}</h6>
                    {section.funds.map((fund, fundIndex) => (
                      <div key={fundIndex} className="flex justify-between py-2">
                        <span className="text-sm text-gray-900">{fund.name}</span>
                        <span className="text-sm text-gray-900">{fund.percentage}%</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Step 2 編輯按鈕 */}
          <div className="px-4 py-4">
            <button 
              onClick={() => navigate('/invest/fund-transfer')}
              className="flex items-center justify-center gap-2 w-full py-3 text-gray-600"
            >
              <Pencil size={18} />
              <span>編輯</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 z-40">
        <button 
          onClick={() => {
            // 提交邏輯
            alert('提交成功！');
            navigate('/invest/success');
          }}
          className="w-full py-4 bg-[#1e3a5f] text-white rounded-full text-lg font-medium active:scale-[0.98] transition-transform"
        >
          提交
        </button>
      </div>
    </div>
  );
};

export default ConfirmPage;