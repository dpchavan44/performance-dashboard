import React, { useState } from 'react';

const PopUpMessage = ({ initialComment,onClose, onSave }) => {
  const [inputValue, setInputValue] = useState(initialComment || '');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveClick = () => {
    if (initialComment) {
      onSave(null);
    } else {
      if (inputValue.trim() === '') {
        alert('Please enter a comment.');
      } else {
        onSave(inputValue);
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-96">
      {initialComment ? (
          <h2 className="text-lg font-bold mb-4">Are you sure you want to delete comment?</h2>
        ) : (
          <>
            <h2 className="text-lg font-bold mb-4">Enter Comment</h2>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="border border-gray-400 px-2 py-1 w-full mb-4"
            />
          </>
        )}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpMessage;