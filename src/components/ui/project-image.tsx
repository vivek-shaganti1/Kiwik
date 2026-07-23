"use client";

import React, { useState, useEffect } from "react";

interface ProjectImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  category?: string;
}

const DEFAULT_FALLBACK = "/images/kiwik-cover.jpg";

const categoryFallbacks: Record<string, string> = {
  ai: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  devops: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  payments: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
  research: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  automation: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80",
  web: "/images/kiwik-cover.jpg",
};

export function ProjectImage({ src, alt, fallbackSrc, category, className, ...props }: ProjectImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || DEFAULT_FALLBACK);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // If src is empty or is a webpage URL (doesn't start with / or http), attempt fallback
    if (!src || src.trim() === "") {
      setImgSrc(getFallback());
    } else {
      setImgSrc(src);
      setHasError(false);
    }
  }, [src, category]);

  const getFallback = () => {
    if (fallbackSrc) return fallbackSrc;
    if (category && categoryFallbacks[category]) return categoryFallbacks[category];
    return DEFAULT_FALLBACK;
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      const fallback = getFallback();
      if (imgSrc !== fallback) {
        setImgSrc(fallback);
      }
    }
  };

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={className}
    />
  );
}
