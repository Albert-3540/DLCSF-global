"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Send,
  ShieldCheck,
  Globe,
  ArrowLeft,
  CheckCircle,
  Phone,
} from "lucide-react";

export default function PrayerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const target = e.target;

    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value;

    setFormData({
      ...formData,
      [target.name]: value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      /*
        Backend connection will be added here:

        await fetch("http://localhost:5000/api/prayer", {
          method: "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(formData)
        })

      */

      console.log("Prayer Request:", formData);

      setTimeout(() => {
        setSubmitted(true);
        setLoading(false);
      }, 1000);

    } catch(error){
      console.log(error);
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

        <div className="max-w-xl bg-white rounded-3xl shadow-xl p-10 text-center">

          <CheckCircle
            className="mx-auto text-green-600 mb-6"
            size={80}
          />

          <h1 className="text-3xl font-bold text-blue-950 mb-4">
            Prayer Request Submitted Successfully
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            Thank you for sharing your request.
            <br />
            Our prayer coordinators will stand with you in faith.
          </p>

          <p className="font-semibold text-blue-900 mb-8">
            God bless you.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-900 text-white px-7 py-3 rounded-full hover:bg-blue-800 transition"
          >
            <ArrowLeft size={18}/>
            Back Home
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="bg-gray-50">

      {/* Hero */}

      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white py-24 px-6">

        <div className="max-w-6xl mx-auto text-center">

          <Heart
            size={60}
            className="mx-auto mb-6 text-red-300"
          />

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Prayer Request
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-blue-100">
            We are here to stand with you in prayer.
            Your request will be treated with care and confidentiality.
          </p>

        </div>

      </section>

      {/* Form Section */}

      <section className="py-16 px-6">

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">

          <div className="flex items-center gap-3 mb-10">

            <ShieldCheck
              className="text-blue-900"
              size={35}
            />

            <h2 className="text-3xl font-bold text-blue-950">
              Submit Your Prayer Request
            </h2>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="font-semibold">
                  Full Name
                </label>

                <input
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
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
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Phone Number (Optional)
                </label>

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Country
                </label>

                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
                />

              </div>

              <div>

                <label className="font-semibold">
                  State / Province
                </label>

                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Campus / Church
                </label>

                <input
                  name="campus"
                  value={formData.campus}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
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

                <option>
                  Spiritual Growth
                </option>

                <option>
                  Healing
                </option>

                <option>
                  Family
                </option>

                <option>
                  Academic Success
                </option>

                <option>
                  Financial Breakthrough
                </option>

                <option>
                  Thanksgiving
                </option>

              </select>

            </div>

            <div>

              <label className="font-semibold">
                Prayer Request
              </label>

              <textarea
                name="request"
                required
                rows={6}
                value={formData.request}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />

            </div>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleChange}
              />

              Keep my request anonymous

            </label>

            <div>

              <label className="font-semibold">
                Priority
              </label>

              <div className="flex gap-8 mt-3">

                <label>
                  <input
                    type="radio"
                    name="priority"
                    value="Normal"
                    checked={formData.priority==="Normal"}
                    onChange={handleChange}
                  />
                  {" "}Normal
                </label>

                <label>
                  <input
                    type="radio"
                    name="priority"
                    value="Urgent"
                    checked={formData.priority==="Urgent"}
                    onChange={handleChange}
                  />
                  {" "}Urgent
                </label>

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white py-4 rounded-xl flex items-center justify-center gap-3 text-lg font-semibold hover:bg-blue-800 transition disabled:opacity-60"
            >

              <Send size={20}/>

              {loading ? "Submitting..." : "Submit Prayer Request"}

            </button>

          </form>

        </div>

      </section>

      {/* Bible Promises Section */}

      <section className="py-20 px-6 bg-white">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">

            <h2 className="text-4xl font-bold text-blue-950 mb-4">
              God's Promises About Prayer
            </h2>

            <p className="text-gray-600 text-lg">
              God's Word reminds us that He hears and answers those who call upon Him.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-blue-50 rounded-3xl p-8 shadow-sm">

              <h3 className="text-xl font-bold text-blue-900 mb-4">
                Jeremiah 33:3
              </h3>

              <p className="text-gray-700 italic">
                "Call unto me, and I will answer thee, and show thee great and mighty things, which thou knowest not."
              </p>

            </div>

            <div className="bg-blue-50 rounded-3xl p-8 shadow-sm">

              <h3 className="text-xl font-bold text-blue-900 mb-4">
                Philippians 4:6
              </h3>

              <p className="text-gray-700 italic">
                "Be careful for nothing; but in everything by prayer and supplication with thanksgiving let your requests be made known unto God."
              </p>

            </div>

            <div className="bg-blue-50 rounded-3xl p-8 shadow-sm">

              <h3 className="text-xl font-bold text-blue-900 mb-4">
                James 5:16
              </h3>

              <p className="text-gray-700 italic">
                "The effectual fervent prayer of a righteous man availeth much."
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Global Prayer Team Section */}

      <section className="py-20 px-6 bg-gradient-to-br from-blue-950 to-blue-800 text-white">

        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>

              <Globe
                size={55}
                className="mb-6 text-blue-200"
              />

              <h2 className="text-4xl font-bold mb-6">
                A Global Prayer Family
              </h2>

              <p className="text-blue-100 text-lg leading-relaxed mb-6">

                DLCSF connects believers across nations.
                Our prayer coordinators and brethren around the world
                stand together in faith, lifting every request before God.

              </p>

              <p className="text-blue-100 text-lg leading-relaxed">

                Whether you are on campus, at home, or anywhere around the world,
                you are not alone. We believe God answers prayers.

              </p>

            </div>

            <div className="bg-white/10 rounded-3xl p-8 backdrop-blur">

              <div className="space-y-6">

                <div className="flex items-center gap-4">

                  <Heart
                    className="text-red-300"
                    size={35}
                  />

                  <div>

                    <h3 className="font-bold text-xl">
                      Compassionate Support
                    </h3>

                    <p className="text-blue-100">
                      Every request is handled with love and care.
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <ShieldCheck
                    className="text-green-300"
                    size={35}
                  />

                  <div>

                    <h3 className="font-bold text-xl">
                      Confidential Prayer
                    </h3>

                    <p className="text-blue-100">
                      Your personal information is respected and protected.
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <Globe
                    className="text-yellow-300"
                    size={35}
                  />

                  <div>

                    <h3 className="font-bold text-xl">
                      Worldwide Community
                    </h3>

                    <p className="text-blue-100">
                      Believers joining together across nations.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Prayer FAQ Section */}

      <section className="py-20 px-6 bg-gray-50">

        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12">

            <h2 className="text-4xl font-bold text-blue-950">
              Frequently Asked Questions
            </h2>

          </div>

          <div className="space-y-6">

            <div className="bg-white rounded-2xl p-6 shadow">

              <h3 className="font-bold text-xl text-blue-900 mb-2">
                Who can submit a prayer request?
              </h3>

              <p className="text-gray-600">
                Anyone seeking prayer support can submit a request.
                You do not need to be a DLCSF member.
              </p>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow">

              <h3 className="font-bold text-xl text-blue-900 mb-2">
                Will my request be shared publicly?
              </h3>

              <p className="text-gray-600">

                No. Prayer requests are handled privately by our prayer coordinators.
                You can also choose the anonymous option.

              </p>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow">

              <h3 className="font-bold text-xl text-blue-900 mb-2">
                How quickly will someone pray for me?
              </h3>

              <p className="text-gray-600">

                Our prayer team reviews submitted requests and joins you in prayer
                as soon as possible.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Contact Prayer Coordinators */}

      <section className="py-16 px-6 bg-white">

        <div className="max-w-4xl mx-auto text-center">

          <Phone
            size={50}
            className="mx-auto text-blue-900 mb-5"
          />

          <h2 className="text-3xl font-bold text-blue-950 mb-4">

            Need Immediate Prayer Support?

          </h2>

          <p className="text-gray-600 text-lg mb-6">

            Our prayer coordinators are available to stand with you in faith.

          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-900 text-white px-8 py-3 rounded-full hover:bg-blue-800 transition"
          >

            Contact Prayer Team

          </Link>

        </div>

      </section>

      {/* Final Encouragement Section */}

      <section className="py-20 px-6 bg-gradient-to-r from-blue-900 to-blue-700 text-white">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl md:text-5xl font-bold mb-6">

            God Hears Your Prayer

          </h2>

          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">

            Whatever you are facing today, remember that you can come boldly
            before God. Our prayer family is standing with you in faith.

          </p>

          <div className="bg-white/10 backdrop-blur rounded-3xl p-8">

            <p className="text-2xl italic">

              "The LORD is nigh unto all them that call upon him,
              to all that call upon him in truth."

            </p>

            <p className="mt-4 font-bold">

              Psalm 145:18

            </p>

          </div>

        </div>

      </section>

      {/* Prayer Footer Note */}

      <section className="py-10 bg-gray-900 text-white text-center px-6">

        <p className="text-lg">

          🙏 DLCSF Global Prayer Ministry

        </p>

        <p className="text-gray-400 mt-2">

          Standing together in faith across nations.

        </p>

      </section>

    </main>
  );
}