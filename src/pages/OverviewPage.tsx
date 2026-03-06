import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Bell, LayoutGrid } from 'lucide-react';

const OverviewPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeFilter, setActiveFilter] = useState('personal');
  const [showNameStars, setShowNameStars] = useState(true);

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
              // 全部 tab - 全藍色
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#7a9db8"
                strokeWidth="14"
              />
            ) : (
              // 個人帳戶 tab - 多色分段
              <>
                {/* 藍灰色 - 最大段 */}
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
                {/* 綠色 */}
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
                {/* 青色 */}
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
                {/* 橙色 */}
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
        
        <p className="text-base text-gray-700 mt-4">截至 04/03/2026</p>
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

      {/* 計劃列表 - 卡片式 */}
      <div className="bg-gray-50 px-4 py-3 space-y-3">
        {plans.map((plan) => (
          <div key={plan.id} className="flex items-center bg-white rounded-lg overflow-hidden shadow-sm">
            {/* 左邊彩色條 */}
            <div className={`w-1.5 self-stretch ${plan.barColor}`}></div>
            
            {/* Logo */}
            <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 ml-2">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border border-gray-100">
                <img 
                  src={plan.icon} 
                  alt={plan.name}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-6 h-6 ' + plan.iconColor + ' rounded-full flex items-center justify-center text-white text-xs font-bold">' + plan.name[0] + '</div>';
                  }}
                />
              </div>
            </div>
            
            {/* 中間資料 */}
            <div className="flex-1 py-3 pr-2">
              <p className="text-base text-gray-900 mb-1">{plan.name}</p>
              <div className="flex items-center text-emerald-500">
                {/* 綠色三角形 */}
                <svg className="w-3 h-3 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4l-8 8h16z"/>
                </svg>
                <span className="text-base">{formatCurrency(plan.gain)}</span>
              </div>
            </div>
            
            {/* 右邊餘額 */}
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
      </div>

      {/* 浮動按鈕 */}
      <button className="fixed bottom-24 right-4 w-12 h-12 bg-[#1e3a5f] rounded-full flex items-center justify-center shadow-lg">
        <LayoutGrid size={22} className="text-white" />
      </button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => handleTabClick('overview')}
            className={`flex flex-col items-center py-1 px-3 ${
              activeTab === 'overview' ? 'text-[#E67E22]' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={activeTab === 'overview' ? 2.5 : 2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            <span className="text-xs mt-1">帳戶概覽</span>
          </button>
          
          <button
            onClick={() => handleTabClick('my-mpf')}
            className={`flex flex-col items-center py-1 px-3 ${
              activeTab === 'my-mpf' ? 'text-[#E67E22]' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={activeTab === 'my-mpf' ? 2.5 : 2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs mt-1">我的強積金</span>
          </button>
          
          <button
            onClick={() => handleTabClick('todo')}
            className={`flex flex-col items-center py-1 px-3 ${
              activeTab === 'todo' ? 'text-[#E67E22]' : 'text-gray-400'
            }`}
          >
            <div className="relative">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={activeTab === 'todo' ? 2.5 : 2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span className="absolute -top-1 -right-1.5 min-w-[14px] h-3.5 bg-red-500 text-white text-[9px] font-medium rounded-full flex items-center justify-center px-1">1</span>
            </div>
            <span className="text-xs mt-1">待辦事項</span>
          </button>
          
          <button
            onClick={() => handleTabClick('profile')}
            className={`flex flex-col items-center py-1 px-3 ${
              activeTab === 'profile' ? 'text-[#E67E22]' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={activeTab === 'profile' ? 2.5 : 2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">我的帳戶</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;