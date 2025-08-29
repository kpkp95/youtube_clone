import React, { useCallback, useEffect, useRef, useState } from "react";
import { fetchYouTube } from "../utils/youtubeApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VideoCard from "./VideoCard";
import Buttonlist from "./Buttonlist";
 
const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("search_query");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const sentinelRef = useRef(null);

  const fetchSearchResults = useCallback(
    async (pageToken = null) => {
      try {
        setLoading(true);
        const data = await fetchYouTube("search", {
          part: "snippet",
          maxResults: "25",
          q: query || "",
          type: "video",
          pageToken: pageToken || undefined,
        });
        setNextPageToken(data.nextPageToken || null);
        if (data.items) setVideos((prev) => (pageToken ? [...prev, ...data.items] : data.items));
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  useEffect(() => {
    if (!query) return;
    setVideos([]);
    setNextPageToken(null);
    fetchSearchResults();
  }, [query, fetchSearchResults]);

  // Infinite scroll
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageToken && !loading) {
          fetchSearchResults(nextPageToken);
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [nextPageToken, loading, query, fetchSearchResults]);

  return (
    <div className="relative flex-1 overflow-hidden">
      <div className="px-2">
        {/* Pills row to match home */}
        <div className="mb-2">
          <Buttonlist onTabClick={() => navigate("/")} />
        </div>

        {/* Results styled like Home feed */}
        <div className="flex flex-wrap justify-center gap-y-4 gap-x-1 w-full overflow-x-hidden">
          {!videos.length && loading && (
            <>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="p-2 xs:p-3 md:p-2 md:h-72 xs:h-80 rounded-lg w-80 md:w-64 bg-gray-100 dark:bg-gray-800 animate-pulse m-2">
                  <div className="w-full h-44 bg-gray-300 dark:bg-gray-700 rounded" />
                  <div className="mt-3 space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </>
          )}
          {videos.map((video) => {
            const id = video?.id?.videoId || video?.id; // search.list vs others
            return (
            <Link to={"/watch?v=" + id} key={id} aria-label={`Watch ${video?.snippet?.title || "video"}`}>
              <VideoCard info={video} />
            </Link>
            );
          })}
        </div>
      </div>

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-8"></div>

      {/* Loading overlay to match home */}
      {loading && videos.length > 0 && (
        <div className="w-full flex justify-center py-6">
          <div className="spinner" />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
