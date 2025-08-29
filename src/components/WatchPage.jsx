import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMenuOpen } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import RightRail from "./RightRail";
 
const WatchPage = () => {
  const [searchParams] = useSearchParams(); // Destructure to get the URLSearchParams object
  const videoId = searchParams.get("v"); // Extract the 'v' query parameter
  console.log(videoId);
  const dispatch = useDispatch();

  const [hasLiveChat, setHasLiveChat] = useState(null);

  useEffect(() => {
    // Close the sidebar when entering the watch page
    dispatch(setMenuOpen(false));
  }, [dispatch]);

  useEffect(() => {
    const checkLive = async () => {
      if (!videoId) return setHasLiveChat(false);
      try {
        const key =
          process.env.REACT_APP_YOUTUBE_API_KEY4 ||
          process.env.REACT_APP_YOUTUBE_API_KEY3 ||
          process.env.REACT_APP_YOUTUBE_API_KEY2 ||
          process.env.REACT_APP_YOUTUBE_API_KEY;
        const url = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${videoId}&key=${key}`;
        const res = await fetch(url);
        const data = await res.json();
        const details = data?.items?.[0]?.liveStreamingDetails;
        setHasLiveChat(Boolean(details?.activeLiveChatId));
      } catch (e) {
        setHasLiveChat(false);
      }
    };
    checkLive();
  }, [videoId]);

  return (
    <div className="flex flex-col w-full px-4 my-8 md:ml-16">
      {/* Video and Live Chat Section */}
      <div className="flex flex-col md:flex-row justify-center gap-6">
        {/* Video Section */}
        <div className="w-full md:w-3/4">
          {videoId ? (
            <div className="aspect-video">
              {/* Embed YouTube Video */}
              <iframe
                className="rounded-lg w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No video selected</p>
          )}
          <div className="mt-4">
            <CommentsContainer videoId={videoId} compact={true} />
          </div>
        </div>

        {/* Live Chat Section */}
        <div className="w-full md:w-1/4">
          {hasLiveChat ? (
            <LiveChat videoId={videoId} />
          ) : (
            <RightRail videoId={videoId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
