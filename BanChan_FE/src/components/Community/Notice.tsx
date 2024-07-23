import React from "react";
import { Link } from "react-router-dom";
import MainHeader from "../MainHeader";
import MainSideBar from "../MainSideBar";

const Notice = () => {
  const RegistButton = () => {
    return (
      <button
        className={`bg-customBlue text-white w-[130px] h-[50px] rounded-[20px]`}
      >
        글쓰기
      </button>
    );
  };

  const CommunityCategories = () => {
    return (
      <div className="nav-elements w-full flex justify-center mt-4">
        <div className="relative w-full max-w-[1500px] px-2">
          <div className="absolute inset-x-0 bottom-0 border-b-2 border-customLineColor"></div>
          <ul className="relative flex pt-6 ml-10">
            <li className="text-customTextColor  mr-20 flex items-center justify-center border-b-4 border-transparent focus:bg-customFocusedTextColor focus:border-customBlue pb-2">
              <Link to="/community/notice">공지사항</Link>
            </li>
            <li className="text-customTextColor mr-20 flex items-center justify-center border-b-4 border-transparent focus:text-customFocusedTextColor focus:border-customBlue pb-2">
              <Link to="/community/ask">건의함</Link>
            </li>
            <li className="text-customTextColor mr-20 flex items-center justify-center border-b-4 border-transparent hover:text-customFocusedTextColor hover:border-customBlue pb-2">
              <Link to="/community/board">자유게시판</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const Sorting = () => {
    return (
      <div className="flex justify-end items-center mb-6 mr-6">
        <div className="flex justify-center items-center mr-6 bg-white p-2 rounded-[16px] shadow-md">
          <button
            className={`flex-1 flex justify-center items-center py-2 px-4 rounded-l-lg `}
          >
            작성일
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div className="border-l border-gray-300"></div>
          <button
            className={`flex-1 flex justify-center items-center py-2 px-4 rounded-r-lg`}
          >
            추천수
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        <RegistButton />
      </div>
    );
  };

  const Table = () => {
    const data = [
      {
        id: 78,
        title: "[공지] 모라 LH 7월 3주차 투표 결과 공지",
        author: "관리자",
        date: "2024-07-18 18:00",
        views: "123,456,789",
        recommendations: 134,
      },
      {
        id: 78,
        title: "[공지] 모라 LH 7월 3주차 투표 결과 공지",
        author: "관리자",
        date: "2024-07-18 18:00",
        views: "123,456,789",
        recommendations: 134,
      },
      {
        id: 78,
        title: "[공지] 모라 LH 7월 3주차 투표 결과 공지",
        author: "관리자",
        date: "2024-07-18 18:00",
        views: "123,456,789",
        recommendations: 134,
      },
      {
        id: 78,
        title: "[공지] 모라 LH 7월 3주차 투표 결과 공지",
        author: "관리자",
        date: "2024-07-18 18:00",
        views: "123,456,789",
        recommendations: 134,
      },
      {
        id: 78,
        title: "[공지] 모라 LH 7월 3주차 투표 결과 공지",
        author: "관리자",
        date: "2024-07-18 18:00",
        views: "123,456,789",
        recommendations: 134,
      },
      {
        id: 78,
        title: "[공지] 모라 LH 7월 3주차 투표 결과 공지",
        author: "관리자",
        date: "2024-07-18 18:00",
        views: "123,456,789",
        recommendations: 134,
      },
      {
        id: 78,
        title: "[공지] 모라 LH 7월 3주차 투표 결과 공지",
        author: "관리자",
        date: "2024-07-18 18:00",
        views: "123,456,789",
        recommendations: 134,
      },
      {
        id: 78,
        title: "[공지] 모라 LH 7월 3주차 투표 결과 공지",
        author: "관리자",
        date: "2024-07-18 18:00",
        views: "123,456,789",
        recommendations: 134,
      },
      {
        id: 78,
        title: "[공지] 모라 LH 7월 3주차 투표 결과 공지",
        author: "관리자",
        date: "2024-07-18 18:00",
        views: "123,456,789",
        recommendations: 134,
      },
      {
        id: 78,
        title: "[공지] 모라 LH 7월 3주차 투표 결과 공지",
        author: "관리자",
        date: "2024-07-18 18:00",
        views: "123,456,789",
        recommendations: 134,
      },
    ];

    return (
      <div className="container mx-auto p-4 mt-3">
        <Sorting />
        <table className="min-w-full bg-white border table-fixed rounded-[20px] overflow-hidden">
          <thead>
            <tr className="w-full border-b text-customTextColor ">
              <th className="p-4 text-center">번호</th>
              <th className="p-4 text-center">제목</th>
              <th className="p-4 text-center">작성자</th>
              <th className="p-4 text-center">작성일</th>
              <th className="p-4 text-center">조회수</th>
              <th className="p-4 text-center">추천수</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="w-full border-b">
                <td className="p-4 text-center">{item.id}</td>
                <td className="p-4 text-center">{item.title}</td>
                <td className="p-4 text-center">{item.author}</td>
                <td className="p-4 text-center">{item.date}</td>
                <td className="p-4 text-center">{item.views}</td>
                <td className="p-4 text-center">{item.recommendations}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <button className="px-3 py-1 border rounded-l bg-gray-200">
            이전
          </button>
          <button className="px-3 py-1 border-t border-b border-r bg-gray-200">
            1
          </button>
          <button className="px-3 py-1 border-t border-b border-r bg-gray-200">
            2
          </button>
          <button className="px-3 py-1 border-t border-b border-r bg-gray-200">
            3
          </button>
          <button className="px-3 py-1 border rounded-r bg-gray-200">
            다음
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <MainSideBar />

      <div className="flex-1 bg-customBackgroundColor  ">
        <MainHeader />
        <CommunityCategories />
        <Table />
      </div>
    </div>
  );
};

export default Notice;
