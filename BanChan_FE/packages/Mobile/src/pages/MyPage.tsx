import React, { useState } from "react";
import { Link } from "react-router-dom";

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [apartmentCode, setApartmentCode] = useState("우리집");
  const [dongHo, setDongHo] = useState("동/호수");
  const [phoneNumber, setPhoneNumber] = useState("010-1234-5678");
  const [linkedAccount, setLinkedAccount] = useState("연동된 계정");
  const [name, setName] = useState("이름");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div
        className="w-full max-w-md p-8 bg-white shadow-md rounded-md h-screen"
        style={{ height: "800px" }}
      >
        <div className="flex items-center justify-between bg-blue-500 w-full py-2 fixed top-0 left-0">
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-white">내 정보</h2>
          <div className=""></div>
          <div className="relative">
            <button
              onClick={handleMenuToggle}
              className="text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <Link
                  to="/mypage"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  마이페이지
                </Link>
                <Link
                  to="/community"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  커뮤니티
                </Link>
                <Link
                  to="/vote"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  투표
                </Link>
                <Link
                  to="/meeting"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  회의
                </Link>
              </div>
            )}
          </div>
        </div>
        <form className="mt-[70px]" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="apartmentCode"
              className="block text-sm font-medium text-gray-600"
            >
              우리집
            </label>
            {isEditing ? (
              <input
                type="text"
                value={apartmentCode}
                onChange={(e) => setApartmentCode(e.target.value)}
                className="block w-full px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"
              />
            ) : (
              <div className="block w-full px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none">
                {apartmentCode}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="dongHo"
              className="block text-sm font-medium text-gray-600"
            >
              동/호수
            </label>
            {isEditing ? (
              <input
                type="text"
                value={dongHo}
                onChange={(e) => setDongHo(e.target.value)}
                className="block w-full px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"
              />
            ) : (
              <div className="block w-full px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none">
                {dongHo}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-600"
            >
              휴대폰 번호
            </label>
            {isEditing ? (
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="block w-full px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"
              />
            ) : (
              <div className="block w-full px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none">
                {phoneNumber}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="linkedAccount"
              className="block text-sm font-medium text-gray-600"
            >
              연동된 계정
            </label>
            {isEditing ? (
              <input
                type="text"
                value={linkedAccount}
                onChange={(e) => setLinkedAccount(e.target.value)}
                className="block w-full px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"
              />
            ) : (
              <div className="block w-full px-4 text-[14px] py-4 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none">
                {linkedAccount}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              이름
            </label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 text-[14px] py-4 mt-2 mb-[100px] border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"
              />
            ) : (
              <div className="block w-full px-4 text-[14px] py-4 mt-2 mb-[100px] border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none">
                {name}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="fixed bottom-0 left-0 right-0 w-full py-4 font-semibold text-white bg-blue-500 rounded-t-xl hover:bg-blue-600"
          >
            {isEditing ? "수정 완료" : "수정하기"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyPage;
