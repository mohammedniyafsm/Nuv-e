import React from "react";

import RightArrow from "./icons/RightArrow";
import LeftArrowScroll from "./icons/LeftArrowScroll";
import RightArrowScroll from "./icons/RightArrowScroll";

import Card from "./ui/Card";

function Section() {
  return (
    <div className="flex w-screen min-h-screen bg-white">
      {/* ---------- Sidebar Filters ---------- */}
      <aside className="w-[350px] mt-32">
        <div className="flex flex-col px-16 py-20 mt-20">
          <h1 className="text-sm text-[#b2a0a0] font-neogrotesk-sc-bold">
            FILTERS
          </h1>

          {/* Filter: Range */}
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-[#bda0a0] font-neogroteskessalt-light">
                RANGE
              </span>
              <RightArrow className="text-primary" />
            </div>
            <hr className="mt-2 text-[#CBB9B9]" />
          </div>

          {/* Filter: Type */}
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-[#bda0a0] font-neogroteskessalt-light">
                TYPE
              </span>
              <RightArrow className="text-primary" />
            </div>
            <hr className="mt-2 text-[#CBB9B9]" />
          </div>

          {/* Filter: Collection */}
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-[#bda0a0] font-neogroteskessalt-light">
                COLLECTION
              </span>
              <RightArrow className="text-primary" />
            </div>
            <hr className="mt-2 text-[#CBB9B9]" />
          </div>
        </div>
      </aside>

      {/* ---------- Main Content ---------- */}
      <main className="flex-grow px-20 py-20">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          {/* Title */}
          <div className="mt-16 ml-6">
            <h1 className="text-3xl text-[#d6d0d0] font-neogrotesk-regular">
              For Every Mood <span className="font-[Georgia]">&</span> Moment,
            </h1>
            <div className="w-[239px]">
              <h2 className="text-[38px] leading-none text-primary font-ITCGaramondStd-BkCondIta">
                Nuvée Signature
              </h2>
              <hr className="w-[210px] border-t-[3.5px] border-[#D8D8D8]" />
            </div>
          </div>

          {/* Scroll Arrows */}
          <div className="flex items-center gap-6 mt-32">
            <button className="flex items-center justify-center w-[50px] h-[50px] bg-[#D9D9D9] rounded-full">
              <LeftArrowScroll className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center w-[50px] h-[50px] bg-[#D9D9D9] rounded-full">
              <RightArrowScroll className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex flex-row gap-4 mt-10 ml-6">
          <Card />
          <Card />
          <Card />
        </div>
      </main>
    </div>
  );
}

export default Section;
