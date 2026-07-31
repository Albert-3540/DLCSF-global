export default function BiblePromises() {
  const verses = [
    {
      verse: "Jeremiah 33:3",
      text: "Call unto me, and I will answer thee, and show thee great and mighty things, which thou knowest not.",
    },
    {
      verse: "Philippians 4:6",
      text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
    },
    {
      verse: "Matthew 7:7",
      text: "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-black text-blue-950">
            God's Promises
          </h2>

          <p className="mt-4 text-gray-600">
            His Word gives us confidence whenever we pray.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {verses.map((item) => (
            <div
              key={item.verse}
              className="rounded-3xl shadow-lg p-8 border hover:shadow-xl transition"
            >
              <h3 className="text-yellow-600 font-bold text-xl">
                {item.verse}
              </h3>

              <p className="mt-5 text-gray-700 leading-8">
                "{item.text}"
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}