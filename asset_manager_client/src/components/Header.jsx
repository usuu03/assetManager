import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdDevices, MdDashboard } from "react-icons/md";
import { IoMdApps } from "react-icons/io";
import { AiFillOpenAI } from "react-icons/ai";

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-green-700 z-50">
      <nav className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Brand */}
        <Link to="*" className="text-white text-lg font-bold tracking-wide">
          Asset Tracker
        </Link>
        {/* Toggle for mobile */}
        <button
          className="lg:hidden text-white focus:outline-none"
          aria-controls="navbar"
        >
          <span className="sr-only">Open Menu</span>
          &#9776;
        </button>

        {/* Links */}
        <div
          id="navbar"
          className="hidden lg:flex lg:items-center lg:space-x-6"
        >
          <NavLink
            to="/dashboard"
            className="text-white hover:underline flex item-center font-semibold"
          >
            <MdDashboard />
          </NavLink>

          <NavLink
            to="/devices"
            className="text-white hover:underline flex item-center font-semibold"
          >
            <MdDevices className="hover:underline" />
          </NavLink>
          <NavLink
            to="/software"
            className="text-white hover:underline flex item-center font-semibold"
          >
            <IoMdApps />
          </NavLink>
          <NavLink
            to="/assistant"
            className="text-white hover:underline flex item-center font-semibold"
          >
            <AiFillOpenAI />
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
