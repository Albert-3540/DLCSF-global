import Link from "next/link";
import { ArrowRight, Camera, PlayCircle } from "lucide-react";

const gallery = [
  {
    title: "Global Conference",
    image: "/images/gallery1.jpg",
  },
  {
    title: "Campus Fellowship",
    image: "/images/gallery2.jpg",
  },
  {
    title: "Prayer Meeting",
    image: "/images/gallery3.jpg",
  },
  {
    title: "Leadership Summit",
    image: "/images/gallery4.jpg",
  },
  {
    title: "Worship Service",
    image: "/images/gallery5.jpg",
  },
  {
    title: "Evangelism Outreach",
    image: "/images/gallery6.jpg",
  },
];

export default function GallerySection() {
  return (
    <section className="bg-gradient-to-b from-blue-950 to-slate-950 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="bg-yellow-400 text-blue-950 px-5 py-2 rounded-full font-semibold">
            Ministry Gallery
          </span>

          <h2 className="text-5xl font-black text-white mt-8">
            Moments That Inspire
          </h2>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-6 leading-8">
            Experience highlights from conferences, campus fellowships,
            worship services, leadership trainings, evangelism outreaches,
            and prayer meetings around the world.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {gallery.map((item) => (

            <div
              key={item.title}
              className="group relative overflow-hidden rounded-3xl shadow-2xl"
            >

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-80 object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

              <div className="absolute inset-0 flex flex-col justify-end p-8">

                <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-blue-950 mb-5">

                  <Camera size={28} />

                </div>

                <h3 className="text-2xl font-bold text-white">
                  {item.title}
                </h3>

              </div>

            </div>

          ))}

        </div>

        {/* Featured Video */}

        <div className="mt-24">

          <div className="relative overflow-hidden rounded-[40px]">

            <img
              src="/images/video-cover.jpg"
              alt="Featured Video"
              className="w-full h-[520px] object-cover"
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

              <button className="bg-yellow-400 rounded-full p-6 hover:scale-110 transition">

                <PlayCircle
                  size={60}
                  className="text-blue-950"
                />

              </button>

              <h3 className="text-white text-5xl font-black mt-8">
                Watch DLCSF Global
              </h3>

              <p className="text-gray-200 text-lg max-w-2xl mt-5">
                Relive inspiring moments from conferences,
                worship services, outreach programs,
                leadership summits, and testimonies.
              </p>

            </div>

          </div>

        </div>

        <div className="text-center mt-16">

          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 bg-yellow-400 text-blue-950 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition"
          >
            View Full Gallery

            <ArrowRight size={20} />

          </Link>

        </div>

      </div>

    </section>
  );
}