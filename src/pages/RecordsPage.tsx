import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, SlidersHorizontal, LayoutGrid } from 'lucide-react';

const RecordsPage = () => {
  const navigate = useNavigate();

  const records = [
    {
      referenceNumber: 'IMD2609217000223538',
      transactionNumber: 'IMD2609217000223538',
      status: '待批量處理',
      statusColor: 'bg-[#E67E22]',
      planName: '友邦強積金優選計劃',
      accountNumber: '56442131',
      icon: './icons/aia-logo-new.jpg',
      transactionType: '交易轉換',
      source: '流動應用程式',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <button onClick={() => navigate('/')} className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-base font-medium text-gray-900">我的紀錄</h1>
        <div className="flex items-center gap-4">
          <Search size={24} className="text-gray-700" />
          <SlidersHorizontal size={24} className="text-gray-700" />
          <LayoutGrid size={24} className="text-gray-700" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <p className="text-sm text-gray-500 mb-4">共 1 個結果</p>

        {/* Record Cards */}
        <div className="space-y-4">
          {records.map((record, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              {/* Reference Numbers */}
              <div className="bg-[#FFF8E7] p-3 rounded-lg mb-3">
                <p className="text-xs text-gray-700">參考編號：#{record.referenceNumber}</p>
                <p className="text-xs text-gray-700">交易#1的參考編號：#{record.transactionNumber}</p>
              </div>

              {/* Status Tag */}
              <div className="mb-3">
                <span className={`${record.statusColor} text-white text-xs px-3 py-1 rounded-full`}>
                  {record.status}
                </span>
              </div>

              {/* Plan Info */}
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={record.icon} 
                  alt={record.planName}
                  className="w-10 h-10 object-contain rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{record.planName}</p>
                  <p className="text-sm text-gray-500">{record.accountNumber}</p>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">交易類別</p>
                <p className="text-right text-gray-900">{record.transactionType}</p>
                
                <p className="text-gray-500">交易來源</p>
                <p className="text-right text-gray-900">{record.source}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecordsPage;
