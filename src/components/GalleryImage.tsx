"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
}

export default function GalleryImage({
  src,
  alt,
  fill = false,
  className = "",
  sizes = "100vw",
  priority = false,
  loading = "lazy",
}: GalleryImageProps) {
  const [error, setError] = useState(false);

  // If image fails to load, show placeholder
  if (error) {
    return (
      <div
        className={`bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-4xl ${className}`}
        style={fill ? { position: "absolute", inset: 0 } : {}}
      >
        📸
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      loading={loading}
      onError={() => setError(true)}
    />
  );
}