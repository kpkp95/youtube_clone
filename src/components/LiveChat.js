import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../utils/chatSlice";

import Picker from "@emoji-mart/react";

const LiveChat = () => {
  const [liveMsg, setLiveMsg] = useState("");
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.messages);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiSelect = (emoji) => {
    setLiveMsg((prev) => prev + emoji.native); // Append the selected emoji to the message
    setShowEmojiPicker(false); // Close the emoji picker after selection
  };

  useEffect(() => {
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: "KunalP",
          message: "This is Youtube-Clone App",
          timestamp: new Date().toLocaleTimeString(),
        })
      );
    }, 1500);

    return () => clearInterval(i);
  }, []);

  return (
    <>
      <div className="bg-white  shadow-md  mx-2 p-2  rounded-lg  ">
        <div className=" items-center mb-4">
          <div className="ml-3">
            <p className="text-xl font-medium">Live Chat</p>
          </div>
        </div>
        <div className=" w-full h-[540px] rounded-lg p-4  flex flex-col-reverse overflow-y-scroll">
          <div>
            {chatMessages.map((chatMessage, index) => (
              <ChatMessage
                timestamp={chatMessage.timestamp}
                name={chatMessage.name}
                key={index}
                msg={chatMessage.message}
              />
            ))}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!liveMsg.trim()) return;
            dispatch(
              addMessage({
                name: "T2",
                message: liveMsg,
                timestamp: new Date().toLocaleTimeString(),
              })
            );
            setLiveMsg("");
          }}
          className="mt-4 w-full flex items-center"
        >
          <div className="relative">
            <button
              type="button"
              className="bg-gray-200 text-black px-3 py-2 rounded-full mr-2 hover:bg-gray-300"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              😀
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-12 left-0 z-50">
                <Picker onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
          </div>
          <input
            type="text"
            value={liveMsg}
            placeholder="Type your message..."
            onChange={(e) => setLiveMsg(e.target.value)}
            className="flex-1 py-2 px-3 rounded-full bg-gray-100 focus:outline-none"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full ml-3 hover:bg-blue-600">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default LiveChat;
