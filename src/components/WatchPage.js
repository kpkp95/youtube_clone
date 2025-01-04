import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMenuOpen } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const [searchParams] = useSearchParams(); // Destructure to get the URLSearchParams object
  const videoId = searchParams.get("v"); // Extract the 'v' query parameter
  console.log(videoId);
  const dispatch = useDispatch();

  useEffect(() => {
    // Close the sidebar when entering the watch page
    dispatch(setMenuOpen(false));
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full justify-center  my-8 ml-16 ">
      <div className="px-4 py-4 flex justify-center">
        <div>
          {videoId ? (
            <div className="  aspect-video">
              {/* Embed YouTube Video */}
              <iframe
                className="rounded-lg"
                width="1200"
                height="650"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">No video selected</p>
          )}
        </div>
        <div className=" w-full ml-10  ">
          <LiveChat />
        </div>
      </div>
      <CommentsContainer />
    </div>
  );
};

export default WatchPage;
