import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  Globe,
  Users,
  GraduationCap,
  Church,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-20">

        {/* HERO */}

        <section className="bg-gradient-to-r from-[#081C3A] via-blue-900 to-blue-700 min-h-screen flex items-center">

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <span className="bg-yellow-400 text-blue-900 px-5 py-2 rounded-full font-semibold">
                🌍 Welcome to DLCSF Global
              </span>

              <h1 className="text-6xl font-black text-white mt-8 leading-tight">
                Raising
                <span className="text-yellow-400">
                  {" "}Kingdom Ambassadors{" "}
                </span>
                Across The Nations
              </h1>

              <p className="text-blue-100 mt-8 text-xl leading-9">

                Connecting Students, Corpers, Graduates and Coordinators
                around the world through fellowship, leadership,
                discipleship and missions.

              </p>

              <div className="flex gap-5 mt-10">

                <Link
                  href="/register"
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition"
                >
                  Join Fellowship
                  <ArrowRight size={20} />
                </Link>

                <Link
                  href="/login"
                  className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-900 transition"
                >
                  Login
                </Link>

              </div>

            </div>

            {/* Right Card */}

            <div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl">

                <h2 className="text-white text-3xl font-bold mb-10">
                  Global Impact
                </h2>

                <div className="grid grid-cols-2 gap-6">

                  <div className="bg-white rounded-2xl p-8 text-center">

                    <Globe
                      className="mx-auto text-blue-800"
                      size={45}
                    />

                    <h2 className="text-4xl font-black text-blue-900 mt-4">
                      180+
                    </h2>

                    <p>Countries</p>

                  </div>

                  <div className="bg-white rounded-2xl p-8 text-center">

                    <Users
                      className="mx-auto text-blue-800"
                      size={45}
                    />

                    <h2 className="text-4xl font-black text-blue-900 mt-4">
                      25K+
                    </h2>

                    <p>Members</p>

                  </div>

                  <div className="bg-white rounded-2xl p-8 text-center">

                    <GraduationCap
                      className="mx-auto text-blue-800"
                      size={45}
                    />

                    <h2 className="text-4xl font-black text-blue-900 mt-4">
                      500+
                    </h2>

                    <p>Campuses</p>

                  </div>

                  <div className="bg-white rounded-2xl p-8 text-center">

                    <Church
                      className="mx-auto text-blue-800"
                      size={45}
                    />

                    <h2 className="text-4xl font-black text-blue-900 mt-4">
                      1000+
                    </h2>

                    <p>Fellowships</p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ABOUT */}

        <section className="py-24 bg-white">

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">

            <div>

              <span className="text-blue-700 font-bold uppercase">
                About DLCSF
              </span>

              <h2 className="text-5xl font-black text-gray-900 mt-5">
                A Global Fellowship For Students & Corpers
              </h2>

              <p className="mt-8 text-gray-600 leading-8 text-lg">

                DLCSF Global exists to connect believers across campuses,
                workplaces and nations. Our vision is to build spiritually
                mature leaders who will influence every sphere of society
                through the Gospel of Jesus Christ.

              </p>

            </div>

            <div className="space-y-6">

              <div className="flex gap-5">

                <CheckCircle
                  className="text-green-600 mt-1"
                />

                <div>

                  <h3 className="font-bold text-xl">
                    Bible-Based Teaching
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Building believers on the solid foundation of God's Word.
                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <CheckCircle
                  className="text-green-600 mt-1"
                />

                <div>

                  <h3 className="font-bold text-xl">
                    Leadership Development
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Equipping students and graduates for lifelong Christian leadership.
                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <CheckCircle
                  className="text-green-600 mt-1"
                />

                <div>

                  <h3 className="font-bold text-xl">
                    Global Missions
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Sharing the Gospel and strengthening fellowships around the world.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}