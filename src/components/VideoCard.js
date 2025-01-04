import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const { viewCount } = statistics;

  // Helper function to format large numbers
  const formatCount = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B"; // Billions
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M"; // Millions
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K"; // Thousands
    return num;
  };

  return (
    <div
      className={`p-3 h-72  hover:bg-gray-200 text-black rounded-lg bg-white shadow-md hover:shadow-lg transition duration-200 ${
        isMenuOpen ? "w-72 m-3 " : "w-80 m-4 "
      }`}
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          className={`w-full  rounded-lg object-cover ${
            isMenuOpen ? "h-40" : "h-44"
          }`}
          src={thumbnails.medium.url}
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

        <p className="text-xs text-gray-600 mt-1">{channelTitle}</p>
        <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
          <span>{formatCount(viewCount)} views</span>
          <span>{moment(publishedAt).fromNow()}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
