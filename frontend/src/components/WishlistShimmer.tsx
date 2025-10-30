const WishlistShimmer = () => {
  // Array of 8 shimmer cards (you can adjust count)
  return (
    <div className="xl:w-[1460px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 mt-36 mb-10 xl:pl-10">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="px-2 lg:px-6 py-2 animate-pulse"
          >
            <div className="rounded-2xl w-[195px] h-[290px] lg:w-[340px] lg:h-[426px] px-4 py-4 bg-gray-200">
              {/* top section */}
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 w-28 lg:h-[29px] lg:w-[130px] bg-gray-300 rounded-full" />
                <div className="flex gap-2">
                  <div className="h-7 w-7 lg:h-8 lg:w-8 bg-gray-300 rounded-full" />
                  <div className="h-7 w-7 lg:h-8 lg:w-8 bg-gray-300 rounded-full" />
                </div>
              </div>

              {/* product image shimmer */}
              <div className="h-[180px] lg:h-72 bg-gray-300 rounded-xl mb-6" />

              {/* bottom info shimmer */}
              <div className="flex justify-between">
                <div>
                  <div className="h-3 w-24 bg-gray-300 rounded mb-2" />
                  <div className="h-3 w-16 bg-gray-300 rounded" />
                </div>
                <div className="h-3 w-10 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WishlistShimmer;
