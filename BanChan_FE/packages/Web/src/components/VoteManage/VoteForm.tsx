import React, { useState, useEffect } from 'react';

interface Options {
  id: number;
  option_text: string;
}

interface VoteQuestionForm {
  question_id: number;
  question_text: string;
  options: Options[];
}

interface VoteFormProps {
  question: VoteQuestionForm;
  voteSelection: (questionId: number, optionId: number) => void;
}

const VoteForm: React.FC<VoteFormProps> = ({ question, voteSelection }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionChange = (optionId: number) => {
    voteSelection(question.question_id, optionId);
    setSelectedOption(optionId);
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">{question.question_text}</h2>
      {question.options.map((option) => (
        <div key={option.id} className="mb-2">
          <label className="flex items-center">
            <input
              type="radio"
              name={`vote-${question.question_id}`}
              value={option.id}
              onChange={() => handleOptionChange(option.id)}
              className="mr-2"
              checked={selectedOption === option.id}
            />
            {option.option_text}
          </label>
        </div>
      ))}
    </div>
  );
};

export default VoteForm;
