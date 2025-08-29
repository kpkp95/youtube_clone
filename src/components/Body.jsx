import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
 
import { useSelector, useDispatch } from "react-redux";
import CloseSidebar from "./CloseSideBar";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { setMenuOpen } from "../utils/appSlice"; // Import setMenuOpen action

const Body = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen); // Sidebar toggle state
  const location = useLocation(); // Get the current location
  const dispatch = useDispatch();

  // Check if we are on the /watch page
  const isWatchPage = location.pathname === "/watch";

  // Ensure the sidebar is open on the home page
  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(setMenuOpen(true));
    }
  }, [location.pathname, dispatch]);

  return (
    <div className="relative flex w-full  overflow-hidden">
      {isMenuOpen && (
        <div
          className={`hidden md:block ${
            isWatchPage
              ? "fixed z-50 h-full bg-white dark:bg-gray-900 opacity-90 dark:opacity-95"
              : "relative"
          }`}
        >
          <Sidebar />
        </div>
      )}
      {!isMenuOpen && !isWatchPage && (
        <CloseSidebar className="hidden md:block " />
      )}
      {/* CloseSidebar for smaller screens (at the bottom) */}
      <div className="fixed bottom-0 left-0 w-full md:hidden z-50">
        <CloseSidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default Body;
