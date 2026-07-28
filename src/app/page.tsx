import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import AboutSection from "@/components/AboutSection";
import GlobalImpact from "@/components/GlobalImpact";
import SermonsSection from "@/components/SermonsSection";
import EventsSection from "@/components/EventsSection";
import PrayerSection from "@/components/PrayerSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutSection />
      <GlobalImpact />
      <SermonsSection />
      <EventsSection />
      <PrayerSection />
      <GallerySection />
      <TestimonialsSection />
      <Newsletter />
    </>
  );
}