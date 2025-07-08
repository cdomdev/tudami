export const ProfileSkeleton = () => {
  return (
    <section className="max-w-5xl mx-auto p-6 mt-10">
      {/* Header del perfil skeleton */}
      <div className=" mb-8 overflow-hidden">
        {/* Header Profile Skeleton */}
        <header className=" mb-8">
          <div className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {/* Avatar skeleton */}
                <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full border-4 border-blue-200 animate-pulse"></div>
                {/* Award badge skeleton */}
                <div className="absolute -bottom-2 -right-2 bg-gray-300 dark:bg-gray-600 p-2 rounded-full animate-pulse">
                  <div className="w-5 h-5"></div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                {/* Name skeleton */}
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-md w-64 mb-4 animate-pulse"></div>

                <div className="flex items-center mb-4 flex-col">
                  {/* Join date skeleton */}
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-48 mb-2 animate-pulse"></div>
                  {/* Location skeleton */}
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-32 animate-pulse"></div>
                </div>

                {/* Reputation badge skeleton */}
                <div className="h-7 bg-gray-300 dark:bg-gray-600 rounded-full w-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </header>

        <div className="px-8 pb-8 space-y-6 bg-gray-50 dark:bg-slate-700">
          {/* Bio skeleton */}
          <div className="  p-4 rounded-lg">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded-md w-24 mb-2 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-full animate-pulse"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-1/2 animate-pulse"></div>
            </div>
          </div>

          {/* Estadísticas skeleton */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-md w-12 mx-auto mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-16 mx-auto animate-pulse"></div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-md w-12 mx-auto mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-20 mx-auto animate-pulse"></div>
            </div>
          </div>

          {/* Botones de contacto skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex-1 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
            <div className="flex-1 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Sección adicional - Actividad reciente skeleton */}
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-md w-48 animate-pulse"></div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {/* Activity items skeleton */}
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2"
              >
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-20 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
