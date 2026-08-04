// app/choir/songs/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Music,
  Search,
  Filter,
  Plus,
  ChevronRight,
  Play,
  Clock,
  User,
  Eye,
  ThumbsUp,
  Share2,
  ArrowLeft,
  X,
  ChevronDown,
  Heart
} from "lucide-react";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  year: string;
  duration: string;
  lyrics: string;
  youtubeUrl: string;
  image: string;
  tags: string[];
  featured: boolean;
  language: string;
  description: string;
  views: number;
  likes: number;
}

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const genres = ["All", "Worship", "Praise", "Hymn", "Gospel", "Contemporary", "Traditional"];

  const mockSongs: Song[] = [
    {
      id: "1",
      title: "Amazing Grace",
      artist: "Deeper Life Choir",
      album: "Hymns of Grace",
      genre: "hymn",
      year: "2026",
      duration: "4:30",
      lyrics: "Amazing grace! How sweet the sound...",
      youtubeUrl: "https://youtube.com/watch?v=...",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=640&h=360&fit=crop",
      tags: ["grace", "hymn", "classic"],
      featured: true,
      language: "English",
      description: "A classic hymn of grace and redemption",
      views: 2345,
      likes: 678
    },
    {
      id: "2",
      title: "Great Is Thy Faithfulness",
      artist: "Deeper Life Worship",
      album: "Faithful God",
      genre: "worship",
      year: "2026",
      duration: "5:15",
      lyrics: "Great is Thy faithfulness, O God my Father...",
      youtubeUrl: "https://youtube.com/watch?v=...",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=640&h=360&fit=crop",
      tags: ["faithfulness", "worship", "God"],
      featured: false,
      language: "English",
      description: "A powerful worship song about God's faithfulness",
      views: 1890,
      likes: 543
    },
    {
      id: "3",
      title: "What a Friend We Have in Jesus",
      artist: "Deeper Life Choir",
      album: "Classic Hymns",
      genre: "hymn",
      year: "2025",
      duration: "3:45",
      lyrics: "What a friend we have in Jesus...",
      youtubeUrl: "https://youtube.com/watch?v=...",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=640&h=360&fit=crop",
      tags: ["friendship", "Jesus", "prayer"],
      featured: false,
      language: "English",
      description: "A beloved hymn about friendship with Jesus",
      views: 1567,
      likes: 432
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setSongs(mockSongs);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredSongs = songs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "All" || song.genre === selectedGenre.toLowerCase();
    return matchesSearch && matchesGenre;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading songs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/choir"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Choir Songs
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Browse our global collection of worship songs
              </p>
            </div>
          </div>
          <Link
            href="/choir/songs/add"
            className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Song
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3" />
              <input
                type="text"
                placeholder="Search songs..."
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
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedGenre === genre
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSongs.map((song) => (
            <div
              key={song.id}
              className={`bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition ${
                song.featured ? 'border-yellow-400' : 'border-gray-100'
              }`}
            >
              <div className="relative h-48 bg-gradient-to-br from-purple-800 to-indigo-800">
                {song.image ? (
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Music className="w-16 h-16 text-white/30" />
                  </div>
                )}
                {song.featured && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-yellow-400 text-purple-950 text-xs font-bold rounded">
                    ⭐ Featured
                  </div>
                )}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="px-2 py-1 bg-purple-600/90 text-white text-xs font-medium rounded">
                    {song.genre.toUpperCase()}
                  </span>
                  <span className="px-2 py-1 bg-black/60 text-white text-xs font-medium rounded">
                    {song.duration}
                  </span>
                </div>
                <button
                  className="absolute top-3 right-3 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition"
                >
                  <Play className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
                  {song.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <User className="w-4 h-4" />
                  <span>{song.artist}</span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {song.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {song.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {song.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {song.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {song.duration}
                  </span>
                  <span className="text-gray-500">
                    {song.language}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium text-purple-600">
                    {song.album}
                  </span>
                  <Link
                    href={`/choir/songs/${song.id}`}
                    className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSongs.length === 0 && (
          <div className="text-center py-16">
            <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600">No songs found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}