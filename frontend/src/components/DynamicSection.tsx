import { useEffect, useRef, useState } from "react";
import LeftArrowScroll from "./icons/LeftArrowScroll";
import RightArrowScroll from "./icons/RightArrowScroll";
import Card from "./ui/Card";
import axios from "axios";

interface SectionI {
  category: string;
  title: string;
  subtitle: string;
  subtitle2: string;
  priceMin?: number | "";
  priceMax?: number | "";
}

function DynamicSection({
  category,
  title,
  subtitle,
  subtitle2,
  priceMin,
  priceMax,
}: SectionI) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [product, setProduct] = useState<any[]>([]);
  const [visibleCards, setVisibleCards] = useState(1);
  const [cardWidth, setCardWidth] = useState(250);
  const [gap, setGap] = useState(8);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/products/filter`,
        {
          params: {
            category,
            priceMin: priceMin || undefined,
            priceMax: priceMax || undefined,
          },
        }
      );
      setProduct(data.response || []);
      console.log(category ,data.response)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [category, priceMin, priceMax]);

  // Update visible cards and card width based on screen size
  useEffect(() => {
    const updateCardSettings = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // Small mobile: 1 card
        setVisibleCards(1);
        setCardWidth(250);
        setGap(8);
      } else if (width < 768) {
        // Large mobile: 2 cards
        setVisibleCards(2);
        setCardWidth(250);
        setGap(8);
      } else if (width < 1024) {
        // Tablet: 2 cards
        setVisibleCards(2);
        setCardWidth(340);
        setGap(24);
      } else {
        // Desktop: 3 cards
        setVisibleCards(3);
        setCardWidth(340);
        setGap(24);
      }
    };

    updateCardSettings();
    window.addEventListener("resize", updateCardSettings);
    return () => window.removeEventListener("resize", updateCardSettings);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Calculate scroll amount based on visible cards
    const scrollAmount = (cardWidth + gap) * visibleCards;

    if (direction === "right") {
      scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else {
      scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const categoryBg: Record<string, string> = {
    "SIGNATURE COLLECTION": "#d6d0d0",
    "BLOOM ESSENCE": "#CBC6D8",
    "NOIR COLLECTION": "#F2D6AF",
    "DAYLIGHT SERIES": "#D7CDC2",
    "ELITE Oud": "#C1CBDA",
    "VELVET Desire" : "#D6CCC3"
  };

  const bgColor = categoryBg[category] || "#FFFFFF";

  return (
    <div className="w-full overflow-hidden mb-12 md:mb-16">
      <main className="px-4 md:px-6 lg:px-8">
        {/* ===== Header ===== */}
        <div className="flex justify-between items-center w-full">
          <div className="mt-8 md:mt-14 lg:mt-16">
            <h1
              className="text-base sm:text-xl md:text-2xl lg:text-3xl font-neogrotesk-regular"
              style={{ color: bgColor }}
            >
              {subtitle} <span className="font-[Georgia]">&</span> {subtitle2},
            </h1>
            <div className="mt-1">
              <h2 className="text-lg sm:text-xl md:text-3xl lg:text-[38px] leading-none text-primary font-ITCGaramondStd-BkCondIta">
                {title}
              </h2>
              <hr className="w-[70px] sm:w-[90px] md:w-[150px] lg:w-[210px] border-t-[2.5px] md:border-t-[3.5px] border-[#D8D8D8] mt-1" />
            </div>
          </div>

          {/* ===== Scroll Arrows ===== */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 pr-2 md:pr-4 mt-8 md:mt-10 lg:mt-16">
            <button
              onClick={() => handleScroll("left")}
              className="flex items-center justify-center w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] bg-[#D9D9D9] rounded-full hover:bg-primary hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <LeftArrowScroll className="w-3 h-3 md:w-4 md:h-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="flex items-center justify-center w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] bg-[#D9D9D9] rounded-full hover:bg-primary hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <RightArrowScroll className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>
        </div>

        {/* ===== Cards Section ===== */}
        <div className="relative mt-6 md:mt-10">
          <div
            ref={scrollRef}
            className="flex gap-2 md:gap-6 overflow-x-scroll scroll-smooth scrollbar-hide"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {product.length > 0 ? (
              product.map((item) => (
                <div
                  key={item._id}
                  className="flex-shrink-0 w-[250px] md:w-[340px]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <Card
                    _id={item._id}
                    category={item.category?.name || item.category}
                    name={item.name}
                    images={item.images}
                    price={item.price}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center w-full text-sm py-8">
                No products in this price range.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DynamicSection;