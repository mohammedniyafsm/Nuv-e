import { useEffect, useState } from "react";
import RightArrow from "../components/icons/RightArrow";
import Navbar from "../components/Navbar";
import Card from "../components/ui/Card";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../app/store";
import { allProduct } from "../features/Product/Product";
import Card1 from "../components/ui/Card1";

function Shop() {
    const { products } = useSelector((state: RootState) => state.product);
    const dispatch = useDispatch<AppDispatch>();


    // --- Sidebar toggle states ---
    const [showRange, setShowRange] = useState(false);
    const [showType, setShowType] = useState(false);
    const [showCollection, setShowCollection] = useState(false);
    const [model,setmodel] = useState(false)


    useEffect(() => {
        dispatch(allProduct())
    }, [])

    // --- Filter values ---
    const [minPrice, setMinPrice] = useState<number | "">("");
    const [maxPrice, setMaxPrice] = useState<number | "">("");
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
    const [limit, setLimit] = useState(0);

    const clearAll = () => {
        setMinPrice("");
        setMaxPrice("");
        setSelectedType(null);
        setSelectedCollection(null);
        setShowRange(false);
        setShowType(false);
        setShowCollection(false)
    };

    return (
        <>
            <Navbar />
            <div className="flex pt-20 ">
                {/* Sidebar */}
                <aside className="hidden lg:block w-[350px] fixed top-20 left-0">
                    <div className="flex flex-col px-16 py-20">
                        <div className="flex justify-between items-center ">
                            <h1 className="text-sm text-[#b2a0a0] font-neogrotesk-sc-bold">FILTERS</h1>
                            <button
                                className=" text-xs text-[#bda0a0]"
                                onClick={clearAll}
                            >
                                Clear All
                            </button>
                        </div>


                        {/* RANGE */}
                        <div className="mt-6 cursor-pointer" onClick={() => setShowRange(!showRange)}>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-[#bda0a0] font-neogroteskessalt-light">
                                    RANGE
                                </span>
                                <RightArrow className="text-primary" />
                            </div>
                            <hr className="mt-2 text-[#CBB9B9]" />
                            {showRange && (
                                <div className="flex gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(Number(e.target.value))}
                                        className="border border-[#C9C7C7] w-20 h-8 px-2 text-xs rounded"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                                        className="border border-[#C9C7C7] w-20 h-8 px-2 text-xs rounded"
                                    />
                                </div>
                            )}
                        </div>

                        {/* TYPE */}
                        <div className="mt-4 cursor-pointer" onClick={() => setShowType(!showType)}>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-[#bda0a0] font-neogroteskessalt-light">
                                    TYPE
                                </span>
                                <RightArrow className="text-primary" />
                            </div>
                            <hr className="mt-2 text-[#CBB9B9]" />
                            {showType && (
                                <div className="flex flex-col mt-2 gap-1" onClick={(e) => e.stopPropagation()}>
                                    {["SIGNATURE COLLECTION", "BLOOM ESSENCE"].map((type) => (
                                        <button
                                            key={type}
                                            className={`text-xs px-2 py-1 rounded ${selectedType === type ? "bg-gray-300" : "bg-white"}`}
                                            onClick={() => setSelectedType(type)}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* COLLECTION */}
                        <div className="mt-4 cursor-pointer" onClick={() => setShowCollection(!showCollection)}>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-[#bda0a0] font-neogroteskessalt-light">
                                    COLLECTION
                                </span>
                                <RightArrow className="text-primary" />
                            </div>
                            <hr className="mt-2 text-[#CBB9B9]" />
                            {showCollection && (
                                <div className="flex flex-col mt-2 gap-1" onClick={(e) => e.stopPropagation()}>
                                    {["Opposite 1", "Opposite 2", "Opposite 3"].map((collection) => (
                                        <button
                                            key={collection}
                                            className={`text-xs px-2 py-1 rounded ${selectedCollection === collection ? "bg-gray-300" : "bg-white"}`}
                                            onClick={() => setSelectedCollection(collection)}
                                        >
                                            {collection}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </aside>

                {/* Products */}




                <div className="">
                    <div className="flex xl:flex-grow lg:ml-[250px] xl:ml-[350px]">
                        <div className="w-full md:px-10">
                            <div className="px-4 flex  items-center">
                                <div className="flex justify-end py-10 pr-10">
                                    <input
                                        type="text"
                                        placeholder="Search Product"
                                        className="border border-[#C9C7C7] md:w-86 md:h-12 w-64 h-12 text-xs rounded-4xl px-10 text-[#6b5a5a] font-neogroteskessalt-light"
                                    />
                                </div>
                                <div className="block md:hidden flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-xl cursor-pointer hover:bg-gray-50">
                                    <div className=" flex flex-col justify-center items-center gap-[4px]">
                                        <span className="block w-5 h-[1.5px] bg-gray-500"></span>
                                        <span className="block w-5 h-[1.5px] bg-gray-500"></span>
                                        <span className="block w-5 h-[1.5px] bg-gray-500"></span>
                                    </div>
                               
                                    <h1 className="text-sm text-gray-700">Filter</h1>
                                </div>
                            </div>
                            <div className="flex gap-4 justify-center flex-wrap">
                                {products.map((s) => (
                                    <Card1
                                        name={s.name}
                                        category={s.category}
                                        images={s.images}
                                        price={s.price}
                                        key={s._id}
                                        _id={s._id}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-center items-center gap-4 py-10 lg:ml-64 xl:ml-80">
                        <h1 onClick={() => setLimit(1)} className={` ${limit == 1 ? "bg-gray-300" : "bg-gray-100"}  h-6 w-6 flex justify-center rounded-full items-center text-xs`}>1</h1>
                        <h1 onClick={() => setLimit(2)} className={` ${limit == 2 ? "bg-gray-300" : "bg-gray-100"}  h-6 w-6 flex justify-center rounded-full items-center text-xs`}>2</h1>
                        <h1 onClick={() => setLimit(3)} className={` ${limit == 3 ? "bg-gray-300" : "bg-gray-100"}  h-6 w-6 flex justify-center rounded-full items-center text-xs`}>3</h1>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Shop;
