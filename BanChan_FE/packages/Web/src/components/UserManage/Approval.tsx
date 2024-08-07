import React from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import Pagination from "../Pagination";
import Table from "../Table";
import Nav from "../Nav";
import NavItem from "../NavItem";
import SmallButton from "../Buttons/SmallButton";

const approve = (handleApprove: () => void) => {
  return (
    <SmallButton
      title="승인"
      bgColor="bg-white"
      txtColor="text-customBlue"
      borderColor="border-customBlue"
      onClick={handleApprove}
    />
  );
};

const reject = (handleReject: () => void) => {
  return (
    <SmallButton
      title="거절"
      bgColor="bg-white"
      txtColor="text-customRed"
      borderColor="border-customRed"
      onClick={handleReject}
    />
  );
};

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  date: string;
  address: string;
}

const headers = ["번호", "이름", "연락처", "이메일", "신청일", "동/호수", "승인", "거절"];
const data: User[] = [
  {
    id: 1,
    name: "김싸피",
    phone: "010-1231-4567",
    email: "aaa@aaa.com",
    date: "2022-01-01",
    address: "101동/1102호",
  },
  {
    id: 2,
    name: "이싸피",
    phone: "010-1111-2222",
    email: "bbb@bb.com",
    date: "2022-01-02",
    address: "101동/505호",
  },
  {
    id: 3,
    name: "박싸피",
    phone: "010-2222-3333",
    email: "ccc@ccc.com",
    date: "2022-01-02",
    address: "101동/1234호",
  },
  {
    id: 4,
    name: "최싸피",
    phone: "010-6666-6666",
    email: "ddd@ddd.com",
    date: "2022-01-02",
    address: "101동/1232호",
  },
  {
    id: 5,
    name: "김아무개",
    phone: "010-5555-5555",
    email: "fff@fff.com",
    date: "2022-01-02",
    address: "101동/7894호",
  },
];

const NavElements = () => {
  return (
    <Nav>
      <NavItem to="/userManage/approval" label="신규 승인대기" />
      <NavItem to="/userManage/manage" label="입주민 관리" />
    </Nav>
  );
};

const Approval: React.FC = () => {
  const navigate = useNavigate();

  const handleApprove = async (user: User) => {
    try {
      // 주석 처리된 API 호출 부분 - 배포할 땐 저거 주석 해제하고 보내면 될 듯 - get으로 해야되나?
      // await axios.post(`/api/admin/users/approval/${encodeURIComponent(user.name)}`);
      navigate("/userManage/manage", { state: { user } });
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleReject = (id: number) => {
    console.log(`User with ID ${id} rejected.`);
  };

  const rows = data.map(user => [
    user.id,
    user.name,
    user.phone,
    user.email,
    user.date,
    user.address,
    approve(() => handleApprove(user)),
    reject(() => handleReject(user.id)),
  ]);

  return (
    <>
      <NavElements />
      <div className="container mx-auto p-4 mt-3">
        <div className="flex justify-end items-center mb-6 mr-6"></div>
        <Table headers={headers} data={rows} />
        <Pagination maxPage={1} />
      </div>
    </>
  );
};

export default Approval;
