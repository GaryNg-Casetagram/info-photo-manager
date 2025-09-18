import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ClaimForm } from "./components/ClaimForm";
import { TrackingSection } from "./components/TrackingSection";
import { SupportSection } from "./components/SupportSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ClaimForm />
      <TrackingSection />
      <SupportSection />
      <Footer />
    </div>
  );
}