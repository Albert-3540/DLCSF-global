import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Clock3,
  ArrowRight,
} from "lucide-react";

const events = [
  {
    title: "DLCSF Global Conference 2026",
    date: "August 15 - 20, 2026",
    location: "Lagos, Nigeria",
    time: "9:00 AM",
    image: "/images/event1.jpg",
    description:
      "A life-transforming gathering bringing together students, graduates, and leaders from around the world.",
  },
  {
    title: "International Prayer Summit",
    date: "September 12, 2026",
    location: "Online",
    time: "6:00 PM GMT",
    image: "/images/event2.jpg",
    description:
      "Join believers worldwide for a powerful night of worship, prayer, and revival.",
  },
  {
    title: "Campus Leadership Summit",
    date: "October 3 - 5, 2026",
    location: "Accra, Ghana",
    time: "10:00 AM",
    image: "/images/event3.jpg",
    description:
      "Equipping student leaders with biblical leadership principles for lasting kingdom impact.",
  },
];

export default function EventsSection() {
  return (
    <section className="bg-gradient-to-b from-blue-900 to-blue-950 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="bg-yellow-400 text-blue-950 px-5 py-2 rounded-full font-semibold">
            Upcoming Programs
          </span>

          <h2 className="text-5xl font-black text-white mt-8">
            Global Events
          </h2>

          <p className="text-gray-300 text-lg mt-6 max-w-3xl mx-auto leading-8">
            Participate in conferences, leadership summits,
            revival meetings, evangelism outreaches, and
            international prayer gatherings.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {events.map((event) => (

            <div
              key={event.title}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-3 transition duration-300"
            >

              <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-8">

                <h3 className="text-2xl font-bold text-white">
                  {event.title}
                </h3>

                <div className="space-y-3 mt-6">

                  <div className="flex items-center gap-3 text-gray-300">
                    <CalendarDays size={18} className="text-yellow-400" />
                    {event.date}
                  </div>

                  <div className="flex items-center gap-3 text-gray-300">
                    <Clock3 size={18} className="text-yellow-400" />
                    {event.time}
                  </div>

                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin size={18} className="text-yellow-400" />
                    {event.location}
                  </div>

                </div>

                <p className="text-gray-300 mt-6 leading-7">
                  {event.description}
                </p>

                <div className="mt-8 flex gap-4">

                  <Link
                    href="/events"
                    className="bg-yellow-400 text-blue-950 px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition"
                  >
                    Register
                  </Link>

                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 text-yellow-400 font-semibold hover:text-yellow-300"
                  >
                    Details
                    <ArrowRight size={18} />
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

        <div className="text-center mt-16">

          <Link
            href="/events"
            className="inline-flex items-center gap-3 bg-yellow-400 text-blue-950 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition"
          >
            View All Events
            <ArrowRight size={20} />
          </Link>

        </div>

      </div>

    </section>
  );
}