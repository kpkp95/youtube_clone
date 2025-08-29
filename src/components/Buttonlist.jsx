import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "./Button";
import { BTN_NAME_LIST } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../utils/tabSlice";
 
const Buttonlist = ({ onTabClick }) => {
  const containerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
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
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth - 1);
  };

  // Add scroll event listener when component mounts
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Listen to scroll
    el.addEventListener("scroll", handleScroll);

    // Measure on mount and on resize/content changes
    const ro = new ResizeObserver(() => handleScroll());
    ro.observe(el);
    // Also observe children width changes
    Array.from(el.children).forEach((c) => ro.observe(c));

    const onResize = () => handleScroll();
    window.addEventListener("resize", onResize);

    // Initial measurement
    requestAnimationFrame(handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="flex overflow-x-auto px-2 items-center">
      {/* Left Scroll Button */}
      {showLeftButton && (
        <button
          aria-label="Scroll left"
          className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-full mr-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={scrollLeft}
        >
          <FaChevronLeft size={20} />
        </button>
      )}

      {/* Scrollable Button List */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide space-x-3 w-full"
      >
        {BTN_NAME_LIST.map((btnName) => (
          <Button
            key={btnName}
            btnName={btnName}
            isSelected={btnName === selectedTab} // Check if this tab is selected
            onClick={() => {
              dispatch(setTab(btnName));
              if (typeof onTabClick === "function") onTabClick(btnName);
            }}
          />
        ))}
      </div>

      {/* Right Scroll Button */}
      {showRightButton && (
        <button
          aria-label="Scroll right"
          className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-full ml-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={scrollRight}
        >
          <FaChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default Buttonlist;
