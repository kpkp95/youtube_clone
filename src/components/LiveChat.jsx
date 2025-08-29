import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../utils/chatSlice";
 
import Picker from "@emoji-mart/react";
import { FaRegSmile } from "react-icons/fa";
import { useSelector as useReduxSelector } from "react-redux";
import { fetchYouTube } from "../utils/youtubeApi";

const LiveChat = ({ videoId }) => {
  const [liveMsg, setLiveMsg] = useState("");
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.messages);
  const authUser = useReduxSelector((store) => store.auth.user);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | connecting | live | unavailable | error
  const nextPageTokenRef = useRef(null);
  const pollTimeoutRef = useRef(null);
  const liveChatIdRef = useRef(null);

  const handleEmojiSelect = (emoji) => {
    setLiveMsg((prev) => prev + emoji.native); // Append the selected emoji to the message
    setShowEmojiPicker(false); // Close the emoji picker after selection
  };

  // Poll YouTube Live Chat if the video is live
  useEffect(() => {
    const clearPoll = () => {
      if (pollTimeoutRef.current) {
        clearTimeout(pollTimeoutRef.current);
        pollTimeoutRef.current = null;
      }
    };

    const fetchLiveChatId = async () => {
      if (!videoId) return null;
      setStatus("connecting");
      try {
        const data = await fetchYouTube("videos", {
          part: "liveStreamingDetails",
          id: videoId,
        });
        const details = data?.items?.[0]?.liveStreamingDetails;
        const id = details?.activeLiveChatId;
        return id || null;
      } catch (e) {
        setStatus("error");
        return null;
      }
    };

    const pollMessages = async () => {
      try {
        const data = await fetchYouTube("liveChat/messages", {
          part: "snippet,authorDetails",
          liveChatId: liveChatIdRef.current,
          maxResults: "200",
          pageToken: nextPageTokenRef.current || undefined,
        });

        // Record next page token and next poll timing
        nextPageTokenRef.current = data?.nextPageToken || null;
        const wait = data?.pollingIntervalMillis || 4000;

        // Push messages into chat store
        if (Array.isArray(data?.items)) {
          data.items.forEach((item) => {
            const name = item?.authorDetails?.displayName || "User";
            const message = item?.snippet?.displayMessage || "";
            const timestamp = new Date(
              item?.snippet?.publishedAt || Date.now()
            ).toLocaleTimeString();
            if (message) {
              dispatch(addMessage({ name, message, timestamp }));
            }
          });
        }

        setStatus("live");
        pollTimeoutRef.current = setTimeout(pollMessages, wait);
      } catch (e) {
        setStatus("error");
      }
    };

    const init = async () => {
      clearPoll();
      nextPageTokenRef.current = null;
      liveChatIdRef.current = null;

      if (!videoId) {
        setStatus("unavailable");
        return;
      }
      const liveChatId = await fetchLiveChatId();
      if (!liveChatId) {
        setStatus("unavailable");
        return;
      }
      liveChatIdRef.current = liveChatId;
      pollMessages();
    };

    init();
    return () => clearPoll();
  }, [videoId, dispatch]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 shadow-md  xl:mx-2 p-2  rounded-lg  ">
        <div className=" items-center mb-4">
          <div className="ml-3">
            <p className="text:sm xl:text-xl font-medium">Live Chat</p>
          </div>
        </div>
        <div ref={scrollRef} className=" w-full h-[300px] xl:h-[650px] rounded-lg p-4 overflow-y-scroll">
          {status === "connecting" && chatMessages.length === 0 && (
            <div className="space-y-2" role="status" aria-live="polite">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
          )}
          {chatMessages.map((chatMessage, index) => (
            <ChatMessage
              timestamp={chatMessage.timestamp}
              name={chatMessage.name}
              key={index}
              msg={chatMessage.message}
            />
          ))}
          {status !== "live" && chatMessages.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {status === "connecting"
                ? "Connecting to live chat…"
                : status === "unavailable"
                ? "Live chat not available for this video."
                : status === "error"
                ? "Could not load live chat."
                : ""}
            </p>
          )}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!liveMsg.trim() || !authUser) return;
            dispatch(
              addMessage({
                name: authUser?.displayName || "You",
                message: liveMsg,
                timestamp: new Date().toLocaleTimeString(),
              })
            );
            setLiveMsg("");
          }}
          className="mt-2 lg:w-[60%] xl:w-full  flex items-center"
        >
          <div className="relative">
            <button
              type="button"
              className="bg-gray-200 text-black px-2 xl:px-3 py-2 rounded-full xl:mr-2 hover:bg-gray-300"
              aria-label="Toggle emoji picker"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <FaRegSmile />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-[0] right-0 xl:bottom-12 xl:left-0 z-50">
                <Picker onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
          </div>
          <input
            type="text"
            value={liveMsg}
            placeholder={authUser ? "Type your message..." : "Sign in to chat"}
            onChange={(e) => setLiveMsg(e.target.value)}
            disabled={!authUser}
            className="flex-1 py-2 px-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none disabled:opacity-60"
          />
          <button disabled={!authUser} className="bg-blue-500 text-white px-4 py-2 rounded-full ml-3 hover:bg-blue-600 disabled:opacity-60">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default LiveChat;
