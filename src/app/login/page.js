export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          DLCSF Portal Login
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Login
          </button>
        </form>

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