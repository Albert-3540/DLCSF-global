"use client";

import { Globe, Users, HeartHandshake, BookOpen } from "lucide-react";

export default function Counter() {
  const stats = [
    {
      icon: <Globe size={35} />,
      number: "180+",
      title: "Countries",
      description: "Global reach across nations",
    },

    {
      icon: <Users size={35} />,
      number: "10,000+",
      title: "Students",
      description: "Connected believers worldwide",
    },

    {
      icon: <HeartHandshake size={35} />,
      number: "500+",
      title: "Fellowships",
      description: "Christian communities globally",
    },

    {
      icon: <BookOpen size={35} />,
      number: "1,000+",
      title: "Bible Studies",
      description: "Growing through God's Word",
    },
  ];

  return (
    <section className="bg-white py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">


          {stats.map((stat, index) => (

            <div
              key={index}
              className="
              bg-blue-950
              text-white
              rounded-3xl
              p-8
              shadow-xl
              hover:-translate-y-2
              transition
              "
            >

              <div className="text-yellow-400">
                {stat.icon}
              </div>


              <h2 className="text-5xl font-black mt-6 text-yellow-400">
                {stat.number}
              </h2>


              <h3 className="text-2xl font-bold mt-3">
                {stat.title}
              </h3>


              <p className="text-gray-300 mt-3">
                {stat.description}
              </p>


            </div>

          ))}


        </div>

      </div>

    </section>
  );
}