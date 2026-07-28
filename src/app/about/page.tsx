export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">

      <section className="px-6 py-24 text-center">

        <h1 className="text-5xl md:text-6xl font-bold text-yellow-400">
          About DLCSF Global
        </h1>

        <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-200">
          Deeper Life Campus Fellowship Global is a worldwide
          Christian community committed to raising Kingdom
          ambassadors in campuses and nations.
        </p>

      </section>



      <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-8">


        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">

          <h2 className="text-2xl font-bold text-yellow-400">
            Our Vision
          </h2>

          <p className="mt-4 text-gray-200">
            To raise spiritually empowered students who
            influence their generation for Christ.
          </p>

        </div>



        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">

          <h2 className="text-2xl font-bold text-yellow-400">
            Our Mission
          </h2>

          <p className="mt-4 text-gray-200">
            Building disciples through teaching, prayer,
            fellowship, and evangelism.
          </p>

        </div>



        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">

          <h2 className="text-2xl font-bold text-yellow-400">
            Our Mandate
          </h2>

          <p className="mt-4 text-gray-200">
            Taking the gospel to campuses and nations
            through dedicated believers.
          </p>

        </div>


      </section>

    </main>
  );
}