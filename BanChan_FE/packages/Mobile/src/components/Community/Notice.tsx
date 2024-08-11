import React from "react";

const notices = [
  { id: 1, title: "모라 LH 7월 3주차 투표 결과 공지", date: "2024.07.17", likes: 181 },
  { id: 2, title: "모라 LH 7월 1주차 투표 결과 공지", date: "2024.07.08", likes: 163 },
  { id: 3, title: "단지 LH 공사 관련 공지", date: "2024.06.28", likes: 121 },
  { id: 4, title: "모라 LH 4월 3주차 회의 일정 공지", date: "2024.04.21", likes: 81 },
  { id: 5, title: "모라 LH 주차 규정 관련 공지", date: "2024.05.26", likes: 53 },
];

const NoticeList = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-500 p-4 text-white text-center text-lg font-bold">
        공지사항
      </header>
      <div className="max-w-lg mx-auto p-4">
        <div className="mb-4 text-gray-600">
          총 <span className="text-red-500 font-bold">57건</span>의 공지사항이 있습니다.
        </div>
        <div className="bg-white shadow-md rounded-lg">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="border-b last:border-none px-4 py-4 flex justify-between items-center"
            >
              <div>
                <div className="text-sm text-gray-800 font-medium">
                  {notice.title}
                </div>
                <div className="text-xs text-gray-500">{notice.date}</div>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a7 7 0 1114 0A7 7 0 013 10zm9.05-3.636a.5.5 0 10-.7.714l2 2a.5.5 0 00.7 0l4-4a.5.5 0 10-.7-.714l-3.3 3.299L12.05 6.364z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600">{notice.likes}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button className="px-3 py-1 mx-1 text-blue-500 bg-white border border-blue-500 rounded-full">
            작성일 ▼
          </button>
          <button className="px-3 py-1 mx-1 text-gray-500 bg-white border rounded-full">
            추천순 ▼
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button className="px-3 py-1 mx-1 text-gray-500 bg-white border rounded-full">
            1
          </button>
          <button className="px-3 py-1 mx-1 text-gray-500 bg-white border rounded-full">
            2
          </button>
          <button className="px-3 py-1 mx-1 text-gray-500 bg-white border rounded-full">
            3
          </button>
          <span className="px-3 py-1 mx-1 text-gray-500 bg-white border rounded-full">
            ...
          </span>
          <button className="px-3 py-1 mx-1 text-gray-500 bg-white border rounded-full">
            12
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeList;
