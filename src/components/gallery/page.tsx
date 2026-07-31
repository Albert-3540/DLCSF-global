"use client";

import { useState } from "react";

import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryFilter from "@/components/gallery/GalleryFilter";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryStats from "@/components/gallery/GalleryStats";
import GalleryCTA from "@/components/gallery/GalleryCTA";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <main className="min-h-screen">
      <GalleryHero />

      <GalleryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <GalleryGrid activeCategory={activeCategory} />

      <GalleryStats />

      <GalleryCTA />
    </main>
  );
}