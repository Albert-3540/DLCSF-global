"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, ChevronLeft,
  Search, Video
} from 'lucide-react';

interface StreamSchedule {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  category: 'service' | 'choir' | 'prayer' | 'conference';
  status: 'upcoming' | 'live' | 'ended';
  venue: string;
  speaker?: string;
}

export default function LiveSchedulePage() {
  const [schedules] = useState<StreamSchedule[]>([
    {
      id: '1',
      title: 'Sunday Worship Service',
      description: 'Join us for a powerful time of worship and the Word',
      date: '2026-08-04',
      time: '10:00 AM',
      category: 'service',
      status: 'upcoming',
      venue: 'Main Auditorium',
      speaker: 'Pastor John Doe'
    },
    {
      id: '2',
      title: 'Choir Rehearsal',
      description: 'Weekly choir practice and worship session',
      date: '2026-08-06',
      time: '4:00 PM',
      category: 'choir',
      status: 'upcoming',
      venue: 'Music Hall',
      speaker: 'Bro. Michael'
    },
    {
      id: '3',
      title: 'Prayer Meeting',
      description: 'Online prayer gathering for students and corps members',
      date: '2026-08-08',
      time: '6:00 PM',
      category: 'prayer',
      status: 'upcoming',
      venue: 'Zoom Online',
      speaker: 'Sis. Grace'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Streams', emoji: '📺' },
    { id: 'service', label: 'Services', emoji: '⛪' },
    { id: 'choir', label: 'Choir', emoji: '🎵' },
    { id: 'prayer', label: 'Prayer', emoji: '🙏' },
    { id: 'conference', label: 'Conferences', emoji: '📖' }
  ];

  const getCategoryEmoji = (category: string) => {
    switch(category) {
      case 'choir': return '🎵';
      case 'prayer': return '🙏';
      case 'conference': return '📖';
      default: return '⛪';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'live': return 'bg-red-500 text-white';
      case 'upcoming': return 'bg-green-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'live': return 'Live Now';
      case 'upcoming': return 'Upcoming';
      default: return 'Ended';
    }
  };

  const filteredSchedules = schedules.filter(schedule => {
    const matchesCategory = selectedCategory === 'all' || schedule.category === selectedCategory;
    const matchesSearch = schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          schedule.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-blue-950">Live Stream Schedule</h1>
                <p className="text-sm text-gray-600">All upcoming and past streams</p>
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search streams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 md:w-64"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-blue-900 text-white shadow-lg shadow-blue-200'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{category.emoji}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Schedule Grid */}
        {filteredSchedules.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No streams found</h3>
            <p className="text-gray-600">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchedules.map((schedule, index) => (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-xl">
                        {getCategoryEmoji(schedule.category)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{schedule.title}</h3>
                        {schedule.speaker && (
                          <p className="text-xs text-gray-500">Speaker: {schedule.speaker}</p>
                        )}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                      {getStatusLabel(schedule.status)}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-sm text-gray-600 line-clamp-2">{schedule.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>{new Date(schedule.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{schedule.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>{schedule.venue}</span>
                    </div>
                  </div>

                  <Link
                    href={`/live/${schedule.id}`}
                    className="mt-3 inline-flex items-center w-full justify-center px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-medium transition-colors text-sm"
                  >
                    {schedule.status === 'live' ? 'Watch Now' :
                     schedule.status === 'upcoming' ? 'Set Reminder' :
                     'Watch Recording'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}