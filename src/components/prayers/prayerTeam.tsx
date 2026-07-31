import { Globe, Users, HeartHandshake } from "lucide-react";

export default function PrayerTeam() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-950 to-blue-800 text-white">

      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-5xl font-black">
            24/7 Global Prayer Team
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-blue-100 leading-8">
            Dedicated prayer coordinators are available around the world,
            standing with believers in faith through prayer.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-white/10 rounded-3xl p-8">

            <Globe
              size={45}
              className="text-yellow-400 mb-5"
            />

            <h3 className="text-2xl font-bold">
              Worldwide Network
            </h3>

          </div>

          <div className="bg-white/10 rounded-3xl p-8">

            <Users
              size={45}
              className="text-yellow-400 mb-5"
            />

            <h3 className="text-2xl font-bold">
              Dedicated Coordinators
            </h3>

          </div>

          <div className="bg-white/10 rounded-3xl p-8">

            <HeartHandshake
              size={45}
              className="text-yellow-400 mb-5"
            />

            <h3 className="text-2xl font-bold">
              Confidential Support
            </h3>

          </div>

        </div>

      </div>

    </section>
  );
}