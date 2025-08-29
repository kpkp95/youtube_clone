import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { YOUTUBE_VIDEO_URL } from "../utils/constant";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
 
const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const selectedTab = useSelector((state) => state.tab.selectedTab);
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const [loading, setLoading] = useState(false); // Add a loading state

  const getVideo = async () => {
    try {
      setLoading(true); // Start loading
      const data = await fetch(YOUTUBE_VIDEO_URL);
      const json = await data.json();
      setVideos(json.items);
      console.log(json.items);
    } catch (error) {
      console.error("Error fetching random videos:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const getTabVideos = async (tab) => {
    try {
      setLoading(true); // Start loading
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          tab
        )}&type=video&maxResults=50&key=${
          process.env.REACT_APP_YOUTUBE_API_KEY4
        }`
      );
      const searchData = await searchResponse.json();

      // Extract video IDs from the search response
      const videoIds = searchData.items
        .map((item) => item.id.videoId)
        .join(",");

      // Fetch video details (including statistics) for those IDs
      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${process.env.REACT_APP_YOUTUBE_API_KEY4}`
      );
      const detailsData = await detailsResponse.json();

      setVideos(detailsData.items || []);
    } catch (error) {
      console.error("Error fetching tab-specific videos:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    if (!selectedTab) {
      // If no tab is selected, fetch random videos
      getVideo();
    } else {
      // Fetch videos for the selected tab
      getTabVideos(selectedTab);
    }
  }, [selectedTab]); // Re-fetch whenever selectedTab changes
  return (
    <div className="relative">
      {/* Videos Content */}
      <div className="flex flex-wrap justify-center gap-y-4 gap-x-1">
        {videos.map((video) => (
          <Link to={"/watch?v=" + video.id} key={video.id}>
            <VideoCard key={video.id} info={video} />
          </Link>
        ))}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-200 bg-opacity-50 flex justify-center items-center">
          <div className="spinner border-t-4 border-b-4 border-white rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default VideoContainer;
