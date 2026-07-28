const events = [
  {
    title: "Global Conference",
    date: "Annual Worldwide Gathering",
    description: "A gathering of students and believers from different nations."
  },
  {
    title: "Campus Revival",
    date: "Campus Programs",
    description: "Spiritual awakening meetings across campuses."
  },
  {
    title: "Leadership Summit",
    date: "Leadership Training",
    description: "Equipping young leaders for Kingdom impact."
  }
];


export default function EventsPage() {
  return (

    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">


      <section className="py-24 px-6 text-center">

        <h1 className="text-5xl font-bold text-yellow-400">
          Global Events
        </h1>

        <p className="mt-5 text-gray-200">
          Discover upcoming programs and fellowship activities worldwide.
        </p>

      </section>



      <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-8">


        {events.map((event)=>(

          <div
          key={event.title}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:-translate-y-2 transition"
          >

            <h2 className="text-2xl font-bold">
              {event.title}
            </h2>


            <p className="text-yellow-400 mt-3">
              {event.date}
            </p>


            <p className="mt-4 text-gray-200">
              {event.description}
            </p>


            <button className="mt-6 bg-yellow-400 text-blue-950 px-6 py-3 rounded-full">
              Learn More
            </button>


          </div>

        ))}


      </section>


    </main>

  );
}