import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

const ChatMessage = ({ name, msg, timestamp }) => {
  return (
    <div className="flex justify-between items-center shadow-sm p-2">
      <div className="flex items-center">
        <FaRegUserCircle className="h-4 w-4 " />
        <span className="text-bold px-2">{name}</span>
        <span>{msg}</span>
      </div>
      <span className="text-gray-400 text-xs ">{timestamp}</span>
    </div>
  );
};

export default ChatMessage;
