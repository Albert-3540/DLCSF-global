// app/choir/voice-parts/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Music,
  Mic,
  Volume2,
  Volume1,
  VolumeX,
  Calendar,
  Star,
  Award,
  MoreVertical,
  RefreshCw,
  Download,
  Share2
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
  rehearsalTime: string;
  rehearsalDay: string;
  goals: string[];
}

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  voicePart: string;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
}

export default function VoicePartDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [voicePart, setVoicePart] = useState<VoicePart | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'schedule'>('overview');

  // Mock data based on ID
  const mockVoiceParts: Record<string, VoicePart> = {
    '1': {
      id: '1',
      name: 'Soprano',
      description: 'The highest vocal range, known for bright and soaring melodies that lift the congregation in worship.',
      members: 12,
      color: '#EC4899',
      range: 'C4 - C6',
      skillLevel: 'advanced',
      lead: 'Sarah Johnson',
      rehearsalTime: '4:00 PM - 5:30 PM',
      rehearsalDay: 'Tuesday',
      goals: ['Master new worship songs', 'Improve vocal technique', 'Prepare for Christmas concert']
    },
    '2': {
      id: '2',
      name: 'Alto',
      description: 'Rich and warm lower female voices providing harmonic foundation and depth to the choir.',
      members: 10,
      color: '#8B5CF6',
      range: 'G3 - F5',
      skillLevel: 'intermediate',
      lead: 'Grace Adeyemi',
      rehearsalTime: '3:00 PM - 4:30 PM',
      rehearsalDay: 'Wednesday',
      goals: ['Strengthen harmony skills', 'Expand repertoire', 'Develop sight-reading']
    },
    '3': {
      id: '3',
      name: 'Tenor',
      description: 'The highest male vocal range, bringing energy and brightness to the choir sound.',
      members: 8,
      color: '#3B82F6',
      range: 'C3 - C5',
      skillLevel: 'advanced',
      lead: 'Michael Okonkwo',
      rehearsalTime: '5:00 PM - 6:30 PM',
      rehearsalDay: 'Tuesday',
      goals: ['Perfect new arrangements', 'Build vocal strength', 'Lead in special programs']
    },
    '4': {
      id: '4',
      name: 'Bass',
      description: 'The lowest vocal range, providing foundation and depth that anchors the choir.',
      members: 6,
      color: '#F59E0B',
      range: 'E2 - E4',
      skillLevel: 'professional',
      lead: 'David Eze',
      rehearsalTime: '6:00 PM - 7:30 PM',
      rehearsalDay: 'Thursday',
      goals: ['Develop lower register', 'Master complex harmonies', 'Lead worship songs']
    },
    '5': {
      id: '5',
      name: 'Baritone',
      description: 'Between tenor and bass, warm and resonant voices that bridge the male sections.',
      members: 4,
      color: '#10B981',
      range: 'G2 - G4',
      skillLevel: 'intermediate',
      lead: 'James Okafor',
      rehearsalTime: '4:30 PM - 6:00 PM',
      rehearsalDay: 'Wednesday',
      goals: ['Develop vocal flexibility', 'Strengthen middle register', 'Prepare for concerts']
    }
  };

  const mockMembers: Record<string, Member[]> = {
    '1': [
      { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+234 801 234 5678', role: 'Choir Director', voicePart: 'Soprano', status: 'active', joinDate: '2024-01-15' },
      { id: '6', name: 'Elizabeth Nwachukwu', email: 'elizabeth@example.com', phone: '+234 805 678 9012', role: 'Choir Administrator', voicePart: 'Soprano', status: 'on-leave', joinDate: '2024-05-12' },
      { id: '7', name: 'Mary Adebayo', email: 'mary@example.com', phone: '+234 806 789 0123', role: 'Member', voicePart: 'Soprano', status: 'active', joinDate: '2024-06-20' },
    ],
    '2': [
      { id: '3', name: 'Grace Adeyemi', email: 'grace@example.com', phone: '+234 803 456 7890', role: 'Member', voicePart: 'Alto', status: 'inactive', joinDate: '2024-03-10' },
      { id: '8', name: 'Joy Okafor', email: 'joy@example.com', phone: '+234 807 890 1234', role: 'Member', voicePart: 'Alto', status: 'active', joinDate: '2024-07-15' },
    ],
    '3': [
      { id: '2', name: 'Michael Okonkwo', email: 'michael@example.com', phone: '+234 802 345 6789', role: 'Lead Vocalist', voicePart: 'Tenor', status: 'active', joinDate: '2024-02-20' },
      { id: '9', name: 'Peter Obi', email: 'peter@example.com', phone: '+234 808 901 2345', role: 'Member', voicePart: 'Tenor', status: 'active', joinDate: '2024-08-01' },
    ],
    '4': [
      { id: '4', name: 'David Eze', email: 'david@example.com', phone: '+234 804 567 8901', role: 'Pianist', voicePart: 'Bass', status: 'active', joinDate: '2024-04-05' },
    ],
    '5': [
      { id: '5', name: 'James Okafor', email: 'james@example.com', phone: '+234 805 678 9012', role: 'Member', voicePart: 'Baritone', status: 'active', joinDate: '2024-05-12' },
    ]
  };

  useEffect(() => {
    const id = params.id as string;
    if (id && mockVoiceParts[id]) {
      setVoicePart(mockVoiceParts[id]);
      setMembers(mockMembers[id] || []);
    }
    setIsLoading(false);
  }, [params.id]);

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

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <XCircle className="w-4 h-4" />;
      case 'on-leave': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  const getVoicePartIcon = (name: string) => {
    switch(name?.toLowerCase()) {
      case 'soprano': return <Volume2 className="w-5 h-5" />;
      case 'alto': return <Volume1 className="w-5 h-5" />;
      case 'tenor': return <Mic className="w-5 h-5" />;
      case 'bass': return <VolumeX className="w-5 h-5" />;
      default: return <Music className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading voice part details...</p>
        </div>
      </div>
    );
  }

  if (!voicePart) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600">Voice Part Not Found</h2>
          <p className="text-gray-400 mt-2">The voice part you're looking for doesn't exist.</p>
          <Link
            href="/choir/voice-parts"
            className="inline-block mt-4 px-6 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
          >
            Back to Voice Parts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/choir/voice-parts"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {voicePart.name} Section
              </h1>
              <p className="text-gray-500 text-sm">{voicePart.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.location.reload()}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
            <Link
              href={`/choir/voice-parts/${voicePart.id}/edit`}
              className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition"
            >
              <Edit className="w-5 h-5 text-blue-600" />
            </Link>
          </div>
        </div>

        {/* Voice Part Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center`} style={{ backgroundColor: voicePart.color + '20' }}>
                <Users className="w-5 h-5" style={{ color: voicePart.color }} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Members</p>
                <p className="text-xl font-bold">{voicePart.members}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Music className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Range</p>
                <p className="text-sm font-semibold">{voicePart.range}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Skill Level</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getSkillLevelColor(voicePart.skillLevel)}`}>
                  {getSkillLevelBadge(voicePart.skillLevel)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Section Lead</p>
                <p className="text-sm font-semibold">{voicePart.lead}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: Music },
                { id: 'members', label: 'Members', icon: Users },
                { id: 'schedule', label: 'Schedule', icon: Calendar }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium transition whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-b-2 border-purple-600 text-purple-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">About {voicePart.name}</h3>
                  <p className="text-gray-600">{voicePart.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Goals & Objectives</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {voicePart.goals.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Rehearsal Schedule</h4>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Day:</span> {voicePart.rehearsalDay}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Time:</span> {voicePart.rehearsalTime}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Quick Stats</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>👥 {voicePart.members} members</p>
                      <p>🎵 {voicePart.range} range</p>
                      <p>👤 Lead by {voicePart.lead}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Members ({members.length})
                  </h3>
                  <Link
                    href={`/choir/members/add?voicePart=${voicePart.id}`}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
                  >
                    + Add Member
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {members.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50 transition">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-purple-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                                <p className="text-xs text-gray-500">{member.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="text-sm text-gray-600">{member.role}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                              {getStatusIcon(member.status)}
                              {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right">
                            <Link
                              href={`/choir/members/${member.id}`}
                              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {members.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No members in this section yet</p>
                    <Link
                      href={`/choir/members/add?voicePart=${voicePart.id}`}
                      className="inline-block mt-2 text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Add the first member
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <h3 className="font-semibold text-purple-800">Current Schedule</h3>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Rehearsal Day:</span> {voicePart.rehearsalDay}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Time:</span> {voicePart.rehearsalTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Lead:</span> {voicePart.lead}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Location:</span> Main Auditorium
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h4 className="font-semibold text-gray-700 mb-3">Upcoming Rehearsals</h4>
                  <div className="space-y-2">
                    {[
                      { date: 'December 15, 2026', time: voicePart.rehearsalTime, topic: 'Christmas Concert Preparation' },
                      { date: 'December 22, 2026', time: voicePart.rehearsalTime, topic: 'Final Run-through' },
                      { date: 'December 29, 2026', time: voicePart.rehearsalTime, topic: 'New Year Songs' },
                    ].map((rehearsal, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{rehearsal.date}</p>
                          <p className="text-xs text-gray-500">{rehearsal.time}</p>
                          <p className="text-xs text-gray-600 mt-1">{rehearsal.topic}</p>
                        </div>
                        <button className="px-3 py-1.5 bg-purple-100 text-purple-600 rounded-lg text-xs font-medium hover:bg-purple-200 transition">
                          Join
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}