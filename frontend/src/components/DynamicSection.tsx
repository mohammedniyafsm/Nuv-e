import { useEffect, useRef, useState } from "react";
import RightArrow from "./icons/RightArrow";
import LeftArrowScroll from "./icons/LeftArrowScroll";
import RightArrowScroll from "./icons/RightArrowScroll";
import Card from "./ui/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface SectionI {
    category: string,
    title: string,
    subtitle: string
    subtitle2: string
}

const CARD_WIDTH = 350;
const VISIBLE_CARDS = 3;

function DynamicSection({ category, title, subtitle, subtitle2 }: SectionI) {

    const scrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const [product, setProduct] = useState<any[]>([]);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/user/products/filter`,
                    { params: { category } }
                );
                setProduct(data.response || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProduct();
    }, []);


    const handleScroll = (direction: "left" | "right") => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const scrollAmount = CARD_WIDTH * VISIBLE_CARDS;
        const newScrollLeft =
            direction === "right"
                ? scrollContainer.scrollLeft + scrollAmount
                : scrollContainer.scrollLeft - scrollAmount;

        scrollContainer.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    };

    const categoryBg: Record<string, string> = {
        "SIGNATURE COLLECTION": "#d6d0d0",
        "BLOOM ESSENCE": "#CBC6D8",
    };


    const bgColor = categoryBg[category] || "#FFFFFF"; 


    return (
        <div >
            {/* ---------- Main Content ---------- */}
            <main className="flex-grow px-12 py-4 overflow-hidden">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <div className="mt-16 ml-6">
                        <h1 className="text-3xl font-neogrotesk-regular" style={{color : bgColor}}>
                            {subtitle} <span className="font-[Georgia]">&</span> {subtitle2},
                        </h1>
                        <div className="w-[239px]">
                            <h2 className="text-[38px] leading-none text-primary font-ITCGaramondStd-BkCondIta">
                                {title}
                            </h2>
                            <hr className="w-[210px] border-t-[3.5px] border-[#D8D8D8]" />
                        </div>
                    </div>

                    {/* Scroll Arrows */}
                    <div className="flex items-center gap-6 mt-32">
                        <button
                            onClick={() => handleScroll("left")}
                            className="flex items-center justify-center w-[50px] h-[50px] bg-[#D9D9D9] rounded-full hover:bg-primary hover:text-white transition"
                        >
                            <LeftArrowScroll className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleScroll("right")}
                            className="flex items-center justify-center w-[50px] h-[50px] bg-[#D9D9D9] rounded-full hover:bg-primary hover:text-white transition"
                        >
                            <RightArrowScroll className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Cards Section */}
                <div className="relative mt-10">
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-hidden scroll-smooth"
                        style={{
                            width: `${CARD_WIDTH * VISIBLE_CARDS + (VISIBLE_CARDS - 1) * 24}px`,
                        }}
                    >
                        {product.length > 0 ? (
                            product.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex-shrink-0 w-[350px]"
                                    onClick={() => navigate(`/product/${item._id}`)}
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
                            <p className="text-gray-400 text-center">Loading products...</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default DynamicSection;
