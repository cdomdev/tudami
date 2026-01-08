import React from "react";

export function SkeletonUsers() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex justify-between items-end p-2 border-b animate-pulse mb-1"
        >
          <div className="flex items-center gap-2 p-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <div className="h-4 bg-gray-300 rounded mb-1 w-24"></div>
              <div className="h-3 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
          <div className="h-3 bg-gray-300 rounded w-20"></div>
        </div>
      ))}
    </>
  );
}