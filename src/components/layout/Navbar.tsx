import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#060B18]/90 backdrop-blur-md border-b border-white/8 shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-lg shadow-brand-500/30">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight">
              1st <span className="brand-gradient-text">Impressions</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  location.pathname === link.href
                    ? "text-brand-400 bg-brand-500/10"
                    : "text-slate-400 hover:text-white hover:bg-white/6"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 px-3 py-2 min-h-[44px]">
              Sign In
            </button>
            <Link
              to="/demo"
              className={cn(
                "text-sm font-medium px-4 py-2.5 rounded-lg border transition-colors duration-200 min-h-[44px] flex items-center",
                location.pathname === "/demo"
                  ? "border-brand-500/50 text-brand-300 bg-brand-500/10"
                  : "border-white/15 text-slate-300 hover:border-white/30 hover:text-white"
              )}
            >
              Book Demo
            </Link>
            <Link to="/pricing" className="btn-primary text-sm px-5 py-2.5">
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-white/8 py-4 pb-6 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200",
                  location.pathname === link.href
                    ? "text-brand-400 bg-brand-500/10"
                    : "text-slate-400 hover:text-white hover:bg-white/6"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 px-4 flex flex-col gap-2">
              <button className="btn-secondary text-sm w-full">Sign In</button>
              <Link to="/pricing" className="btn-primary text-sm w-full">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
