"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Menu,
  X,
  User,
  Home,
  Calendar,
  Heart,
  Camera,
  Mail,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import SearchBar from "@/components/ui/SearchBar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Prayer Request",
      message: "Someone needs your prayers.",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Upcoming Event",
      message: "Global Prayer Conference tomorrow.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Welcome!",
      message: "Welcome to DLCSF Global!",
      time: "2 hours ago",
      read: true,
    },
  ]);

  const pathname = usePathname();
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Gallery", href: "/gallery", icon: Camera },
    { name: "Prayer", href: "/prayer", icon: Heart },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              D
            </div>
            <span className="text-xl font-bold text-blue-900 hidden sm:block">
              DLCSF
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                    isActive
                      ? "bg-blue-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Search - Using the SearchBar component */}
            <SearchBar />

            {/* Notifications */}
            <div ref={notificationRef} className="relative">
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsProfileOpen(false);
                }}
                className="p-2 rounded-lg hover:bg-gray-100 transition relative"
                aria-label="Notifications"
              >
                <Bell size={20} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border overflow-hidden z-50">
                  <div className="flex justify-between items-center p-3 border-b">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => markAsRead(notification.id)}
                          className={`px-4 py-3 border-b last:border-0 hover:bg-gray-50 cursor-pointer transition ${
                            !notification.read ? "bg-blue-50" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm ${!notification.read ? "font-medium text-gray-800" : "text-gray-600"}`}>
                                {notification.title}
                              </p>
                              <p className="text-gray-600 text-sm mt-1 truncate">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-gray-500">
                        <Bell size={40} className="mx-auto text-gray-300 mb-2" />
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationsOpen(false);
                }}
                className="flex items-center gap-1 sm:gap-2 p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Profile"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  U
                </div>
                <ChevronDown size={16} className="text-gray-600 hidden sm:block" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border overflow-hidden z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="font-medium text-gray-800">Guest User</p>
                    <p className="text-sm text-gray-500">guest@dlcsf.org</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User size={18} className="text-gray-600" />
                      <span className="text-sm">My Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings size={18} className="text-gray-600" />
                      <span className="text-sm">Settings</span>
                    </Link>
                    <hr className="my-1" />
                    <button
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition w-full text-left text-red-600"
                      onClick={() => {
                        console.log("Logout clicked");
                        setIsProfileOpen(false);
                      }}
                    >
                      <LogOut size={18} />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition ml-1"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-blue-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
            <hr className="my-2" />
            <Link
              href="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              <User size={20} />
              <span className="font-medium">Profile</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}