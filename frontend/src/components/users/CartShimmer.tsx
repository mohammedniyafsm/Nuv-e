export default function CartShimmer() {
  return (
    <div className="container mx-auto mt-16 px-4 sm:px-6 lg:px-8 max-w-7xl animate-pulse">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Left section shimmer */}
        <div className="flex-1 lg:py-20">
          <div className="h-6 w-40 bg-gray-200 rounded mb-8" />
          <div className="h-8 w-56 bg-gray-200 rounded mb-6" />

          <div className="bg-white rounded-2xl shadow-lg p-6 max-h-[600px]">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-6 p-4 border-b last:border-b-0"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-24 w-24 bg-gray-200 rounded-lg" />
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-8 bg-gray-200 rounded-full" />
                  <div className="h-8 w-8 bg-gray-200 rounded-full" />
                </div>
                <div className="h-6 w-12 bg-gray-200 rounded" />
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Right section shimmer */}
        <div className="lg:w-96 bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-6">
          <div className="h-8 w-40 bg-gray-200 rounded" />

          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
          </div>

          <div className="h-12 w-full bg-gray-200 rounded mt-4" />
        </div>

      </div>
    </div>
  );
}
