"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, X, CheckCircle, Loader2 } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Global Prayer Conference 2026",
    date: "December 15-17, 2026",
    time: "9:00 AM - 5:00 PM",
    location: "Virtual & In-Person",
    description: "Join us for three days of powerful prayer, worship, and spiritual breakthrough.",
    category: "Conference",
  },
  {
    id: 2,
    title: "Campus Fellowship Night",
    date: "Every Friday",
    time: "6:00 PM - 8:00 PM",
    location: "Various Campuses",
    description: "Weekly fellowship gathering for students and young adults.",
    category: "Fellowship",
  },
  {
    id: 3,
    title: "Global Mission Outreach",
    date: "January 10-20, 2027",
    time: "8:00 AM - 6:00 PM",
    location: "Multiple Locations",
    description: "Mission trip across nations to share the gospel and serve communities.",
    category: "Mission",
  },
  {
    id: 4,
    title: "Worship Night",
    date: "November 25, 2026",
    time: "7:00 PM - 9:00 PM",
    location: "Main Auditorium",
    description: "An evening of worship, praise, and seeking God's presence.",
    category: "Worship",
  },
  {
    id: 5,
    title: "Leadership Retreat 2027",
    date: "February 5-7, 2027",
    time: "10:00 AM - 4:00 PM",
    location: "Conference Center",
    description: "Leadership development and spiritual growth retreat for ministry leaders.",
    category: "Retreat",
  },
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    church: "",
    message: "",
  });

  const categories = ["All", ...new Set(events.map(event => event.category))];

  const filteredEvents = selectedCategory === "All"
    ? events
    : events.filter(event => event.category === selectedCategory);

  const handleRegisterClick = (event: typeof events[0]) => {
    setSelectedEvent(event);
    setShowRegistration(true);
    setRegistrationSuccess(false);
    setErrorMessage("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      church: "",
      message: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim()) {
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

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Prepare the registration data
      const registrationData = {
        eventId: selectedEvent?.id,
        eventTitle: selectedEvent?.title,
        eventDate: selectedEvent?.date,
        eventLocation: selectedEvent?.location,
        eventTime: selectedEvent?.time,
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        church: formData.church,
        message: formData.message,
        registeredAt: new Date().toISOString(),
      };

      console.log("📝 Registration Data:", registrationData);

      // Try to send to backend
      try {
        const response = await fetch('http://localhost:5000/api/events/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData),
        });

        if (!response.ok) {
          throw new Error('Backend server error');
        }

        const result = await response.json();
        console.log('✅ Registration successful:', result);
      } catch (backendError) {
        // If backend fails, still show success (for demo purposes)
        console.warn('⚠️ Backend not available, but registration data saved locally');
        console.log('📝 Registration data would be sent to backend:', registrationData);
        
        // Store in localStorage as fallback
        try {
          const existingRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
          existingRegistrations.push({
            ...registrationData,
            registeredAt: new Date().toISOString(),
          });
          localStorage.setItem('eventRegistrations', JSON.stringify(existingRegistrations));
          console.log('💾 Registration saved locally');
        } catch (storageError) {
          console.warn('Could not save to localStorage');
        }
      }

      // Show success regardless of backend
      setRegistrationSuccess(true);
      setIsSubmitting(false);

      setTimeout(() => {
        setShowRegistration(false);
        setRegistrationSuccess(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          church: "",
          message: "",
        });
      }, 3000);

    } catch (error) {
      console.error("❌ Registration error:", error);
      setErrorMessage("Registration failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Calendar size={60} className="mx-auto text-yellow-400 mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Events</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join us for powerful gatherings, conferences, and fellowship opportunities
            across the globe.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition ${
                  selectedCategory === category
                    ? "bg-blue-900 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col"
              >
                <div className="h-48 bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center">
                  <Calendar size={48} className="text-white/30" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                      {event.category}
                    </span>
                    <span className="text-gray-400 text-sm">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1">
                    {event.description}
                  </p>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRegisterClick(event)}
                    className="w-full bg-blue-900 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-800 transition flex items-center justify-center gap-2"
                  >
                    Register Now <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No events found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Registration Modal */}
      {showRegistration && selectedEvent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {registrationSuccess ? (
              // Success Message
              <div className="p-8 text-center">
                <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Registration Successful! 🎉
                </h2>
                <p className="text-gray-600 mb-2">
                  You have successfully registered for:
                </p>
                <p className="font-semibold text-blue-900 text-lg mb-6">
                  {selectedEvent.title}
                </p>
                <p className="text-gray-500 text-sm">
                  We will send you more details via email shortly.
                </p>
                <button
                  onClick={() => setShowRegistration(false)}
                  className="mt-6 bg-blue-900 text-white px-8 py-3 rounded-xl hover:bg-blue-800 transition"
                >
                  Close
                </button>
              </div>
            ) : (
              // Registration Form
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">Register for Event</h2>
                    <p className="text-gray-500 mt-1">{selectedEvent.title}</p>
                  </div>
                  <button
                    onClick={() => setShowRegistration(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                  >
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-blue-600" />
                      <span className="font-medium">{selectedEvent.date}</span>
                    </div>
                    <span className="text-gray-400 hidden sm:inline">|</span>
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-blue-600" />
                      <span className="font-medium">{selectedEvent.time}</span>
                    </div>
                    <span className="text-gray-400 hidden sm:inline">|</span>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-blue-600" />
                      <span className="font-medium">{selectedEvent.location}</span>
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmitRegistration} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Church / Organization
                    </label>
                    <input
                      type="text"
                      name="church"
                      value={formData.church}
                      onChange={handleInputChange}
                      placeholder="Enter your church or organization"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requests / Questions
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Any special requests or questions..."
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowRegistration(false)}
                      className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-blue-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Register Now <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Note about backend */}
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p className="text-xs text-yellow-700">
                    💡 Registration data is saved locally. Backend connection will be added soon.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}