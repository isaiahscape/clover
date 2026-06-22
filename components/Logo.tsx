"use client";

import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center justify-center rounded-lg bg-foreground text-background font-sans font-bold ${className}`}>
      <img src="/favicon.svg" alt="Logo" className="w-6 h-6 dark:invert" />
    </div>
  );
}

export default Logo;