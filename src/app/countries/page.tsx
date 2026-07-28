const countries = [
  {
    name: "Nigeria",
    flag: "🇳🇬",
    members: "500+ Fellowships",
    region: "Africa",
  },
  {
    name: "United States",
    flag: "🇺🇸",
    members: "120+ Fellowships",
    region: "North America",
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    members: "80+ Fellowships",
    region: "Europe",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    members: "50+ Fellowships",
    region: "North America",
  },
  {
    name: "South Africa",
    flag: "🇿🇦",
    members: "70+ Fellowships",
    region: "Africa",
  },
  {
    name: "Ghana",
    flag: "🇬🇭",
    members: "60+ Fellowships",
    region: "Africa",
  },
];


export default function CountriesPage() {
  return (

    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">


      {/* Hero */}

      <section className="py-24 px-6 text-center">

        <h1 className="text-5xl md:text-6xl font-bold text-yellow-400">
          DLCSF Around The World 🌍
        </h1>


        <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-200">
          Connecting Deeper Life Campus Fellowship members,
          students, and professionals across nations.
        </p>


        <div className="mt-10">

          <input
            placeholder="Search country..."
            className="w-full max-w-xl px-6 py-4 rounded-full text-black outline-none"
          />

        </div>


      </section>




      {/* Countries */}

      <section className="px-6 pb-24">

        <div className="max-w-7xl mx-auto">


          <h2 className="text-3xl font-bold mb-10">
            Our Global Presence
          </h2>



          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">


            {countries.map((country)=>(

              <div
                key={country.name}
                className="
                bg-white/10 
                backdrop-blur-lg
                border border-white/20
                rounded-3xl
                p-8
                hover:-translate-y-2
                transition-all
                duration-300
                shadow-xl
                "
              >


                <div className="text-5xl">
                  {country.flag}
                </div>


                <h3 className="text-2xl font-bold mt-5">
                  {country.name}
                </h3>


                <p className="text-yellow-300 mt-2">
                  {country.region}
                </p>


                <p className="mt-4 text-gray-200">
                  {country.members}
                </p>


                <button
                  className="
                  mt-6
                  bg-yellow-400
                  text-blue-950
                  px-6
                  py-3
                  rounded-full
                  font-semibold
                  hover:bg-yellow-300
                  "
                >
                  View Fellowship
                </button>


              </div>

            ))}


          </div>


        </div>


      </section>




      {/* Bottom Section */}

      <section className="bg-black/20 py-20 px-6 text-center">


        <h2 className="text-4xl font-bold">
          180+ Countries Coming Together
        </h2>


        <p className="mt-5 text-gray-200 max-w-3xl mx-auto">
          Our vision is to connect believers across nations,
          creating a united global fellowship community.
        </p>


      </section>


    </main>

  );
}