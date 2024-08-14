import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_API_URL;

const SessionJoinPage: React.FC = () => {
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [roomName, setRoomName] = useState<string | undefined>(undefined); // roomName 상태 추가
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
    if (!sessionId) {
      console.error("Session ID is missing.");
      return;
    }

    try {
      const { token } = await createToken(sessionId);

      console.log("Token created: ", token); // Token 확인 로그

      navigate(`/m/meetingHome/${sessionId}`, {
        state: { token, sessionId, roomName },
      });
    } catch (error) {
      console.error("Error joining session:", error);
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
        <h2 className="text-2xl font-bold mb-6">
          회의명: {roomName ? roomName : "로딩 중..."}
        </h2>
        <form onSubmit={handleJoinSession}>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            회의에 참가하시겠습니까?
          </button>
        </form>
      </div>
    </div>
  );
};

export default SessionJoinPage;
