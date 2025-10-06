
import Button from '../components/ui/Button'
import OtpInput from '../components/ui/OtpInput'

function Otp() {
    return (
        <div>
            <div className='px-12 py-8 w-screen h-screen bg-[#F2F2F2]'>
                <div className="px-10">
                    <img className='w-24 h-12' src="./public/images/logo.png" alt="" />
                </div>
                <div className="flex justify-center flex-col ">
                    <div className="pt-20 flex justify-center ">
                        <h1 className='text-6xl text-[#3B3B3B] font-neogrotesk-regular'>OTP VERIFICATION</h1>
                    </div>
                    <div className="flex justify-center">
                        <p className='font-neogrotesk-regular text-[#8E8888] mt-4 text-center'>
                            <span className="block">Secure your Nuvée experience with a quick verification — </span>
                            <span className="block">confirm it’s you and continue enjoying effortless shopping, order</span>
                            <span className="block">tracking, and saved addresses.</span>
                        </p>
                    </div>

                    <div className="flex justify-center mt-8 ">
                        <form action="" className='flex flex-col gap-2 items-center'>
                            <div className="flex gap-4">
                                <OtpInput />
                                <OtpInput />
                                <OtpInput />
                                <OtpInput />
                                <OtpInput />
                            </div>

                            <Button name={"SUBMIT"} className="mt-8 w-56" />

                        </form>
                    </div>

                    <div className="flex items-center flex-col mt-12">
                        <h1 className='text-[#8E8888] font-neogrotesk-regular'>  Didn’t  Recieve OTP  ?</h1>
                        <h1 className=' font-neogroteskessalt-light'>Resend Code</h1>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Otp
