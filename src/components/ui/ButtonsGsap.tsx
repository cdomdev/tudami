"use client";

import {  useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

interface ButtonGsapProps {
  text: string;
  className?: string;
  href?: string;
  flairColor?: string; 
}

export function ButtonGsap({
  text,
  className = "",
  href = "#",
  flairColor = "bg-white",
}: ButtonGsapProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const flairRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const flair = flairRef.current;
    if (!button || !flair) return;

    const xSet = gsap.quickSetter(flair, "xPercent");
    const ySet = gsap.quickSetter(flair, "yPercent");

    const getXY = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = gsap.utils.clamp(
        0,
        100,
        gsap.utils.mapRange(0, rect.width, 0, 100)(e.clientX - rect.left)
      );
      const y = gsap.utils.clamp(
        0,
        100,
        gsap.utils.mapRange(0, rect.height, 0, 100)(e.clientY - rect.top)
      );
      return { x, y };
    };

    const handleEnter = (e: MouseEvent) => {
      const { x, y } = getXY(e);
      xSet(x);
      ySet(y);
      gsap.to(flair, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleLeave = (e: MouseEvent) => {
      const { x, y } = getXY(e);
      gsap.killTweensOf(flair);
      gsap.to(flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMove = (e: MouseEvent) => {
      const { x, y } = getXY(e);
      gsap.to(flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: "power2",
      });
    };

    button.addEventListener("mouseenter", handleEnter);
    button.addEventListener("mouseleave", handleLeave);
    button.addEventListener("mousemove", handleMove);

    return () => {
      button.removeEventListener("mouseenter", handleEnter);
      button.removeEventListener("mouseleave", handleLeave);
      button.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <Link
      href={href}
      ref={buttonRef}
      className={`relative inline-flex items-center justify-center rounded-full font-semibold transition-colors duration-150 overflow-hidden group ${className}`}
    >
      <span
        ref={flairRef}
        className="absolute inset-0 pointer-events-none scale-0 origin-top-left will-change-transform z-0"
      >
        <span
          className={`absolute top-0 left-0 w-[170%] aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 ${flairColor}`}
        />
      </span>
      <span className="relative z-10 text-center transition-colors duration-50 group-hover:duration-150">
        {text}
      </span>
    </Link>
  );
}
