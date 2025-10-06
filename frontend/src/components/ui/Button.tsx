import React from 'react'

interface ButtonProps {
    name : String,
    className? : String,
}

function Button({name,className="" }:ButtonProps) {
  return (
    <div className={`h-14 w-44 bg-[#3B3B3B] rounded-4xl flex justify-center items-center ${className}`}>
      <h1 className='font-neogroteskessalt-light text-white'>{name}</h1>
    </div>
  )
}

export default Button
