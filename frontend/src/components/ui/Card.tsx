import { useNavigate } from "react-router-dom";
import Bag from "../icons/bag";
import FavorateOff from "../icons/FavorateOff";

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

function Card({ name, price, _id, category, images }: CardProps) {
  const navigate = useNavigate();

  // Get background color based on category
  const bgColor = categoryBg[category] || "#FFFFFF"; // default to white

  return (
    <div
      className="rounded-2xl w-[340px] h-[426px] px-4 py-4 cursor-pointer"
      style={{ backgroundColor: bgColor }}
      onClick={() => navigate(`/product/${_id}`)}
    >
      {/* Top icons */}
      <div className="flex justify-between items-center">
        <div className="h-[29px] w-[130px] rounded-[40px] bg-[#FFFFFF] flex justify-center items-center">
          <h1 className="text-black font-neogroteskessalt-light text-[8px]">
            {category}
          </h1>
        </div>
        <div className="flex gap-2">
          <div className="bg-[#FFFFFF] rounded-full h-6 w-6 flex items-center justify-center">
            <FavorateOff className="text-[#D4969B] h-3 w-3" />
          </div>
          <div className="bg-[#FFFFFF] rounded-full h-6 w-6 flex items-center justify-center">
            <Bag className="text-[#D4969B] h-6 w-4.5" />
          </div>
        </div>
      </div>

      {/* Product image */}
      <div className="flex justify-center items-center">
        <img
          className="h-72 object-contain"
          src={images[0]?.url || "/placeholder.png"}
          alt={name}
        />
      </div>

      {/* Product info */}
      <div className="px-2 pt-8 flex justify-between">
        <div>
          <h1 className="font-neogroteskessalt-light text-xs">{name}</h1>
          <h1 className="font-neogroteskessalt-light text-xs text-gray-600">
            {category.toLowerCase()}
          </h1>
        </div>
        <div className="flex items-end">
          <h1 className="text-sm font-medium">${price}</h1>
        </div>
      </div>
    </div>
  );
}

export default Card;
