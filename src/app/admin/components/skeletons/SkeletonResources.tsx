export function SkeletonResources() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex justify-between items-center border border-dashed rounded-md p-2 mb-4 animate-pulse"
        >
          <div className="flex items-center gap-2 p-2">
            <div className=" w-40">
              <div className="h-2 bg-gray-400 rounded mb-2 w-3/4"></div>
              <div className="h-2 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
          <div className="flex gap-1 items-center flex-col py-2">
            <div className="h-6 bg-gray-300 rounded-full w-20 mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-2xl mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-12"></div>
          </div>
        </div>
      ))}
    </>
  );
}
