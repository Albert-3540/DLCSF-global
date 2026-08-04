// app/choir/songs/add/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Music,
  User,
  Calendar,
  Plus,
  X,
  Save,
  Upload,
  Trash2,
  Mic,
  Globe,
  Link as LinkIcon,
  Video,
  ChevronDown,
  Play,
  Clock,
  Eye,
  ThumbsUp,
  Share2,
  Download
} from "lucide-react";

interface SongFormData {
  title: string;
  artist: string;
  album: string;
  genre: string;
  year: string;
  duration: string;
  lyrics: string;
  youtubeUrl: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  soundcloudUrl: string;
  image: string;
  tags: string[];
  featured: boolean;
  language: string;
  description: string;
}

export default function AddSongPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SongFormData>({
    title: "",
    artist: "",
    album: "",
    genre: "worship",
    year: new Date().getFullYear().toString(),
    duration: "",
    lyrics: "",
    youtubeUrl: "",
    spotifyUrl: "",
    appleMusicUrl: "",
    soundcloudUrl: "",
    image: "",
    tags: [],
    featured: false,
    language: "English",
    description: ""
  });

  const [newTag, setNewTag] = useState("");

  const genres = [
    { value: "worship", label: "Worship" },
    { value: "praise", label: "Praise" },
    { value: "hymn", label: "Hymn" },
    { value: "gospel", label: "Gospel" },
    { value: "contemporary", label: "Contemporary" },
    { value: "traditional", label: "Traditional" }
  ];

  const languages = [
    "English", "Yoruba", "Hausa", "Igbo", "French", "Spanish", 
    "Portuguese", "Swahili", "Zulu", "Other"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push("/choir/songs");
    } catch (error) {
      console.error("Error adding song:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/choir/songs"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Add New Song
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Add a new worship song to the global choir library
              </p>
            </div>
          </div>
          <button
            type="submit"
            form="song-form"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Add Song
              </>
            )}
          </button>
        </div>

        <form id="song-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Song Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Song Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Amazing Grace"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Artist/Choir *
                </label>
                <input
                  type="text"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                  placeholder="e.g., Deeper Life Choir"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Album
                </label>
                <input
                  type="text"
                  name="album"
                  value={formData.album}
                  onChange={handleChange}
                  placeholder="Album name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Genre *
                </label>
                <div className="relative">
                  <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none appearance-none"
                  >
                    {genres.map((genre) => (
                      <option key={genre.value} value={genre.value}>
                        {genre.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="2026"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 4:30"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <div className="relative">
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none appearance-none"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe the song and its meaning..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-y"
                />
              </div>
            </div>
          </div>

          {/* Lyrics */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Lyrics</h2>
            <textarea
              name="lyrics"
              value={formData.lyrics}
              onChange={handleChange}
              rows={10}
              placeholder="Enter song lyrics here..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-y font-mono text-sm"
            />
          </div>

          {/* Media Links */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Media Links</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  YouTube URL
                </label>
                <input
                  type="url"
                  name="youtubeUrl"
                  value={formData.youtubeUrl}
                  onChange={handleChange}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Spotify URL
                </label>
                <input
                  type="url"
                  name="spotifyUrl"
                  value={formData.spotifyUrl}
                  onChange={handleChange}
                  placeholder="https://open.spotify.com/..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apple Music URL
                </label>
                <input
                  type="url"
                  name="appleMusicUrl"
                  value={formData.appleMusicUrl}
                  onChange={handleChange}
                  placeholder="https://music.apple.com/..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SoundCloud URL
                </label>
                <input
                  type="url"
                  name="soundcloudUrl"
                  value={formData.soundcloudUrl}
                  onChange={handleChange}
                  placeholder="https://soundcloud.com/..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Song Image/Artwork URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/artwork.jpg"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Tags</h2>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag (e.g., worship, praise)..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-600 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Featured */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 text-yellow-500 rounded focus:ring-yellow-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Feature this song (display as featured on the songs page)
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Link
              href="/choir/songs"
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              form="song-form"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Add Song
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}