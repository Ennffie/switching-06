import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, User, Bell, Home } from 'lucide-react';
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

  const bottomTabs = [
    { id: 'overview', icon: <Home size={24} />, label: '帳戶概覽' },
    { id: 'my-mpf', icon: <FileText size={24} />, label: '我的強積金' },
    { id: 'todo', icon: <Bell size={24} />, label: '待辦事項' },
    { id: 'profile', icon: <User size={24} />, label: '個人檔案' },
  ];

  const handleInvestClick = () => {
    // 重置所有轉換數據
    resetTransferData();
    navigate('/invest');
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'overview') {
      navigate('/overview');
    }
  };

  return (
    <div className="mpf-page">
      {/* Page Title */}
      <h1 className="page-title-orange">我的強積金</h1>

      {/* Menu Cards */}
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

      {/* Bottom Navigation */}
      <div className="bottom-nav-bar">
        {bottomTabs.map((tab) => (
          <button
            key={tab.id}
            className={`bottom-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyMPFPage;