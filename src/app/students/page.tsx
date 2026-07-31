"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Albert Oduma",
      role: "Student Leader, Nigeria",
      text: "DLCSF has transformed my walk with God. The community, prayer support, and discipleship have been incredible.",
      rating: 5,
    },
    {
      id: 2,
      name: "Grace Mensah",
      role: "Worship Leader, Ghana",
      text: "Through DLCSF, I've found a global family of believers who are passionate about spreading the Gospel.",
      rating: 5,
    },
    {
      id: 3,
      name: "Daniel Kiprop",
      role: "Medical Student, Kenya",
      text: "Being part of DLCSF has given me purpose and direction. I'm now pursuing missions alongside my studies.",
      rating: 5,
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "Theology Student, USA",
      text: "DLCSF connects students from different cultures, united by one faith. It's truly a global movement.",
      rating: 5,
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Global Prayer Conference 2026",
      date: "December 15-17, 2026",
      location: "Virtual & In-Person",
      type: "Conference",
      color: "blue",
    },
    {
      id: 2,
      title: "Campus Fellowship Week",
      date: "December 20-25, 2026",
      location: "Various Campuses",
      type: "Fellowship",
      color: "green",
    },
    {
      id: 3,
      title: "Global Mission Outreach",
      date: "January 10-20, 2027",
      location: "Multiple Locations",
      type: "Mission",
      color: "orange",
    },
    {
      id: 4,
      title: "Worship Night 2026",
      date: "November 25, 2026",
      location: "Main Auditorium",
      type: "Worship",
      color: "purple",
    },
  ];

  const countries = [
    "Nigeria", "Ghana", "Kenya", "South Africa", "USA", "UK", 
    "Canada", "Australia", "Germany", "France", "Brazil", "India"
  ];

  const resources = [
    { icon: "📖", title: "Sermons", desc: "Powerful messages", link: "/sermons" },
    { icon: "📚", title: "Bible Study", desc: "Study guides", link: "/bible-study" },
    { icon: "🎵", title: "Worship", desc: "Music & praise", link: "/worship" },
    { icon: "🎙️", title: "Podcasts", desc: "Listen & learn", link: "/podcast" },
    { icon: "📝", title: "Blog", desc: "Articles & insights", link: "/blog" },
    { icon: "🎥", title: "Videos", desc: "Watch & share", link: "/videos" },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <main>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/gallery1.jpg"
            alt="DLCSF Global"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blue-950/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-950/30" />
        </div>

        <div className={`relative z-10 text-center text-white px-6 max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur border border-yellow-400/30 px-6 py-2 rounded-full mb-6">
            <span className="text-yellow-400">🌍</span>
            <span className="text-sm font-medium">Global Christian Fellowship</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              DLCSF
            </span>
            <span className="block text-white">Global</span>
          </h1>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-blue-100">
            Standing together in faith across nations. Connecting students and believers worldwide.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/prayer"
              className="bg-yellow-400 text-blue-950 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg shadow-yellow-400/20"
            >
              Submit Prayer Request
            </Link>
            <Link
              href="/countries"
              className="bg-white/20 text-white px-8 py-4 rounded-full font-bold backdrop-blur hover:bg-white/30 transition border border-white/20"
            >
              Explore Countries
            </Link>
            <Link
              href="/students"
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Join Students →
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>10,000+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              <span>50+ Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              <span>180+ Campuses</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-blue-900">50+</div>
              <div className="text-gray-600 mt-1">Countries</div>
              <div className="text-xs text-gray-400 mt-2">🌍 Worldwide</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-blue-900">180+</div>
              <div className="text-gray-600 mt-1">Campuses</div>
              <div className="text-xs text-gray-400 mt-2">🏫 Universities</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-blue-900">10K+</div>
              <div className="text-gray-600 mt-1">Students</div>
              <div className="text-xs text-gray-400 mt-2">👥 Active Members</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-blue-900">2K+</div>
              <div className="text-gray-600 mt-1">Churches</div>
              <div className="text-xs text-gray-400 mt-2">⛪ Partnered</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUICK LINKS SECTION ===== */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Quick Access</span>
            <h2 className="text-4xl font-bold text-blue-950 mt-2">Connect With Us</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Explore the different ways you can connect, grow, and be part of the DLCSF Global community.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Link
              href="/register"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center hover:shadow-xl transition transform hover:-translate-y-1 border border-blue-200/50"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition">👥</div>
              <h3 className="text-lg font-bold text-blue-900">Join Us</h3>
              <p className="text-sm text-gray-600">Become part of the family</p>
              <span className="inline-block mt-3 text-blue-600 font-semibold text-sm group-hover:underline">Learn More →</span>
            </Link>

            <Link
              href="/events"
              className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center hover:shadow-xl transition transform hover:-translate-y-1 border border-green-200/50"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition">📅</div>
              <h3 className="text-lg font-bold text-green-900">Events</h3>
              <p className="text-sm text-gray-600">Conferences & retreats</p>
              <span className="inline-block mt-3 text-green-600 font-semibold text-sm group-hover:underline">View All →</span>
            </Link>

            <Link
              href="/about"
              className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center hover:shadow-xl transition transform hover:-translate-y-1 border border-purple-200/50"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition">🌍</div>
              <h3 className="text-lg font-bold text-purple-900">About DLCSF</h3>
              <p className="text-sm text-gray-600">Our vision & mission</p>
              <span className="inline-block mt-3 text-purple-600 font-semibold text-sm group-hover:underline">Learn More →</span>
            </Link>

            <Link
              href="/dashboard"
              className="group bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 text-center hover:shadow-xl transition transform hover:-translate-y-1 border border-orange-200/50"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition">📊</div>
              <h3 className="text-lg font-bold text-orange-900">Dashboard</h3>
              <p className="text-sm text-gray-600">Your profile & activity</p>
              <span className="inline-block mt-3 text-orange-600 font-semibold text-sm group-hover:underline">Go Now →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== MISSION SECTION ===== */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <span className="w-8 h-0.5 bg-yellow-400"></span>
                Our Mission
              </span>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Reaching Students.
                <br />
                <span className="text-yellow-400">Changing Lives.</span>
              </h2>
              <p className="text-blue-200 text-lg leading-relaxed">
                DLCSF Global exists to connect students and believers across nations
                through faith, prayer, discipleship, evangelism, and Christian fellowship.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="bg-yellow-400 text-blue-950 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg shadow-yellow-400/20"
                >
                  Learn More
                </Link>
                <Link
                  href="/students"
                  className="bg-white/20 text-white px-8 py-3 rounded-full font-bold hover:bg-white/30 transition backdrop-blur border border-white/20"
                >
                  Join Students
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/10 hover:bg-white/20 transition transform hover:-translate-y-1">
                <div className="text-5xl mb-3">✝️</div>
                <h4 className="font-bold text-xl">Evangelism</h4>
                <p className="text-sm text-blue-200 mt-1">Sharing the Gospel worldwide</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/10 hover:bg-white/20 transition transform hover:-translate-y-1">
                <div className="text-5xl mb-3">🙏</div>
                <h4 className="font-bold text-xl">Prayer</h4>
                <p className="text-sm text-blue-200 mt-1">Global intercession</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/10 hover:bg-white/20 transition transform hover:-translate-y-1">
                <div className="text-5xl mb-3">📖</div>
                <h4 className="font-bold text-xl">Discipleship</h4>
                <p className="text-sm text-blue-200 mt-1">Growing in faith together</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/10 hover:bg-white/20 transition transform hover:-translate-y-1">
                <div className="text-5xl mb-3">❤️</div>
                <h4 className="font-bold text-xl">Fellowship</h4>
                <p className="text-sm text-blue-200 mt-1">Community & connection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STUDENTS SECTION ===== */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Global Community</span>
            <h2 className="text-4xl font-bold text-blue-950 mt-2">Students Across The World</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3">
              Meet students from different countries who are part of the DLCSF Global community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center hover:shadow-xl transition transform hover:-translate-y-1 border border-blue-200/50">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold shadow-lg">
                AO
              </div>
              <h4 className="font-bold text-lg mt-4 text-gray-800">Albert Oduma</h4>
              <p className="text-sm text-gray-600">Nigeria • University of Calabar</p>
              <div className="flex justify-center gap-2 mt-3">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Computer Science</span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">3rd Year</span>
              </div>
              <div className="mt-3 flex justify-center text-yellow-400 text-sm">
                {[...Array(4)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
                <span className="text-gray-300">⭐</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center hover:shadow-xl transition transform hover:-translate-y-1 border border-green-200/50">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold shadow-lg">
                GM
              </div>
              <h4 className="font-bold text-lg mt-4 text-gray-800">Grace Mensah</h4>
              <p className="text-sm text-gray-600">Ghana • University of Ghana</p>
              <div className="flex justify-center gap-2 mt-3">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Business Admin</span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">2nd Year</span>
              </div>
              <div className="mt-3 flex justify-center text-yellow-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center hover:shadow-xl transition transform hover:-translate-y-1 border border-purple-200/50">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold shadow-lg">
                DK
              </div>
              <h4 className="font-bold text-lg mt-4 text-gray-800">Daniel Kiprop</h4>
              <p className="text-sm text-gray-600">Kenya • University of Nairobi</p>
              <div className="flex justify-center gap-2 mt-3">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Medicine</span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">4th Year</span>
              </div>
              <div className="mt-3 flex justify-center text-yellow-400 text-sm">
                {[...Array(4)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
                <span className="text-gray-300">⭐</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/students"
              className="inline-block bg-blue-900 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-800 transition transform hover:scale-105 shadow-lg"
            >
              View All Students →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== COUNTRIES SECTION ===== */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-600 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <span className="w-8 h-0.5 bg-blue-600"></span>
                Global Reach
              </span>
              <h2 className="text-4xl font-bold text-blue-950 mt-4 mb-6">
                Present in Over 50 Countries
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                From Africa to the Americas, Europe to Asia, DLCSF Global is building
                a community of believers across the world.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["🌍 Africa", "🌎 Americas", "🌏 Asia", "🌍 Europe", "🌏 Oceania"].map((region) => (
                  <span key={region} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {region}
                  </span>
                ))}
              </div>
              <Link
                href="/countries"
                className="inline-block bg-blue-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition shadow-lg"
              >
                Explore All Countries →
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { flag: "🇳🇬", name: "Nigeria", members: "25K" },
                { flag: "🇬🇭", name: "Ghana", members: "15K" },
                { flag: "🇰🇪", name: "Kenya", members: "12K" },
                { flag: "🇺🇸", name: "USA", members: "20K" },
                { flag: "🇬🇧", name: "UK", members: "10K" },
                { flag: "🇨🇦", name: "Canada", members: "6K" },
              ].map((country) => (
                <div key={country.name} className="bg-white rounded-xl p-4 text-center shadow hover:shadow-lg transition transform hover:-translate-y-1">
                  <span className="text-3xl block">{country.flag}</span>
                  <p className="text-sm font-bold mt-2 text-gray-800">{country.name}</p>
                  <p className="text-xs text-gray-500">{country.members} Members</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== EVENTS SECTION ===== */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Upcoming</span>
            <h2 className="text-4xl font-bold text-blue-950 mt-2">Events & Gatherings</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3">
              Join us for powerful conferences, retreats, and fellowship gatherings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => {
              const colorClasses = {
                blue: "from-blue-600 to-blue-800",
                green: "from-green-600 to-green-800",
                orange: "from-orange-600 to-orange-800",
                purple: "from-purple-600 to-purple-800",
              };
              return (
                <div key={event.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100">
                  <div className={`bg-gradient-to-r ${colorClasses[event.color as keyof typeof colorClasses]} text-white p-4`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{event.date}</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">{event.type}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                    <p className="text-gray-600 mt-2 flex items-center gap-2">
                      <span>📍</span> {event.location}
                    </p>
                    <Link
                      href="/events"
                      className="mt-4 inline-block bg-blue-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-800 transition text-sm"
                    >
                      Register Now →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/events"
              className="inline-block bg-blue-900 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-800 transition shadow-lg"
            >
              View All Events →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl font-bold text-blue-950 mt-2">What People Are Saying</h2>
            <p className="text-gray-600 mt-3">Hear from students whose lives have been transformed through DLCSF.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
            <div className="absolute -top-4 left-8 text-6xl text-yellow-400">"</div>
            <div className="relative z-10">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic">
                {testimonials[currentTestimonial].text}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-sm text-gray-500">{testimonials[currentTestimonial].role}</p>
                  <div className="flex text-yellow-400 text-sm mt-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
              >
                ←
              </button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition ${
                      currentTestimonial === index ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRAYER SECTION ===== */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">Prayer</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Join Us In Prayer
          </h2>
          <p className="text-blue-200 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Your prayer requests matter to us. Our global prayer team is standing
            with you in faith. "Call unto me, and I will answer thee." - Jeremiah 33:3
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/prayer"
              className="bg-yellow-400 text-blue-950 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg shadow-yellow-400/20"
            >
              Submit Prayer Request
            </Link>
            <Link
              href="/prayer"
              className="bg-white/20 text-white px-8 py-3 rounded-full font-bold backdrop-blur hover:bg-white/30 transition border border-white/20"
            >
              View Prayer Requests
            </Link>
          </div>
        </div>
      </section>

      {/* ===== RESOURCES SECTION ===== */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Resources</span>
            <h2 className="text-4xl font-bold text-blue-950 mt-2">Equipping You for Growth</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3">
              Access sermons, Bible studies, worship resources, and more to help you grow in your faith.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {resources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.link}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition transform hover:-translate-y-1 group border border-gray-100"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition">{resource.icon}</div>
                <h4 className="font-bold text-gray-800 text-sm">{resource.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{resource.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY SECTION ===== */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Gallery</span>
            <h2 className="text-4xl font-bold text-blue-950 mt-2">Moments of Faith</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3">
              Capturing inspiring moments from conferences, outreaches, and fellowship gatherings.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🙏", bg: "from-blue-500 to-blue-700", label: "Prayer Session" },
              { icon: "🎵", bg: "from-purple-500 to-purple-700", label: "Worship Night" },
              { icon: "📖", bg: "from-green-500 to-green-700", label: "Bible Study" },
              { icon: "🤝", bg: "from-red-500 to-red-700", label: "Fellowship" },
              { icon: "🌍", bg: "from-yellow-500 to-yellow-700", label: "Global Conference" },
              { icon: "👥", bg: "from-indigo-500 to-indigo-700", label: "Campus Outreach" },
              { icon: "✝️", bg: "from-pink-500 to-pink-700", label: "Evangelism" },
              { icon: "💒", bg: "from-teal-500 to-teal-700", label: "Church Service" },
            ].map((item) => (
              <div
                key={item.label}
                className={`bg-gradient-to-br ${item.bg} rounded-2xl h-48 flex flex-col items-center justify-center text-white hover:scale-105 transition shadow-lg cursor-pointer`}
              >
                <span className="text-5xl">{item.icon}</span>
                <p className="text-sm font-medium mt-2">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="inline-block bg-blue-900 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-800 transition shadow-lg"
            >
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER SECTION ===== */}
      <section className="py-20 bg-gradient-to-br from-blue-950 to-blue-800 text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">Stay Connected</span>
          <h2 className="text-4xl font-bold mt-4 mb-6">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-blue-200 text-lg leading-relaxed mb-8">
            Get the latest updates, prayer requests, and event announcements delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-3.5 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-400 text-blue-950 px-8 py-3.5 rounded-xl font-bold hover:bg-yellow-300 transition transform hover:scale-105 whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-blue-300 mt-3">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ===== PARTNERS SECTION ===== */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Partners</span>
            <h2 className="text-4xl font-bold text-blue-950 mt-2">Our Global Partners</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3">
              We partner with churches and organizations to reach students across the world.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Worldwide Missions", icon: "🌍" },
              { name: "Campus Crusade", icon: "🏫" },
              { name: "Youth for Christ", icon: "🙏" },
              { name: "Global Outreach", icon: "✝️" },
            ].map((partner) => (
              <div key={partner.name} className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition">
                <div className="text-4xl mb-2">{partner.icon}</div>
                <p className="font-semibold text-gray-800">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="text-4xl font-bold text-blue-950 mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "Who can join DLCSF?",
                a: "Any student or believer who wants to connect, grow, and share the Gospel."
              },
              {
                q: "How do I join a fellowship?",
                a: "Visit the Students page, fill in the registration form, and select a fellowship."
              },
              {
                q: "Is there a membership fee?",
                a: "No, DLCSF is free for all students and believers."
              },
              {
                q: "How can I submit a prayer request?",
                a: "Go to the Prayer page and fill in the prayer request form."
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
                <h4 className="font-bold text-lg text-blue-900">{faq.q}</h4>
                <p className="text-gray-600 mt-2">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CALL TO ACTION SECTION ===== */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join the DLCSF Global Community
          </h2>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            Together we are raising godly students and spreading the Gospel
            around the world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="inline-block bg-yellow-400 text-blue-950 px-10 py-4 rounded-xl font-bold hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg shadow-yellow-400/20"
            >
              Join Now
            </Link>
            <Link
              href="/dashboard"
              className="inline-block bg-white/20 text-white px-10 py-4 rounded-xl font-bold backdrop-blur hover:bg-white/30 transition border border-white/20"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-white/10 text-white px-10 py-4 rounded-xl font-bold backdrop-blur hover:bg-white/20 transition border border-white/10"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
            <span>✝️ Faith</span>
            <span>•</span>
            <span>🙏 Prayer</span>
            <span>•</span>
            <span>📖 Discipleship</span>
            <span>•</span>
            <span>❤️ Fellowship</span>
            <span>•</span>
            <span>🌍 Global</span>
          </div>
        </div>
      </section>

      {/* ===== FOOTER SECTION ===== */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">✝️</span>
                <h3 className="text-xl font-bold">DLCSF Global</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connecting students and believers across nations through faith, prayer, and fellowship.
              </p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"><Twitter size={18} /></a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"><Instagram size={18} /></a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"><Linkedin size={18} /></a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"><Youtube size={18} /></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/events" className="hover:text-white transition">Events</Link></li>
                <li><Link href="/prayer" className="hover:text-white transition">Prayer</Link></li>
                <li><Link href="/students" className="hover:text-white transition">Students</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/sermons" className="hover:text-white transition">Sermons</Link></li>
                <li><Link href="/bible-study" className="hover:text-white transition">Bible Study</Link></li>
                <li><Link href="/worship" className="hover:text-white transition">Worship</Link></li>
                <li><Link href="/podcast" className="hover:text-white transition">Podcasts</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition">Gallery</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Get Involved</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/register" className="hover:text-white transition">Join DLCSF</Link></li>
                <li><Link href="/students" className="hover:text-white transition">Student Registration</Link></li>
                <li><Link href="/prayer" className="hover:text-white transition">Prayer Requests</Link></li>
                <li><Link href="/donate" className="hover:text-white transition">Support Mission</Link></li>
                <li><Link href="/countries" className="hover:text-white transition">Global Reach</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 DLCSF Global. All Rights Reserved.</p>
            <p className="mt-1">Made with ❤️ for the Kingdom of God.</p>
            <div className="flex justify-center gap-4 mt-3 text-xs">
              <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}