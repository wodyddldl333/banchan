// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const baseUrl = import.meta.env.VITE_BASE_API_URL;

// const SessionJoinPage: React.FC = () => {
//   const [sessionId, setSessionId] = useState<string | undefined>(undefined);
//   const [roomName, setRoomName] = useState<string | undefined>(undefined); // roomName 상태 추가
//   const navigate = useNavigate();
//   const { sessionId: sessionIdFromUrl } = useParams<{ sessionId: string }>(); // URL에서 sessionId 추출

//   useEffect(() => {
//     if (sessionIdFromUrl) {
//       console.log("Extracted sessionId from URL:", sessionIdFromUrl);
//       setSessionId(sessionIdFromUrl); // sessionId를 URL에서 가져와 상태로 설정
//       fetchRoomName(sessionIdFromUrl); // roomName 가져오기
//     } else {
//       console.error("No sessionId found in URL.");
//     }
//   }, [sessionIdFromUrl]);

//   const fetchRoomName = async (sessionId: string) => {
//     try {
//       const roomNameResponse = await axios.get(
//         `${baseUrl}/api/session/get/roomName/${sessionId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const roomName = roomNameResponse.data.roomName;
//       setRoomName(roomName); // roomName 상태 설정
//     } catch (error) {
//       console.error("Error fetching room name:", error);
//     }
//   };

//   const handleJoinSession = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!sessionId) {
//       console.error("Session ID is missing.");
//       return;
//     }

//     try {
//       const { token } = await createToken(sessionId);

//       console.log("Token created: ", token); // Token 확인 로그

//       navigate(`/m/meetingHome/${sessionId}`, {
//         state: { token, sessionId, roomName },
//       });
//     } catch (error) {
//       console.error("Error joining session:", error);
//     }
//   };

//   const createToken = async (sessionId: string): Promise<{ token: string }> => {
//     const response = await axios.post(
//       `${baseUrl}/api/session/${sessionId}/token`,
//       {},
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const token = response.data;
//     return { token };
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-[330px] max-w-md">
//         <h2 className="text-2xl font-bold mb-6">회의명:</h2>
//         <p> {roomName ? roomName : "로딩 중..."}</p>

//         <form onSubmit={handleJoinSession}>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
//           >
//             회의에 참가하시겠습니까?
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SessionJoinPage;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_API_URL;

const SessionJoinPage: React.FC = () => {
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [roomName, setRoomName] = useState<string | undefined>(undefined); // roomName 상태 추가
  const [isJoining, setIsJoining] = useState<boolean>(false); // 중복 클릭 방지 상태 추가
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  ); // 에러 메시지 상태 추가
  const navigate = useNavigate();
  const { sessionId: sessionIdFromUrl } = useParams<{ sessionId: string }>(); // URL에서 sessionId 추출

  useEffect(() => {
    if (sessionIdFromUrl) {
      console.log("Extracted sessionId from URL:", sessionIdFromUrl);
      setSessionId(sessionIdFromUrl); // sessionId를 URL에서 가져와 상태로 설정
      fetchRoomName(sessionIdFromUrl); // roomName 가져오기
    } else {
      console.error("No sessionId found in URL.");
    }
  }, [sessionIdFromUrl]);

  const fetchRoomName = async (sessionId: string) => {
    try {
      const roomNameResponse = await axios.get(
        `${baseUrl}/api/session/get/roomName/${sessionId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const roomName = roomNameResponse.data.roomName;
      setRoomName(roomName); // roomName 상태 설정
    } catch (error) {
      console.error("Error fetching room name:", error);
    }
  };

  const handleJoinSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionId || isJoining) {
      return; // 중복 클릭 방지
    }

    setIsJoining(true);
    setErrorMessage(undefined);

    try {
      const { token } = await createToken(sessionId);

      console.log("Token created: ", token); // Token 확인 로그

      navigate(`/m/meetingHome/${sessionId}`, {
        state: { token, sessionId, roomName },
      });
    } catch (error) {
      console.error("Error joining session:", error);
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setErrorMessage("이미 생성된 세션이 존재합니다. 다시 시도해 주세요.");
      } else {
        setErrorMessage("세션 참가 중 오류가 발생했습니다.");
      }
    } finally {
      setIsJoining(false);
    }
  };

  const createToken = async (sessionId: string): Promise<{ token: string }> => {
    const response = await axios.post(
      `${baseUrl}/api/session/${sessionId}/token`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const token = response.data;
    return { token };
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[330px] max-w-md">
        <h2 className="text-2xl mb-6">
          <span className="font-bold">회의명:</span>{" "}
          {roomName ? (
            <span className="font-normal">{roomName}</span>
          ) : (
            "로딩 중..."
          )}
        </h2>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <form onSubmit={handleJoinSession}>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={isJoining} // 중복 클릭 방지
          >
            {isJoining ? "참가 중..." : "회의에 참가하시겠습니까?"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SessionJoinPage;
