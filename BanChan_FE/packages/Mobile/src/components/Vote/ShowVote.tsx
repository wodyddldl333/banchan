import React from "react";
import SwipeableContent from "./SwipeableContent";
import Header from "../Header";

const ShowVote: React.FC = () => {


  const voteItems = [
    {
      question: "이번 회계 감사 받기를 동의하십니까?",
      options: ["1. 예", "2. 아니오"],
    },
    {
      question: "올해 예산안을 승인하십니까?",
      options: [
        "1. 예",
        "2. 아니오",
        "3.asdafas",
        "4. ㅁㄴㅇㄻㄴㅇㅁㄴ",
        "5. ㅁㄴㅇㅁㄴㅇ",
      ],
    },
    {
      question: "올해 예산안을 승인하십니까?",
      options: ["1. 예", "2. 아니오"],
    },
    {
      question: "집안은 평안하십니까?",
      options: ["1. 예", "2. 아니오"],
    },
    {
      question: "어디가십니까?",
      options: ["1. 예", "2. 아니오"],
    },
    {
      question: "반갑습니다?",
      options: ["1. 예", "2. 아니오"],
    },
    {
      question: "안녕하세용?",
      options: ["1. 예", "2. 아니오"],
    },
  ];

  return (
    <div className="min-h-screen w-[360px]">
      <Header>투표</Header>
      <div className="p-4">
        <h3 className="text-[20px] font-bold mb-4 flex justify-center mt-10">
          대충제목
        </h3>
        <SwipeableContent items={voteItems} />
      </div>
    </div>
  );
};

export default ShowVote;
