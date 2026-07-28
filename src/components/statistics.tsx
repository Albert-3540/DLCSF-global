"use client";

import { motion } from "framer-motion";
import { Globe, GraduationCap, Users, Church } from "lucide-react";

const stats = [
  {
    icon: Globe,
    number: "180+",
    title: "Countries",
    color: "text-blue-700",
  },
  {
    icon: GraduationCap,
    number: "500+",
    title: "Campuses",
    color: "text-green-600",
  },
  {
    icon: Users,
    number: "25,000+",
    title: "Members",
    color: "text-yellow-500",
  },
  {
    icon: Church,
    number: "1000+",
    title: "Fellowships",
    color: "text-red-500",
  },
];

export default function Statistics() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-gray-900">
            DLCSF Around The World
          </h2>

          <p className="text-gray-500 mt-5 text-lg">
            One fellowship, one vision, impacting lives across nations.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-xl p-10 text-center hover:-translate-y-2 transition"
              >
                <Icon
                  size={55}
                  className={`mx-auto mb-6 ${item.color}`}
                />

                <h2 className="text-5xl font-bold text-blue-900">
                  {item.number}
                </h2>

                <p className="mt-4 text-gray-600 text-lg">
                  {item.title}
                </p>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}