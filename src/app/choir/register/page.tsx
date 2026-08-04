"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, User, Mail, Phone, MapPin, 
  Music, Mic, Calendar, Award, CheckCircle,
  Loader2, AlertCircle, ChevronRight,
  Users, Church, BookOpen, Heart
} from 'lucide-react';

export default function ChoirRegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    voicePart: '',
    campus: '',
    state: '',
    country: '',
    experienceLevel: '',
    musicalSkills: [] as string[],
    availability: {
      days: [] as string[],
      timePreference: ''
    },
    rehearsalSchedule: {
      day: '',
      time: '',
      venue: ''
    },
    testimony: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const voiceParts = [
    'Soprano', 'Alto', 'Tenor', 'Bass', 'Soloist', 'Instrumentalist'
  ];

  const experienceLevels = [
    'Beginner', 'Intermediate', 'Advanced', 'Professional'
  ];

  const musicalSkillsOptions = [
    'Vocal', 'Piano', 'Guitar', 'Drums', 'Bass Guitar', 'Keyboard', 'Other'
  ];

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const timePreferences = [
    'Morning', 'Afternoon', 'Evening', 'Any'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleArrayField = (field: string, value: string) => {
    setFormData(prev => {
      const current = prev[field as keyof typeof prev] as string[];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const handleAvailabilityDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        days: prev.availability.days.includes(day)
          ? prev.availability.days.filter(d => d !== day)
          : [...prev.availability.days, day]
      }
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.voicePart) newErrors.voicePart = 'Please select your voice part';
    if (!formData.campus) newErrors.campus = 'Campus is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.experienceLevel) newErrors.experienceLevel = 'Please select your experience level';
    if (formData.musicalSkills.length === 0) newErrors.musicalSkills = 'Select at least one musical skill';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.error-text');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setLoading(true);

    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      setSuccess(true);
      setTimeout(() => {
        router.push('/choir');
      }, 3000);
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Registration Successful! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Welcome to the DLCSF Global Choir Ministry! You will receive a confirmation email shortly.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/choir"
              className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              Go to Choir Dashboard
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/choir"
            className="inline-flex items-center text-gray-600 hover:text-purple-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Choir
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg shadow-purple-200">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Join the Choir
              </h1>
              <p className="text-gray-600 mt-1">
                Use your musical talent to worship God and minister to others
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 px-4">
          {['Personal Info', 'Musical Details', 'Availability', 'Submit'].map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  index === 0 ? 'bg-purple-600 text-white' :
                  index === 1 ? 'bg-purple-200 text-purple-700' :
                  index === 2 ? 'bg-purple-100 text-purple-600' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {index + 1}
                </div>
                <span className="text-xs mt-1 text-gray-600 hidden sm:block">{step}</span>
              </div>
              {index < 3 && (
                <div className="w-8 sm:w-16 h-0.5 bg-gray-300 mx-2">
                  <div className={`h-full ${index === 0 ? 'bg-purple-600 w-full' : 'bg-gray-300 w-0'}`} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1 error-text">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1 error-text">{errors.lastName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 error-text">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter phone number"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1 error-text">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campus *
                  </label>
                  <input
                    type="text"
                    name="campus"
                    value={formData.campus}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${
                      errors.campus ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter campus"
                  />
                  {errors.campus && (
                    <p className="text-red-500 text-sm mt-1 error-text">{errors.campus}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter state"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1 error-text">{errors.state}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${
                      errors.country ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter country"
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1 error-text">{errors.country}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Musical Details */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Music className="w-5 h-5 text-purple-600" />
                Musical Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Voice Part *
                  </label>
                  <select
                    name="voicePart"
                    value={formData.voicePart}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${
                      errors.voicePart ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select voice part</option>
                    {voiceParts.map(part => (
                      <option key={part} value={part}>{part}</option>
                    ))}
                  </select>
                  {errors.voicePart && (
                    <p className="text-red-500 text-sm mt-1 error-text">{errors.voicePart}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Level *
                  </label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${
                      errors.experienceLevel ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  {errors.experienceLevel && (
                    <p className="text-red-500 text-sm mt-1 error-text">{errors.experienceLevel}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Musical Skills * (Select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {musicalSkillsOptions.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleArrayField('musicalSkills', skill)}
                      className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        formData.musicalSkills.includes(skill)
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                {errors.musicalSkills && (
                  <p className="text-red-500 text-sm mt-1 error-text">{errors.musicalSkills}</p>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Availability
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleAvailabilityDay(day)}
                        className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                          formData.availability.days.includes(day)
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Preference
                  </label>
                  <select
                    name="availability.timePreference"
                    value={formData.availability.timePreference}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      availability: { ...prev.availability, timePreference: e.target.value }
                    }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  >
                    <option value="">Select time preference</option>
                    {timePreferences.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Rehearsal Schedule */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Music className="w-5 h-5 text-purple-600" />
                Rehearsal Schedule
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Day
                  </label>
                  <select
                    value={formData.rehearsalSchedule.day}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      rehearsalSchedule: { ...prev.rehearsalSchedule, day: e.target.value }
                    }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  >
                    <option value="">Select day</option>
                    {daysOfWeek.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 4:00 PM"
                    value={formData.rehearsalSchedule.time}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      rehearsalSchedule: { ...prev.rehearsalSchedule, time: e.target.value }
                    }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Venue
                  </label>
                  <input
                    type="text"
                    placeholder="Enter venue"
                    value={formData.rehearsalSchedule.venue}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      rehearsalSchedule: { ...prev.rehearsalSchedule, venue: e.target.value }
                    }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            {/* Testimony */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-600" />
                Share Your Testimony (Optional)
              </h2>
              <textarea
                name="testimony"
                value={formData.testimony}
                onChange={handleChange}
                rows={3}
                placeholder="Share a brief testimony of how God has been working in your life through music..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
              />
            </div>

            {/* Terms */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label className="text-sm text-gray-700">
                  I agree to commit to the choir ministry, attend rehearsals regularly, 
                  and use my talent for God's glory. I understand that this is a voluntary 
                  service to the Lord.
                  {errors.agreeTerms && (
                    <p className="text-red-500 text-sm mt-1 error-text">{errors.agreeTerms}</p>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <Music className="w-5 h-5" />
                  Register for Choir
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}