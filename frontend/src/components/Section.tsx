import RightArrow from "./icons/RightArrow";
import DynamicSection from "./DynamicSection";
import { useState } from "react";

function Section() {
  const [priceMin, setPriceMin] = useState<number | "">("");
  const [priceMax, setPriceMax] = useState<number | "">("");

  const [products] = useState([
    {
      category: "SIGNATURE COLLECTION",
      title: "Nuvée Signature",
      subtitle: "For Every Mood",
      subtitle2: "Moment",
    },
    {
      category: "BLOOM ESSENCE",
      title: "Nuvée Luxury",
      subtitle: "Experience Timeless",
      subtitle2: "Comfort",
    },
  ]);

  return (
    <div className="md:flex w-full min-h-screen bg-white scroll-smooth overflow-x-hidden">
      {/* ---------- Sidebar Filters ---------- */}
      <aside className="hidden md:w-[350px] md:xl:mt-32 xl:block flex-shrink-0">
        <div className="sticky md:top-10 md:left-0 md:flex md:flex-col md:px-16 md:py-20 md:mt-20">
          <h1 className="md:text-sm text-[#b2a0a0] font-neogrotesk-sc-bold">
            FILTERS
          </h1>

          {/* Price Range Filter */}
          <div className="md:mt-6">
            <div className="flex md:justify-between md:items-center">
              <span className="md:text-[10px] text-[#bda0a0] font-neogroteskessalt-light">
                PRICE RANGE
              </span>
              <RightArrow className="text-primary" />
            </div>

            <div className="md:mt-4 flex flex-col gap-3">
              <input
                type="number"
                value={priceMin}
                onChange={(e) =>
                  setPriceMin(e.target.value ? Number(e.target.value) : "")
                }
                placeholder="Min"
                className="border border-gray-300 rounded px-3 py-1 text-xs focus:outline-none"
              />
              <input
                type="number"
                value={priceMax}
                onChange={(e) =>
                  setPriceMax(e.target.value ? Number(e.target.value) : "")
                }
                placeholder="Max"
                className="border border-gray-300 rounded px-3 py-1 text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>
      </aside>

      {/* ---------- Main Content ---------- */}
      <div className="md:flex md:flex-col md:flex-grow md:mt-14 md:pb-28 min-w-0">
        {products.map((s, index) => (
          <DynamicSection
            key={index}
            category={s.category}
            title={s.title}
            subtitle={s.subtitle}
            subtitle2={s.subtitle2}
            priceMin={priceMin}
            priceMax={priceMax}
          />
        ))}
      </div>
    </div>
  );
}

export default Section;