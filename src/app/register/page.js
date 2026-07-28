import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-700 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}