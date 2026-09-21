import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { FirebaseProvider } from "@/context/FirebaseContext";
import FirebaseStudioModal from "@/components/FirebaseStudioModal";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import HomePage from "@/pages/HomePage";
import FeaturesPage from "@/pages/FeaturesPage";
import PricingPage from "@/pages/PricingPage";
import ToolsPage from "@/pages/ToolsPage";
import SolutionsPage from "@/pages/SolutionsPage";
import PersonalitiesPage from "@/pages/PersonalitiesPage";
import AgentBuilderPage from "@/pages/AgentBuilderPage";
import PlaybooksPage from "@/pages/PlaybooksPage";
import ComparisonPage from "@/pages/ComparisonPage";
import DemoPage from "@/pages/DemoPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <FirebaseProvider>
          <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/solutions" element={<SolutionsPage />} />
                <Route path="/personalities" element={<PersonalitiesPage />} />
                <Route path="/agent-builder" element={<AgentBuilderPage />} />
                <Route path="/playbooks" element={<PlaybooksPage />} />
                <Route path="/vs/smith-ai" element={<ComparisonPage />} />
                <Route path="/demo" element={<DemoPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
            <FirebaseStudioModal />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "#0D1530",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#f8fafc",
                },
              }}
            />
          </div>
        </FirebaseProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
