import React from "react";

export function SkeletonStats() {
  return (
    <div className="py-10">
      <ul className="grid grid-cols-3 gap-7">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index} className="animate-pulse">
            <div className="border rounded-md p-5 shadow-md dark:shadow-white/10">
              <div className=" flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="h-10 bg-gray-300 rounded w-16"></div>
                  </div>
                  <div className="flex flex-col">
                    <div className="h-3 bg-gray-300 rounded w-20 mb-2"></div>
                    <div className="h-2 bg-gray-300 rounded w-32"></div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
