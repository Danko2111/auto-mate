"use client";

import { usePathname } from "next/navigation";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { TbLogs } from "react-icons/tb";
import { FaCarSide } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { LuChevronsRight } from "react-icons/lu";

export default function AppNav() {
  const pathname = usePathname();

  const [navOpen, setNavOpen] = useState(true);

  const navStateHandler = () => {
    setNavOpen((prevState) => (prevState === true ? false : true));
  };

  return (
    <nav
      className={`bg-base-300 py-6 px-2 relative transition-width ${
        navOpen ? "w-64" : "w-60px"
      }`}
    >
      <ul className={`menu gap-3 p-0 flex-nowrap`}>
        <li>
          {navOpen ? (
            <Link
              href="/dashboard/overview"
              className={`p-3 whitespace-nowrap ${
                pathname === "/overview" ? "active" : ""
              }`}
            >
              <FaHome className="w-5 h-5 mr-1" />
              Overview
            </Link>
          ) : (
            <Link
              href="/dashboard/overview"
              data-tip="Overview"
              className={`tooltip tooltip-right p-3 w-fit h-fit ${
                pathname === "/overview" ? "active" : ""
              }`}
            >
              <FaHome className="w-5 h-5" />
            </Link>
          )}
        </li>
        <li>
          {navOpen ? (
            <Link
              href="/dashboard/my-cars"
              className={`p-3 whitespace-nowrap ${
                pathname === "/my-cars" ? "active" : ""
              }`}
            >
              <FaCarSide className="w-5 h-5 mr-1" />
              My Cars
            </Link>
          ) : (
            <Link
              href="/dashboard/my-cars"
              data-tip="My Cars"
              className={`tooltip tooltip-right p-3 w-fit h-fit ${
                pathname === "/my-cars" ? "active" : ""
              }`}
            >
              <FaCarSide className="w-5 h-5" />
            </Link>
          )}
        </li>
        <li>
          {navOpen ? (
            <Link
              href="/dashboard/schedule"
              className={`p-3 whitespace-nowrap ${
                pathname === "/schedule" ? "active" : ""
              }`}
            >
              <RiCalendarScheduleLine className="w-5 h-5 mr-1" />
              Schedule
            </Link>
          ) : (
            <Link
              href="/dashboard/schedule"
              data-tip="Schedule"
              className={`tooltip tooltip-right p-3 w-fit h-fit ${
                pathname === "/schedule" ? "active" : ""
              }`}
            >
              <RiCalendarScheduleLine className="w-5 h-5" />
            </Link>
          )}
        </li>
        <li>
          {navOpen ? (
            <Link
              href="/dashboard/logs"
              className={`p-3 whitespace-nowrap ${
                pathname === "/logs" ? "active" : ""
              }`}
            >
              <TbLogs className="w-5 h-5 mr-1" />
              Logs
            </Link>
          ) : (
            <Link
              href="/dashboard/logs"
              data-tip="Logs"
              className={`tooltip tooltip-right p-3 w-fit h-fit ${
                pathname === "/logs" ? "active" : ""
              }`}
            >
              <TbLogs className="w-5 h-5" />
            </Link>
          )}
        </li>
      </ul>
      <button
        className="absolute bottom-3 -right-3 p-1 rounded-full bg-base-300 border border-neutral-500"
        onClick={navStateHandler}
      >
        <LuChevronsRight
          className={`transition-rotate ${navOpen ? "rotate-180" : ""}`}
        />
      </button>
    </nav>
  );
}
