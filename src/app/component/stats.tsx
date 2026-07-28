"use client";

import { Globe2, Users, GraduationCap, Church } from "lucide-react";

const stats = [
  {
    icon: Globe2,
    number: "180+",
    title: "Countries",
    description: "Building one united fellowship across the nations.",
  },
  {
    icon: GraduationCap,
    number: "800+",
    title: "Campuses",
    description: "Reaching students on campuses around the world.",
  },
  {
    icon: Users,
    number: "50K+",
    title: "Members",
    description: "Students, graduates, and professionals growing together.",
  },
  {
    icon: Church,
    number: "1 Vision",
    title: "Mission",
    description: "Preparing lives for Christ and impacting the world.",
  },
];

export default function Stats() {
  return (
    <section className="bg-gradient-to-b from-blue-900 to-blue-950 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="bg-yellow-400 text-blue-950 px-5 py-2 rounded-full font-semibold">
            Global Impact
          </span>

          <h2 className="text-5xl font-black text-white mt-6">
            Transforming Lives Around The World
          </h2>

          <p className="mt-6 text-gray-300 max-w-3xl mx-auto text-lg">
            Through evangelism, discipleship, leadership development,
            campus fellowships, and prayer, DLCSF Global continues to
            impact lives across continents.
          </p>

        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  group
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/20
                  rounded-3xl
                  p-8
                  hover:-translate-y-3
                  hover:border-yellow-400
                  transition-all
                  duration-300
                  shadow-xl
                "
              >
                <div className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-yellow-400
                  text-blue-950
                  flex
                  items-center
                  justify-center
                  group-hover:scale-110
                  transition
                ">
                  <Icon size={34} />
                </div>

                <h3 className="text-5xl font-black text-yellow-400 mt-8">
                  {item.number}
                </h3>

                <h4 className="text-2xl font-bold text-white mt-3">
                  {item.title}
                </h4>

                <p className="text-gray-300 mt-5 leading-7">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}