import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronUp, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const TermsPage = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [canAccept, setCanAccept] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 頁面載入時滾到最頂
    window.scrollTo(0, 0);
    
    // 初始狀態：disabled
    setCanAccept(false);

    // 用 IntersectionObserver 檢測底部
    if (bottomRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // 當底部元素可見時激活
            if (entry.isIntersecting) {
              setCanAccept(true);
            }
          });
        },
        {
          threshold: 0.1, // 10% 可見就觸發
          rootMargin: '0px 0px -50px 0px' // 提前 50px 觸發
        }
      );

      observer.observe(bottomRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="px-4 py-3 flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <div className="flex-1" />
        </div>

        {/* Title */}
        <div className="px-4 pb-2">
          <h1 className="text-2xl font-bold text-[#E67E22]">條款及細則</h1>
        </div>

        {/* 重要事項三點 - Sticky */}
        <div className="px-4 py-3 bg-gray-50">
          {/* 顯示更多 Toggle */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-1 w-full text-gray-700 font-medium mb-3"
          >
            {isExpanded ? '顯示較少' : '顯示更多'}
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {/* 三點內容 */}
          <div className={`transition-all duration-300 ${isExpanded ? 'block' : 'block'}`}>
            <p className="text-gray-900 mb-2 text-sm">
              點擊下方「接受」按鈕，即表示閣下確認：
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-900 text-sm">
              <li>此申請內所提供之資料正確及完整；</li>
              <li>閣下明白此申請一經提交，即不可撤回；</li>
              <li>閣下已閱讀並同意受以下條款及細則約束。</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div 
        className="flex-1 overflow-y-auto px-4 pb-40"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="text-sm text-gray-700 leading-relaxed space-y-4">
          {/* 更改投資指示一般條款及細則 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-2">更改投資指示一般條款及細則</h3>
            
            <h4 className="font-bold text-gray-900 mb-2">A. 重要事項</h4>
            
            <p className="mb-2">
              1. 積金易平台有限公司（「積金易公司」）是強制性公積金計劃管理局（「積金局」）的全資附屬公司。積金易公司將根據「積金易平台一般條款及細則」（可於 https://empf.org.hk/tnc 瀏覽），透過積金易平台為你提供計劃行政服務。
            </p>
            
            <p className="mb-2">
              2. 提交本申請前，請先參閱友邦強積金優選計劃（「本計劃」）之強積金計劃說明書、主要計劃資料文件、重要事項、條款及細則、預設投資策略注意事項及保證組合注意事項。
            </p>
            
            <p className="mb-2">
              3. 積金易平台收到完整申請後，才會處理有關指示。如有遺漏（包括但不限於資料不齊全），積金易平台可能未能執行此指示。
            </p>
            
            <p className="mb-2">4. 遞交本申請後，你可能沒法取消有關更改投資指示。</p>
            
            <p className="mb-2">5. 如你擬為多於一個帳戶更改投資指示，請就每個帳戶分別遞交一份申請。</p>
            
            <p className="mb-4">
              6. 本申請所有已提供的資料將按照有關強積金法例、積金易平台及本計劃《收集個人資料聲明》（「聲明」）處理。詳情請參閱後頁所提供的「聲明」。
            </p>

            <h4 className="font-bold text-gray-900 mb-2">B. 條款及細則</h4>
            
            <p className="mb-2">1. 更改投資授權：</p>
            <p className="mb-2 pl-4">
              (i) 指示執行後，新的投資授權方可應用於未來供款／由另一註冊計劃轉入之款項（即不適用於同一計劃的轉移）。處理中的供款／轉入之款項將根據舊有的投資授權作出分配（如有）。
            </p>
            <p className="mb-4 pl-4">
              (ii) 更改投資授權的截止時間為任何工作日香港時間下午四時。如積金易平台在工作日截止時間前收到的指示，此指示將會在同日生效。而積金易平台在工作日截止時間或之後或非工作日才收到的指示，將會在下一個工作日生效。
            </p>

            <p className="mb-2">2. 現有結餘資產轉換：</p>
            <p className="mb-2 pl-4">
              (i) 資產轉換指示僅適用於帳戶現有結餘，並不適用於處理中的供款／由另一註冊計劃轉入之款項。
            </p>
            <p className="mb-4 pl-4">
              (ii) 現有結餘資產轉換的截止時間為任何工作日香港時間下午四時。如積金易平台在工作日截止時間前收到的指示，此指示將會在同日執行並以交易日當日的基金價格處理。而積金易平台在工作日截止時間或之後或非工作日（如星期六、公眾假日或烈風／黑色暴雨警告日）才收到的指示，將會在下一個工作日執行。
            </p>

            <p className="mb-4">
              3. 如於同一個工作日的截止時間前透過由電子平台或其他途徑（包括電郵、傳真及郵寄）收到超過一個的同類型指示且牽涉相同基金及互相衝突，只有最後收到的指示將會被執行。積金易平台及友邦（信託）有限公司（「受託人」）毋須對此而招致之任何直接、間接、特別或相應損失或損害承擔責任。
            </p>

            <p className="mb-4">*透過郵寄收到的指示將會被視為最早提交的指示（如有）。</p>

            <p className="mb-4">
              4. 積金易平台收到有效指示才會處理本申請。如提供的資料無效，或任何資料有遺漏或不正確，你的指示將不會被執行及你的相關供款類別之投資將維持現有投資分配，直至積金易平台收到有效的指示為止。
            </p>

            <p className="mb-2">(i) 強制性供款或自願性供款的有效投資授權必須為</p>
            <p className="mb-2 pl-4">a. 每項投資分配百分比須為整數及至少5%，及</p>
            <p className="mb-4 pl-4">b. 全部投資分配百分比的總和等於100%。</p>

            <p className="mb-2">(ii) 強制性供款或自願性供款的有效資產轉換指示必須為</p>
            <p className="mb-2 pl-4">a. 每項投資分配百分比須為整數及至少5%，及</p>
            <p className="mb-4 pl-4">b. 全部投資分配百分比的總和等於100%。</p>

            <p className="mb-4">
              5. 請注意，如你的資產轉換指示的執行日同為強積金帳戶進行贖回累算權益的日子（包括但不限於你從自選安排下的權益轉移、抵銷長期服務金／遣散費、提取累算權益、預設投資策略每年自動降低風險，統稱為「贖回項目」），你的資產轉換指示將會順延至完成執行這些贖回項目的下一個工作日執行。
            </p>

            <p className="mb-4">6. 完成執行指示後，積金易平台會發出確認通知書予你。</p>

            <p className="mb-4">
              7. 你必須注意投資市場可能出現顯著的波動，基金單位價格可跌可升。由於執行資產轉換指示需要一定的時間，由接獲至完成執行指示有一定的時間差距，因此未必能夠保證達到你預期的結果。在作出投資選擇前，請你必須小心衡量個人可承受風險的程度及財政狀況（以及你的退休計劃）。如有任何疑問，請諮詢你的財務顧問了解更多詳情。
            </p>

            <p className="mb-4">
              8. 「工作日」指並非任何以下日子的日子 (i) 星期六；(ii) 公眾假日；或 (iii) 根據《釋義及通則條例》(第1章) 第71(2)條所界定的烈風警告日或黑色暴雨警告日。
            </p>

            <h4 className="font-bold text-gray-900 mb-2">C. 「預設投資策略」注意事項</h4>
            
            <p className="mb-2">
              1. 「預設投資策略」是一項根據《強制性公積金計劃條例》規定的預設投資安排。預設投資策略透過於不同年齡按照預定配置百分比來投資於核心累積基金與65歲後基金及會隨著成員年滿50歲後以減持核心累積基金及增持65歲後基金來調整風險。有關「預設投資策略」降低風險機制的詳情，可參閱強積金計劃說明書。
            </p>
            
            <p className="mb-2">
              2. 每年自動降低風險將於成員生日當日執行，如成員生日當日並非工作日，則順延至下一個工作日。如積金易平台於年度自動降低風險日或之前收到指示（包括但不限於認購、贖回、轉換或提取指示），且該指示會在即日執行，則自動降低風險將會順延至完成執行這些相關指示的下一個工作日執行。
            </p>
            
            <p className="mb-2">
              3. 如成員的香港身份證／護照上的出生日期不完整，積金易平台將以下列的最後一個曆日作為成員的出生日期以進行自動降低風險：
            </p>
            <p className="mb-2 pl-4">(i) 有關出生月份（如僅有出生年份及月份）或</p>
            <p className="mb-2 pl-4">(ii) 有關出生年份（如僅有出生年份）。</p>
            <p className="mb-4">
              如沒有出生日期資料保存於積金易平台，成員之累算權益將全數投資於65歲後基金。
            </p>
            
            <p className="mb-4">
              4. 如成員擬在自動降低風險前轉出「預設投資策略」，積金易平台必須在成員生日當日（「截止日期」）的截止時間（即香港時間下午四時）前收到有效的資產轉換指示。在此截止時間或之後收到的任何有效轉出指示，則只有在自動降低風險之後才會執行。
            </p>

            <h4 className="font-bold text-gray-900 mb-2">D. 授權及聲明</h4>
            
            <p className="mb-2">在提交本申請後，成員（下稱「本人」）：</p>
            <p className="mb-2">1. 本人已閱讀及明白積金易平台一般條款及細則、本申請的重要事項、條款及細則、預設投資策略注意事項及保證組合注意事項、本計劃之強積金計劃說明書及主要計劃資料文件，並同意遵守當中所述規則。</p>
            <p className="mb-2">2. 本人明白及同意積金易平台及本計劃「聲明」條款。</p>
            <p className="mb-2">3. 本人明白本人在作出任何投資決定前，需先尋求專業意見。</p>
            <p className="mb-2">4. 本人特此聲明，本申請上之投資選擇，乃出於本人之判斷及決定。</p>
            <p className="mb-2">
              5. 本人聲明並確認本申請的指示乃正確，並指示積金易平台／受託人執行本指示。倘若本人所提供的資料有任何錯誤及／或不完整，及／或積金易平台／受託人因執行相關指示，而導致積金易平台／受託人需要承擔任何及所有損失、成本、費用或招致任何行動或訴訟，本人同意作出有關賠償予積金易平台／受託人。
            </p>

            <h4 className="font-bold text-gray-900 mb-2">警告：</h4>
            
            <p className="mb-4">
              根據《強制性公積金計劃條例》（第485章）第43E條，任何人在給予 (i) 積金局，(ii) 積金易平台的系統營運者，或 (iii) 核准受託人的任何文件中，明知或罔顧後果地作出在要項上屬虛假或具誤導性的陳述，即屬犯罪。首次定罪者，最高可處罰款港幣100,000元及監禁十二個月；其後每次定罪，最高可處罰款港幣200,000元及監禁兩年。根據《刑事罪行條例》（第200章）第36條，任何人明知而故意在非經宣誓的情況下在要項上作出屬虛假的陳述，亦屬犯罪。一經定罪，可處監禁兩年及罰款。
            </p>

            <h4 className="font-bold text-gray-900 mb-2">E. 積金易平台及本計劃《收集個人資料聲明》（「聲明」）</h4>
            <p className="mb-2">積金易平台收集個人資料聲明 - empf.org.hk/pics</p>
            <p className="mb-8">本計劃收集個人資料聲明 - empf.org.hk/pics_aia</p>
          </div>
        </div>

        {/* Bottom sentinel - 用嚟檢測是否滾到最底 */}
        <div ref={bottomRef} className="h-10 w-full" />
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 z-40">
        <button 
          onClick={() => setShowModal(true)}
          disabled={!canAccept}
          className={`w-full py-4 rounded-full text-lg font-medium mb-3 transition-all ${
            canAccept 
              ? 'bg-[#1e3a5f] text-white active:scale-[0.98]' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          接受
        </button>
        <button 
          onClick={() => navigate(-1)}
          className="w-full py-3 text-gray-700 text-lg font-medium"
        >
          拒絕
        </button>
      </div>

      {/* Modal - 下一個工作日處理 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white w-full max-w-sm rounded-2xl p-6 text-center">
            {/* Close button */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className="mb-4">
              <img 
                src="./images/icon-next-day.jpg" 
                alt="下一個工作日處理"
                className="w-24 h-24 mx-auto object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[#E67E22] mb-3">
              你的指示將於下一個工作日處理
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              你的投資指示於截止時間後提交，因此有關指示將會在下一個交易日處理。（提交投資指示的截止時間為每個工作天的下午四時正）
            </p>

            {/* Next Step Button */}
            <button 
              onClick={() => navigate('/invest/success')}
              className="w-full py-4 bg-[#1e3a5f] text-white rounded-full text-lg font-medium active:scale-[0.98] transition-transform"
            >
              下一步
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsPage;
