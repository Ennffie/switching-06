import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ExternalLink } from 'lucide-react';

interface Fund {
  id: string;
  name: string;
  balance: number;
  allocation: number;
}

type TabType = 'out' | 'in';
type ContributionType = 'mandatory' | 'voluntary';

const FundTransferPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('out');
  const [contributionType, setContributionType] = useState<ContributionType>('mandatory');
  const [isPortfolioRebalancing, setIsPortfolioRebalancing] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);
  const [activeFundId, setActiveFundId] = useState<string | null>(null);
  const [keypadValue, setKeypadValue] = useState('');

  // Transfer Out Funds with balance
  const [transferOutFunds, setTransferOutFunds] = useState<Fund[]>([
    { id: 'out1', name: '預設投資策略', balance: 48246.84, allocation: 0 },
    { id: 'out2', name: '宏利MPF保守基金', balance: 0, allocation: 0 },
    { id: 'out3', name: '宏利MPF利息基金', balance: 0, allocation: 0 },
    { id: 'out4', name: '宏利MPF香港債券基金', balance: 0, allocation: 0 },
    { id: 'out5', name: '宏利MPF環球債券基金', balance: 0, allocation: 0 },
  ]);

  // Transfer In Funds
  const [transferInFunds, setTransferInFunds] = useState<Fund[]>([
    { id: 'in1', name: '預設投資策略', balance: 0, allocation: 0 },
    { id: 'in2', name: '宏利MPF保守基金', balance: 0, allocation: 0 },
    { id: 'in3', name: '宏利MPF利息基金', balance: 0, allocation: 0 },
    { id: 'in4', name: '宏利MPF香港債券基金', balance: 0, allocation: 0 },
    { id: 'in5', name: '宏利MPF環球債券基金', balance: 0, allocation: 0 },
    { id: 'in6', name: '宏利MPF亞洲債券基金', balance: 0, allocation: 0 },
    { id: 'in7', name: '宏利MPF亞太股票基金', balance: 0, allocation: 0 },
  ]);

  // Calculate total allocation based on active tab
  const totalAllocation = useMemo(() => {
    const funds = activeTab === 'out' ? transferOutFunds : transferInFunds;
    return funds.reduce((sum, fund) => sum + fund.allocation, 0);
  }, [activeTab, transferOutFunds, transferInFunds]);

  const formatBalance = (balance: number) => {
    return `$ ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Handle portfolio rebalancing toggle
  const handleRebalancingToggle = () => {
    const newValue = !isPortfolioRebalancing;
    setIsPortfolioRebalancing(newValue);
    
    if (newValue) {
      // When enabled, set all funds to 100% and lock
      setTransferOutFunds(prev => prev.map(fund => ({ ...fund, allocation: 100 })));
    } else {
      // When disabled, reset to 0
      setTransferOutFunds(prev => prev.map(fund => ({ ...fund, allocation: 0 })));
    }
  };

  const openKeypad = (fundId: string, currentValue: number) => {
    // Don't allow editing if portfolio rebalancing is on (for transfer out)
    if (activeTab === 'out' && isPortfolioRebalancing) return;
    
    setActiveFundId(fundId);
    setKeypadValue(currentValue > 0 ? currentValue.toString() : '');
    setShowKeypad(true);
  };

  const closeKeypad = () => {
    setShowKeypad(false);
    setActiveFundId(null);
    setKeypadValue('');
  };

  const handleKeypadInput = (key: string) => {
    if (key === 'delete') {
      setKeypadValue(prev => prev.slice(0, -1));
    } else if (key === '.') {
      if (!keypadValue.includes('.')) {
        setKeypadValue(prev => prev + key);
      }
    } else if (key === 'done') {
      saveKeypadValue();
    } else {
      // Number keys
      if (keypadValue.length < 5) {
        setKeypadValue(prev => prev + key);
      }
    }
  };

  const saveKeypadValue = () => {
    const numValue = keypadValue === '' ? 0 : parseFloat(keypadValue);
    if (activeFundId) {
      if (activeTab === 'out') {
        setTransferOutFunds(prev => prev.map(fund => 
          fund.id === activeFundId ? { ...fund, allocation: numValue } : fund
        ));
      } else {
        setTransferInFunds(prev => prev.map(fund => 
          fund.id === activeFundId ? { ...fund, allocation: numValue } : fund
        ));
      }
    }
    closeKeypad();
  };

  const handleNextStep = () => {
    navigate('/invest/confirm');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center border-b border-gray-200">
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
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-center">
          {/* Step 1 - Completed */}
          <div className="flex items-center">
            <div className="w-7 h-7 rounded-full bg-[#e87722] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          {/* Line */}
          <div className="w-12 h-0.5 bg-[#e87722] mx-1" />
          
          {/* Step 2 - Active */}
          <div className="flex items-center">
            <div className="w-7 h-7 rounded-full bg-[#e87722] flex items-center justify-center text-white text-sm font-medium">
              2
            </div>
          </div>
          
          {/* Line */}
          <div className="w-12 h-0.5 bg-gray-300 mx-1" />
          
          {/* Step 3 - Pending */}
          <div className="flex items-center">
            <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-sm font-medium">
              3
            </div>
          </div>
        </div>
      </div>

      {/* Main Title */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">基金轉換指示</h2>
      </div>

      {/* Contribution Type Toggle */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex bg-gray-200 rounded-full p-1">
          <button 
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
              contributionType === 'mandatory' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500'
            }`}
            onClick={() => setContributionType('mandatory')}
          >
            強制性供款
          </button>
          <button 
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
              contributionType === 'voluntary' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500'
            }`}
            onClick={() => setContributionType('voluntary')}
          >
            自願性供款
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-4 border-b border-gray-200">
        <div className="flex">
          <button
            className={`flex-1 py-3 text-base font-medium relative ${
              activeTab === 'out' ? 'text-[#e87722]' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('out')}
          >
            轉出
            {activeTab === 'out' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e87722]" />
            )}
          </button>
          <button
            className={`flex-1 py-3 text-base font-medium relative ${
              activeTab === 'in' ? 'text-[#e87722]' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('in')}
          >
            轉入
            {activeTab === 'in' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e87722]" />
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'out' ? (
          /* Transfer Out Content */
          <div className="p-4 space-y-3">
            {/* Portfolio Rebalancing Toggle */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between">
              <span className="text-base text-gray-700">重組投資組合</span>
              <button
                onClick={handleRebalancingToggle}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  isPortfolioRebalancing ? 'bg-[#1e3a5f]' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${
                  isPortfolioRebalancing ? 'left-6' : 'left-0.5'
                }`} />
              </button>
            </div>

            {/* Fund Cards */}
            {transferOutFunds.map((fund) => (
              <div key={fund.id} className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-start justify-between">
                  {/* Left: Fund Info */}
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-medium text-gray-900">{fund.name}</h3>
                      <ExternalLink size={16} className="text-gray-400 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-gray-400">
                      基金結餘：{formatBalance(fund.balance)}
                    </p>
                  </div>
                  
                  {/* Right: Allocation Input */}
                  <div 
                    className={`flex items-center gap-1 ${
                      isPortfolioRebalancing ? 'opacity-50' : 'cursor-pointer'
                    }`}
                    onClick={() => openKeypad(fund.id, fund.allocation)}
                  >
                    <div className={`h-9 min-w-[48px] px-2 flex items-center justify-center bg-gray-100 rounded text-base font-medium text-gray-900 ${
                      isPortfolioRebalancing ? '' : 'hover:bg-gray-200'
                    }`}>
                      {fund.allocation > 0 ? fund.allocation : ''}
                    </div>
                    <span className="text-gray-500 text-sm">%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Transfer In Content */
          <div className="p-4 space-y-3">
            {/* Fund Cards */}
            {transferInFunds.map((fund) => (
              <div key={fund.id} className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-start justify-between">
                  {/* Left: Fund Info */}
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-medium text-gray-900">{fund.name}</h3>
                      <ExternalLink size={16} className="text-gray-400 flex-shrink-0" />
                    </div>
                  </div>
                  
                  {/* Right: Allocation Input */}
                  <div 
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => openKeypad(fund.id, fund.allocation)}
                  >
                    <div className="h-9 min-w-[48px] px-2 flex items-center justify-center bg-gray-100 rounded text-base font-medium text-gray-900 hover:bg-gray-200 transition-colors">
                      {fund.allocation > 0 ? fund.allocation : ''}
                    </div>
                    <span className="text-gray-500 text-sm">%</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Notes */}
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 leading-relaxed">
                轉出及轉入指示將會以百分比分配，系統會自動將您現有帳戶結餘以您選擇之百分比分配轉移至指定基金。
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-4 safe-area-bottom">
        <div className="flex items-center justify-between mb-4">
          <span className="text-base text-gray-700">總和：</span>
          <span className={`text-2xl font-bold ${totalAllocation === 100 ? 'text-gray-900' : 'text-[#e87722]'}`}>
            {totalAllocation}%
          </span>
        </div>
        
        <button 
          onClick={handleNextStep}
          disabled={totalAllocation !== 100}
          className={`w-full py-4 rounded-full text-lg font-medium transition-all ${
            totalAllocation === 100
              ? 'bg-[#1e3a5f] text-white active:scale-[0.98]' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          下一步
        </button>
        
        <button className="w-full py-3 text-gray-400 text-base mt-2 hover:text-gray-600 transition-colors">
          新增指示
        </button>
      </div>

      {/* Number Keypad Modal */}
      {showKeypad && (
        <div className="fixed inset-0 z-50 flex items-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={closeKeypad}
          />
          
          {/* Keypad */}
          <div className="relative bg-white w-full rounded-t-2xl shadow-2xl">
            {/* Display */}
            <div className="px-4 py-4 text-center border-b border-gray-200">
              <span className="text-4xl font-medium text-gray-900">{keypadValue || '0'}%</span>
            </div>
            
            {/* Keypad Grid */}
            <div className="grid grid-cols-3">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'delete'].map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeypadInput(key)}
                  className="py-4 text-2xl font-medium text-gray-900 border-r border-b border-gray-200 last:border-r-0 active:bg-gray-100 transition-colors"
                >
                  {key === 'delete' ? (
                    <span className="text-base text-gray-500">刪除</span>
                  ) : key === '.' ? (
                    <span className="text-2xl">.</span>
                  ) : (
                    key
                  )}
                </button>
              ))}
            </div>
            
            {/* Done Button */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => handleKeypadInput('done')}
                className="w-full py-4 bg-[#1e3a5f] text-white text-lg font-medium rounded-full active:scale-[0.98] transition-transform"
              >
                完成
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundTransferPage;
