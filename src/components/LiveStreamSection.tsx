'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Play, Pause, Volume2, VolumeX, Maximize,
  Clock, Users, MessageCircle, Share2,
  ChevronRight, Calendar, MapPin
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface StreamEvent {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: 'live' | 'upcoming' | 'ended';
  viewers: number;
  thumbnail: string;
  category: 'service' | 'choir' | 'prayer' | 'conference';
  speaker?: string;
}

export default function LiveStreamSection() {
  const [isLive, setIsLive] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [viewers, setViewers] = useState(127);
  const [currentEvent, setCurrentEvent] = useState<StreamEvent | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<StreamEvent[]>([]);

  useEffect(() => {
    // Mock data
    const mockCurrentEvent: StreamEvent = {
      id: '1',
      title: 'Sunday Worship Service',
      description: 'Join us for a powerful time of worship and word',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 7200000).toISOString(),
      status: 'live',
      viewers: 127,
      thumbnail: '',
      category: 'service',
      speaker: 'Pastor John Doe'
    };

    const mockUpcoming: StreamEvent[] = [
      {
        id: '2',
        title: 'Choir Rehearsal',
        description: 'Weekly choir practice session',
        startTime: new Date(Date.now() + 86400000).toISOString(),
        endTime: new Date(Date.now() + 90000000).toISOString(),
        status: 'upcoming',
        viewers: 0,
        thumbnail: '',
        category: 'choir'
      },
      {
        id: '3',
        title: 'Prayer Meeting',
        description: 'Online prayer gathering for students',
        startTime: new Date(Date.now() + 172800000).toISOString(),
        endTime: new Date(Date.now() + 176400000).toISOString(),
        status: 'upcoming',
        viewers: 0,
        thumbnail: '',
        category: 'prayer'
      }
    ];

    setCurrentEvent(mockCurrentEvent);
    setUpcomingEvents(mockUpcoming);
  }, []);

  // Simulate viewer count increase
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

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

  const getCategoryEmoji = (category: string) => {
    switch(category) {
      case 'choir': return '🎵';
      case 'prayer': return '🙏';
      case 'conference': return '📖';
      default: return '⛪';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            {isLive ? 'LIVE NOW' : 'OFFLINE'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Live <span className="text-blue-400">Streaming</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join our services, choir performances, and events from anywhere in the world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stream */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
              {/* Stream placeholder */}
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

              {/* Stream Info Overlay */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-sm font-semibold text-white">
                    {currentEvent?.title || 'No Live Stream'}
                  </p>
                  {currentEvent?.speaker && (
                    <p className="text-xs text-gray-400">{currentEvent.speaker}</p>
                  )}
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
                    <div className="text-xs text-white/70">
                      {formatTime(currentEvent?.startTime || '')}
                    </div>
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
            </div>

            {/* Stream Details */}
            <div className="mt-4 bg-white/5 backdrop-blur-sm rounded-xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {currentEvent?.title || 'No Live Stream'}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {currentEvent?.description}
                  </p>
                </div>
                <Link
                  href="/live"
                  className="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-medium transition-colors"
                >
                  Watch Full Stream
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Sidebar - Upcoming Streams */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Upcoming Streams
            </h3>

            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <div className="flex gap-4">
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800 flex items-center justify-center text-3xl">
                    {getCategoryEmoji(event.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors truncate">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(event.startTime)} at {formatTime(event.startTime)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full">
                        {event.category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <Link
              href="/live/schedule"
              className="block text-center text-sm text-blue-400 hover:text-blue-300 transition-colors mt-4"
            >
              View Full Schedule →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}