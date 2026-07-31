import Link from "next/link";
import { PlayCircle, ArrowRight, Calendar, User } from "lucide-react";

const sermons = [
  {
    title: "Walking by Faith",
    preacher: "DLCSF Global",
    date: "July 2026",
    image: "/images/Gallery1.jpg",
    description:
      "Discover how unwavering faith produces victory in every season of life.",
  },
  {
    title: "Living a Holy Life",
    preacher: "DLCSF Global",
    date: "June 2026",
    image: "/images/Gallery2.jpg",
    description:
      "Learn practical biblical principles for living a life that glorifies Christ.",
  },
  {
    title: "The Great Commission",
    preacher: "DLCSF Global",
    date: "May 2026",
    image: "/images/Gallery3.jpg",
    description:
      "Be inspired to share the Gospel and impact your generation for Christ.",
  },
];

export default function SermonsSection() {
  return (
    <section className="bg-blue-950 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="bg-yellow-400 text-blue-950 px-5 py-2 rounded-full font-semibold">
            Latest Messages
          </span>

          <h2 className="text-5xl font-black text-white mt-8">
            Featured Sermons
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto mt-6 leading-8">
            Strengthen your faith through inspiring sermons,
            biblical teachings, and life-transforming messages
            from DLCSF ministers.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {sermons.map((sermon) => (

            <div
              key={sermon.title}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-3 transition duration-300"
            >

              <div className="relative">

                <img
                  src={sermon.image}
                  alt={sermon.title}
                  className="w-full h-64 object-cover"
                />

                <button className="absolute inset-0 flex items-center justify-center">

                  <div className="bg-yellow-400 rounded-full p-4 hover:scale-110 transition">

                    <PlayCircle
                      size={42}
                      className="text-blue-950"
                    />

                  </div>

                </button>

              </div>

              <div className="p-8">

                <div className="flex items-center gap-6 text-sm text-gray-300">

                  <div className="flex items-center gap-2">
                    <User size={16} />
                    {sermon.preacher}
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {sermon.date}
                  </div>

                </div>

                <h3 className="text-2xl font-bold text-white mt-5">
                  {sermon.title}
                </h3>

                <p className="text-gray-300 mt-5 leading-7">
                  {sermon.description}
                </p>

                <Link
                  href="/sermons"
                  className="inline-flex items-center gap-3 mt-8 text-yellow-400 font-bold hover:text-yellow-300"
                >
                  Watch Message
                  <ArrowRight size={18} />
                </Link>

              </div>

            </div>

          ))}

        </div>

        <div className="text-center mt-16">

          <Link
            href="/sermons"
            className="inline-flex items-center gap-3 bg-yellow-400 text-blue-950 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition"
          >
            View All Sermons
            <ArrowRight size={20} />
          </Link>

        </div>

      </div>

    </section>
  );
}