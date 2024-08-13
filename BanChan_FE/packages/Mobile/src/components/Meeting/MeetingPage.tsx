import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  OpenVidu,
  Session,
  Publisher,
  Subscriber,
  StreamEvent,
  // SignalEvent,
} from "openvidu-browser";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { IconName, LocationState } from "../../Types";
import { useCookies } from "react-cookie";
import ControlPanels from "./ControlPanels";
import SubscriberList from "./SubscribeList";
import ThumbnailPlayer from "./ThumbnailPlayer";
// import ChatBox from "../components/WebRTC/ChatBox";

const baseUrl = import.meta.env.VITE_BASE_API_URL;

const MeetingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const { id: sessionId } = useParams<{ id: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isChatBoxVisible, setIsChatBoxVisible] = useState<boolean>(false);
  console.log(sessionId);
  // const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);

  const [thumbnailPlayer, setThumbnailPlayer] = useState<
    Publisher | Subscriber | null
  >(null);
  // const [recordingId, setRecordingId] = useState<string | null>(null);
  // const [stopRecordingRequest, setStopRecordingRequest] = useState(false);

  const { token, roomName } = location.state as LocationState;

  const subscriberStreams = useRef<Set<string>>(new Set());
  const [activeIcons, setActiveIcons] = useState<Record<IconName, boolean>>({
    record_voice_over: false,
    mic: false,
    videocam: false,
    headset_mic: false,
    exit_to_app: false,
    book: false,
    group: false,
    chat_bubble: false,
    notifications: false,
    radio_button_checked: false,
    radio_button_unchecked: false,
    mail: false,
  });

  const joinSession = useCallback(
    async (mySession: Session, token: string) => {
      try {
        if (!token || !sessionId) {
          console.error("SessionId or token is undefined");
          return;
        }

        await mySession.connect(token, { clientData: "Host" });

        const OV = new OpenVidu();
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

        await mySession.publish(publisher);
        setPublisher(publisher);
        setThumbnailPlayer(publisher);

        setActiveIcons((prevState) => ({
          ...prevState,
          videocam: publisher.stream.videoActive,
          mic: publisher.stream.audioActive,
        }));

        // mySession.on("signal:chat", (event: SignalEvent) => {
        //   if (event.data) {
        //     // event.data가 undefined가 아닌지 확인
        //     const newMessage = {
        //       id: Date.now(),
        //       text: event.data,
        //     };
        //     setMessages((prevMessages) => [...prevMessages, newMessage]);
        //   } else {
        //     console.error("Received an undefined message");
        //   }
        // });

        console.log("Publisher added to session");
      } catch (error: unknown) {
        console.error("Error connecting to session:", error);

        if (
          error instanceof Error &&
          error.message.includes("Token not valid")
        ) {
          console.log("Token expired, requesting a new token...");
          try {
            const response = await axios.get(
              `${baseUrl}/api/session/newToken/${sessionId}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${cookies.Token}`,
                },
              }
            );

            const newToken = response.data.token;
            console.log("Received new token:", newToken);

            await joinSession(mySession, newToken);
          } catch (tokenError) {
            console.error("Error requesting new token:", error);
          }
        }
      }
    },
    [sessionId, cookies.Token]
  );

  useEffect(() => {
    const initSession = async () => {
      try {
        if (!sessionId || !token) {
          console.error("sessionId or token is undefined");
          return;
        }

        const OV = new OpenVidu();
        const mySession = OV.initSession();

        const streamCreatedHandler = (event: StreamEvent) => {
          if (!subscriberStreams.current.has(event.stream.streamId)) {
            subscriberStreams.current.add(event.stream.streamId);
            const subscriber = mySession.subscribe(event.stream, undefined);
            setSubscribers((prevSubscribers) => [
              ...prevSubscribers,
              subscriber,
            ]);
          }
        };

        const streamDestroyedHandler = (event: StreamEvent) => {
          subscriberStreams.current.delete(event.stream.streamId);
          setSubscribers((prevSubscribers) =>
            prevSubscribers.filter(
              (subscriber) =>
                subscriber.stream.streamId !== event.stream.streamId
            )
          );
        };

        mySession.on("streamCreated", streamCreatedHandler);
        mySession.on("streamDestroyed", streamDestroyedHandler);

        await joinSession(mySession, token);
        setSession(mySession);
      } catch (error) {
        console.error("Error initializing session:", error);
      }
    };

    initSession();

    return () => {
      if (session) {
        session.off("streamCreated");
        session.off("streamDestroyed");
        session.disconnect();
        setSubscribers([]);
        subscriberStreams.current.clear();
      }
    };
  }, [sessionId, token, joinSession]);

  const deleteSession = async (sessionId: string): Promise<void> => {
    try {
      await axios.delete(`${baseUrl}/api/session/delete/${sessionId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.Token}`,
        },
      });
      navigate("/meeting/reservedMeeting");
    } catch (error) {
      console.error(`Error deleting session ${sessionId}:`, error);
    }
  };

  // const sendMessage = (message: string) => {
  //   if (session) {
  //     session.signal({
  //       data: message,
  //       type: "chat",
  //     });
  //   }
  // };

  const handleChatToggle = () => {
    setIsChatBoxVisible((prevState) => !prevState);
  };

  const handleButtonClick = (icon: IconName) => {
    console.log("handleButtonClick triggered with icon:", icon);
    if (icon === "chat_bubble") {
      handleChatToggle();
      setActiveIcons((prevState) => ({
        ...prevState,
        [icon]: !prevState[icon],
      }));
    } else if (icon === "exit_to_app") {
      if (session) {
        session.disconnect();
        deleteSession(sessionId!);
      } else {
        console.error("Session is null or undefined.");
      }
    } else if (icon === "videocam") {
      if (publisher) {
        const newPublishVideo = !activeIcons.videocam;
        publisher.publishVideo(newPublishVideo);
        setActiveIcons((prevState) => ({
          ...prevState,
          videocam: newPublishVideo,
        }));
      }
    } else if (icon === "mic") {
      if (publisher) {
        const newPublishMic = !activeIcons.mic;
        publisher.publishAudio(newPublishMic);
        setActiveIcons((prevState) => ({
          ...prevState,
          mic: newPublishMic,
        }));
      }
    } else {
      setActiveIcons((prevState) => ({
        ...prevState,
        [icon]: !prevState[icon],
      }));
    }
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="bg-[#4285F4] opacity-70 absolute inset-0"></div>
      <div className="relative flex flex-col w-full h-screen">
        {/* 최상단에 회의명을 배치 */}
        {roomName && (
          <div className="w-full h-10 flex items-center justify-center bg-gray-800 text-white">
            <h1 className="text-xl">회의명: {roomName}</h1>
          </div>
        )}

        {/* 나머지 콘텐츠 */}
        <div
          className={`flex ${
            isChatBoxVisible ? "justify-between" : "justify-center"
          } items-center w-full h-full`}
        >
          <div
            className={`flex flex-col items-center justify-center ${
              isChatBoxVisible ? "w-3/4" : "w-full"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="flex justify-center items-center mb-4">
                {thumbnailPlayer && (
                  <ThumbnailPlayer
                    stream={thumbnailPlayer.stream?.getMediaStream() ?? null}
                  />
                )}
              </div>
              <SubscriberList subscribers={subscribers} />
            </div>
            <ControlPanels
              onChatToggle={handleChatToggle}
              activeIcons={activeIcons}
              handleButtonClick={handleButtonClick}
            />
          </div>
          {/* {isChatBoxVisible && (
            <div className="w-[24%] h-full">
              <ChatBox messages={messages} onSendMessage={sendMessage} />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default MeetingPage;
