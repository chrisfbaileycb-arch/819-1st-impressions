import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import PageMeta from "@/components/PageMeta";

const EFFECTIVE_DATE = "August 9, 2026";
const CONTACT_EMAIL = "privacy@1stimpressionsai.com";
const COMPANY_NAME = "1st Impressions";

export default function PrivacyPage() {
  return (
    <main className="pt-20 pb-24">
      <PageMeta
        title="Privacy Policy"
        description="Learn how 1st Impressions collects, uses, and protects your personal information."
        canonical="/privacy"
      />

      {/* Header */}
      <section className="section-padding pb-0 relative overflow-hidden">
        <div className="hero-glow opacity-30" />
        <div className="section-container relative z-10 max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors duration-200">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center">
              <Shield className="w-5 h-5 text-brand-400" />
            </div>
            <span className="badge-brand text-xs">Legal</span>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-base">
            Effective date: {EFFECTIVE_DATE} · Last updated: {EFFECTIVE_DATE}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="section-padding">
        <div className="section-container max-w-3xl mx-auto">
          <div className="prose-legal space-y-10">

            <div className="glass-card p-8">
              <p className="text-slate-300 leading-relaxed">
                {COMPANY_NAME} ("we," "us," or "our") operates the 1stimpressionsai.com website and the 1st Impressions AI receptionist platform (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our Service. Please read this policy carefully.
              </p>
            </div>

            {[
              {
                title: "1. Information We Collect",
                content: (
                  <div className="space-y-4">
                    <p className="text-slate-300 leading-relaxed"><strong className="text-white">Information you provide directly:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm leading-relaxed ml-2">
                      <li><strong className="text-slate-300">Lead and contact forms</strong> — name, email address, and business name submitted through our inquiry or sign-up forms.</li>
                      <li><strong className="text-slate-300">Account information</strong> — email, password, and business details when you create a subscription account.</li>
                      <li><strong className="text-slate-300">Payment information</strong> — billing name and address. Card numbers are processed directly by Stripe and never stored on our servers.</li>
                      <li><strong className="text-slate-300">Communications</strong> — messages sent to us via email or support channels.</li>
                    </ul>
                    <p className="text-slate-300 leading-relaxed mt-4"><strong className="text-white">Information collected automatically:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm leading-relaxed ml-2">
                      <li><strong className="text-slate-300">Usage data</strong> — pages visited, features used, session duration, and click-through paths.</li>
                      <li><strong className="text-slate-300">Device and browser data</strong> — IP address, browser type, operating system, and referring URL.</li>
                      <li><strong className="text-slate-300">Call data</strong> — duration, timestamp, and AI-generated summaries and transcripts of calls handled through the Service on your behalf.</li>
                    </ul>
                  </div>
                ),
              },
              {
                title: "2. How We Use Your Information",
                content: (
                  <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm leading-relaxed ml-2">
                    <li>To provide, operate, and improve the Service</li>
                    <li>To contact you about your inquiry, subscription, or account</li>
                    <li>To process payments and manage subscription billing</li>
                    <li>To send service announcements, updates, and support communications</li>
                    <li>To generate and deliver call summaries and follow-up tasks to your team</li>
                    <li>To analyze usage patterns and improve product performance</li>
                    <li>To comply with legal obligations and enforce our Terms of Service</li>
                    <li>To send marketing communications, where you have given consent (you may opt out at any time)</li>
                  </ul>
                ),
              },
              {
                title: "3. Disclosure of Your Information",
                content: (
                  <div className="space-y-4">
                    <p className="text-slate-300 leading-relaxed">We do not sell your personal data. We may share your information with:</p>
                    <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm leading-relaxed ml-2">
                      <li><strong className="text-slate-300">Supabase</strong> — cloud database and authentication infrastructure (United States). Data stored in compliance with SOC 2 Type II.</li>
                      <li><strong className="text-slate-300">Stripe</strong> — payment processing. Subject to Stripe's Privacy Policy at stripe.com/privacy.</li>
                      <li><strong className="text-slate-300">Voice AI provider</strong> — the telephony platform (e.g., Bland.ai or Vapi.ai) that handles inbound and outbound voice calls on your behalf. Call audio and transcripts may be processed by this provider.</li>
                      <li><strong className="text-slate-300">Analytics tools</strong> — Google Analytics 4 or equivalent for aggregated traffic analysis (no personally identifiable data shared).</li>
                      <li><strong className="text-slate-300">Legal requirements</strong> — when required by law, court order, or to protect our rights.</li>
                    </ul>
                  </div>
                ),
              },
              {
                title: "4. AI Disclosure",
                content: (
                  <p className="text-slate-300 leading-relaxed">
                    The 1st Impressions Service uses artificial intelligence to answer, transcribe, and summarize telephone calls on behalf of our subscribers. Callers who contact a business using our Service may interact with an AI agent rather than a human employee. We recommend that subscribers disclose this to their customers in accordance with applicable federal and state laws. Per FTC guidance and emerging state AI disclosure requirements, callers have a right to know they are interacting with AI on request.
                  </p>
                ),
              },
              {
                title: "5. Call Recording and Transcription",
                content: (
                  <p className="text-slate-300 leading-relaxed">
                    Calls handled through the Service may be recorded, transcribed, and summarized by AI. Recordings and transcripts are stored in your account and may be retained for up to 12 months unless you request earlier deletion. You are responsible for complying with all applicable call recording consent laws (e.g., two-party consent states) in your jurisdiction before directing calls through our Service.
                  </p>
                ),
              },
              {
                title: "6. Data Retention",
                content: (
                  <p className="text-slate-300 leading-relaxed">
                    We retain personal information for as long as necessary to provide the Service and comply with legal obligations. Lead inquiries are retained for up to 24 months. Active account data is retained for the life of the subscription plus 90 days. Call recordings and transcripts are retained for 12 months unless you configure a shorter window in your account settings or submit a deletion request.
                  </p>
                ),
              },
              {
                title: "7. Your Rights",
                content: (
                  <div className="space-y-3">
                    <p className="text-slate-300 leading-relaxed">Depending on your location, you may have the following rights:</p>
                    <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm leading-relaxed ml-2">
                      <li><strong className="text-slate-300">Access</strong> — request a copy of the personal data we hold about you.</li>
                      <li><strong className="text-slate-300">Correction</strong> — request corrections to inaccurate or incomplete data.</li>
                      <li><strong className="text-slate-300">Deletion</strong> — request erasure of your personal data ("right to be forgotten").</li>
                      <li><strong className="text-slate-300">Opt-out of marketing</strong> — unsubscribe from marketing emails at any time using the link in any email or by contacting us.</li>
                      <li><strong className="text-slate-300">Data portability</strong> — receive your data in a structured, machine-readable format.</li>
                    </ul>
                    <p className="text-slate-400 text-sm mt-3">
                      To exercise any of these rights, email us at{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-400 hover:text-brand-300 transition-colors">{CONTACT_EMAIL}</a>.
                      We will respond within 30 days.
                    </p>
                  </div>
                ),
              },
              {
                title: "8. California Residents (CCPA / CPRA)",
                content: (
                  <p className="text-slate-300 leading-relaxed">
                    California residents have additional rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), including the right to know what personal information is collected, the right to delete, the right to opt out of the sale or sharing of personal information, and the right to non-discrimination for exercising these rights. We do not sell or share personal information for cross-context behavioral advertising. To submit a verifiable consumer request, contact us at{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-400 hover:text-brand-300 transition-colors">{CONTACT_EMAIL}</a>.
                  </p>
                ),
              },
              {
                title: "9. Cookies",
                content: (
                  <p className="text-slate-300 leading-relaxed">
                    We use essential cookies for authentication and session management. We may also use analytics cookies (Google Analytics) to understand site usage in aggregate. You can disable cookies in your browser settings; this may affect certain features of the Service. We do not use third-party advertising cookies.
                  </p>
                ),
              },
              {
                title: "10. Children's Privacy",
                content: (
                  <p className="text-slate-300 leading-relaxed">
                    The Service is not directed at children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately and we will delete it.
                  </p>
                ),
              },
              {
                title: "11. Security",
                content: (
                  <p className="text-slate-300 leading-relaxed">
                    We implement industry-standard technical and organizational safeguards including encryption in transit (TLS 1.2+), encryption at rest, access controls, and regular security reviews. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
                  </p>
                ),
              },
              {
                title: "12. Changes to This Policy",
                content: (
                  <p className="text-slate-300 leading-relaxed">
                    We may update this Privacy Policy periodically. We will notify you of material changes by email (to the address on your account) or by posting a prominent notice on our website at least 30 days before the change takes effect. Your continued use of the Service after changes become effective constitutes your acceptance of the revised policy.
                  </p>
                ),
              },
              {
                title: "13. Contact Us",
                content: (
                  <div className="text-slate-300 leading-relaxed">
                    <p>For privacy inquiries, data requests, or concerns, contact:</p>
                    <div className="mt-3 glass-card p-5 text-sm space-y-1">
                      <p className="text-white font-semibold">1st Impressions — Privacy</p>
                      <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-400 hover:text-brand-300 transition-colors">{CONTACT_EMAIL}</a></p>
                      <p className="text-slate-500">We respond to all privacy requests within 30 days.</p>
                    </div>
                  </div>
                ),
              },
            ].map((section) => (
              <div key={section.title} className="glass-card p-8">
                <h2 className="font-display font-bold text-white text-xl mb-5">{section.title}</h2>
                {section.content}
              </div>
            ))}

          </div>

          {/* Footer nav */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <Link to="/terms" className="hover:text-white transition-colors duration-200">
              → View Terms of Service
            </Link>
            <Link to="/" className="hover:text-white transition-colors duration-200">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
