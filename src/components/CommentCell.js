import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PopUpMessage from './PopUpMessage';
import AddComment from './AddComment';
import RemoveComment from './RemoveComment';
import { useDispatch } from 'react-redux';
import { updateComment } from '../utils/dashboardData';

const CommentCell = ({ module, commentIndex,moduleName }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState(module[commentIndex]);
  const dispatch = useDispatch();
  const handleEditClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveComment = async (newComment) => {
    try {
        //check if the comment is empty
        //console.log("Comment :"+ newComment);
        const response = await fetch('/api/update-comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            module: moduleName, // module name
            ID: module[0], // use ase id
            useCase: module[2], // use case display name
            newComment : newComment, //new comment to be updated
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update comment');
        }
        // Update the current comment in the state
        setCurrentComment(newComment);
        setIsPopupOpen(false); // Close the popup after saving
        //update the same comment in store also otherwise if page get refresh then value at currevt page will get vanished as it is stored in file but not in store yet
        dispatch(updateComment({ moduleName, scenarioId: module[0], newComment,useCaseName:module[2] }));
      } catch (error) {
        console.error('Failed to update comment:', error);
      }
  };
  //console.log("Module :"+ module);
  return (
    <td className="border border-gray-400 px-2 py-0.5 font-medium w-14 justify-center">
      <button onClick={handleEditClick} className="mr-2 text-blue-500 font-normal text-sm">
        {currentComment?.length > 0 ? <RemoveComment /> : <AddComment />}
      </button>
      <Link to={`https://mypolarion.industrysoftware.automation.siemens.com/polarion/#/project/Teamcenter/workitem?id=${module[commentIndex]}`} target="_blank" rel="noopener noreferrer" className="underline text-blue-600 text-sm">
        {currentComment}
      </Link>
      {isPopupOpen && (
        <PopUpMessage onClose={handleClosePopup} onSave={handleSaveComment} initialComment={currentComment}/>
      )}
    </td>
  );
};

export default CommentCell;