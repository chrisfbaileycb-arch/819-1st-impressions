import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import PageMeta from "@/components/PageMeta";

const EFFECTIVE_DATE = "August 9, 2026";
const CONTACT_EMAIL = "support@1stimpressionsai.com";

export default function TermsPage() {
  return (
    <main className="pt-20 pb-24">
      <PageMeta
        title="Terms of Service"
        description="Read the Terms of Service for the 1st Impressions AI receptionist platform, including subscription billing, voice minute usage, cancellation, and acceptable use."
        canonical="/terms"
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
              <FileText className="w-5 h-5 text-brand-400" />
            </div>
            <span className="badge-brand text-xs">Legal</span>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-400 text-base">
            Effective date: {EFFECTIVE_DATE} · Last updated: {EFFECTIVE_DATE}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="section-padding">
        <div className="section-container max-w-3xl mx-auto">
          <div className="space-y-6">

            <div className="glass-card p-8">
              <p className="text-slate-300 leading-relaxed">
                These Terms of Service ("Terms") govern your access to and use of the 1st Impressions platform, website, and AI receptionist services (collectively, the "Service") provided by 1st Impressions ("we," "us," or "our"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.
              </p>
            </div>

            {[
              {
                title: "1. Service Description",
                content: (
                  <p className="text-slate-300 leading-relaxed">
                    1st Impressions provides an AI-powered voice receptionist platform that answers incoming telephone calls, transcribes and summarizes call content, routes or resolves customer inquiries, and delivers follow-up tasks to your team — on behalf of subscribing businesses. The Service is provided on a subscription basis with voice minute pools as described in Section 4.
                  </p>
                ),
              },
              {
                title: "2. AI Disclosure and Caller Notice",
                content: (
                  <div className="space-y-3">
                    <p className="text-slate-300 leading-relaxed">
                      <strong className="text-white">The Service uses artificial intelligence to handle calls on your behalf.</strong> Callers to your business may interact with an AI agent, not a human employee.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      You are solely responsible for:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm leading-relaxed ml-2">
                      <li>Complying with all applicable federal and state laws regarding AI disclosure, including FTC guidance and state-level AI transparency statutes.</li>
                      <li>Obtaining any required consent for call recording under applicable two-party or all-party consent laws (e.g., California Penal Code § 632).</li>
                      <li>Notifying your customers that calls may be answered and recorded by an AI system.</li>
                    </ul>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      We are not liable for any claims arising from your failure to comply with disclosure or consent requirements in your jurisdiction.
                    </p>
                  </div>
                ),
              },
              {
                title: "3. Account Registration",
                content: (
                  <div className="space-y-3">
                    <p className="text-slate-300 leading-relaxed">
                      To use the Service, you must create an account and provide accurate, complete information. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. You must:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm leading-relaxed ml-2">
                      <li>Be at least 18 years of age</li>
                      <li>Provide accurate and truthful registration information</li>
                      <li>Promptly update your information if it changes</li>
                      <li>Notify us immediately of any unauthorized access to your account</li>
                    </ul>
                  </div>
                ),
              },
              {
                title: "4. Subscription Plans and Billing",
                content: (
                  <div className="space-y-4">
                    <p className="text-slate-300 leading-relaxed">The Service is offered on three monthly subscription tiers:</p>
                    <div className="overflow-x-auto glass-card">
                      <table className="w-full text-sm min-w-[400px]">
                        <thead>
                          <tr className="border-b border-white/8">
                            <th className="text-left text-slate-400 font-semibold px-5 py-3">Plan</th>
                            <th className="text-right text-slate-400 font-semibold px-4 py-3">Monthly Price</th>
                            <th className="text-right text-slate-400 font-semibold px-5 py-3">Voice Minutes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { plan: "Pro Starter", price: "$39.95 / mo", mins: "50 min included" },
                            { plan: "Pro Studio", price: "$99.95 / mo", mins: "200 min included" },
                            { plan: "Agency Scale", price: "$349.95 / mo", mins: "1,000 min included" },
                          ].map((row) => (
                            <tr key={row.plan} className="border-b border-white/5">
                              <td className="text-slate-200 font-medium px-5 py-3">{row.plan}</td>
                              <td className="text-right text-brand-300 px-4 py-3 font-semibold">{row.price}</td>
                              <td className="text-right text-slate-400 px-5 py-3">{row.mins}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm leading-relaxed ml-2">
                      <li>Subscriptions are billed monthly in advance to the payment method on file.</li>
                      <li>All charges are in USD and are non-refundable except as expressly stated in these Terms.</li>
                      <li>Failed payments will result in a grace period of 3 days before the account is suspended.</li>
                      <li>You authorize us to charge your payment method for all fees incurred.</li>
                    </ul>
                  </div>
                ),
              },
              {
                title: "5. Voice Minute Usage and Top-Off Packs",
                content: (
                  <div className="space-y-3">
                    <p className="text-slate-300 leading-relaxed">
                      Each subscription includes a monthly pool of voice minutes. Calls are rounded up to the nearest whole minute at the end of each call. Minutes are deducted from your monthly pool first, then from any purchased top-off balance.
                    </p>
                    <p className="text-slate-300 leading-relaxed"><strong className="text-white">Usage alerts:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm leading-relaxed ml-2">
                      <li>At 80% pool consumption, you will receive an SMS notification.</li>
                      <li>At 100% consumption, if Auto-Top-Off is enabled, we will charge your default top-off pack ($35 / 100 min) via Stripe and maintain normal service. If Auto-Top-Off is disabled, incoming calls will route to AI Voicemail mode until your pool is replenished.</li>
                    </ul>
                    <p className="text-slate-300 leading-relaxed"><strong className="text-white">Top-Off Packs</strong> (available at any time):</p>
                    <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm leading-relaxed ml-2">
                      <li>100 minutes — $35.00</li>
                      <li>250 minutes — $75.00</li>
                      <li>500 minutes — $125.00</li>
                    </ul>
                    <p className="text-slate-400 text-sm">Top-off minutes never expire and carry over indefinitely.</p>
                  </div>
                ),
              },
              {
                title: "6. Cancellation and Refunds",
                content: (
                  <div className="space-y-3">
                    <p className="text-slate-300 leading-relaxed">
                      You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of the current billing period. We do not provide prorated refunds for partial months.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      If you believe you were charged in error, contact us at{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-400 hover:text-brand-300 transition-colors">{CONTACT_EMAIL}</a>{" "}
                      within 30 days of the charge. We will review and respond within 5 business days.
                    </p>
                    <p className="text-slate-400 text-sm">
                      Top-off pack purchases are non-refundable. Unused top-off minutes are forfeited upon account deletion.
                    </p>
                  </div>
                ),
              },
              {
                title: "7. Acceptable Use",
                content: (
                  <div className="space-y-3">
                    <p className="text-slate-300 leading-relaxed">You agree not to use the Service to:</p>
                    <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm leading-relaxed ml-2">
                      <li>Engage in any unlawful, fraudulent, or deceptive activity</li>
                      <li>Harass, threaten, or harm any person</li>
                      <li>Violate any applicable telemarketing, robocall, TCPA, or consumer protection laws</li>
                      <li>Impersonate any person or entity in a deceptive or misleading manner</li>
                      <li>Transmit unsolicited commercial messages (spam) via any channel</li>
                      <li>Reverse-engineer, decompile, or attempt to extract source code from the Service</li>
                      <li>Resell, sublicense, or white-label the Service without written authorization</li>
                    </ul>
                    <p className="text-slate-400 text-sm">
                      We reserve the right to suspend or terminate accounts that violate this section, without refund.
                    </p>
                  </div>
                ),
              },
              {
                title: "8. Intellectual Property",
                content: (
                  <p className="text-slate-300 leading-relaxed">
                    The Service, including all software, AI models, designs, trademarks, and content, is owned by 1st Impressions and is protected by applicable intellectual property laws. You retain ownership of any content (e.g., call scripts, knowledge base documents) that you upload to the Service. By uploading content, you grant us a non-exclusive, worldwide, royalty-free license to use, store, and process that content solely to operate the Service for you.
                  </p>
                ),
              },
              {
                title: "9. Disclaimer of Warranties",
                content: (
                  <p className="text-slate-300 leading-relaxed">
                    THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS. AI-GENERATED CALL SUMMARIES AND RESPONSES MAY CONTAIN ERRORS AND SHOULD NOT BE RELIED UPON AS LEGAL, MEDICAL, OR PROFESSIONAL ADVICE.
                  </p>
                ),
              },
              {
                title: "10. Limitation of Liability",
                content: (
                  <p className="text-slate-300 leading-relaxed">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, 1ST IMPRESSIONS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE SERVICE. OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM SHALL NOT EXCEED THE FEES YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM.
                  </p>
                ),
              },
              {
                title: "11. Indemnification",
                content: (
                  <p className="text-slate-300 leading-relaxed">
                    You agree to indemnify, defend, and hold harmless 1st Impressions and its officers, directors, employees, and agents from any claims, liabilities, damages, and expenses (including reasonable attorneys' fees) arising from: (a) your use of the Service; (b) your violation of these Terms; (c) your failure to comply with call recording or AI disclosure laws; or (d) any content you upload or transmit through the Service.
                  </p>
                ),
              },
              {
                title: "12. Governing Law and Disputes",
                content: (
                  <p className="text-slate-300 leading-relaxed">
                    These Terms are governed by and construed in accordance with the laws of the United States and the state in which 1st Impressions is registered, without regard to conflict of law principles. Any dispute arising from these Terms shall first be submitted to good-faith negotiation. If unresolved, disputes shall be submitted to binding arbitration under the JAMS Streamlined Arbitration Rules, on an individual (not class-action) basis. You waive the right to a jury trial and to participate in a class action.
                  </p>
                ),
              },
              {
                title: "13. Changes to These Terms",
                content: (
                  <p className="text-slate-300 leading-relaxed">
                    We may update these Terms at any time. We will notify you of material changes by email or by posting a notice on our website at least 30 days before the effective date. Your continued use of the Service after the effective date constitutes acceptance of the revised Terms. If you do not agree to the new Terms, you must cancel your subscription before the effective date.
                  </p>
                ),
              },
              {
                title: "14. Contact",
                content: (
                  <div className="glass-card p-5 text-sm space-y-1">
                    <p className="text-white font-semibold">1st Impressions — Support</p>
                    <p className="text-slate-300">Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-400 hover:text-brand-300 transition-colors">{CONTACT_EMAIL}</a></p>
                    <p className="text-slate-500">We respond to all inquiries within 2 business days.</p>
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
            <Link to="/privacy" className="hover:text-white transition-colors duration-200">
              → View Privacy Policy
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
