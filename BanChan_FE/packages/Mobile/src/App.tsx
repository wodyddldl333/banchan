import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstPage from "./FirstPage";
// import AppRoutes from "./router/router";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
