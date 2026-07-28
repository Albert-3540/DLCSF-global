"use client";

import Link from "next/link";
import { ArrowRight, Globe, Users, HeartHandshake } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-28">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Side */}
          <div>

            <span className="inline-flex items-center gap-2 bg-yellow-400 text-blue-950 px-5 py-2 rounded-full font-semibold mb-8">
              <Globe size={18} />
              Connecting Believers Worldwide
            </span>

            <h1 className="text-6xl lg:text-7xl font-black leading-tight text-white">

              Welcome to

              <span className="block text-yellow-400 mt-3">
                DLCSF Global
              </span>

            </h1>

            <p className="mt-8 text-xl leading-9 text-gray-300 max-w-2xl">
              A global platform connecting students,
              graduates, professionals, and believers
              from over 180 countries through worship,
              discipleship, evangelism, prayer,
              leadership, and Christian fellowship.
            </p>

            <div className="flex flex-wrap gap-5 mt-12">

              <Link
                href="/register"
                className="bg-yellow-400 text-blue-950 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition flex items-center gap-2"
              >
                Join Now
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/about"
                className="border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition"
              >
                Learn More
              </Link>

            </div>

            {/* Features */}

            <div className="grid sm:grid-cols-3 gap-6 mt-16">

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5">

                <Users className="text-yellow-400" />

                <h3 className="mt-4 font-bold">
                  Fellowship
                </h3>

                <p className="text-sm text-gray-300 mt-2">
                  Students united in Christ.
                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5">

                <HeartHandshake className="text-yellow-400" />

                <h3 className="mt-4 font-bold">
                  Prayer
                </h3>

                <p className="text-sm text-gray-300 mt-2">
                  Standing together in faith.
                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5">

                <Globe className="text-yellow-400" />

                <h3 className="mt-4 font-bold">
                  Global
                </h3>

                <p className="text-sm text-gray-300 mt-2">
                  One family across nations.
                </p>

              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="relative">

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] p-10 shadow-2xl">

              <img
                src="/images/hero.jpg"
                alt="DLCSF Global"
                className="rounded-3xl w-full h-[500px] object-cover"
              />

            </div>

            {/* Floating Card */}

            <div className="absolute -bottom-10 -left-10 bg-yellow-400 text-blue-950 rounded-3xl px-8 py-6 shadow-2xl">

              <h2 className="text-4xl font-black">
                180+
              </h2>

              <p className="font-semibold">
                Countries to Reach
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}