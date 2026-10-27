import BackgroundCanvas from "@/components/BackgroundCanvas";
import Header from "@/components/Header";
import SideRails from "@/components/SideRails";
import Hero from "@/components/Hero";
import Assistant from "@/components/Assistant";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <BackgroundCanvas />
      <Header />
      <SideRails />
      <main id="content">
        <Hero />
        <Assistant />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
