import Link from "next/link";
import { ArrowRight, Heart, Quote, Send } from "lucide-react";

const testimonies = [
  {
    name: "Grace A.",
    country: "Nigeria",
    testimony:
      "Through DLCSF, my relationship with Christ became stronger. I discovered my purpose and found a family of believers.",
  },
  {
    name: "Daniel K.",
    country: "Ghana",
    testimony:
      "The prayer meetings transformed my spiritual life. God answered prayers I had carried for years.",
  },
  {
    name: "Sarah M.",
    country: "United Kingdom",
    testimony:
      "Being part of the global fellowship has encouraged me to boldly share the Gospel wherever I am.",
  },
];

export default function PrayerSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-28">

      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 w-[450px] h-[450px] bg-yellow-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="text-center">

          <span className="bg-yellow-400 text-blue-950 px-5 py-2 rounded-full font-semibold">
            Prayer & Testimonies
          </span>

          <h2 className="text-5xl font-black text-white mt-8">
            God Is Still Changing Lives
          </h2>

          <p className="text-gray-300 text-lg leading-8 max-w-3xl mx-auto mt-6">
            We believe in the power of prayer and the faithfulness of God.
            Join believers around the world as we pray together and celebrate
            what God is doing through DLCSF Global.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-16 mt-20">

          {/* Prayer CTA */}

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[35px] p-10">

            <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-blue-950">
              <Heart size={40} />
            </div>

            <h3 className="text-4xl font-black text-white mt-8">
              Need Prayer?
            </h3>

            <p className="text-gray-300 mt-6 leading-8 text-lg">
              Whatever you're facing, you're not alone.
              Share your prayer request and our prayer team
              will stand with you in faith.
            </p>

            <blockquote className="mt-10 border-l-4 border-yellow-400 pl-6 italic text-gray-200 text-lg">
              "Do not be anxious about anything, but in everything,
              by prayer and supplication with thanksgiving,
              let your requests be made known to God."
            </blockquote>

            <p className="mt-4 text-yellow-400 font-semibold">
              — Philippians 4:6
            </p>

            <Link
              href="/prayer"
              className="inline-flex items-center gap-3 mt-10 bg-yellow-400 text-blue-950 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition"
            >
              Submit Prayer Request

              <Send size={20} />

            </Link>

          </div>

          {/* Testimonies */}

          <div className="space-y-6">

            {testimonies.map((item) => (

              <div
                key={item.name}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:border-yellow-400 transition"
              >

                <Quote
                  className="text-yellow-400"
                  size={38}
                />

                <p className="text-gray-300 mt-6 leading-8">
                  {item.testimony}
                </p>

                <div className="mt-8">

                  <h4 className="text-white font-bold text-xl">
                    {item.name}
                  </h4>

                  <p className="text-yellow-400">
                    {item.country}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Bottom CTA */}

        <div className="mt-24 bg-yellow-400 rounded-[35px] p-12 text-center">

          <h2 className="text-4xl md:text-5xl font-black text-blue-950">
            Together We Can Reach The Nations
          </h2>

          <p className="text-blue-900 text-lg max-w-3xl mx-auto mt-6">
            Become part of a growing global fellowship that is raising
            disciples, strengthening believers, and impacting lives
            through the Gospel of Jesus Christ.
          </p>

          <Link
            href="/register"
            className="inline-flex items-center gap-3 mt-10 bg-blue-950 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-900 transition"
          >
            Join DLCSF Global

            <ArrowRight size={20} />

          </Link>

        </div>

      </div>

    </section>
  );
}