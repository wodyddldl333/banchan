import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { SwipeableContentProps } from "../../Types";
import { useParams } from "react-router-dom";

const SwipeableContent: React.FC<SwipeableContentProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const {id} = useParams()
  const [selectedOptions, setSelectedOptions] = useState<number[]>(
    Array(items.length).fill(-1)
  );

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prev) =>
        Math.min(prev + 2, Math.floor((items.length - 1) / 2) * 2)
      ),
    onSwipedRight: () => setCurrentIndex((prev) => Math.max(prev - 2, 0)),
    trackMouse: true,
  });

  const handleOptionClick = (index: number, optionIndex: number) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const handleFinishVoteClick = () => {
    navigate(`/m/vote/finishedVote/${id}`);
  };

  return (
    <div
      {...handlers}
      className="relative w-full h-[600px] mt-4 overflow-hidden"
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex / 2) * 100}%)`,
          width: `${(items.length / 2) * 100}%`,
        }}
      >
        {items.map((item, index) =>
          index % 2 === 0 ? (
            <div
              key={index}
              className="flex flex-col w-[300px] flex-none"
              style={{ width: "100%" }}
            >
              <div className="w-[300px] p-4 border border-black rounded-2xl bg-white m-4">
                <h4 className="text-lg font-bold">{item.question}</h4>
                <div className="mt-4">
                  {item.options.map((option, optionIdx) => (
                    <p
                      key={optionIdx}
                      className={`text-gray-800 cursor-pointer p-2 rounded-md ${
                        selectedOptions[index] === optionIdx
                          ? "bg-blue-500 text-white"
                          : "bg-white"
                      }`}
                      onClick={() => handleOptionClick(index, optionIdx)}
                    >
                      {option}
                    </p>
                  ))}
                </div>
              </div>
              {items[index + 1] && (
                <div className="w-[300px] p-4 border border-black rounded-2xl bg-white m-4">
                  <h4 className="text-lg font-bold">
                    {items[index + 1].question}
                  </h4>
                  <div className="mt-4">
                    {items[index + 1].options.map((option, optionIdx) => (
                      <p
                        key={optionIdx}
                        className={`text-gray-800 cursor-pointer p-2 rounded-md ${
                          selectedOptions[index + 1] === optionIdx
                            ? "bg-blue-500 text-white"
                            : "bg-white"
                        }`}
                        onClick={() => handleOptionClick(index + 1, optionIdx)}
                      >
                        {option}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {currentIndex === index && currentIndex >= items.length - 2 && (
                <div className="flex ml-[130px] ">
                  <button
                    onClick={handleFinishVoteClick}
                    className="py-2 px-4 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600"
                  >
                    투표 완료
                  </button>
                </div>
              )}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default SwipeableContent;
