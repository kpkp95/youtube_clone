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
          className={`${
            isWatchPage
              ? "fixed z-50 h-screen bg-white opacity-85"
              : "relative h-screen"
          }`}
        >
          <Sidebar />
        </div>
      )}
      {!isMenuOpen && !isWatchPage && <CloseSidebar />}
      <Outlet />
    </div>
  );
};

export default Body;
