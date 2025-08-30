import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { fetchYouTube } from "../utils/youtubeApi";
 
// Helper to map YouTube commentThreads to our UI shape
const mapThreadsToComments = (threads) =>
  threads.map((t) => {
    const top = t.snippet.topLevelComment.snippet;
    return {
      id: t.id,
      name: top.authorDisplayName,
      text: top.textDisplay?.replace(/<[^>]+>/g, "") || top.textOriginal,
      replies:
        t.replies?.comments?.map((r) => ({
          id: r.id,
          name: r.snippet.authorDisplayName,
          text:
            r.snippet.textDisplay?.replace(/<[^>]+>/g, "") ||
            r.snippet.textOriginal,
          replies: [],
        })) || [],
    };
  });

const CommentsContainer = ({ videoId, compact = false, hasLiveChat = false }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // null | 'COMMENTS_DISABLED' | 'LOAD_FAILED'

  useEffect(() => {
    const fetchComments = async () => {
      if (!videoId) return;
      // Skip fetching while live chat is active to avoid quota waste
      if (hasLiveChat) {
        setComments([]);
        setError("COMMENTS_DISABLED");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await fetchYouTube("commentThreads", {
          part: "snippet,replies",
          videoId,
          maxResults: "50",
        });
        if (data?.items) setComments(mapThreadsToComments(data.items));
        else setComments([]);
      } catch (e) {
        const msg = String(e?.message || "").toLowerCase();
        if (msg.includes("disabled") || msg.includes("commentsdisabled")) {
          setError("COMMENTS_DISABLED");
        } else {
          setError("LOAD_FAILED");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [videoId, hasLiveChat]);

  return (
    <div className={compact ? "m-3 mt-2 p-0" : "m-5 mt-0 pt-0 p-2"}>
      <h1 className={compact ? "text-lg font-semibold" : "text-xl font-bold"}>Comments</h1>
      {error !== "COMMENTS_DISABLED" && (
        <CommentInput onAdd={(c) => setComments((prev) => [c, ...prev])} />
      )}
      {loading && (
        <div className="space-y-3" role="status" aria-live="polite">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 animate-pulse" />
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}
      {error === "COMMENTS_DISABLED" && (
        <p className="text-gray-600 dark:text-gray-300">
          {hasLiveChat
            ? "Comments are disabled while this video is live. Join the live chat instead."
            : "Comments are disabled for this video."}
        </p>
      )}
      {error === "LOAD_FAILED" && (
        <p className="text-red-600">Failed to load comments.</p>
      )}
      {!loading && !error && comments.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No comments found.</p>
      )}
      {!loading && !error && comments.length > 0 && (
        <CommentList comments={comments} />
      )}
    </div>
  );
};

export default CommentsContainer;
