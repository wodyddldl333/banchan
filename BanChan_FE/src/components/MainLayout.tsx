import React from "react";
import MainHeader from "./MainHeader";
import MainSideBar from "./MainSideBar";
interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
        <MainSideBar/>
    <div className="flex-1 p-6">
      <div>
      <MainHeader></MainHeader>
      </div>
      <div>
      { children }
      </div>
    </div>
  </div>
  );
};

export default MainLayout;
