import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
 
const RightRail = ({ videoId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!videoId) return;
      setLoading(true);
      try {
        const key =
          process.env.REACT_APP_YOUTUBE_API_KEY4 ||
          process.env.REACT_APP_YOUTUBE_API_KEY3 ||
          process.env.REACT_APP_YOUTUBE_API_KEY2 ||
          process.env.REACT_APP_YOUTUBE_API_KEY;

        const url =
          `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=20&key=${key}`;
        const res = await fetch(url);
        const data = await res.json();
        let list = Array.isArray(data.items) ? data.items : [];
        // Fallback to most popular if related returns empty
        if (list.length === 0) {
          const fallback = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&regionCode=US&key=${key}`
          ).then((r) => r.json());
          list = Array.isArray(fallback.items) ? fallback.items : [];
        }
        setItems(list);
      } catch (e) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRelated();
  }, [videoId]);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold mb-2">Related videos</h2>
      {loading && <p className="text-gray-500 dark:text-gray-400">Loading…</p>}
      {!loading && items.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No suggestions available.</p>
      )}
      {!loading && items.map((it) => {
        const id = it?.id?.videoId || it?.id;
        const sn = it?.snippet || {};
        return (
          <Link to={`/watch?v=${id}`} key={id} className="block">
            <div className="flex gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2">
              <img
                src={sn?.thumbnails?.medium?.url}
                alt={sn?.title}
                className="w-40 h-24 object-cover rounded-md flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium line-clamp-2">{sn?.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {sn?.channelTitle}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {sn?.publishedAt ? moment(sn.publishedAt).fromNow() : null}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default RightRail;
