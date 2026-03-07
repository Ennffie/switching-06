import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, X } from 'lucide-react';

const InvestPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (type: 'existing' | 'future') => {
    if (type === 'existing') {
      navigate('/invest/select-plan');
    }
    // future 暫時無動作
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-[#E67E22]">投資</h1>
        <div className="w-8" />
      </div>

      <div className="px-4 py-4">
        {/* Subtitle */}
        <p className="text-gray-600 text-sm mb-6">
          請根據你的需要選擇投資指示選項。
        </p>

        {/* Investment Cards */}
        <div className="space-y-4">
          {/* Card 1: 現有帳戶結餘的投資 */}
          <div 
            onClick={() => handleCardClick('existing')}
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex items-start">
              {/* Icon */}
              <div className="flex-shrink-0 mr-4">
                <img 
                  src="./icons/invest-existing.jpg" 
                  alt="現有帳戶結餘"
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-medium text-gray-900">現有帳戶結餘的投資</h3>
                  <button 
                    onClick={handleInfoClick}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Info size={18} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  更改你現有帳戶結餘的投資組合，你可選擇指定基金轉換或單次投資組合重組
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: 未來供款的投資 */}
          <div 
            onClick={() => handleCardClick('future')}
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex items-start">
              {/* Icon */}
              <div className="flex-shrink-0 mr-4">
                <img 
                  src="./icons/invest-future.jpg" 
                  alt="未來供款"
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-medium text-gray-900">未來供款的投資</h3>
                  <button 
                    onClick={handleInfoClick}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Info size={18} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  適用於更改所有未來收到的款項的投資組合，包括供款及自另一計劃轉入之款項。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal Content - Full screen style */}
          <div className="absolute inset-0 bg-white overflow-y-auto">
            {/* Close Button */}
            <div className="flex justify-end px-4 pt-4 pb-2">
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 pb-8">
              {/* Title */}
              <h2 className="text-xl font-bold text-[#E67E22] mb-5">
                關於基金轉換及重組投資組合
              </h2>

              {/* Introduction */}
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                計劃成員可透過「基金轉換」或「重組投資組合」功能，將帳戶內的某個基金的單位沽出，並把所得款項投資於同一計劃的另一個基金，從而更改現有帳戶結餘的投資組合。
              </p>

              <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                部分受託人或設有限制成員每年最多可轉換基金多少次。詳情請參閱計劃的基金轉換表格及強積金計劃冊子。
              </p>

              {/* Section: 基金轉換 */}
              <h3 className="text-lg font-bold text-gray-900 mb-3">基金轉換</h3>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                贖回在一個或多個基金的部分或所有強積金（即「轉出」），然後把所得款項投資於另外一個或多個基金（即「轉入」），從而改變現有的強積金投資組合。
              </p>

              {/* 例子 */}
              <h4 className="text-base font-bold text-gray-900 mb-3">例子</h4>
              <p className="text-sm text-gray-700 mb-3">
                舉例說，假設現有的強積金的投資組合結餘如下：
              </p>

              {/* Bullet points - 投資組合結餘 */}
              <ul className="text-sm text-gray-700 mb-4 pl-1 space-y-1">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>香港股票基金甲$3,000</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>香港債券基金乙$7,000</span>
                </li>
              </ul>

              <p className="text-sm text-gray-700 mb-3">
                計劃成員作出以下基金轉換的指示：
              </p>

              {/* Bullet points - 指示 */}
              <ul className="text-sm text-gray-700 mb-6 pl-1 space-y-1">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>轉出所有股票基金甲的投資；以及</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>把贖回股票基金甲所得的相關款項平均轉入強積金保守基金丙及債券基金丁。</span>
                </li>
              </ul>

              {/* 流程圖 */}
              <div className="mb-6">
                <img 
                  src="./images/fund-transfer-flow.jpg" 
                  alt="基金轉換流程圖"
                  className="w-full rounded-lg"
                />
              </div>

              {/* 免責聲明 */}
              <p className="text-xs text-gray-500 mb-8 leading-relaxed">
                *為簡化說明，上述例子假設所有基金價格在作出基金轉換指示之前及之後均保持不變。在實際情況下，若基金價格在作出指示後有所變動，現有強積金的投資組合結餘亦會隨之改變。
              </p>

              {/* Section: 重組投資組合 */}
              <h3 className="text-lg font-bold text-gray-900 mb-3">重組投資組合</h3>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                根據新的基金分配指示，改變現有強積金的投資組合。首先是根據指示贖回現有的部分強積金，然後重新投資，以達致要求的基金分配比例。此方法透過改變各基金的比重，重組投資組合。
              </p>

              {/* 例子 */}
              <h4 className="text-base font-bold text-gray-900 mb-3">例子</h4>
              <p className="text-sm text-gray-700 mb-3">
                舉例說，假設現有強積金的投資組合結餘如下：
              </p>

              {/* Bullet points - 投資組合結餘 */}
              <ul className="text-sm text-gray-700 mb-4 pl-1 space-y-1">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>香港股票基金甲$3,000</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>香港債券基金乙$7,000</span>
                </li>
              </ul>

              <p className="text-sm text-gray-700 mb-3">
                計劃成員作出重組投資組合的指示，把現有強積金的投資組合改為：
              </p>

              {/* Bullet points - 指示 */}
              <ul className="text-sm text-gray-700 mb-6 pl-1 space-y-1">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>80%股票基金甲</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>20%債券基金乙</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestPage;