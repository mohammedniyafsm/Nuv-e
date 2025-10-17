import RightArrow from "./icons/RightArrow";
import DynamicSection from "./DynamicSection";
import { useState } from "react";

function Section() {
  const [products] = useState([
    {
      category: "SIGNATURE COLLECTION",
      title: "Nuvée Signature",
      subtitle: "For Every Mood  ",
      subtitle2: "Moment"
    },
    {
      category: "BLOOM ESSENCE",
      title: "Nuvée Luxury",
      subtitle: "Experience Timeless",
      subtitle2: "Comfort,"
    },
    // {
    //   category: "MODERN COLLECTION",
    //   title: "Modern Minimal",
    //   subtitle: "Style in Simplicity,",
    // },
  ]);

  return (
    <div className="flex w-screen min-h-screen bg-white overflow-hidden">
      {/* ---------- Sidebar Filters ---------- */}
      <aside className="w-[350px] mt-32">
        <div className="flex flex-col px-16 py-20 mt-20">
          <h1 className="text-sm text-[#b2a0a0] font-neogrotesk-sc-bold">
            FILTERS
          </h1>

          {["RANGE", "TYPE", "COLLECTION"].map((label, index) => (
            <div key={index} className="mt-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-[#bda0a0] font-neogroteskessalt-light">
                  {label}
                </span>
                <RightArrow className="text-primary" />
              </div>
              <hr className="mt-2 text-[#CBB9B9]" />
            </div>
          ))}
        </div>
      </aside>

      {/* ---------- Main Content ---------- */}
      <div className="flex flex-col flex-grow mt-14 pb-28">
        {products.map((s, index) => (
          <DynamicSection
            key={index}
            category={s.category}
            title={s.title}
            subtitle={s.subtitle}
            subtitle2={s.subtitle2}
          />
        ))}
      </div>
    </div>
  );
}

export default Section;
