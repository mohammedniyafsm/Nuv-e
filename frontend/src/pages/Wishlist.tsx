import WishlistCard from "../components/WishlistCard";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { WishLists } from "../features/WishList/WishlistSlice";

function Wishlist() {

  const dispatch = useDispatch<AppDispatch>();

  const { products } = useSelector((state : RootState)=>state.wishlist)

  useEffect(()=>{
    dispatch(WishLists())
  },[])

  return (
    <>
      <Navbar />
      <div className="w-[1460px] grid grid-cols-4 mt-36 mb-10 pl-10">
          {products.map((s)=>(
            <WishlistCard 
            _id={s._id}  
            name={s.name}
            category={s.category}
            price={s.price}
            images={s.images}
            />
          ))}
      
      </div>
    </>
  );
}

export default Wishlist;
