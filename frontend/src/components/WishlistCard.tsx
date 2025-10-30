import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeWishlist } from "../features/WishList/WishlistSlice";
import { addCart } from "../features/Cart/CartSlice";
import type { AppDispatch } from "../app/store";

import FavorateOn from "./icons/FavorateOn";
import Bag from "./icons/bag";

interface WishListI {
  _id: string;
  name: string;
  category: string;
  size?: string;
  price: number;
  images: { url: string; alt: string; _id: string }[];
}

const categoryBg: Record<string, string> = {
 "SIGNATURE COLLECTION": "#ECC9CA",
  "BLOOM ESSENCE": "#CBC6D8",
  "NOIR COLLECTION": "#F2D6AF",
  "DAYLIGHT SERIES": "#D7CDC2",
  "ELITE Oud": "#C1CBDA",
  "VELVET Desire": "#D6CCC3"
};

function WishlistCard({ _id, name, category, size, price, images }: WishListI) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const bgColor = categoryBg[category] || "#FFFFFF";

  const handleRemoveWishlist = () => {
    dispatch(removeWishlist(_id));
  };

  const handleAddToCart = () => {
    dispatch(addCart({ productId: _id, price, quantity: 1 }));
    dispatch(removeWishlist(_id));
  };

  return (
    <div className="px-2 lg:px-6 py-2">
      <div
        className="rounded-2xl w-[195px] h-[290px] lg:w-[340px] lg:h-[426px] px-4 py-4 cursor-pointer transition-transform hover:scale-[1.02]"
        style={{ backgroundColor: bgColor }}
      >
        {/* ===== Top Section ===== */}
        <div className="flex justify-between items-center gap-2">
          <div className="h-6 w-28 lg:h-[29px] lg:w-[130px] rounded-[40px] bg-white flex justify-center items-center">
            <h1 className="text-black font-neogroteskessalt-light text-[7px] lg:text-[8px]">
              {category}
            </h1>
          </div>

          <div className="flex gap-1 lg:gap-2">
            {/* Remove from Wishlist */}
            <button
              onClick={handleRemoveWishlist}
              className="bg-white rounded-full h-7 w-7 lg:h-8 lg:w-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Remove from wishlist"
            >
              <FavorateOn className="text-[#D4969B] h-3.5 w-3.5 lg:h-4 lg:w-4" />
            </button>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="bg-white rounded-full h-7 w-7 lg:h-8 lg:w-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Add to cart"
            >
              <Bag className="text-[#D4969B] h-5 w-5 lg:h-6 lg:w-6" />
            </button>
          </div>
        </div>

        {/* ===== Product Image Section ===== */}
        <div
          onClick={() => navigate(`/product/${_id}`)}
          className="flex justify-center items-center group relative h-[180px] lg:h-72 overflow-hidden"
        >
          <img
            className="absolute w-[140px] lg:w-[280px] object-contain transition-opacity duration-300 opacity-100 group-hover:opacity-0"
            src= { images[0].url  || "./images/product1.png"}
            alt={name}
          />
          <img
            className="absolute w-[140px] lg:w-[280px] object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            src= { images[1].url  || "./images/product1.png"}
            alt={`${name} hover`}
          />
        </div>

        {/* ===== Product Info Section ===== */}
        <div className="flex justify-between items-end gap-2 mt-8 lg:mt-2">
          <div className="flex-1 min-w-0">
            <h1 className="font-neogroteskessalt-light text-[8px] lg:text-xs truncate">
              {name} {size && `(${size})`}
            </h1>
            <h1 className="font-neogroteskessalt-light text-[9px] lg:text-[10px] text-gray-600 truncate">
              {category.toLowerCase()}
            </h1>
          </div>
          <div className="flex-shrink-0">
            <h1 className="text-xs lg:text-sm font-medium">${price}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishlistCard;
