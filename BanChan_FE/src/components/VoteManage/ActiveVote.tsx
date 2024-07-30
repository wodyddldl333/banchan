import { Link } from "react-router-dom";
import Nav from "../Nav";
import NavItem from "../NavItem";
import Sorting from "../Sorting";
import Pagination from "../Pagination";

import TempTable from "../TempTable";
const vote = {
  crt_page : 3,
  max_page : 10,
  data : [
    {
      id:1,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
    },{
      id:2,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
    },{
      id:3,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
    },{
      id:4,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
    },{
      id:5,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
    },{
      id:6,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
    },{
      id:7,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
    },{
      id:8,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
    },{
      id:9,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
    },{
      id:10,
      title : 'LH 7월 3주차 회의 안건 관련 투표',
      writer : '관리자',
      startDate : '2024-07-30T15:14:10',
      endDate : '2024-08-06T15:14:10',
    },
  ]
}
const header:string[] = [
  'id','title','writer','startDate','endDate'
]
const NavElements = () => {
  return (
    <Nav>
      <NavItem to="/vote/active" label="진행중인 투표" />
      <NavItem to="/vote/finish" label="완료된 투표" />
    </Nav>
  );
};

// const empty_vote = {
//   data : []
// }

const ActiveVote = () => {
  return (
    <>
    <NavElements />
    <div className="container mx-auto p-4 mt-3">
      <div className="flex justify-end items-center mb-6 mr-6">
        <Sorting/>
          <button className=" my-2  bg-blue-600/70 text-white px-4 rounded-full">
          <Link to='/vote/create'>
          투표 생성하기
          </Link>
          </button>
        </div>
        <TempTable headerProp={header}data={vote.data} />
        <Pagination/>
      </div>
    </>
  );
};

export default ActiveVote;
