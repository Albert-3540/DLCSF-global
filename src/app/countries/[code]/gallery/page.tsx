"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Sample gallery images for each country
const countryGalleryImages: Record<string, any[]> = {
  NG: [
    { id: 1, title: "Campus Fellowship", category: "Fellowship" },
    { id: 2, title: "Prayer Conference", category: "Conference" },
    { id: 3, title: "Outreach Program", category: "Outreach" },
    { id: 4, title: "Worship Service", category: "Worship" },
  ],
  GH: [
    { id: 1, title: "Ghana Campus Outreach", category: "Outreach" },
    { id: 2, title: "Youth Conference", category: "Conference" },
    { id: 3, title: "Worship Night", category: "Worship" },
  ],
  KE: [
    { id: 1, title: "Nairobi Fellowship", category: "Fellowship" },
    { id: 2, title: "Prayer Gathering", category: "Prayer" },
    { id: 3, title: "Mission Outreach", category: "Outreach" },
  ],
  ZA: [
    { id: 1, title: "Cape Town Conference", category: "Conference" },
    { id: 2, title: "Youth Camp", category: "Retreat" },
    { id: 3, title: "Worship Service", category: "Worship" },
  ],
  US: [
    { id: 1, title: "NYC Campus Fellowship", category: "Fellowship" },
    { id: 2, title: "Texas Conference", category: "Conference" },
    { id: 3, title: "California Outreach", category: "Outreach" },
    { id: 4, title: "Worship Night", category: "Worship" },
  ],
  GB: [
    { id: 1, title: "London Fellowship", category: "Fellowship" },
    { id: 2, title: "Oxford Conference", category: "Conference" },
    { id: 3, title: "Cambridge Outreach", category: "Outreach" },
  ],
  CA: [
    { id: 1, title: "Toronto Conference", category: "Conference" },
    { id: 2, title: "Vancouver Outreach", category: "Outreach" },
    { id: 3, title: "Montreal Fellowship", category: "Fellowship" },
  ],
  AU: [
    { id: 1, title: "Sydney Fellowship", category: "Fellowship" },
    { id: 2, title: "Melbourne Conference", category: "Conference" },
    { id: 3, title: "Perth Outreach", category: "Outreach" },
  ],
  DE: [
    { id: 1, title: "Berlin Fellowship", category: "Fellowship" },
    { id: 2, title: "Munich Conference", category: "Conference" },
    { id: 3, title: "Hamburg Outreach", category: "Outreach" },
  ],
};

const countryNames: Record<string, string> = {
  NG: "Nigeria",
  GH: "Ghana",
  KE: "Kenya",
  ZA: "South Africa",
  US: "United States",
  GB: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
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

export default function CountryGalleryPage() {
  const params = useParams();
  const [countryCode, setCountryCode] = useState<string>("");
  const [images, setImages] = useState<any[]>([]);
  const [countryName, setCountryName] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const code = params.code as string;
    setCountryCode(code);
    setImages(countryGalleryImages[code] || []);
    setCountryName(countryNames[code] || code);
  }, [params.code]);

  const openModal = (image: any, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  if (images.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href={`/countries/${countryCode}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition mb-8"
          >
            <ArrowLeft size={20} />
            Back to {countryName}
          </Link>
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <Camera size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-600">No Gallery Images</h2>
            <p className="text-gray-400 mt-2">
              Gallery images for {countryName} are coming soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Link
          href={`/countries/${countryCode}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition mb-8"
        >
          <ArrowLeft size={20} />
          Back to {countryName}
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {countryName} Gallery
          </h1>
          <p className="text-gray-500">
            Capturing moments from DLCSF activities in {countryName}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition h-64"
              onClick={() => openModal(image, index)}
            >
              <div className={`w-full h-full bg-gradient-to-br ${colors[image.id % colors.length]} flex items-center justify-center text-white p-4`}>
                <div className="text-center">
                  <span className="text-5xl mb-3 block">📸</span>
                  <p className="font-bold text-xl">{image.title}</p>
                  <p className="text-sm opacity-75">{image.category}</p>
                </div>
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
                <div className="w-full h-full flex items-center justify-center text-white p-8 bg-gradient-to-br from-blue-900 to-blue-600">
                  <div className="text-center">
                    <span className="text-6xl mb-4 block">📸</span>
                    <h3 className="text-3xl font-bold">{selectedImage.title}</h3>
                    <p className="text-xl text-gray-300">{selectedImage.category}</p>
                    <p className="text-sm text-gray-400 mt-4">{countryName}</p>
                  </div>
                </div>
              </div>
              <div className="text-white text-center mt-4">
                <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}