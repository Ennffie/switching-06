import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ExternalLink, Info } from 'lucide-react';
import { useTransfer } from '../context/TransferContext';
import StepBar from '../components/StepBar';

interface Fund {
  id: string;
  name: string;
  balance: number;
  allocation: number;
  riskLevel: number;
  disabled?: boolean;
  description?: string;
}

type TabType = 'out' | 'in';
type ContributionType = 'mandatory' | 'voluntary';

// 風險級別顏色
const riskColors: Record<number, string> = {
  1: 'bg-blue-500',
  2: 'bg-cyan-500',
  3: 'bg-teal-500',
  4: 'bg-green-500',
  5: 'bg-yellow-500',
  6: 'bg-orange-500',
  7: 'bg-red-500',
};

// 完整基金列表（轉入）
const fullInFunds: Fund[] = [
  { id: 'in1', name: '預設投資策略', balance: 0, allocation: 0, riskLevel: 4 },
  { id: 'in2', name: '友邦強積金優選計劃 - 保證組合', balance: 0, allocation: 0, riskLevel: 1 },
  { id: 'in3', name: '友邦強積金優選計劃 - 強積金保守基金', balance: 0, allocation: 0, riskLevel: 1 },
  { id: 'in4', name: '友邦強積金優選計劃 - 65歲後基金', balance: 0, allocation: 0, riskLevel: 3, description: '當65歲後基金或核心累積基金作為獨立投資選項，預設投資策略的風險降低機制並不適用' },
  { id: 'in5', name: '友邦強積金優選計劃 - 亞洲債券基金', balance: 0, allocation: 0, riskLevel: 3 },
  { id: 'in6', name: '友邦強積金優選計劃 - 均衡組合', balance: 0, allocation: 0, riskLevel: 4 },
  { id: 'in7', name: '友邦強積金優選計劃 - 穩定資本組合', balance: 0, allocation: 0, riskLevel: 4 },
  { id: 'in8', name: '友邦強積金優選計劃 - 環球債券基金', balance: 0, allocation: 0, riskLevel: 4 },
  { id: 'in9', name: '友邦強積金優選計劃 - 中港動態資產配置基金', balance: 0, allocation: 0, riskLevel: 5 },
  { id: 'in10', name: '友邦強積金優選計劃 - 核心累積基金', balance: 0, allocation: 0, riskLevel: 5, description: '當65歲後基金或核心累積基金作為獨立投資選項，預設投資策略的風險降低機制並不適用' },
  { id: 'in11', name: '友邦強積金優選計劃 - 增長組合', balance: 0, allocation: 0, riskLevel: 5 },
  { id: 'in12', name: '友邦強積金優選計劃 - 基金經理精選退休基金', balance: 0, allocation: 0, riskLevel: 5 },
  { id: 'in13', name: '友邦強積金優選計劃 - 美洲基金', balance: 0, allocation: 0, riskLevel: 6 },
  { id: 'in14', name: '友邦強積金優選計劃 - 亞洲股票基金', balance: 0, allocation: 0, riskLevel: 6 },
  { id: 'in15', name: '友邦強積金優選計劃 - 亞歐基金', balance: 0, allocation: 0, riskLevel: 6 },
  { id: 'in16', name: '友邦強積金優選計劃 - 歐洲股票基金', balance: 0, allocation: 0, riskLevel: 6 },
  { id: 'in17', name: '友邦強積金優選計劃 - 大中華股票基金', balance: 0, allocation: 0, riskLevel: 6 },
  { id: 'in18', name: '友邦強積金優選計劃 - 綠色退休基金', balance: 0, allocation: 0, riskLevel: 6 },
  { id: 'in19', name: '友邦強積金優選計劃 - 中港基金', balance: 0, allocation: 0, riskLevel: 6 },
  { id: 'in20', name: '友邦強積金優選計劃 - 北美股票基金', balance: 0, allocation: 0, riskLevel: 6 },
  { id: 'in21', name: '友邦強積金優選計劃 - 全球基金', balance: 0, allocation: 0, riskLevel: 6 },
  { id: 'in22', name: '友邦強積金優選計劃 - 富達穩定資本基金', balance: 0, allocation: 0, riskLevel: 4 },
  { id: 'in23', name: '友邦強積金優選計劃 - 富達穩定增長基金', balance: 0, allocation: 0, riskLevel: 4 },
  { id: 'in24', name: '友邦強積金優選計劃 - 富達增長基金', balance: 0, allocation: 0, riskLevel: 5 },
  { id: 'in25', name: '友邦強積金優選計劃 - 退休收益基金', balance: 0, allocation: 0, riskLevel: 1, disabled: true },
];

