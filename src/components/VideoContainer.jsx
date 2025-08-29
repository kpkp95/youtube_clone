import React, { useEffect, useRef, useState } from "react";
import VideoCard from "./VideoCard";
import { fetchYouTube } from "../utils/youtubeApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
 
const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const selectedTab = useSelector((state) => state.tab.selectedTab);
  const [loading, setLoading] = useState(false); // loading any fetch
  const [nextPageToken, setNextPageToken] = useState(null); // for infinite scroll
  const sentinelRef = useRef(null);

  const getVideo = async (pageToken = null) => {
    try {
      setLoading(true); // Start loading
      const json = await fetchYouTube("videos", {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        maxResults: "50",
        regionCode: "US",
        pageToken: pageToken || undefined,
      });
      setVideos((prev) => (pageToken ? [...prev, ...(json.items || [])] : json.items || []));
      setNextPageToken(json.nextPageToken || null);
    } catch (error) {
      console.error("Error fetching random videos:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const getTabVideos = async (tab, pageToken = null) => {
    try {
      setLoading(true); // Start loading
      const searchData = await fetchYouTube("search", {
        part: "snippet",
        q: tab,
        type: "video",
        maxResults: "25",
        pageToken: pageToken || undefined,
      });
      setNextPageToken(searchData.nextPageToken || null);

      // Extract video IDs from the search response
      const videoIds = (searchData.items || [])
        .map((item) => item.id.videoId)
        .join(",");

      // Fetch video details (including statistics) for those IDs
      let newItems = [];
      if (videoIds) {
        const detailsData = await fetchYouTube("videos", {
          part: "snippet,contentDetails,statistics",
          id: videoIds,
          maxResults: "25",
        });
        newItems = detailsData.items || [];
      }
      setVideos((prev) => (pageToken ? [...prev, ...newItems] : newItems));
    } catch (error) {
      console.error("Error fetching tab-specific videos:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    // reset on tab change
    setVideos([]);
    setNextPageToken(null);
    if (!selectedTab) getVideo();
    else getTabVideos(selectedTab);
  }, [selectedTab]); // Re-fetch whenever selectedTab changes

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && nextPageToken && !loading) {
          if (!selectedTab) getVideo(nextPageToken);
          else getTabVideos(selectedTab, nextPageToken);
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [nextPageToken, loading, selectedTab]);
  return (
    <div className="relative">
      {/* Videos Content */}
      <div className="flex flex-wrap justify-center gap-y-4 gap-x-1">
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
        {videos.map((video) => (
          <Link to={"/watch?v=" + video.id} key={video.id} aria-label={`Watch ${video?.snippet?.title || "video"}`}>
            <VideoCard key={video.id} info={video} />
          </Link>
        ))}
      </div>
      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-8"></div>

      {/* Loading Overlay */}
      {loading && videos.length > 0 && (
        <div className="w-full flex justify-center py-6">
          <div className="spinner" />
        </div>
      )}
    </div>
  );
};

export default VideoContainer;
