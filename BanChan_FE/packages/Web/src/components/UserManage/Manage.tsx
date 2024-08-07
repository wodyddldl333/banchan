import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "../Pagination";
import Table from "../Table";
import Nav from "../Nav";
import NavItem from "../NavItem";
import SmallButton from "../Buttons/SmallButton";
import axios from "axios";

const ModifyButton = ({ handleModify }: { handleModify: () => void }) => {
  return (
    <SmallButton
      title="수정"
      bgColor="bg-white"
      txtColor=""
      borderColor="border-customGreen"
      onClick={handleModify}
    />
  );
};

const SaveButton = ({ handleSave }: { handleSave: () => void }) => {
  return (
    <SmallButton
      title="저장"
      bgColor="bg-white"
      txtColor=""
      borderColor="border-customBlue"
      onClick={handleSave}
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

const NavElements = () => {
  return (
    <Nav>
      <NavItem to="/userManage/approval" label="신규 승인대기" />
      <NavItem to="/userManage/manage" label="입주민 관리" />
    </Nav>
  );
};

const Manage: React.FC = () => {
  const location = useLocation();
  const newUser: User | undefined = location.state?.user;

  const [users, setUsers] = useState<User[]>([
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
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    if (newUser) {
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }
  }, [newUser]);

  const startEditing = (user: User) => {
    setEditingId(user.id);
    setEditedUser({ ...user });
  };

  const saveChanges = async () => {
    if (editedUser) {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/admin/users/modify/${editedUser.id}`;
        const response = await axios.put(apiUrl, editedUser);
        console.log("Response:", response);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editedUser.id ? editedUser : user
          )
        );
        setEditingId(null);
        setEditedUser(null);
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedUser) {
      setEditedUser({ ...editedUser, [name]: value });
    }
  };

  const headers = ["번호", "이름", "연락처", "이메일", "신청일", "동/호수", "수정"];

  const rows = users.map((user) =>
    editingId === user.id ? (
      [
        user.id,
        <input
          type="text"
          name="name"
          value={editedUser?.name}
          onChange={handleChange}
        />,
        <input
          type="text"
          name="phone"
          value={editedUser?.phone}
          onChange={handleChange}
        />,
        <input
          type="text"
          name="email"
          value={editedUser?.email}
          onChange={handleChange}
        />,
        <input
          type="text"
          name="date"
          value={editedUser?.date}
          onChange={handleChange}
        />,
        <input
          type="text"
          name="address"
          value={editedUser?.address}
          onChange={handleChange}
        />,
        <SaveButton handleSave={saveChanges} />,
      ]
    ) : (
      [
        user.id,
        user.name,
        user.phone,
        user.email,
        user.date,
        user.address,
        <ModifyButton handleModify={() => startEditing(user)} />,
      ]
    )
  );

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

export default Manage;
