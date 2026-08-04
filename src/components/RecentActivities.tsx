// components/RecentActivities.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Heart,
  User,
  Calendar,
  Music,
  Clock,
  Eye,
  ThumbsUp,
  Share2,
  Users,
  Globe,
  Bell,
  TrendingUp,
  Flame,
  Sparkles,
  ChevronRight,
  RefreshCw,
  Filter,
  X,
  CheckCircle,
  Mic,
  BookOpen,
  Video,
  Award
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Activity {
  id: string;
  type: 'sermon' | 'choir' | 'event' | 'prayer' | 'testimony' | 'bible_study' | 'live_stream';
  title: string;
  description: string;
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  featured: boolean;
  category: string;
  image?: string;
  link: string;
}

export default function RecentActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const filters = ["All", "Sermons", "Choir", "Events", "Prayer", "Testimonies", "Bible Study", "Live"];

  // Mock data for activities - removed image references to fix 404
  const mockActivities: Activity[] = [
    {
      id: '1',
      type: 'live_stream',
      title: '🔴 LIVE: Sunday Worship Service',
      description: 'Join us for a powerful time of worship and the Word with Pastor W.F. Kumuyi',
      user: {
        name: 'Deeper Life Global',
        avatar: '',
        role: 'Ministry'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      likes: 2345,
      comments: 156,
      shares: 89,
      views: 1247,
      featured: true,
      category: 'Live',
      link: '/live'
    },
    {
      id: '2',
      type: 'choir',
      title: '🎵 Amazing Grace - Deeper Life Choir',
      description: 'A powerful worship performance by the Deeper Life Choir',
      user: {
        name: 'Deeper Life Choir',
        avatar: '',
        role: 'Worship Team'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      likes: 856,
      comments: 67,
      shares: 34,
      views: 456,
      featured: false,
      category: 'Choir',
      link: '/choir'
    },
    {
      id: '3',
      type: 'testimony',
      title: '🙏 Testimony: Healing and Restoration',
      description: 'A powerful testimony of God\'s healing and restoration in a family',
      user: {
        name: 'Sarah Johnson',
        avatar: '',
        role: 'Member'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      likes: 345,
      comments: 45,
      shares: 23,
      views: 234,
      featured: false,
      category: 'Testimonies',
      link: '/testimonies'
    },
    {
      id: '4',
      type: 'event',
      title: '📅 Global Prayer Conference 2026',
      description: 'Annual global prayer conference happening online and in-person',
      user: {
        name: 'Events Team',
        avatar: '',
        role: 'Organizer'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      likes: 567,
      comments: 89,
      shares: 45,
      views: 789,
      featured: false,
      category: 'Events',
      link: '/events'
    },
    {
      id: '5',
      type: 'sermon',
      title: '📖 Standing for Redemptive Truth',
      description: 'A powerful message on standing firm in truth against religious tradition',
      user: {
        name: 'Pastor W.F. Kumuyi',
        avatar: '',
        role: 'General Superintendent'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      likes: 1234,
      comments: 98,
      shares: 56,
      views: 2345,
      featured: true,
      category: 'Sermons',
      link: '/sermons'
    },
    {
      id: '6',
      type: 'bible_study',
      title: '📚 Bible Study: The Power of Prayer',
      description: 'Join our weekly bible study exploring the power of prayer',
      user: {
        name: 'Bible Study Team',
        avatar: '',
        role: 'Teacher'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
      likes: 234,
      comments: 56,
      shares: 12,
      views: 567,
      featured: false,
      category: 'Bible Study',
      link: '/bible-study'
    },
    {
      id: '7',
      type: 'prayer',
      title: '🙌 Prayer Request: Global Peace',
      description: 'Please join us in praying for global peace and unity',
      user: {
        name: 'Prayer Team',
        avatar: '',
        role: 'Intercessor'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      likes: 456,
      comments: 78,
      shares: 34,
      views: 678,
      featured: false,
      category: 'Prayer',
      link: '/prayer'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setActivities(mockActivities);
      setNotificationCount(mockActivities.filter(a => a.featured).length);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setActivities(prev => [
        {
          id: '8',
          type: 'live_stream',
          title: '🔴 NEW: Evening Prayer Service',
          description: 'Join us for evening prayer and worship',
          user: {
            name: 'Deeper Life Global',
            avatar: '',
            role: 'Ministry'
          },
          timestamp: new Date().toISOString(),
          likes: 0,
          comments: 0,
          shares: 0,
          views: 0,
          featured: true,
          category: 'Live',
          link: '/live'
        },
        ...prev
      ]);
      setNotificationCount(prev => prev + 1);
      setIsRefreshing(false);
    }, 1500);
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diff = Math.floor((now.getTime() - then.getTime()) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return then.toLocaleDateString();
  };

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'live_stream': return <Mic className="w-4 h-4 text-red-500" />;
      case 'choir': return <Music className="w-4 h-4 text-purple-500" />;
      case 'testimony': return <Sparkles className="w-4 h-4 text-yellow-500" />;
      case 'event': return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'sermon': return <BookOpen className="w-4 h-4 text-green-500" />;
      case 'bible_study': return <BookOpen className="w-4 h-4 text-indigo-500" />;
      case 'prayer': return <Heart className="w-4 h-4 text-pink-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredActivities = selectedFilter === "All" 
    ? activities 
    : activities.filter(a => a.category === selectedFilter);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading recent activities...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <span className="text-blue-600 font-semibold text-sm">LIVE ACTIVITY</span>
              {notificationCount > 0 && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">
                  {notificationCount} new
                </span>
              )}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Recent <span className="text-blue-600">Activities</span>
            </h2>
            <p className="text-gray-600 mt-2">
              Stay updated with the latest happenings in our global community
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition transform hover:scale-105 duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedFilter === filter
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            {selectedFilter !== "All" && (
              <button
                onClick={() => setSelectedFilter("All")}
                className="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <X className="w-4 h-4" /> Clear Filter
              </button>
            )}
          </motion.div>
        )}

        {/* Activities Feed */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ${
                  activity.featured ? 'border-l-4 border-blue-500' : 'border border-gray-100'
                } overflow-hidden`}
              >
                <Link href={activity.link} className="block p-6 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Avatar - Using initials instead of images to avoid 404 */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                        activity.featured 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                          : 'bg-gradient-to-br from-gray-500 to-gray-600'
                      }`}>
                        {getInitials(activity.user.name)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-900">
                              {activity.user.name}
                            </span>
                            <span className="text-sm text-gray-500">{activity.user.role}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatTime(activity.timestamp)}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mt-1 hover:text-blue-600 transition">
                            {activity.title}
                          </h3>
                          <p className="text-gray-600 mt-1 line-clamp-2">{activity.description}</p>
                        </div>
                        <div className="flex-shrink-0">
                          {activity.featured && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Featured
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {formatNumber(activity.views)} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5" />
                          {formatNumber(activity.likes)} likes
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {activity.comments} comments
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="w-3.5 h-3.5" />
                          {activity.shares} shares
                        </span>
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full">
                          {getActivityIcon(activity.type)}
                          <span className="font-medium">{activity.category}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600">No activities found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition transform hover:scale-105 duration-200"
          >
            View All Activities
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Live Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span>Live updates • {activities.length} activities • {notificationCount} new</span>
        </div>
      </div>
    </section>
  );
}