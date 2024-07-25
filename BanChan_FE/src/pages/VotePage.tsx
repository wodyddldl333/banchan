import React, { useState } from 'react';
import VoteForm from '../components/VoteManage/VoteForm';
const Vote: React.FC = () => {
  const [forms, setForms] = useState<number[]>([]);
  const [textareaValue, setTextareaValue] = useState<string>('');

  const handleAddForm = () => {
    if (textareaValue.trim() !== '') {
      setForms([...forms, Date.now()]);
      setTextareaValue(''); // clear textarea after adding a form
    }
  };

  const handleDeleteForm = (id: number) => {
    setForms(forms.filter(formId => formId !== id));
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="flex flex-col items-center mb-4">
        <textarea
          onChange={(e) => setTextareaValue(e.target.value)}
          className="p-2 mb-2 border border-gray-300 rounded-md w-full max-w-lg"
          placeholder="Enter the description for the vote form here..."
        />
        <button
          onClick={handleAddForm}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Create Vote Form
        </button>
      </div>
      {forms.map(formId => (
        <VoteForm key={formId} id={formId} onDelete={handleDeleteForm} />
      ))}
    </div>
  );
};

export default Vote;
