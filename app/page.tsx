import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] transition-colors duration-400">
      {/* Floating Pill Navbar with Active Spy */}
      <Navbar />

      {/* Main Single-Page Editorial Flow */}
      <main className="flex-1 w-full">
        {/* 1. Hero with 3D Shader, Rotating Ticker, Parallax Portrait & Chips */}
        <HeroSection />

        {/* 2. About with Word-by-Word Scroll Scrubbed Reveal & Metric Stats */}
        <AboutSection />

        {/* 3. Skills with Dual-Direction Velocity Marquee & Bento Glow Cards */}
        <SkillsSection />

        {/* 4. Projects Showcase with 3D Tilt, Browser Frames & Screenshots */}
        <ProjectsSection />

        {/* 5. Education & Journey with Self-Drawing Scroll Timeline */}
        <JourneySection />

        {/* 6. Availability & Production Capabilities */}
        <ServicesSection />

        {/* 7. Contact Section with Magnetic Email, Inquiries, Resume Download */}
        <ContactSection />
      </main>

      {/* Footer with Surat Live Clock, Quick Nav & Back-to-Top */}
      <Footer />
    </div>
  );
}
