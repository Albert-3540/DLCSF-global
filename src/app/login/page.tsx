"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);

        setMessage("✅ Login successful");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

        <div className="text-center mb-8">

          <div className="text-6xl mb-4">
            🌍
          </div>

          <h1 className="text-4xl font-bold text-yellow-400">
            Welcome Back
          </h1>

          <p className="text-gray-300 mt-3">
            Sign in to your DLCSF Global account.
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          <div>

            <label className="block mb-2 text-white">
              Email Address
            </label>

            <div className="relative">

              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={20}
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/20 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-yellow-400"
              />

            </div>

          </div>

          <div>

            <label className="block mb-2 text-white">
              Password
            </label>

            <div className="relative">

              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={20}
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/20 rounded-xl pl-12 pr-12 py-3 outline-none focus:border-yellow-400"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          <div className="flex justify-end">

            <Link
              href="/forgot-password"
              className="text-yellow-300 hover:text-yellow-200 text-sm"
            >
              Forgot Password?
            </Link>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-blue-950 py-3 rounded-xl font-bold hover:bg-yellow-300 transition disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        {message && (
          <div className="mt-6 text-center bg-white/10 rounded-xl p-3 text-white">
            {message}
          </div>
        )}

        <p className="text-center mt-8 text-gray-300">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-yellow-400 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </main>
  );
}