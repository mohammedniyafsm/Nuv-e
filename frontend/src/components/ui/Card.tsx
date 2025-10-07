import React from 'react'
import Bag from '../icons/bag'
import FavorateOff from '../icons/FavorateOff'

function Card() {
    return (
        <div className='bg-[#ECC9CA] rounded-2xl w-[340px] h-[426px] px-4 py-4'>

            <div className=" flex justify-between items-center">
                <div className='h-[29px] w-[130px] rounded-[40px] bg-[#FFFFFF] flex justify-center items-center'>
                    <h1 className='text-black font-neogroteskessalt-light text-[8px]'>SIGNATURE COLLECTION </h1>
                </div>
                <div className="flex gap-2">
                    <div className="bg-[#FFFFFF] rounded-full h-6 w-6 flex items-center justify-center">
                       <FavorateOff className='text-[#D4969B] h-3 w-3' />
                    </div>
                    <div className="bg-[#FFFFFF] rounded-full h-6 w-6 flex items-center justify-center">
                       <Bag className='text-[#D4969B] h-6 w-4.5' />
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center ">
                <img className='h-72 ' src="./public/images/product1.png" alt="" />
            </div>

            <div className="px-2 pt-8 flex justify-between">
                <div className="">
                    <h1 className='font-neogroteskessalt-light text-xs'>ÉCLAT Eau de Parfum</h1>
                    <h1 className='font-neogroteskessalt-light text-xs'>Signature Collection</h1>
                </div>
                <div className="flex items-end">
                    <h1>$100</h1>
                </div>
            </div>

        </div>
    )
}

export default Card
