"use client";

const categories = [
  "All",
  "Conference",
  "Prayer",
  "Worship",
  "Evangelism",
  "Fellowship",
];

type GalleryFilterProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function GalleryFilter({
  activeCategory,
  onCategoryChange,
}: GalleryFilterProps) {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`rounded-full px-5 py-2 font-medium transition ${
              activeCategory === category
                ? "bg-blue-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}