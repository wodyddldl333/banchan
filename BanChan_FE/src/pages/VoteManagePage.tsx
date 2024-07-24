import React from 'react';
import { useState } from 'react';
const VoteManagePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('진행중인 투표');

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
  return (
      <div className="p-8">
      <div className="h-screen   bg-slate-200/30 p-6 rounded shadow">
      <nav className="flex space-x-10 ">
          <a
            href="#"
            className={`flex items-center ${activeTab === '진행중인 투표' ? 'text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('진행중인 투표')}
            >
            <span className="ml-2">진행중인 투표</span>
          </a>
          <a
            href="#"
            className={`flex items-center ${activeTab === '완료된 투표' ? 'text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('완료된 투표')}
            >
            <span className="ml-2">완료된 투표</span>
          </a>
        </nav>
        <div className="flex justify-end p-5">
            <button className="mt-4  bg-blue-600/70 text-white py-2 px-4 rounded-full">투표 생성하기</button>
        </div>
        <table className="w-full table-auto bg-white">
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
                <tr className=' text-center'>
                    <td className="border px-4 py-2">{item.id}</td>
                    <td className="border px-4 py-2">{item.title}</td>
                    <td className="border px-4 py-2">{item.writer}</td>
                    <td className="border px-4 py-2">{item.date}</td>
                    <td className="border px-4 py-2">{item.vote_rate}</td>
                </tr>
            ))}
            
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default VoteManagePage;
