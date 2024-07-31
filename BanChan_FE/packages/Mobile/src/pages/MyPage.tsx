const MyPage = () => {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <div
        className="w-full max-w-md p-8  bg-white shadow-md rounded-md h-screen "
        style={{ height: "800px" }}
      >
        <div className="flex items-center justify-between">
          <button className="text-gray-600">
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
          <h2 className="text-xl font-bold text-gray-800">내정보 확인</h2>
          <div className=""></div>
        </div>
        <form className="mt-[70px]">
          <div>
            <label
              htmlFor="apartmentCode"
              className="block text-sm font-medium text-gray-600"
            >
              우리집
            </label>
            <div className="block w-full px-4 text-[14px] py-6 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"></div>
          </div>
          <div>
            <label
              htmlFor="apartmentCode"
              className="block text-sm font-medium text-gray-600"
            >
              동/호수
            </label>
            <div className="block w-full px-4 text-[14px] py-6 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"></div>
          </div>
          <div>
            <label
              htmlFor="dongho"
              className="block text-sm font-medium text-gray-600"
            >
              휴대폰 번호
              <div className="block w-full px-4 text-[14px] py-6 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"></div>
            </label>
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-600"
            >
              연동된 계정
            </label>
            <div className="block w-full px-4 text-[14px] py-6 mt-2 mb-10 border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"></div>
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-600"
            >
              이름
            </label>
            <div className="block w-full px-4 text-[14px] py-6 mt-2 mb-[100px] border rounded-xl shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:outline-none"></div>
          </div>
          <button
            type="submit"
            className="fixed bottom-0 left-0 right-0 w-full py-4 font-semibold text-white bg-blue-500 rounded-t-xl hover:bg-blue-600"
          >
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyPage;
