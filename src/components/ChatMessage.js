import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

const ChatMessage = ({ name, msg }) => {
  return (
    <div className="flex items-center shadow-sm p-2">
      <FaRegUserCircle className="h-4 w-4 " />
      <span className="text-bold px-2 ">{name}</span>
      <span>{msg}</span>
    </div>
  );
};

export default ChatMessage;
