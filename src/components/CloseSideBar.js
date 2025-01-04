import React, { useState } from "react";
import { menuItems } from "../utils/constant";

const CloseSidebar = () => {
  const [activeItem, setActiveItem] = useState("Home"); // Track active menu item

  return (
    <div className="p-3 shadow-lg w-16 flex-shrink-0 bg-white flex flex-col items-center space-y-4">
      {/* Main Navigation */}
      <ul className="space-y-4 text-sm">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`relative group flex flex-col items-center p-2 rounded-lg cursor-pointer ${
              activeItem === item.name
                ? "bg-gray-300 text-gray-900 font-bold"
                : "hover:bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveItem(item.name)} // Update active state
          >
            <span className="text-xl">{item.icon}</span>
            {/* Tooltip */}
            <span className="absolute left-16 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CloseSidebar;
