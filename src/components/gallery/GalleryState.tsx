"use client";

import { Camera, Globe, Users, Heart } from "lucide-react";

const stats = [
  {
    icon: Camera,
    value: "5,000+",
    label: "Ministry Photos",
  },
  {
    icon: Globe,
    value: "180+",
    label: "Countries",
  },
  {
    icon: Users,
    value: "10,000+",
    label: "Students & Corps Members",
  },
  {
    icon: Heart,
    value: "24/7",
    label: "Prayer Support",
  },
];

export default function GalleryStats() {
  return (
    <section className="bg-blue-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">
            Our Global Impact
          </h2>

          <p className="mt-4 text-blue-100 max-w-3xl mx-auto">
            Every image represents lives transformed, fellowships strengthened,
            and God's faithfulness across campuses and nations.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-sm transition hover:-translate-y-2 hover:bg-white/20"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-blue-950">
                  <Icon size={30} />
                </div>

                <h3 className="text-4xl font-extrabold">
                  {stat.value}
                </h3>

                <p className="mt-3 text-blue-100">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}