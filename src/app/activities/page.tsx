// app/activities/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Activity,
  Users,
  Music,
  Calendar,
  MessageCircle,
  Heart,
  Share2,
  Eye,
  Clock,
  User,
  Plus,
  Search,
  Filter,
  ChevronDown,
  RefreshCw,
  CheckCircle,
  XCircle,
  TrendingUp,
  Sparkles,
  Bell,
  Mic,
  BookOpen,
  Video,
  Award,
  Star,
  Globe
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: 'member_joined' | 'song_added' | 'event_created' | 'rehearsal' | 'performance' | 'achievement' | 'announcement' | 'sermon' | 'prayer' | 'testimony';
  title: string;
  description: string;
  user: {
    name: string;
    avatar?: string;
    role: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  featured: boolean;
  category: string;
  link: string;
  image?: string;
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filters = ["All", "Members", "Songs", "Events", "Rehearsals", "Performances", "Achievements", "Announcements", "Sermons", "Prayer", "Testimonies"];

  // Mock activities data
  const mockActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'member_joined',
      title: '🎵 New Member Joined',
      description: 'Sarah Johnson has joined the Soprano section as a new member.',
      user: {
        name: 'Sarah Johnson',
        role: 'New Member'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      likes: 45,
      comments: 12,
      shares: 8,
      views: 234,
      featured: true,
      category: 'Members',
      link: '/choir/members/1'
    },
    {
      id: '2',
      type: 'song_added',
      title: '🎶 New Song Added',
      description: '"Amazing Grace" has been added to the choir repertoire.',
      user: {
        name: 'Michael Okonkwo',
        role: 'Choir Director'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      likes: 67,
      comments: 23,
      shares: 15,
      views: 456,
      featured: true,
      category: 'Songs',
      link: '/choir/songs/1'
    },
    {
      id: '3',
      type: 'event_created',
      title: '📅 Upcoming Event: Christmas Concert',
      description: 'Christmas Concert scheduled for December 24, 2026 at 5:00 PM.',
      user: {
        name: 'David Eze',
        role: 'Event Coordinator'
      },
      timestamp: "2026-08-04T06:20:00.000Z",
      likes: 89,
      comments: 34,
      shares: 23,
      views: 789,
      featured: false,
      category: 'Events',
      link: '/choir/events/1'
    },
    {
      id: '4',
      type: 'rehearsal',
      title: '🎤 Rehearsal Session',
      description: 'Weekly rehearsal session completed with 45 members in attendance.',
      user: {
        name: 'Grace Adeyemi',
        role: 'Rehearsal Coordinator'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      likes: 34,
      comments: 8,
      shares: 5,
      views: 345,
      featured: false,
      category: 'Rehearsals',
      link: '/choir/attendance'
    },
    {
      id: '5',
      type: 'performance',
      title: '🌟 Sunday Service Performance',
      description: 'Amazing performance during the Sunday worship service with 80 attendees.',
      user: {
        name: 'Pastor W.F. Kumuyi',
        role: 'General Superintendent'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
      likes: 156,
      comments: 45,
      shares: 34,
      views: 1234,
      featured: true,
      category: 'Performances',
      link: '/sermons'
    },
    {
      id: '6',
      type: 'sermon',
      title: '📖 New Sermon: Standing for Redemptive Truth',
      description: 'Pastor W.F. Kumuyi delivered a powerful message on standing firm in truth.',
      user: {
        name: 'Pastor W.F. Kumuyi',
        role: 'General Superintendent'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      likes: 234,
      comments: 67,
      shares: 45,
      views: 2345,
      featured: true,
      category: 'Sermons',
      link: '/sermons/1'
    },
    {
      id: '7',
      type: 'prayer',
      title: '🙏 Prayer Request: Global Peace',
      description: 'Please join us in praying for global peace and unity.',
      user: {
        name: 'Prayer Team',
        role: 'Intercessors'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
      likes: 78,
      comments: 34,
      shares: 23,
      views: 567,
      featured: false,
      category: 'Prayer',
      link: '/prayer'
    },
    {
      id: '8',
      type: 'testimony',
      title: '🙌 Testimony: Healing and Restoration',
      description: 'A powerful testimony of God\'s healing and restoration in a family.',
      user: {
        name: 'Grace Adeyemi',
        role: 'Member'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
      likes: 56,
      comments: 28,
      views: 345,
      shares: 19,
      featured: false,
      category: 'Testimonies',
      link: '/testimonies'
    },
    {
      id: '9',
      type: 'achievement',
      title: '🏆 Choir Achievement',
      description: 'Choir received recognition for excellence in worship ministry.',
      user: {
        name: 'Choir Leadership',
        role: 'Leadership Team'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
      likes: 78,
      comments: 19,
      shares: 12,
      views: 567,
      featured: false,
      category: 'Achievements',
      link: '/choir'
    },
    {
      id: '10',
      type: 'announcement',
      title: '📢 Important Announcement',
      description: 'New choir uniforms will be distributed next week. Please check your sizes.',
      user: {
        name: 'Choir Administration',
        role: 'Admin Team'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 540).toISOString(),
      likes: 56,
      comments: 28,
      shares: 19,
      views: 890,
      featured: false,
      category: 'Announcements',
      link: '/choir'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setActivities(mockActivities);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'member_joined': return <User className="w-4 h-4 text-green-500" />;
      case 'song_added': return <Music className="w-4 h-4 text-purple-500" />;
      case 'event_created': return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'rehearsal': return <Mic className="w-4 h-4 text-yellow-500" />;
      case 'performance': return <Star className="w-4 h-4 text-pink-500" />;
      case 'sermon': return <BookOpen className="w-4 h-4 text-indigo-500" />;
      case 'prayer': return <Heart className="w-4 h-4 text-red-500" />;
      case 'testimony': return <Sparkles className="w-4 h-4 text-yellow-500" />;
      case 'achievement': return <Award className="w-4 h-4 text-orange-500" />;
      case 'announcement': return <Bell className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch(type) {
      case 'member_joined': return 'bg-green-50 border-green-200';
      case 'song_added': return 'bg-purple-50 border-purple-200';
      case 'event_created': return 'bg-blue-50 border-blue-200';
      case 'rehearsal': return 'bg-yellow-50 border-yellow-200';
      case 'performance': return 'bg-pink-50 border-pink-200';
      case 'sermon': return 'bg-indigo-50 border-indigo-200';
      case 'prayer': return 'bg-red-50 border-red-200';
      case 'testimony': return 'bg-yellow-50 border-yellow-200';
      case 'achievement': return 'bg-orange-50 border-orange-200';
      case 'announcement': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
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

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "All" || activity.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading activities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Recent Activities
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Stay updated with the latest news and events from our global community
              </p>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Activities</p>
                <p className="text-2xl font-bold text-gray-800">{activities.length}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Featured</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {activities.filter(a => a.featured).length}
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Likes</p>
                <p className="text-2xl font-bold text-red-500">
                  {formatNumber(activities.reduce((sum, a) => sum + a.likes, 0))}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Views</p>
                <p className="text-2xl font-bold text-blue-500">
                  {formatNumber(activities.reduce((sum, a) => sum + a.views, 0))}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3" />
              <input
                type="text"
                placeholder="Search activities..."
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
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedFilter === filter
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Activities Feed */}
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className={`bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition ${
                activity.featured ? 'border-yellow-400 shadow-yellow-100' : 'border-gray-100'
              } ${getActivityColor(activity.type)}`}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-bold text-gray-800">
                            {activity.title}
                          </h3>
                          {activity.featured && (
                            <span className="px-2 py-0.5 bg-yellow-400 text-yellow-800 text-xs font-bold rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mt-1">{activity.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {activity.user.name}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(activity.timestamp)}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                            {activity.category}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={activity.link}
                        className="px-3 py-1.5 bg-purple-100 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-200 transition whitespace-nowrap"
                      >
                        View
                      </Link>
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {formatNumber(activity.views)} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {formatNumber(activity.likes)} likes
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {activity.comments} comments
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-3 h-3" />
                        {activity.shares} shares
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredActivities.length === 0 && (
            <div className="text-center py-16">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600">No activities found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 border-t border-gray-200 pt-6">
          <Link href="/choir" className="hover:text-purple-600 transition">Choir</Link>
          <span className="text-gray-300">|</span>
          <Link href="/sermons" className="hover:text-purple-600 transition">Sermons</Link>
          <span className="text-gray-300">|</span>
          <Link href="/events" className="hover:text-purple-600 transition">Events</Link>
          <span className="text-gray-300">|</span>
          <Link href="/prayer" className="hover:text-purple-600 transition">Prayer</Link>
          <span className="text-gray-300">|</span>
          <Link href="/testimonies" className="hover:text-purple-600 transition">Testimonies</Link>
        </div>
      </div>
    </div>
  );
}