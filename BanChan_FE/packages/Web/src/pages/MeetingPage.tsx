import React, { useEffect, useRef, useState } from "react";
import { OpenVidu, Session, Publisher } from "openvidu-browser";
import { useParams, useLocation } from "react-router-dom";
import ThumbnailPlayer from "../components/WebRTC/ThumbnailPlayer";
import VideoPlayer from "../components/WebRTC/VideoPlayer";
import ChatBox from "../components/WebRTC/ChatBox";

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
        </button>
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
  const location = useLocation();
  const { id: sessionId } = useParams<{ id: string }>(); // URL 파라미터를 가져옵니다
  const [session, setSession] = useState<Session | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [isChatBoxVisible, setIsChatBoxVisible] = useState<boolean>(false);

  const { title, date, startTime } = location.state as {
    title: string;
    date: string;
    startTime: string;
  };

  const videoRef = useRef<HTMLVideoElement>(null);
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
    if (!sessionId) {
      console.error("sessionId is undefined");
      return;
    }

    const OV = new OpenVidu();
    const mySession = OV.initSession();

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      subscriber.addVideoElement(videoRef.current);
    });

    const joinSession = async () => {
      try {
        const token = await createToken(sessionId);
        await mySession.connect(token, { clientData: "Host" });

        const publisher = OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: "640x480",
          frameRate: 30,
          insertMode: "APPEND",
          mirror: false,
        });

        mySession.publish(publisher);
        setPublisher(publisher);
        publisher.addVideoElement(videoRef.current);
      } catch (error) {
        console.error("Error connecting to session:", error);
      }
    };

    joinSession();
    setSession(mySession);

    return () => {
      if (mySession) mySession.disconnect();
    };
  }, [sessionId]);

  const createToken = async (sessionId: string): Promise<string> => {
    const response = await fetch(
      `http://localhost:8080/api/session/${sessionId}/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("OPENVIDUAPP:YOUR_SECRET"),
        },
      }
    );
    const data = await response.text();
    return data;
  };

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
    <div className="flex flex-col items-center justify-center h-screen bg-customTextColor">
      <h1 className="text-2xl mb-4">회의 ID: {title}</h1>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-[400px] bg-black"
      ></video>
      <ControlPanels
        onChatToggle={handleChatToggle}
        activeIcons={activeIcons}
        handleButtonClick={handleButtonClick}
      />
    </div>
  );
};

export default MeetingPage;
