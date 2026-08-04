// app/choir/members/page.tsx
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
  MoreVertical
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  voicePart: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  avatar?: string;
  location?: string;
  skills?: string[];
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Mock members data
  const mockMembers: Member[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+234 801 234 5678',
      role: 'Choir Director',
      voicePart: 'Soprano',
      joinDate: '2024-01-15',
      status: 'active',
      location: 'Lagos, Nigeria',
      skills: ['Vocal Training', 'Music Theory', 'Conducting']
    },
    {
      id: '2',
      name: 'Michael Okonkwo',
      email: 'michael.okonkwo@example.com',
      phone: '+234 802 345 6789',
      role: 'Lead Vocalist',
      voicePart: 'Tenor',
      joinDate: '2024-02-20',
      status: 'active',
      location: 'Abuja, Nigeria',
      skills: ['Lead Vocals', 'Harmony', 'Stage Performance']
    },
    {
      id: '3',
      name: 'Grace Adeyemi',
      email: 'grace.ad eyemi@example.com',
      phone: '+234 803 456 7890',
      role: 'Member',
      voicePart: 'Alto',
      joinDate: '2024-03-10',
      status: 'inactive',
      location: 'Ibadan, Nigeria',
      skills: ['Background Vocals', 'Choir Ensemble']
    },
    {
      id: '4',
      name: 'David Eze',
      email: 'david.eze@example.com',
      phone: '+234 804 567 8901',
      role: 'Pianist',
      voicePart: 'Bass',
      joinDate: '2024-04-05',
      status: 'active',
      location: 'Port Harcourt, Nigeria',
      skills: ['Piano', 'Music Arrangement', 'Keyboard']
    },
    {
      id: '5',
      name: 'Elizabeth Nwachukwu',
      email: 'elizabeth.n@example.com',
      phone: '+234 805 678 9012',
      role: 'Choir Administrator',
      voicePart: 'Soprano',
      joinDate: '2024-05-12',
      status: 'on-leave',
      location: 'Enugu, Nigeria',
      skills: ['Administration', 'Event Planning', 'Vocals']
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setMembers(mockMembers);
      setIsLoading(false);
    }, 1000);
  }, []);

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

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.voicePart.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "All" || member.status === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    inactive: members.filter(m => m.status === 'inactive').length,
    onLeave: members.filter(m => m.status === 'on-leave').length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading members...</p>
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
                Choir Members
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Manage choir members and their roles
              </p>
            </div>
          </div>
          <Link
            href="/choir/members/add"
            className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <UserPlus className="w-4 h-4" />
            Add Member
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Members</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Inactive</p>
                <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">On Leave</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.onLeave}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3" />
              <input
                type="text"
                placeholder="Search by name, email, role, or voice part..."
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
            <button
              className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {["All", "Active", "Inactive", "On Leave"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedStatus === status
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Voice Part
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.voicePart}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                        {getStatusIcon(member.status)}
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedMember(member);
                            setShowModal(true);
                          }}
                          className="p-1 hover:bg-gray-100 rounded-lg transition"
                        >
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                        <Link
                          href={`/choir/members/${member.id}/edit`}
                          className="p-1 hover:bg-gray-100 rounded-lg transition"
                        >
                          <Edit className="w-4 h-4 text-blue-500" />
                        </Link>
                        <button className="p-1 hover:bg-gray-100 rounded-lg transition">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600">No members found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Member Details Modal */}
      {showModal && selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Member Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition"
              >
                <XCircle className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{selectedMember.name}</h3>
                  <p className="text-sm text-gray-500">{selectedMember.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">{selectedMember.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium text-gray-800">{selectedMember.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500">Voice Part</p>
                  <p className="font-medium text-gray-800">{selectedMember.voicePart}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedMember.status)}`}>
                    {getStatusIcon(selectedMember.status)}
                    {selectedMember.status.charAt(0).toUpperCase() + selectedMember.status.slice(1)}
                  </span>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium text-gray-800">{selectedMember.location || 'Not specified'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Skills</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedMember.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    )) || <span className="text-gray-400 text-sm">No skills listed</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
              <Link
                href={`/choir/members/${selectedMember.id}/edit`}
                className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition text-center"
              >
                Edit Profile
              </Link>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}