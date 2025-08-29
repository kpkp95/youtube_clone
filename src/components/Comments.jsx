import React from "react";
 
import { FaRegUserCircle } from "react-icons/fa";

const Comments = ({ comment }) => {
  const { name, text } = comment;
  return (
    <div className=" shadow-lg items-center flex bg-gray-200 dark:bg-gray-700 pl-4 rounded-md p-2 m-1 text-gray-900 dark:text-gray-100">
      {/* Render Comment Content */}
      <FaRegUserCircle className="h-7 w-7 " />

      <div className="px-2">
        <p className="font-bold">{name}</p>
        <p className="text-gray-700 dark:text-gray-200">{text}</p>
      </div>

      {/* Render Replies */}
    </div>
  );
};

export default Comments;
