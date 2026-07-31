"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Search,
  MapPin,
  Users,
  Heart,
  Church,
  Flag,
  ArrowRight,
  Filter,
  ChevronDown,
} from "lucide-react";

const countries = [
  {
    id: 1,
    name: "Nigeria",
    code: "NG",
    capital: "Abuja",
    region: "Africa",
    members: 25000,
    churches: 450,
    prayerRequests: 1234,
    flag: "🇳🇬",
    description: "DLCSF has a strong presence across Nigeria with active campus fellowships in major universities.",
    campuses: ["University of Lagos", "University of Ibadan", "University of Calabar", "University of Nigeria, Nsukka"],
  },
  {
    id: 2,
    name: "Ghana",
    code: "GH",
    capital: "Accra",
    region: "Africa",
    members: 15000,
    churches: 280,
    prayerRequests: 567,
    flag: "🇬🇭",
    description: "Ghana has a vibrant DLCSF community with growing youth and student ministries.",
    campuses: ["University of Ghana", "Kwame Nkrumah University", "University of Cape Coast"],
  },
  {
    id: 3,
    name: "Kenya",
    code: "KE",
    capital: "Nairobi",
    region: "Africa",
    members: 12000,
    churches: 200,
    prayerRequests: 456,
    flag: "🇰🇪",
    description: "Kenya has a dynamic DLCSF movement with strong prayer and evangelism focus.",
    campuses: ["University of Nairobi", "Kenyatta University", "Moi University"],
  },
  {
    id: 4,
    name: "South Africa",
    code: "ZA",
    capital: "Pretoria",
    region: "Africa",
    members: 8000,
    churches: 150,
    prayerRequests: 345,
    flag: "🇿🇦",
    description: "DLCSF in South Africa is growing rapidly with a focus on reconciliation and unity.",
    campuses: ["University of Cape Town", "University of Johannesburg", "Stellenbosch University"],
  },
  {
    id: 5,
    name: "United States",
    code: "US",
    capital: "Washington D.C.",
    region: "North America",
    members: 20000,
    churches: 380,
    prayerRequests: 890,
    flag: "🇺🇸",
    description: "DLCSF has a growing presence across the United States with diverse campus ministries.",
    campuses: ["Harvard University", "Stanford University", "University of Texas", "New York University"],
  },
  {
    id: 6,
    name: "United Kingdom",
    code: "GB",
    capital: "London",
    region: "Europe",
    members: 10000,
    churches: 180,
    prayerRequests: 456,
    flag: "🇬🇧",
    description: "DLCSF in the UK serves students and professionals across major cities.",
    campuses: ["University of Oxford", "University of Cambridge", "University of London"],
  },
  {
    id: 7,
    name: "Canada",
    code: "CA",
    capital: "Ottawa",
    region: "North America",
    members: 6000,
    churches: 120,
    prayerRequests: 234,
    flag: "🇨🇦",
    description: "DLCSF Canada is building a strong community across Canadian universities.",
    campuses: ["University of Toronto", "University of British Columbia", "McGill University"],
  },
  {
    id: 8,
    name: "Australia",
    code: "AU",
    capital: "Canberra",
    region: "Oceania",
    members: 5000,
    churches: 90,
    prayerRequests: 189,
    flag: "🇦🇺",
    description: "DLCSF Australia is growing with a focus on youth and campus outreach.",
    campuses: ["University of Sydney", "University of Melbourne", "Australian National University"],
  },
  {
    id: 9,
    name: "Germany",
    code: "DE",
    capital: "Berlin",
    region: "Europe",
    members: 3000,
    churches: 60,
    prayerRequests: 123,
    flag: "🇩🇪",
    description: "DLCSF Germany is reaching international students and local believers.",
    campuses: ["Technical University of Berlin", "Ludwig Maximilian University", "Heidelberg University"],
  },
];

const regions = ["All", "Africa", "Europe", "North America", "South America", "Asia", "Oceania"];

export default function CountriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [sortBy, setSortBy] = useState("members");

  const filteredCountries = countries
    .filter((country) => {
      const matchesSearch =
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.capital.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion =
        selectedRegion === "All" || country.region === selectedRegion;

      return matchesSearch && matchesRegion;
    })
    .sort((a, b) => {
      if (sortBy === "members") return b.members - a.members;
      if (sortBy === "churches") return b.churches - a.churches;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Globe size={48} className="mx-auto text-yellow-400 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Countries We Reach</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            DLCSF Global is present in over 50 countries across the world, connecting believers and building communities.
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-white border-b py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-900">50+</p>
              <p className="text-sm text-gray-500">Countries</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-900">180+</p>
              <p className="text-sm text-gray-500">Campuses</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-900">1.2M</p>
              <p className="text-sm text-gray-500">Members Worldwide</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-900">2,500+</p>
              <p className="text-sm text-gray-500">Churches</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-6 px-6 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search countries, regions, or capitals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-4 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white"
                >
                  <option value="members">Sort: Members</option>
                  <option value="churches">Sort: Churches</option>
                  <option value="name">Sort: Name</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {filteredCountries.length} {filteredCountries.length === 1 ? "Country" : "Countries"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.map((country) => (
              <div
                key={country.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{country.flag}</span>
                      <div>
                        <h3 className="font-bold text-gray-800 group-hover:text-blue-700 transition">
                          {country.name}
                        </h3>
                        <p className="text-xs text-gray-500">{country.capital}</p>
                      </div>
                    </div>
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                      {country.region}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {country.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-50 rounded-xl">
                    <div className="text-center">
                      <Users size={16} className="mx-auto text-blue-600" />
                      <p className="text-sm font-bold text-gray-800">
                        {country.members.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Members</p>
                    </div>
                    <div className="text-center">
                      <Church size={16} className="mx-auto text-green-600" />
                      <p className="text-sm font-bold text-gray-800">{country.churches}</p>
                      <p className="text-xs text-gray-500">Churches</p>
                    </div>
                    <div className="text-center">
                      <Heart size={16} className="mx-auto text-red-500" />
                      <p className="text-sm font-bold text-gray-800">{country.prayerRequests}</p>
                      <p className="text-xs text-gray-500">Prayers</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Campuses</p>
                    <div className="flex flex-wrap gap-1">
                      {country.campuses.slice(0, 3).map((campus, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {campus}
                        </span>
                      ))}
                      {country.campuses.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                          +{country.campuses.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/countries/${country.code}`}
                    className="w-full bg-blue-900 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-800 transition flex items-center justify-center gap-2 text-sm"
                  >
                    View Details <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredCountries.length === 0 && (
            <div className="text-center py-16">
              <Globe size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-600">No countries found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-950 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Global Movement</h2>
          <p className="text-blue-200 mb-6">
            DLCSF is present in over 50 countries. Join a community of believers making a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="bg-yellow-400 text-blue-950 px-8 py-3 rounded-xl font-bold hover:bg-yellow-300 transition"
            >
              Join DLCSF
            </Link>
            <Link
              href="/prayer"
              className="bg-white/20 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/30 transition backdrop-blur border border-white/20"
            >
              Submit a Prayer Request
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}