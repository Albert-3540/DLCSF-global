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
  Edit2,
  Lock,
  Bell,
  Moon,
  Sun,
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
  LogOut,
  Trash2,
  Palette,
  Languages,
  Globe2,
  Smartphone,
  CreditCard,
  ShieldCheck,
  Users,
  MessageCircle,
  AtSign,
  MapPin,
  Calendar,
  Clock,
  Play,
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Profile Form
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    campus: "",
    bio: "",
    location: "",
    website: "",
    socialMedia: {
      twitter: "",
      instagram: "",
      facebook: "",
      youtube: "",
    },
  });

  // Password Form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    prayerRequestUpdates: true,
    eventReminders: true,
    communityUpdates: false,
    marketingEmails: false,
    pushNotifications: true,
    prayerAlerts: true,
    weeklyDigest: false,
  });

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    showPrayerRequests: true,
    showActivity: true,
  });

  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    fontSize: "medium",
    compactView: false,
    animations: true,
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setProfileForm({
        fullName: parsedUser.fullName || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        country: parsedUser.country || "",
        campus: parsedUser.campus || "",
        bio: parsedUser.bio || "",
        location: parsedUser.location || "",
        website: parsedUser.website || "",
        socialMedia: {
          twitter: parsedUser.socialMedia?.twitter || "",
          instagram: parsedUser.socialMedia?.instagram || "",
          facebook: parsedUser.socialMedia?.facebook || "",
          youtube: parsedUser.socialMedia?.youtube || "",
        },
      });
      const savedImage = localStorage.getItem(`profileImage_${parsedUser.email}`);
      if (savedImage) {
        setProfileImage(savedImage);
      }
      // Load saved settings
      const savedSettings = localStorage.getItem(`settings_${parsedUser.email}`);
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        if (parsedSettings.notifications) setNotificationSettings(parsedSettings.notifications);
        if (parsedSettings.privacy) setPrivacySettings(parsedSettings.privacy);
        if (parsedSettings.appearance) setAppearanceSettings(parsedSettings.appearance);
      }
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileForm((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value,
        },
      }));
    } else {
      setProfileForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if (errorMessage) setErrorMessage("");
    if (successMessage) setSuccessMessage("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setPrivacySettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAppearanceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setAppearanceSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result as string;
      setProfileImage(imageData);
      if (user?.email) {
        localStorage.setItem(`profileImage_${user.email}`, imageData);
      }
      setSuccessMessage('Profile picture updated!');
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

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const updatedUser = {
        ...user,
        ...profileForm,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      // Save all settings
      const allSettings = {
        notifications: notificationSettings,
        privacy: privacySettings,
        appearance: appearanceSettings,
      };
      localStorage.setItem(`settings_${user.email}`, JSON.stringify(allSettings));

      setSuccessMessage('All settings saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (error) {
      console.error('Error saving settings:', error);
      setErrorMessage('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setIsSaving(true);
    try {
      console.log('Password changed for:', user.email);
      setSuccessMessage('Password changed successfully!');
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to change password');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem(`profileImage_${user?.email}`);
      localStorage.removeItem(`settings_${user?.email}`);
      router.push('/login');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 hover:bg-gray-200 rounded-lg transition"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          </div>
          <button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="bg-blue-900 text-white px-6 py-2.5 rounded-xl hover:bg-blue-800 transition flex items-center gap-2 disabled:opacity-70"
          >
            {isSaving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save All Settings
              </>
            )}
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
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
            <AlertCircle size={20} />
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-4">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                  {profileImage ? (
                    <Image src={profileImage} alt="Profile" width={48} height={48} className="w-full h-full object-cover" />
                  ) : (
                    profileForm.fullName?.charAt(0) || 'U'
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{profileForm.fullName}</p>
                  <p className="text-xs text-gray-500">{profileForm.email}</p>
                </div>
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition ${
                    activeTab === "profile"
                      ? "bg-blue-50 text-blue-900 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <User size={18} />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition ${
                    activeTab === "security"
                      ? "bg-blue-50 text-blue-900 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Lock size={18} />
                  Security
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition ${
                    activeTab === "notifications"
                      ? "bg-blue-50 text-blue-900 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Bell size={18} />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition ${
                    activeTab === "privacy"
                      ? "bg-blue-50 text-blue-900 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Shield size={18} />
                  Privacy
                </button>
                <button
                  onClick={() => setActiveTab("appearance")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition ${
                    activeTab === "appearance"
                      ? "bg-blue-50 text-blue-900 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Palette size={18} />
                  Appearance
                </button>
                <button
                  onClick={() => setActiveTab("social")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition ${
                    activeTab === "social"
                      ? "bg-blue-50 text-blue-900 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Users size={18} />
                  Social Links
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition mt-4 pt-4 border-t"
                >
                  <Trash2 size={18} />
                  Delete Account
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Settings</h2>
                  
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6 mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="relative">
                      <div
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-3xl font-bold overflow-hidden cursor-pointer group"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {profileImage ? (
                          <Image src={profileImage} alt="Profile" width={96} height={96} className="w-full h-full object-cover" />
                        ) : (
                          profileForm.fullName?.charAt(0) || 'U'
                        )}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                          <Camera size={24} className="text-white" />
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
                      <p className="font-medium text-gray-800">Profile Photo</p>
                      <p className="text-sm text-gray-500">Click to upload or change</p>
                      {profileImage && (
                        <button
                          onClick={handleRemoveImage}
                          className="text-sm text-red-600 hover:text-red-800 mt-1"
                        >
                          Remove photo
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={profileForm.fullName}
                        onChange={handleProfileChange}
                        className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                        className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={profileForm.country}
                        onChange={handleProfileChange}
                        className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Campus / Church</label>
                      <input
                        type="text"
                        name="campus"
                        value={profileForm.campus}
                        onChange={handleProfileChange}
                        className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={profileForm.location}
                        onChange={handleProfileChange}
                        placeholder="City, State"
                        className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        name="bio"
                        rows={3}
                        value={profileForm.bio}
                        onChange={handleProfileChange}
                        placeholder="Tell us about yourself..."
                        className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Security Settings</h2>
                  <form onSubmit={handleChangePassword}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            name="currentPassword"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full border rounded-xl px-4 py-2.5 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-4 top-2.5 text-gray-400"
                          >
                            {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full border rounded-xl px-4 py-2.5 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                            minLength={6}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-2.5 text-gray-400"
                          >
                            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={passwordForm.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full border rounded-xl px-4 py-2.5 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-2.5 text-gray-400"
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-blue-900 text-white px-6 py-2.5 rounded-xl hover:bg-blue-800 transition disabled:opacity-70"
                      >
                        {isSaving ? <Loader2 size={18} className="animate-spin" /> : "Change Password"}
                      </button>
                    </div>
                  </form>

                  <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                    <div className="flex items-start gap-3">
                      <ShieldCheck size={20} className="text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800">Security Tips</p>
                        <ul className="text-sm text-yellow-700 space-y-1 mt-1">
                          <li>• Use a strong, unique password</li>
                          <li>• Never share your password with anyone</li>
                          <li>• Enable 2FA for extra security (coming soon)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Notification Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-xl">
                      <div>
                        <p className="font-medium text-gray-800">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates via email</p>
                      </div>
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onChange={handleNotificationChange}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-xl">
                      <div>
                        <p className="font-medium text-gray-800">Prayer Request Updates</p>
                        <p className="text-sm text-gray-500">Get notified about prayer requests</p>
                      </div>
                      <input
                        type="checkbox"
                        name="prayerRequestUpdates"
                        checked={notificationSettings.prayerRequestUpdates}
                        onChange={handleNotificationChange}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-xl">
                      <div>
                        <p className="font-medium text-gray-800">Event Reminders</p>
                        <p className="text-sm text-gray-500">Get reminded about upcoming events</p>
                      </div>
                      <input
                        type="checkbox"
                        name="eventReminders"
                        checked={notificationSettings.eventReminders}
                        onChange={handleNotificationChange}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-xl">
                      <div>
                        <p className="font-medium text-gray-800">Push Notifications</p>
                        <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                      </div>
                      <input
                        type="checkbox"
                        name="pushNotifications"
                        checked={notificationSettings.pushNotifications}
                        onChange={handleNotificationChange}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-xl">
                      <div>
                        <p className="font-medium text-gray-800">Weekly Digest</p>
                        <p className="text-sm text-gray-500">Weekly summary of activity</p>
                      </div>
                      <input
                        type="checkbox"
                        name="weeklyDigest"
                        checked={notificationSettings.weeklyDigest}
                        onChange={handleNotificationChange}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === "privacy" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Privacy Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Profile Visibility</label>
                      <select
                        name="profileVisibility"
                        value={privacySettings.profileVisibility}
                        onChange={handlePrivacyChange}
                        className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="public">Public - Everyone can see</option>
                        <option value="members">Members Only - DLCSF members only</option>
                        <option value="private">Private - Only you</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-xl">
                      <div>
                        <p className="font-medium text-gray-800">Show Email</p>
                        <p className="text-sm text-gray-500">Display your email on profile</p>
                      </div>
                      <input
                        type="checkbox"
                        name="showEmail"
                        checked={privacySettings.showEmail}
                        onChange={handlePrivacyChange}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-xl">
                      <div>
                        <p className="font-medium text-gray-800">Show Phone Number</p>
                        <p className="text-sm text-gray-500">Display your phone on profile</p>
                      </div>
                      <input
                        type="checkbox"
                        name="showPhone"
                        checked={privacySettings.showPhone}
                        onChange={handlePrivacyChange}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-xl">
                      <div>
                        <p className="font-medium text-gray-800">Allow Messages</p>
                        <p className="text-sm text-gray-500">Let others send you messages</p>
                      </div>
                      <input
                        type="checkbox"
                        name="allowMessages"
                        checked={privacySettings.allowMessages}
                        onChange={handlePrivacyChange}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-xl">
                      <div>
                        <p className="font-medium text-gray-800">Show Prayer Requests</p>
                        <p className="text-sm text-gray-500">Display your prayer requests publicly</p>
                      </div>
                      <input
                        type="checkbox"
                        name="showPrayerRequests"
                        checked={privacySettings.showPrayerRequests}
                        onChange={handlePrivacyChange}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === "appearance" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Appearance Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          onClick={() => setAppearanceSettings({...appearanceSettings, theme: "light"})}
                          className={`p-4 border rounded-xl text-center transition ${
                            appearanceSettings.theme === "light" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                          }`}
                        >
                          <Sun size={24} className="mx-auto text-yellow-500" />
                          <p className="text-sm mt-1">Light</p>
                        </button>
                        <button
                          onClick={() => setAppearanceSettings({...appearanceSettings, theme: "dark"})}
                          className={`p-4 border rounded-xl text-center transition ${
                            appearanceSettings.theme === "dark" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                          }`}
                        >
                          <Moon size={24} className="mx-auto text-gray-700" />
                          <p className="text-sm mt-1">Dark</p>
                        </button>
                        <button
                          onClick={() => setAppearanceSettings({...appearanceSettings, theme: "system"})}
                          className={`p-4 border rounded-xl text-center transition ${
                            appearanceSettings.theme === "system" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                          }`}
                        >
                          <Smartphone size={24} className="mx-auto text-gray-500" />
                          <p className="text-sm mt-1">System</p>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                      <select
                        name="fontSize"
                        value={appearanceSettings.fontSize}
                        onChange={handleAppearanceChange}
                        className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-xl">
                      <div>
                        <p className="font-medium text-gray-800">Compact View</p>
                        <p className="text-sm text-gray-500">Display more content with less spacing</p>
                      </div>
                      <input
                        type="checkbox"
                        name="compactView"
                        checked={appearanceSettings.compactView}
                        onChange={handleAppearanceChange}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-xl">
                      <div>
                        <p className="font-medium text-gray-800">Animations</p>
                        <p className="text-sm text-gray-500">Enable smooth animations and transitions</p>
                      </div>
                      <input
                        type="checkbox"
                        name="animations"
                        checked={appearanceSettings.animations}
                        onChange={handleAppearanceChange}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Social Links Tab */}
              {activeTab === "social" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Social Links</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Globe2 size={16} className="inline mr-2" />
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={profileForm.website}
                        onChange={handleProfileChange}
                        placeholder="https://yourwebsite.com"
                        className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <AtSign size={16} className="inline mr-2" />
                        Twitter / X
                      </label>
                      <input
                        type="text"
                        name="socialMedia.twitter"
                        value={profileForm.socialMedia.twitter}
                        onChange={handleProfileChange}
                        placeholder="@username"
                        className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Camera size={16} className="inline mr-2" />
                        Instagram
                      </label>
                      <input
                        type="text"
                        name="socialMedia.instagram"
                        value={profileForm.socialMedia.instagram}
                        onChange={handleProfileChange}
                        placeholder="@username"
                        className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Users size={16} className="inline mr-2" />
                        Facebook
                      </label>
                      <input
                        type="text"
                        name="socialMedia.facebook"
                        value={profileForm.socialMedia.facebook}
                        onChange={handleProfileChange}
                        placeholder="username"
                        className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Play size={16} className="inline mr-2" />
                        YouTube
                      </label>
                      <input
                        type="text"
                        name="socialMedia.youtube"
                        value={profileForm.socialMedia.youtube}
                        onChange={handleProfileChange}
                        placeholder="channel name"
                        className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}