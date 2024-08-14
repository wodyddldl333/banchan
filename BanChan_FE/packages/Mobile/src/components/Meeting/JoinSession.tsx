import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

const baseUrl = import.meta.env.VITE_BASE_API_URL;

const JoinSession = () => {
  const { sessionId } = useParams(); // URL에서 sessionId를 가져옴
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies();

  useEffect(() => {
    const createTokenAndRedirect = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}/api/session/${sessionId}/token`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies.Token}`,
            },
          }
        );
        const token = response.data;

        // 토큰이 생성되면 세션 페이지로 리다이렉트
        window.location.href = `https://i11e105.p.ssafy.io/m/meetingHome/${sessionId}?token=${token}`;
      } catch (error) {
        console.error("Failed to generate token", error);
        Swal.fire({
          title: "Error",
          text: "Failed to generate token.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setLoading(false);
      }
    };

    createTokenAndRedirect();
  }, [sessionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return null; // 로딩 중일 때는 아무것도 렌더링하지 않음
};

export default JoinSession;
