import React, { useEffect, useState } from "react";
import bgImage from "@assets/Mobile_main.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useCookies } from "react-cookie";

interface UserApartment {
  id: number;
  buildingNo: string;
  unitNo: string;
  granted: boolean;
}

interface UserInfo {
  realname: string;
  phone: string;
  userApartments: UserApartment[];
}

const items = [
  { icon: "person", text: "마이페이지", to: "/m/mypage" },
  { icon: "forum", text: "커뮤니티", to: "/m/community" },
  { icon: "how_to_vote", text: "투표", to: "/m/vote" },
  { icon: "calendar_today", text: "회의", to: "/m/meetingList" },
];

const announcements = [
  {
    title: "[공지] 모라 LH 7월 3주차 투표 결과 공지",
    date: "2024.07.17",
  },
  {
    title: "[공지] 단지 내 공사 관련 공지",
    date: "2024.06.28",
  },
];

const Home: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();
  const [cookies] = useCookies(["refreshToken"]);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const ensureValidAccessToken = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const tokenExpiry = Number(localStorage.getItem("tokenExpiry"));
    const now = new Date().getTime();

    if (!accessToken || !tokenExpiry || now >= tokenExpiry) {
      try {
        const response = await axios.post(
          `${API_URL}/api/auth/token/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${cookies.refreshToken}`,
            },
            withCredentials: true,
          }
        );

        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("tokenExpiry", String(now + response.data.expiresIn * 1000));
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error("토큰 갱신 오류:", error.message);
        } else {
          console.error("토큰 갱신 오류:", error);
        }
        navigate("/m");
      }
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        await ensureValidAccessToken();
        const response = await axios.get(`${API_URL}/api/user/myinfo`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const userData: UserInfo = response.data;
        setUserInfo(userData);

        if (
          !userData ||
          !userData.realname ||
          !userData.phone ||
          (userData.userApartments && userData.userApartments.length === 0)
        ) {
          navigate("/m/mypage");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error("Error fetching user info:", error.message);
          if (error.response?.status === 403) {
            navigate("/m");
          }
        } else {
          console.error("Error fetching user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const gotoHomeInfo = () => {
    navigate("/m/homeInfo");
  };

  const userAPT = userInfo?.userApartments?.length ? 1 : 0;

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="relative w-[360px] h-[450px]">
        <img
          src={bgImage}
          alt="Mobile Main"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center">
          <span className="text-white text-2xl font-bold">반상회 CHANnel</span>
        </div>
      </div>

      <div className="relative w-[320px] h-[120px] mt-[-50px] flex bg-[#F0F8FF] border rounded-[20px] justify-center items-center z-10">
        {items.map((item) => (
          <NavLink
            key={item.text}
            to={item.to}
            className="flex flex-col items-center mx-3 text-blue-600"
          >
            <span className="material-symbols-outlined text-[40px] mb-[10px]">
              {item.icon}
            </span>
            <span className="mt-2 text-[14px] font-semibold text-black">
              {item.text}
            </span>
          </NavLink>
        ))}
      </div>

      <div className="relative w-[320px] h-[160px] mt-[30px] flex flex-col bg-[#F0F8FF] border rounded-[20px] justify-center items-center z-10 font-semibold">
        {userAPT === 0 ? (
          <>
            <div>세대 정보 기입 이후 정상 이용이 가능합니다. </div>
            <button
              onClick={gotoHomeInfo}
              className="w-[250px] mt-[30px] h-[60px] border rounded-2xl text-white bg-blue-600"
            >
              세대 정보 추가
            </button>
          </>
        ) : (
          <div className="relative w-[320px] p-4 bg-[#F0F8FF] border rounded-[10px]">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg">공지사항</span>
              <NavLink to="/more" className="text-gray-500">
                더보기
              </NavLink>
            </div>
            {announcements.map((announcement, index) => (
              <div key={index} className="mb-2">
                <div className="font-semibold text-black">
                  {announcement.title}
                </div>
                <div className="text-gray-500 text-sm">
                  {announcement.date}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
