import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Suppliers } from "@/components/Suppliers";
import { Gallery } from "@/components/Gallery";
import { BlogPreview } from "@/components/BlogPreview";
import { CtaBanner } from "@/components/CtaBanner";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Suppliers />
        <Gallery />
        <BlogPreview />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
