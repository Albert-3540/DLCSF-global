"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SearchResult {
  title: string;
  type: string;
  url: string;
  category: string;
  description?: string;
}

// All searchable content on your site
const searchData: SearchResult[] = [
  // Pages
  { title: "Home", type: "Page", url: "/", category: "page", description: "Welcome to DLCSF Global" },
  { title: "Events", type: "Page", url: "/events", category: "page", description: "Upcoming events and conferences" },
  { title: "Gallery", type: "Page", url: "/gallery", category: "page", description: "Photo gallery of our activities" },
  { title: "Prayer Requests", type: "Page", url: "/prayer", category: "page", description: "Submit and view prayer requests" },
  { title: "Contact Us", type: "Page", url: "/contact", category: "page", description: "Get in touch with us" },
  
  // Events
  { title: "Prayer Conference 2026", type: "Event", url: "/events", category: "event", description: "Annual prayer conference" },
  { title: "Campus Fellowship", type: "Event", url: "/events", category: "event", description: "Weekly campus gatherings" },
  { title: "Global Mission Trip", type: "Event", url: "/events", category: "event", description: "Mission outreach program" },
  { title: "Worship Night", type: "Event", url: "/events", category: "event", description: "Evening worship service" },
  { title: "Leadership Retreat", type: "Event", url: "/events", category: "event", description: "Leadership development retreat" },
  
  // Prayer Categories
  { title: "Spiritual Growth", type: "Prayer", url: "/prayer", category: "prayer", description: "Prayer for spiritual growth" },
  { title: "Healing Prayer", type: "Prayer", url: "/prayer", category: "prayer", description: "Prayer for healing and restoration" },
  { title: "Family Prayer", type: "Prayer", url: "/prayer", category: "prayer", description: "Prayer for families" },
  { title: "Thanksgiving", type: "Prayer", url: "/prayer", category: "prayer", description: "Prayer of thanksgiving" },
  { title: "Academic Success", type: "Prayer", url: "/prayer", category: "prayer", description: "Prayer for studies and exams" },
  { title: "Financial Breakthrough", type: "Prayer", url: "/prayer", category: "prayer", description: "Prayer for financial provision" },
  
  // Gallery
  { title: "Gallery 2024", type: "Gallery", url: "/gallery", category: "gallery", description: "Photos from 2024 events" },
  { title: "Gallery 2025", type: "Gallery", url: "/gallery", category: "gallery", description: "Photos from 2025 events" },
  { title: "Conference Photos", type: "Gallery", url: "/gallery", category: "gallery", description: "Conference photo collection" },
  { title: "Outreach Photos", type: "Gallery", url: "/gallery", category: "gallery", description: "Outreach program photos" },
];

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle search
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    const filtered = searchData.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.type.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        (item.description && item.description.toLowerCase().includes(searchTerm))
      );
    });

    setResults(filtered);
    setSelectedIndex(-1);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery("");
        setResults([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            window.location.href = results[selectedIndex].url;
          }
          break;
        case "Escape":
          setIsOpen(false);
          setQuery("");
          setResults([]);
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Clear search
  const clearSearch = () => {
    setQuery("");
    setResults([]);
    inputRef.current?.focus();
  };

  // Open search
  const openSearch = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div ref={searchRef} className="relative">
      {/* Search Button */}
      <button
        onClick={openSearch}
        className="p-2 rounded-lg hover:bg-gray-100 transition"
        aria-label="Search"
      >
        <Search size={20} className="text-gray-600" />
      </button>

      {/* Search Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border overflow-hidden z-50">
          {/* Search Input */}
          <div className="p-3 border-b">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search pages, events, prayers..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 outline-none text-sm w-full"
                autoFocus
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-gray-600 shrink-0"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto">
            {results.length > 0 ? (
              <div>
                {/* Result count */}
                <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 border-b">
                  Found {results.length} result{results.length !== 1 ? "s" : ""}
                </div>

                {/* Results list */}
                {results.map((result, index) => (
                  <Link
                    key={index}
                    href={result.url}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                      setResults([]);
                    }}
                    className={`flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition border-b last:border-0 ${
                      selectedIndex === index ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{result.title}</p>
                      {result.description && (
                        <p className="text-xs text-gray-500 truncate">{result.description}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-0.5">{result.type}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {result.category}
                      </span>
                      <ArrowRight size={14} className="text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : query ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <Search size={40} className="mx-auto text-gray-300 mb-2" />
                <p className="font-medium">No results found</p>
                <p className="text-sm text-gray-400 mt-1">
                  Try adjusting your search terms
                </p>
              </div>
            ) : (
              <div className="px-4 py-6 text-center text-gray-400 text-sm">
                <p className="font-medium text-gray-600">Search for anything</p>
                <div className="flex flex-wrap gap-2 justify-center mt-3">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">Pages</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">Events</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">Prayers</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">Gallery</span>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Use arrow keys to navigate, Enter to select
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}