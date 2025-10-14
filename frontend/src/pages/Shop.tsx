import RightArrow from "../components/icons/RightArrow"
import Navbar from "../components/Navbar"
import Card from "../components/ui/Card"

function Shop() {
    return (
        <>
            <Navbar />

            <div className="flex  py-20">
                <div className="flex items-start  ">
                    <aside className="w-[350px] fixed top-20 left-0">
                        <div className="flex flex-col px-16 py-20 ">
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
                </div>
                <div className="flex flex-grow  ml-[350px]">
                    <div className="w-full px-10">
                        <div className="flex justify-end py-10 pr-10">
                            <input
                                type="String"
                                placeholder="Search Product"
                                className={`border border-[#C9C7C7] w-86 h-12 text-xs rounded-4xl px-10 text-[#6b5a5a] font-neogroteskessalt-light `}
                            />
                        </div>
                        <div className="flex   gap-4 flex-wrap">
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default Shop