// 轉出基金列表（強制性供款版本 - 總數 $128,396.91）
const fullOutFundsMandatory: Fund[] = [
  { id: 'out1', name: '友邦強積金優選計劃 - 美洲基金', balance: 32150.50, allocation: 0, riskLevel: 6 },
  { id: 'out2', name: '友邦強積金優選計劃 - 北美股票基金', balance: 31980.25, allocation: 0, riskLevel: 6 },
  { id: 'out3', name: '友邦強積金優選計劃 - 增長組合', balance: 32245.80, allocation: 0, riskLevel: 5 },
  { id: 'out4', name: '友邦強積金優選計劃 - 均衡組合', balance: 32020.36, allocation: 0, riskLevel: 4 },
];

// 轉出基金列表（自願性供款版本 - 總數約 $85,597.94）
const fullOutFundsVoluntary: Fund[] = [
  { id: 'out1', name: '友邦強積金優選計劃 - 美洲基金', balance: 21433.67, allocation: 0, riskLevel: 6 },
  { id: 'out2', name: '友邦強積金優選計劃 - 北美股票基金', balance: 21320.17, allocation: 0, riskLevel: 6 },
  { id: 'out3', name: '友邦強積金優選計劃 - 增長組合', balance: 21497.20, allocation: 0, riskLevel: 5 },
  { id: 'out4', name: '友邦強積金優選計劃 - 均衡組合', balance: 21346.90, allocation: 0, riskLevel: 4 },
];

// 從 Context 數據填充基金列表
const fillFundsFromContext = (
  baseFunds: Fund[],
  contextData: { title: string; funds: { name: string; percentage: number }[] }[]
): Fund[] => {
  if (!contextData || contextData.length === 0) return baseFunds;
  
  const allAllocatedFunds = contextData.flatMap(section => section.funds);
  
  return baseFunds.map(fund => {
    const allocated = allAllocatedFunds.find(f => f.name === fund.name);
    return {
      ...fund,
      allocation: allocated ? allocated.percentage : 0,
    };
  });
};

const FundTransferPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { transferData, setTransferOutData, setTransferInData } = useTransfer();
  const [activeTab, setActiveTab] = useState<TabType>('out');
  const [contributionType, setContributionType] = useState<ContributionType>('mandatory');
  const [rebalanceEnabledMandatory, setRebalanceEnabledMandatory] = useState(false);
  const [rebalanceEnabledVoluntary, setRebalanceEnabledVoluntary] = useState(false);
  // 用嚟追蹤係用戶手動撳 Toggle，定係系統內部觸發
  const [rebalanceToggleSource, setRebalanceToggleSource] = useState<'user' | 'system'>('system');
  const [showKeypad, setShowKeypad] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortField, setSortField] = useState<'name' | 'risk' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showNotice, setShowNotice] = useState(false);
  const [activeFundId, setActiveFundId] = useState<string | null>(null);
  const [keypadValue, setKeypadValue] = useState('');

  // === 強制性供款基金（從 Context 初始化） ===
  const [mandatoryOutFunds, setMandatoryOutFunds] = useState<Fund[]>(() =>
    fillFundsFromContext(fullOutFundsMandatory, transferData.transferOut)
  );
  const [mandatoryInFunds, setMandatoryInFunds] = useState<Fund[]>(() =>
    fillFundsFromContext(fullInFunds, transferData.transferIn)
  );

  // === 自願性供款基金（從 Context 初始化） ===
  const [voluntaryOutFunds, setVoluntaryOutFunds] = useState<Fund[]>(() =>
    fillFundsFromContext(fullOutFundsVoluntary, transferData.transferOut)
  );
  const [voluntaryInFunds, setVoluntaryInFunds] = useState<Fund[]>(() =>
    fillFundsFromContext(fullInFunds, transferData.transferIn)
  );

  // === 計算各組總和 ===
  const mandatoryOutTotal = useMemo(() => 
    mandatoryOutFunds.reduce((sum, fund) => sum + fund.allocation, 0),
    [mandatoryOutFunds]
  );
  
  const mandatoryInTotal = useMemo(() => 
    mandatoryInFunds.reduce((sum, fund) => sum + fund.allocation, 0),
    [mandatoryInFunds]
  );
  
  const voluntaryOutTotal = useMemo(() => 
    voluntaryOutFunds.reduce((sum, fund) => sum + fund.allocation, 0),
    [voluntaryOutFunds]
  );
  
  const voluntaryInTotal = useMemo(() => 
    voluntaryInFunds.reduce((sum, fund) => sum + fund.allocation, 0),
    [voluntaryInFunds]
  );

  // === 重組投資組合 Toggle 效果（只係用戶手動撳先會觸發） ===
  useEffect(() => {
    if (activeTab !== 'out') return; // 只在轉出頁面生效
    if (rebalanceToggleSource !== 'user') return; // 只係用戶手動撳先會改

    const isMandatory = contributionType === 'mandatory';
    const isEnabled = isMandatory ? rebalanceEnabledMandatory : rebalanceEnabledVoluntary;

    if (isEnabled) {
      // 開啟：所有基金變 100%
      if (isMandatory) {
        setMandatoryOutFunds(prev => prev.map(f => ({ ...f, allocation: 100 })));
      } else {
        setVoluntaryOutFunds(prev => prev.map(f => ({ ...f, allocation: 100 })));
      }
    } else {
      // 關閉：所有基金變 0%
      if (isMandatory) {
        setMandatoryOutFunds(prev => prev.map(f => ({ ...f, allocation: 0 })));
      } else {
        setVoluntaryOutFunds(prev => prev.map(f => ({ ...f, allocation: 0 })));
      }
    }
    // 執行完重置為 system，避免重複觸發
    setRebalanceToggleSource('system');
  }, [rebalanceEnabledMandatory, rebalanceEnabledVoluntary, contributionType, activeTab, rebalanceToggleSource]);

  // === 下一步啟用條件 ===
  const isNextEnabled = useMemo(() => {
    const mandatoryHasOut = mandatoryOutTotal > 0;
    const mandatoryHasIn = mandatoryInTotal > 0;
    const mandatoryInValid = mandatoryInTotal === 100;
    
    const voluntaryHasOut = voluntaryOutTotal > 0;
    const voluntaryHasIn = voluntaryInTotal > 0;
    const voluntaryInValid = voluntaryInTotal === 100;
    
    // 情況1: 轉出無輸入，轉入有數目 → 唔滿足
    if (!mandatoryHasOut && mandatoryHasIn) return false;
    if (!voluntaryHasOut && voluntaryHasIn) return false;
    
    // 情況2: 轉出有輸入，轉入必須係100%
    const mandatoryCondition = mandatoryHasOut ? mandatoryInValid : true;
    const voluntaryCondition = voluntaryHasOut ? voluntaryInValid : true;
    
    // 兩個條件都要滿足
    const allValid = mandatoryCondition && voluntaryCondition;
    
    // 至少要有一邊有轉出輸入
    const hasAnyTransfer = mandatoryHasOut || voluntaryHasOut;
    
    return hasAnyTransfer && allValid;
  }, [mandatoryOutTotal, mandatoryInTotal, voluntaryOutTotal, voluntaryInTotal]);

  // === 當前顯示嘅基金列表（加入排序）===
  const currentFunds = useMemo(() => {
    let funds: Fund[];
    if (contributionType === 'mandatory') {
      funds = activeTab === 'out' ? [...mandatoryOutFunds] : [...mandatoryInFunds];
    } else {
      funds = activeTab === 'out' ? [...voluntaryOutFunds] : [...voluntaryInFunds];
    }
    
    // 排序邏輯（「預設投資策略」永遠第一位，其他跟排序）
    if (sortField) {
      // 搵出「預設投資策略」
      const defaultFund = funds.find(f => f.name.includes('預設投資策略'));
      // 其他基金
      let otherFunds = funds.filter(f => !f.name.includes('預設投資策略'));
      
      // 其他基金排序
      otherFunds.sort((a, b) => {
        if (sortField === 'name') {
          return sortDirection === 'asc' 
            ? a.name.localeCompare(b.name, 'zh-HK')
            : b.name.localeCompare(a.name, 'zh-HK');
        } else {
          return sortDirection === 'asc'
            ? a.riskLevel - b.riskLevel
            : b.riskLevel - a.riskLevel;
        }
      });
      
      // 組合：預設投資策略放第一位，其他跟排序
      funds = defaultFund ? [defaultFund, ...otherFunds] : otherFunds;
    }
    
    return funds;
  }, [contributionType, activeTab, mandatoryOutFunds, mandatoryInFunds, voluntaryOutFunds, voluntaryInFunds, sortField, sortDirection]);

  // === 當前總和 ===
  const displayTotal = useMemo(() => {
    if (activeTab === 'out') {
      return contributionType === 'mandatory' ? mandatoryOutTotal : voluntaryOutTotal;
    } else {
      return contributionType === 'mandatory' ? mandatoryInTotal : voluntaryInTotal;
    }
  }, [activeTab, contributionType, mandatoryOutTotal, voluntaryOutTotal, mandatoryInTotal, voluntaryInTotal]);

  const openKeypad = (fundId: string, currentValue: number, disabled?: boolean) => {
    if (disabled) return;
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
      if (keypadValue.length < 5) {
        if (keypadValue === '0') {
          setKeypadValue(key);
        } else {
          setKeypadValue(prev => prev + key);
        }
      }
    }
  };

  const saveKeypadValue = () => {
    const numValue = keypadValue === '' ? 0 : parseFloat(keypadValue);
    if (activeFundId) {
      if (contributionType === 'mandatory') {
        if (activeTab === 'out') {
          setMandatoryOutFunds(prev => prev.map(fund => 
            fund.id === activeFundId ? { ...fund, allocation: numValue } : fund
          ));
        } else {
          setMandatoryInFunds(prev => prev.map(fund => 
            fund.id === activeFundId ? { ...fund, allocation: numValue } : fund
          ));
        }
      } else {
        if (activeTab === 'out') {
          setVoluntaryOutFunds(prev => prev.map(fund => 
            fund.id === activeFundId ? { ...fund, allocation: numValue } : fund
          ));
        } else {
          setVoluntaryInFunds(prev => prev.map(fund => 
            fund.id === activeFundId ? { ...fund, allocation: numValue } : fund
          ));
        }
      }
    }
    closeKeypad();
  };

  const handleNextStep = () => {
    // 儲存轉出數據
    const outData = [
      {
        title: '僱員強制性供款（港幣）',
        funds: mandatoryOutFunds.filter(f => f.allocation > 0).map(f => ({ name: f.name, percentage: f.allocation })),
      },
      {
        title: '僱員自願性供款（港幣）',
        funds: voluntaryOutFunds.filter(f => f.allocation > 0).map(f => ({ name: f.name, percentage: f.allocation })),
      },
    ].filter(section => section.funds.length > 0);
    
    // 儲存轉入數據
    const inData = [
      {
        title: '僱員強制性供款（港幣）',
        funds: mandatoryInFunds.filter(f => f.allocation > 0).map(f => ({ name: f.name, percentage: f.allocation })),
      },
      {
        title: '僱員自願性供款（港幣）',
        funds: voluntaryInFunds.filter(f => f.allocation > 0).map(f => ({ name: f.name, percentage: f.allocation })),
      },
    ].filter(section => section.funds.length > 0);
    
    setTransferOutData(outData);
    setTransferInData(inData);
    
    navigate('/invest/confirm');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      {/* Sticky Header + Step Bar Container */}
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

        {/* Step Bar */}
        <StepBar currentStep={2} />
      </div>

      {/* Date */}
      {/* 標題 - 橙色 */}
      <div className="bg-white px-4 py-3">
        <h2 className="text-[22px] font-bold text-[#E67E22]">基金轉換指示</h2>
      </div>

      {/* Tabs - 轉出/轉入 */}
      <div className="bg-white px-4 border-b border-gray-200">
        <div className="flex">
          <button
            className={`flex-1 py-3 text-base font-medium relative ${
              activeTab === 'out' ? 'text-[#E67E22]' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('out')}
          >
            轉出
            {activeTab === 'out' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E67E22]" />
            )}
          </button>
          <button
            className={`flex-1 py-3 text-base font-medium relative ${
              activeTab === 'in' ? 'text-[#E67E22]' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('in')}
          >
            轉入
            {activeTab === 'in' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E67E22]" />
            )}
          </button>
        </div>
      </div>

      {/* Contribution Type Toggle - 簡化版 */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex bg-gray-100 rounded-full p-1">
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

        {/* 重組投資組合 Toggle - 只在轉出顯示 */}
        {activeTab === 'out' && (
          <div className="flex items-center mt-4">
            <button
              onClick={() => {
                setRebalanceToggleSource('user');
                if (contributionType === 'mandatory') {
                  setRebalanceEnabledMandatory(!rebalanceEnabledMandatory);
                } else {
                  setRebalanceEnabledVoluntary(!rebalanceEnabledVoluntary);
                }
              }}
              className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${
                (contributionType === 'mandatory' ? rebalanceEnabledMandatory : rebalanceEnabledVoluntary) ? 'bg-[#E67E22]' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                (contributionType === 'mandatory' ? rebalanceEnabledMandatory : rebalanceEnabledVoluntary) ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
            <span className="text-base text-gray-900 ml-3">重組投資組合</span>
          </div>
        )}
      </div>

      {/* Sort and Reset - 只在轉入顯示 */}
      {activeTab === 'in' && (
        <div className="bg-white px-4 py-2 border-b border-gray-200 flex justify-between items-center">
          <button 
            className="p-2 text-gray-600"
            onClick={() => setShowSortModal(true)}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
          <button 
            className="flex items-center text-gray-600 text-base"
            onClick={() => {
              // 重設所有基金分配為0
              setMandatoryInFunds(prev => prev.map(f => ({ ...f, allocation: 0 })));
              setMandatoryOutFunds(prev => prev.map(f => ({ ...f, allocation: 0 })));
              setVoluntaryInFunds(prev => prev.map(f => ({ ...f, allocation: 0 })));
              setVoluntaryOutFunds(prev => prev.map(f => ({ ...f, allocation: 0 })));
            }}
          >
            <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            重設
          </button>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {currentFunds.map((fund) => (
            <div 
              key={fund.id} 
              className={`bg-white rounded-xl p-4 border ${
                fund.disabled ? 'border-gray-200 opacity-60' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`text-base font-medium ${
                      fund.disabled ? 'text-gray-400' : 'text-gray-900'
                    }`}>
                      {fund.name}
                    </h3>
                    {!fund.disabled && activeTab === 'out' && (
                      fund.name === '預設投資策略' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/dis-info');
                          }}
                          className="p-1"
                        >
                          <Info size={16} className="text-gray-400 flex-shrink-0" />
                        </button>
                      ) : (
                        <a
                          href="https://www.aia.com.hk/zh-hk/products/mpf/list"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} className="text-gray-400 flex-shrink-0" />
                        </a>
                      )
                    )}
                    {!fund.disabled && activeTab === 'in' && (
                      fund.name === '預設投資策略' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/dis-info');
                          }}
                          className="p-1"
                        >
                          <Info size={16} className="text-gray-400 flex-shrink-0" />
                        </button>
                      ) : (
                        <a
                          href="https://www.aia.com.hk/zh-hk/products/mpf/list"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} className="text-gray-400 flex-shrink-0" />
                        </a>
                      )
                    )}
                  </div>
                  
                  {/* Description */}
                  {fund.description && !fund.disabled && (
                    <p className="text-sm text-gray-500 mt-1 mb-2">{fund.description}</p>
                  )}
                  
                  {/* Risk Level */}
                  {!fund.disabled && activeTab === 'in' && (
                    <div className="flex items-center gap-2">
                      <div className={`w-1 h-4 rounded-full ${riskColors[fund.riskLevel] || 'bg-gray-400'}`} />
                      <span className="text-sm text-gray-500">風險級別 {fund.riskLevel}</span>
                    </div>
                  )}
                  
                  {/* Fund Balance - 只在轉出顯示 */}
                  {!fund.disabled && activeTab === 'out' && (
                    <p className="text-sm text-gray-500 mt-1">
                      基金結餘：$ {fund.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  )}
                  
                  {fund.disabled && (
                    <p className="text-sm text-gray-400 mt-1">不適用</p>
                  )}
                </div>
                
                {/* Allocation Input */}
                <div 
                  className={`flex items-center gap-1 ${
                    fund.disabled ? '' : 'cursor-pointer'
                  }`}
                  onClick={() => openKeypad(fund.id, fund.allocation, fund.disabled)}
                >
                  <div className={`h-10 min-w-[60px] px-3 flex items-center justify-center rounded border text-base font-medium ${
                    fund.disabled 
                      ? 'bg-gray-100 text-gray-400 border-gray-200' 
                      : 'bg-white text-gray-900 border-gray-300 hover:border-gray-400'
                  }`}>
                    {fund.allocation > 0 ? fund.allocation : '0'}
                  </div>
                  <span className={`text-sm ${fund.disabled ? 'text-gray-400' : 'text-gray-500'}`}>%</span>
                </div>
              </div>
            </div>
          ))}

          {/* Notice Content - 直接顯示（根據 Tab 顯示唔同內容） */}
          <div className="mt-6 space-y-3 text-sm text-gray-600">
            <p className="font-medium text-gray-900">注意：</p>
            <p>在做出投資選擇之前，你應先了解不同基金的風險等級並衡量自己的風險承受能力。</p>
            <p>成員必須注意投資市場可能出現顯著的波動，基金單位價格可跌可升。由於處理有關基金轉換投資指示需要一定的時間，因此未必能夠保證達到你預期的結果。在作出投資選擇前，你必須小心衡量個人可承受風險的程度及財政狀況（包括你的退休計劃）。如有任何疑問，請諮詢你的獨立財務顧問了解更多詳情。</p>
            <p>投資比例應為整數（例如50%而非50.5%）。</p>
            <p>轉換合計應等於100%。</p>
            <p>你以往工作期間的強積金供款已計入「僱員強制性供款」及「僱員自願性供款」（如有）。</p>
            <p>請留意，在進行計算時，可能出現小數捨入。</p>
            <p>投資比例應為整數（例如50%而非50.5%）</p>
            <p>轉換合計應等於100%</p>
            <p>你以往工作期間的強積金供款已計入「僱員強制性供款」及「僱員自願性供款」（如有）</p>
            <p>請留意，在進行計算時，可能會發生小數捨入</p>
          </div>

          {/* Spacer - 加多啲空間俾底部固定欄 */}
          <div className="h-48" />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 z-40">
        {activeTab === 'in' && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-base text-gray-700">總和：</span>
            <span className={`text-2xl font-bold ${displayTotal === 100 ? 'text-gray-900' : 'text-[#E67E22]'}`}>
              {displayTotal}%
            </span>
          </div>
        )}
        
        <button 
          onClick={handleNextStep}
          disabled={!isNextEnabled}
          className={`w-full py-4 rounded-full text-lg font-medium transition-all ${
            isNextEnabled
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

      {/* Notice Modal */}
      {showNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowNotice(false)} />
          <div className="relative bg-white w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-xl">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-base font-medium">注意事項</h3>
              <button onClick={() => setShowNotice(false)} className="text-gray-400"><Info size={20} /></button>
            </div>
            <div className="p-4 space-y-3 text-sm text-gray-600">
              <p className="font-medium">注意：</p>
              <p>- 在做出投資選擇之前，你應先了解不同基金的風險等級並衡量自己的風險承受能力。</p>
              <p>- 成員必須注意投資市場可能出現顯著的波動，基金單位價格可跌可升。由於處理有關基金轉換投資指示需要一定的時間，因此未必能夠保證達到你預期的結果。在作出投資選擇前，你必須小心衡量個人可承受風險的程度及財政狀況（包括你的退休計劃）。如有任何疑問，請諮詢你的獨立財務顧問了解更多詳情。</p>
              <p>- 投資比例應為整數（例如50%而非50.5%）。</p>
              <p>- 轉換合計應等於100%。</p>
              <p>- 你以往工作期間的強積金供款已計入「僱員強制性供款」及「僱員自願性供款」（如有）。</p>
              <p>- 請留意，在進行計算時，可能出現小數捨入。</p>
              <p>- 投資比例應為整數（例如50%而非50.5%）</p>
              <p>- 轉換合計應等於100%</p>
              <p>- 你以往工作期間的強積金供款已計入「僱員強制性供款」及「僱員自願性供款」（如有）</p>
              <p>- 請留意，在進行計算時，可能會發生小數捨入</p>
            </div>
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => setShowNotice(false)}
                className="w-full py-3 bg-[#1e3a5f] text-white rounded-lg font-medium"
              >
                明白
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sort Modal */}
      {showSortModal && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowSortModal(false)} />
          <div className="relative bg-white w-full rounded-t-2xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <button 
                className="text-gray-600 text-base"
                onClick={() => {
                  // 重設排序（清除選擇）
                  setSortField(null);
                  setSortDirection('asc');
                }}
              >
                重設
              </button>
              <span className="text-lg font-medium text-gray-900">排序</span>
              <button 
                className="text-gray-600"
                onClick={() => setShowSortModal(false)}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Sort Options */}
            <div className="px-4">
              {/* 基金名稱 */}
              <button
                className="w-full flex items-center justify-between py-4 border-b border-gray-200"
                onClick={() => {
                  if (sortField === 'name') {
                    // 已選中，切換方向
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                  } else {
                    // 未選中，選中並設為升序
                    setSortField('name');
                    setSortDirection('asc');
                  }
                }}
              >
                <span className={`text-base ${sortField === 'name' ? 'text-[#E67E22]' : 'text-gray-900'}`}>
                  基金名稱
                </span>
                {sortField === 'name' && (
                  <svg 
                    className={`w-5 h-5 text-[#E67E22] transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
              </button>
              
              {/* 風險級別 */}
              <button
                className="w-full flex items-center justify-between py-4"
                onClick={() => {
                  if (sortField === 'risk') {
                    // 已選中，切換方向
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                  } else {
                    // 未選中，選中並設為升序
                    setSortField('risk');
                    setSortDirection('asc');
                  }
                }}
              >
                <span className={`text-base ${sortField === 'risk' ? 'text-[#E67E22]' : 'text-gray-900'}`}>
                  風險級別
                </span>
                {sortField === 'risk' && (
                  <svg 
                    className={`w-5 h-5 text-[#E67E22] transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Bottom Safe Area */}
            <div className="h-6" />
          </div>
        </div>
      )}

      {/* Number Keypad Modal */}
      {showKeypad && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/50" onClick={closeKeypad} />
          <div className="relative bg-white w-full rounded-t-2xl shadow-2xl">
            <div className="px-4 py-4 text-center border-b border-gray-200">
              <span className="text-4xl font-medium text-gray-900">{keypadValue || '0'}%</span>
            </div>
            
            <div className="grid grid-cols-3">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'delete'].map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeypadInput(key)}
                  className="py-4 text-2xl font-medium text-gray-900 border-r border-b border-gray-200 last:border-r-0 active:bg-gray-100"
                >
                  {key === 'delete' ? <span className="text-base text-gray-500">刪除</span> : key}
                </button>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => handleKeypadInput('done')}
                className="w-full py-4 bg-[#1e3a5f] text-white text-lg font-medium rounded-full"
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