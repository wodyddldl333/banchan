import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import NavItem from "../NavItem";

const vote = [
  {
  id:1,
  title : 'LH 7월 3주차 회의 안건 관련 투표',
  writer : '관리자',
  date : '24-07-18 00:00 ~ 24-07-24 23:59',
  vote_rate : '38%'
  },
  {
  id:2,
  title : 'LH 7월 3주차 회의 안건 관련 투표',
  writer : '관리자',
  date : '24-07-18 00:00 ~ 24-07-24 23:59',
  vote_rate : '38%'
  },
  {
  id:3,
  title : 'LH 7월 3주차 회의 안건 관련 투표',
  writer : '관리자',
  date : '24-07-18 00:00 ~ 24-07-24 23:59',
  vote_rate : '38%'
  },
  {
  id:4,
  title : 'LH 7월 3주차 회의 안건 관련 투표',
  writer : '관리자',
  date : '24-07-18 00:00 ~ 24-07-24 23:59',
  vote_rate : '38%'
  },
  {
  id:5,
  title : 'LH 7월 3주차 회의 안건 관련 투표',
  writer : '관리자',
  date : '24-07-18 00:00 ~ 24-07-24 23:59',
  vote_rate : '38%'
  },
  {
  id:6,
  title : 'LH 7월 3주차 회의 안건 관련 투표',
  writer : '관리자',
  date : '24-07-18 00:00 ~ 24-07-24 23:59',
  vote_rate : '38%'
  },
  {
  id:7,
  title : 'LH 7월 3주차 회의 안건 관련 투표',
  writer : '관리자',
  date : '24-07-18 00:00 ~ 24-07-24 23:59',
  vote_rate : '38%'
  },
  {
  id:8,
  title : 'LH 7월 3주차 회의 안건 관련 투표',
  writer : '관리자',
  date : '24-07-18 00:00 ~ 24-07-24 23:59',
  vote_rate : '38%'
  },
  {
  id:9,
  title : 'LH 7월 3주차 회의 안건 관련 투표',
  writer : '관리자',
  date : '24-07-18 00:00 ~ 24-07-24 23:59',
  vote_rate : '38%'
  },
  {
  id:10,
  title : 'LH 7월 3주차 회의 안건 관련 투표',
  writer : '관리자',
  date : '24-07-18 00:00 ~ 24-07-24 23:59',
  vote_rate : '38%'
  },
]

const NavElements = () => {
  return (
    <Nav>
      <NavItem to="/vote/active" label="진행중인 투표" />
      <NavItem to="/vote/finish" label="완료된 투표" />
    </Nav>
  );
};
const FinishedVote = () => {

  
  return (
    <>
    <NavElements />

    <div className="flex justify-end p-5">
            <div className="h-[56px] flex">

            </div>
        </div>
    <div className="p-6">

        <table className="min-w-full bg-white border table-fixed rounded-[20px] overflow-hidden">
          <thead>
            <tr className=" text-slate-400">
              <th className="px-4 py-2">번호</th>
              <th className="px-4 py-2">제목</th>
              <th className="px-4 py-2">작성자</th>
              <th className="px-4 py-2">투표 기간</th>
              <th className="px-4 py-2">투표율</th>
            </tr>
          </thead>
          <tbody>
            {vote.map((item) => (
              <Link to="/vote/detail" key={item.id} className="contents">

              <tr className=' text-center w-full border-b'>
                    <td className="p-4">{item.id}</td>
                    <td className="p-4">{item.title}</td>
                    <td className="p-4">{item.writer}</td>
                    <td className="p-4">{item.date}</td>
                    <td className="p-4">{item.vote_rate}</td>
                </tr>
            </Link>
            ))}
            
          </tbody>
      </table>
    </div>
    </>
  );
};

export default FinishedVote;
