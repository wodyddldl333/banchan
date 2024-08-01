import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const CreateMeeting: React.FC = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");

  const navigate = useNavigate();

  const createSession = async (): Promise<string> => {
    const response = await axios.post("http://localhost:8080/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("OPENVIDUAPP:YOUR_SECRET"),
      },
      body: JSON.stringify({ customSessionId: title }),
    });

    return response.data;
  };

  const handleCreateMeeting = async () => {
    const sessionId = await createSession();
    navigate(`/meetingPage/${sessionId}`, {
      state: { title, date, startTime },
    });
  };

  return (
    <div className=" flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md  mt-[200px]">
        <h2 className="text-2xl font-bold mb-6">회의 생성</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              제목
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              날짜
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-700"
            >
              시작 시간
            </label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <Link to="/meetingPage">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleCreateMeeting}
            >
              생성 완료
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateMeeting;
