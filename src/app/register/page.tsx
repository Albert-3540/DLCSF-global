"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Globe, Users } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [fellowship, setFellowship] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            country,
            fellowship,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Registration successful. Redirecting...");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌍</div>

          <h1 className="text-4xl font-bold text-yellow-400">
            Create Your Account
          </h1>

          <p className="text-gray-300 mt-3">
            Join the DLCSF Global community.
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          {/* Name */}
          <div>
            <label className="text-white block mb-2">
              Full Name
            </label>

            <div className="relative">
              <User
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
              />

              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white/20 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-300 outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-white block mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
              />

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/20 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-300 outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="text-white block mb-2">
              Country
            </label>

            <div className="relative">
              <Globe
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
              />

              <input
                type="text"
                placeholder="Nigeria"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full bg-white/20 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-300 outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          {/* Fellowship */}
          <div>
            <label className="text-white block mb-2">
              Fellowship
            </label>

            <div className="relative">
              <Users
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
              />

              <input
                type="text"
                placeholder="DLCSF University of Calabar"
                value={fellowship}
                onChange={(e) => setFellowship(e.target.value)}
                required
                className="w-full bg-white/20 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-300 outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-white block mb-2">
              Password
            </label>

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/20 border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-300 outline-none focus:border-yellow-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-white block mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
              />

              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-white/20 border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-300 outline-none focus:border-yellow-400"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showConfirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-blue-950 py-3 rounded-xl font-bold hover:bg-yellow-300 transition disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {message && (
          <div className="mt-6 bg-white/10 rounded-xl p-4 text-center text-white">
            {message}
          </div>
        )}

        <p className="text-center text-gray-300 mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-yellow-400 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>

      </div>

    </main>
  );
}