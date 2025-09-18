export function SkeletonCard() {
  return (
    <>
      <div className="mb-4">
        <div className="h-3 mb-2 max-w-20  bg-gray-600 rounded w-2/4  animate-pulse" />
        <div className="h-10  bg-gray-800/60  rounded w-1/4  animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="max-w-[350px] h-[200px] bg-gray-800/60 rounded-2xl animate-pulse flex flex-col justify-end  overflow-hidden space-y-4"
          >
            <div className="h-3  bg-gray-600 rounded w-2/4 mx-auto" />
            <div className="mx-10 rounded-t-lg  h-[100px] bg-gray-700" />
          </div>
        ))}
      </div>
    </>
  );
}
