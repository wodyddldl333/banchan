import React, { useEffect, useState, useRef } from "react";
// import {
//   OpenVidu,
//   Session,
//   Publisher,
//   StreamManager,
//   StreamEvent,
// } from "openvidu-browser";

interface OpenViduSessionProps {
  sessionId: string;
  userName: string;
  setActiveSpeaker: (stream: MediaStream | null) => void;
  setRemoteStreams: (streams: MediaStream[]) => void;
}

const OpenViduSession: React.FC<OpenViduSessionProps> = ({
  sessionId,
  userName,
  setActiveSpeaker,
  setRemoteStreams,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<StreamManager[]>([]);
  const OV = useRef<OpenVidu>(new OpenVidu());

  useEffect(() => {
    window.addEventListener("beforeunload", leaveSession);

    return () => {
      window.removeEventListener("beforeunload", leaveSession);
      leaveSession();
    };
  }, []);

  const joinSession = () => {
    const mySession = OV.current.initSession();
    setSession(mySession);

    mySession.on("streamCreated", (event: StreamEvent) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
      setRemoteStreams((prevStreams) => [
        ...prevStreams,
        event.stream.getMediaStream(),
      ]);
    });

    mySession.on("streamDestroyed", (event: StreamEvent) => {
      setSubscribers((prevSubscribers) =>
        prevSubscribers.filter((sub) => sub !== event.stream.streamManager)
      );
      setRemoteStreams((prevStreams) =>
        prevStreams.filter((stream) => stream !== event.stream.getMediaStream())
      );
    });

    getToken().then((token) => {
      mySession
        .connect(token, { clientData: userName })
        .then(() => {
          console.log(token, session);
          const publisher = OV.current.initPublisher(undefined, {
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
          setActiveSpeaker(publisher.stream.getMediaStream());
        })
        .catch((error) => {
          console.error(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    OV.current = new OpenVidu();
    setSession(null);
    setSubscribers([]);
    setPublisher(null);
    setActiveSpeaker(null);
    setRemoteStreams([]);
  };

  const getToken = async (): Promise<string> => {
    const response = await fetch("http://localhost:8080/api/session", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa("OPENVIDUAPP:YOUR_SECRET"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customSessionId: sessionId }),
    });
    const sessionIdData = await response.json();

    const tokenResponse = await fetch(
      `http://localhost:8080/api/session/${sessionIdData.id}/token`,
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa("OPENVIDUAPP:YOUR_SECRET"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    const tokenData = await tokenResponse.json();

    return tokenData.token;
  };

  return (
    <div>
      <button onClick={joinSession}>Join</button>
      <button onClick={leaveSession}>Leave</button>

      {publisher && (
        <div>
          <h3>Publisher</h3>
          <div
            id="publisher"
            ref={(ref) => ref && publisher.addVideoElement(ref)}
          />
        </div>
      )}

      {subscribers.length > 0 && (
        <div>
          <h3>Subscribers</h3>
          {subscribers.map((sub, index) => (
            <div
              key={index}
              id="subscriber"
              ref={(ref) => ref && sub.addVideoElement(ref)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OpenViduSession;
