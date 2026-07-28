"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Globe2,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Countries", href: "/countries" },
  { name: "Events", href: "/events" },
  { name: "Sermons", href: "/sermons" },
  { name: "Prayer", href: "/prayer" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-800 text-white flex items-center justify-center shadow-lg">
              <Globe2 size={24} />
            </div>

            <div>
              <h1 className="font-extrabold text-xl text-blue-900">
                DLCSF Global
              </h1>

              <p className="text-xs text-gray-500">
                Raising Kingdom Ambassadors
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden lg:flex items-center gap-8">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-medium text-gray-700 hover:text-blue-800 transition"
              >
                {link.name}
              </Link>
            ))}

            <button className="hover:text-blue-800">
              <ChevronDown size={18} />
            </button>

          </nav>

          {/* Right Side */}

          <div className="hidden lg:flex items-center gap-4">

            <button className="p-2 rounded-xl hover:bg-gray-100">
              <Search size={20} />
            </button>

            <button className="p-2 rounded-xl hover:bg-gray-100">
              <Bell size={20} />
            </button>

            <Link
              href="/login"
              className="px-5 py-2 rounded-xl border border-blue-800 text-blue-800 font-medium hover:bg-blue-50 transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-5 py-2 rounded-xl bg-blue-800 text-white font-semibold hover:bg-blue-900 transition"
            >
              Register
            </Link>

          </div>

          {/* Mobile */}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-xl">

          <div className="flex flex-col p-6 gap-5">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg"
              >
                {link.name}
              </Link>
            ))}

            <hr />

            <Link
              href="/login"
              className="py-3 text-blue-800 font-semibold"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="bg-blue-800 text-white rounded-xl py-3 text-center"
            >
              Register
            </Link>

          </div>

        </div>
      )}
    </header>
  );
}