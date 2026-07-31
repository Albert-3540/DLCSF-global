import { Heart } from "lucide-react";

export default function PrayerHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 py-24">

      {/* Background Decorations */}

      <div className="absolute inset-0 opacity-10">

        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-yellow-400 blur-3xl" />

        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-300 blur-3xl" />

      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">

        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-400 text-blue-950 mb-8">

          <Heart size={42} />

        </div>

        <h1 className="text-5xl md:text-6xl font-black text-white">

          Prayer Request

        </h1>

        <p className="mt-8 text-xl leading-9 text-blue-100 max-w-3xl mx-auto">

          We are here to stand with you in prayer.
          Every request is handled with love,
          care, wisdom and confidentiality.

        </p>

      </div>

    </section>
  );
}