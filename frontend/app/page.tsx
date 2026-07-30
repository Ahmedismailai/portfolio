import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import WorkWith from "@/components/WorkWith";
import AboutMe from "@/components/AboutMe";
import ParticleBackground from "@/components/ParticleBackground";
import MouseGlow from "@/components/MouseGlow";
import { HomeDataProvider } from "@/contex/HomeDataContext";

// Dynamic imports for below-the-fold components to reduce initial JS payload
const Skills = dynamic(() => import("@/components/Skills"));
const FeaturedProjects = dynamic(() => import("@/components/FeaturedProjects"));
const Blog = dynamic(() => import("@/components/Blog"));
const Experience = dynamic(() => import("@/components/Experience"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Services = dynamic(() => import("@/components/Services"));
const Contact = dynamic(() => import("@/components/Contact"));
const CTAFooter = dynamic(() => import("@/components/CTAFooter"));

export default function Home() {
  return (
    <HomeDataProvider>
      <main className="homepage-content relative isolate overflow-hidden bg-transparent text-black dark:text-white">
        <MouseGlow />
        <ParticleBackground />
        <Navbar />
        <Hero />
        <WorkWith />
        <AboutMe />
        <Skills />
        <FeaturedProjects />
        <Blog />
        <Experience />
        <Testimonials />
        <Services />
        <Contact />
        <CTAFooter />
      </main>
    </HomeDataProvider>
  );
}
