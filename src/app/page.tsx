"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            DLCSF Global
          </h1>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Standing together in faith across nations.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/prayer"
              className="bg-yellow-400 text-blue-950 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition"
            >
              Submit Prayer Request
            </Link>

            <Link
              href="/countries"
              className="bg-white/20 text-white px-8 py-3 rounded-full font-bold backdrop-blur hover:bg-white/30 transition"
            >
              Explore Countries
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-900">50+</p>
              <p className="text-gray-600">Countries</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-900">180+</p>
              <p className="text-gray-600">Campuses</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-900">10K+</p>
              <p className="text-gray-600">Students</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-900">2K+</p>
              <p className="text-gray-600">Churches</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-950 mb-12">
            Connect With Us
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <Link
              href="/register"
              className="rounded-2xl bg-gray-50 p-8 shadow hover:shadow-lg transition group hover:bg-blue-50"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">👥</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">
                Join Us
              </h3>
              <p className="text-gray-600">
                Become part of the DLCSF Global family.
              </p>
            </Link>

            <Link
              href="/events"
              className="rounded-2xl bg-gray-50 p-8 shadow hover:shadow-lg transition group hover:bg-green-50"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">📅</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">
                Events
              </h3>
              <p className="text-gray-600">
                See conferences, retreats and fellowships.
              </p>
            </Link>

            <Link
              href="/about"
              className="rounded-2xl bg-gray-50 p-8 shadow hover:shadow-lg transition group hover:bg-purple-50"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">🌍</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">
                About DLCSF
              </h3>
              <p className="text-gray-600">
                Learn our vision, mission and global impact.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
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

      {/* Students Section */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-950 mb-4">
              Students Across The World
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet students from different countries who are part of the DLCSF Global community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-blue-900">
                AO
              </div>
              <h4 className="font-bold text-lg mt-4">Albert Oduma</h4>
              <p className="text-sm text-gray-500">Nigeria • University of Calabar</p>
              <div className="flex justify-center gap-2 mt-3">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Computer Science</span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">3rd Year</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-green-900">
                GM
              </div>
              <h4 className="font-bold text-lg mt-4">Grace Mensah</h4>
              <p className="text-sm text-gray-500">Ghana • University of Ghana</p>
              <div className="flex justify-center gap-2 mt-3">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Business Admin</span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">2nd Year</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-purple-900">
                DK
              </div>
              <h4 className="font-bold text-lg mt-4">Daniel Kiprop</h4>
              <p className="text-sm text-gray-500">Kenya • University of Nairobi</p>
              <div className="flex justify-center gap-2 mt-3">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Medicine</span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">4th Year</span>
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

      {/* Countries Section */}
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
              <Link
                href="/countries"
                className="inline-block bg-blue-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition"
              >
                Explore Countries →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-4 text-center shadow">
                <span className="text-3xl block">🇳🇬</span>
                <p className="text-sm font-bold mt-2">Nigeria</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow">
                <span className="text-3xl block">🇬🇭</span>
                <p className="text-sm font-bold mt-2">Ghana</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow">
                <span className="text-3xl block">🇰🇪</span>
                <p className="text-sm font-bold mt-2">Kenya</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow">
                <span className="text-3xl block">🇺🇸</span>
                <p className="text-sm font-bold mt-2">USA</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow">
                <span className="text-3xl block">🇬🇧</span>
                <p className="text-sm font-bold mt-2">UK</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow">
                <span className="text-3xl block">🇨🇦</span>
                <p className="text-sm font-bold mt-2">Canada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Section */}
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
              className="bg-yellow-400 text-blue-950 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition"
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

      {/* Call To Action */}
      <section className="bg-blue-950 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Join the DLCSF Global Community
          </h2>

          <p className="text-blue-200 mb-8">
            Together we are raising godly students and spreading the Gospel
            around the world.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="inline-block bg-yellow-400 text-blue-950 px-10 py-4 rounded-xl font-bold hover:bg-yellow-300 transition"
            >
              Join Now
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-white/20 text-white px-10 py-4 rounded-xl font-bold backdrop-blur hover:bg-white/30 transition border border-white/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}