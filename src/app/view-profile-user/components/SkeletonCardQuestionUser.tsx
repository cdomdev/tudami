import React from "react";

export function SkeletonCardQuestionUser() {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-2">
      {/* Título - barra más grande y gruesa */}
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 animate-pulse mb-3"></div>
      
      {/* Primera línea de texto */}
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full animate-pulse mb-2"></div>
      
      {/* Segunda línea de texto */}
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-5/6 animate-pulse"></div>
    </div>
  );
}

export function MultipleSkeletonCardQuestionUser({
  count = 3,
}: {
  count?: number;
}) {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <SkeletonCardQuestionUser key={index} />
        ))}
    </>
  );
}
