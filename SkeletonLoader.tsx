import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`shimmer-base rounded-xl ${className}`}
    />
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#0b1120] border border-purple-500/20 rounded-3xl p-6 space-y-4 shadow-lg">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-2/3" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-5/6" />
        <Skeleton className="h-3.5 w-4/6" />
      </div>
      <div className="pt-4 flex items-center justify-between border-t border-slate-800/60">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
    </div>
  );
};

export const ChartSkeleton: React.FC = () => {
  return (
    <div className="bg-[#0b1120] border border-purple-500/20 rounded-3xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-8 w-28 rounded-xl" />
      </div>
      <div className="h-[220px] w-full flex items-end justify-between gap-2 pt-6">
        {[40, 65, 30, 80, 55, 90, 70, 85, 60, 95, 75, 50, 85, 90].map((h, idx) => (
          <div key={idx} className="flex-1 bg-slate-800/50 rounded-t-lg" style={{ height: `${h}%` }}>
            <Skeleton className="w-full h-full rounded-t-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const TableRowSkeleton: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl mb-2">
      <div className="flex items-center space-x-3">
        <Skeleton className="w-9 h-9 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-6 w-20 rounded-lg" />
      <Skeleton className="h-8 w-24 rounded-xl" />
    </div>
  );
};

/**
 * Standardized Shimmer Loading Skeleton for HeroSection
 * Prevents layout shifts during initial load / stats fetch
 */
export const HeroSkeleton: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 bg-[#07040d] border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center max-w-4xl mx-auto mb-10">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-7 w-32 rounded-full" />
            <Skeleton className="h-7 w-28 rounded-full" />
          </div>

          {/* Telegram Member Banner Skeleton */}
          <Skeleton className="h-10 w-80 sm:w-96 rounded-xl" />

          {/* Headline Skeleton */}
          <div className="w-full space-y-3 pt-4">
            <Skeleton className="h-10 sm:h-14 w-11/12 mx-auto rounded-2xl" />
            <Skeleton className="h-10 sm:h-14 w-4/5 mx-auto rounded-2xl" />
          </div>

          {/* Subtitle Skeleton */}
          <div className="w-full space-y-2 pt-2 max-w-2xl">
            <Skeleton className="h-4 w-full mx-auto" />
            <Skeleton className="h-4 w-5/6 mx-auto" />
          </div>

          {/* CTA Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto">
            <Skeleton className="h-14 w-full sm:w-56 rounded-xl" />
            <Skeleton className="h-14 w-full sm:w-56 rounded-xl" />
          </div>
        </div>

        {/* Live Metrics Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 text-center space-y-2">
              <Skeleton className="h-8 w-24 mx-auto rounded-lg" />
              <Skeleton className="h-3 w-28 mx-auto" />
              <Skeleton className="h-3 w-20 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Standardized Shimmer Loading Skeleton for IndicatorShowcase
 * Prevents layout shifts when switching views or loading showcase data
 */
export const ShowcaseSkeleton: React.FC = () => {
  return (
    <section className="py-20 bg-[#060911] text-slate-100 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Skeleton className="h-6 w-36 mx-auto rounded-full" />
          <Skeleton className="h-10 w-3/4 mx-auto rounded-xl" />
          <Skeleton className="h-4 w-5/6 mx-auto" />
        </div>

        {/* Indicator Cards List Skeleton */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {[1, 2, 3].map((card) => (
            <div
              key={card}
              className="bg-[#0b0614] border border-purple-500/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-8 w-48 rounded-lg" />
                <Skeleton className="h-4 w-full" />
              </div>

              <div className="pb-6 border-b border-slate-800">
                <Skeleton className="h-10 w-36 rounded-xl" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Skeleton className="h-12 w-full sm:w-48 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
