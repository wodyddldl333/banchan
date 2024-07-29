import React, { useState } from 'react';

interface PollItem {
  id: number;
  text: string;
}

interface VoteFormProps {
  id: number;
  onDelete: (id: number) => void;
}

const VoteForm: React.FC<VoteFormProps> = ({ id, onDelete }) => {
  const [title, setTitle] = useState<string>('');
  const [items, setItems] = useState<PollItem[]>([]);

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), text: '' }]);
  };

  const handleItemChange = (id: number, text: string) => {
    setItems(items.map(item => (item.id === id ? { ...item, text } : item)));
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="p-4 mb-4 border rounded shadow-md">
      <div className="flex justify-between items-center mb-2">
          <input
          id={`pollTitle-${id}`}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 flex-1 border border-gray-300 rounded-md"
          required
          />
        <button
          onClick={() => onDelete(id)}
          className=" ml-2 p-2 text-red-500 hover:text-red-700"
        >
            X
         </button>
      </div>

      {items.map((item) => (
        <div key={item.id} className="flex items-center mb-2">
          <input
            type="text"
            value={item.text}
            onChange={(e) => handleItemChange(item.id, e.target.value)}
            className="mt-1 p-2 flex-1 border border-gray-300 rounded-md"
            required
          />
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="ml-2 p-2 text-red-500 hover:text-red-700"
          >
            항목 삭제
          </button>
        </div>
      ))}
      <button
        onClick={handleAddItem}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        항목 추가
      </button>
    </div>
  );
};

export default VoteForm;
