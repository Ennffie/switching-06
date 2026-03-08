import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  // Generate a reference number
  const referenceNumber = 'SGD' + Date.now().toString().slice(-16);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        
        {/* Success Icon */}
        <div className="mb-6">
          <img 
            src="./images/icon-check.jpg" 
            alt="成功提交"
            className="w-28 h-28 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-gray-900 text-center mb-8 leading-relaxed">
          成功提交基金轉換／重組投資組合指示
        </h1>

        {/* Reference Info */}
        <div className="text-center text-gray-600 text-sm mb-12 space-y-2">
          <p>參考編號：{referenceNumber}</p>
          <p>提交日期及時間：{dateStr}, {timeStr}</p>
        </div>

        {/* Buttons */}
        <div className="w-full max-w-sm space-y-4">
          <button 
            onClick={() => navigate('/invest/records')}
            className="w-full py-4 bg-[#1e3a5f] text-white rounded-full text-lg font-medium active:scale-[0.98] transition-transform"
          >
            查閱提交狀態
          </button>
          
          <button 
            className="w-full py-4 bg-transparent text-gray-700 border border-gray-300 rounded-full text-lg font-medium"
          >
            未來供款的投資
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
