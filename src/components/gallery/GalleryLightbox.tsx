"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryImage = {
  id: number;
  src: string;
  title: string;
  category: string;
  date: string;
};

type GalleryLightboxProps = {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export default function GalleryLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: GalleryLightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          onNext();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!isOpen) return null;

  const image = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 rounded-full bg-white p-3 text-gray-900 shadow-lg transition hover:scale-110"
      >
        <X size={24} />
      </button>

      {/* Previous */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
        className="absolute left-4 md:left-8 rounded-full bg-white p-3 text-gray-900 shadow-lg transition hover:scale-110"
      >
        <ChevronLeft size={30} />
      </button>

      {/* Image Container */}
      <div
        className="w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black">
          <Image
            src={image.src}
            alt={image.title}
            fill
            priority
            className="object-contain"
          />
        </div>

        <div className="mt-6 text-center text-white">
          <span className="inline-block rounded-full bg-blue-700 px-4 py-1 text-sm font-medium">
            {image.category}
          </span>

          <h2 className="mt-4 text-3xl font-bold">
            {image.title}
          </h2>

          <p className="mt-2 text-gray-300">
            {image.date}
          </p>

          <p className="mt-6 text-sm text-gray-400">
            Use ← → arrow keys to navigate • Press Esc to close
          </p>
        </div>
      </div>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 md:right-8 rounded-full bg-white p-3 text-gray-900 shadow-lg transition hover:scale-110"
      >
        <ChevronRight size={30} />
      </button>
    </div>
  );
}