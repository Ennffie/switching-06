import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransfer } from '../context/TransferContext';

interface MenuItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const MyMPFPage = () => {
  const [activeTab, setActiveTab] = useState('my-mpf');
  const navigate = useNavigate();
  const { resetTransferData } = useTransfer();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const menuItems: MenuItem[] = [
    {
      id: '1',
      icon: './icons/menu-register.jpg',
      title: '登記強積金帳戶',
      description: '登記強積金帳戶，如可扣稅自願性供款帳戶、特別自願性供款帳戶等',
    },
    {
      id: '2',
      icon: './icons/menu-contribute.jpg',
      title: '作出一次性自願性供款',
      description: '向你的可扣稅自願性供款帳戶、特別自願性供款帳戶及／或自僱人士帳戶作出整筆供款',
    },
    {
      id: '3',
      icon: './icons/menu-schedule.jpg',
      title: '更改供款週期及／或金額',
      description: '更改可扣稅自願性供款供款週期及／或金額',
    },
    {
      id: '4',
      icon: './icons/menu-invest.jpg',
      title: '投資',
      description: '進行基金轉換／重組投資組合，以及更改投資授權',
    },
    {
      id: '5',
      icon: './icons/menu-transfer.jpg',
      title: '轉移強積金',
      description: '提交轉移指示，包括整合個人帳戶、離職轉移或轉移自僱人士帳戶、僱員自選安排及轉移...',
    },
    {
      id: '6',
      icon: './icons/menu-withdraw.jpg',
      title: '提取權益',
      description: '提交提取指示，包括申索強積金權益、提取自願性供款及退還儲備帳戶結餘',
    },
  ];

  const handleInvestClick = () => {
    resetTransferData();
    navigate('/invest');
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'overview') {
      navigate('/');
    } else if (tabId === 'my-mpf') {
      navigate('/my-mpf');
    }
  };

  return (
    <div className="mpf-page">
      <h1 className="page-title-orange">我的強積金</h1>

      <div className="menu-cards-container">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className="menu-card"
            onClick={() => {
              if (item.title === '投資') {
                handleInvestClick();
              }
            }}
            style={{ cursor: item.title === '投資' ? 'pointer' : 'default' }}
          >
            <div className="menu-card-icon">
              <img 
                src={item.icon} 
                alt={item.title}
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="menu-card-content">
              <h3 className="menu-card-title">{item.title}</h3>
              <p className="menu-card-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

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

export default MyMPFPage;