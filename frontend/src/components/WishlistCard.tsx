import { useNavigate } from 'react-router-dom'
import FavorateOn from './icons/FavorateOn'
import Bag from './icons/bag'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { removeWishlist } from '../features/WishList/WishlistSlice';

interface WishListI {
    _id: string;
    name: string;
    category: string;
    size?: string;
    price: number;
    images: { url: string; alt: string; _id: string }[];
}



function WishlistCard({ _id ,name ,category,size,price,images,}: WishListI) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

  return (
    <div key={_id} className='px-6 py-2'>
              <div className='bg-[#ECC9CA] rounded-2xl w-[330px] h-[426px] px-4 py-4'>

            <div className=" flex justify-between items-center">
                <div className='h-[29px] w-[130px] rounded-[40px] bg-[#FFFFFF] flex justify-center items-center'>
                    <h1 className='text-black font-neogroteskessalt-light text-[8px]'>{category}</h1>
                </div>
                <div className="flex gap-2">
                    <div onClick={()=>{
                        dispatch(removeWishlist(_id))
                    }} className="bg-[#FFFFFF] rounded-full h-6 w-6 flex items-center justify-center">
                       <FavorateOn  className='text-[#D4969B] h-3 w-3' />
                    </div>
                    <div className="bg-[#FFFFFF] rounded-full h-6 w-6 flex items-center justify-center">
                       <Bag className='text-[#D4969B] h-6 w-4.5' />
                    </div>
                </div>
            </div>
            <div onClick={()=>{navigate('/product')}} className="flex justify-center items-center ">
                <img className='h-72 ' src="./public/images/1i.png" alt="" />
                {/* <img className='h-72 ' src={images?.[0].url} alt="" /> */}
            </div>

            <div className="px-2 pt-8 flex justify-between">
                <div className="">
                    <h1 className='font-neogroteskessalt-light text-xs'>{name}{size}</h1>
                    <h1 className='font-neogroteskessalt-light text-xs'>{category}</h1>
                </div>
                <div className="flex items-end">
                    <h1>${price}</h1>
                </div>
            </div>

        </div>
    </div>
  )
}

export default WishlistCard
