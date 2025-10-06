import React from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

function Signup() {
    return (
        <div className='px-12 py-8 w-screen h-screen bg-[#F2F2F2]'>
            <div className="px-10">
                <img className='w-24 h-12' src="./public/images/logo.png" alt="" />
            </div>
            <div className="flex justify-center flex-col ">
                <div className="pt-20 flex justify-center ">
                    <h1 className='text-6xl text-[#3B3B3B] font-neogrotesk-regular'>SIGN UP</h1>
                </div>
                <div className="flex justify-center">
                    <p className='font-neogrotesk-regular text-[#8E8888] mt-4 text-center'> 
                         <span className="block">By accessing your Nuvée Account you can track and manage your orders</span>
                        <span className="block">and also save multiple addresses.</span>
                    </p>
                </div>

                <div className="flex justify-center mt-8 ">
                    <form action="" className='flex flex-col gap-2 items-center'>
                       <Input type='text' placeholder='FULLNAME'/>
                       <Input type='text' placeholder='EMAIL'/>
                       <Input type='text' placeholder='PASSWORD'/>
                       <Button  name={"SIGNUP"} className="mt-3" />
                    </form>
                </div>

                <div className="flex items-center flex-col mt-4">
                    <h1 className='text-[#8E8888] font-neogrotesk-regular'> Have an Account Already ?</h1>
                    <h1 className='underline font-neogroteskessalt-light'>Login</h1>
                </div>

            </div>
        </div>
    )
}

export default Signup
