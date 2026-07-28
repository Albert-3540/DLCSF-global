import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#081C3A] text-white">

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-yellow-400">
            DLCSF Global
          </h2>

          <p className="mt-5 text-gray-300 leading-7">
            Raising Kingdom Ambassadors across the nations through
            discipleship, leadership, and missions.
          </p>

          <div className="flex gap-4 mt-8">

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center hover:bg-blue-600 transition"
            >
              <FaFacebookF size={18} />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center hover:bg-pink-500 transition"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-500 transition"
            >
              <FaYoutube size={18} />
            </a>

          </div>
        </div>


        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-5">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-gray-300">

            <Link href="/">
              Home
            </Link>

            <Link href="/about">
              About
            </Link>

            <Link href="/countries">
              Countries
            </Link>

            <Link href="/events">
              Events
            </Link>

            <Link href="/sermons">
              Sermons
            </Link>

            <Link href="/contact">
              Contact
            </Link>

          </div>
        </div>


        {/* Ministries */}
        <div>
          <h3 className="text-xl font-semibold mb-5">
            Ministries
          </h3>

          <div className="space-y-3 text-gray-300">

            <p>Prayer Ministry</p>
            <p>Choir</p>
            <p>Evangelism</p>
            <p>Media Team</p>
            <p>Campus Fellowship</p>
            <p>Follow-Up</p>

          </div>
        </div>


        {/* Contact */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Contact
          </h3>

          <div className="space-y-5 text-gray-300">

            <div className="flex gap-3 items-center">
              <Mail size={18} />
              <span>
                info@dlcsfglobal.org
              </span>
            </div>


            <div className="flex gap-3 items-center">
              <Phone size={18} />
              <span>
                +234 XXX XXX XXXX
              </span>
            </div>


            <div className="flex gap-3 items-start">
              <MapPin size={18} className="mt-1" />

              <span>
                Deeper Life Campus Fellowship
                <br />
                Global Headquarters
              </span>

            </div>

          </div>

        </div>


      </div>


      {/* Bottom */}

      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-400 text-sm">
            © 2026 DLCSF Global. All Rights Reserved.
          </p>


          <div className="flex gap-6 text-gray-400 text-sm">

            <Link href="/privacy">
              Privacy Policy
            </Link>

            <Link href="/terms">
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>


    </footer>
  );
}