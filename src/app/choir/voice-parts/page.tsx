// app/choir/voice-parts/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  User,
  Mail,
  Phone,
  MapPin,
  Star,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Music,
  Mic,
  Microphone,
  Volume2,
  Volume1,
  VolumeX
} from "lucide-react";

interface VoicePart {
  id: string;
  name: string;
  description: string;
  members: number;
  color: string;
  range: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  lead: string;
}

interface Member {
  id: string;
  name: string;
  voicePart: string;
  status: 'active' | 'inactive' | 'on-leave';
}

export default function VoicePartsPage() {
  const [voiceParts, setVoiceParts] = useState<VoicePart[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVoicePart, setSelectedVoicePart] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Mock voice parts data
  const mockVoiceParts: VoicePart[] = [
    {
      id: '1',
      name: 'Soprano',
      description: 'The highest vocal range, known for bright and soaring melodies',
      members: 12,
      color: '#EC4899',
      range: 'C4 - C6',
      skillLevel: 'advanced',
      lead: 'Sarah Johnson'
    },
    {
      id: '2',
      name: 'Alto',
      description: 'Rich and warm lower female voices',
      members: 10,
      color: '#8B5CF6',
      range: 'G3 - F5',
      skillLevel: 'intermediate',
      lead: 'Grace Adeyemi'
    },
    {
      id: '3',
      name: 'Tenor',
      description: 'The highest male vocal range',
      members: 8,
      color: '#3B82F6',
      range: 'C3 - C5',
      skillLevel: 'advanced',
      lead: 'Michael Okonkwo'
    },
    {
      id: '4',
      name: 'Bass',
      description: 'The lowest vocal range, providing foundation and depth',
      members: 6,
      color: '#F59E0B',
      range: 'E2 - E4',
      skillLevel: 'professional',
      lead: 'David Eze'
    },
    {
      id: '5',
      name: 'Baritone',
      description: 'Between tenor and bass, warm and resonant',
      members: 4,
      color: '#10B981',
      range: 'G2 - G4',
      skillLevel: 'intermediate',
      lead: 'James Okafor'
    }
  ];

  const mockMembers: Member[] = [
    { id: '1', name: 'Sarah Johnson', voicePart: 'Soprano', status: 'active' },
    { id: '2', name: 'Michael Okonkwo', voicePart: 'Tenor', status: 'active' },
    { id: '3', name: 'Grace Adeyemi', voicePart: 'Alto', status: 'inactive' },
    { id: '4', name: 'David Eze', voicePart: 'Bass', status: 'active' },
    { id: '5', name: 'James Okafor', voicePart: 'Baritone', status: 'active' },
    { id: '6', name: 'Elizabeth Nwachukwu', voicePart: 'Soprano', status: 'on-leave' },
    { id: '7', name: 'Peter Obi', voicePart: 'Tenor', status: 'active' },
    { id: '8', name: 'Mary Adebayo', voicePart: 'Alto', status: 'active' },
  ];

  useEffect(() => {
    setTimeout(() => {
      setVoiceParts(mockVoiceParts);
      setMembers(mockMembers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getSkillLevelColor = (level: string) => {
    switch(level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-blue-100 text-blue-700';
      case 'advanced': return 'bg-purple-100 text-purple-700';
      case 'professional': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSkillLevelBadge = (level: string) => {
    switch(level) {
      case 'beginner': return '🌟 Beginner';
      case 'intermediate': return '📈 Intermediate';
      case 'advanced': return '⭐ Advanced';
      case 'professional': return '🏆 Professional';
      default: return level;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      case 'on-leave': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getVoicePartIcon = (name: string) => {
    switch(name.toLowerCase()) {
      case 'soprano': return <Volume2 className="w-5 h-5" />;
      case 'alto': return <Volume1 className="w-5 h-5" />;
      case 'tenor': return <Mic className="w-5 h-5" />;
      case 'bass': return <VolumeX className="w-5 h-5" />;
      default: return <Music className="w-5 h-5" />;
    }
  };

  const filteredVoiceParts = voiceParts.filter(vp => {
    const matchesSearch = vp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vp.lead.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getMembersForPart = (partName: string) => {
    return members.filter(m => m.voicePart === partName);
  };

  const stats = {
    total: voiceParts.length,
    totalMembers: members.length,
    activeMembers: members.filter(m => m.status === 'active').length,
    partsWithMembers: voiceParts.filter(vp => vp.members > 0).length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading voice parts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/choir"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Voice Parts
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Manage choir voice sections and their members
              </p>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Voice Parts</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Music className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Members</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalMembers}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Members</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeMembers}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Parts</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.partsWithMembers}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3" />
              <input
                type="text"
                placeholder="Search voice parts by name, description, or lead..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Voice Parts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVoiceParts.map((voicePart) => {
            const partMembers = getMembersForPart(voicePart.name);
            const activeMembers = partMembers.filter(m => m.status === 'active').length;
            
            return (
              <div
                key={voicePart.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition group"
              >
                <div 
                  className="h-2"
                  style={{ backgroundColor: voicePart.color }}
                />
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: voicePart.color }}
                      >
                        {getVoicePartIcon(voicePart.name)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {voicePart.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {voicePart.range}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(voicePart.skillLevel)}`}>
                      {getSkillLevelBadge(voicePart.skillLevel)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {voicePart.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-700">
                        {voicePart.members} members
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-green-600">
                        {activeMembers} active
                      </span>
                    </div>
                    <div className="text-gray-500">
                      Lead: <span className="font-medium text-gray-700">{voicePart.lead}</span>
                    </div>
                  </div>

                  {/* Member List */}
                  {partMembers.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-1.5">
                        {partMembers.slice(0, 4).map((member) => (
                          <span
                            key={member.id}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}
                          >
                            <User className="w-3 h-3" />
                            {member.name}
                          </span>
                        ))}
                        {partMembers.length > 4 && (
                          <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            +{partMembers.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={`/choir/voice-parts/${voicePart.id}`}
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition text-center"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/choir/voice-parts/${voicePart.id}/edit`}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredVoiceParts.length === 0 && (
          <div className="text-center py-16">
            <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600">No voice parts found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
}