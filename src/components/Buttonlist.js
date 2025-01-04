import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "./Button";
import { BTN_NAME_LIST } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../utils/tabSlice";

const Buttonlist = ({ onTabClick }) => {
  const containerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.tab.selectedTab);

  // Function to scroll left
  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  // Function to scroll right
  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  // Function to check scroll position
  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftButton(scrollLeft > 0); // Show left button if not at the start
    setShowRightButton(scrollLeft < scrollWidth - clientWidth); // Show right button if not at the end
  };

  // Add scroll event listener when component mounts
  useEffect(() => {
    const scrollContainer = containerRef.current;

    scrollContainer.addEventListener("scroll", handleScroll);

    // Cleanup listener on unmount
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex overflow-x-auto px-2 items-center">
      {/* Left Scroll Button */}
      {showLeftButton && (
        <button
          className="p-2 bg-gray-200 rounded-full mr-2 hover:bg-gray-300"
          onClick={scrollLeft}
        >
          <FaChevronLeft size={20} />
        </button>
      )}

      {/* Scrollable Button List */}
      <div
        ref={containerRef}
        className="flex overflow-x-scroll scrollbar-hide  space-x-3 w-full"
      >
        {BTN_NAME_LIST.map((btnName) => (
          <Button
            key={btnName}
            btnName={btnName}
            isSelected={btnName === selectedTab} // Check if this tab is selected
            onClick={() => dispatch(setTab(btnName))}
          />
        ))}
      </div>

      {/* Right Scroll Button */}
      {showRightButton && (
        <button
          className="p-2 bg-gray-200 rounded-full ml-2 hover:bg-gray-300"
          onClick={scrollRight}
        >
          <FaChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default Buttonlist;
