"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  LogOut,
  Heart,
  Calendar,
  Users,
  Camera,
  Mail,
  Settings,
  ChevronRight,
  BookOpen,
  Music,
  Globe,
  ArrowRight,
  Clock,
  Loader2,
  Edit2,
  Phone,
  MapPin,
  Award,
  TrendingUp,
  Sparkles,
  Shield,
  Star,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      const savedImage = localStorage.getItem(`profileImage_${parsedUser.email}`);
      if (savedImage) {
        setProfileImage(savedImage);
      }
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header with Profile */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100/50 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between py-3 gap-3">
            {/* Left: Dashboard Title & Profile */}
            <div className="flex items-center gap-4">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg ring-4 ring-blue-100 transition-transform group-hover:scale-105">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user.fullName?.charAt(0)?.toUpperCase() || 'U'
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
              </div>

              {/* User Info */}
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    {user.role || 'Member'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-0.5">
                  <span className="font-semibold text-gray-800">{user.fullName || 'User'}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Mail size={14} className="text-gray-400" />
                    {user.email}
                  </span>
                  {user.phone && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone size={14} className="text-gray-400" />
                        {user.phone}
                      </span>
                    </>
                  )}
                  {user.country && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Globe size={14} className="text-gray-400" />
                        {user.country}
                      </span>
                    </>
                  )}
                  {user.campus && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin size={14} className="text-gray-400" />
                        {user.campus}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 ml-auto lg:ml-0">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-md hover:shadow-lg text-sm font-medium"
              >
                <Edit2 size={16} />
                Edit Profile
              </Link>
              <Link
                href="/settings"
                className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-gray-600 hover:text-gray-800"
                aria-label="Settings"
              >
                <Settings size={20} />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 transition text-red-500 hover:text-red-700"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles size={24} className="text-yellow-300" />
                <span className="text-yellow-300 font-medium">Welcome back!</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {user.fullName?.split(' ')[0] || 'Beloved'} 👋
              </h2>
              <p className="text-blue-100 mt-1 max-w-lg">
                You are part of a global community of believers standing together in faith across nations.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/prayer"
                className="bg-yellow-400 text-blue-950 px-6 py-3 rounded-2xl font-bold hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <Heart size={18} />
                Submit Prayer
              </Link>
              <Link
                href="/events"
                className="bg-white/20 text-white px-6 py-3 rounded-2xl font-bold hover:bg-white/30 transition backdrop-blur flex items-center gap-2 border border-white/20"
              >
                <Calendar size={18} />
                View Events
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Prayer Requests</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">12</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition shadow-lg shadow-blue-500/20">
                <Heart size={28} className="text-white" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
              <TrendingUp size={14} />
              <span>+3 this month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Events Attended</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">5</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition shadow-lg shadow-green-500/20">
                <Calendar size={28} className="text-white" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
              <Award size={14} />
              <span>2 upcoming</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Community</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">180+</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition shadow-lg shadow-purple-500/20">
                <Users size={28} className="text-white" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-purple-600">
              <Globe size={14} />
              <span>50+ countries</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-yellow-100/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Gallery Photos</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">24</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition shadow-lg shadow-yellow-500/20">
                <Camera size={28} className="text-white" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-yellow-600">
              <Star size={14} />
              <span>New moments added</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles size={20} className="text-blue-600" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/prayer"
              className="group bg-white rounded-2xl shadow-lg p-6 border border-blue-100/50 hover:shadow-xl transition text-center hover:border-blue-200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition shadow-lg shadow-blue-500/20">
                <Heart size={28} className="text-white" />
              </div>
              <h4 className="font-bold text-gray-800">Submit Prayer</h4>
              <p className="text-xs text-gray-500 mt-1">Share your needs</p>
            </Link>
            <Link
              href="/events"
              className="group bg-white rounded-2xl shadow-lg p-6 border border-green-100/50 hover:shadow-xl transition text-center hover:border-green-200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition shadow-lg shadow-green-500/20">
                <Calendar size={28} className="text-white" />
              </div>
              <h4 className="font-bold text-gray-800">View Events</h4>
              <p className="text-xs text-gray-500 mt-1">Upcoming gatherings</p>
            </Link>
            <Link
              href="/profile"
              className="group bg-white rounded-2xl shadow-lg p-6 border border-purple-100/50 hover:shadow-xl transition text-center hover:border-purple-200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition shadow-lg shadow-purple-500/20">
                <User size={28} className="text-white" />
              </div>
              <h4 className="font-bold text-gray-800">My Profile</h4>
              <p className="text-xs text-gray-500 mt-1">View & edit</p>
            </Link>
            <Link
              href="/settings"
              className="group bg-white rounded-2xl shadow-lg p-6 border border-gray-100/50 hover:shadow-xl transition text-center hover:border-gray-200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition shadow-lg shadow-gray-500/20">
                <Settings size={28} className="text-white" />
              </div>
              <h4 className="font-bold text-gray-800">Settings</h4>
              <p className="text-xs text-gray-500 mt-1">Manage account</p>
            </Link>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Upcoming Events */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Calendar size={20} className="text-blue-600" />
                  Upcoming Events
                </h3>
                <Link href="/events" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100/50">
                  <div className="bg-gradient-to-br from-blue-700 to-indigo-700 text-white rounded-xl px-4 py-3 text-center min-w-[70px] shadow-lg shadow-blue-500/20">
                    <p className="text-xs font-medium uppercase tracking-wider">Dec</p>
                    <p className="text-2xl font-bold">15</p>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">Global Prayer Conference 2026</h4>
                    <p className="text-sm text-gray-500">Virtual & In-Person</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> 9:00 AM - 5:00 PM
                      </span>
                      <span>|</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> 3 days
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/events"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    Register
                  </Link>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100/50 transition">
                  <div className="bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-xl px-4 py-3 text-center min-w-[70px] shadow-lg shadow-gray-500/20">
                    <p className="text-xs font-medium uppercase tracking-wider">Jan</p>
                    <p className="text-2xl font-bold">10</p>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">Global Mission Outreach</h4>
                    <p className="text-sm text-gray-500">Multiple Locations</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> 8:00 AM - 6:00 PM
                      </span>
                      <span>|</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> 10 days
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/events"
                    className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-gray-800 hover:to-gray-900 transition shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    Register
                  </Link>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100/50 transition">
                  <div className="bg-gradient-to-br from-blue-700 to-indigo-700 text-white rounded-xl px-4 py-3 text-center min-w-[70px] shadow-lg shadow-blue-500/20">
                    <p className="text-xs font-medium uppercase tracking-wider">Nov</p>
                    <p className="text-2xl font-bold">25</p>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">Worship Night</h4>
                    <p className="text-sm text-gray-500">Main Auditorium</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> 7:00 PM - 9:00 PM
                      </span>
                      <span>|</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> 1 day
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/events"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-lg border border-purple-100/50 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Shield size={20} className="text-purple-600" />
                Quick Links
              </h3>
              <div className="space-y-1">
                <Link href="/gallery" className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition group">
                  <Camera size={20} className="text-purple-600 group-hover:scale-110 transition" />
                  <span className="text-gray-700 font-medium">Gallery</span>
                  <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-purple-600 transition" />
                </Link>
                <Link href="/contact" className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition group">
                  <Mail size={20} className="text-green-600 group-hover:scale-110 transition" />
                  <span className="text-gray-700 font-medium">Contact Us</span>
                  <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-green-600 transition" />
                </Link>
                <Link href="/about" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition group">
                  <Users size={20} className="text-blue-600 group-hover:scale-110 transition" />
                  <span className="text-gray-700 font-medium">About DLCSF</span>
                  <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-blue-600 transition" />
                </Link>
                <Link href="/sermons" className="flex items-center gap-3 p-3 rounded-xl hover:bg-yellow-50 transition group">
                  <BookOpen size={20} className="text-yellow-600 group-hover:scale-110 transition" />
                  <span className="text-gray-700 font-medium">Sermons</span>
                  <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-yellow-600 transition" />
                </Link>
                <Link href="/worship" className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition group">
                  <Music size={20} className="text-red-600 group-hover:scale-110 transition" />
                  <span className="text-gray-700 font-medium">Worship</span>
                  <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-red-600 transition" />
                </Link>
              </div>
            </div>

            {/* Community Stats */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 rounded-2xl p-6 text-white shadow-2xl">
              <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Globe size={22} />
                Global Community
              </h3>
              <div className="space-y-3 relative">
                <div className="flex items-center justify-between p-2.5 bg-white/10 rounded-xl backdrop-blur">
                  <span className="text-blue-100">Total Members</span>
                  <span className="font-bold text-xl">180+</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white/10 rounded-xl backdrop-blur">
                  <span className="text-blue-100">Countries</span>
                  <span className="font-bold text-xl">50+</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white/10 rounded-xl backdrop-blur">
                  <span className="text-blue-100">Prayer Requests</span>
                  <span className="font-bold text-xl">1.2K</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white/10 rounded-xl backdrop-blur">
                  <span className="text-blue-100">Events Held</span>
                  <span className="font-bold text-xl">89</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 relative">
                <p className="text-sm text-blue-200 italic">"Pray without ceasing." - 1 Thessalonians 5:17</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <p>© 2026 DLCSF Global. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}