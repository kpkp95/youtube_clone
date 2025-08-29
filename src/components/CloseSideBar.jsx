import React, { useState, useEffect } from "react";
import { menuItems } from "../utils/constant";
import { Link, useLocation } from "react-router-dom";
 
const CloseSidebar = () => {
  const location = useLocation(); // Get the current route
  const [activeItem, setActiveItem] = useState("Home"); // Track active menu item

  // Update the active menu item based on the current route
  useEffect(() => {
    if (location.pathname === "/watch") {
      setActiveItem(null); // Set activeItem to null when on the /watch page
    } else {
      const matchedItem = menuItems.find((item) => {
        const routePath = (item.route || "/").split("?")[0];
        return location.pathname === routePath;
      });
      setActiveItem(matchedItem ? matchedItem.name : "Home");
    }
  }, [location.pathname]); // Run whenever the location changes

  return (
    <div className="flex md:flex-col md:justify-start md:space-y-4 p-3 shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      {/* Main Navigation */}
      <ul className="flex md:flex-col md:space-y-4 w-full text-sm justify-around">
        {menuItems.map((item) => (
          <li key={item.name} className="md:w-full">
            <Link
              to={item.route}
              onClick={() => setActiveItem(item.name)}
              className={`relative group flex flex-col items-center md:items-start w-full p-2 rounded-lg cursor-pointer ${
                activeItem === item.name
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs md:hidden">{item.name}</span>
              <span className="absolute left-16 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 md:block hidden">
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CloseSidebar;
