import React from 'react';
import { useState } from 'react';
import { Link,Outlet } from "react-router-dom";

const VoteManagePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('진행중인 투표');

  return (
      <div className="p-8">
      <div className="">
      <nav className="flex space-x-10 ">
          <Link
            to="active"
            className={`flex items-center ${activeTab === '진행중인 투표' ? 'text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('진행중인 투표')}
            >
            <span className="ml-2">진행중인 투표</span>
          </Link>
          <Link
            to="finish"
            className={`flex items-center ${activeTab === '완료된 투표' ? 'text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('완료된 투표')}
            >
            <span className="ml-2">완료된 투표</span>
          </Link>
      </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default VoteManagePage;
