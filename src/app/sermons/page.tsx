"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Play,
  Clock,
  User,
  Calendar,
  ArrowRight,
  BookOpen,
  Music,
  Heart,
  Share2,
  Download,
  ThumbsUp,
  MessageCircle,
  Eye,
} from "lucide-react";

const sermons = [
  {
    id: 1,
    title: "Faith And Spiritual Growth",
    speaker: "Pastor John Okonkwo",
    date: "December 10, 2026",
    duration: "45:30",
    views: 234,
    likes: 89,
    category: "Faith",
    description: "Understanding the journey of faith and how to grow spiritually in your walk with God.",
    featured: true,
  },
  {
    id: 2,
    title: "The Power of Prayer",
    speaker: "Evangelist Mary Nwachukwu",
    date: "December 3, 2026",
    duration: "38:15",
    views: 189,
    likes: 67,
    category: "Prayer",
    description: "Discover the transformative power of prayer and how to build a consistent prayer life.",
    featured: false,
  },
  {
    id: 3,
    title: "Walking in God's Purpose",
    speaker: "Pastor David Okafor",
    date: "November 26, 2026",
    duration: "52:20",
    views: 312,
    likes: 94,
    category: "Purpose",
    description: "Finding and walking in the purpose God has designed specifically for your life.",
    featured: false,
  },
  {
    id: 4,
    title: "Overcoming Fear and Doubt",
    speaker: "Minister Grace Adeyemi",
    date: "November 19, 2026",
    duration: "41:45",
    views: 156,
    likes: 72,
    category: "Faith",
    description: "Practical steps to overcome fear and doubt through faith in God's promises.",
    featured: false,
  },
  {
    id: 5,
    title: "Worship As A Lifestyle",
    speaker: "Worship Leader Samuel Chukwu",
    date: "November 12, 2026",
    duration: "48:10",
    views: 278,
    likes: 103,
    category: "Worship",
    description: "Understanding worship beyond Sunday service and making it a daily lifestyle.",
    featured: false,
  },
  {
    id: 6,
    title: "Breaking Generational Curses",
    speaker: "Pastor Paul Eze",
    date: "November 5, 2026",
    duration: "55:00",
    views: 198,
    likes: 76,
    category: "Deliverance",
    description: "Discovering freedom from generational patterns through the power of Christ.",
    featured: false,
  },
];

const categories = ["All", ...new Set(sermons.map(s => s.category))];

export default function SermonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch =
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || sermon.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredSermon = sermons.find(s => s.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <BookOpen size={48} className="mx-auto text-yellow-400 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sermons</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Grow in your faith through powerful messages and teachings from our global ministry.
          </p>
        </div>
      </section>

      {/* Featured Sermon */}
      {featuredSermon && (
        <section className="py-12 px-6 bg-white border-b">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-yellow-400 text-blue-950 text-xs font-bold px-3 py-1 rounded-full">
                FEATURED
              </span>
              <span className="text-gray-500 text-sm">|</span>
              <span className="text-gray-500 text-sm">Latest Message</span>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  {featuredSermon.title}
                </h2>
                <p className="text-gray-600 mb-4">{featuredSermon.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <User size={16} />
                    {featuredSermon.speaker}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {featuredSermon.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {featuredSermon.duration}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-800 transition flex items-center gap-2">
                    <Play size={18} />
                    Watch Now
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center gap-2">
                    <Download size={18} />
                    Download
                  </button>
                </div>
              </div>
              <div className="md:w-80 h-48 md:h-auto bg-gradient-to-br from-blue-700 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <Play size={64} className="mx-auto text-yellow-400 opacity-50" />
                  <p className="text-sm text-blue-200 mt-2">Sermon Preview</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-8 px-6 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search sermons by title, speaker, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    selectedCategory === category
                      ? "bg-blue-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              {filteredSermons.length} {filteredSermons.length === 1 ? "Sermon" : "Sermons"}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Sort by:</span>
              <select className="border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Latest</option>
                <option>Popular</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSermons.map((sermon) => (
              <div
                key={sermon.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition group"
              >
                <div className="h-40 bg-gradient-to-br from-blue-800 to-indigo-800 relative flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
                      <Play size={32} className="text-yellow-400" />
                    </div>
                    <p className="text-xs text-blue-200">{sermon.duration}</p>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-1">
                    {sermon.featured && (
                      <span className="bg-yellow-400 text-blue-950 text-xs font-bold px-2 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                    <span className="bg-black/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur">
                      {sermon.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-700 transition">
                    {sermon.title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <User size={14} />
                    <span>{sermon.speaker}</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                    {sermon.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {sermon.date}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {sermon.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={12} />
                        {sermon.likes}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                    <button className="flex-1 bg-blue-900 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition flex items-center justify-center gap-1">
                      <Play size={14} />
                      Watch
                    </button>
                    <button className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-gray-600">
                      <Share2 size={16} />
                    </button>
                    <button className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-gray-600">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSermons.length === 0 && (
            <div className="text-center py-16">
              <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-600">No sermons found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-950 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated With New Sermons</h2>
          <p className="text-blue-200 mb-6">
            Subscribe to get notified when new messages and teachings are released.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-400 text-blue-950 px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-blue-300 mt-3">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}