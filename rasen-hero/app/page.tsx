import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { OceanBackground } from "@/components/layout/OceanBackground";
import CustomerStories from "@/components/sections/CustomerStories";
import { Hero } from "@/components/sections/Hero";
import HowRasenWorks from "@/components/sections/HowRasenWorks";
import { ProductOverview } from "@/components/sections/ProductOverview";
import VoiceAISection from "@/components/sections/VoiceAISection";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* =====================================================
          HERO + PRODUCT OVERVIEW BACKGROUND
          ===================================================== */}
      <section className="relative">
        <OceanBackground />

        <Header />

        <Hero />

        <ProductOverview />
      </section>

      {/* =====================================================
          REST OF PAGE
          ===================================================== */}

      <VoiceAISection />

      <CustomerStories />

      <HowRasenWorks />

      <Footer />
    </main>
  );
}