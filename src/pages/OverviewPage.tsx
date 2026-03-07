import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Bell, LayoutGrid } from 'lucide-react';

const OverviewPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [activeFilter, setActiveFilter] = useState('personal');
  const [showNameStars, setShowNameStars] = useState(false);

  const totalBalance = 285634.43;
  const totalGain = 168225.16;

  const plans = [
    {
      id: '1',
      name: '友邦強積金優選計劃',
      icon: './icons/aia-logo-new.jpg',
      iconColor: 'bg-blue-600',
      gain: 58508.93,
      balance: 128396.91,
      barColor: 'bg-slate-400',
    },
    {
      id: '2',
      name: '宏利環球精選（強積金）計劃',
      icon: './icons/manulife-logo-new.jpg',
      iconColor: 'bg-emerald-500',
      gain: 33109.71,
      balance: 44905.94,
      barColor: 'bg-slate-400',
    },
    {
      id: '3',
      name: '滙豐強積金智選計劃',
      icon: './icons/hsbc-logo.jpg',
      iconColor: 'bg-red-500',
      gain: 60043.27,
      balance: 82622.89,
      barColor: 'bg-slate-400',
    },
  ];

  const formatCurrency = (amount: number) => {
    return `$ ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'my-mpf') {
      navigate('/my-mpf');
    } else if (tabId === 'overview') {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">你好，{showNameStars ? '陳小明' : '陳'}</h1>
            <p className="text-xs text-gray-500 mt-1">積金易號碼：{showNameStars ? '32384311008' : '***84311***'}</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowNameStars(!showNameStars)}
              className="text-gray-600"
            >
              {showNameStars ? <Eye size={22} /> : <EyeOff size={22} />}
            </button>
            <button className="text-gray-600 relative">
              <Bell size={22} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>

      {/* 我的投資組合 */}
      <div className="px-4 pt-2">
        <h2 className="text-lg font-bold text-[#E67E22] mb-4">我的投資組合</h2>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 pb-2 text-base text-center relative ${
              activeFilter === 'all' ? 'text-[#E67E22] font-medium' : 'text-gray-400'
            }`}
          >
            全部
            {activeFilter === 'all' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E67E22]" />
            )}
          </button>
          <button
            onClick={() => setActiveFilter('personal')}
            className={`flex-1 pb-2 text-base text-center relative ${
              activeFilter === 'personal' ? 'text-[#E67E22] font-medium' : 'text-gray-400'
            }`}
          >
            個人帳戶
            {activeFilter === 'personal' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E67E22]" />
            )}
          </button>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="flex flex-col items-center pt-6 pb-4">
        <div className="relative" style={{ width: '260px', height: '260px' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {activeFilter === 'all' ? (
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#7a9db8"
                strokeWidth="14"
              />
            ) : (
              <>
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#7a9db8"
                  strokeWidth="14"
                  strokeDasharray={`${50 * 2.51} ${100 * 2.51}`}
                  strokeLinecap="butt"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="14"
                  strokeDasharray={`${22 * 2.51} ${100 * 2.51}`}
                  strokeDashoffset={-50 * 2.51}
                  strokeLinecap="butt"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="14"
                  strokeDasharray={`${14 * 2.51} ${100 * 2.51}`}
                  strokeDashoffset={-(50 + 22) * 2.51}
                  strokeLinecap="butt"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="14"
                  strokeDasharray={`${14 * 2.51} ${100 * 2.51}`}
                  strokeDashoffset={-(50 + 22 + 14) * 2.51}
                  strokeLinecap="butt"
                />
              </>
            )}
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-sm text-gray-500 mb-1">總結餘</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalBalance)}
            </p>
            <div className="flex items-center text-emerald-500 text-base mt-1">
              <svg className="w-4 h-4 mr-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4l-8 8h5v8h6v-8h5z"/>
              </svg>
              {formatCurrency(totalGain)}
            </div>
          </div>
        </div>
        
        <p className="text-base text-gray-700 mt-4">截至 05/03/2026</p>
      </div>

      {/* 投資收益 */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-base text-gray-700">投資收益（虧損）</span>
          <div className="flex items-center text-emerald-500">
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4l-8 8h5v8h6v-8h5z"/>
            </svg>
            <span className="text-lg font-medium">
              {formatCurrency(totalGain)}
            </span>
          </div>
        </div>
      </div>

      {/* 說明文字 */}
      <div className="px-4 pb-3">
        <p className="text-sm text-gray-500 leading-relaxed">
          自帳戶生效起（每個帳戶的生效日期可能有異，請於每個帳戶中查閱詳情）
        </p>
      </div>

      {/* 分隔線 */}
      <div className="border-t border-gray-200"></div>

      {/* 個人帳戶標題 */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-900">個人帳戶</span>
            <span className="text-lg text-gray-500 ml-2">| 100.00%</span>
          </div>
          <span className="text-lg font-medium text-gray-900">
            {formatCurrency(totalBalance)}
          </span>
        </div>
      </div>

      {/* 計劃列表 */}
      <div className="bg-gray-50 px-4 py-3 space-y-3">
        {plans.map((plan) => (
          <div key={plan.id} className="flex items-center bg-white rounded-lg overflow-hidden shadow-sm">
            <div className={`w-1.5 self-stretch ${plan.barColor}`}></div>
            
            <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 ml-2">
              <div className={`rounded-full bg-white flex items-center justify-center overflow-hidden border border-gray-100 ${plan.name.includes('滙豐') || plan.name.includes('HSBC') ? 'w-11 h-11' : 'w-10 h-10'}`}>
                <img 
                  src={plan.icon} 
                  alt={plan.name}
                  className={`object-contain ${plan.name.includes('滙豐') || plan.name.includes('HSBC') ? 'w-10 h-10' : 'w-9 h-9'}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-9 h-9 ' + plan.iconColor + ' rounded-full flex items-center justify-center text-white text-xs font-bold">' + plan.name[0] + '</div>';
                  }}
                />
              </div>
            </div>
            
            <div className="flex-1 py-3 pr-2">
              <p className="text-base text-gray-900 mb-1">{plan.name}</p>
              <div className="flex items-center text-emerald-500">
                <svg className="w-3 h-3 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4l-8 8h16z"/>
                </svg>
                <span className="text-base">{formatCurrency(plan.gain)}</span>
              </div>
            </div>
            
            <div className="pr-4">
              <p className="text-base font-medium text-gray-900">
                {formatCurrency(plan.balance)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 顯示更多 */}
      <div className="px-4 py-4">
        <button className="w-full text-center text-base text-gray-700 flex items-center justify-center">
          顯示更多
          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* 注意事項 */}
      <div className="px-4 pb-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          注意：如你無法找到已加入積金易平台的強積金計劃的成員帳戶，請致電183 2622向我們聯絡以取得支援。
        </p>
      </div>

      {/* 最新消息 */}
      <div className="px-4 pt-2 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-[#E67E22]">最新消息</h3>
          <button className="text-base text-gray-600">查看全部</button>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div className="flex-shrink-0 w-64 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h4 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">我們重視你的意見</h4>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              為讓我們不斷提升客戶服務，現誠邀你參與一份簡短的「客戶滿意度調查」。
            </p>
            <p className="text-xs text-gray-400 mt-3">24/01/2026</p>
          </div>
          
          <div className="flex-shrink-0 w-64 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h4 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">強積金受託人及計劃加入積金易平台的最新時間表</h4>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              強積金受託人及計劃加入積金易平台的最新時間表
            </p>
            <p className="text-xs text-gray-400 mt-3">23/01/2026</p>
          </div>
          
          <div className="flex-shrink-0 w-64 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h4 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">積金易平台有限公司與金融糾紛調解中心合辦「積金易」...</h4>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              積金易平台有限公司（積金易公司）與金融糾紛調解中心（FDRC）今天簽署諒解備忘錄...
            </p>
            <p className="text-xs text-gray-400 mt-3">25/06/2025</p>
          </div>
          
          <div className="flex-shrink-0 w-64 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h4 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">發出周年權益報表</h4>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              萬全強制性公積金計劃、中國人壽強積金集成信託計劃和交通銀行慳盈退休強積金計劃...
            </p>
            <p className="text-xs text-gray-400 mt-3">25/03/2025</p>
          </div>
        </div>
      </div>

      {/* 浮動按鈕 */}
      <button className="fixed bottom-24 right-4 w-12 h-12 bg-[#1e3a5f] rounded-full flex items-center justify-center shadow-lg">
        <LayoutGrid size={22} className="text-white" />
      </button>

      {/* Bottom Navigation - 統一樣式 */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-end justify-around"
        style={{ height: '64px', paddingBottom: '8px' }}
      >
        <button
          onClick={() => handleTabClick('overview')}
          className="flex flex-col items-center justify-end"
          style={{ width: '64px', height: '48px' }}
        >
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={activeTab === 'overview' ? "./icons/nav_overview_active.png" : "./icons/nav_overview.png"} 
              alt="帳戶概覽"
              style={{ width: '24px', height: '24px' }}
            />
          </div>
          <span 
            className="text-xs mt-1"
            style={{ color: activeTab === 'overview' ? '#E67E22' : '#9CA3AF', lineHeight: '16px' }}
          >
            帳戶概覽
          </span>
        </button>
        
        <button
          onClick={() => handleTabClick('my-mpf')}
          className="flex flex-col items-center justify-end"
          style={{ width: '64px', height: '48px' }}
        >
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={activeTab === 'my-mpf' ? "./icons/nav_mpf_active.png" : "./icons/nav_mpf.png"} 
              alt="我的強積金"
              style={{ width: '24px', height: '24px' }}
            />
          </div>
          <span 
            className="text-xs mt-1"
            style={{ color: activeTab === 'my-mpf' ? '#E67E22' : '#9CA3AF', lineHeight: '16px' }}
          >
            我的強積金
          </span>
        </button>
        
        <button
          onClick={() => handleTabClick('todo')}
          className="flex flex-col items-center justify-end"
          style={{ width: '64px', height: '48px' }}
        >
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <img 
              src={activeTab === 'todo' ? "./icons/nav_todo_active.png" : "./icons/nav_todo.png"} 
              alt="待辦事項"
              style={{ width: '24px', height: '24px' }}
            />
            <span 
              className="absolute flex items-center justify-center rounded-full bg-red-500 text-white font-medium"
              style={{ 
                minWidth: '14px', 
                height: '14px', 
                fontSize: '9px',
                top: '-4px',
                right: '-6px'
              }}
            >
              1
            </span>
          </div>
          <span 
            className="text-xs mt-1"
            style={{ color: activeTab === 'todo' ? '#E67E22' : '#9CA3AF', lineHeight: '16px' }}
          >
            待辦事項
          </span>
        </button>
        
        <button
          onClick={() => handleTabClick('profile')}
          className="flex flex-col items-center justify-end"
          style={{ width: '64px', height: '48px' }}
        >
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={activeTab === 'profile' ? "./icons/nav_account_active.png" : "./icons/nav_account.png"} 
              alt="我的帳戶"
              style={{ width: '24px', height: '24px' }}
            />
          </div>
          <span 
            className="text-xs mt-1"
            style={{ color: activeTab === 'profile' ? '#E67E22' : '#9CA3AF', lineHeight: '16px' }}
          >
            我的帳戶
          </span>
        </button>
      </div>
    </div>
  );
};

export default OverviewPage;