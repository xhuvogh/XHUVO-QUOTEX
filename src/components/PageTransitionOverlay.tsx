import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { XhuvoLogo } from './XhuvoLogo';

interface PageTransitionOverlayProps {
  isVisible: boolean;
  message?: string;
}

export const PageTransitionOverlay: React.FC<PageTransitionOverlayProps> = ({
  isVisible,
  message = 'Switching Webpage...',
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="global-page-transition-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] bg-[#06040d]/92 backdrop-blur-2xl text-slate-100 flex flex-col items-center justify-center p-6 select-none overflow-hidden pointer-events-auto"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {/* Animated Ambient Soft Glow Background Effects */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-600/20 via-fuchsia-600/15 to-indigo-600/20 blur-[140px] pointer-events-none" />
          <div className="absolute w-[350px] h-[350px] rounded-full bg-indigo-500/15 blur-[90px] pointer-events-none" />

          {/* Top Edge Flash Progress Strip */}
          <div className="fixed top-0 left-0 right-0 h-1 z-[10001] bg-slate-900/80 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-400 shadow-[0_0_20px_rgba(168,85,247,0.9)]"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            />
          </div>

          {/* Centered Content Container */}
          <div className="relative flex flex-col items-center justify-center space-y-6 z-10 max-w-sm w-full text-center">
            
            {/* Logo Container with Subtle Breathing / Pulse Scale Animation */}
            <motion.div
              animate={{ scale: [0.97, 1.03, 0.97] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="relative flex items-center justify-center p-4 sm:p-5"
            >
              {/* Outer Spinning Accent Ring */}
              <div className="absolute -inset-4 rounded-3xl border border-purple-500/40 border-t-purple-400 border-r-fuchsia-400 animate-spin shadow-[0_0_40px_rgba(168,85,247,0.5)]" />
              
              {/* Inner Counter-Rotating Ring */}
              <div className="absolute -inset-1.5 rounded-2xl border border-dashed border-fuchsia-400/30 border-b-fuchsia-300 animate-spin-reverse" />

              {/* Glassmorphism Logo Box */}
              <div className="relative liquid-glass-modal p-5 sm:p-6 rounded-3xl border border-purple-400/40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_50px_rgba(168,85,247,0.4)]">
                <XhuvoLogo size="lg" showSubtitle={true} clickable={false} />
              </div>
            </motion.div>

            {/* Dynamic Status Message & Progress Indicator */}
            <div className="space-y-3 font-mono w-full flex flex-col items-center justify-center">
              {/* Animated Progress Track */}
              <div className="w-48 h-1.5 bg-slate-950/90 rounded-full overflow-hidden border border-purple-400/30 p-0.5 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                <div className="h-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-400 rounded-full w-full shadow-[0_0_12px_rgba(217,70,239,0.9)] animate-pulse" />
              </div>

              {/* Message Text */}
              <div className="flex items-center justify-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-ping shrink-0" />
                <p className="text-xs font-bold text-purple-200 tracking-[0.2em] uppercase animate-pulse">
                  {message}
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
