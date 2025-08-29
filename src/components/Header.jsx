import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { YOUTUBE_IMG_URL } from "../utils/constant";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { cacheResults } from "../utils/searchSlice";
import { Link } from "react-router-dom";
import { setTab } from "../utils/tabSlice";
import SearchBar from "./SearchBar";
 
const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);
  const user = useSelector((store) => store.auth.user);

  const fetchSearchSuggestions = async () => {
    if (!searchQuery.trim()) return; // Prevent empty search queries
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${encodeURIComponent(
          searchQuery.trim()
        )}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY3}`
      );
      const data = await response.json();
      if (data.items) {
        setSuggestions(data.items);
        dispatch(cacheResults({ [searchQuery]: data.items }));
      }
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    } finally {
      setIsLoading(false);
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
    <>
      {/* Mobile Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 p-4 md:hidden  transition-opacity duration-300">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSearch(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              ←
            </button>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              suggestions={suggestions}
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
              setShowSearch={setShowSearch}
              isMobile={true}
            />
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="grid grid-flow-col items-center gap-4 p-2 pt-0 mt-0 mb-2 md:mt-0 md:mb-2 shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        {/* LEFT SECTION */}
        <div className="flex items-center space-x-2 col-span-1">
          <button
            aria-label="Toggle sidebar"
            onClick={toggleSideBar}
            className="hidden md:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <GiHamburgerMenu className="h-7 md-lg:h-8 w-8" />
          </button>
          <Link to="/" onClick={handleLogoClick}>
            <img
              src={YOUTUBE_IMG_URL}
              className="h-7 md-lg:h-8 p-1 md:mx-2 cursor-pointer dark:invert"
              alt="Youtube Logo"
            />
          </Link>
        </div>

        {/* MIDDLE SECTION */}
        <div className="hidden md:flex col-span-10 justify-center">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="flex col-span-1 items-center justify-end gap-2">
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setShowSearch(true)}
          >
            <FaSearch className="w-5 h-5" />
          </button>
          <button
            className="hidden md:flex items-center gap-2 border border-gray-400 rounded-full px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => document.body.classList.toggle("dark")}
          >
            Dark Mode
          </button>
          {user ? (
            <div className="flex items-center gap-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <FaRegUserCircle className="w-7 h-7" />
              )}
              <SignOutButton />
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
