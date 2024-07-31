import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstPage from "./FirstPage";
import HomeInfo from "./components/UserSettings/HomeInfo";
import MyPage from "./pages/MyPage";
import ShowVote from "./components/Vote/ShowVote";
import VoteList from "./components/Vote/VoteList";
// import AppRoutes from "./router/router";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/homeInfo" element={<HomeInfo />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/showVote" element={<ShowVote />} />
        <Route path="/voteList" element={<VoteList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
