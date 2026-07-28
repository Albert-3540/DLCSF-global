import Link from "next/link";
import { ArrowRight, Globe2, MapPinned } from "lucide-react";

const regions = [
  {
    continent: "Africa",
    countries: "54 Countries",
    color: "from-yellow-400 to-orange-500",
  },
  {
    continent: "Europe",
    countries: "44 Countries",
    color: "from-blue-400 to-cyan-500",
  },
  {
    continent: "North America",
    countries: "23 Countries",
    color: "from-green-400 to-emerald-500",
  },
  {
    continent: "South America",
    countries: "12 Countries",
    color: "from-pink-500 to-rose-500",
  },
  {
    continent: "Asia",
    countries: "48 Countries",
    color: "from-purple-500 to-indigo-500",
  },
  {
    continent: "Oceania",
    countries: "14 Countries",
    color: "from-cyan-400 to-sky-500",
  },
];

export default function GlobalImpact() {
  return (
    <section className="bg-gradient-to-b from-blue-950 to-blue-900 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="bg-yellow-400 text-blue-950 px-5 py-2 rounded-full font-semibold">
            Global Presence
          </span>

          <h2 className="text-5xl font-black text-white mt-8">
            One Fellowship
            <span className="block text-yellow-400 mt-2">
              Across Every Continent
            </span>
          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-lg text-gray-300 leading-8">
            DLCSF Global exists to unite students, graduates, and
            professionals around the world through worship,
            discipleship, evangelism, leadership development,
            and Christian fellowship.
          </p>

        </div>

        {/* World Card */}

        <div className="mt-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] p-12">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-yellow-400 text-blue-950">

                <Globe2 size={48} />

              </div>

              <h3 className="text-4xl font-black text-white mt-8">
                Reaching The Nations
              </h3>

              <p className="text-gray-300 mt-6 leading-8 text-lg">
                Our mission is to build Christ-centered communities
                across universities and cities, preparing believers
                to impact the world for Jesus Christ.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-10">

                <div>
                  <h4 className="text-yellow-400 text-4xl font-black">
                    180+
                  </h4>
                  <p className="text-gray-300 mt-2">
                    Target Countries
                  </p>
                </div>

                <div>
                  <h4 className="text-yellow-400 text-4xl font-black">
                    800+
                  </h4>
                  <p className="text-gray-300 mt-2">
                    Fellowships
                  </p>
                </div>

              </div>

              <Link
                href="/countries"
                className="inline-flex items-center gap-3 mt-10 bg-yellow-400 text-blue-950 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition"
              >
                Explore Countries

                <ArrowRight size={20} />

              </Link>

            </div>

            {/* Right */}

            <div className="grid sm:grid-cols-2 gap-6">

              {regions.map((region) => (
                <div
                  key={region.continent}
                  className="bg-white/10 border border-white/20 rounded-3xl p-6 hover:-translate-y-2 transition duration-300"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${region.color} flex items-center justify-center`}
                  >
                    <MapPinned className="text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mt-5">
                    {region.continent}
                  </h3>

                  <p className="text-gray-300 mt-3">
                    {region.countries}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}