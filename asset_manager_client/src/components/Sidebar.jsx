import React, { useState } from "react";
import { Icon } from "@blueprintjs/core";

export default function Sidebar({ collapsed, toggleSidebar }) {
  return (
    <div
      className={`flex flex-col fixed  bg-green-700 shadow-lg h-screen overflow-y-auto transition-all duration-500 ease-in-out ${
        collapsed ? "w-16" : "w-64"
      } text-white z-10`}
    >
      {" "}
      {/* Sidebar Header/Logo Section */}
      <div className="flex items-center justify-between p-4 bg-green-800">
        {!collapsed && <h1 className="text-3xl text-white">AssetCore</h1>}{" "}
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-400 hover:text-white"
        >
          <Icon
            icon={collapsed ? "double-chevron-right" : "double-chevron-left"}
            color="white"
          />
        </button>{" "}
      </div>
      {/* Navbar Links Section */}
      <ul className="flex-grow space-y-3 px-4 py-2">
        <li className="flex items-center space-x-3 cursor-pointer hover:bg-green-600 p-2 rounded-md text-white">
          <Icon icon="home" color="white" /> {!collapsed && <span>Home</span>}
        </li>
        <li className="flex items-center space-x-3 cursor-pointer hover:bg-green-600 p-2 rounded-md text-white">
          <Icon icon="desktop" color="white" />{" "}
          {!collapsed && <span>Devices</span>}
        </li>
        <li className="flex items-center space-x-3 cursor-pointer hover:bg-green-600 p-2 rounded-md text-white">
          <Icon icon="applications" color="white" />{" "}
          {!collapsed && <span>Licenses</span>}
        </li>
        <li className="flex items-center space-x-3 cursor-pointer hover:bg-green-600 p-2 rounded-md text-white">
          <Icon icon="intelligence" color="white" />{" "}
          {!collapsed && <span>Assistant</span>}
        </li>
        <li className="flex items-center space-x-3 cursor-pointer hover:bg-green-600 p-2 rounded-md text-white">
          <Icon icon="document" color="white" />{" "}
          {!collapsed && <span>Reports</span>}
        </li>
      </ul>
      <div className="border-t p-4 flex flex-col gap-3">
        <ul>
          <li className="flex items-center space-x-4 cursor-pointer hover:bg-green-600 p-2 rounded-md text-white">
            <Icon icon="cog" color="white" />
            {!collapsed && <span>Settings</span>}
          </li>
          <li className="flex items-center space-x-4 cursor-pointer hover:bg-green-600 p-2 rounded-md text-white">
            <Icon icon="user" color="white" />
            {!collapsed && <span>My AssetCore Account</span>}
          </li>
        </ul>
      </div>
    </div>
  );
}
