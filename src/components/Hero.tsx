"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Globe, 
  Users, 
  HeartHandshake,
  PlayCircle,
  CalendarDays,
  BookOpen,
  Music,
  Coffee,
  Sparkles
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-blue-910">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/Gallery1.jpg"
          alt="DLCSF Students"
          width={700}
          height={700}
          className="w-full h-[550px] object-cover"
        />
        <div className="absolute inset-0 bg-blue-950/80" />
      </div>

      {/* Top Navigation Bar - Removed search bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-4">
        <div className="flex items-center justify-between bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
          {/* Left - Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 rounded-full p-2">
              <Globe size={20} className="text-blue-950" />
            </div>
            <span className="text-white font-bold text-lg hidden sm:block">DLCSF Global</span>
          </div>

          {/* Center - Removed Search Bar */}

          {/* Right - Action Buttons */}
          <div className="flex items-center gap-2">
            {/* No buttons needed here since we have the header */}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-blue-950 px-5 py-2 rounded-full font-bold">
              <Globe size={18} />
              Global Christian Fellowship
            </div>

            <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              Connecting
              <span className="block text-yellow-400">Students & Believers</span>
              Across Nations 🌍
            </h1>

            <p className="mt-8 text-lg md:text-xl text-gray-200 leading-8 max-w-xl">
              DLCSF Global is a worldwide platform connecting students,
              graduates, and professionals through faith, prayer,
              discipleship, evangelism, and Christian fellowship.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-5 mt-10">
              <Link
                href="/register"
                className="bg-yellow-400 text-blue-950 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-yellow-300 transition transform hover:scale-105"
              >
                Join Fellowship
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/about"
                className="border border-white/40 px-8 py-4 rounded-full font-bold hover:bg-white/10 transition"
              >
                Explore More
              </Link>

              <button className="border border-yellow-400/50 px-6 py-4 rounded-full font-bold hover:bg-yellow-400/10 transition flex items-center gap-2">
                <Sparkles size={18} />
                Live Now
              </button>
            </div>

            {/* QUICK ACTIONS */}
            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              <Link
                href="/sermons"
                className="bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition group"
              >
                <PlayCircle className="text-yellow-400 group-hover:scale-110 transition" />
                <p className="font-bold mt-2">Sermons</p>
                <span className="text-sm text-gray-300">Watch messages</span>
              </Link>

              <Link
                href="/events"
                className="bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition group"
              >
                <CalendarDays className="text-yellow-400 group-hover:scale-110 transition" />
                <p className="font-bold mt-2">Events</p>
                <span className="text-sm text-gray-300">Join programs</span>
              </Link>

              <Link
                href="/prayer"
                className="bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition group"
              >
                <HeartHandshake className="text-yellow-400 group-hover:scale-110 transition" />
                <p className="font-bold mt-2">Prayer</p>
                <span className="text-sm text-gray-300">Send request</span>
              </Link>
            </div>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-3 gap-5 mt-10">
              <Feature icon={<Users />} title="Students" text="Campus believers" />
              <Feature icon={<HeartHandshake />} title="Prayer" text="Global intercession" />
              <Feature icon={<Globe />} title="180+ Nations" text="Worldwide impact" />
            </div>

            {/* Additional Quick Links */}
            <div className="flex flex-wrap gap-3 mt-6 text-sm">
              <Link href="/bible-study" className="flex items-center gap-1 text-gray-300 hover:text-yellow-400 transition">
                <BookOpen size={14} /> Bible Study
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/worship" className="flex items-center gap-1 text-gray-300 hover:text-yellow-400 transition">
                <Music size={14} /> Worship
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/community" className="flex items-center gap-1 text-gray-300 hover:text-yellow-400 transition">
                <Users size={14} /> Community
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/fellowship" className="flex items-center gap-1 text-gray-300 hover:text-yellow-400 transition">
                <Coffee size={14} /> Fellowship
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="rounded-[40px] overflow-hidden border border-white/20 shadow-2xl">
              <Image
                src="/images/Gallery1.jpg"
                alt="DLCSF Students"
                width={700}
                height={700}
                className="w-full h-auto"
              />
            </div>

            <div className="absolute -bottom-8 -left-8 bg-yellow-400 text-blue-950 rounded-3xl px-8 py-6 shadow-xl">
              <h2 className="text-5xl font-black">180+</h2>
              <p className="font-bold">Countries</p>
            </div>

            {/* Floating notification badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-950 rounded-full px-4 py-2 shadow-lg animate-bounce">
              <span className="font-bold text-sm">🔥 Live Now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition transform hover:scale-105 duration-300">
      <div className="text-yellow-400">{icon}</div>
      <h3 className="font-bold mt-4">{title}</h3>
      <p className="text-sm text-gray-300 mt-2">{text}</p>
    </div>
  );
}