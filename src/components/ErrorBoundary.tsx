import { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary] Caught:", error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-[#060B18]">
          <div className="glass-card p-10 max-w-md w-full text-center">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>

            {/* Logo wordmark */}
            <div className="flex items-center justify-center gap-1.5 mb-5">
              <span className="font-display font-bold text-white text-base">
                1st <span className="brand-gradient-text">Impressions</span>
              </span>
            </div>

            <h1 className="font-display font-bold text-white text-xl mb-3">
              Something went wrong
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              We hit an unexpected error. Reloading the page usually fixes it — if the problem keeps happening, contact us at{" "}
              <a href="mailto:support@1stimpressionsai.com" className="text-brand-400 hover:text-brand-300 transition-colors">
                support@1stimpressionsai.com
              </a>
              .
            </p>

            {/* Error details (dev helper) */}
            {this.state.error && (
              <div className="mb-8 text-left bg-white/4 border border-white/8 rounded-xl p-4 text-xs font-mono text-slate-500 break-all">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary text-sm px-6 py-3 inline-flex items-center justify-center gap-2 min-h-[44px]"
              >
                <RefreshCw className="w-4 h-4" />
                Reload page
              </button>
              <a href="/" className="btn-secondary text-sm px-6 py-3 inline-flex items-center justify-center min-h-[44px]">
                Go home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
