import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Database, ExternalLink, LogOut, User } from "lucide-react";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { useFirebase } from "@/context/FirebaseContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, signIn, signOut, openStudioModal, studioUrl } = useFirebase();

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
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Firebase Studio Alt Link Button */}
            <button
              onClick={openStudioModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-brand-500/15 border border-white/10 hover:border-brand-500/40 text-xs font-semibold text-slate-300 hover:text-brand-300 transition-colors"
              title="Inspect live Firestore database & alt link to Firebase Studio"
            >
              <Database className="w-3.5 h-3.5 text-brand-400" />
              <span>Firebase Studio</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>

            {user ? (
              <div className="flex items-center gap-2 pl-1">
                <button
                  onClick={openStudioModal}
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2 py-1.5 rounded-lg bg-white/5 border border-white/10"
                >
                  <User className="w-3.5 h-3.5 text-brand-400" />
                  <span className="truncate max-w-[100px]">{user.displayName || user.email?.split("@")[0]}</span>
                </button>
                <button
                  onClick={signOut}
                  className="text-xs text-slate-400 hover:text-red-300 p-2 rounded-lg hover:bg-white/5 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={signIn}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 px-3 py-2 min-h-[44px]"
              >
                Sign In
              </button>
            )}

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

            <button
              onClick={() => {
                setIsOpen(false);
                openStudioModal();
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-brand-300 bg-brand-500/10 border border-brand-500/20"
            >
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-brand-400" />
                <span>Firebase Studio Hub & Alt Link</span>
              </div>
              <ExternalLink className="w-4 h-4" />
            </button>

            <div className="pt-4 px-4 flex flex-col gap-2">
              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="btn-secondary text-sm w-full flex items-center justify-center gap-2 text-red-300"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out ({user.displayName || user.email})
                </button>
              ) : (
                <button
                  onClick={() => {
                    signIn();
                    setIsOpen(false);
                  }}
                  className="btn-secondary text-sm w-full flex items-center justify-center gap-2"
                >
                  Sign In with Google
                </button>
              )}
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
