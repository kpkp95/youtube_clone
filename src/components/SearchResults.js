import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VideoCard from "./VideoCard";
import { YOUTUBE_VIDEO_URL } from "../utils/constant";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search_query");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${encodeURIComponent(
            query
          )}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY3}`
        );
        const data = await response.json();
        if (data.items) {
          setVideos(data.items);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard key={video.id.videoId} info={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
