import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  setShowSearch = () => {}, // Optional prop for mobile
  isMobile = false, // Optional prop to handle mobile-specific behavior
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      // Move down, loop back to the first item
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      // Move up, loop back to the last item
      setActiveIndex((prev) =>
        prev === 0 ? suggestions.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      // Select the active suggestion
      setSearchQuery(suggestions[activeIndex].snippet.title);
      setShowSuggestions(false);
      if (isMobile) setShowSearch(false);
    }
  };

  return (
    <div className="relative flex items-center w-full md:w-auto">
      <input
        className="w-full md:w-[250px] md-lg:w-[300px]  lg:w-[400px] xl:w-[600px]  border p-2 pl-5 border-gray-400 rounded-l-full focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        type="text"
        aria-label="Search input"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onKeyDown={handleKeyDown} // Attach keydown handler here
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        onFocus={() => setShowSuggestions(true)}
      />
      <button className="border border-gray-400 rounded-r-full p-2 px-4 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200">
        <FaSearch className="inline w-4 h-4" />
      </button>

      {showSuggestions && (
        <div
          className="absolute top-12 w-full md:w-[400px] lg:w-[600px] bg-white shadow-lg border border-gray-200 rounded-lg z-10 transition-opacity duration-300"
          role="listbox"
          aria-label="Search suggestions"
        >
          {suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <Link
                  to={"/watch?v=" + suggestion.id.videoId}
                  key={suggestion.id.videoId}
                >
                  <li
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 flex items-center ${
                      index === activeIndex ? "bg-gray-200" : ""
                    }`}
                    onMouseEnter={() => setActiveIndex(index)} // Update activeIndex on hover
                    onClick={() => {
                      setSearchQuery(suggestion.snippet.title);
                      setShowSuggestions(false);
                      if (isMobile) setShowSearch(false);
                    }}
                  >
                    <FaSearch className="mr-2 w-4 h-4 text-gray-500" />
                    {suggestion.snippet.title}
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-gray-500">No suggestions found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
