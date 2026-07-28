"use client";

import { useState } from "react";
import SearchBar from "@/app/component/SearchBar";

const countries = [
  {
    name: "Nigeria",
    flag: "🇳🇬",
    members: "500+ Fellowships",
    region: "Africa",
  },
  {
    name: "United States",
    flag: "🇺🇸",
    members: "120+ Fellowships",
    region: "North America",
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    members: "80+ Fellowships",
    region: "Europe",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    members: "50+ Fellowships",
    region: "North America",
  },
  {
    name: "South Africa",
    flag: "🇿🇦",
    members: "70+ Fellowships",
    region: "Africa",
  },
  {
    name: "Ghana",
    flag: "🇬🇭",
    members: "60+ Fellowships",
    region: "Africa",
  },
];

export default function CountriesPage() {
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredCountries(countries);
      return;
    }

    const results = countries.filter(
      (country) =>
        country.name.toLowerCase().includes(query.toLowerCase()) ||
        country.region.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredCountries(results);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">

      {/* Hero */}
      <section className="py-24 px-6 text-center">

        <span className="inline-block bg-yellow-400 text-blue-950 px-4 py-2 rounded-full font-semibold mb-6">
          Global Fellowship
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400">
          DLCSF Around The World 🌍
        </h1>

        <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-200">
          Connecting students, graduates, and professionals across nations
          through one united fellowship in Christ.
        </p>

        <div className="mt-10 flex justify-center">
          <SearchBar
            placeholder="Search by country or region..."
            onSearch={handleSearch}
          />
        </div>

      </section>

      {/* Statistics */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20">
            <h3 className="text-5xl font-bold text-yellow-400">180+</h3>
            <p className="mt-3 text-gray-300">
              Countries (Vision)
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20">
            <h3 className="text-5xl font-bold text-yellow-400">800+</h3>
            <p className="mt-3 text-gray-300">
              Fellowships
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20">
            <h3 className="text-5xl font-bold text-yellow-400">Global</h3>
            <p className="mt-3 text-gray-300">
              Community
            </p>
          </div>

        </div>
      </section>

      {/* Countries */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <h2 className="text-4xl font-bold mb-10">
          Our Global Presence
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div
                key={country.name}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition duration-300"
              >
                <div className="text-6xl">
                  {country.flag}
                </div>

                <h3 className="text-2xl font-bold mt-5">
                  {country.name}
                </h3>

                <p className="text-yellow-300 mt-2">
                  {country.region}
                </p>

                <p className="mt-4 text-gray-300">
                  {country.members}
                </p>

                <button className="mt-6 w-full bg-yellow-400 text-blue-950 py-3 rounded-full font-bold hover:bg-yellow-300 transition">
                  View Fellowship
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <h3 className="text-3xl font-bold text-yellow-400">
                No countries found
              </h3>

              <p className="mt-4 text-gray-300">
                Try searching for another country or region.
              </p>
            </div>
          )}

        </div>

      </section>

      {/* Bottom CTA */}
      <section className="bg-black/20 py-24 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl md:text-5xl font-bold">
            One Fellowship. One Vision. One Global Family.
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            DLCSF Global is committed to building a Christ-centered community
            that reaches every campus, every nation, and every generation.
          </p>

          <button className="mt-10 bg-yellow-400 text-blue-950 px-10 py-4 rounded-full font-bold hover:bg-yellow-300 transition">
            Join the Global Fellowship
          </button>

        </div>

      </section>

    </main>
  );
}