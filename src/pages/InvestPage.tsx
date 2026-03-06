import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, X } from 'lucide-react';

const InvestPage = () => {
  const navigate = useNavigate();
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h2 className="text-base font-medium text-gray-900">關於基金轉換及重組投資組合</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Section 1: 基金轉換 */}
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-3">基金轉換</h3>
                <p className="text-sm text-gray-600 mb-4">
                  基金轉換是指你指示我們將你帳戶內現有投資的基金單位（「轉出基金」）全部或部分贖回，並將贖回所得款項投資於你指定的基金（「轉入基金」）。
                </p>

                {/* Example */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-3">例如：</p>
                  <p className="text-sm text-gray-600 mb-4">假設你的帳戶持有以下基金：</p>
                  
                  {/* Before Table */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-blue-900 mb-2">之前</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>股票基金甲</span>
                        <span>$3,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>債券基金乙</span>
                        <span>$7,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Instruction */}
                  <div className="border-2 border-green-500 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">指示</p>
                    <p className="text-sm text-gray-600">轉出所有股票基金甲，款項平均轉入強積金保守基金丙及債券基金丁</p>
                    <div className="flex justify-center my-2">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>

                  {/* After Table */}
                  <div className="bg-[#1e3a5f] rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-2">之後</p>
                    <div className="space-y-1 text-white">
                      <div className="flex justify-between text-sm">
                        <span>強積金保守基金丙</span>
                        <span>$1,500</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>債券基金乙</span>
                        <span>$7,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>債券基金丁</span>
                        <span>$1,500</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-gray-500 leading-relaxed">
                  基金轉換指示須按贖回及認購時的基金單位價格執行，單位價格會每天波動，因此轉入基金所得到的單位數量可能與轉出基金的單位數量不同。
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200" />

              {/* Section 2: 重組投資組合 */}
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-3">重組投資組合</h3>
                <p className="text-sm text-gray-600 mb-4">
                  重組投資組合是指你指示我們根據你指定的基金分配百分比，將你帳戶內現有的投資組合重新調整至新的分配比例。
                </p>

                {/* Example */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-3">例如：</p>
                  <p className="text-sm text-gray-600 mb-4">假設你的帳戶持有以下基金：</p>
                  
                  {/* Before Table */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-blue-900 mb-2">之前</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>股票基金甲</span>
                        <span>$3,000 (30%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>債券基金乙</span>
                        <span>$7,000 (70%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Instruction */}
                  <div className="border-2 border-[#E67E22] rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">重組</p>
                    <p className="text-sm text-gray-600">改為 80%股票基金甲 + 20%債券基金乙</p>
                    <div className="flex justify-center my-2">
                      <svg className="w-6 h-6 text-[#E67E22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>

                  {/* After Table */}
                  <div className="bg-[#1e3a5f] rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-2">之後</p>
                    <div className="space-y-1 text-white">
                      <div className="flex justify-between text-sm">
                        <span>股票基金甲</span>
                        <span>$8,000 (80%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>債券基金乙</span>
                        <span>$2,000 (20%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-gray-500 leading-relaxed">
                  重組投資組合將涉及贖回及認購基金單位，因此會產生買賣差價。重組投資組合指示將按贖回及認購時的基金單位價格執行。
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-[#1e3a5f] text-white rounded-lg font-medium"
              >
                明白
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestPage;