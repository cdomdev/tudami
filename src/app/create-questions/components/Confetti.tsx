"use client";

import { useEffect } from "react";
import JSConfetti from "js-confetti";

export function Confetti() {
  useEffect(() => {
    const canvas = document.getElementById(
      "mini-confetti"
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const jsConfetti = new JSConfetti({ canvas });

    jsConfetti.addConfetti({
      confettiColors: [
        "#10b981",
        "#3b82f6",
        "#facc15",
        "#ef4444",
        "#a855f7",
        "#f472b6",
      ],
      confettiRadius: 4,
      confettiNumber: 120,
    });
  }, []);
  return (
    <canvas
      id="mini-confetti"
      className="w-2xl h-56 absolute top-16 pointer-events-none z-20"
    />
  );
}
