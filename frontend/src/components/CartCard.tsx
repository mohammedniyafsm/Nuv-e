import LeftArrowScroll from './icons/LeftArrowScroll'
import Delete from './icons/Delete'
import RightArrowScroll from './icons/RightArrowScroll'

function CartCard() {
    return (
        <div className='mt-30 flex gap-36'>


            <div className="">

                <div className="flex gap-2 items-center pl-16">
                    <LeftArrowScroll className='h-4 w-4' />
                    <h1 className='font-neogroteskessalt-light'>Continue Shopping</h1>
                </div>

                <div className="pl-22 pt-12">
                    <h1 className='font-neogrotesk-bold text-xl'>Shopping Cart</h1>
                </div>
{/* this is cart item satart */}
                <div className="flex items-center my-6 pl-24">
                    <img src="./public/images/1i.png" className='h-20 w-20 rounded-xl' alt="" />
                    <div className="pl-6 flex flex-col gap-2">
                        <h1 className='font-neogroteskessalt-light text-[#7D7D7D] text-sm'>SIGNATURE COLLECTION</h1>
                        <h1 className='text-[#2E2E2E] text-sm'>DATE Woman Eau de Parfum</h1>
                        <p className='text-[#7D7D7D] text-xs'>100 ML</p>
                    </div>

                    <div className="flex gap-4 items-center pl-64">
                        <div className="h-10 w-10 bg-white rounded-full flex justify-center items-center border ">
                            <h1>-</h1>
                        </div>
                        <h1>1</h1>
                        <div className="h-10 w-10 bg-white rounded-full flex justify-center items-center border ">
                            <h1>+</h1>
                        </div>
                    </div>

                    <div className="px-14">
                        <h1 className='text-xl font-neogroteskessalt-light'>$100</h1>
                    </div>

                    <div className="">
                        <div className="h-10 w-10 bg-white rounded-full flex justify-center items-center border ">
                            <Delete className='h-4 w-4'/>
                        </div>
                    </div>

                </div>
            </div>


            <div className="bg-[#EFEFEF] h-[400px] w-[400px] rounded-4xl px-6 py-8 mt-20">
                <h1 className='font-neogroteskessalt-light text-2xl'>Order Summary</h1>
                <div className="mt-8 flex justify-between ">
                    <h1 className='font-neogroteskessalt-light '>Subtotal</h1>
                    <h1 className='font-neogroteskessalt-light ' >$3665</h1>
                </div>
                <div className="mt-4 flex justify-between">
                    <h1 className='font-neogroteskessalt-light '>Shipping</h1>
                    <h1 className='font-neogroteskessalt-light '>Free</h1>
                </div>
                <div className="mt-4 flex justify-between">
                    <h1 className='font-neogroteskessalt-light '>Tax</h1>
                    <h1 className='font-neogroteskessalt-light '>$85</h1>
                </div>
                <hr className='mt-6 text-[#CABFBF]'/>
                 <div className="mt-4 flex justify-between">
                    <h1 className='font-neogroteskessalt-light '>Total</h1>
                    <h1 className='font-neogroteskessalt-light '>$8225</h1>
                </div>
                <div className="flex justify-center">
                   <div className="mt-8 h-12 w-96 gap-4 bg-[#333333] rounded-full flex justify-center items-center">
                       <h1 className='text-white text-sm font-neogroteskessalt-light'>PROCEED TO CHECKOUT</h1>
                       <div className="rounded-full h-8 w-8 bg-white  flex justify-center items-center"> <RightArrowScroll className='text-[#333333] h-3 w-3'/></div>
                   </div>
                </div>
                <div className="flex justify-center pt-2">
                    <h1 className='text-sm font-neogroteskessalt-light'>Secure checkout powered by Stripe</h1>
                </div>          
            </div>


        </div>
    )
}

export default CartCard
