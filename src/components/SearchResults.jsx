import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VideoCard from "./VideoCard";
import Buttonlist from "./Buttonlist";
 
const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    <div className="relative flex-1 overflow-hidden">
      <div className="px-2">
        {/* Pills row to match home */}
        <div className="mb-2">
          <Buttonlist onTabClick={() => navigate("/")} />
        </div>

        {/* Results styled like Home feed */}
        <div className="flex flex-wrap justify-center gap-y-4 gap-x-1 w-full overflow-x-hidden">
          {videos.map((video) => {
            const id = video?.id?.videoId || video?.id; // search.list vs others
            return (
              <Link to={"/watch?v=" + id} key={id}>
                <VideoCard info={video} />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Loading overlay to match home */}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-200 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-40 flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
