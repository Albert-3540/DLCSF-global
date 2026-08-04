// components/ChoirPage.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import YouTube from 'react-youtube';
import {
  Search,
  Play,
  Clock,
  Calendar,
  Music,
  Heart,
  Share2,
  Download,
  ThumbsUp,
  Eye,
  X,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Pause,
  Loader2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  SkipBack,
  SkipForward,
  Filter,
  ChevronDown,
  Grid3x3,
  List,
  SlidersHorizontal
} from "lucide-react";

interface ChoirVideo {
  id: string;
  title: string;
  description: string;
  videoId: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  duration: string;
  category: 'choir' | 'praise' | 'worship' | 'hymn';
  featured: boolean;
  choirName?: string;
  songTitle?: string;
}

export default function ChoirPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<ChoirVideo | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<ChoirVideo[]>([]);
  const [isYoutubeLoading, setIsYoutubeLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [prevPageToken, setPrevPageToken] = useState<string | null>(null);
  const [featuredVideo, setFeaturedVideo] = useState<ChoirVideo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);
  const videosPerPage = 6;

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // YouTube API Key
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || 'AIzaSyA8TjfzFodpN0J-wWCywBz6HmTj5qI8PqA';
  const CHANNEL_ID = 'UCdQw4w9WgXcQ';

  const categories = ["All", "Choir", "Praise", "Worship", "Hymn"];
  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'oldest', label: 'Oldest' }
  ];

  useEffect(() => {
    fetchChoirVideos();
  }, []);

  const fetchChoirVideos = async (pageToken?: string) => {
    setIsYoutubeLoading(true);
    setError(null);
    try {
      const searchQueryText = `"Deeper Life" choir worship praise -sermon -message -shorts`;
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&q=${encodeURIComponent(searchQueryText)}&part=snippet&type=video&maxResults=${videosPerPage}&order=date${pageToken ? `&pageToken=${pageToken}` : ''}`;
      
      const response = await fetch(searchUrl);
      const data = await response.json();

      if (data.error) {
        setError('YouTube API Error: ' + data.error.message);
        setVideos(getMockVideos());
        return;
      }

      if (data.items && data.items.length > 0) {
        const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
        const statsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=statistics,contentDetails`;
        const statsResponse = await fetch(statsUrl);
        const statsData = await statsResponse.json();

        const videos: ChoirVideo[] = data.items.map((item: any, index: number) => {
          const stats = statsData.items?.find((stat: any) => stat.id === item.id.videoId);
          const duration = stats?.contentDetails?.duration || '';
          const formattedDuration = formatDuration(duration);
          const category = categorizeVideo(item.snippet.title, item.snippet.description);
          
          return {
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description || 'A beautiful praise and worship song from Deeper Life',
            videoId: item.id.videoId,
            thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
            channelTitle: item.snippet.channelTitle,
            publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }),
            viewCount: parseInt(stats?.statistics?.viewCount) || 0,
            likeCount: parseInt(stats?.statistics?.likeCount) || 0,
            duration: formattedDuration,
            category: category,
            featured: index === 0,
            choirName: extractChoirName(item.snippet.title),
            songTitle: extractSongTitle(item.snippet.title)
          };
        });

        setVideos(videos);
        setNextPageToken(data.nextPageToken || null);
        setPrevPageToken(data.prevPageToken || null);
        
        if (videos.length > 0) {
          setFeaturedVideo(videos[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching choir videos:', error);
      setError('Failed to load videos. Showing sample videos.');
      setVideos(getMockVideos());
    } finally {
      setIsYoutubeLoading(false);
    }
  };

  const getMockVideos = (): ChoirVideo[] => {
    return [
      {
        id: '1',
        title: 'Deeper Life Choir - Amazing Grace (Live Worship)',
        description: 'A powerful worship performance by the Deeper Life Choir',
        videoId: 'dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=640&h=360&fit=crop',
        channelTitle: 'Deeper Life Bible Church',
        publishedAt: 'December 10, 2026',
        viewCount: 1247,
        likeCount: 2345,
        duration: '45:32',
        category: 'choir',
        featured: true,
        choirName: 'Deeper Life Choir',
        songTitle: 'Amazing Grace'
      },
      {
        id: '2',
        title: 'Praise Worship - Deeper Life Conference 2026',
        description: 'Spirit-filled praise worship session',
        videoId: 'dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=640&h=360&fit=crop',
        channelTitle: 'Deeper Life Bible Church',
        publishedAt: 'December 3, 2026',
        viewCount: 856,
        likeCount: 1234,
        duration: '38:15',
        category: 'praise',
        featured: false,
        choirName: 'Deeper Life Worship Team',
        songTitle: 'Praise Medley'
      }
    ];
  };

  const formatDuration = (duration: string): string => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '--:--';
    
    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');
    
    if (hours) {
      return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }
    return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  };

  const categorizeVideo = (title: string, description: string): ChoirVideo['category'] => {
    const text = (title + ' ' + description).toLowerCase();
    if (text.includes('hymn') || text.includes('hymns')) return 'hymn';
    if (text.includes('praise') || text.includes('praise worship')) return 'praise';
    if (text.includes('worship') || text.includes('worship service')) return 'worship';
    return 'choir';
  };

  const extractChoirName = (title: string): string => {
    if (title.toLowerCase().includes('deeper life choir')) return 'Deeper Life Choir';
    if (title.toLowerCase().includes('youth choir')) return 'Youth Choir';
    if (title.toLowerCase().includes('children choir')) return 'Children Choir';
    return 'Deeper Life Choir';
  };

  const extractSongTitle = (title: string): string => {
    const patterns = [
      /"(.*?)"/,
      /-(.*?)(?:-|$)/,
      /:\s*(.*?)(?:-|$)/
    ];
    
    for (const pattern of patterns) {
      const match = title.match(pattern);
      if (match) return match[1].trim();
    }
    return title.substring(0, 30);
  };

  const searchVideos = async () => {
    if (!searchQuery.trim()) {
      fetchChoirVideos();
      return;
    }

    setIsSearching(true);
    setIsYoutubeLoading(true);
    setError(null);
    try {
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&q=${encodeURIComponent(searchQuery + ' Deeper Life choir worship praise')}&part=snippet&type=video&maxResults=${videosPerPage}&order=relevance`;
      
      const response = await fetch(searchUrl);
      const data = await response.json();

      if (data.error) {
        setError('Search error: ' + data.error.message);
        return;
      }

      if (data.items) {
        const videos: ChoirVideo[] = data.items.map((item: any, index: number) => {
          const category = categorizeVideo(item.snippet.title, item.snippet.description);
          
          return {
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description || 'A beautiful praise and worship song',
            videoId: item.id.videoId,
            thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
            channelTitle: item.snippet.channelTitle,
            publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }),
            viewCount: 0,
            likeCount: 0,
            duration: '--:--',
            category: category,
            featured: index === 0,
            choirName: extractChoirName(item.snippet.title),
            songTitle: extractSongTitle(item.snippet.title)
          };
        });
        setVideos(videos);
        if (videos.length > 0) {
          setFeaturedVideo(videos[0]);
        }
        setNextPageToken(null);
        setPrevPageToken(null);
      }
    } catch (error) {
      console.error('Error searching videos:', error);
      setError('Search failed. Please try again.');
    } finally {
      setIsYoutubeLoading(false);
      setIsSearching(false);
    }
  };

  // Auto-search when typing (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length > 2) {
        searchVideos();
      } else if (searchQuery.length === 0) {
        fetchChoirVideos();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const playVideo = (video: ChoirVideo) => {
    const index = videos.findIndex(v => v.id === video.id);
    setCurrentVideoIndex(index >= 0 ? index : 0);
    setSelectedVideo(video);
    setShowPlayer(true);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('0:00');
    setDuration('0:00');
    setLoading(true);
  };

  const closePlayer = () => {
    setShowPlayer(false);
    setSelectedVideo(null);
    if (player) {
      try {
        player.pauseVideo();
        player.destroy();
      } catch (e) {}
    }
    setPlayer(null);
  };

  const togglePlay = () => {
    if (!player) return;
    try {
      if (isPlaying) {
        player.pauseVideo();
        setIsPlaying(false);
      } else {
        player.playVideo();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Play error:', error);
    }
  };

  const toggleMute = () => {
    if (!player) return;
    try {
      if (isMuted) {
        player.unMute();
      } else {
        player.mute();
      }
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Mute error:', error);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const playNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      const nextIndex = currentVideoIndex + 1;
      const nextVideo = videos[nextIndex];
      setCurrentVideoIndex(nextIndex);
      setSelectedVideo(nextVideo);
      setProgress(0);
      setCurrentTime('0:00');
      setDuration('0:00');
      setLoading(true);
      if (player && nextVideo.videoId) {
        try {
          player.loadVideoById(nextVideo.videoId);
        } catch (e) {
          console.error('Load video error:', e);
        }
      }
    }
  };

  const playPrevious = () => {
    if (currentVideoIndex > 0) {
      const prevIndex = currentVideoIndex - 1;
      const prevVideo = videos[prevIndex];
      setCurrentVideoIndex(prevIndex);
      setSelectedVideo(prevVideo);
      setProgress(0);
      setCurrentTime('0:00');
      setDuration('0:00');
      setLoading(true);
      if (player && prevVideo.videoId) {
        try {
          player.loadVideoById(prevVideo.videoId);
        } catch (e) {
          console.error('Load video error:', e);
        }
      }
    }
  };

  const onPlayerReady = (event: any) => {
    setPlayer(event.target);
    setLoading(false);
    try {
      event.target.playVideo();
      setIsPlaying(true);
    } catch (e) {}
  };

  const onPlayerStateChange = (event: any) => {
    const state = event.data;
    if (state === 1) {
      setIsPlaying(true);
      setLoading(false);
    } else if (state === 2) {
      setIsPlaying(false);
    } else if (state === 0) {
      setIsPlaying(false);
    } else if (state === 3) {
      setLoading(true);
    } else if (state === 5) {
      setLoading(false);
    }
  };

  const onPlayerError = (event: any) => {
    console.error('YouTube Error:', event);
    setLoading(false);
    setError('Failed to load video. Please try again.');
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

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const goToPage = (pageToken: string) => {
    fetchChoirVideos(pageToken);
    if (pageToken === nextPageToken) {
      setCurrentPage(currentPage + 1);
    } else if (pageToken === prevPageToken) {
      setCurrentPage(currentPage - 1);
    }
  };

  const refreshVideos = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    fetchChoirVideos();
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      iv_load_policy: 3,
      cc_load_policy: 0,
      enablejsapi: 1,
      fs: 1,
    },
  };

  const filteredVideos = () => {
    let filtered = videos;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(v => v.category === selectedCategory.toLowerCase());
    }
    
    if (sortBy === 'popular') {
      filtered = [...filtered].sort((a, b) => b.viewCount - a.viewCount);
    } else if (sortBy === 'oldest') {
      filtered = [...filtered].sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    } else {
      filtered = [...filtered].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
    
    return filtered;
  };

  const displayedVideos = filteredVideos();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Player Modal */}
      {showPlayer && selectedVideo && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={closePlayer}
              className="absolute -top-12 right-0 p-2 hover:bg-white/10 rounded-lg transition-colors z-30"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div ref={containerRef} className="relative bg-black rounded-2xl overflow-hidden">
              <div className="relative aspect-video">
                {selectedVideo.videoId && (
                  <YouTube
                    videoId={selectedVideo.videoId}
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
                      <p className="text-white/60">Loading video...</p>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20">
                  <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
                    {selectedVideo.songTitle || selectedVideo.title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {selectedVideo.choirName} • {selectedVideo.category.toUpperCase()}
                  </p>
                </div>

                <div className={`absolute bottom-20 left-0 right-0 px-4 z-20 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={playPrevious}
                        disabled={currentVideoIndex === 0}
                        className={`p-2 rounded-xl transition-colors bg-black/60 backdrop-blur-sm ${
                          currentVideoIndex === 0 
                            ? 'text-white/30 cursor-not-allowed' 
                            : 'hover:bg-white/10 text-white'
                        }`}
                        title="Previous Video"
                      >
                        <SkipBack className="w-5 h-5" />
                      </button>

                      <button
                        onClick={togglePlay}
                        className="p-3 rounded-xl transition-colors bg-black/60 backdrop-blur-sm hover:bg-white/20 text-white"
                        title={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6" />
                        )}
                      </button>

                      <button
                        onClick={playNext}
                        disabled={currentVideoIndex === videos.length - 1}
                        className={`p-2 rounded-xl transition-colors bg-black/60 backdrop-blur-sm ${
                          currentVideoIndex === videos.length - 1 
                            ? 'text-white/30 cursor-not-allowed' 
                            : 'hover:bg-white/10 text-white'
                        }`}
                        title="Next Video"
                      >
                        <SkipForward className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-xl">
                      <span className="text-xs text-white/60">
                        {currentVideoIndex + 1}/{videos.length}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute inset-0 cursor-pointer z-10"
                  onClick={() => setShowControls(!showControls)}
                />
              </div>
            </div>

            <div className="mt-4 bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white line-clamp-1">{selectedVideo.songTitle || selectedVideo.title}</h4>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">{selectedVideo.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Music className="w-4 h-4" />
                      {selectedVideo.choirName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedVideo.publishedAt}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{formatNumber(selectedVideo.viewCount)} views</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{formatNumber(selectedVideo.likeCount)} likes</span>
                  </div>
                  <a
                    href={`https://youtube.com/watch?v=${selectedVideo.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors"
                  >
                    Open in YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-950 via-purple-900 to-purple-700 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Music size={48} className="text-yellow-400" />
            <span className="text-4xl">🎵</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Global Choir & Worship</h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            Experience the power of praise and worship from Deeper Life ministries worldwide
          </p>
        </div>
      </section>

      {/* Featured Video */}
      {featuredVideo && (
        <section className="py-12 px-6 bg-white border-b">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-yellow-400 text-purple-950 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                🎵 FEATURED
              </span>
              <span className="text-gray-500 text-sm">|</span>
              <span className="text-gray-500 text-sm">Latest Worship</span>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {featuredVideo.songTitle || featuredVideo.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{featuredVideo.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Music size={16} />
                    {featuredVideo.choirName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {featuredVideo.publishedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {featuredVideo.duration}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button 
                    onClick={() => playVideo(featuredVideo)}
                    className="bg-purple-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-purple-800 transition flex items-center gap-2 transform hover:scale-105 duration-200"
                  >
                    <Play size={18} />
                    Watch Now
                  </button>
                  <a
                    href={`https://youtube.com/watch?v=${featuredVideo.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center gap-2"
                  >
                    <Download size={18} />
                    Open on YouTube
                  </a>
                </div>
              </div>
              <div 
                className="md:w-80 h-48 md:h-auto bg-gradient-to-br from-purple-700 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl cursor-pointer relative overflow-hidden group"
                onClick={() => playVideo(featuredVideo)}
              >
                {featuredVideo.thumbnail && (
                  <img 
                    src={featuredVideo.thumbnail} 
                    alt={featuredVideo.songTitle || featuredVideo.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                )}
                <div className="relative z-10 text-center text-white">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition">
                    <Play size={40} className="text-yellow-400" />
                  </div>
                  <p className="text-sm text-purple-200 mt-2 group-hover:text-white transition">Click to Watch</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filters */}
      <section className="py-6 px-6 bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-3.5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="🔍 Search choir songs, praise, worship..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchVideos()}
                className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              />
              {isSearching && (
                <div className="absolute right-4 top-3.5">
                  <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={searchVideos}
                className="px-6 py-3 bg-purple-900 text-white rounded-xl font-semibold hover:bg-purple-800 transition flex items-center gap-2 whitespace-nowrap transform hover:scale-105 duration-200"
              >
                <Search size={18} />
                Search
              </button>
              <button
                onClick={refreshVideos}
                className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition flex items-center gap-2"
                title="Refresh videos"
              >
                <RefreshCw size={18} className={isYoutubeLoading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition flex items-center gap-2"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none appearance-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none appearance-none"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">View Mode</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition ${
                        viewMode === 'grid'
                          ? 'bg-purple-900 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <Grid3x3 className="w-5 h-5 mx-auto" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition ${
                        viewMode === 'list'
                          ? 'bg-purple-900 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <List className="w-5 h-5 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    Category: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className="hover:text-purple-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  Sort: {sortOptions.find(o => o.value === sortBy)?.label}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  View: {viewMode === 'grid' ? 'Grid' : 'List'}
                </span>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSortBy('latest');
                    setViewMode('grid');
                  }}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}
        </div>
      </section>

      {/* Results Counter */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{displayedVideos.length}</span> songs
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
          <p className="text-sm text-gray-500">
            {isYoutubeLoading ? 'Loading...' : `${videos.length} total`}
          </p>
        </div>
      </div>

      {/* Videos Grid/List */}
      <section className="py-4 px-6">
        <div className="max-w-6xl mx-auto">
          {isYoutubeLoading ? (
            <div className="text-center py-16">
              <Loader2 className="w-16 h-16 text-purple-900 animate-spin mx-auto mb-4" />
              <p className="text-gray-500 animate-pulse">Loading worship videos from Deeper Life...</p>
            </div>
          ) : (
            <>
              <div className={viewMode === 'grid' 
                ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
              }>
                {displayedVideos.map((video, index) => (
                  <div
                    key={video.id}
                    className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group ${
                      viewMode === 'grid' 
                        ? 'transform hover:-translate-y-1'
                        : 'flex md:flex-row flex-col'
                    }`}
                  >
                    <div 
                      className={`relative bg-gradient-to-br from-purple-800 to-indigo-800 flex items-center justify-center cursor-pointer overflow-hidden ${
                        viewMode === 'grid' ? 'h-48' : 'h-48 md:h-auto md:w-64 flex-shrink-0'
                      }`}
                      onClick={() => playVideo(video)}
                    >
                      {video.thumbnail && (
                        <img 
                          src={video.thumbnail} 
                          alt={video.songTitle || video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-xs text-white">
                        {video.duration}
                      </div>
                      <div className="absolute bottom-3 left-3 px-3 py-1 bg-purple-600/90 rounded-full text-xs font-medium text-white">
                        {video.category.toUpperCase()}
                      </div>
                      {video.featured && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-yellow-400 text-purple-950 text-xs font-bold rounded">
                          🎵 Featured
                        </div>
                      )}
                    </div>

                    <div className={`p-5 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-center' : ''}`}>
                      <h4 className="font-bold text-gray-800 line-clamp-2 group-hover:text-purple-700 transition">
                        {video.songTitle || video.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Music className="w-4 h-4" />
                        <span>{video.choirName}</span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-2 mb-3">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {video.publishedAt}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {formatNumber(video.viewCount)}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {formatNumber(video.likeCount)}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => playVideo(video)}
                        className="mt-3 w-full bg-purple-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-800 transition flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Watch Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {displayedVideos.length > 0 && (
                <div className="flex items-center justify-center gap-4 mt-10">
                  <button
                    onClick={() => prevPageToken && goToPage(prevPageToken)}
                    disabled={!prevPageToken}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition transform hover:scale-105 duration-200 ${
                      prevPageToken
                        ? 'bg-purple-900 text-white hover:bg-purple-800'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ChevronLeft size={18} />
                    Previous
                  </button>
                  
                  <span className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
                    Page {currentPage}
                  </span>

                  <button
                    onClick={() => nextPageToken && goToPage(nextPageToken)}
                    disabled={!nextPageToken}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition transform hover:scale-105 duration-200 ${
                      nextPageToken
                        ? 'bg-purple-900 text-white hover:bg-purple-800'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Next
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}

          {displayedVideos.length === 0 && !isYoutubeLoading && (
            <div className="text-center py-16">
              <Music size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-600">No songs found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your search or filter</p>
              <button
                onClick={refreshVideos}
                className="mt-4 px-6 py-2 bg-purple-900 text-white rounded-xl font-semibold hover:bg-purple-800 transition"
              >
                Load All Songs
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-purple-950 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Global Worship</h2>
          <p className="text-purple-200 mb-6">
            Subscribe to stay updated with new choir performances and worship songs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-400 text-purple-950 px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition transform hover:scale-105 duration-200 whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-purple-300 mt-3">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}