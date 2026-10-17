import React from 'react';

export default function MountainSilhouette({ className = "w-full text-zinc-950/5", opacity = "0.06" }) {
  return (
    <div className={`pointer-events-none select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        {/* Distant Mountain Layer (Lighter) */}
        <path
          d="M0 320L0 180L120 140L260 210L380 120L520 230L680 90L840 220L980 110L1120 190L1260 130L1380 200L1440 170L1440 320Z"
          fill="currentColor"
          fillOpacity={Number(opacity) * 0.6}
        />
        {/* Mid Mountain Layer with sharp peaks */}
        <path
          d="M0 320L0 230L90 190L210 260L340 160L460 250L600 130L720 240L880 150L1020 250L1180 140L1320 220L1440 170L1440 320Z"
          fill="currentColor"
          fillOpacity={Number(opacity) * 0.9}
        />
        {/* Foreground Pine & Hill Silhouette Layer */}
        <path
          d="M0 320L0 260L60 240L140 280L240 220L360 280L480 210L620 290L760 200L900 280L1040 220L1160 270L1280 230L1380 270L1440 250L1440 320Z"
          fill="currentColor"
          fillOpacity={opacity}
        />
        {/* Subtle ridge peak lines */}
        <path
          d="M680 90L670 140L685 190L660 240"
          stroke="currentColor"
          strokeOpacity={Number(opacity) * 1.5}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M980 110L995 160L975 220"
          stroke="currentColor"
          strokeOpacity={Number(opacity) * 1.5}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M380 120L395 170L370 230"
          stroke="currentColor"
          strokeOpacity={Number(opacity) * 1.5}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
