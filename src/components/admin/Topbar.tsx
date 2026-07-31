"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Search,
  Menu,
  UserCircle2,
  CalendarDays,
} from "lucide-react";

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();

    setCurrentDate(
      now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">

      <div className="flex items-center justify-between px-6 py-4">

        {/* Left Section */}

        <div className="flex items-center gap-4">

          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>

          <div>

            <h1 className="text-2xl font-bold text-slate-900">
              Dashboard
            </h1>

            <p className="text-sm text-gray-500 flex items-center gap-2">

              <CalendarDays size={16} />

              {currentDate}

            </p>

          </div>

        </div>

        {/* Search */}

        <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-[380px]">

          <Search size={18} className="text-gray-500" />

          <input
            type="text"
            placeholder="Search users, prayers, events..."
            className="bg-transparent outline-none px-3 w-full"
          />

        </div>

        {/* Right Section */}

        <div className="flex items-center gap-5">

          <button className="relative">

            <Bell size={24} />

            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">

              3

            </span>

          </button>

          <div className="flex items-center gap-3">

            <UserCircle2
              size={40}
              className="text-blue-700"
            />

            <div className="hidden sm:block">

              <p className="font-semibold text-slate-900">
                Super Admin
              </p>

              <p className="text-sm text-gray-500">
                admin@dlcsf.org
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}