import React from 'react'

function UserProfileHeader() {
  return (
    <div className='bg-[#ffff] w-full px-4 py-8 rounded-xl border border-[#dbdada]'>

      <div className="flex gap-8 items-center">
          <div className="">
            <img className='h-20 w-20 rounded-full' src="./public/images/1k.jpg"  alt="" />
          </div>
          <div className="font-neogrotesk-ultralight">
            <h1 >Sophie Anderson</h1>
            <h1 className='text-[#8a7a7aed]'>ophie.anderson@email.com</h1>
            <h1 className='text-[#8a7a7aed]'>Member since March 2024</h1>
          </div>
      </div>


    </div>
  )
}

export default UserProfileHeader
