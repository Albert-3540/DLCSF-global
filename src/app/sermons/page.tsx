"use client";

import { useState } from "react";
import SearchBar from "@/app/component/SearchBar";

const sermons = [
  "Faith And Spiritual Growth",
  "Living A Purposeful Life",
  "Campus Evangelism",
];

export default function SermonsPage() {
  const [filteredSermons, setFilteredSermons] = useState(sermons);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredSermons(sermons);
      return;
    }

    const results = sermons.filter((sermon) =>
      sermon.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredSermons(results);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">
      <section className="py-24 px-6 text-center">
        <h1 className="text-5xl font-bold text-yellow-400">
          Sermons & Teachings
        </h1>

        <p className="mt-6 text-gray-200">
          Powerful messages and teachings from DLCSF ministers.
        </p>

        <div className="mt-10 flex justify-center">
          <SearchBar
            placeholder="Search sermons..."
            onSearch={handleSearch}
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 pb-24">
        {filteredSermons.length > 0 ? (
          filteredSermons.map((sermon) => (
            <div
              key={sermon}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8"
            >
              <div className="text-5xl">🎤</div>

              <h2 className="text-2xl font-bold mt-5">{sermon}</h2>

              <p className="mt-4 text-gray-200">
                Watch or listen to this inspiring message.
              </p>

              <button className="mt-6 bg-yellow-400 text-blue-950 px-6 py-3 rounded-full hover:bg-yellow-300 transition">
                Watch Now
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-xl text-gray-300">
            No sermons found.
          </div>
        )}
      </section>
    </main>
  );
}