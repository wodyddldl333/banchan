import LargeButton from "../Buttons/LargeButton";
import Pagination from "../Pagination";
import Table from "../Table";
import SmallButton from "../Buttons/SmallButton";
import Nav from "../Nav";
import NavItem from "../NavItem";
import { Link } from "react-router-dom";
// import axios from "axios";

const NavElements = () => {
  return (
    <Nav>
      <NavItem to="/meeting/reservedmeeting" label="예약된 회의" />
      <NavItem to="/meeting/finishedmeeting" label="종료된 회의" />
    </Nav>
  );
};

const ReservedMeeting = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const { title, date, startTime } = location.state || {};
  // const [meetings, setMeetings] = useState([]);

  //  useEffect(() => {
  //    const fetchMeetings = async () => {
  //      try {
  //        const response = await axios.get("http://localhost:8080/api/meetings");
  //        setMeetings(response.data);
  //      } catch (error) {
  //        console.error("Error fetching meetings:", error);
  //      }
  //    };

  //    fetchMeetings();
  //  }, []);

  // const createSession = async (): Promise<string> => {
  //   const response = await axios.post(
  //     "http://ec2-54-66-234-44.ap-southeast-2.compute.amazonaws.com:8080/api/session",

  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Basic " + btoa("OPENVIDUAPP:YOUR_SECRET"),
  //       },
  //     }
  //   );

  //   return response.data;
  // };

  // const handleActivateMeeting = async () => {
  //   const sessionId = await createSession();
  //   navigate(`/meetingpage/${sessionId}`, {
  //     state: { title, date, startTime },
  //   });
  // };

  const startMeeting = () => {
    return (
      <SmallButton
        title="회의 활성화"
        bgColor="bg-white"
        txtColor=""
        borderColor="border-customGreen"
        // onClick={handleActivateMeeting}
      />
    );
  };

  const sendNoti = () => {
    return (
      <SmallButton
        title="알림 보내기"
        bgColor="bg-white"
        txtColor=""
        borderColor="border-customYellow"
      />
    );
  };

  const headers = ["번호", "제목", "주최자", "회의 예정시각", "활성화", "알림"];

  const data = [
    [
      1,
      "LH 7월 4주차 정기회의",
      "관리자",
      "2022-07-27 16:00",
      startMeeting(),
      sendNoti(),
    ],
  ];

  // const data = meetings.map((meeting, index) => [
  //   index + 1,
  //   meeting.title,
  //   "관리자",
  //   `${meeting.date} ${meeting.startTime}`,
  //   startMeeting(meeting),
  //   sendNoti(),
  // ]);

  return (
    <>
      <NavElements />
      <div className="container mx-auto p-4 mt-3">
        <div className="flex justify-end items-center mb-6 mr-6">
          <Link to="/meeting/createmeeting">
            <LargeButton title="회의 생성" />
          </Link>
        </div>
        <Table headers={headers} data={data} />
        <Pagination />
      </div>
    </>
  );
};

export default ReservedMeeting;
