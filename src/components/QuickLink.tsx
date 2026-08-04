'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Home, Users, Music, Calendar, Video,
  BookOpen, MessageCircle, Heart
} from 'lucide-react';

export default function QuickLinks() {
  const quickLinks = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Users, label: 'Members', href: '/members' },
    { icon: Music, label: 'Choir', href: '/choir' },
    { icon: Calendar, label: 'Events', href: '/events' },
    { icon: Video, label: 'Live Stream', href: '/live' },
    { icon: BookOpen, label: 'Sermons', href: '/sermons' },
    { icon: MessageCircle, label: 'Prayer', href: '/prayer' },
    { icon: Heart, label: 'Give', href: '/give' },
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quick Links</h2>
          <p className="text-gray-600">Navigate to different sections of the portal</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors flex items-center justify-center mb-2">
                    <Icon className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}