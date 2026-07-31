"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Phone } from "lucide-react";

export default function GalleryCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 py-24">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-300 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center text-white">
        <span className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-blue-950">
          DLCSF Global
        </span>

        <h2 className="mt-8 text-4xl font-extrabold leading-tight md:text-5xl">
          Every Picture Tells a Story.
          <br />
          Become Part of the Next One.
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100">
          Join thousands of students and corps members around the world in
          worship, evangelism, conferences, discipleship, and life-changing
          fellowship through DLCSF Global.
        </p>

        <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">
          <Link
            href="/events"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-blue-950 transition hover:scale-105 hover:bg-yellow-300"
          >
            <CalendarDays size={20} />
            View Upcoming Events
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:scale-105 hover:bg-white hover:text-blue-950"
          >
            <Phone size={20} />
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}