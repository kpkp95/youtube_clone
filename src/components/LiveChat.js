import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../utils/chatSlice";

const LiveChat = () => {
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      console.log("Hello");
      dispatch(
        addMessage({ name: "KunalP", message: "This is Youtube-Clone App" })
      );
    }, 2000);

    return () => clearInterval(i);
  }, []);

  return (
    <div className=" w-[80%] h-[650px] mx-2 p-2 border border-black bg-slate-200 rounded-lg overflow-y-scroll">
      {chatMessages.map((chatMessage, index) => (
        <ChatMessage
          name={chatMessage.name}
          key={index}
          msg={chatMessage.message}
        />
      ))}
    </div>
  );
};

export default LiveChat;
