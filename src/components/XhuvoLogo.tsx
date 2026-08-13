import React from 'react';
import { Crown, Target, Sparkles } from 'lucide-react';

interface XhuvoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
  unboxed?: boolean;
}

export const XhuvoLogo: React.FC<XhuvoLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  clickable = true,
  onClick,
  className = '',
  unboxed = false
}) => {
  const sizeClasses = {
    sm: {
      crown: 'w-3 h-3 text-purple-400',
      xhuvo: 'text-sm sm:text-base font-black',
      quotex: 'text-base sm:text-lg font-black',
      target: 'w-3 h-3 text-purple-400',
      padding: 'p-1.5'
    },
    md: {
      crown: 'w-4 h-4 text-purple-300',
      xhuvo: 'text-lg sm:text-2xl font-black',
      quotex: 'text-xl sm:text-3xl font-black',
      target: 'w-4 h-4 text-purple-400',
      padding: 'p-1.5 sm:p-3'
    },
    lg: {
      crown: 'w-5 h-5 sm:w-6 sm:h-6 text-purple-300',
      xhuvo: 'text-2xl sm:text-4xl font-black',
      quotex: 'text-3xl sm:text-5xl font-black',
      target: 'w-5 h-5 sm:w-6 sm:h-6 text-purple-400',
      padding: 'p-3 sm:p-6'
    },
    xl: {
      crown: 'w-6 h-6 sm:w-8 sm:h-8 text-purple-300',
      xhuvo: 'text-3xl sm:text-6xl font-black',
      quotex: 'text-4xl sm:text-7xl font-black',
      target: 'w-6 h-6 sm:w-8 sm:h-8 text-purple-400',
      padding: 'p-4 sm:p-8'
    }
  };

  const currentSize = sizeClasses[size];

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    } else if (clickable) {
      e.stopPropagation();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.pathname !== '/' || window.location.hash) {
        window.history.pushState(null, '', '/');
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative group inline-flex flex-col items-center justify-center select-none ${
        clickable ? 'cursor-pointer' : ''
      } ${className}`}
      title="XHUVO QUOTEX Home"
    >
      {/* Main Logo Container Frame */}
      <div className={`relative z-10 flex flex-col items-center transition-all duration-200 ${
        unboxed
          ? 'px-2 py-1'
          : `bg-[#0d0718] border border-purple-500/30 group-hover:border-purple-400/60 rounded-2xl ${currentSize.padding}`
      }`}>
        
        {/* Top Crown above XHUVO */}
        <div className="flex items-center space-x-1.5 -mb-1">
          <Target className={`${currentSize.target} opacity-60`} />
          <Crown className={`${currentSize.crown}`} />
          <Target className={`${currentSize.target} opacity-60`} />
        </div>

        {/* Red Brush Stylized "XHUVO" */}
        <div className="relative px-2">
          <span className={`${currentSize.xhuvo} tracking-wider text-red-500 font-mono uppercase font-extrabold italic inline-block pr-1 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]`}>
            XHUVO
          </span>
        </div>

        {/* Purple Glowing "QUOTEX" */}
        <div className="relative -mt-1 flex items-center space-x-2 px-2">
          <span className={`${currentSize.quotex} tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-fuchsia-400 to-violet-300 font-mono font-black italic inline-block pr-2.5 pb-0.5`}>
            QUOTEX
          </span>
        </div>

        {/* Subtitle Tag */}
        {showSubtitle && (
          <div className="mt-1 flex items-center space-x-1 px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-[9px] font-mono text-purple-300 font-bold uppercase tracking-widest whitespace-nowrap">
            <Sparkles className="w-2.5 h-2.5 text-purple-400" />
            <span>OFFICIAL STORE</span>
          </div>
        )}
      </div>
    </div>
  );
};
