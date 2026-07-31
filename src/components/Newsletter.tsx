"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Newsletter subscription feature coming soon!");

    setEmail("");
  };

  return (
    <section className="bg-gradient-to-r from-yellow-400 to-yellow-300 py-24">

      <div className="max-w-5xl mx-auto px-6 text-center">

        <Mail
          size={60}
          className="mx-auto text-blue-950"
        />

        <h2 className="text-5xl font-black text-blue-950 mt-8">
          Stay Connected
        </h2>

        <p className="text-blue-900 text-lg mt-6 leading-8 max-w-3xl mx-auto">
          Subscribe to receive updates about conferences,
          prayer meetings, devotionals, and global fellowship news.
        </p>

        <form
          onSubmit={subscribe}
          className="flex flex-col md:flex-row gap-4 mt-10"
        >

          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="flex-1 rounded-full px-6 py-4 outline-none text-black"
          />

          <button
            className="bg-blue-950 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-900 transition flex items-center justify-center gap-2"
          >
            Subscribe

            <Send size={18}/>

          </button>

        </form>

      </div>

    </section>
  );
}