// app/choir/attendance/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  UserPlus,
  Search,
  Filter,
  ChevronDown,
  Download,
  RefreshCw,
  BarChart3,
  TrendingUp,
  User,
  Mail,
  Phone
} from "lucide-react";

interface AttendanceRecord {
  id: string;
  memberName: string;
  email: string;
  phone: string;
  eventName: string;
  eventDate: string;
  checkInTime: string;
  checkOutTime: string;
  status: 'present' | 'absent' | 'late';
  role: string;
}

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const statuses = ["All", "Present", "Absent", "Late"];

  // Mock attendance data
  const mockAttendance: AttendanceRecord[] = [
    {
      id: "1",
      memberName: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+234 801 234 5678",
      eventName: "Choir Rehearsal",
      eventDate: "2026-12-15",
      checkInTime: "18:00",
      checkOutTime: "21:00",
      status: 'present',
      role: "Soprano"
    },
    {
      id: "2",
      memberName: "Michael Okonkwo",
      email: "michael@example.com",
      phone: "+234 802 345 6789",
      eventName: "Sunday Worship",
      eventDate: "2026-12-15",
      checkInTime: "08:30",
      checkOutTime: "12:00",
      status: 'present',
      role: "Tenor"
    },
    {
      id: "3",
      memberName: "Grace Adeyemi",
      email: "grace@example.com",
      phone: "+234 803 456 7890",
      eventName: "Choir Rehearsal",
      eventDate: "2026-12-14",
      checkInTime: "",
      checkOutTime: "",
      status: 'absent',
      role: "Alto"
    },
    {
      id: "4",
      memberName: "David Eze",
      email: "david@example.com",
      phone: "+234 804 567 8901",
      eventName: "Evening Service",
      eventDate: "2026-12-14",
      checkInTime: "17:45",
      checkOutTime: "20:30",
      status: 'late',
      role: "Bass"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setAttendance(mockAttendance);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'present': return 'bg-green-100 text-green-700';
      case 'absent': return 'bg-red-100 text-red-700';
      case 'late': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'absent': return <XCircle className="w-4 h-4" />;
      case 'late': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredAttendance = attendance.filter(record => {
    const matchesSearch = record.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "All" || record.status === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: attendance.length,
    present: attendance.filter(a => a.status === 'present').length,
    absent: attendance.filter(a => a.status === 'absent').length,
    late: attendance.filter(a => a.status === 'late').length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading attendance records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/choir"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Choir Attendance
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Track and manage choir member attendance
              </p>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition flex items-center gap-2"
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
                <p className="text-sm text-gray-500">Present</p>
                <p className="text-2xl font-bold text-green-600">{stats.present}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Absent</p>
                <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Late</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
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
                placeholder="Search by name, event, or email..."
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
                {statuses.map((status) => (
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

        {/* Attendance Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAttendance.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                          <User className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {record.memberName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {record.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.eventName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(record.eventDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {record.checkInTime || '--:--'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {record.checkOutTime || '--:--'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)}
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.role}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAttendance.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600">No attendance records found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}