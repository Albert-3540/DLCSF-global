"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  CircleAlert,
  CircleCheck,
  X,
} from "lucide-react";

const prayerRequests = [
  {
    id: 1,
    name: "Albert Oduma",
    email: "albert@email.com",
    phone: "+234 812 345 6789",
    country: "Nigeria",
    campus: "University of Calabar",
    category: "Healing",
    priority: "Urgent",
    status: "Pending",
    date: "31 Jul 2026",
    request:
      "Please pray for my examinations, spiritual growth, and God's direction concerning my future.",
  },
  {
    id: 2,
    name: "Grace A.",
    email: "grace@email.com",
    phone: "+233 555 123456",
    country: "Ghana",
    campus: "University of Ghana",
    category: "Family",
    priority: "Normal",
    status: "Prayed",
    date: "30 Jul 2026",
    request:
      "Please pray for peace, restoration, and salvation in my family.",
  },
  {
    id: 3,
    name: "Daniel K.",
    email: "daniel@email.com",
    phone: "+254 700 123456",
    country: "Kenya",
    campus: "University of Nairobi",
    category: "Thanksgiving",
    priority: "Normal",
    status: "Completed",
    date: "29 Jul 2026",
    request:
      "Thank God with me for answered prayers and His faithfulness.",
  },
];

export default function PrayerRequestsPage() {
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [selectedPrayer, setSelectedPrayer] =
    useState<(typeof prayerRequests)[0] | null>(null);

  const filtered = useMemo(() => {
    return prayerRequests.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.country.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchPriority =
        priority === "All" || item.priority === priority;

      return matchSearch && matchPriority;
    });
  }, [search, priority]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">
            Prayer Requests
          </h1>
          <p className="text-gray-500 mt-2">
            Manage prayer requests from around the world.
          </p>
        </div>
        <button className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800">
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col md:flex-row gap-4">
        <div className="flex items-center border rounded-xl px-4 flex-1">
          <Search size={18} />
          <input
            className="w-full py-3 px-3 outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center border rounded-xl px-4">
          <Filter size={18} />
          <select
            className="py-3 px-2 outline-none bg-transparent"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>All</option>
            <option>Urgent</option>
            <option>Normal</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl border shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Country</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Priority</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4 font-semibold">
                  {item.name}
                </td>
                <td className="p-4">
                  {item.country}
                </td>
                <td className="p-4">
                  {item.category}
                </td>
                <td className="p-4">
                  {item.priority === "Urgent" ? (
                    <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full">
                      <CircleAlert size={15} />
                      Urgent
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                      Normal
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {item.status === "Completed" ? (
                    <span className="inline-flex items-center gap-2 text-green-600">
                      <CircleCheck size={16} />
                      Completed
                    </span>
                  ) : (
                    item.status
                  )}
                </td>
                <td className="p-4">
                  {item.date}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => setSelectedPrayer(item)}
                    className="bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedPrayer && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-5 z-50">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                Prayer Request
              </h2>
              <button
                onClick={() => setSelectedPrayer(null)}
              >
                <X size={30} />
              </button>
            </div>
            <div className="space-y-4">
              <p><strong>Name:</strong> {selectedPrayer.name}</p>
              <p><strong>Email:</strong> {selectedPrayer.email}</p>
              <p><strong>Phone:</strong> {selectedPrayer.phone}</p>
              <p><strong>Country:</strong> {selectedPrayer.country}</p>
              <p><strong>Campus:</strong> {selectedPrayer.campus}</p>
              <p><strong>Category:</strong> {selectedPrayer.category}</p>
              <p><strong>Priority:</strong> {selectedPrayer.priority}</p>
              <p><strong>Status:</strong> {selectedPrayer.status}</p>
              <div className="bg-gray-100 rounded-xl p-5 mt-6">
                <h3 className="font-bold mb-3">
                  Prayer Request
                </h3>
                <p className="leading-8">
                  {selectedPrayer.request}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <button className="bg-blue-700 text-white px-5 py-3 rounded-xl">
                Mark as Prayed
              </button>
              <button className="bg-green-600 text-white px-5 py-3 rounded-xl">
                Mark Completed
              </button>
              <button className="bg-red-600 text-white px-5 py-3 rounded-xl">
                Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}