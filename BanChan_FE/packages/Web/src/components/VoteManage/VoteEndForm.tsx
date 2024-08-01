import React from 'react';

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
  selectedOption : number | null;
}

const VoteEndForm: React.FC<VoteFormProps> = ({ question, voteSelection,selectedOption }) => {

  const handleOptionChange = (optionId: number) => {
    voteSelection(question.question_id, optionId);
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

export default VoteEndForm;
