import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
 
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

const CommentsContainer = ({ videoId, compact = false }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      if (!videoId) return;
      setLoading(true);
      setError(null);
      try {
        const key =
          process.env.REACT_APP_YOUTUBE_API_KEY4 ||
          process.env.REACT_APP_YOUTUBE_API_KEY3 ||
          process.env.REACT_APP_YOUTUBE_API_KEY2 ||
          process.env.REACT_APP_YOUTUBE_API_KEY;
        const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&maxResults=50&key=${key}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data?.items) setComments(mapThreadsToComments(data.items));
        else setComments([]);
      } catch (e) {
        setError("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [videoId]);

  return (
    <div className={compact ? "m-3 mt-2 p-0" : "m-5 mt-0 pt-0 p-2"}>
      <h1 className={compact ? "text-lg font-semibold" : "text-xl font-bold"}>Comments</h1>
      {loading && <p className="text-gray-500 dark:text-gray-400">Loading…</p>}
      {error && <p className="text-red-600">{error}</p>}
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
