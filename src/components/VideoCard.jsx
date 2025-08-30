import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

const VideoCard = ({ info }) => {
  // Support objects from both videos.list (has statistics) and search.list (no statistics)
  const snippet = info?.snippet || {};
  const { channelTitle, title, thumbnails, publishedAt } = snippet;
  const stats = info?.statistics || {};
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const viewCount = stats?.viewCount ?? null;

  // Helper function to format large numbers
  const formatCount = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B"; // Billions
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M"; // Millions
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K"; // Thousands
    return num;
  };

  const thumbUrl = thumbnails?.medium?.url || thumbnails?.high?.url || thumbnails?.default?.url || "";

  return (
    <div
      className={`p-2 xs:p-3 md:p-2  md:h-72  xs:h-80 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-gray-100 shadow-md hover:shadow-lg transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 ${
        isMenuOpen
          ? "xl:w-72 lg:w-64 md:w-64 md-lg:w-72  xs:w-96 w-80 xl:m-6 lg:m-2 md:m-4 md-lg:m-6 m-2   "
          : "xl:w-80 lg:w-72 xl:m-4 md:w-80 md-lg:w-80 lg:m-2 md-lg:m-6 w-52  m-3"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          className={`w-full rounded-lg object-cover ${
            isMenuOpen ? "h-44 xs:h-52 md:h-40 " : "h-44 md:h-44 "
          }`}
          src={thumbUrl}
          alt={title}
        />
      </div>

      {/* Video Details */}
      <div className="mt-3">
        {/* Title with Tooltip */}
        <div className="relative group">
          <h3 className="text-sm font-normal line-clamp-2">{title}</h3>

          {/* Custom Tooltip */}
          <div className="absolute left-0 -top-10 hidden group-hover:block bg-black opacity-75 text-white text-xs rounded px-2 py-1 shadow-lg z-10 w-64">
            {title}
          </div>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{channelTitle}</p>
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mt-2">
          <span>{viewCount ? `${formatCount(Number(viewCount))} views` : "—"}</span>
          <span>{moment(publishedAt).fromNow()}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

