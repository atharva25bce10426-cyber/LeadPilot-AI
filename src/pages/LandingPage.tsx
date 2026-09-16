import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { SocialProof } from '../components/SocialProof';
import { ProblemSection } from '../components/ProblemSection';
import { HowItWorks } from '../components/HowItWorks';
import { AiAgentSection } from '../components/AiAgentSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { UseCasesSection } from '../components/UseCasesSection';
import { ResultsDashboard } from '../components/ResultsDashboard';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { PricingSection } from '../components/PricingSection';
import { FaqSection } from '../components/FaqSection';
import { FinalCtaSection } from '../components/FinalCtaSection';
import { Footer } from '../components/Footer';
import { OnboardingModal } from '../components/OnboardingModal';
import { LoginModal } from '../components/LoginModal';

export const LandingPage: React.FC = () => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('Dental Clinics');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleOpenGetStarted = (industryPreset?: string) => {
    if (industryPreset) {
      setSelectedIndustry(industryPreset);
    }
    setIsOnboardingOpen(true);
  };

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (planName: string) => {
    showToast(`Selected the ${planName} plan. Initializing your local agent workspace...`);
    setIsOnboardingOpen(true);
  };

  const handleLoginSuccess = () => {
    showToast('Successfully signed in to your LeadPilot command center!');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Top Navbar */}
      <Navbar
        onOpenGetStarted={() => handleOpenGetStarted()}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      <main>
        {/* 1. Hero Section */}
        <HeroSection
          onOpenGetStarted={() => handleOpenGetStarted()}
          onScrollToHowItWorks={handleScrollToHowItWorks}
        />

        {/* 2. Social Proof */}
        <SocialProof />

        {/* 3. Problem Section */}
        <ProblemSection onOpenGetStarted={() => handleOpenGetStarted()} />

        {/* 4. How It Works */}
        <HowItWorks />

        {/* 5. AI Agent Flagship Section */}
        <AiAgentSection onOpenGetStarted={() => handleOpenGetStarted()} />

        {/* 6. Features Section */}
        <FeaturesSection onOpenGetStarted={() => handleOpenGetStarted()} />

        {/* 7. Use Cases */}
        <UseCasesSection onOpenGetStarted={handleOpenGetStarted} />

        {/* 8. Results / Dashboard */}
        <ResultsDashboard />

        {/* 9. Testimonials */}
        <TestimonialsSection />

        {/* 10. Pricing */}
        <PricingSection onSelectPlan={handleSelectPlan} />

        {/* 11. FAQ */}
        <FaqSection />

        {/* 12. Final CTA */}
        <FinalCtaSection onOpenGetStarted={() => handleOpenGetStarted()} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        initialIndustry={selectedIndustry}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Status Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900/95 border border-blue-500/50 text-white text-xs sm:text-sm font-medium shadow-2xl shadow-black/80 flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-bottom-5">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white text-xs ml-2"
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
};
