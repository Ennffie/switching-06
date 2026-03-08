import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

const DISInfoPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center justify-end border-b border-gray-200">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -mr-2"
        >
          <svg className="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-[#E67E22] mb-6">
          預設投資策略
        </h1>
        <p className="text-base text-gray-900 leading-relaxed">
          有關預設投資策略的詳情，請參閱
          <a 
            href="https://www.mpfa.org.hk/mpf-investment/portfolio/default-investment-strategy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1e3a5f] underline font-medium"
          >
            積金局網頁
          </a>
        </p>
      </div>
    </div>
  );
};

export default DISInfoPage;
