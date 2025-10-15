"use client";
import { useState } from "react";
import { Star } from "lucide-react";

export  function StarRating({
  max = 5,
  value = 0,
  readOnly = false,
  onChange,
}: {
  max?: number;
  value?: number;
  readOnly?: boolean;
  onChange?: (value: number) => void;
}) {
  const [rating, setRating] = useState(value);
  const [hover, setHover] = useState(0);

  const currentRating = readOnly ? value : hover || rating;

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => i + 1).map((val) => (
        <Star
          key={val}
          size={28}
          className={`transition-colors ${
            !readOnly ? "cursor-pointer" : "cursor-default"
          } ${
            val <= currentRating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-none text-gray-500 "
          }`}
          onMouseEnter={() => !readOnly && setHover(val)}
          onMouseLeave={() => !readOnly && setHover(0)}
          onClick={() => {
            if (!readOnly) {
              setRating(val);
              onChange?.(val);
            }
          }}
        />
      ))}
    </div>
  );
}
