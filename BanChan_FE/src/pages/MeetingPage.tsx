import React, { useEffect, useRef, useState } from "react";
import ThumbnailPlayer from "../components/WebRTC/ThumbnailPlayer";
import VideoPlayer from "../components/WebRTC/VideoPlayer";
import ChatBox from "../components/WebRTC/ChatBox"; // 올바른 경로로 수정

type IconName =
  | "record_voice_over"
  | "mic_off"
  | "videocam_off"
  | "screen_share"
  | "mic_off2"
  | "exit_to_app"
  | "book"
  | "group"
  | "chat_bubble"
  | "notifications";

const ControlPanels: React.FC<{
  onChatToggle: () => void;
  activeIcons: Record<IconName, boolean>;
  handleButtonClick: (icon: IconName) => void;
}> = ({ onChatToggle, activeIcons, handleButtonClick }) => {
  return (
    <div className="px-4 flex items-center mt-4">
      <div className="flex space-x-8 ml-[210px]">
        <button
          className="bg-gray-800 text-white flex items-center px-4 py-2 rounded-full"
          onClick={() => handleButtonClick("record_voice_over")}
        >
          <span
            className={`material-symbols-outlined ${
              activeIcons.record_voice_over ? "text-customRed" : "text-white"
            }`}
          >
            record_voice_over
          </span>
          <span className="ml-2">발언권 요청</span>
        </button>
        <button
          className="bg-gray-800 text-white flex items-center px-4 py-2 rounded-full"
          onClick={() => handleButtonClick("mic_off")}
        >
          <span
            className={`material-symbols-outlined ${
              activeIcons.mic_off ? "text-customRed" : "text-white"
            }`}
          >
            mic_off
          </span>
          <span className="ml-2">마이크 시작</span>
        </button>
        <button
          className="bg-gray-800 text-white flex items-center px-4 py-2 rounded-full"
          onClick={() => handleButtonClick("videocam_off")}
        >
          <span
            className={`material-symbols-outlined ${
              activeIcons.videocam_off ? "text-customRed" : "text-white"
            }`}
          >
            videocam_off
          </span>
          <span className="ml-2">비디오 시작</span>
        </button>
        <button
          className="bg-gray-800 text-white flex items-center px-4 py-2 rounded-full"
          onClick={() => handleButtonClick("screen_share")}
        >
          <span
            className={`material-symbols-outlined ${
              activeIcons.screen_share ? "text-customRed" : "text-white"
            }`}
          >
            screen_share
          </span>
          <span className="ml-2">화면 공유</span>
        </button>
        <button
          className="bg-gray-800 text-white flex items-center px-4 py-2 rounded-full"
          onClick={() => handleButtonClick("mic_off2")}
        >
          <span
            className={`material-symbols-outlined ${
              activeIcons.mic_off2 ? "text-customRed" : "text-white"
            }`}
          >
            mic_off
          </span>
          <span className="ml-2">음소거 해제</span>
        </button>
        <button
          className="bg-red-500 text-white flex items-center px-4 py-2 rounded-full"
          onClick={() => handleButtonClick("exit_to_app")}
        >
          <span className={`material-symbols-outlined`}>exit_to_app</span>
          <span className="ml-2">회의 나가기</span>
        </button>{" "}
      </div>

      <div className="flex space-x-10 ml-[100px]">
        <span className="cursor-pointer material-symbols-outlined text-white">
          book
        </span>
        <span className="cursor-pointer material-symbols-outlined text-white">
          group
        </span>
        <span
          className={`cursor-pointer material-symbols-outlined ${
            activeIcons.chat_bubble ? "text-blue-500" : "text-white"
          }`}
          onClick={() => handleButtonClick("chat_bubble")}
        >
          chat_bubble
        </span>
        <div className="relative">
          <span className="cursor-pointer material-symbols-outlined text-yellow-500">
            notifications
          </span>
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            1
          </span>
        </div>
      </div>
    </div>
  );
};

const MeetingPage: React.FC = () => {
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRefs = useRef<(MediaStream | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [activeSpeaker, setActiveSpeaker] = useState<MediaStream | null>(null);
  const [isChatBoxVisible, setIsChatBoxVisible] = useState<boolean>(false);
  const [activeIcons, setActiveIcons] = useState<Record<IconName, boolean>>({
    record_voice_over: false,
    mic_off: false,
    videocam_off: false,
    screen_share: false,
    mic_off2: false,
    exit_to_app: false,
    book: false,
    group: false,
    chat_bubble: false,
    notifications: false,
  });

  useEffect(() => {
    // 더미 비디오 스트림 생성
    const createDummyStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      localStreamRef.current = stream;
      remoteStreamRefs.current = [stream, stream, stream, stream]; // 4개의 더미 스트림
      setActiveSpeaker(stream); // 첫 번째 스트림을 활성 화자로 설정
    };

    createDummyStream();

    return () => {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      remoteStreamRefs.current.forEach((stream) =>
        stream?.getTracks().forEach((track) => track.stop())
      );
    };
  }, []);

  const handleChatToggle = () => {
    setIsChatBoxVisible((prevState) => !prevState);
  };

  const handleButtonClick = (icon: IconName) => {
    if (icon === "chat_bubble") {
      handleChatToggle();
      setActiveIcons((prevState) => ({
        ...prevState,
        [icon]: !prevState[icon],
      }));
    } else {
      setActiveIcons((prevState) => ({
        ...prevState,
        [icon]: !prevState[icon],
      }));
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 relative">
      <header className="bg-customWebRTCHeader-light text-black p-2">
        <h1 className="text-center text-2xl">회의명 : LH 7월 3주차 정기회의</h1>
      </header>
      <main className="flex flex-grow">
        <div
          className={`flex flex-col h-full bg-customWebRTCBackground p-4 transition-all duration-300 ${
            isChatBoxVisible ? "w-11/12" : "w-full"
          }`}
        >
          <div className="flex items-center justify-center mb-6 w-full mt-6">
            {activeSpeaker && (
              <VideoPlayer
                stream={activeSpeaker}
                className="w-2/3 h-full max-h-[55vh] bg-black rounded-lg"
              />
            )}
          </div>
          <div className="flex justify-center w-full">
            {remoteStreamRefs.current.map((stream, index) => (
              <ThumbnailPlayer
                key={index}
                stream={stream}
                className="w-1/4 max-w-[30%] bg-black rounded-lg m-6"
              />
            ))}
          </div>
          <ControlPanels
            onChatToggle={handleChatToggle}
            activeIcons={activeIcons}
            handleButtonClick={handleButtonClick}
          />
        </div>
        {isChatBoxVisible && (
          <div className="h-full w-1/4 bg-white z-50">
            <ChatBox />
          </div>
        )}
      </main>
    </div>
  );
};

export default MeetingPage;
