"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Globe,
  HeartHandshake,
  Camera,
  X,
  CheckCircle,
  Loader2,
  ArrowLeft,
  Save,
  Edit2,  // ← ADD THIS LINE
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    campus: "",
    bio: "",
  });

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        fullName: parsedUser.fullName || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        country: parsedUser.country || "",
        campus: parsedUser.campus || "",
        bio: parsedUser.bio || "",
      });
      // Load profile image from localStorage
      const savedImage = localStorage.getItem(`profileImage_${parsedUser.email}`);
      if (savedImage) {
        setProfileImage(savedImage);
      }
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMessage) setErrorMessage("");
    if (successMessage) setSuccessMessage("");
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result as string;
      setProfileImage(imageData);
      // Save to localStorage
      if (user?.email) {
        localStorage.setItem(`profileImage_${user.email}`, imageData);
      }
      setSuccessMessage('Profile picture updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    if (user?.email) {
      localStorage.removeItem(`profileImage_${user.email}`);
    }
    setSuccessMessage('Profile picture removed');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Update user data
      const updatedUser = {
        ...user,
        ...formData,
        bio: formData.bio,
      };

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      // Try to send to backend
      try {
        const response = await fetch('http://localhost:5000/api/user/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            ...formData,
          }),
        });
        if (response.ok) {
          console.log('✅ Profile updated on server');
        }
      } catch (backendError) {
        console.warn('⚠️ Backend not available, saved locally');
      }

      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (error) {
      console.error('Error saving profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-blue-900" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 transition font-medium"
          >
            Logout
          </button>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
            <CheckCircle size={20} />
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {errorMessage}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-blue-900 to-blue-600 relative">
            <button
              onClick={handleImageClick}
              className="absolute bottom-4 right-4 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition flex items-center gap-2"
            >
              <Camera size={16} />
              Change Cover
            </button>
          </div>

          {/* Profile Picture */}
          <div className="px-6 pb-6 relative">
            <div className="flex justify-between items-start -mt-16">
              <div className="flex items-end gap-4">
                <div className="relative">
                  <div
                    className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden cursor-pointer hover:opacity-80 transition group"
                    onClick={handleImageClick}
                  >
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-4xl font-bold">
                        {formData.fullName?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <Camera size={32} className="text-white" />
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {formData.fullName || 'User'}
                  </h1>
                  <p className="text-gray-500">{formData.email}</p>
                  <div className="flex gap-2 mt-2">
                    {profileImage && (
                      <button
                        onClick={handleRemoveImage}
                        className="text-xs text-red-600 hover:text-red-800 transition"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-900 text-white px-6 py-2 rounded-xl hover:bg-blue-800 transition flex items-center gap-2"
                  >
                    <Edit2 size={18} />
                    Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-70"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Save Changes
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User size={16} className="inline mr-2" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                ) : (
                  <p className="text-gray-800 py-2">{formData.fullName || 'Not set'}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail size={16} className="inline mr-2" />
                  Email Address
                </label>
                <p className="text-gray-800 py-2">{formData.email}</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone size={16} className="inline mr-2" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                ) : (
                  <p className="text-gray-800 py-2">{formData.phone || 'Not set'}</p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Globe size={16} className="inline mr-2" />
                  Country
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                ) : (
                  <p className="text-gray-800 py-2">{formData.country || 'Not set'}</p>
                )}
              </div>

              {/* Campus */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <HeartHandshake size={16} className="inline mr-2" />
                  Campus / Church
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="campus"
                    value={formData.campus}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                ) : (
                  <p className="text-gray-800 py-2">{formData.campus || 'Not set'}</p>
                )}
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio / About Me
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                ) : (
                  <p className="text-gray-800 py-2">{formData.bio || 'No bio yet'}</p>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-900">12</p>
                <p className="text-sm text-gray-500">Prayer Requests</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-900">5</p>
                <p className="text-sm text-gray-500">Events Joined</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-900">180+</p>
                <p className="text-sm text-gray-500">Community Members</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Profile Tips</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Click on your profile picture to upload a photo</li>
            <li>• Add your bio to help others get to know you</li>
            <li>• Keep your contact information up to date</li>
            <li>• Your profile helps connect you with the community</li>
          </ul>
        </div>
      </div>
    </div>
  );
}