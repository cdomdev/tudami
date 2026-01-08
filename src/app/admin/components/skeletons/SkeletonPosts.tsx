import React from "react";

export function SkeletonPosts() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <article
          key={index}
          className="flex justify-between items-center border-b mb-5 overflow-y-auto animate-pulse"
        >
          <div className="flex items-center w-full gap-2 p-2">
            <div className=" w-full">
              <div className="flex justify-between items-center mb-2">
                <div className="h-3 mb-2 bg-gray-300 rounded w-32"></div>
              </div>
              <div className="h-1 bg-gray-300 rounded w-full mb-1"></div>
              <div className="h-1 bg-gray-300 rounded w-full mb-1"></div>
              <div className="h-1 bg-gray-300 rounded w-full mb-1"></div>
              <div className="h-1 bg-gray-300 rounded w-full mb-1"></div>
              <div className="h-1 bg-gray-300 rounded w-full mb-1"></div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
