import Navbar from "@/components/Navbar";
import SocialRail from "@/components/SocialRail";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingAmbience from "@/components/FloatingAmbience";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Craft from "@/components/Craft";
import Contact from "@/components/Contact";
import ClassicalPiano from "@/components/ClassicalPiano";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <FloatingAmbience />
      <Navbar />
      <SocialRail />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Craft />
      <Contact />
      <ClassicalPiano />
      <Footer />
    </main>
  );
}
