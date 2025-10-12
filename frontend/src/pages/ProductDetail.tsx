import Navbar from '../components/Navbar'
import Bag from '../components/icons/bag'
import Return30 from '../components/icons/Return30'
import Bus from '../components/icons/Bus'
import Leaf from '../components/icons/Leaf'
import Package from '../components/icons/Package'
import AsteriskStar from '../components/icons/Star'
import MedallionIcon from '../components/icons/Sun'
import Antioxide from '../components/icons/antioxide'
import Exfoliating from '../components/icons/Exfoliating'
import FooterAbove from '../components/FooterAbove'

function ProductDetail() {
    return (
        <div className='bg-[#EDCACA] w-screen h-screen'>
            <Navbar />
            <div className="">


                <div className="flex pt-34 justify-between">
                    <div className="pl-44 pt-10">
                        <img className='h-100' src="./public/images/product1.png" alt="" />
                    </div>

                    <div className="bg-[#F2F2F2] h-[800px] w-[700px] px-20 py-10">
                        <div className="bg-[#F2F2F2] border h-[29px] w-[130px] rounded-[40px] flex justify-center items-center mt-1">
                            <h1 className='text-gray-600 font-neogroteskessalt-light text-[8px]'>SIGNATURE COLLECTION</h1>
                        </div>
                        <div className="pl-2 py-4">
                            <h1 className='text-[#3B3B3B] text-5xl font-neogrotesk-bold leading-14'>DATE Woman <br />
                                Eau de <br />
                                Parfum <br />
                            </h1>
                        </div>
                        <div className="pl-1.5 flex items-center ">
                            <div className="bg-[#2E2E2E] h-7 w-22 rounded-4xl flex justify-center items-center ">
                                <h1 className='text-[11px] text-[#ffff] font-neogroteskessalt-light'>100 ML</h1>
                            </div>
                            <h1 className="text-[#2E2E2E] text-md font-neogroteskessalt-light pl-3">
                                <span className="font-sans">₹</span>800
                            </h1>
                        </div>
                        <div className="pl-1.5 pt-8">
                            <h1 className='font-neogroteskessalt-light text-sm text-[#9C8080] leading-4'>Unveil your charm with Nuvée DATE WOMAN, a fragrance crafted
                                for   elegance and allure. This perfume blends soft floral notes with a
                                hint  of warmth, making it perfect for unforgettable evenings.
                                Designed to elevate your confidence and presence.</h1>
                        </div>
                        <div className="pl-4 pt-12 flex items-center ">
                            <h1 className='font-neogroteskessalt-light text-[#2E2E2E]'>QTY</h1>
                            <div className="flex gap-4 items-center pl-4">
                                <div className="h-7 w-7 bg-[#D9D9D9] flex justify-center items-center rounded-full">-</div>
                                <h1 className='font-neogroteskessalt-light'>1</h1>
                                <div className="h-7 w-7 bg-[#D9D9D9] flex justify-center items-center rounded-full">+</div>
                            </div>
                        </div>
                        <div className="bg-[#D4969B] h-16  w-[550px] rounded-4xl mt-10 flex  items-center">
                            <h1 className='font-neogroteskessalt-light text-sm underline text-[#ffff] pl-56'>ADD TO CART</h1>
                            <div className="bg-[#F2F2F2] h-10 w-10 rounded-full flex justify-center items-center ml-46">
                                <Bag className='h-7 w-7 text-[#D4969B] ' />
                            </div>
                        </div>
                        <div className="flex justify-between py-20 px-2">
                            <div className="text-center text-xs">
                                <div className="h-12 w-12 bg-[#ffff] rounded-full flex justify-center items-center ">
                                    <Return30 />
                                </div>
                                <div className="py-4 ">
                                    <h1>30 Days</h1>
                                    <h1>Return</h1>
                                </div>
                            </div>
                            <div className="text-center text-xs">
                                <div className="h-12 w-12 bg-[#ffff] rounded-full flex justify-center items-center ">
                                    <Bus />
                                </div>
                                <div className="py-4">
                                    <h1>Free</h1>
                                    <h1>Shipping</h1>
                                </div>
                            </div>
                            <div className="text-center text-xs">
                                <div className="h-12 w-12 bg-[#ffff] rounded-full flex justify-center items-center ">
                                    <Leaf />
                                </div>
                                <div className="py-4">
                                    <h1>Vegan &</h1>
                                    <h1>Cruelty Free</h1>
                                </div>
                            </div>

                            <div className="text-center text-xs">
                                <div className="h-12 w-12 bg-[#ffff] rounded-full flex justify-center items-center ">
                                    <Package />
                                </div>
                                <div className="py-4">
                                    <h1>Kind to planet</h1>
                                    <h1>Packeging</h1>
                                </div>
                            </div>






                        </div>
                    </div>
                </div>

                <div className="h-[1500px]">
                    <div className="absolute left-28">
                        <img className='h-96 ' src="./public/images/handproduct1.png" alt="" />
                    </div>
                    <div className="flex justify-center pt-[500px]">
                        <div className="flex flex-col items-center">
                            <div className="">
                                <AsteriskStar />
                            </div>
                            <div className="text-6xl text-center py-20 font-neogrotesk-regular text-primary ">
                                <h1>A burst of botanical mist</h1>
                                <h1>reviving <span className='font-ITCGaramondStd-BkIta'>clarity</span> for dim, worn</h1>
                                <h1>and weary senses.</h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex px-20 py-16 gap-12">
                        <div className="flex flex-col gap-2 text-[#3b3b3b] font-neogrotesk-ultralight text-sm">
                            <h1 className="font-neogroteskessalt-light text-xs text-[#786e6e]">RECOMMENDED FOR</h1>
                            <ul className="list-disc pl-5 text-xs">
                                <li className="">Faded moods</li>
                                <li>Lingering heaviness</li>
                                <li>Unbalanced energy</li>
                                <li>Overwhelm</li>
                                <li>Sensory fatigue</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2 text-[#3b3b3b] font-neogrotesk-ultralight text-sm">
                            <h1 className="font-neogroteskessalt-light text-xs text-[#786e6e]">GOOD TO KNOW</h1>
                            <ul className="list-disc pl-2 text-xs">
                                <li>pH-balanced harmony</li>
                                <li>Crafted with clean botanicals</li>
                                <li>Vegan, cruelty-free elegance</li>
                                <li>No synthetic dyes added</li>
                                <li>Suitable for all temperaments</li>
                            </ul>
                        </div>
                    </div>


                    <div className="absolute right-0 ">
                        <img className='h-96 ' src="./public/images/product2.png" alt="" />
                    </div>

                </div>


                <div className="bg-[#f5f5f5] h-[1100px]">
                    <div className="flex flex-col items-center text-6xl text-primary pt-42">
                        <p className='font-ITCGaramondStd-BkIta'>all about the</p>
                        <h1 className='font-neogrotesk-bold'>PRODUCT</h1>
                    </div>

                    <div className="flex pt-32">
                        <div className="px-18">
                            <img className='h-[600px] w-[500px]' src="./public/images/p1d.png" alt="" />
                        </div>
                        <div className="px-20">
                            <div className="pt-16">
                                <h1 className='text-xs font-neogroteskessalt-light text-[#787878]'>ABOUT THE PRODUCT</h1>
                                <h1 className='text-md text-[#424242] font-neogrotesk-bold pt-4'>A boost of antioxidant-rich aromatic renewal for dull,
                                    <br /> dry, and tired senses, this super-absorbable essence helps
                                    <br /> clear emotional heaviness and energetic blemishes while <br />
                                    revealing a brighter, more balanced aura.</h1>
                            </div>
                            <div className="flex gap-20 py-10">
                                <div className="flex flex-col gap-2 text-[#3b3b3b] font-neogrotesk-ultralight text-sm">
                                    <h1 className="font-neogroteskessalt-light text-xs text-[#786e6e]">RECOMMENDED FOR</h1>
                                    <ul className="list-disc pl-5 text-xs  font-neogrotesk-bold space-y-1">
                                        <li className="">Dull aura</li>
                                        <li>Lingering pigmentation of mood</li>
                                        <li>Uneven emotional tone</li>
                                        <li>Excess energetic buildup</li>
                                        <li>Overexposed sensory pathways</li>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-2 text-[#3b3b3b] font-neogrotesk-ultralight text-sm">
                                    <h1 className="font-neogroteskessalt-light text-xs text-[#786e6e]">SUITABLE FOR</h1>
                                    <ul className="list-disc pl-4 text-xs font-neogrotesk-bold space-y-1">
                                        <li className=""> Unisex fragrance rituals for all temperaments</li>
                                        <li>Safe for expectant moments and sensitive transitions</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex  gap-14 pt-10">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="h-16 w-16 rounded-full bg-white flex justify-center items-center">
                                        <MedallionIcon />
                                    </div>
                                    <h1 className='text-xs text-[#3b3b3b] font-neogrotesk-regular'>Skin Brightening</h1>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="h-16 w-16 rounded-full bg-white flex justify-center items-center">
                                        <Leaf />
                                    </div>
                                    <h1 className='text-xs text-[#3b3b3b] font-neogrotesk-regular'> Deep Cleanse</h1>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="h-16 w-16 rounded-full bg-white flex justify-center items-center">
                                        <Antioxide />
                                    </div>
                                    <h1 className='text-xs text-[#3b3b3b] font-neogrotesk-regular'> Anti-Oxidant</h1>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="h-16 w-16 rounded-full bg-white flex justify-center items-center">
                                        <Exfoliating />
                                    </div>
                                    <h1 className='text-xs text-[#3b3b3b] font-neogrotesk-regular'>Exfoliating</h1>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <FooterAbove />


            </div>
        </div>


    )
}

export default ProductDetail
