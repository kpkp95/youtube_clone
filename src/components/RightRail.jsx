import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { fetchYouTube } from "../utils/youtubeApi";
import { useDispatch } from "react-redux";
import { setQueue } from "../utils/queueSlice";

const RightRail = ({ videoId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const isValidVideoId = (id) => /^[A-Za-z0-9_-]{11}$/.test(id || "");
    const fetchRelated = async () => {
      if (!videoId) return;
      setLoading(true);
      try {
        const data = isValidVideoId(videoId)
          ? await fetchYouTube("search", {
              part: "snippet",
              relatedToVideoId: videoId,
              type: "video",
              maxResults: "20",
              videoEmbeddable: "true",
            })
          : null;
        let list = Array.isArray(data?.items) ? data.items : [];
        if (list.length === 0) {
          const fallback = await fetchYouTube("videos", {
            part: "snippet",
            chart: "mostPopular",
            maxResults: "20",
            regionCode: "US",
          });
          list = Array.isArray(fallback.items) ? fallback.items : [];
        }

        // Enrich with statistics and durations
        const ids = list
          .map((it) => (it?.id?.videoId ? it.id.videoId : it?.id))
          .filter(Boolean);
        if (ids.length) {
          const detJson = await fetchYouTube("videos", {
            part: "contentDetails,statistics",
            id: ids.join(","),
          });
          const map = new Map((detJson.items || []).map((d) => [d.id, d]));
          list = list.map((it) => {
            const id = it?.id?.videoId || it?.id;
            return { ...it, _details: map.get(id) };
          });
        }
        setItems(list);
        const idsQueue = list.map((it) => it?.id?.videoId || it?.id).filter(Boolean);
        if (idsQueue.length) dispatch(setQueue(idsQueue));
      } catch (e) {
        // Fallback ensure non-empty
        try {
          const fallback = await fetchYouTube("videos", {
            part: "snippet,contentDetails,statistics",
            chart: "mostPopular",
            maxResults: "20",
            regionCode: "US",
          });
          const list = Array.isArray(fallback.items) ? fallback.items : [];
          setItems(list);
          const idsQueue = list.map((it) => it?.id?.videoId || it?.id).filter(Boolean);
          if (idsQueue.length) dispatch(setQueue(idsQueue));
        } catch (_e) {
          setItems([]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRelated();
  }, [videoId, dispatch]);

  const formatCount = (num) => {
    if (num == null) return null;
    const n = Number(num);
    if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
    if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
    return n.toString();
  };

  const formatDuration = (iso) => {
    if (!iso) return null;
    const m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(iso);
    if (!m) return null;
    const h = Number(m[1] || 0);
    const min = Number(m[2] || 0);
    const s = Number(m[3] || 0);
    const parts = [];
    if (h) parts.push(String(h));
    parts.push(h ? String(min).padStart(2, "0") : String(min));
    parts.push(String(s).padStart(2, "0"));
    return parts.join(":");
  };

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold mb-2">Related videos</h2>
      {loading && (
        <div className="space-y-3" role="status" aria-live="polite">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-3 p-2">
              <div className="w-40 h-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && items.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No suggestions available.</p>
      )}
      {!loading &&
        items.map((it) => {
          const id = it?.id?.videoId || it?.id;
          const sn = it?.snippet || {};
          const dur = formatDuration(it?._details?.contentDetails?.duration);
          const views = formatCount(it?._details?.statistics?.viewCount);
          return (
            <Link to={`/watch?v=${id}`} key={id} className="block" aria-label={`Watch ${sn?.title || "video"}`}>
              <div className="flex gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2">
                <div className="relative">
                  <img
                    src={sn?.thumbnails?.medium?.url}
                    alt={sn?.title}
                    loading="lazy"
                    className="w-40 h-24 object-cover rounded-md flex-shrink-0"
                  />
                  {dur && (
                    <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 py-0.5 rounded">
                      {dur}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium line-clamp-2">{sn?.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{sn?.channelTitle}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {views ? `${views} views • ` : ""}
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
