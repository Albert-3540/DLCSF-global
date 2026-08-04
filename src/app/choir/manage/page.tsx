// app/choir/manage/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Calendar,
  Music,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  UserPlus,
  CalendarPlus,
  Music2,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Star,
  Download,
  RefreshCw,
  BarChart3,
  TrendingUp,
  Activity
} from "lucide-react";

// Types
interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  voicePart: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  avatar?: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'rehearsal' | 'performance' | 'workshop' | 'concert';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  attendees: number;
  image?: string;
}

interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  key: string;
  tempo: string;
  duration: string;
  lyrics: string;
  status: 'active' | 'archived';
  tags: string[];
  youtubeUrl?: string;
}

export default function ManageChoirPage() {
  const [activeTab, setActiveTab] = useState<'members' | 'events' | 'songs'>('members');
  const [members, setMembers] = useState<Member[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Mock data
  const mockMembers: Member[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+234 801 234 5678',
      role: 'Choir Director',
      voicePart: 'Soprano',
      joinDate: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Michael Okonkwo',
      email: 'michael@example.com',
      phone: '+234 802 345 6789',
      role: 'Lead Vocalist',
      voicePart: 'Tenor',
      joinDate: '2024-02-20',
      status: 'active'
    },
    {
      id: '3',
      name: 'Grace Adeyemi',
      email: 'grace@example.com',
      phone: '+234 803 456 7890',
      role: 'Member',
      voicePart: 'Alto',
      joinDate: '2024-03-10',
      status: 'inactive'
    },
    {
      id: '4',
      name: 'David Eze',
      email: 'david@example.com',
      phone: '+234 804 567 8901',
      role: 'Pianist',
      voicePart: 'Bass',
      joinDate: '2024-04-05',
      status: 'active'
    }
  ];

  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Choir Rehearsal',
      description: 'Weekly choir practice',
      date: '2026-12-15',
      time: '18:00',
      location: 'Deeper Life Conference Center',
      type: 'rehearsal',
      status: 'upcoming',
      attendees: 45
    },
    {
      id: '2',
      title: 'Sunday Worship Service',
      description: 'Main Sunday service',
      date: '2026-12-17',
      time: '08:00',
      location: 'Deeper Life Headquarters',
      type: 'performance',
      status: 'upcoming',
      attendees: 80
    },
    {
      id: '3',
      title: 'Christmas Concert 2026',
      description: 'Annual Christmas concert',
      date: '2026-12-24',
      time: '17:00',
      location: 'Deeper Life Auditorium',
      type: 'concert',
      status: 'upcoming',
      attendees: 120
    }
  ];

  const mockSongs: Song[] = [
    {
      id: '1',
      title: 'Amazing Grace',
      artist: 'Deeper Life Choir',
      genre: 'Hymn',
      key: 'G',
      tempo: '80',
      duration: '4:30',
      lyrics: 'Amazing grace! How sweet the sound...',
      status: 'active',
      tags: ['classic', 'hymn', 'grace']
    },
    {
      id: '2',
      title: 'Great Is Thy Faithfulness',
      artist: 'Deeper Life Worship',
      genre: 'Worship',
      key: 'D',
      tempo: '72',
      duration: '5:15',
      lyrics: 'Great is Thy faithfulness...',
      status: 'active',
      tags: ['worship', 'faithfulness']
    },
    {
      id: '3',
      title: 'How Great Thou Art',
      artist: 'Deeper Life Choir',
      genre: 'Hymn',
      key: 'C',
      tempo: '76',
      duration: '4:45',
      lyrics: 'O Lord my God, when I in awesome wonder...',
      status: 'active',
      tags: ['hymn', 'classic']
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setMembers(mockMembers);
      setEvents(mockEvents);
      setSongs(mockSongs);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      case 'on-leave': return 'bg-yellow-100 text-yellow-700';
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'ongoing': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'rehearsal': return 'bg-purple-100 text-purple-700';
      case 'performance': return 'bg-blue-100 text-blue-700';
      case 'workshop': return 'bg-yellow-100 text-yellow-700';
      case 'concert': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getFilteredData = () => {
    let data: any[] = [];
    let filterField = '';

    switch(activeTab) {
      case 'members':
        data = members;
        filterField = 'status';
        break;
      case 'events':
        data = events;
        filterField = 'status';
        break;
      case 'songs':
        data = songs;
        filterField = 'status';
        break;
    }

    return data.filter(item => {
      const searchable = JSON.stringify(item).toLowerCase();
      const matchesSearch = searchable.includes(searchQuery.toLowerCase());
      const matchesFilter = selectedFilter === "All" || item[filterField] === selectedFilter.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  };

  const filteredData = getFilteredData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading management dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/choir"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                Choir Management
              </h1>
              <p className="text-sm text-gray-500 hidden sm:block">
                Manage members, events, and song repertoire
              </p>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto px-4 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Refresh</span>
          </button>
        </div>

        {/* Tab Navigation - Responsive */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-1 sm:p-1.5 mb-6 overflow-x-auto">
          <div className="flex flex-wrap gap-1 sm:gap-2 min-w-max">
            {[
              { id: 'members', label: 'Members', icon: Users, count: members.length },
              { id: 'events', label: 'Events', icon: Calendar, count: events.length },
              { id: 'songs', label: 'Songs', icon: Music, count: songs.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-medium transition flex-1 sm:flex-none justify-center ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">{tab.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Total {activeTab}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{filteredData.length}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center">
                {activeTab === 'members' && <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />}
                {activeTab === 'events' && <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />}
                {activeTab === 'songs' && <Music className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Active</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">
                  {filteredData.filter((item: any) => item.status === 'active' || item.status === 'upcoming' || item.status === 'ongoing').length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Inactive</p>
                <p className="text-xl sm:text-2xl font-bold text-red-600">
                  {filteredData.filter((item: any) => item.status === 'inactive' || item.status === 'cancelled').length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">On Leave/Completed</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-600">
                  {filteredData.filter((item: any) => item.status === 'on-leave' || item.status === 'completed').length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters - Responsive */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-2.5 sm:top-3" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden xs:inline">Filters</span>
              </button>
              <button
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden xs:inline">Add {activeTab.slice(0, -1)}</span>
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {["All", "Active", "Inactive", "On Leave"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
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

        {/* Data Grid/Table - Responsive */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {activeTab === 'members' && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                    <th className="hidden sm:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="hidden md:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voice</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.map((member: Member) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-[80px] sm:max-w-none">
                              {member.name}
                            </div>
                            <div className="text-xs text-gray-500 hidden sm:block truncate">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.role}</div>
                      </td>
                      <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.voicePart}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1 sm:gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded-lg transition">
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded-lg transition">
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded-lg transition">
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="hidden sm:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="hidden md:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.map((event: Event) => (
                    <tr key={event.id} className="hover:bg-gray-50 transition">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          <div className="text-xs text-gray-500 hidden sm:block">{event.location}</div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1 sm:gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded-lg transition">
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded-lg transition">
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded-lg transition">
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'songs' && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Song</th>
                    <th className="hidden sm:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artist</th>
                    <th className="hidden md:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.map((song: Song) => (
                    <tr key={song.id} className="hover:bg-gray-50 transition">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{song.title}</div>
                          <div className="text-xs text-gray-500 hidden sm:block">{song.key} • {song.tempo} BPM</div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{song.artist}</div>
                      </td>
                      <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{song.genre}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(song.status)}`}>
                          {song.status.charAt(0).toUpperCase() + song.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1 sm:gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded-lg transition">
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded-lg transition">
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded-lg transition">
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredData.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              {activeTab === 'members' && <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />}
              {activeTab === 'events' && <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />}
              {activeTab === 'songs' && <Music className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />}
              <h3 className="text-lg sm:text-xl font-bold text-gray-600">No {activeTab} found</h3>
              <p className="text-sm sm:text-base text-gray-400 mt-1 sm:mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Quick Actions - Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-6">
          <Link
            href="/choir/attendance"
            className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-gray-800">Attendance</p>
              <p className="text-[10px] sm:text-xs text-gray-500 truncate">Track attendance</p>
            </div>
          </Link>

          <Link
            href="/choir/songs/add"
            className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
              <Music2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-gray-800">Add Song</p>
              <p className="text-[10px] sm:text-xs text-gray-500 truncate">New repertoire</p>
            </div>
          </Link>

          <Link
            href="/choir/event/create"
            className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition group col-span-2 sm:col-span-1"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
              <CalendarPlus className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-gray-800">Create Event</p>
              <p className="text-[10px] sm:text-xs text-gray-500 truncate">New event</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}