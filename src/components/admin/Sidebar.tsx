"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  HandHeart,
  Users,
  Globe,
  CalendarDays,
  Mic2,
  ImageIcon,
  BarChart3,
  Settings,
  LogOut,
  Church,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Prayer Requests",
    href: "/admin/prayer",
    icon: HandHeart,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Countries",
    href: "/admin/countries",
    icon: Globe,
  },
  {
    name: "Events",
    href: "/admin/events",
    icon: CalendarDays,
  },
  {
    name: "Sermons",
    href: "/admin/sermons",
    icon: Mic2,
  },
  {
    name: "Gallery",
    href: "/admin/gallery",
    icon: ImageIcon,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-950 text-white shadow-2xl flex flex-col">

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">

        <div className="flex items-center gap-3">

          <div className="h-12 w-12 rounded-full bg-blue-700 flex items-center justify-center">

            <Church size={24} />

          </div>

          <div>

            <h1 className="font-bold text-lg">
              DLCSF Global
            </h1>

            <p className="text-xs text-slate-400">
              Admin Dashboard
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">

        <div className="space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                  active
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-5">

        <button className="flex w-full items-center gap-3 rounded-xl bg-red-600 px-4 py-3 transition hover:bg-red-700">

          <LogOut size={20} />

          <span>Logout</span>

        </button>

      </div>

    </aside>
  );
}