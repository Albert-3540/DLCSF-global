import Link from "next/link";
import {
  BookOpen,
  Globe2,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

export default function AboutSection() {
  return (
    <section className="bg-blue-950 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Side - Image */}

          <div className="relative">

            <img
              src="/images/about.jpg"
              alt="DLCSF Global Fellowship"
              className="rounded-[35px] w-full h-[650px] object-cover shadow-2xl"
            />

            <div className="absolute bottom-8 left-8 bg-yellow-400 text-blue-950 rounded-3xl p-6 shadow-xl">

              <p className="text-sm font-semibold">
                Established to Raise
              </p>

              <h3 className="text-3xl font-black mt-2">
                Kingdom Leaders
              </h3>

            </div>

          </div>

          {/* Right Side */}

          <div>

            <span className="bg-yellow-400 text-blue-950 px-5 py-2 rounded-full font-semibold">
              About DLCSF Global
            </span>

            <h2 className="text-5xl font-black text-white mt-8 leading-tight">

              Connecting Students,

              <span className="block text-yellow-400 mt-2">
                Transforming Nations.
              </span>

            </h2>

            <p className="mt-8 text-lg text-gray-300 leading-9">

              DLCSF Global is an international Christian fellowship
              committed to raising godly students, graduates, and young
              professionals who will influence their campuses,
              communities, workplaces, and nations for Jesus Christ.

            </p>

            <div className="grid gap-8 mt-12">

              <div className="flex gap-5">

                <div className="w-16 h-16 rounded-2xl bg-yellow-400 text-blue-950 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={30} />
                </div>

                <div>

                  <h3 className="text-2xl font-bold text-white">
                    Biblical Teaching
                  </h3>

                  <p className="text-gray-300 mt-2">
                    Grounding believers in God's Word through sound
                    biblical doctrine and practical Christian living.
                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div className="w-16 h-16 rounded-2xl bg-yellow-400 text-blue-950 flex items-center justify-center flex-shrink-0">
                  <HeartHandshake size={30} />
                </div>

                <div>

                  <h3 className="text-2xl font-bold text-white">
                    Prayer & Fellowship
                  </h3>

                  <p className="text-gray-300 mt-2">
                    Building a united community through prayer,
                    discipleship, worship, and genuine Christian love.
                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div className="w-16 h-16 rounded-2xl bg-yellow-400 text-blue-950 flex items-center justify-center flex-shrink-0">
                  <Globe2 size={30} />
                </div>

                <div>

                  <h3 className="text-2xl font-bold text-white">
                    Global Mission
                  </h3>

                  <p className="text-gray-300 mt-2">
                    Reaching every campus, every city, and every nation
                    with the Gospel of Jesus Christ.
                  </p>

                </div>

              </div>

            </div>

            <div className="mt-12">

              <Link
                href="/about"
                className="inline-flex items-center gap-3 bg-yellow-400 text-blue-950 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition"
              >
                Learn More

                <ArrowRight size={20} />

              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}