import { HeartHandshake, Users, Send, Clock } from "lucide-react";

export default function PrayerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">

      {/* Hero Section */}
      <section className="py-24 px-6 text-center">
        <span className="inline-block bg-yellow-400 text-blue-950 px-4 py-2 rounded-full font-semibold mb-6">
          Prayer Ministry
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400">
          Join Our Global Prayer Network
        </h1>

        <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-200">
          A global prayer community committed to intercession, spiritual
          growth, and strengthening believers through consistent prayer,
          fellowship, and faith in Christ.
        </p>
      </section>

      {/* Ministry Cards */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:-translate-y-2 transition duration-300">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-blue-950">
            <Users size={32} />
          </div>

          <h2 className="text-2xl font-bold mt-6">
            Prayer Meetings
          </h2>

          <p className="mt-4 text-gray-300">
            Join believers around the world in powerful online and physical
            prayer sessions.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:-translate-y-2 transition duration-300">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-blue-950">
            <HeartHandshake size={32} />
          </div>

          <h2 className="text-2xl font-bold mt-6">
            Intercession
          </h2>

          <p className="mt-4 text-gray-300">
            Standing in prayer for students, families, churches, nations,
            and communities.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:-translate-y-2 transition duration-300">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-blue-950">
            <Send size={32} />
          </div>

          <h2 className="text-2xl font-bold mt-6">
            Prayer Requests
          </h2>

          <p className="mt-4 text-gray-300">
            Submit your prayer needs and let our global prayer team stand
            with you in faith.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:-translate-y-2 transition duration-300">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-blue-950">
            <Clock size={32} />
          </div>

          <h2 className="text-2xl font-bold mt-6">
            Daily Prayer
          </h2>

          <p className="mt-4 text-gray-300">
            Stay connected through daily prayer schedules and devotional
            reminders.
          </p>
        </div>

      </section>

      {/* Prayer Request Form */}
      <section className="max-w-5xl mx-auto px-6 py-24">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10">

          <h2 className="text-4xl font-bold text-center text-yellow-400">
            Submit a Prayer Request
          </h2>

          <p className="text-center text-gray-300 mt-4 mb-10">
            Share your prayer request with us. Our prayer team will stand
            with you in faith.
          </p>

          <form className="space-y-6">

            <div className="grid md:grid-cols-2 gap-6">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl bg-white/20 border border-white/20 p-4 outline-none focus:border-yellow-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl bg-white/20 border border-white/20 p-4 outline-none focus:border-yellow-400"
              />

            </div>

            <textarea
              rows={6}
              placeholder="Write your prayer request..."
              className="w-full rounded-xl bg-white/20 border border-white/20 p-4 outline-none focus:border-yellow-400"
            />

            <button
              type="submit"
              className="w-full bg-yellow-400 text-blue-950 py-4 rounded-xl font-bold hover:bg-yellow-300 transition"
            >
              Submit Prayer Request
            </button>

          </form>

        </div>

      </section>

      {/* Call to Action */}
      <section className="bg-black/20 py-20 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl font-bold">
            Pray Without Ceasing
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            Join thousands of believers around the world as we seek God,
            encourage one another, and impact lives through prayer.
          </p>

          <button className="mt-8 bg-yellow-400 text-blue-950 px-10 py-4 rounded-full font-bold hover:bg-yellow-300 transition">
            Join the Prayer Ministry
          </button>

        </div>

      </section>

    </main>
  );
}