import { useEffect, useState } from "react";
import RightArrow from "../components/icons/RightArrow";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../app/store";
import { allProduct, paginatedProducts, searchProducts, filterProducts } from "../features/Product/Product";
import Card1 from "../components/ui/Card1";
import { useLocation } from "react-router-dom";

function Shop() {
    const { products } = useSelector((state: RootState) => state.product);
    const dispatch = useDispatch<AppDispatch>();

    const { pathname } = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    // --- Sidebar toggle states ---
    const [showRange, setShowRange] = useState(false);
    const [showCollection, setShowCollection] = useState(false);

    const [searchquery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // --- Filter values ---
    const [minPrice, setMinPrice] = useState<number | "">("");
    const [maxPrice, setMaxPrice] = useState<number | "">("");
    const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // --- Load initial products ---
    useEffect(() => {
        dispatch(paginatedProducts({ page: currentPage, limit: 15 }));
    }, [dispatch, currentPage]);

    // --- Apply filters when values change ---
    useEffect(() => {
        if (minPrice !== "" || maxPrice !== "" || selectedCollection) {
            dispatch(filterProducts({
                priceMin: minPrice,
                priceMax: maxPrice,
                category: selectedCollection || undefined
            }));
        } else {
            dispatch(paginatedProducts({ page: currentPage, limit: 15 }));
        }
    }, [minPrice, maxPrice, selectedCollection, currentPage, dispatch]);

    const clearAll = () => {
        setMinPrice("");
        setMaxPrice("");
        setSelectedCollection(null);
        setShowRange(false);
        setShowCollection(false);
        setSearchQuery("");
        dispatch(allProduct());
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value === "") {
            dispatch(paginatedProducts({ page: currentPage, limit: 15 }));
        } else {
            dispatch(searchProducts(value));
        }
    }

    const handlePagination = (page: number) => {
        setCurrentPage(page);
    }

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
                                    {["SIGNATURE COLLECTION", "BLOOM ESSENCE"].map((type) => (
                                        <button
                                            key={type}
                                            className={`text-xs px-2 py-1 rounded ${selectedCollection === type ? "bg-gray-300" : "bg-white"}`}
                                            onClick={() => setSelectedCollection(type)}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </aside>

                {mobileFiltersOpen && (
                    <div
                        className="fixed inset-0 z-50 flex"
                        onClick={() => setMobileFiltersOpen(false)}   // close when tapping backdrop
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/30" />

                        {/* Drawer */}
                        <aside
                            className="relative w-[280px] bg-white shadow-xl flex flex-col"
                            onClick={e => e.stopPropagation()}           // prevent backdrop click from closing
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b">
                                <h2 className="text-sm font-neogrotesk-sc-bold text-[#b2a0a0]">FILTERS</h2>
                                <button
                                    className="text-xs text-[#bda0a0]"
                                    onClick={clearAll}
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Content – reuse the same UI as desktop */}
                            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">

                                {/* ---- PRICE RANGE ---- */}
                                <div>
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => setShowRange(!showRange)}
                                    >
                                        <span className="text-[10px] text-[#bda0a0] font-neogroteskessalt-light">
                                            RANGE
                                        </span>
                                        <RightArrow className="text-primary w-4 h-4" />
                                    </div>
                                    <hr className="mt-2 text-[#CBB9B9]" />
                                    {showRange && (
                                        <div className="flex gap-2 mt-2">
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                value={minPrice}
                                                onChange={e => setMinPrice(e.target.value ? Number(e.target.value) : "")}
                                                className="border border-[#C9C7C7] w-20 h-8 px-2 text-xs rounded"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                value={maxPrice}
                                                onChange={e => setMaxPrice(e.target.value ? Number(e.target.value) : "")}
                                                className="border border-[#C9C7C7] w-20 h-8 px-2 text-xs rounded"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* ---- COLLECTION ---- */}
                                <div>
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => setShowCollection(!showCollection)}
                                    >
                                        <span className="text-[10px] text-[#bda0a0] font-neogroteskessalt-light">
                                            COLLECTION
                                        </span>
                                        <RightArrow className="text-primary w-4 h-4" />
                                    </div>
                                    <hr className="mt-2 text-[#CBB9B9]" />
                                    {showCollection && (
                                        <div className="flex flex-col mt-2 gap-1">
                                            {["SIGNATURE COLLECTION", "BLOOM ESSENCE"].map(type => (
                                                <button
                                                    key={type}
                                                    className={`text-xs px-2 py-1 rounded ${selectedCollection === type ? "bg-gray-300" : "bg-white"
                                                        }`}
                                                    onClick={() => setSelectedCollection(type)}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer – Apply button */}
                            <div className="border-t p-4">
                                <button
                                    className="w-full bg-primary text-white py-2 rounded text-sm font-medium"
                                    onClick={() => {
                                        // Trigger the same filter logic you already have in useEffect
                                        if (minPrice !== "" || maxPrice !== "" || selectedCollection) {
                                            dispatch(
                                                filterProducts({
                                                    priceMin: minPrice,
                                                    priceMax: maxPrice,
                                                    category: selectedCollection || undefined,
                                                })
                                            );
                                        } else {
                                            dispatch(paginatedProducts({ page: currentPage, limit: 15 }));
                                        }
                                        setMobileFiltersOpen(false);
                                    }}
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </aside>
                    </div>
                )}

                {/* Products */}
                <div className="mb-12">
                    <div className="flex xl:flex-grow lg:ml-[250px] xl:ml-[350px] ">
                        <div className="w-full md:px-10">
                            <div className="px-4 flex  items-center">
                                <div className="flex justify-end py-10 pr-10">
                                    <input
                                        type="text"
                                        onChange={handleSearch}
                                        value={searchquery}
                                        placeholder="Search Product"
                                        className="border border-[#C9C7C7] md:w-86 md:h-12 w-64 h-12 text-xs rounded-4xl px-10 text-[#6b5a5a] font-neogroteskessalt-light"
                                    />
                                </div>
                                <div onClick={() => setMobileFiltersOpen(true)} className="block md:hidden  items-center  border border-gray-200 px-3 py-2 rounded-xl cursor-pointer hover:bg-gray-50">
                                    <div className="flex gap-2">
                                        <div className=" flex flex-col justify-center items-center gap-[4px]">
                                            <span className="block w-5 h-[1.5px] bg-gray-500"></span>
                                            <span className="block w-5 h-[1.5px] bg-gray-500"></span>
                                            <span className="block w-5 h-[1.5px] bg-gray-500"></span>
                                        </div>
                                        <h1 className="text-sm text-gray-700">Filter</h1>
                                    </div>
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

                    {/* Pagination */}
                    {products.length > 20 && (
                        <div className="flex justify-center items-center gap-4 py-10 lg:ml-64 xl:ml-80">
                            {[1, 2, 3].map((page) => (
                                <h1
                                    key={page}
                                    onClick={() => handlePagination(page)}
                                    className={` ${currentPage === page ? "bg-gray-300" : "bg-gray-100"}  h-6 w-6 flex justify-center rounded-full items-center text-xs cursor-pointer`}
                                >
                                    {page}
                                </h1>
                            ))}
                        </div>

                    )}
                </div>
            </div>
        </>
    );
}

export default Shop;
