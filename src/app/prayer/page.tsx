export default function PrayerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white px-6 py-20">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-yellow-400">
          Prayer Ministry
        </h1>


        <p className="mt-6 text-lg text-gray-200 max-w-3xl">
          A global prayer community committed to intercession,
          spiritual growth, and strengthening believers through
          consistent prayer.
        </p>


        <div className="grid md:grid-cols-3 gap-8 mt-12">


          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">

            <h2 className="text-2xl font-bold">
              Prayer Meetings
            </h2>

            <p className="mt-4 text-gray-200">
              Join believers around the world in powerful prayer sessions.
            </p>

          </div>


          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">

            <h2 className="text-2xl font-bold">
              Intercession
            </h2>

            <p className="mt-4 text-gray-200">
              Standing in prayer for students, nations, and communities.
            </p>

          </div>


          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">

            <h2 className="text-2xl font-bold">
              Prayer Requests
            </h2>

            <p className="mt-4 text-gray-200">
              Submit your prayer needs and connect with our prayer team.
            </p>

          </div>


        </div>


      </div>

    </main>
  );
}