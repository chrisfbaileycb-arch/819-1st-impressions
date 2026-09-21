import { Link } from "react-router-dom";
import { Phone, Twitter, Linkedin, Github } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Personalities", href: "/personalities" },
    { label: "Pricing", href: "/pricing" },
    { label: "Free Tools", href: "/tools" },
    { label: "Agent Builder", href: "/agent-builder" },
    { label: "PC Desk", href: "/features" },
  ],
  Solutions: [
    { label: "Dental Practices", href: "/solutions" },
    { label: "HVAC Companies", href: "/solutions" },
    { label: "Law Firms", href: "/solutions" },
    { label: "Real Estate", href: "/solutions" },
    { label: "Hotels", href: "/solutions" },
  ],
  Company: [
    { label: "About", href: "/" },
    { label: "Book a Demo", href: "/demo" },
    { label: "Blog", href: "/" },
    { label: "Customer Stories", href: "/" },
    { label: "vs Smith.ai", href: "/vs/smith-ai" },
    { label: "Changelog", href: "/" },
  ],
  Resources: [
    { label: "Documentation", href: "/" },
    { label: "API Reference", href: "/" },
    { label: "Integrations", href: "/features" },
    { label: "Playbooks", href: "/playbooks" },
    { label: "Firebase Studio (Console)", href: "https://console.firebase.google.com/project/gen-lang-client-0359771227/firestore/databases/ai-studio-1stimpessions-4c42665f-9871-49d9-b7d4-241aaab4aac1/data" },
    { label: "Backend Status", href: "/demo" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-surface-0">
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                1st <span className="brand-gradient-text">Impressions</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Every customer conversation in one place. Answer. Summarize. Follow up. Sound like you.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/6 hover:bg-white/12 flex items-center justify-center text-slate-400 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/6 hover:bg-white/12 flex items-center justify-center text-slate-400 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/8 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} 1st Impressions. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
            <a href="mailto:support@1stimpressionsai.com" className="hover:text-white transition-colors duration-200">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
