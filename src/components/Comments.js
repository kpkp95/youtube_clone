import React from "react";

import { FaRegUserCircle } from "react-icons/fa";

const Comments = ({ comment }) => {
  const { name, text } = comment;
  return (
    <div className=" shadow-lg items-center flex bg-gray-200 pl-4 rounded-md p-2 m-1">
      {/* Render Comment Content */}
      <FaRegUserCircle className="h-7 w-7 " />

      <div className="px-2">
        <p className="font-bold">{name}</p>
        <p className="text-gray-700">{text}</p>
      </div>

      {/* Render Replies */}
    </div>
  );
};

export default Comments;
