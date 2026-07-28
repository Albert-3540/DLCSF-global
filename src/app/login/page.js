"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

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
        setMessage("Login successful");

        // save token
        localStorage.setItem("token", data.token);

        // redirect after login
        window.location.href = "/";
      } else {
        setMessage(data.message || "Login failed");
      }

    } catch (error) {
      setMessage("Server connection failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-6">
          DLCSF Portal Login
        </h1>

        <form 
          onSubmit={handleLogin}
          className="space-y-4"
        >

          <div>
            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>


          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>


          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Login
          </button>

        </form>


        {message && (
          <p className="text-center mt-4 text-blue-700">
            {message}
          </p>
        )}


        <p className="text-center mt-5">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-700 font-semibold">
            Register
          </a>
        </p>

      </div>
    </main>
  );
}