import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { menuItems, subscriptions } from "../utils/constant";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const [activeItem, setActiveItem] = useState(null); // Track active menu item

  if (!isMenuOpen) return null;

  return (
    <div className="p-5 shadow-lg  md:w-44 lg:52   h-full bg-white flex-shrink-0">
      {/* Main Navigation */}
      <ul className="space-y-2 text-sm">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center p-4 rounded-lg cursor-pointer ${
              activeItem === item.name
                ? "bg-gray-300 font-bold"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveItem(item.name)}
          >
            <Link to={item.route} className="flex items-center w-full">
              <span className="mr-5">{item.icon}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Subscription Section */}
      <h1 className="font-bold text-sm text-gray-600 pl-3 pt-6">
        Subscriptions
      </h1>
      <ul className="space-y-2 text-sm mt-3">
        {subscriptions.map((sub) => (
          <li
            key={sub.name}
            className={`flex items-center p-4 rounded-lg cursor-pointer ${
              activeItem === sub.name
                ? "bg-gray-300 font-bold"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveItem(sub.name)}
          >
            <span className="mr-5">{sub.icon}</span>
            {sub.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
