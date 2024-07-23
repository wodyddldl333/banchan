import React from "react";

const MainHeader = () => {
  return (
    <div className="w-full border-solid border-b-2 px-6 bg-white border-l">
      <div className="pt-6">
        <header className="flex items-center justify-end mb-6 ">
          <div className="flex items-center space-x-4 mr-6  ">
            <span className="text-gray-500 mr-6">
              현재: 부산 모라 LH 행복주택
            </span>

            <img
              src="/src/assets/logo.png"
              alt="프로필"
              className="h-10 w-10 rounded-full"
            />
          </div>
        </header>
      </div>
    </div>
  );
};

export default MainHeader;
