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
            <a href="#" className=" pl-10 flex">
              <span className="material-symbols-outlined text-[30px]">
                home
              </span>
              <div className="mt-[2.8px] ml-2">
                <span className="ml-2 text-[18px]">메인페이지</span>
              </div>
            </a>
          </div>

          <div className="flex items-center w-full text-gray-600">
            <a href="#" className="pl-10 flex">
              <span className="material-symbols-outlined text-[30px]">
                Person
              </span>
              <div className="mt-[2.8px] ml-2">
                <span className="ml-2 text-[18px]">마이페이지</span>
              </div>
            </a>
          </div>

          <div className="flex items-center  w-full text-gray-600 ">
            <a href="#" className="pl-10 flex">
              <span className="material-symbols-outlined text-[30px]">
                Chat
              </span>
              <div className="mt-[2.8px] ml-2">
                <span className="ml-2 text-[18px]">커뮤니티</span>
              </div>
            </a>
          </div>

          <div className="flex items-center w-full text-gray-600">
            <a href="#" className="pl-10 flex">
              <span className="material-symbols-outlined text-[30px]">
                manage_accounts
              </span>
              <div className="mt-[2.8px] ml-2">
                <span className="ml-2 text-[18px]">이용자 관리</span>
              </div>
            </a>
          </div>

          <div className="flex items-center w-full text-gray-600">
            <a href="#" className="pl-10 flex">
              <span className="material-symbols-outlined text-[30px]">
                how_to_vote
              </span>
              <div className="mt-[2.8px] ml-2">
                <span className="ml-2 text-[18px]">투표 관리</span>
              </div>
            </a>
          </div>

          <div className="flex items-center w-full text-gray-600">
            <a href="#" className="pl-10 flex">
              <span className="material-symbols-outlined text-[30px]">
                video_camera_front
              </span>
              <div className="mt-[2.8px] ml-2">
                <span className="ml-2 text-[18px]">회의 관리</span>
              </div>
            </a>
          </div>

          <div className="flex items-center w-full text-gray-600">
            <a href="#" className="pl-10 flex">
              <span className="material-symbols-outlined text-[30px]">
                HandyMan
              </span>
              <div className="mt-[2.8px] ml-2">
                <span className="ml-2 text-[18px]">기타 관리</span>
              </div>
            </a>
          </div>
        </nav>
        <div className="flex items-centerx w-full text-gray-600">
          <div className="pl-10 flex mt-[200px]">
            <span className="material-symbols-outlined text-[30px]">
              logout
            </span>
            <div className="mt-[2.8px] ml-2">
              <button className=" ml-2 text-[18px] ">로그아웃</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSideBar;
