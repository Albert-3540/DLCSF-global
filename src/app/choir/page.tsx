// app/choir/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  UserPlus,
  Calendar,
  Music,
  Mic,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  User,
  Mail,
  Phone,
  MapPin,
  Star,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Volume2,
  Volume1,
  VolumeX,
  CalendarPlus,
  Music2,
  Activity,
  BarChart3,
  TrendingUp,
  Award,
  Gift,
  Heart,
  MessageCircle,
  Share2,
  Youtube,
  Instagram,
  Twitter,
  Facebook
} from "lucide-react";

interface StatCard {
  title: string;
  value: number;
  icon: any;
  color: string;
  bgColor: string;
  change?: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: any;
  href: string;
  color: string;
}

export default function ChoirDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<StatCard[]>([]);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setStats([
        {
          title: 'Total Members',
          value: 45,
          icon: Users,
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
          change: '+12%'
        },
        {
          title: 'Voice Parts',
          value: 5,
          icon: Mic,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          change: '+2'
        },
        {
          title: 'Upcoming Events',
          value: 8,
          icon: Calendar,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          change: '+3'
        },
        {
          title: 'Active Songs',
          value: 24,
          icon: Music,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          change: '+5'
        }
      ]);

      setQuickActions([
        {
          title: 'Add Member',
          description: 'Add a new choir member',
          icon: UserPlus,
          href: '/choir/members/add',
          color: 'bg-purple-100 text-purple-600'
        },
        {
          title: 'Create Event',
          description: 'Schedule a new event',
          icon: CalendarPlus,
          href: '/choir/event/create',
          color: 'bg-blue-100 text-blue-600'
        },
        {
          title: 'Add Song',
          description: 'Add to repertoire',
          icon: Music2,
          href: '/choir/songs/add',
          color: 'bg-green-100 text-green-600'
        },
        {
          title: 'View Members',
          description: 'Manage members',
          icon: Users,
          href: '/choir/members',
          color: 'bg-yellow-100 text-yellow-600'
        },
        {
          title: 'Voice Parts',
          description: 'Manage voice sections',
          icon: Mic,
          href: '/choir/voice-parts',
          color: 'bg-pink-100 text-pink-600'
        },
        {
          title: 'Attendance',
          description: 'Track attendance',
          icon: Activity,
          href: '/choir/attendance',
          color: 'bg-red-100 text-red-600'
        }
      ]);
      
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading choir dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              🎵 Choir Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your choir ministry effectively
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">Refresh</span>
            </button>
            <Link
              href="/choir/members/add"
              className="flex-1 sm:flex-none px-4 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span className="text-sm">Add Member</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-4 hover:shadow-xl transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">{stat.title}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800">{stat.value}</p>
                    {stat.change && (
                      <p className="text-xs text-green-600">{stat.change}</p>
                    )}
                  </div>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  href={action.href}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-4 hover:shadow-xl transition group text-center"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-800">{action.title}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 hidden sm:block">{action.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
              <Link href="/choir/activity" className="text-sm text-purple-600 hover:text-purple-700">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { user: 'Sarah Johnson', action: 'joined the choir', time: '2 hours ago', icon: UserPlus },
                { user: 'Michael Okonkwo', action: 'added new song "Amazing Grace"', time: '4 hours ago', icon: Music },
                { user: 'Grace Adeyemi', action: 'checked in for rehearsal', time: '6 hours ago', icon: CheckCircle },
                { user: 'David Eze', action: 'scheduled Christmas Concert', time: '1 day ago', icon: Calendar },
              ].map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Upcoming Events</h2>
              <Link href="/choir/events" className="text-sm text-purple-600 hover:text-purple-700">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Choir Rehearsal', date: 'Dec 15, 2026', time: '6:00 PM', attendees: 45 },
                { title: 'Sunday Worship Service', date: 'Dec 17, 2026', time: '8:00 AM', attendees: 80 },
                { title: 'Christmas Concert', date: 'Dec 24, 2026', time: '5:00 PM', attendees: 120 },
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition border border-gray-100">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{event.title}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {event.attendees}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/choir/event/${index + 1}`}
                    className="px-3 py-1.5 bg-purple-100 text-purple-600 rounded-lg text-xs font-medium hover:bg-purple-200 transition"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Voice Parts Overview */}
        <div className="mt-6 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Voice Parts Overview</h2>
            <Link href="/choir/voice-parts" className="text-sm text-purple-600 hover:text-purple-700">
              Manage Voice Parts
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {[
              { name: 'Soprano', count: 12, color: '#EC4899', lead: 'Sarah Johnson' },
              { name: 'Alto', count: 10, color: '#8B5CF6', lead: 'Grace Adeyemi' },
              { name: 'Tenor', count: 8, color: '#3B82F6', lead: 'Michael Okonkwo' },
              { name: 'Bass', count: 6, color: '#F59E0B', lead: 'David Eze' },
              { name: 'Baritone', count: 4, color: '#10B981', lead: 'James Okafor' },
            ].map((part, index) => (
              <div
                key={index}
                className="p-3 rounded-xl border border-gray-100 hover:shadow-md transition"
                style={{ borderLeftColor: part.color, borderLeftWidth: '4px' }}
              >
                <p className="font-semibold text-gray-800">{part.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="w-3 h-3" />
                  <span>{part.count} members</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Lead: {part.lead}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 border-t border-gray-200 pt-6">
          <Link href="/choir/members" className="hover:text-purple-600 transition">Members</Link>
          <span className="text-gray-300">|</span>
          <Link href="/choir/voice-parts" className="hover:text-purple-600 transition">Voice Parts</Link>
          <span className="text-gray-300">|</span>
          <Link href="/choir/events" className="hover:text-purple-600 transition">Events</Link>
          <span className="text-gray-300">|</span>
          <Link href="/choir/songs" className="hover:text-purple-600 transition">Songs</Link>
          <span className="text-gray-300">|</span>
          <Link href="/choir/attendance" className="hover:text-purple-600 transition">Attendance</Link>
        </div>
      </div>
    </div>
  );
}