"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import YouTube from 'react-youtube';
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  Users, Share2, Heart, MessageCircle, Send,
  Clock, Calendar, Mic, Music, Tv, Signal, Eye,
  ThumbsUp, User, ChevronRight, Loader2, ExternalLink,
  ArrowLeft, List, X, SkipForward, SkipBack, Search,
  Filter, CheckCircle, AlertCircle, Clock as ClockIcon
} from 'lucide-react';

interface Stream {
  id: string;
  title: string;
  category: string;
  status: 'live' | 'upcoming' | 'ended';
  viewers: number;
  speaker: string;
  startTime: string;
  videoId: string;
  likes: number;
  comments: Array<{ id: number; user: string; text: string; time: string }>;
  tags: string[];
  isFeatured: boolean;
  duration?: string;
}

export default function LivePage() {
  const [isLive, setIsLive] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewers, setViewers] = useState(1247);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showControls, setShowControls] = useState(true);
  const [loading, setLoading] = useState(true);
  const [buffering, setBuffering] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{id: number; user: string; text: string; time: string}>>([]);
  const [isClient, setIsClient] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [progress, setProgress] = useState(0);
  const [showUpcomingModal, setShowUpcomingModal] = useState(false);
  const [selectedUpcoming, setSelectedUpcoming] = useState<Stream | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // YOUTUBE SERMON VIDEOS - PASTOR W.F. KUMUYI
  const YOUTUBE_VIDEOS: Stream[] = [
    {
      id: '1',
      title: 'Standing for Redemptive Truth against Religious Tradition',
      category: 'service',
      status: 'live',
      viewers: 1247,
      speaker: 'Pastor W.F. Kumuyi',
      startTime: new Date().toISOString(),
      videoId: 'dQw4w9WgXcQ',
      likes: 2345,
      comments: [
        { id: 1, user: 'Sarah J.', text: 'Amen! Glory to God! 🙏', time: '2 min ago' },
        { id: 2, user: 'Michael O.', text: 'Powerful message!', time: '5 min ago' },
        { id: 3, user: 'Grace E.', text: 'I\'m blessed by this service', time: '8 min ago' },
      ],
      tags: ['Worship', 'Word', 'Revival'],
      isFeatured: true,
      duration: '45:32'
    },
    {
      id: '2',
      title: 'The Power of Prayer - Monday Bible Study',
      category: 'service',
      status: 'upcoming',
      viewers: 0,
      speaker: 'Pastor W.F. Kumuyi',
      startTime: new Date(Date.now() + 3600000).toISOString(),
      videoId: 'dQw4w9WgXcQ',
      likes: 0,
      comments: [],
      tags: ['Bible Study', 'Teaching', 'Word'],
      isFeatured: false,
      duration: '38:15'
    },
    {
      id: '3',
      title: 'The Great Commission - Evangelism Message',
      category: 'service',
      status: 'upcoming',
      viewers: 0,
      speaker: 'Pastor W.F. Kumuyi',
      startTime: new Date(Date.now() + 7200000).toISOString(),
      videoId: 'dQw4w9WgXcQ',
      likes: 0,
      comments: [],
      tags: ['Evangelism', 'Mission', 'Word'],
      isFeatured: false,
      duration: '52:00'
    },
    {
      id: '4',
      title: 'Walking in Holiness - Evening Service',
      category: 'service',
      status: 'ended',
      viewers: 0,
      speaker: 'Pastor W.F. Kumuyi',
      startTime: new Date(Date.now() - 86400000).toISOString(),
      videoId: 'dQw4w9WgXcQ',
      likes: 0,
      comments: [],
      tags: ['Holiness', 'Sanctification', 'Revival'],
      isFeatured: false,
      duration: '1:12:45'
    },
    {
      id: '5',
      title: 'Faith that Moves Mountains - Prayer Conference',
      category: 'prayer',
      status: 'ended',
      viewers: 0,
      speaker: 'Pastor W.F. Kumuyi',
      startTime: new Date(Date.now() - 172800000).toISOString(),
      videoId: 'dQw4w9WgXcQ',
      likes: 0,
      comments: [],
      tags: ['Prayer', 'Faith', 'Conference'],
      isFeatured: false,
      duration: '28:30'
    }
  ];

  const [streams, setStreams] = useState<Stream[]>(YOUTUBE_VIDEOS);
  const featuredStream = streams[currentStreamIndex];

  // Get upcoming streams
  const upcomingStreams = streams.filter(s => s.status === 'upcoming');
  const liveStreams = streams.filter(s => s.status === 'live');
  const endedStreams = streams.filter(s => s.status === 'ended');

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      iv_load_policy: 3,
      cc_load_policy: 0,
    },
  };

  const onPlayerReady = (event: any) => {
    setPlayer(event.target);
    setLoading(false);
  };

  const onPlayerStateChange = (event: any) => {
    const state = event.data;
    if (state === 1) {
      setIsPlaying(true);
      setBuffering(false);
      setLoading(false);
    } else if (state === 2) {
      setIsPlaying(false);
    } else if (state === 3) {
      setBuffering(true);
    } else if (state === 0) {
      setIsPlaying(false);
    }
  };

  const onPlayerError = (event: any) => {
    console.error('YouTube Error:', event);
    setLoading(false);
  };

  useEffect(() => {
    if (!player) return;
    
    const interval = setInterval(() => {
      try {
        const current = player.getCurrentTime();
        const dur = player.getDuration();
        if (dur > 0) {
          setProgress((current / dur) * 100);
          setCurrentTime(formatTime(current));
          setDuration(formatTime(dur));
        }
      } catch (e) {}
    }, 1000);
    
    return () => clearInterval(interval);
  }, [player]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        setViewers(prev => prev + Math.floor(Math.random() * 3));
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isLive]);

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const toggleMute = () => {
    if (!player) return;
    if (isMuted) {
      player.unMute();
    } else {
      player.mute();
    }
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleLike = () => setIsLiked(!isLiked);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        user: 'You',
        text: chatMessage,
        time: 'Just now'
      }]);
      setChatMessage('');
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'DLCSF Live - Sunday Worship Service',
          text: 'Join us for live worship service with Pastor W.F. Kumuyi',
          url: window.location.href,
        });
      } else {
        setShowSharePopup(true);
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch (error) {
      setShowSharePopup(true);
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const nextStream = () => {
    if (currentStreamIndex < streams.length - 1) {
      setCurrentStreamIndex(currentStreamIndex + 1);
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime('0:00');
      setDuration('0:00');
      setLoading(true);
    }
  };

  const prevStream = () => {
    if (currentStreamIndex > 0) {
      setCurrentStreamIndex(currentStreamIndex - 1);
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime('0:00');
      setDuration('0:00');
      setLoading(true);
    }
  };

  const goToStream = (index: number) => {
    setCurrentStreamIndex(index);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('0:00');
    setDuration('0:00');
    setLoading(true);
    setShowPlaylist(false);
  };

  const searchYouTube = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
    window.open(searchUrl, '_blank');
    setIsSearching(false);
  };

  const openUpcomingDetails = (stream: Stream) => {
    setSelectedUpcoming(stream);
    setShowUpcomingModal(true);
  };

  const categories = [
    { id: 'all', label: 'All Streams', icon: Tv },
    { id: 'service', label: 'Services', icon: Mic },
    { id: 'choir', label: 'Choir', icon: Music },
    { id: 'prayer', label: 'Prayer', icon: MessageCircle },
    { id: 'conference', label: 'Conferences', icon: Users }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'live': return { color: 'bg-red-500', text: 'LIVE', icon: '🔴' };
      case 'upcoming': return { color: 'bg-blue-500', text: 'UPCOMING', icon: '⏰' };
      default: return { color: 'bg-gray-500', text: 'ENDED', icon: '✅' };
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch(category) {
      case 'choir': return '🎵';
      case 'prayer': return '🙏';
      case 'conference': return '📖';
      default: return '⛪';
    }
  };

  const filteredStreams = streams.filter(s => 
    selectedCategory === 'all' || s.category === selectedCategory
  );

  const formatDate = (dateString: string) => {
    if (!isClient) return 'Loading...';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTimeDisplay = (dateString: string) => {
    if (!isClient) return '--:--';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntil = (dateString: string) => {
    const now = new Date();
    const target = new Date(dateString);
    const diff = target.getTime() - now.getTime();
    
    if (diff < 0) return 'Started';
    
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Upcoming Program Modal */}
      <AnimatePresence>
        {showUpcomingModal && selectedUpcoming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUpcomingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1a1a1a] rounded-2xl max-w-md w-full p-6 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl">
                    {getCategoryEmoji(selectedUpcoming.category)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedUpcoming.title}</h3>
                    <p className="text-sm text-gray-400">{selectedUpcoming.speaker}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUpcomingModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">{formatDate(selectedUpcoming.startTime)}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">{formatTimeDisplay(selectedUpcoming.startTime)}</span>
                </div>
                {selectedUpcoming.duration && (
                  <div className="flex items-center gap-3 text-sm">
                    <ClockIcon className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">Duration: {selectedUpcoming.duration}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">Starts in {getTimeUntil(selectedUpcoming.startTime)}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedUpcoming.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-white/5 rounded-full text-xs text-gray-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowUpcomingModal(false);
                    // Add to playlist or set reminder logic
                  }}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                >
                  Set Reminder
                </button>
                <button
                  onClick={() => setShowUpcomingModal(false)}
                  className="flex-1 px-4 py-2.5 bg-white/10 rounded-xl font-medium hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Popup */}
      {showSharePopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full mx-4 border border-white/10">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Share This Stream</h3>
              <p className="text-gray-400 text-sm mt-1">Share this live stream with others</p>
            </div>
            <div className="flex items-center gap-2 bg-black/40 rounded-xl p-2 border border-white/10 mb-4">
              <input
                type="text"
                value={window.location.href}
                readOnly
                className="flex-1 bg-transparent text-white text-sm px-3 py-2 outline-none"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 3000);
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : 'Copy'}
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'DLCSF Live',
                      text: 'Join us for live worship service',
                      url: window.location.href,
                    });
                  }
                }}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium transition-colors"
              >
                Share
              </button>
              <button
                onClick={() => setShowSharePopup(false)}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <div className="bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link href="/" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Tv className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
                  DLCSF Live
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 border border-red-500/30 rounded-full">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <span className="text-sm font-semibold text-red-400">
                  {isLive ? 'LIVE NOW' : 'OFFLINE'}
                </span>
              </div>
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <List className="w-4 h-4 text-white" />
                <span className="text-sm text-white hidden sm:inline">Playlist</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Video Player */}
        <div ref={containerRef} className="relative bg-black rounded-2xl overflow-hidden mb-8">
          <div className="relative aspect-video">
            {featuredStream?.videoId && (
              <YouTube
                videoId={featuredStream.videoId}
                opts={opts}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange}
                onError={onPlayerError}
                className="w-full h-full"
                containerClassName="w-full h-full"
              />
            )}

            {loading && (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-red-900/30 flex items-center justify-center z-10">
                <div className="text-center">
                  <Loader2 className="w-16 h-16 text-white/60 animate-spin mx-auto mb-4" />
                  <p className="text-white/60">Loading stream...</p>
                </div>
              </div>
            )}

            {buffering && !loading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-white/60 animate-spin mx-auto mb-3" />
                  <p className="text-white/60 text-sm">Buffering...</p>
                </div>
              </div>
            )}

            {isLive && !loading && (
              <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-full shadow-lg animate-pulse">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  <span className="text-xs font-bold text-white tracking-wider">LIVE</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-semibold text-white">{viewers.toLocaleString()}</span>
                  <span className="text-xs text-gray-400">watching</span>
                </div>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 line-clamp-1">
                    {featuredStream?.title || 'Sunday Worship Service'}
                  </h2>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {featuredStream?.speaker || 'Pastor W.F. Kumuyi'}
                    </span>
                    {featuredStream?.duration && (
                      <>
                        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {featuredStream.duration}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {featuredStream?.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-gray-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      isLiked ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-400' : ''}`} />
                    <span className="text-sm font-medium">{isLiked ? (featuredStream?.likes || 0) + 1 : featuredStream?.likes || 0}</span>
                  </button>
                  <button 
                    onClick={handleShare}
                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                  >
                    <Share2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {!loading && (
              <div className={`absolute bottom-20 left-0 right-0 px-4 sm:px-6 z-20 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-black/70 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={prevStream}
                        disabled={currentStreamIndex === 0}
                        className={`p-2 rounded-xl transition-all ${
                          currentStreamIndex === 0 
                            ? 'text-white/30 cursor-not-allowed' 
                            : 'text-white hover:bg-white/10 hover:text-purple-400'
                        }`}
                        title="Previous Video"
                      >
                        <SkipBack className="w-5 h-5" />
                      </button>

                      <button
                        onClick={togglePlay}
                        className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                      </button>

                      <button
                        onClick={nextStream}
                        disabled={currentStreamIndex === streams.length - 1}
                        className={`p-2 rounded-xl transition-all ${
                          currentStreamIndex === streams.length - 1 
                            ? 'text-white/30 cursor-not-allowed' 
                            : 'text-white hover:bg-white/10 hover:text-purple-400'
                        }`}
                        title="Next Video"
                      >
                        <SkipForward className="w-5 h-5" />
                      </button>

                      <button
                        onClick={toggleMute}
                        className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                      </button>

                      <div className="hidden sm:flex items-center gap-2 flex-1">
                        <div 
                          className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer min-w-[60px]"
                          onClick={() => {}}
                        >
                          <div 
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/60 whitespace-nowrap">{currentTime} / {duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/60 hidden sm:block">
                        {currentStreamIndex + 1}/{streams.length}
                      </span>
                      <button
                        onClick={toggleFullscreen}
                        className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        {isFullscreen ? <Minimize className="w-5 h-5 text-white" /> : <Maximize className="w-5 h-5 text-white" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex sm:hidden items-center gap-2 mt-2">
                    <div 
                      className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer"
                      onClick={() => {}}
                    >
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-white/60 whitespace-nowrap">{currentTime}</span>
                  </div>
                </div>
              </div>
            )}

            {!loading && (
              <div
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={() => setShowControls(!showControls)}
              />
            )}
          </div>
        </div>

        {/* YouTube Search Bar */}
        <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search for Pastor W.F. Kumuyi sermons on YouTube..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchYouTube()}
                className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 text-white placeholder-gray-500"
              />
            </div>
            <button
              onClick={searchYouTube}
              className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <span className="w-4 h-4">▶️</span>
              Search YouTube
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Searches for "Pastor W.F. Kumuyi" sermons on YouTube and opens in a new tab
          </p>
        </div>

        {/* Upcoming Programs Section */}
        {upcomingStreams.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-semibold text-blue-400">Upcoming Programs</span>
                </div>
                <span className="text-xs text-gray-500">{upcomingStreams.length} programs</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingStreams.map((stream, index) => {
                const statusBadge = getStatusBadge(stream.status);
                
                return (
                  <motion.div
                    key={stream.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
                    onClick={() => openUpcomingDetails(stream)}
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-blue-900/50 to-purple-900/50 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30 group-hover:opacity-50 transition-opacity">
                        {getCategoryEmoji(stream.category)}
                      </div>
                      <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 bg-blue-500 rounded-full">
                        <Clock className="w-3 h-3 text-white" />
                        <span className="text-xs font-bold text-white">
                          {getTimeUntil(stream.startTime)}
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                        <div className="px-4 py-2 bg-blue-500 rounded-full text-sm font-medium text-white">
                          View Details
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                        {stream.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">{stream.speaker}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(stream.startTime)}</span>
                          <Clock className="w-3 h-3 ml-1" />
                          <span>{formatTimeDisplay(stream.startTime)}</span>
                        </div>
                        <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full">
                          {stream.duration || 'TBD'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Playlist Sidebar */}
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-4 mb-8 max-h-96 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <List className="w-4 h-4 text-purple-400" />
                Playlist ({streams.length} videos)
              </h3>
              <button
                onClick={() => setShowPlaylist(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-2">
              {streams.map((stream, index) => (
                <button
                  key={stream.id}
                  onClick={() => goToStream(index)}
                  className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all text-left ${
                    currentStreamIndex === index
                      ? 'bg-purple-500/20 border border-purple-500/30'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-400 min-w-[24px]">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                      currentStreamIndex === index ? 'text-purple-400' : 'text-white'
                    }`}>
                      {stream.title}
                    </p>
                    <p className="text-xs text-gray-500">{stream.speaker}</p>
                  </div>
                  {stream.status === 'live' && (
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full animate-pulse">
                      LIVE
                    </span>
                  )}
                  {stream.duration && (
                    <span className="text-xs text-gray-500">{stream.duration}</span>
                  )}
                  {currentStreamIndex === index && (
                    <span className="text-xs text-purple-400 font-medium">▶ Playing</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            if (cat.id === 'all') {
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#2a2a2a] border border-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            }
            return (
              <a
                key={cat.id}
                href={`https://dclm.org/${cat.id}s`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#2a2a2a] border border-white/5 group"
              >
                <Icon className="w-4 h-4" />
                {cat.label}
                <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition" />
              </a>
            );
          })}
        </div>

        {/* Streams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStreams.filter((_, index) => index !== currentStreamIndex).slice(0, 3).map((stream, index) => {
            const statusBadge = getStatusBadge(stream.status);
            
            return (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer"
                onClick={() => goToStream(streams.findIndex(s => s.id === stream.id))}
              >
                <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30 group-hover:opacity-50 transition-opacity">
                    {getCategoryEmoji(stream.category)}
                  </div>
                  <div className={`absolute top-2 left-2 px-2.5 py-1 ${statusBadge.color} rounded-full shadow-lg`}>
                    <span className="text-xs font-bold text-white">{statusBadge.text}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-red-600/80 text-white text-[10px] font-semibold rounded flex items-center gap-1">
                    <span>▶️ YouTube</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                    {stream.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2 line-clamp-1">{stream.speaker}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(stream.startTime)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeDisplay(stream.startTime)}
                      </span>
                    </div>
                    <button
                      onClick={() => goToStream(streams.findIndex(s => s.id === stream.id))}
                      className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                    >
                      Watch
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Chat */}
        <div className="mt-8 bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-400" />
              <h3 className="font-semibold text-white">Live Chat</h3>
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                {chatMessages.length + (featuredStream?.comments.length || 0)} messages
              </span>
            </div>
          </div>
          <div 
            ref={chatContainerRef}
            className="p-4 max-h-48 overflow-y-auto space-y-3"
          >
            {featuredStream?.comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {comment.user.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{comment.user}</span>
                    <span className="text-xs text-gray-500">{comment.time}</span>
                  </div>
                  <p className="text-sm text-gray-300">{comment.text}</p>
                </div>
              </div>
            ))}
            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {msg.user.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-blue-400">{msg.user}</span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-sm text-gray-300">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-white/5">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 px-4 py-2 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 text-white placeholder-gray-500 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Featured Sermon Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Mic className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-white">Now Playing</h4>
              <p className="text-sm text-gray-300">
                {featuredStream?.title}
              </p>
              <p className="text-xs text-gray-400">
                {featuredStream?.speaker} • {featuredStream?.duration || 'Live'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Users className="w-3 h-3" />
                {viewers.toLocaleString()} watching
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {featuredStream?.likes || 0} likes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}