import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { YOUTUBE_IMG_URL, SEARCH_API_URL } from "../utils/constant";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { cacheResults } from "../utils/searchSlice";
import { Link } from "react-router-dom";
import { setTab } from "../utils/tabSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false); // Toggle suggestions visibility
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);

  const fetchSearchSuggestions = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${encodeURIComponent(
          searchQuery
        )}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY3}`
      );
      const data = await response.json();
      console.log(data);

      if (data.items) {
        setSuggestions(data.items);
        dispatch(cacheResults({ [searchQuery]: data.items }));
      }
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  //make an api call after every key press
  //but if the difference between th last key press and current key press is <200ms decline the api call
  useEffect(() => {
    if (searchQuery) {
      const timer = setTimeout(() => {
        if (searchCache[searchQuery]) {
          setSuggestions(searchCache[searchQuery]);
        } else {
          fetchSearchSuggestions(searchQuery);
        }
      }, 300); // 300ms debounce time
      return () => clearTimeout(timer); // Cleanup the timer
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleLogoClick = () => {
    dispatch(setTab(null)); // Reset selectedTab to null
  };

  const toggleSideBar = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="grid grid-flow-col  items-center gap-4 p-2 pt-0 m-2 shadow-lg">
      {/* LEFT SECTION */}
      <div className="flex items-center space-x-2 col-span-1 ">
        <GiHamburgerMenu
          onClick={toggleSideBar}
          className="h-8 w-8 p-1 cursor-pointer"
        />
        <Link to="/" onClick={handleLogoClick}>
          <img
            src={YOUTUBE_IMG_URL}
            className="h-8 p-1  mx-2 cursor-pointer"
            alt="Youtube Logo"
          />
        </Link>
      </div>

      {/* MIDDLE SECTION */}
      <div className="relative flex col-span-10 ml-80 items-center   md:justify-start ">
        <input
          className="w-1/2 border  p-2 pl-5  border-gray-400  rounded-l-full focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true); // Show suggestions on input
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay hiding dropdown
          onFocus={() => setShowSuggestions(true)} // Show suggestions on focus
        />
        <button className="border border-gray-400 rounded-r-full p-2 px-4 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200">
          <FaSearch className="inline w-4 h-4" />
        </button>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-12 w-1/2  bg-white shadow-lg border border-gray-200 rounded-lg z-10">
            <ul>
              {suggestions.map((suggestion) => (
                <Link
                  to={"/watch?v=" + suggestion.id.videoId}
                  key={suggestion.id.videoId}
                >
                  <li
                    key={suggestion.id.videoId}
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 flex items-center"
                    onClick={() => setSearchQuery(suggestion.snippet.title)} // Set input value on click
                  >
                    <FaSearch className="mr-2 w-4 h-4 text-gray-500" />
                    {suggestion.snippet.title}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="flex col-span-1 justify-end">
        <FaRegUserCircle className="h-8 w-8 cursor-pointer " />
      </div>
    </div>
  );
};

export default Header;
