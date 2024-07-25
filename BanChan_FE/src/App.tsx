import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SocialLoginPage from "./pages/SocialLoginPage";
import LoginPage from "./pages/LoginPage";
import Notice from "./components/Community/Notice";
import Board from "./components/Community/Board";
import Ask from "./components/Community/Ask";
import VoteManagePage from "./pages/VoteManagePage";
import MainLayout from "./components/MainLayout";
import VoteCreatePage from "./components/VoteManage/VoteCreate";
import VoteDetail from "./components/VoteManage/VoteDetail";
import ActiveVote from "./components/VoteManage/ActiveVote";
import FinishedVote from "./components/VoteManage/FinishedVote";
import SendMessage from "./components/VoteManage/SendMessage";
import Vote from "./pages/VotePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SocialLoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/community/notice" element={<Notice />} />
        <Route path="/community/board" element={<Board />} />
        <Route path="/community/ask" element={<Ask />} />
        {/* 메인레이아웃 - 상단 툴바 및 좌측 메뉴바 */}
        <Route element={<MainLayout />}>
          <Route path="/vote" element={<VoteManagePage />}>
            <Route path="active" element={<ActiveVote />} />
            <Route path="finish" element={<FinishedVote />} />
            <Route path="create" element={<VoteCreatePage />} />
            <Route path="detail" element={<VoteDetail />} />
            <Route path="message" element={<SendMessage />} />
          </Route>
        </Route>
        <Route path="/temp" element={<Vote />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
