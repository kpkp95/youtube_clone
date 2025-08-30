import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setMenuOpen } from "../utils/appSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import RightRail from "./RightRail";
import { fetchYouTube } from "../utils/youtubeApi";
import { fetchRightTab, getRightTabLocal, persistRightTab, saveRightTabLocal } from "../utils/prefs";
import { next as queueNext, setAutoplay } from "../utils/queueSlice";
import ReactPlayer from "react-player/youtube";
 
const WatchPage = () => {
  const [searchParams] = useSearchParams(); // Destructure to get the URLSearchParams object
  const videoId = searchParams.get("v"); // Extract the 'v' query parameter
  
  const dispatch = useDispatch();

  const [hasLiveChat, setHasLiveChat] = useState(null);
  const [hasRelated, setHasRelated] = useState(null);

  useEffect(() => {
    // Close the sidebar when entering the watch page
    dispatch(setMenuOpen(false));
  }, [dispatch]);

  useEffect(() => {
    const checkLive = async () => {
      if (!videoId) return setHasLiveChat(false);
      try {
        const data = await fetchYouTube("videos", {
          part: "liveStreamingDetails",
          id: videoId,
        });
        const details = data?.items?.[0]?.liveStreamingDetails;
        setHasLiveChat(Boolean(details?.activeLiveChatId));
      } catch (e) {
        setHasLiveChat(false);
      }
    };
    checkLive();
  }, [videoId]);

  // Check if there are any related (suggested) videos for this video
  useEffect(() => {
    const checkRelated = async () => {
      if (!videoId) return setHasRelated(false);
      try {
        const data = await fetchYouTube("search", {
          part: "snippet",
          relatedToVideoId: videoId,
          type: "video",
          maxResults: "1",
        });
        setHasRelated(Array.isArray(data?.items) && data.items.length > 0);
      } catch (e) {
        setHasRelated(false);
      }
    };
    checkRelated();
  }, [videoId]);

  const [rightTab, setRightTab] = useState("chat");
  const [theater, setTheater] = useState(false);
  const user = useSelector((s) => s.auth.user);
  const queue = useSelector((s) => s.queue);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset right rail tab when video changes
    setRightTab("chat");
  }, [videoId]);

  // Initialize theater state from existing body class (if any)
  useEffect(() => {
    const isTheater = document.body.classList.contains("theater");
    setTheater(isTheater);
  }, []);

  // Load persisted right-rail tab when chat exists
  useEffect(() => {
    const load = async () => {
      if (!hasLiveChat) return; // Only matters when chat exists
      // Prefer user setting, fallback to local
      const userPref = await fetchRightTab(user?.uid);
      const localPref = getRightTabLocal();
      const tab = userPref || localPref || "chat";
      setRightTab(tab);
    };
    load();
  }, [hasLiveChat, user?.uid]);

  const selectTab = async (tab) => {
    setRightTab(tab);
    saveRightTabLocal(tab);
    if (user?.uid) await persistRightTab(user.uid, tab);
  };

  const handleEnded = () => {
    if (queue.autoplay && queue.items.length > queue.index + 1) {
      const nextId = queue.items[queue.index + 1];
      dispatch(queueNext());
      navigate(`/watch?v=${nextId}`);
    }
  };

  // Reusable right-rail panel so we can place it where we need
  const RightPanel = useMemo(
    () => () => (
      <div className="w-full">
        {/* Mini/Theater/Autoplay controls */}
        <div className="flex items-center gap-2 mb-2">
          <button
            className="px-2 py-1 text-sm border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => {
              // Toggle mini-player by toggling a CSS class on container
              document.body.classList.toggle("mini-player");
            }}
            aria-label="Toggle mini player"
          >
            Mini Player
          </button>
          <button
            className="px-2 py-1 text-sm border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => {
              setTheater((prev) => {
                const next = !prev;
                document.body.classList.toggle("theater", next);
                return next;
              });
            }}
            aria-label="Toggle theater mode"
            aria-pressed={theater}
          >
            Theater
          </button>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={queue.autoplay}
              onChange={(e) => dispatch(setAutoplay(e.target.checked))}
            />
            Autoplay next
          </label>
          {/* Save actions removed */}
        </div>
        {hasLiveChat && hasRelated ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                className={`flex-1 px-3 py-2 text-sm rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  rightTab === "chat"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                aria-selected={rightTab === "chat"}
                role="tab"
                onClick={() => selectTab("chat")}
              >
                Chat
              </button>
              <button
                className={`flex-1 px-3 py-2 text-sm rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  rightTab === "related"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                aria-selected={rightTab === "related"}
                role="tab"
                onClick={() => selectTab("related")}
              >
                Related
              </button>
            </div>
            <div className="p-2">
              {rightTab === "chat" ? (
                <LiveChat videoId={videoId} />
              ) : (
                <RightRail videoId={videoId} />
              )}
            </div>
          </div>
        ) : hasLiveChat ? (
          <LiveChat videoId={videoId} />
        ) : (
          <RightRail videoId={videoId} />
        )}
      </div>
    ),
    [hasLiveChat, hasRelated, queue.autoplay, rightTab, videoId, theater]
  );

  return (
    <div className="watch-root flex flex-col w-full px-4 my-8 md:ml-16">
      {/* Video and Live Chat Section */}
      <div className="watch-flex flex flex-col md:flex-row justify-center gap-6">
        {/* Video Section */}
        <div className="watch-video w-full md:w-3/4">
          {videoId ? (
            <div className="aspect-video rounded-lg overflow-hidden">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoId}`}
                width="100%"
                height="100%"
                controls
                playing={false}
                onEnded={handleEnded}
              />
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No video selected</p>
          )}
          <div className="watch-below mt-4">
            <div className="watch-comments">
              <CommentsContainer videoId={videoId} compact={true} hasLiveChat={!!hasLiveChat} />
            </div>
            {theater ? (
              <div className="right-inline">
                <RightPanel />
              </div>
            ) : null}
          </div>
        </div>

        {/* Right Rail: standalone (hidden when theater is active) */}
        {!theater && (
          <div className="watch-right w-full md:w-1/4 md:sticky md:top-16 md:self-start">
            <RightPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
