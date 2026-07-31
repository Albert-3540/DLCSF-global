"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email");
      return;
    }
    if (!formData.password.trim()) {
      setErrorMessage("Please enter your password");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };

      console.log("🔐 Login attempt:", loginData);

      // Try to login via backend
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });

        if (!response.ok) {
          throw new Error('Invalid credentials');
        }

        const result = await response.json();
        console.log('✅ Login successful:', result);
        
        // Store user session
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
      } catch (backendError) {
        // Fallback - check localStorage
        console.warn('⚠️ Backend not available, checking local storage');
        
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);
        
        if (!user) {
          throw new Error('Invalid email or password');
        }
        
        console.log('✅ Local login successful:', user);
        localStorage.setItem('user', JSON.stringify(user));
      }

      // Redirect to dashboard
      router.push('/dashboard');

    } catch (error) {
      console.error("❌ Login error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Login failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-full mb-4">
            <User size={20} />
            <span className="font-semibold">Welcome Back</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
          <p className="text-gray-500 mt-2">
            Welcome back! Please sign in to continue
          </p>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-xl pl-12 pr-12 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-900 text-white py-3.5 rounded-xl font-bold hover:bg-blue-800 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <User size={20} />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 font-semibold hover:underline">
              Create Account
            </Link>
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-4 text-gray-500 hover:text-gray-700 transition"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}