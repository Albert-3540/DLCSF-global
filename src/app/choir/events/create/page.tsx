// app/choir/events/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Music,
  MapPin,
  Clock,
  Users,
  Plus,
  Search,
  Filter,
  ChevronRight,
  Eye,
  Heart,
  Share2,
  ArrowLeft,
  X,
  ChevronDown
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  eventType: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  city: string;
  country: string;
  isOnline: boolean;
  onlineLink?: string;
  capacity: number;
  price: string;
  image?: string;
  featured: boolean;
  attendees: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["All", "Choir", "Praise", "Worship", "Hymn"];

  // Mock events data
  const mockEvents: Event[] = [
    {
      id: "1",
      title: "Annual Choir Concert 2026",
      description: "Join us for a night of powerful worship and praise",
      category: "choir",
      eventType: "concert",
      date: "2026-12-15",
      startTime: "18:00",
      endTime: "21:00",
      venue: "Deeper Life Conference Center",
      city: "Lagos",
      country: "Nigeria",
      isOnline: false,
      capacity: 500,
      price: "Free",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=640&h=360&fit=crop",
      featured: true,
      attendees: 234
    },
    {
      id: "2",
      title: "Praise Night - Deeper Life Youth",
      description: "A special praise night for the youth",
      category: "praise",
      eventType: "performance",
      date: "2026-12-20",
      startTime: "17:00",
      endTime: "20:00",
      venue: "Deeper Life Youth Center",
      city: "Abuja",
      country: "Nigeria",
      isOnline: false,
      capacity: 300,
      price: "Free",
      featured: false,
      attendees: 156
    },
    {
      id: "3",
      title: "Global Worship Conference 2026",
      description: "International worship conference with guest speakers",
      category: "worship",
      eventType: "conference",
      date: "2026-12-25",
      startTime: "09:00",
      endTime: "17:00",
      venue: "Online",
      city: "Virtual",
      country: "International",
      isOnline: true,
      onlineLink: "https://zoom.us/global-worship-conference",
      capacity: 1000,
      price: "Free",
      featured: true,
      attendees: 567
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setEvents(mockEvents);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/choir"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Choir Events
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Upcoming choir and worship events
              </p>
            </div>
          </div>
          <Link
            href="/choir/event/create"
            className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Event
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition ${
                event.featured ? 'border-yellow-400' : 'border-gray-100'
              }`}
            >
              <div className="relative h-48 bg-gradient-to-br from-purple-800 to-indigo-800">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Music className="w-16 h-16 text-white/30" />
                  </div>
                )}
                {event.featured && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-yellow-400 text-purple-950 text-xs font-bold rounded">
                    ⭐ Featured
                  </div>
                )}
                {event.isOnline && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">
                    Online
                  </div>
                )}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="px-2 py-1 bg-purple-600/90 text-white text-xs font-medium rounded">
                    {event.category.toUpperCase()}
                  </span>
                  <span className="px-2 py-1 bg-black/60 text-white text-xs font-medium rounded">
                    {event.eventType}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {event.description}
                </p>

                <div className="space-y-1.5 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    <span>{event.venue}, {event.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span>{event.attendees} attending • {event.capacity} capacity</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm font-bold text-purple-600">
                    {event.price}
                  </span>
                  <Link
                    href={`/choir/event/${event.id}`}
                    className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600">No events found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}