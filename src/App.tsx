import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { TransferProvider } from './context/TransferContext';
import MyMPFPage from './pages/MyMPFPage';
import OverviewPage from './pages/OverviewPage';
import InvestPage from './pages/InvestPage';
import SelectPlanPage from './pages/SelectPlanPage';
import FundTransferPage from './pages/FundTransferPage';
import ConfirmPage from './pages/ConfirmPage';
import TermsPage from './pages/TermsPage';
import SuccessPage from './pages/SuccessPage';
import RecordsPage from './pages/RecordsPage';
import PersonalityQuizPage from './pages/PersonalityQuizPage';
import WorkLifeQuizPage from './pages/WorkLifeQuizPage';
import RoomCleanlinessQuizPage from './pages/RoomCleanlinessQuizPage';
import DISInfoPage from './pages/DISInfoPage';

function App() {
  return (
    <TransferProvider>
      <Router>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/my-mpf" element={<MyMPFPage />} />
          <Route path="/invest" element={<InvestPage />} />
          <Route path="/invest/select-plan" element={<SelectPlanPage />} />
          <Route path="/invest/fund-transfer" element={<FundTransferPage />} />
          <Route path="/invest/confirm" element={<ConfirmPage />} />
          <Route path="/invest/terms" element={<TermsPage />} />
          <Route path="/invest/success" element={<SuccessPage />} />
          <Route path="/invest/records" element={<RecordsPage />} />
          <Route path="/dis-info" element={<DISInfoPage />} />
          <Route path="/quiz/personality" element={<PersonalityQuizPage />} />
          <Route path="/quiz/work-life" element={<WorkLifeQuizPage />} />
          <Route path="/quiz/room-cleanliness" element={<RoomCleanlinessQuizPage />} />
        </Routes>
      </Router>
    </TransferProvider>
  );
}

export default App;
