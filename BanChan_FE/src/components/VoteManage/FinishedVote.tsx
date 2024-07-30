import { Link } from "react-router-dom";
import Nav from "../Nav";
import NavItem from "../NavItem";
import Sorting from "../Sorting";
import Table from "../Table";
import Pagination from "../Pagination";
const headers = ["번호", "제목", "작성자", "투표 기간", "투표율"]
const vote = [
  [
  1,
  'LH 7월 3주차 회의 안건 관련 투표',
  '관리자',
  '24-07-18 00:00 ~ 24-07-24 23:59',
  '38%'
  ],
  [
  2,
  'LH 7월 3주차 회의 안건 관련 투표',
  '관리자',
  '24-07-18 00:00 ~ 24-07-24 23:59',
  '38%'
  ],
  [
  3,
  'LH 7월 3주차 회의 안건 관련 투표',
  '관리자',
  '24-07-18 00:00 ~ 24-07-24 23:59',
  '38%'
  ],
  [
  4,
  'LH 7월 3주차 회의 안건 관련 투표',
  '관리자',
  '24-07-18 00:00 ~ 24-07-24 23:59',
  '38%'
  ],
  [
  5,
  'LH 7월 3주차 회의 안건 관련 투표',
  '관리자',
  '24-07-18 00:00 ~ 24-07-24 23:59',
  '38%'
  ],
  [
  6,
  'LH 7월 3주차 회의 안건 관련 투표',
  '관리자',
  '24-07-18 00:00 ~ 24-07-24 23:59',
  '38%'
  ],
  [
  7,
  'LH 7월 3주차 회의 안건 관련 투표',
  '관리자',
  '24-07-18 00:00 ~ 24-07-24 23:59',
  '38%'
  ],
  [
  8,
  'LH 7월 3주차 회의 안건 관련 투표',
  '관리자',
  '24-07-18 00:00 ~ 24-07-24 23:59',
  '38%'
  ],
  [
  9,
  'LH 7월 3주차 회의 안건 관련 투표',
  '관리자',
  '24-07-18 00:00 ~ 24-07-24 23:59',
  '38%'
  ],
  [
  10,
  'LH 7월 3주차 회의 안건 관련 투표',
  '관리자',
  '24-07-18 00:00 ~ 24-07-24 23:59',
  '38%'
  ]
]

const NavElements = () => {
  return (
    <Nav>
      <NavItem to="/vote/active" label="진행중인 투표" />
      <NavItem to="/vote/finish" label="완료된 투표" />
    </Nav>
  );
};

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
        <Table headers={headers} data={vote} />
        <Pagination/>
      </div>
    </>
  );
};

export default ActiveVote;
