// import React from "react";
import logo from "../../../../shared/public/assets/logo.png";

const MainHeader: React.FC = () => {
  return (
    <div className="w-full border-solid border-b-2 px-6 bg-white border-l">
      <div className="pt-6">
        <header className="flex items-center justify-end mb-6 ">
          <div className="flex items-center space-x-4 mr-6  ">
            <span className="text-gray-500 mr-6 font-semibold text-[18px]">
              주소: 광주전남 공동혁신도시 빛가람 대방엘리움로얄카운티1차
            </span>

            <img src={logo} alt="프로필" className="h-10 w-10 rounded-full" />
          </div>
        </header>
      </div>
    </div>
  );
};

export default MainHeader;
