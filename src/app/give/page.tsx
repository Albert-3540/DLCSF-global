"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play, Pause, Volume2, VolumeX, Maximize,
  Users, Share2, ChevronRight, Filter
} from 'lucide-react';
import Link from 'next/link';

export default function LivePage() {
  const [isLive] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [viewers] = useState(156);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Streams' },
    { id: 'service', label: 'Services' },
    { id: 'choir', label: 'Choir' },
    { id: 'prayer', label: 'Prayer' },
    { id: 'conference', label: 'Conferences' }
  ];

  const streams = [
    {
      id: 1,
      title: 'Sunday Worship Service',
      category: 'service',
      status: 'live',
      viewers: 156,
      speaker: 'Pastor W.F. Kumuyi',
      startTime: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Choir Rehearsal',
      category: 'choir',
      status: 'upcoming',
      viewers: 0,
      speaker: 'Bro. Michael',
      startTime: new Date(Date.now() + 3600000).toISOString(),
    },
    {
      id: 3,
      title: 'Prayer Meeting',
      category: 'prayer',
      status: 'ended',
      viewers: 89,
      speaker: 'Sis. Grace',
      startTime: new Date(Date.now() - 7200000).toISOString(),
    }
  ];

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Live Streams</h1>
              <p className="text-sm text-gray-600">Watch services and events live</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                {isLive ? 'LIVE' : 'OFFLINE'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Stream */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black rounded-2xl overflow-hidden aspect-video relative mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
            {!isPlaying ? (
              <button
                onClick={togglePlay}
                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center group"
              >
                <Play className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
              </button>
            ) : (
              <div className="text-center">
                <p className="text-white/70">Stream playing...</p>
              </div>
            )}
          </div>

          {/* Stream Info */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-sm font-semibold text-white">Sunday Worship Service</p>
              <p className="text-xs text-gray-400">Pastor W.F. Kumuyi</p>
            </div>
            <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">{viewers}</span>
              <span className="text-xs text-gray-400">watching</span>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
                <div className="text-xs text-white/70">10:30 AM</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                  <Maximize className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories & Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
          <button className="ml-auto px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Stream Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {streams.map((stream, index) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-video bg-gray-900">
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  {stream.category === 'choir' ? '🎵' :
                   stream.category === 'prayer' ? '🙏' :
                   stream.category === 'conference' ? '📖' : '⛪'}
                </div>
                {stream.status === 'live' && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    LIVE
                  </div>
                )}
                {stream.status === 'upcoming' && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded">
                    UPCOMING
                  </div>
                )}
                {stream.status === 'ended' && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-gray-500 text-white text-xs font-semibold rounded">
                    ENDED
                  </div>
                )}
                {stream.viewers > 0 && stream.status === 'live' && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {stream.viewers}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{stream.title}</h3>
                {stream.speaker && (
                  <p className="text-sm text-gray-600 mt-1">{stream.speaker}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(stream.startTime)} at {formatTime(stream.startTime)}
                </p>
                <Link
                  href={`/live/${stream.id}`}
                  className="mt-3 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {stream.status === 'live' ? 'Watch Now' :
                   stream.status === 'upcoming' ? 'Set Reminder' :
                   'Watch Recording'}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}