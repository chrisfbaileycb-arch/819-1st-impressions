import { Link } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center pt-20">
      <div className="section-container text-center max-w-lg">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/12 border border-brand-500/25 flex items-center justify-center mx-auto mb-8">
          <Phone className="w-8 h-8 text-brand-400" />
        </div>
        <div className="font-mono text-brand-500/60 text-sm font-bold tracking-widest mb-4">404</div>
        <h1 className="font-display font-bold text-4xl text-white mb-4">
          This page missed the call.
        </h1>
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          The page you're looking for doesn't exist — but every customer call still gets answered.
        </p>
        <Link to="/" className="btn-primary px-8 py-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
