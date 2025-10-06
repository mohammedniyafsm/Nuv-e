import React from 'react'
import Navbar from '../components/Navbar'
import Bag from '../components/icons/bag'

function ProductDetail() {
    return (
        <div className='bg-[#EDCACA] w-screen h-screen'>
            <Navbar />
            <div className="flex pt-34 justify-between">
                <div className="pl-44 pt-10">
                    <img className='h-100' src="./public/images/1i.png" alt="" />
                </div>

                <div className="bg-[#F2F2F2] h-[590px] w-[700px] px-20 py-10">
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
                            <Bag className='h-7 w-7 text-[#D4969B] '/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    )
}

export default ProductDetail
