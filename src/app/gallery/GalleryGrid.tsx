"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "/images/Gallery1.jpg",
    title: "Campus Fellowship",
    category: "Fellowship",
  },
  {
    id: 2,
    src: "/images/Gallery2.jpg",
    title: "Prayer Conference",
    category: "Conference",
  },
  {
    id: 3,
    src: "/images/Gallery3.jpg",
    title: "Outreach Program",
    category: "Outreach",
  },
  {
    id: 4,
    src: "/images/Gallery4.jpg",
    title: "Worship Service",
    category: "Worship",
  },
  {
    id: 5,
    src: "/images/Gallery5.jpg",
    title: "Retreat Gathering",
    category: "Retreat",
  },
  {
    id: 6,
    src: "/images/Gallery6.jpg",
    title: "Global Mission",
    category: "Mission",
  },
];

export default function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (image: typeof galleryImages[0], index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(galleryImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(galleryImages[prevIndex]);
  };

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-950 mb-4">
            Gallery Moments
          </h2>
          <p className="text-gray-600 text-lg">
            Capturing God's faithfulness across nations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
              onClick={() => openModal(image, index)}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-lg">{image.title}</h3>
                  <p className="text-sm text-gray-300">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10"
            >
              <X size={40} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 text-white hover:text-gray-300 transition z-10 bg-black/50 p-3 rounded-full"
            >
              <ChevronLeft size={30} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 text-white hover:text-gray-300 transition z-10 bg-black/50 p-3 rounded-full"
            >
              <ChevronRight size={30} />
            </button>

            <div
              className="max-w-4xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[70vh] w-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  loading="eager"
                />
              </div>
              <div className="text-white text-center mt-4">
                <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}