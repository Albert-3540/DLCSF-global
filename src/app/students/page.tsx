"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Search,
  MapPin,
  GraduationCap,
  Heart,
  Globe,
  ChevronRight,
  Filter,
  ChevronDown,
  UserPlus,
  BookOpen,
  Sparkles,
  ArrowRight,
  Award,
  Calendar,
  MessageCircle,
  Share2,
  X,
  CheckCircle,
  Loader2,
  Mail,
  Phone,
  User,
  Church,
  Clock,
  Star,
  Shield,
  Hash,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Send,
  Eye,
  ThumbsUp,
} from "lucide-react";

// Student data - this would come from a database in production
const initialStudents = [
  {
    id: 1,
    name: "Albert Oduma",
    country: "Nigeria",
    university: "University of Calabar",
    course: "Computer Science",
    year: "3rd Year",
    status: "Active",
    prayerRequests: 12,
    joinedDate: "2023",
    bio: "Passionate about technology and using it to spread the gospel. Leading campus fellowship.",
    email: "albert@email.com",
    phone: "+234 812 345 6789",
    fellowship: "Calabar Campus Fellowship",
    skills: ["Web Development", "Prayer Leader", "Tech Evangelist"],
    interests: ["Evangelism", "Tech", "Music"],
    social: {
      twitter: "@albertoduma",
      instagram: "@albert.oduma",
      linkedin: "albertoduma",
    },
  },
  {
    id: 2,
    name: "Grace Mensah",
    country: "Ghana",
    university: "University of Ghana",
    course: "Business Administration",
    year: "2nd Year",
    status: "Active",
    prayerRequests: 8,
    joinedDate: "2024",
    bio: "Focused on building Christian businesses and leading worship on campus.",
    email: "grace@email.com",
    phone: "+233 555 123456",
    fellowship: "Accra Campus Fellowship",
    skills: ["Leadership", "Worship", "Business"],
    interests: ["Worship", "Entrepreneurship", "Discipleship"],
    social: {
      twitter: "@gracemensah",
      instagram: "@grace.mensah",
      linkedin: "gracemensah",
    },
  },
  {
    id: 3,
    name: "Daniel Kiprop",
    country: "Kenya",
    university: "University of Nairobi",
    course: "Medicine",
    year: "4th Year",
    status: "Active",
    prayerRequests: 15,
    joinedDate: "2022",
    bio: "Medical student with a passion for healthcare missions and evangelism.",
    email: "daniel@email.com",
    phone: "+254 700 123456",
    fellowship: "Nairobi Campus Fellowship",
    skills: ["Medical", "Public Speaking", "Missions"],
    interests: ["Healthcare", "Missions", "Evangelism"],
    social: {
      twitter: "@danielkiprop",
      instagram: "@daniel.kiprop",
      linkedin: "danielkiprop",
    },
  },
  {
    id: 4,
    name: "Sarah Johnson",
    country: "United States",
    university: "Harvard University",
    course: "Theology",
    year: "1st Year",
    status: "Active",
    prayerRequests: 5,
    joinedDate: "2025",
    bio: "Pursuing theological studies while leading campus prayer groups.",
    email: "sarah@email.com",
    phone: "+1 800 555 0199",
    fellowship: "Boston Campus Fellowship",
    skills: ["Prayer Leadership", "Bible Study", "Teaching"],
    interests: ["Theology", "Prayer", "Mentoring"],
    social: {
      twitter: "@sarahjohnson",
      instagram: "@sarah.johnson",
      linkedin: "sarahjohnson",
    },
  },
  {
    id: 5,
    name: "Michael Osei",
    country: "Ghana",
    university: "Kwame Nkrumah University",
    course: "Engineering",
    year: "3rd Year",
    status: "Prayed",
    prayerRequests: 20,
    joinedDate: "2023",
    bio: "Engineering student passionate about using technology for ministry.",
    email: "michael@email.com",
    phone: "+233 555 789012",
    fellowship: "Kumasi Campus Fellowship",
    skills: ["Engineering", "Tech", "Project Management"],
    interests: ["Tech", "Innovation", "Outreach"],
    social: {
      twitter: "@michaelosei",
      instagram: "@michael.osei",
      linkedin: "michaelosei",
    },
  },
  {
    id: 6,
    name: "Faith Ndlovu",
    country: "South Africa",
    university: "University of Cape Town",
    course: "Law",
    year: "2nd Year",
    status: "Active",
    prayerRequests: 7,
    joinedDate: "2024",
    bio: "Law student committed to justice and advocating for Christian values.",
    email: "faith@email.com",
    phone: "+27 82 345 6789",
    fellowship: "Cape Town Campus Fellowship",
    skills: ["Legal", "Advocacy", "Writing"],
    interests: ["Justice", "Human Rights", "Law"],
    social: {
      twitter: "@faithndlovu",
      instagram: "@faith.ndlovu",
      linkedin: "faithndlovu",
    },
  },
];

