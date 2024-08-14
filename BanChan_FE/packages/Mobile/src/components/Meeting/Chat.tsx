import React, { useState, ChangeEvent, FormEvent } from "react";

interface Message {
  id: number;
  text: string;
}

interface ChatBoxProps {
  onSendMessage: (message: string) => void;
  messages: Message[];
}

const Chat: React.FC<ChatBoxProps> = ({ onSendMessage, messages }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[340px] bg-blue-100 rounded-[16px] p-4 shadow-lg relative">
        <div className="flex-1 mb-4 overflow-y-auto border border-gray-200 p-4 rounded">
          {messages.map((message) => (
            <div key={message.id} className="mb-2 p-2 bg-gray-100 rounded">
              <div className="font-bold">{"동대표"}</div>
              <div>{message.text}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <form onSubmit={handleFormSubmit}>
            <div className="flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded mr-2"
                placeholder="내용을 입력하세요"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded flex justify-center items-center"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </form>
        </div>
        {/* 닫기 버튼 */}
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
};

export default Chat;
