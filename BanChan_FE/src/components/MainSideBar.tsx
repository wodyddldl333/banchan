import React from "react";

const MainSideBar = () => {
  return (
    <div className="w-64 bg-white shadow-lg border-r border-solid">
      {/* <div className="p-6"> */}
      <div className="">
        {/* 이미지는 절대 경로로 !!  */}
        <img
          src="/src/assets/logo.png"
          alt="반찬 로고"
          className="h-[100px] w-[160px] ml-6 my-6"
        />
        <nav className="space-y-12 text-center mt-12">
          <div className="flex items-center w-full text-blue-500">
            <a href="#" className=" pl-6">
              <span className="material-symbols-outlined">home</span>
              <span className="ml-2 text-[18px]">메인페이지</span>
            </a>
          </div>

          <div className="flex items-centerx w-full text-gray-600">
            <a href="#" className="pl-6">
              <span className="material-symbols-outlined ">Person</span>
              <span className="ml-2 text-[18px]">마이페이지</span>
            </a>
          </div>

          <div className="flex items-center  w-full text-gray-600 ">
            <a href="#" className="pl-6">
              <span className="material-symbols-outlined">Chat</span>
              <span className="ml-2 text-[18px]">커뮤니티</span>
            </a>
          </div>

          <div className="flex items-centerx w-full text-gray-600">
            <a href="#" className="pl-6">
              <span className="material-symbols-outlined ">
                manage_accounts
              </span>
              <span className="ml-2 text-[18px]">이용자 관리</span>
            </a>
          </div>

          <div className="flex items-centerx w-full text-gray-600">
            <a href="#" className="pl-6">
              <span className="material-symbols-outlined ">
                video_camera_front
              </span>
              <span className="ml-2 text-[18px]">투표 관리</span>
            </a>
          </div>

          <div className="flex items-centerx w-full text-gray-600">
            <a href="#" className="pl-6">
              <span className="material-symbols-outlined ">
                video_camera_front
              </span>
              <span className="ml-2 text-[18px]">회의 관리</span>
            </a>
          </div>

          <div className="flex items-centerx w-full text-gray-600">
            <a href="#" className="pl-6">
              <span className="material-symbols-outlined ">HandyMan</span>
              <span className="ml-2 text-[18px]">기타 관리</span>
            </a>
          </div>
        </nav>
        <button className=" text-gray-600 mt-[200px]">로그아웃</button>
      </div>
    </div>
  );
};

export default MainSideBar;
