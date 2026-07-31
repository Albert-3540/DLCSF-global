"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  CheckCircle,
  ArrowLeft,
  Send,
  Phone,
  Mail,
  Globe,
} from "lucide-react";

export default function PrayerPage() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    campus: "",
    category: "Spiritual Growth",
    request: "",
    anonymous: false,
    priority: "Normal",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Backend will be connected later
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-20">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-10 text-center">
          <CheckCircle className="mx-auto text-green-600 mb-6" size={80} />
          <h1 className="text-4xl font-bold text-blue-950 mb-5">
            Prayer Request Submitted
          </h1>
          <p className="text-gray-600 text-lg leading-8">
            Thank you for sharing your prayer request.
            <br />
            Our prayer coordinators will stand with you in faith.
          </p>
          <p className="mt-6 font-bold text-blue-900">
            God bless you abundantly.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-10 bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-800 transition"
          >
            <ArrowLeft size={18} />
            Back Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-700 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Heart size={60} className="mx-auto text-yellow-400 mb-6" />
          <h1 className="text-5xl md:text-6xl font-black">
            Prayer Request
          </h1>
          <p className="mt-8 text-xl max-w-3xl mx-auto leading-9 text-gray-200">
            We are here to stand with you in prayer.
            Every request is treated with love,
            care and confidentiality.
          </p>
        </div>
      </section>

      {/* Prayer Form */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full mt-2 border rounded-xl px-4 py-3"
                  />
                </div>
                <div>
                  <label className="font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mt-2 border rounded-xl px-4 py-3"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-semibold">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full mt-2 border rounded-xl px-4 py-3"
                  />
                </div>
                <div>
                  <label className="font-semibold">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full mt-2 border rounded-xl px-4 py-3"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-semibold">
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full mt-2 border rounded-xl px-4 py-3"
                  />
                </div>
                <div>
                  <label className="font-semibold">
                    Campus / Church
                  </label>
                  <input
                    type="text"
                    name="campus"
                    value={formData.campus}
                    onChange={handleChange}
                    className="w-full mt-2 border rounded-xl px-4 py-3"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold">
                  Prayer Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl px-4 py-3"
                >
                  <option>Spiritual Growth</option>
                  <option>Healing</option>
                  <option>Family</option>
                  <option>Salvation</option>
                  <option>Thanksgiving</option>
                  <option>Finances</option>
                  <option>Academics</option>
                  <option>Deliverance</option>
                  <option>Guidance</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">
                  Prayer Request
                </label>
                <textarea
                  rows={7}
                  required
                  name="request"
                  value={formData.request}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl px-4 py-3"
                  placeholder="Share your prayer request..."
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
                <label htmlFor="anonymous" className="text-gray-700">
                  Keep my prayer request anonymous
                </label>
              </div>

              <div>
                <label className="font-semibold block mb-3">
                  Priority
                </label>
                <div className="flex gap-8">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="priority"
                      value="Normal"
                      checked={formData.priority === "Normal"}
                      onChange={handleChange}
                    />
                    Normal
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="priority"
                      value="Urgent"
                      checked={formData.priority === "Urgent"}
                      onChange={handleChange}
                    />
                    Urgent
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition"
              >
                <Send size={20} />
                Submit Prayer Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Bible Promise */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-blue-950">
            God's Promise
          </h2>
          <blockquote className="mt-10 text-2xl italic text-gray-700 leading-10">
            "Call unto me, and I will answer thee,
            and show thee great and mighty things,
            which thou knowest not."
          </blockquote>
          <p className="mt-6 text-xl font-bold text-yellow-600">
            Jeremiah 33:3
          </p>
        </div>
      </section>

      {/* Global Prayer Team */}
      <section className="py-20 bg-gradient-to-r from-blue-950 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-5xl font-black">
              24/7 Global Prayer Team
            </h2>
            <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto leading-8">
              Across nations and campuses,
              dedicated prayer coordinators are committed
              to lifting every request before God.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/10 rounded-3xl p-8">
              <Globe className="text-yellow-400 mb-5" size={45} />
              <h3 className="text-2xl font-bold">
                Global Coverage
              </h3>
              <p className="mt-4 text-gray-300 leading-8">
                Prayer teams serving across multiple countries.
              </p>
            </div>
            <div className="bg-white/10 rounded-3xl p-8">
              <Phone className="text-yellow-400 mb-5" size={45} />
              <h3 className="text-2xl font-bold">
                Emergency Prayer
              </h3>
              <p className="mt-4 text-gray-300 leading-8">
                Urgent requests receive immediate attention.
              </p>
            </div>
            <div className="bg-white/10 rounded-3xl p-8">
              <Mail className="text-yellow-400 mb-5" size={45} />
              <h3 className="text-2xl font-bold">
                Confidential
              </h3>
              <p className="mt-4 text-gray-300 leading-8">
                Every prayer request is treated with love,
                wisdom and confidentiality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-center text-4xl font-bold text-blue-950 mb-14">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow p-8">
              <h3 className="font-bold text-xl">
                Is my prayer request confidential?
              </h3>
              <p className="mt-4 text-gray-600 leading-8">
                Yes. Your prayer request is treated with
                confidentiality and shared only with authorized
                prayer coordinators.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow p-8">
              <h3 className="font-bold text-xl">
                Can I submit anonymously?
              </h3>
              <p className="mt-4 text-gray-600 leading-8">
                Absolutely. Simply check the anonymous option
                before submitting your request.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow p-8">
              <h3 className="font-bold text-xl">
                Will someone contact me?
              </h3>
              <p className="mt-4 text-gray-600 leading-8">
                If you provide your contact details,
                a prayer coordinator may reach out
                when appropriate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Prayer Coordinators */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-3xl p-10 text-white">
            <div className="grid md:grid-cols-3 gap-10">
              <div>
                <Phone size={42} className="text-yellow-400 mb-5" />
                <h3 className="text-2xl font-bold">
                  Call Us
                </h3>
                <p className="mt-4 text-gray-300">
                  Prayer coordinators are available to minister and pray with you.
                </p>
                <p className="mt-6 font-semibold">
                  +234 XXX XXX XXXX
                </p>
              </div>
              <div>
                <Mail size={42} className="text-yellow-400 mb-5" />
                <h3 className="text-2xl font-bold">
                  Email
                </h3>
                <p className="mt-4 text-gray-300">
                  Send your prayer request anytime.
                </p>
                <p className="mt-6 font-semibold">
                  prayer@dlcsfglobal.org
                </p>
              </div>
              <div>
                <Globe size={42} className="text-yellow-400 mb-5" />
                <h3 className="text-2xl font-bold">
                  Worldwide Prayer Network
                </h3>
                <p className="mt-4 text-gray-300 leading-8">
                  Prayer coordinators across nations are united in standing with
                  believers around the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Prayer Banner */}
      <section className="py-20 bg-red-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-l-8 border-red-600 bg-white rounded-3xl shadow-lg p-10">
            <h2 className="text-4xl font-black text-red-700">
              Need Urgent Prayer?
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-8">
              If your request is urgent, please select
              <strong> "Urgent"</strong> when submitting the form.
              Our prayer coordinators will prioritize it and stand with you in
              prayer as quickly as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Verse */}
      <section className="bg-blue-950 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <Heart size={48} className="mx-auto text-yellow-400 mb-6" />
          <h2 className="text-3xl font-bold">
            "Pray without ceasing."
          </h2>
          <p className="mt-5 text-xl text-gray-300">
            1 Thessalonians 5:17
          </p>
          <p className="mt-10 text-gray-400">
            © 2026 DLCSF Global.
            All Rights Reserved.
          </p>
        </div>
      </section>
    </main>
  );
}