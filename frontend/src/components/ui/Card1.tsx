import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Bag from "../icons/bag";
import FavorateOff from "../icons/FavorateOff";
import FavorateOn from "../icons/FavorateOn";

import {
  addWishlist,
  removeWishlist,
  WishLists,
} from "../../features/WishList/WishlistSlice";
import { addCart, Carts, updateCart } from "../../features/Cart/CartSlice";

import type { AppDispatch, RootState } from "../../app/store";

interface CartItem {
  _id: string;
  // ✅ productId can be either a string or an object
  productId: string | { _id: string };
  quantity?: number;
}

interface CardProps {
  name: string;
  price: number;
  _id: string;
  category: string;
  images: { url: string }[];
}

const categoryBg: Record<string, string> = {
  "SIGNATURE COLLECTION": "#ECC9CA",
  "BLOOM ESSENCE": "#CBC6D8",
};

function Card1({ name, price, _id, category, images }: CardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { products } = useSelector((state: RootState) => state.wishlist);
  const { items } = useSelector((state: RootState) => state.cart);

  const [favour, setFavour] = useState<boolean>(false);

  // ✅ Find matching cart item safely (works for both string and object productId)
  const cartExits = useMemo(() => {
    return items.find((s: CartItem) => {
      if (typeof s.productId === "string") return s.productId === _id;
      return s.productId?._id === _id;
    });
  }, [items, _id]);

  useEffect(() => {
    dispatch(WishLists());
    dispatch(Carts());
  }, [dispatch]);

  useEffect(() => {
    const isFavour = products?.some((p) => p._id === _id);
    setFavour(isFavour);
  }, [products, _id]);

  const bgColor = categoryBg[category] || "#FFFFFF";

  const handleAddToCart = () => {
    if (cartExits) {
      const updatedQuantity = (cartExits.quantity ?? 0) + 1;
      dispatch(
        updateCart({ itemId: cartExits._id, quantity: updatedQuantity })
      );
      toast.success("Added to Cart");
    } else {
      dispatch(addCart({ productId: _id, quantity: 1, price }));
      toast.success("Added to Cart");
    }
  };

  const handleWishlistToggle = () => {
    if (favour) {
      dispatch(removeWishlist(_id));
      toast.success("Removed from Wishlist");
    } else {
      dispatch(addWishlist(_id));
      toast.success("Added to Wishlist");
    }
  };

  return (
    <div
      className="rounded-2xl w-[195px] h-[290px] md:w-[340px] md:h-[426px] px-4 py-4 cursor-pointer transition-transform hover:scale-[1.02]"
      style={{ backgroundColor: bgColor }}
    >
      {/* ===== Top Section ===== */}
      <div className="flex justify-between items-center gap-2">
        <div className="h-6 w-28 md:h-[29px] md:w-[130px] rounded-[40px] bg-white flex justify-center items-center">
          <h1 className="text-black font-neogroteskessalt-light text-[7px] md:text-[8px]">
            {category}
          </h1>
        </div>

        <div className="flex gap-1 md:gap-2">
          {/* Wishlist Icon */}
          <button
            className="bg-white rounded-full h-7 w-7 md:h-8 md:w-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
            onClick={handleWishlistToggle}
            aria-label="Toggle wishlist"
          >
            {favour ? (
              <FavorateOn className="text-[#D4969B] h-3.5 w-3.5 md:h-4 md:w-4" />
            ) : (
              <FavorateOff className="text-[#D4969B] h-3.5 w-3.5 md:h-4 md:w-4" />
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={handleAddToCart}
            className="bg-white relative rounded-full h-7 w-7 md:h-8 md:w-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Add to cart"
          >
            {cartExits?.quantity && cartExits.quantity > 0 && (
              <div className="absolute bg-gray-200 h-3.5 w-3.5 rounded-full -top-1 -right-1 text-[8px] md:text-[9px] flex items-center justify-center font-medium">
                <span>{cartExits.quantity}</span>
              </div>
            )}
            <Bag className="text-[#D4969B] h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>
      </div>

      {/* ===== Product Image Section ===== */}
      <div className="flex justify-center items-center group relative h-[180px] md:h-72 overflow-hidden">
        <img
          onClick={() => navigate(`/product/${_id}`)}
          className="absolute w-[140px] md:w-[280px] object-contain transition-opacity duration-300 opacity-100 group-hover:opacity-0 cursor-pointer"
          src= "./images/product1.png"
          alt={name}
        />
        <img
          onClick={() => navigate(`/product/${_id}`)}
          className="absolute w-[140px] md:w-[280px] object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
          src= "./images/product2.png"
          alt={`${name} hover`}
        />
      </div>

      {/* ===== Product Info Section ===== */}
      <div className="flex justify-between items-end gap-2 mt-8 md:mt-2">
        <div className="flex-1 min-w-0">
          <h1 className="font-neogroteskessalt-light text-[8px] md:text-xs truncate">
            {name}
          </h1>
          <h1 className="font-neogroteskessalt-light text-[9px] md:text-[10px] text-gray-600 truncate">
            {category.toLowerCase()}
          </h1>
        </div>
        <div className="flex-shrink-0">
          <h1 className="text-xs md:text-sm font-medium">${price}</h1>
        </div>
      </div>
    </div>
  );
}

export default Card1;
