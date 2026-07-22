import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function Logo({ size = 40, className, ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        {/* Left Wing Gradient (Teal to Navy) */}
        <linearGradient id="leftWingGrad" x1="15%" y1="15%" x2="85%" y2="85%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>

        {/* Center W Gradient (Teal to Navy to Teal) */}
        <linearGradient id="centerWGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="50%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>

        {/* Right Wing Gradient (Navy to Teal) */}
        <linearGradient id="rightWingGrad" x1="85%" y1="15%" x2="15%" y2="85%">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>

        {/* 3D Sphere Radial Gradient */}
        <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="40%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#030712" />
        </radialGradient>
        
        {/* Glow Filter for cinematic look */}
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Left Wing (K-Shape Arrow) */}
      <path
        d="M65 45 L20 90 L20 110 L65 155 M65 155 L45 135 L38 98 L65 45 Z"
        fill="url(#leftWingGrad)"
        opacity="0.95"
      />
      <path
        d="M65 45 L20 90 L65 135 L50 95 Z"
        fill="url(#leftWingGrad)"
      />

      {/* Right Wing (K-Shape Arrow) */}
      <path
        d="M135 45 L180 90 L180 110 L135 155 M135 155 L155 135 L162 98 L135 45 Z"
        fill="url(#rightWingGrad)"
        opacity="0.95"
      />
      <path
        d="M135 45 L180 90 L135 135 L150 95 Z"
        fill="url(#rightWingGrad)"
      />

      {/* Center "W" Ribbon Shape */}
      <path
        d="M75 80 C75 60, 90 70, 100 110 C110 70, 125 60, 125 80 L125 145 C125 165, 110 160, 100 135 C90 160, 75 165, 75 145 Z"
        fill="url(#centerWGrad)"
      />
      <path
        d="M75 80 L75 145 C75 158, 85 152, 100 125 C115 152, 125 158, 125 145 L125 80 C125 68, 115 85, 100 115 C85 85, 75 68, 75 80 Z"
        fill="url(#centerWGrad)"
        opacity="0.9"
      />

      {/* Two Spheres on Top (Antenna-style Dots) */}
      <circle cx="85" cy="60" r="13" fill="url(#sphereGrad)" />
      <circle cx="115" cy="60" r="13" fill="url(#sphereGrad)" />
    </svg>
  );
}
