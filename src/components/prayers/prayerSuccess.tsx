"use client";

import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";

interface Props {
  show: boolean;
}

export default function PrayerSuccess({ show }: Props) {
  if (!show) return null;

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white rounded-3xl shadow-xl max-w-xl w-full p-10 text-center">

        <CheckCircle
          size={90}
          className="mx-auto text-green-600 mb-6"
        />

        <h1 className="text-4xl font-black text-blue-950">

          Prayer Request Submitted

        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">

          Thank you for sharing your prayer request.

          <br />

          Our prayer coordinators will stand with you in faith.

        </p>

        <p className="font-bold text-blue-900 mt-6">

          God bless you.

        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-3 mt-10 bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-800 transition"
        >

          <ArrowLeft size={18} />

          Back Home

        </Link>

      </div>

    </main>
  );
}