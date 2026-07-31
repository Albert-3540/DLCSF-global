"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const [email, setEmail] = useState("");

  return (
    <main>
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/gallery1.jpg"
            alt="DLCSF Global"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blue-950/60" />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <div className="inline-block bg-yellow-400 text-blue-950 px-6 py-2 rounded-full font-bold text-sm mb-6">
            🌍 Global Christian Fellowship
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            DLCSF Global
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Standing together in faith across nations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/prayer"
              className="bg-yellow-400 text-blue-950 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition transform hover:scale-105"
            >
              Submit Prayer Request
            </Link>
            <Link
              href="/countries"
              className="bg-white/20 text-white px-8 py-3 rounded-full font-bold backdrop-blur hover:bg-white/30 transition"
            >
              Explore Countries
            </Link>
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg transform hover:scale-105"
            >
              Go to Dashboard →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-16 bg-blue-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-white rounded-2xl shadow">
              <p className="text-4xl font-bold text-blue-900">50+</p>
              <p className="text-gray-600">Countries</p>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow">
              <p className="text-4xl font-bold text-blue-900">180+</p>
              <p className="text-gray-600">Campuses</p>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow">
              <p className="text-4xl font-bold text-blue-900">10K+</p>
              <p className="text-gray-600">Students</p>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow">
              <p className="text-4xl font-bold text-blue-900">2K+</p>
              <p className="text-gray-600">Churches</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUICK LINKS SECTION ===== */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-950 mb-4">
            Connect With Us
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore the different ways you can connect, grow, and be part of the DLCSF Global community.
          </p>

          <div className="grid gap-8 md:grid-cols-4">
            <Link
              href="/register"
              className="rounded-2xl bg-gray-50 p-8 shadow hover:shadow-lg transition group hover:bg-blue-50"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">👥</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Join Us</h3>
              <p className="text-gray-600">Become part of the DLCSF Global family.</p>
            </Link>

            <Link
              href="/events"
              className="rounded-2xl bg-gray-50 p-8 shadow hover:shadow-lg transition group hover:bg-green-50"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">📅</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Events</h3>
              <p className="text-gray-600">See conferences, retreats and fellowships.</p>
            </Link>

            <Link
              href="/about"
              className="rounded-2xl bg-gray-50 p-8 shadow hover:shadow-lg transition group hover:bg-purple-50"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">🌍</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">About DLCSF</h3>
              <p className="text-gray-600">Learn our vision, mission and global impact.</p>
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 shadow hover:shadow-lg transition group text-white"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">📊</div>
              <h3 className="text-2xl font-bold mb-2">Dashboard</h3>
              <p className="text-blue-100">View your profile and activity.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== MISSION SECTION ===== */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">
                Our Mission
              </span>
              <h2 className="text-4xl font-bold mt-4 mb-6">
                Reaching Students. Changing Lives.
              </h2>
              <p className="text-blue-200 text-lg leading-relaxed mb-6">
                DLCSF Global exists to connect students and believers across nations
                through faith, prayer, discipleship, evangelism, and Christian fellowship.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="bg-yellow-400 text-blue-950 px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition"
                >
                  Learn More
                </Link>
                <Link
                  href="/dashboard"
                  className="bg-white/20 text-white px-6 py-3 rounded-full font-bold hover:bg-white/30 transition backdrop-blur border border-white/20"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/10">
                <span className="text-4xl block mb-2">✝️</span>
                <h4 className="font-bold">Evangelism</h4>
                <p className="text-sm text-blue-200">Sharing the Gospel</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/10">
                <span className="text-4xl block mb-2">🙏</span>
                <h4 className="font-bold">Prayer</h4>
                <p className="text-sm text-blue-200">Global Intercession</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/10">
                <span className="text-4xl block mb-2">📖</span>
                <h4 className="font-bold">Discipleship</h4>
                <p className="text-sm text-blue-200">Growing in Faith</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/10">
                <span className="text-4xl block mb-2">❤️</span>
                <h4 className="font-bold">Fellowship</h4>
                <p className="text-sm text-blue-200">Community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STUDENTS SECTION ===== */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
              Global Community
            </span>
            <h2 className="text-4xl font-bold text-blue-950 mt-2 mb-4">
              Students Across The World
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet students from different countries who are part of the DLCSF Global community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition hover:-translate-y-1">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-blue-900">
                AO
              </div>
              <h4 className="font-bold text-lg mt-4">Albert Oduma</h4>
              <p className="text-sm text-gray-500">Nigeria • University of Calabar</p>
              <div className="flex justify-center gap-2 mt-3">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Computer Science</span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">3rd Year</span>
              </div>
              <div className="mt-3 flex justify-center gap-1">
                <span className="text-yellow-400">⭐</span>
                <span className="text-yellow-400">⭐</span>
                <span className="text-yellow-400">⭐</span>
                <span className="text-yellow-400">⭐</span>
                <span className="text-gray-300">⭐</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition hover:-translate-y-1">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-green-900">
                GM
              </div>
              <h4 className="font-bold text-lg mt-4">Grace Mensah</h4>
              <p className="text-sm text-gray-500">Ghana • University of Ghana</p>
              <div className="flex justify-center gap-2 mt-3">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Business Admin</span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">2nd Year</span>
              </div>
              <div className="mt-3 flex justify-center gap-1">
                <span className="text-yellow-400">⭐</span>
                <span className="text-yellow-400">⭐</span>
                <span className="text-yellow-400">⭐</span>
                <span className="text-yellow-400">⭐</span>
                <span className="text-yellow-400">⭐</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition hover:-translate-y-1">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-purple-900">
                DK
              </div>
              <h4 className="font-bold text-lg mt-4">Daniel Kiprop</h4>
              <p className="text-sm text-gray-500">Kenya • University of Nairobi</p>
              <div className="flex justify-center gap-2 mt-3">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Medicine</span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">4th Year</span>
              </div>
              <div className="mt-3 flex justify-center gap-1">
                <span className="text-yellow-400">⭐</span>
                <span className="text-yellow-400">⭐</span>
                <span className="text-yellow-400">⭐</span>
                <span className="text-yellow-400">⭐</span>
                <span className="text-gray-300">⭐</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/students"
              className="inline-block bg-blue-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition"
            >
              View All Students →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== COUNTRIES SECTION ===== */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                Global Reach
              </span>
              <h2 className="text-4xl font-bold text-blue-950 mt-4 mb-6">
                Present in Over 50 Countries
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                From Africa to the Americas, Europe to Asia, DLCSF Global is building
                a community of believers across the world.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">🌍 Africa</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">🌎 Americas</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">🌏 Asia</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">🌍 Europe</span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">🌏 Oceania</span>
              </div>
              <Link
                href="/countries"
                className="inline-block bg-blue-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition"
              >
                Explore All Countries →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-4 text-center shadow hover:shadow-lg transition hover:-translate-y-1">
                <span className="text-3xl block">🇳🇬</span>
                <p className="text-sm font-bold mt-2">Nigeria</p>
                <p className="text-xs text-gray-500">25K Members</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow hover:shadow-lg transition hover:-translate-y-1">
                <span className="text-3xl block">🇬🇭</span>
                <p className="text-sm font-bold mt-2">Ghana</p>
                <p className="text-xs text-gray-500">15K Members</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow hover:shadow-lg transition hover:-translate-y-1">
                <span className="text-3xl block">🇰🇪</span>
                <p className="text-sm font-bold mt-2">Kenya</p>
                <p className="text-xs text-gray-500">12K Members</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow hover:shadow-lg transition hover:-translate-y-1">
                <span className="text-3xl block">🇺🇸</span>
                <p className="text-sm font-bold mt-2">USA</p>
                <p className="text-xs text-gray-500">20K Members</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow hover:shadow-lg transition hover:-translate-y-1">
                <span className="text-3xl block">🇬🇧</span>
                <p className="text-sm font-bold mt-2">UK</p>
                <p className="text-xs text-gray-500">10K Members</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow hover:shadow-lg transition hover:-translate-y-1">
                <span className="text-3xl block">🇨🇦</span>
                <p className="text-sm font-bold mt-2">Canada</p>
                <p className="text-xs text-gray-500">6K Members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRAYER SECTION ===== */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">
            Prayer
          </span>
          <h2 className="text-4xl font-bold mt-4 mb-6">
            Join Us In Prayer
          </h2>
          <p className="text-blue-200 text-lg leading-relaxed mb-8">
            Your prayer requests matter to us. Our global prayer team is standing
            with you in faith.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/prayer"
              className="bg-yellow-400 text-blue-950 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition transform hover:scale-105"
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

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold text-blue-950 mt-2 mb-4">
              What People Are Saying
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from students and believers whose lives have been transformed through DLCSF.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
              <div className="flex text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 italic leading-relaxed">
                "DLCSF has connected me with believers from across the world. My faith has grown tremendously."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-900">
                  AO
                </div>
                <div>
                  <p className="font-bold text-sm">Albert Oduma</p>
                  <p className="text-xs text-gray-500">Nigeria</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
              <div className="flex text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 italic leading-relaxed">
                "Being part of DLCSF has given me a global family of believers who pray and support each other."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-900">
                  GM
                </div>
                <div>
                  <p className="font-bold text-sm">Grace Mensah</p>
                  <p className="text-xs text-gray-500">Ghana</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
              <div className="flex text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 italic leading-relaxed">
                "The prayer support and community at DLCSF has been a blessing in my journey as a student."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-900">
                  DK
                </div>
                <div>
                  <p className="font-bold text-sm">Daniel Kiprop</p>
                  <p className="text-xs text-gray-500">Kenya</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EVENTS SECTION ===== */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
              Upcoming Events
            </span>
            <h2 className="text-4xl font-bold text-blue-950 mt-2 mb-4">
              Join Us at Our Events
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Be part of powerful gatherings, conferences, and fellowships happening around the world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-4">
                <p className="text-sm font-medium">📅 December 15-17, 2026</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">Global Prayer Conference 2026</h3>
                <p className="text-gray-600 mt-2">Virtual & In-Person</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span>🕐 9:00 AM - 5:00 PM</span>
                  <span>📍 Global</span>
                </div>
                <Link
                  href="/events"
                  className="mt-4 inline-block bg-blue-900 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-800 transition text-sm"
                >
                  Register Now →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="bg-gradient-to-r from-green-700 to-emerald-700 text-white p-4">
                <p className="text-sm font-medium">📅 January 10-20, 2027</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">Global Mission Outreach</h3>
                <p className="text-gray-600 mt-2">Multiple Locations</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span>🕐 8:00 AM - 6:00 PM</span>
                  <span>📍 Worldwide</span>
                </div>
                <Link
                  href="/events"
                  className="mt-4 inline-block bg-blue-900 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-800 transition text-sm"
                >
                  Register Now →
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/events"
              className="inline-block bg-blue-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition"
            >
              View All Events →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER SECTION ===== */}
      <section className="py-20 bg-gradient-to-br from-blue-950 to-blue-800 text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">
            Stay Connected
          </span>
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
              className="flex-1 px-6 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-400 text-blue-950 px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-blue-300 mt-3">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ===== RESOURCES SECTION ===== */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-950 mb-4">
              Resources for You
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Access sermons, Bible studies, worship resources, and more to help you grow in your faith.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Link
              href="/sermons"
              className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition hover:bg-blue-50"
            >
              <div className="text-4xl mb-3">📖</div>
              <h4 className="font-bold text-gray-800">Sermons</h4>
              <p className="text-sm text-gray-500 mt-1">Watch messages</p>
            </Link>
            <Link
              href="/bible-study"
              className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition hover:bg-green-50"
            >
              <div className="text-4xl mb-3">📚</div>
              <h4 className="font-bold text-gray-800">Bible Study</h4>
              <p className="text-sm text-gray-500 mt-1">Study guides</p>
            </Link>
            <Link
              href="/worship"
              className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition hover:bg-purple-50"
            >
              <div className="text-4xl mb-3">🎵</div>
              <h4 className="font-bold text-gray-800">Worship</h4>
              <p className="text-sm text-gray-500 mt-1">Music & praise</p>
            </Link>
            <Link
              href="/podcast"
              className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition hover:bg-yellow-50"
            >
              <div className="text-4xl mb-3">🎙️</div>
              <h4 className="font-bold text-gray-800">Podcasts</h4>
              <p className="text-sm text-gray-500 mt-1">Listen & learn</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== GALLERY SECTION ===== */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
              Gallery
            </span>
            <h2 className="text-4xl font-bold text-blue-950 mt-2 mb-4">
              Moments of Faith
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Capturing inspiring moments from conferences, outreaches, and fellowship gatherings.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl h-48 flex items-center justify-center text-white text-6xl hover:scale-105 transition shadow-lg">
              🙏
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl h-48 flex items-center justify-center text-white text-6xl hover:scale-105 transition shadow-lg">
              🎵
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl h-48 flex items-center justify-center text-white text-6xl hover:scale-105 transition shadow-lg">
              📖
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl h-48 flex items-center justify-center text-white text-6xl hover:scale-105 transition shadow-lg">
              🤝
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="inline-block bg-blue-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition"
            >
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CALL TO ACTION SECTION ===== */}
      <section className="bg-blue-950 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Join the DLCSF Global Community
          </h2>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            Together we are raising godly students and spreading the Gospel
            around the world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="inline-block bg-yellow-400 text-blue-950 px-10 py-4 rounded-xl font-bold hover:bg-yellow-300 transition transform hover:scale-105"
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
        </div>
      </section>

      {/* ===== FOOTER SECTION ===== */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DLCSF Global</h3>
              <p className="text-gray-400 text-sm">Connecting students and believers across nations.</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/events" className="hover:text-white transition">Events</Link></li>
                <li><Link href="/prayer" className="hover:text-white transition">Prayer</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/sermons" className="hover:text-white transition">Sermons</Link></li>
                <li><Link href="/bible-study" className="hover:text-white transition">Bible Study</Link></li>
                <li><Link href="/worship" className="hover:text-white transition">Worship</Link></li>
                <li><Link href="/students" className="hover:text-white transition">Students</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 DLCSF Global. All Rights Reserved.</p>
            <p className="mt-1">Made with ❤️ for the Kingdom of God.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}