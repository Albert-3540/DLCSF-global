'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, ChevronRight } from 'lucide-react';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  type: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  attendees?: number;
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    const mockEvents: Event[] = [
      {
        _id: '1',
        title: 'Sunday Worship Service',
        description: 'Join us for a powerful time of worship and the Word',
        date: '2026-08-04',
        time: '10:00 AM',
        venue: 'Main Auditorium',
        type: 'Service',
        status: 'Upcoming',
        attendees: 150
      },
      {
        _id: '2',
        title: 'Choir Rehearsal',
        description: 'Weekly choir practice session',
        date: '2026-08-06',
        time: '4:00 PM',
        venue: 'Music Hall',
        type: 'Rehearsal',
        status: 'Upcoming',
        attendees: 30
      },
      {
        _id: '3',
        title: 'Campus Fellowship',
        description: 'Weekly fellowship and Bible study',
        date: '2026-08-08',
        time: '6:00 PM',
        venue: 'Student Center',
        type: 'Fellowship',
        status: 'Upcoming',
        attendees: 80
      }
    ];
    setEvents(mockEvents);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">Loading events...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming <span className="text-blue-600">Events</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay connected with our community events and programs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-2">
                    {event.type}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  event.status === 'Upcoming' ? 'bg-green-100 text-green-700' :
                  event.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {event.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{event.description}</p>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>{event.venue}</span>
                </div>
                {event.attendees && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>{event.attendees} attending</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  href={`/events/${event._id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  View Details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/events"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Events
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}