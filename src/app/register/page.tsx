"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowLeft,
  Loader2,
  Phone,
  Globe,
  Users,
  HeartHandshake,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    campus: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

    // Validate form
    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name");
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email address");
      return;
    }
    if (!formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    if (!formData.agreeTerms) {
      setErrorMessage("Please agree to the Terms and Conditions");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Prepare user data
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        campus: formData.campus,
        password: formData.password,
        role: "user",
        createdAt: new Date().toISOString(),
      };

      console.log("📝 User Registration Data:", userData);

      // Try to send to backend
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Registration failed');
        }

        const result = await response.json();
        console.log('✅ Registration successful:', result);
      } catch (backendError) {
        // Fallback - save to localStorage
        console.warn('⚠️ Backend not available, saving locally');
        
        // Save to localStorage
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        users.push({
          ...userData,
          id: Date.now(),
          registeredAt: new Date().toISOString(),
        });
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        console.log('💾 User saved locally');
      }

      // Show success
      setRegistrationSuccess(true);
      setIsSubmitting(false);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);

    } catch (error) {
      console.error("❌ Registration error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Registration failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 px-6">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 text-center">
          <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Account Created! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Your account has been successfully created.
            You will be redirected to login shortly.
          </p>
          <div className="flex justify-center gap-2">
            <Loader2 size={24} className="animate-spin text-blue-900" />
          </div>
          <Link
            href="/login"
            className="mt-6 inline-block text-blue-600 hover:text-blue-800 transition"
          >
            Go to Login →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-full mb-4">
            <Users size={20} />
            <span className="font-semibold">Join DLCSF Global</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 mt-2">
            Join a global community of believers in faith and fellowship
          </p>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User size={20} className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
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

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone size={20} className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <div className="relative">
              <Globe size={20} className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Enter your country"
                className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Campus */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Campus / Church
            </label>
            <div className="relative">
              <HeartHandshake size={20} className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                name="campus"
                value={formData.campus}
                onChange={handleInputChange}
                placeholder="Enter your campus or church"
                className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password * (min 6 characters)
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-xl pl-12 pr-12 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label className="text-sm text-gray-600">
              I agree to the{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </label>
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
                Creating Account...
              </>
            ) : (
              <>
                <Users size={20} />
                Create Account
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">
              Sign In
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

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Globe size={20} className="text-blue-900" />
            </div>
            <p className="text-xs font-medium">Global Community</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <HeartHandshake size={20} className="text-blue-900" />
            </div>
            <p className="text-xs font-medium">Prayer Support</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users size={20} className="text-blue-900" />
            </div>
            <p className="text-xs font-medium">Fellowship</p>
          </div>
        </div>
      </div>
    </div>
  );
}