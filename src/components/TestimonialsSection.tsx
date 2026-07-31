import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Daniel O.",
    country: "Nigeria",
    role: "Campus Fellowship Leader",
    message:
      "DLCSF has transformed my spiritual life. I've grown in leadership, evangelism, and my walk with Christ.",
  },
  {
    name: "Grace A.",
    country: "United Kingdom",
    role: "Graduate Member",
    message:
      "Being part of DLCSF Global has connected me with believers from different nations. It truly feels like one family in Christ.",
  },
  {
    name: "Michael K.",
    country: "Ghana",
    role: "Student",
    message:
      "The teachings, prayer meetings, and fellowship have strengthened my faith and prepared me to serve God boldly.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-blue-950 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="bg-yellow-400 text-blue-950 px-5 py-2 rounded-full font-semibold">
            Testimonials
          </span>

          <h2 className="text-5xl font-black text-white mt-8">
            Lives Transformed
          </h2>

          <p className="text-gray-300 mt-6 max-w-3xl mx-auto text-lg leading-8">
            Hear what members from around the world are saying about
            their experience with DLCSF Global.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {testimonials.map((item) => (

            <div
              key={item.name}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:border-yellow-400 transition duration-300"
            >

              <Quote className="text-yellow-400" size={40} />

              <div className="flex gap-1 mt-5 text-yellow-400">
                {[1,2,3,4,5].map((star)=>(
                  <Star key={star} size={18} fill="currentColor"/>
                ))}
              </div>

              <p className="text-gray-300 mt-6 leading-8">
                "{item.message}"
              </p>

              <div className="mt-8">

                <h3 className="text-xl font-bold text-white">
                  {item.name}
                </h3>

                <p className="text-yellow-400">
                  {item.role}
                </p>

                <p className="text-gray-400 text-sm">
                  {item.country}
                </p>

              </div>

            </div>

          ))}

        </div>

        <div className="text-center mt-16">

          <Link
            href="/register"
            className="inline-flex items-center gap-3 bg-yellow-400 text-blue-950 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition"
          >
            Become Part of Our Story

            <ArrowRight size={20} />

          </Link>

        </div>

      </div>
    </section>
  );
}