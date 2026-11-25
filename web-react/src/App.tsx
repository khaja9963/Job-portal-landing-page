import ScrollProgress from "@/components/ui/scroll-progress";
import CornerLogo from "@/components/ui/corner-logo";
import PortalHero from "@/components/ui/portal-hero";
import { ReportsDeck } from "@/components/ui/throw-deck";
import ClyptusParallax from "@/components/ui/clyptus-parallax";
import LiveFeatures from "@/components/ui/live-demos";
import StripStage from "@/components/ui/strip-stage";
import { HowItWorks, Features } from "@/components/Sections";
import InterviewSection from "@/components/ui/interview-section";
import TimeCalculator from "@/components/ui/time-calculator";
import { Candidates, Trust, Stats, FAQ, CTA } from "@/components/Sections2";

export default function App() {
  return (
    <main>
      <ScrollProgress />
      <CornerLogo />
      <PortalHero />
      <ClyptusParallax />
      <StripStage />
      <HowItWorks />
      <LiveFeatures />
      <Features />
      <ReportsDeck />
      <InterviewSection />
      <Candidates />
      <Trust />
      <Stats />
      <TimeCalculator />
      <FAQ />
      <CTA />
    </main>
  );
}
