"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Gallery images data - using placeholder images that will work
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
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

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

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  // Colors for placeholders
  const colors = [
    "from-blue-500 to-blue-700",
    "from-purple-500 to-purple-700",
    "from-green-500 to-green-700",
    "from-red-500 to-red-700",
    "from-yellow-500 to-yellow-700",
    "from-indigo-500 to-indigo-700",
  ];

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
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition h-72"
              onClick={() => openModal(image, index)}
            >
              {!imageErrors[image.id] ? (
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={() => handleImageError(image.id)}
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${colors[image.id % colors.length]} flex items-center justify-center text-white p-4`}>
                  <div className="text-center">
                    <span className="text-6xl mb-3 block">📸</span>
                    <p className="font-bold text-xl">{image.title}</p>
                    <p className="text-sm opacity-75">{image.category}</p>
                  </div>
                </div>
              )}
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
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10 bg-black/50 p-2 rounded-full"
            >
              <X size={32} />
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
              <div className="relative h-[70vh] w-full bg-gray-900 rounded-lg overflow-hidden">
                {!imageErrors[selectedImage.id] ? (
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    fill
                    className="object-contain"
                    loading="eager"
                    sizes="100vw"
                    onError={() => handleImageError(selectedImage.id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white p-8 bg-gradient-to-br from-blue-900 to-blue-600">
                    <div className="text-center">
                      <span className="text-6xl mb-4 block">📸</span>
                      <h3 className="text-3xl font-bold">{selectedImage.title}</h3>
                      <p className="text-xl text-gray-300">{selectedImage.category}</p>
                    </div>
                  </div>
                )}
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