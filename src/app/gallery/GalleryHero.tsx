"use client";

import Link from "next/link";
import Image from "next/image";
import { Camera, ChevronRight } from "lucide-react";

export default function GalleryHero() {
  return (
    <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/gallery-hero.jpg"
        alt="DLCSF Global Gallery"
        fill
        priority
        loading="eager"
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-blue-950/70" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md mb-6">
          <Camera className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-medium">
            Moments from DLCSF Around the World
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Our Gallery
        </h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Explore inspiring moments from conferences, outreaches, campus
          fellowships, retreats, worship services, and ministry activities
          across the nations.
        </p>

        {/* Breadcrumb */}
        <div className="mt-8 flex justify-center items-center gap-2 text-sm text-gray-300">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>

          <ChevronRight className="w-4 h-4" />

          <span className="text-yellow-400 font-semibold">
            Gallery
          </span>
        </div>
      </div>
    </section>
  );
}