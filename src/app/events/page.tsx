"use client";

import { useState } from "react";
import SearchBar from "@/app/component/SearchBar";

const events = [
  {
    title: "Global Conference",
    date: "Annual Worldwide Gathering",
    description:
      "A gathering of students and believers from different nations for worship, teaching, networking, and spiritual growth.",
  },
  {
    title: "Campus Revival",
    date: "Campus Programs",
    description:
      "Powerful revival meetings organized across campuses to ignite spiritual passion and soul-winning.",
  },
  {
    title: "Leadership Summit",
    date: "Leadership Training",
    description:
      "Equipping student and graduate leaders with biblical leadership principles for Kingdom impact.",
  },
];

export default function EventsPage() {
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredEvents(events);
      return;
    }

    const results = events.filter(
      (event) =>
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.date.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredEvents(results);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">

      {/* Hero */}
      <section className="py-24 px-6 text-center">

        <span className="inline-block bg-yellow-400 text-blue-950 px-4 py-2 rounded-full font-semibold mb-6">
          Upcoming Programs
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400">
          DLCSF Global Events
        </h1>

        <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-200">
          Stay informed about conferences, leadership summits,
          revival meetings, retreats, and global fellowship activities.
        </p>

        <div className="mt-10 flex justify-center">
          <SearchBar
            placeholder="Search events..."
            onSearch={handleSearch}
          />
        </div>

      </section>

      {/* Statistics */}
      <section className="max-w-7xl mx-auto px-6 mb-20">

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 text-center">
            <h2 className="text-5xl font-bold text-yellow-400">50+</h2>
            <p className="mt-3 text-gray-300">
              Annual Events
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 text-center">
            <h2 className="text-5xl font-bold text-yellow-400">180+</h2>
            <p className="mt-3 text-gray-300">
              Countries Connected
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 text-center">
            <h2 className="text-5xl font-bold text-yellow-400">Global</h2>
            <p className="mt-3 text-gray-300">
              Participation
            </p>
          </div>

        </div>

      </section>

      {/* Events */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <h2 className="text-4xl font-bold mb-10">
          Featured Events
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div
                key={event.title}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition duration-300"
              >

                <div className="text-5xl">📅</div>

                <h2 className="text-2xl font-bold mt-5">
                  {event.title}
                </h2>

                <p className="text-yellow-400 mt-3 font-semibold">
                  {event.date}
                </p>

                <p className="mt-5 text-gray-300 leading-7">
                  {event.description}
                </p>

                <button className="mt-8 w-full bg-yellow-400 text-blue-950 py-3 rounded-full font-bold hover:bg-yellow-300 transition">
                  Learn More
                </button>

              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">

              <h2 className="text-3xl font-bold text-yellow-400">
                No Events Found
              </h2>

              <p className="mt-4 text-gray-300">
                Try searching with a different keyword.
              </p>

            </div>
          )}

        </div>

      </section>

      {/* CTA */}
      <section className="bg-black/20 py-24 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl md:text-5xl font-bold">
            Be Part of Our Next Global Gathering
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            Join believers from around the world as we worship, learn,
            pray, and grow together in Christ through DLCSF Global events.
          </p>

          <button className="mt-10 bg-yellow-400 text-blue-950 px-10 py-4 rounded-full font-bold hover:bg-yellow-300 transition">
            View All Events
          </button>

        </div>

      </section>

    </main>
  );
}