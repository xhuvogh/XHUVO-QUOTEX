import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp } from 'lucide-react';
import { XhuvoLogo } from './XhuvoLogo';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    };
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.hash = '#store';
    window.location.reload();
  };

  private toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#06040d] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
          {/* Background Ambient Glows */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-rose-500/10 blur-[140px] pointer-events-none" />
          <div className="absolute w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

          <div className="max-w-lg w-full bg-[#0d0718]/90 border border-rose-500/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(244,63,94,0.2)] backdrop-blur-xl relative z-10 space-y-6 text-center font-sans">
            {/* Header Icon & Logo */}
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 shadow-inner">
                <AlertTriangle className="w-10 h-10 animate-bounce" />
              </div>
              <XhuvoLogo size="sm" showSubtitle={true} clickable={false} />
            </div>

            {/* Error Message Header */}
            <div className="space-y-2">
              <h1 className="text-2xl font-black font-mono text-white tracking-tight uppercase">
                APPLICATION ERROR ENCOUNTERED
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                An unexpected error occurred while rendering this component. The rest of the application has been isolated safely.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 font-mono text-xs font-bold">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center space-x-2 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>RELOAD APPLICATION</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center space-x-2 transition-all"
              >
                <Home className="w-4 h-4 text-purple-400" />
                <span>RETURN TO STORE</span>
              </button>
            </div>

            {/* Expandable Technical Details */}
            {this.state.error && (
              <div className="pt-4 border-t border-slate-800/80 text-left">
                <button
                  onClick={this.toggleDetails}
                  className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 hover:text-purple-300 transition-colors py-1"
                >
                  <span>Technical Diagnostics</span>
                  {this.state.showDetails ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {this.state.showDetails && (
                  <div className="mt-2 p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-[10px] text-rose-300 max-h-48 overflow-y-auto space-y-2 no-scrollbar">
                    <p className="font-bold text-rose-400">{this.state.error.toString()}</p>
                    {this.state.errorInfo?.componentStack && (
                      <pre className="text-slate-500 whitespace-pre-wrap font-mono text-[9px] leading-normal">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
