"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users, Search, Filter, MapPin, Mail,
  Phone, Calendar, ChevronRight, UserPlus,
  Star, Grid, List, Eye, MessageCircle,
  ArrowLeft, Download, Share2
} from 'lucide-react';

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  campus: string;
  country: string;
  role: string;
  joinedDate: string;
  status: 'active' | 'inactive';
  avatar: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    // Mock data - replace with API call
    const mockMembers: Member[] = [
      {
        id: 1,
        name: 'Albert Oduma',
        email: 'albert@example.com',
        phone: '+234 801 234 5678',
        campus: 'University of Calabar',
        country: 'Nigeria',
        role: 'Student',
        joinedDate: '2024-01-15',
        status: 'active',
        avatar: 'AO'
      },
      {
        id: 2,
        name: 'Grace Mensah',
        email: 'grace@example.com',
        phone: '+233 201 234 5678',
        campus: 'University of Ghana',
        country: 'Ghana',
        role: 'Corper',
        joinedDate: '2024-02-01',
        status: 'active',
        avatar: 'GM'
      },
      {
        id: 3,
        name: 'Daniel Kiprop',
        email: 'daniel@example.com',
        phone: '+254 701 234 5678',
        campus: 'University of Nairobi',
        country: 'Kenya',
        role: 'Student',
        joinedDate: '2023-11-20',
        status: 'active',
        avatar: 'DK'
      },
      {
        id: 4,
        name: 'Sarah Adebayo',
        email: 'sarah@example.com',
        phone: '+234 802 345 6789',
        campus: 'Obafemi Awolowo University',
        country: 'Nigeria',
        role: 'Pastor',
        joinedDate: '2023-09-10',
        status: 'active',
        avatar: 'SA'
      },
      {
        id: 5,
        name: 'Michael Okonkwo',
        email: 'michael@example.com',
        phone: '+234 803 456 7890',
        campus: 'University of Nigeria, Nsukka',
        country: 'Nigeria',
        role: 'Student',
        joinedDate: '2024-03-05',
        status: 'inactive',
        avatar: 'MO'
      },
      {
        id: 6,
        name: 'Grace Emmanuel',
        email: 'grace.emmanuel@example.com',
        phone: '+234 804 567 8901',
        campus: 'Ahmadu Bello University',
        country: 'Nigeria',
        role: 'Corper',
        joinedDate: '2024-01-20',
        status: 'active',
        avatar: 'GE'
      }
    ];

    setMembers(mockMembers);
    setLoading(false);
  }, []);

  const roles = ['all', 'Student', 'Corper', 'Pastor', 'Admin'];

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.campus.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  Members
                </h1>
                <p className="text-sm text-gray-500">
                  {filteredMembers.length} members found
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Add Member
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search members by name, campus, or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-3">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Members Grid/List */}
        {filteredMembers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No members found</h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all group ${
                  viewMode === 'list' ? 'p-4' : 'p-6'
                }`}
              >
                {viewMode === 'grid' ? (
                  // Grid View
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                          {member.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {member.name}
                          </h3>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                            {member.status}
                          </span>
                        </div>
                      </div>
                      {member.role === 'Pastor' && (
                        <div className="bg-yellow-100 text-yellow-700 p-1.5 rounded-full">
                          <Star className="w-4 h-4 fill-yellow-500" />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span>{member.campus}, {member.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-500" />
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>Joined {new Date(member.joinedDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {member.role}
                      </span>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                          <MessageCircle className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-base">
                        {member.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {member.name}
                          </h3>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                            {member.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-blue-500" />
                            {member.campus}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5 text-blue-500" />
                            {member.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                        {member.role}
                      </span>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                Total: {members.length}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Active: {members.filter(m => m.status === 'active').length}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                Inactive: {members.filter(m => m.status === 'inactive').length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}