// Fellowship groups
const fellowships = [
  { id: 1, name: "Calabar Campus Fellowship", country: "Nigeria", members: 45, leader: "Albert Oduma" },
  { id: 2, name: "Accra Campus Fellowship", country: "Ghana", members: 38, leader: "Grace Mensah" },
  { id: 3, name: "Nairobi Campus Fellowship", country: "Kenya", members: 52, leader: "Daniel Kiprop" },
  { id: 4, name: "Boston Campus Fellowship", country: "USA", members: 30, leader: "Sarah Johnson" },
  { id: 5, name: "Kumasi Campus Fellowship", country: "Ghana", members: 28, leader: "Michael Osei" },
  { id: 6, name: "Cape Town Campus Fellowship", country: "South Africa", members: 35, leader: "Faith Ndlovu" },
  { id: 7, name: "Lagos Campus Fellowship", country: "Nigeria", members: 60, leader: "David Okonkwo" },
  { id: 8, name: "Nairobi Tech Fellowship", country: "Kenya", members: 25, leader: "Peter Mwangi" },
];

const countries = ["All", ...new Set(initialStudents.map(s => s.country))];
const statuses = ["All", ...new Set(initialStudents.map(s => s.status))];

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showFellowship, setShowFellowship] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("students");
  const [students, setStudents] = useState(initialStudents);

  // Registration form state
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    university: "",
    course: "",
    year: "",
    fellowship: "",
    bio: "",
    interests: "",
  });

  const handleRegisterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate registration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Add new student to list
      const newStudent = {
        id: students.length + 1,
        name: registerForm.name,
        country: registerForm.country,
        university: registerForm.university,
        course: registerForm.course,
        year: registerForm.year || "1st Year",
        status: "Active",
        prayerRequests: 0,
        joinedDate: new Date().getFullYear().toString(),
        bio: registerForm.bio || "New DLCSF Student",
        email: registerForm.email,
        phone: registerForm.phone || "",
        fellowship: registerForm.fellowship || "Not Assigned",
        skills: [],
        interests: registerForm.interests ? registerForm.interests.split(",").map(s => s.trim()) : [],
        social: {},
      };

      setStudents((prev) => [...prev, newStudent]);
      setRegistrationSuccess(true);
      setIsSubmitting(false);

      setTimeout(() => {
        setShowRegistration(false);
        setRegistrationSuccess(false);
        setRegisterForm({
          name: "",
          email: "",
          phone: "",
          country: "",
          university: "",
          course: "",
          year: "",
          fellowship: "",
          bio: "",
          interests: "",
        });
      }, 3000);

    } catch (error) {
      console.error("Registration error:", error);
      setIsSubmitting(false);
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.fellowship.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry =
      selectedCountry === "All" || student.country === selectedCountry;

    const matchesStatus =
      selectedStatus === "All" || student.status === selectedStatus;

    return matchesSearch && matchesCountry && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Prayed":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
            <Users size={20} className="text-yellow-400" />
            <span className="text-sm font-medium">Global Student Community</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Students Across the World
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Connect with students from over 50 countries, join fellowships, and grow in faith together.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowRegistration(true)}
              className="bg-yellow-400 text-blue-950 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition transform hover:scale-105"
            >
              <UserPlus size={18} className="inline mr-2" />
              Join as Student
            </button>
            <button
              onClick={() => setShowFellowship(true)}
              className="bg-white/20 text-white px-8 py-3 rounded-full font-bold backdrop-blur hover:bg-white/30 transition border border-white/20"
            >
              <Church size={18} className="inline mr-2" />
              Find Fellowship
            </button>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-white border-b py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <p className="text-3xl font-bold text-blue-900">{students.length}+</p>
              <p className="text-sm text-gray-500">Students</p>
            </div>
            <div className="p-3">
              <p className="text-3xl font-bold text-blue-900">50+</p>
              <p className="text-sm text-gray-500">Countries</p>
            </div>
            <div className="p-3">
              <p className="text-3xl font-bold text-blue-900">{fellowships.length}</p>
              <p className="text-sm text-gray-500">Fellowships</p>
            </div>
            <div className="p-3">
              <p className="text-3xl font-bold text-blue-900">180+</p>
              <p className="text-sm text-gray-500">Campuses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("students")}
              className={`px-6 py-3 font-semibold transition border-b-2 ${
                activeTab === "students"
                  ? "border-blue-900 text-blue-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Users size={18} className="inline mr-2" />
              Students
            </button>
            <button
              onClick={() => setActiveTab("fellowships")}
              className={`px-6 py-3 font-semibold transition border-b-2 ${
                activeTab === "fellowships"
                  ? "border-blue-900 text-blue-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Church size={18} className="inline mr-2" />
              Fellowships
            </button>
            <button
              onClick={() => setActiveTab("join")}
              className={`px-6 py-3 font-semibold transition border-b-2 ${
                activeTab === "join"
                  ? "border-blue-900 text-blue-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <UserPlus size={18} className="inline mr-2" />
              Join Fellowship
            </button>
          </div>
        </div>
      </section>

      {/* Students Tab */}
      {activeTab === "students" && (
        <>
          {/* Search and Filters */}
          <section className="py-6 px-6 bg-white border-b sticky top-0 z-20 shadow-sm">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search size={20} className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, university, course, or fellowship..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="relative">
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white"
                    >
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-4 text-gray-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          Status: {status}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Students Grid */}
          <section className="py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {filteredStudents.length} {filteredStudents.length === 1 ? "Student" : "Students"}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Sort by:</span>
                  <select className="border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Latest</option>
                    <option>Prayer Requests</option>
                    <option>Name</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition group"
                  >
                    {/* Avatar */}
                    <div className="h-32 bg-gradient-to-br from-blue-700 to-indigo-700 relative flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-3xl font-bold border-2 border-white/30">
                        {getInitials(student.name)}
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                          {student.status}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-black/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur">
                          {student.country}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-800 group-hover:text-blue-700 transition">
                            {student.name}
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <GraduationCap size={14} />
                            {student.university}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {student.course}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {student.year}
                        </span>
                        {student.fellowship && (
                          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                            {student.fellowship}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                        {student.bio}
                      </p>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm">
                          <Heart size={16} className="text-red-500" />
                          <span className="font-medium">{student.prayerRequests}</span>
                          <span className="text-gray-400">prayers</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Calendar size={12} />
                          Joined {student.joinedDate}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="flex-1 bg-blue-900 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition"
                        >
                          View Profile
                        </button>
                        <button 
                          className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-gray-600"
                          title="Send Message"
                        >
                          <MessageCircle size={16} />
                        </button>
                        <button 
                          className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-gray-600"
                          title="Share"
                        >
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredStudents.length === 0 && (
                <div className="text-center py-16">
                  <Users size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-600">No students found</h3>
                  <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* Fellowships Tab */}
      {activeTab === "fellowships" && (
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-blue-950 mb-4">
                Campus Fellowships
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join a fellowship near you and connect with other students who share your faith.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fellowships.map((fellowship) => (
                <div
                  key={fellowship.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-br from-blue-700 to-indigo-700 text-white p-6">
                    <Church size={32} className="mb-3" />
                    <h3 className="text-xl font-bold">{fellowship.name}</h3>
                    <p className="text-sm text-blue-200">{fellowship.country}</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Users size={16} className="text-gray-400" />
                        <span className="font-medium">{fellowship.members} members</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User size={16} className="text-gray-400" />
                        <span className="text-gray-600">Led by {fellowship.leader}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setShowFellowship(true);
                        setRegisterForm(prev => ({ ...prev, fellowship: fellowship.name }));
                      }}
                      className="w-full bg-blue-900 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-800 transition flex items-center justify-center gap-2"
                    >
                      <UserPlus size={16} />
                      Join This Fellowship
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join Tab */}
      {activeTab === "join" && (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-950 mb-4">
                  Join a Fellowship
                </h2>
                <p className="text-gray-600">
                  Find and join a campus fellowship near you. Connect with other students and grow in faith.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {fellowships.map((fellowship) => (
                  <button
                    key={fellowship.id}
                    onClick={() => {
                      setRegisterForm(prev => ({ ...prev, fellowship: fellowship.name }));
                      setShowRegistration(true);
                    }}
                    className="p-4 border rounded-2xl text-left hover:bg-blue-50 transition group"
                  >
                    <div className="flex items-center gap-3">
                      <Church size={24} className="text-blue-600 group-hover:scale-110 transition" />
                      <div>
                        <p className="font-bold text-gray-800">{fellowship.name}</p>
                        <p className="text-sm text-gray-500">{fellowship.country}</p>
                      </div>
                      <ChevronRight size={16} className="ml-auto text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {registrationSuccess ? (
              <div className="p-8 text-center">
                <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Registration Successful! 🎉
                </h2>
                <p className="text-gray-600 mb-6">
                  Welcome to the DLCSF Global student community! You are now part of a global family of believers.
                </p>
                <button
                  onClick={() => setShowRegistration(false)}
                  className="bg-blue-900 text-white px-8 py-3 rounded-xl hover:bg-blue-800 transition"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Join as Student</h2>
                    <button
                      onClick={() => setShowRegistration(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                      <X size={24} className="text-gray-500" />
                    </button>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={registerForm.name}
                          onChange={handleRegisterChange}
                          placeholder="Enter your full name"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={registerForm.email}
                          onChange={handleRegisterChange}
                          placeholder="Enter your email"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={registerForm.phone}
                          onChange={handleRegisterChange}
                          placeholder="Enter your phone number"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country *
                        </label>
                        <select
                          name="country"
                          required
                          value={registerForm.country}
                          onChange={handleRegisterChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          <option value="">Select your country</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Kenya">Kenya</option>
                          <option value="South Africa">South Africa</option>
                          <option value="USA">USA</option>
                          <option value="UK">UK</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          University *
                        </label>
                        <input
                          type="text"
                          name="university"
                          required
                          value={registerForm.university}
                          onChange={handleRegisterChange}
                          placeholder="Enter your university"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Course / Major *
                        </label>
                        <input
                          type="text"
                          name="course"
                          required
                          value={registerForm.course}
                          onChange={handleRegisterChange}
                          placeholder="Enter your course"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Year of Study
                        </label>
                        <select
                          name="year"
                          value={registerForm.year}
                          onChange={handleRegisterChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          <option value="">Select year</option>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                          <option value="5th Year">5th Year</option>
                          <option value="Graduate">Graduate</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Fellowship
                        </label>
                        <select
                          name="fellowship"
                          value={registerForm.fellowship}
                          onChange={handleRegisterChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          <option value="">Select a fellowship</option>
                          {fellowships.map((f) => (
                            <option key={f.id} value={f.name}>
                              {f.name} - {f.country}
                            </option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        rows={3}
                        value={registerForm.bio}
                        onChange={handleRegisterChange}
                        placeholder="Tell us about yourself..."
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Interests (comma separated)
                      </label>
                      <input
                        type="text"
                        name="interests"
                        value={registerForm.interests}
                        onChange={handleRegisterChange}
                        placeholder="e.g. Music, Prayer, Evangelism, Tech"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowRegistration(false)}
                        className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-blue-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <UserPlus size={20} />
                            Join Now
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Fellowship Modal */}
      {showFellowship && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Find a Fellowship</h2>
              <button
                onClick={() => setShowFellowship(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <div className="grid gap-4">
              {fellowships.map((fellowship) => (
                <div
                  key={fellowship.id}
                  className="p-4 border rounded-2xl hover:bg-blue-50 transition group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Church size={24} className="text-blue-600" />
                      <div>
                        <h3 className="font-bold text-gray-800">{fellowship.name}</h3>
                        <p className="text-sm text-gray-500">{fellowship.country}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                          <Users size={12} />
                          <span>{fellowship.members} members</span>
                          <span>•</span>
                          <span>Led by {fellowship.leader}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setRegisterForm(prev => ({ ...prev, fellowship: fellowship.name }));
                        setShowFellowship(false);
                        setShowRegistration(true);
                      }}
                      className="bg-blue-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-800 transition"
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
              <p className="text-sm text-gray-600">
                Can't find your fellowship?{" "}
                <button
                  onClick={() => {
                    setShowFellowship(false);
                    setShowRegistration(true);
                  }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Register as a student
                </button>{" "}
                and we'll connect you with a fellowship near you.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Student Profile Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-700 to-indigo-700 flex items-center justify-center text-white text-2xl font-bold">
                    {getInitials(selectedStudent.name)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedStudent.name}</h2>
                    <p className="text-gray-500">{selectedStudent.university}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Course</p>
                    <p className="font-medium text-gray-800">{selectedStudent.course}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Year</p>
                    <p className="font-medium text-gray-800">{selectedStudent.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p className="font-medium text-gray-800 flex items-center gap-2">
                      <Globe size={16} />
                      {selectedStudent.country}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fellowship</p>
                    <p className="font-medium text-gray-800">{selectedStudent.fellowship}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${getStatusColor(selectedStudent.status)}`}>
                      {selectedStudent.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Prayer Requests</p>
                    <p className="font-medium text-gray-800 flex items-center gap-2">
                      <Heart size={16} className="text-red-500" />
                      {selectedStudent.prayerRequests}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Joined</p>
                    <p className="font-medium text-gray-800">{selectedStudent.joinedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <div className="space-y-1 text-sm">
                      {selectedStudent.email && (
                        <p className="flex items-center gap-2 text-gray-600">
                          <Mail size={14} /> {selectedStudent.email}
                        </p>
                      )}
                      {selectedStudent.phone && (
                        <p className="flex items-center gap-2 text-gray-600">
                          <Phone size={14} /> {selectedStudent.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500">Bio</p>
                <p className="text-gray-600 mt-1">{selectedStudent.bio}</p>
              </div>

              {selectedStudent.interests && selectedStudent.interests.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Interests</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedStudent.interests.map((interest: string, idx: number) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button className="flex-1 bg-blue-900 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-blue-800 transition flex items-center justify-center gap-2">
                  <MessageCircle size={18} />
                  Send Message
                </button>
                <button className="flex-1 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl font-semibold hover:bg-red-100 transition flex items-center justify-center gap-2">
                  <Heart size={18} />
                  Pray for {selectedStudent.name.split(' ')[0]}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}