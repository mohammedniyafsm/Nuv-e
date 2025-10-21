import WishlistCard from "../components/WishlistCard";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { WishLists } from "../features/WishList/WishlistSlice";

function Wishlist() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.wishlist);

  useEffect(() => {
    dispatch(WishLists());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen text-gray-600 text-xl">
          Loading your wishlist...
        </div>
      </>
    );
  }

  if (!products || products.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen text-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-500 mb-6">Start adding your favorite products!</p>
          <a
            href="/shop"
            className="px-6 py-2 bg-[#333333] text-white rounded-lg hover:bg-green-700 transition"
          >
            Go to Shop
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="xl:w-[1460px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 mt-36 mb-10 xl:pl-10">
        {products.map((s) => (
          <WishlistCard
            key={s._id}
            _id={s._id}
            name={s.name}
            category={s.category}
            price={s.price}
            images={s.images}
          />
        ))}
      </div>
    </>
  );
}

export default Wishlist;
