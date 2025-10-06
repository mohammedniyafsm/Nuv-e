import React from 'react'
import RightArrow from './icons/RightArrow'

function Filter() {
  return (
    
      <div className="flex flex-col px-16 py-20 mt-20">
              <div className="">
                <h1 className='text-[#CBB9B9] font-neogrotesk-sc-bold text-sm'>FILTERS</h1>
              </div>

              <div className=" mt-6">
                <div className="flex justify-between">
                    <h1 className='text-[#CBB9B9] font-neogroteskessalt-light text-[10px]'>RANGE</h1>
                    <RightArrow className='text-primary'/>
                </div>
                <hr className='mt-2 text-[#CBB9B9] '/>
              </div>
              <div className=" mt-4">
                <div className="flex justify-between">
                    <h1 className='text-[#CBB9B9] font-neogroteskessalt-light text-[10px]'>TYPE</h1>
                    <RightArrow className='text-primary'/>
                </div>
                <hr className='mt-2 text-[#CBB9B9] '/>
              </div>
              <div className=" mt-4">
                <div className="flex justify-between">
                    <h1 className='text-[#CBB9B9] font-neogroteskessalt-light text-[10px]'>COLLECTION</h1>
                    <RightArrow className='text-primary'/>
                </div>
                <hr className='mt-2 text-[#CBB9B9] '/>
              </div>

          </div>
   
  )
}

export default Filter
