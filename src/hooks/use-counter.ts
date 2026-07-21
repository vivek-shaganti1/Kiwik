"use client";

import { useState, useEffect } from "react";

export function useCounter(endValue: string | number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [suffix, setSuffix] = useState("");
  const [prefix, setPrefix] = useState("");
  const [numericValue, setNumericValue] = useState(0);
  const [decimals, setDecimals] = useState(0);

  useEffect(() => {
    const valStr = endValue.toString();
    const match = valStr.match(/^([^0-9.-]*)([-+]?[0-9]*\.?[0-9]+)([^0-9]*)$/);
    
    if (match) {
      setPrefix(match[1]);
      const num = parseFloat(match[2]);
      setNumericValue(num);
      setSuffix(match[3]);
      
      const split = match[2].split(".");
      if (split.length > 1) {
        setDecimals(split[1].length);
      }
    } else {
      const num = parseFloat(valStr) || 0;
      setNumericValue(num);
    }
  }, [endValue]);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // easeOutExpo
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(numericValue * easeOut);

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    if (numericValue > 0) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [numericValue, duration]);

  return `${prefix}${count.toFixed(decimals)}${suffix}`;
}
