"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface PrayerFormProps {
  onSuccess: () => void;
}

export default function PrayerForm({
  onSuccess,
}: PrayerFormProps) {
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

    // Later this will send data to Express + MongoDB
    onSuccess();
  };

  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-5xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >

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
                  Phone Number (Optional)
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
                <option>Academics</option>
                <option>Thanksgiving</option>
                <option>Finances</option>
                <option>Deliverance</option>
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
                placeholder="Type your prayer request here..."
              />

            </div>

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                id="anonymous"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleChange}
              />

              <label htmlFor="anonymous">
                Keep my request anonymous
              </label>

            </div>

            <div>

              <p className="font-semibold mb-3">
                Priority
              </p>

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
  );
}