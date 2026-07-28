import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">

      {/* Hero */}
      <section className="py-24 px-6 text-center">
        <span className="inline-block bg-yellow-400 text-blue-950 px-4 py-2 rounded-full font-semibold mb-6">
          Get In Touch
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400">
          Contact DLCSF Global
        </h1>

        <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
          We'd love to hear from you. Whether you have a question,
          testimony, prayer request, or partnership inquiry, our team is
          always ready to connect with you.
        </p>
      </section>

      {/* Contact Cards */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:-translate-y-2 transition duration-300">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-blue-950">
            <Mail size={32} />
          </div>

          <h2 className="text-2xl font-bold mt-6">Email</h2>

          <p className="mt-4 text-gray-300">
            info@dlcsfglobal.org
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:-translate-y-2 transition duration-300">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-blue-950">
            <Phone size={32} />
          </div>

          <h2 className="text-2xl font-bold mt-6">Phone</h2>

          <p className="mt-4 text-gray-300">
            +234 XXX XXX XXXX
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:-translate-y-2 transition duration-300">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-blue-950">
            <MapPin size={32} />
          </div>

          <h2 className="text-2xl font-bold mt-6">Head Office</h2>

          <p className="mt-4 text-gray-300">
            DLCSF Global Headquarters
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:-translate-y-2 transition duration-300">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-blue-950">
            <Clock size={32} />
          </div>

          <h2 className="text-2xl font-bold mt-6">Office Hours</h2>

          <p className="mt-4 text-gray-300">
            Monday - Friday
            <br />
            8:00 AM - 5:00 PM
          </p>
        </div>

      </section>

      {/* Contact Form */}
      <section className="max-w-5xl mx-auto px-6 py-24">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10">

          <h2 className="text-4xl font-bold text-center text-yellow-400">
            Send Us a Message
          </h2>

          <p className="text-center text-gray-300 mt-4 mb-10">
            Fill out the form below and we'll get back to you as soon as possible.
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

            <input
              type="text"
              placeholder="Subject"
              className="w-full rounded-xl bg-white/20 border border-white/20 p-4 outline-none focus:border-yellow-400"
            />

            <textarea
              rows={6}
              placeholder="Write your message..."
              className="w-full rounded-xl bg-white/20 border border-white/20 p-4 outline-none focus:border-yellow-400"
            />

            <button
              type="submit"
              className="w-full bg-yellow-400 text-blue-950 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}