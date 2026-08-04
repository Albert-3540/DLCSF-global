"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Play, Pause, Volume2, VolumeX, Maximize,
  Users, Share2, Heart,
  Clock, Calendar, MessageCircle,
  ArrowLeft, Tv
} from 'lucide-react';

interface Stream {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  viewers: number;
  speaker: string;
  startTime: string;
  likes: number;
  comments: number;
}

export default function StreamPage() {
  const params = useParams();
  const streamId = params?.id as string;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [stream, setStream] = useState<Stream | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in production, fetch from API
    const streams: Stream[] = [
      {
        id: 1,
        title: 'Sunday Worship Service',
        description: 'Powerful worship and word from Pastor W.F. Kumuyi',
        category: 'service',
        status: 'live',
        viewers: 847,
        speaker: 'Pastor W.F. Kumuyi',
        startTime: new Date().toISOString(),
        likes: 1234,
        comments: 56
      },
      {
        id: 2,
        title: 'Choir Rehearsal',
        description: 'Weekly choir practice and worship session',
        category: 'choir',
        status: 'upcoming',
        viewers: 0,
        speaker: 'Bro. Michael',
        startTime: new Date(Date.now() + 3600000).toISOString(),
        likes: 0,
        comments: 0
      },
      {
        id: 3,
        title: 'Prayer Meeting',
        description: 'Online prayer gathering for students worldwide',
        category: 'prayer',
        status: 'ended',
        viewers: 89,
        speaker: 'Sis. Grace',
        startTime: new Date(Date.now() - 7200000).toISOString(),
        likes: 234,
        comments: 12
      },
      {
        id: 4,
        title: 'Campus Conference',
        description: 'Annual campus fellowship conference',
        category: 'conference',
        status: 'upcoming',
        viewers: 0,
        speaker: 'Multiple Speakers',
        startTime: new Date(Date.now() + 86400000).toISOString(),
        likes: 0,
        comments: 0
      },
      {
        id: 5,
        title: 'Youth Revival',
        description: 'Special revival service for young believers',
        category: 'service',
        status: 'upcoming',
        viewers: 0,
        speaker: 'Pastor David',
        startTime: new Date(Date.now() + 172800000).toISOString(),
        likes: 0,
        comments: 0
      },
      {
        id: 6,
        title: 'Evening Worship',
        description: 'Special evening worship and testimony service',
        category: 'service',
        status: 'ended',
        viewers: 156,
        speaker: 'Pastor Sarah',
        startTime: new Date(Date.now() - 86400000).toISOString(),
        likes: 567,
        comments: 34
      }
    ];

    const found = streams.find(s => s.id === parseInt(streamId));
    setStream(found || null);
    setLoading(false);
  }, [streamId]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  const toggleLike = () => setIsLiked(!isLiked);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading stream...</p>
        </div>
      </div>
    );
  }

  if (!stream) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-2xl font-bold text-white mb-2">Stream Not Found</h2>
          <p className="text-gray-400 mb-6">The stream you're looking for doesn't exist.</p>
          <Link
            href="/live"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Live Streams
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/live"
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white truncate max-w-[200px] sm:max-w-none">
                {stream.title}
              </h1>
              <p className="text-sm text-gray-400 hidden sm:block">Watch the stream</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Video Player */}
        <div className="relative bg-black rounded-3xl overflow-hidden aspect-video shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 flex items-center justify-center">
            {!isPlaying ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 flex items-center justify-center group shadow-2xl border border-white/20"
              >
                <Play className="w-12 h-12 text-white group-hover:scale-110 transition-transform ml-1" />
              </motion.button>
            ) : (
              <div className="text-center">
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Stream playing...</span>
                </div>
              </div>
            )}
          </div>

          {stream.status === 'live' && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-full shadow-lg animate-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-xs font-bold text-white tracking-wider">LIVE</span>
              </div>
            </div>
          )}

          {stream.viewers > 0 && stream.status === 'live' && (
            <div className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-white">{stream.viewers.toLocaleString()}</span>
              <span className="text-xs text-gray-400">watching</span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
                <div className="w-32 h-1 bg-white/20 rounded-full mx-2">
                  <div className="w-3/4 h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                </div>
                <span className="text-xs text-white/60">10:30</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-xl hover:bg-white/10 transition-colors">
                  <Maximize className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stream Details */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {stream.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="text-xl">{getCategoryEmoji(stream.category)}</span>
                      {stream.category.charAt(0).toUpperCase() + stream.category.slice(1)}
                    </span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full hidden sm:block"></span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {formatTime(stream.startTime)}
                    </span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full hidden sm:block"></span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(stream.startTime)}
                    </span>
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                  stream.status === 'live' ? 'bg-red-500 text-white animate-pulse' :
                  stream.status === 'upcoming' ? 'bg-blue-500 text-white' :
                  'bg-gray-500 text-white'
                }`}>
                  {stream.status.toUpperCase()}
                </div>
              </div>

              <p className="text-gray-300 mt-4 leading-relaxed">
                {stream.description}
              </p>

              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm text-gray-400">
                  <span className="text-white font-medium">Speaker:</span> {stream.speaker}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Engagement
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <button
                  onClick={toggleLike}
                  className={`flex items-center gap-2 transition-colors ${
                    isLiked ? 'text-red-500' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
                  <span className="text-sm font-medium">
                    {isLiked ? stream.likes + 1 : stream.likes}
                  </span>
                </button>
                <div className="flex items-center gap-2 text-gray-400">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{stream.comments}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Share</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className={`font-medium ${
                    stream.status === 'live' ? 'text-green-400' :
                    stream.status === 'upcoming' ? 'text-blue-400' :
                    'text-gray-400'
                  }`}>
                    {stream.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="text-white capitalize">{stream.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date</span>
                  <span className="text-white">{formatDate(stream.startTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time</span>
                  <span className="text-white">{formatTime(stream.startTime)}</span>
                </div>
                {stream.viewers > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Viewers</span>
                    <span className="text-white">{stream.viewers.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Streams */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-white mb-4">More Streams</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <Link
                key={item}
                href={`/live/${item}`}
                className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors group border border-white/5"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg mb-3 flex items-center justify-center text-4xl">
                  ⛪
                </div>
                <h4 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors truncate">
                  Sunday Service {item}
                </h4>
                <p className="text-xs text-gray-400 mt-1 truncate">Pastor W.F. Kumuyi</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}