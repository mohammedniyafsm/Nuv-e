import { Link } from "react-router-dom";
import Bag from "./icons/bag";
import Person from "./icons/person";
import Line from "./icons/line";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../app/store";
import { fetchUser } from "../features/User/UserSlice";

function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const { username } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="fixed left-0 top-0 w-full px-4 py-4 md:px-16 md:py-4">
      <div className="flex justify-between items-center">

        <div>
          <img className="w-12 h-6 md:w-24 md:h-12" src="/images/logo.png" alt="Logo" />
        </div>

        <div>
          <ul className="list-none flex gap-2 text-[8px] md:gap-8 md:text-xs font-neogroteskessalt-light">
            <Link to="/"><li>HOME</li></Link>
            <Link to="/shop"><li>SHOP</li></Link>
            <Link to="/wishlist"><li>WISHLIST</li></Link>
            <Link to="/philosophy"><li>PHILOSOPHY</li></Link>
          </ul>
        </div>

        <div className="bg-[#333333] w-14 h-6 md:w-30 md:h-12 rounded-[5rem] flex items-center px-2 md:px-4">
          {username?.trim() ? (
            <>
              <Link to="/cart"><Bag className="w-5 h-3 md:w-8 md:h-6 text-white" /></Link>
              <Line className="w-2 h-2.5 md:w-8 md:h-6 md:mr-1 text-white" />
              <Link to="/account"><Person className="w-4 h-2.5 md:w-5 md:h-6 text-white" /></Link>
            </>
          ) : (
            <Link to="/login"><span className="text-white pl-6 font-neogrotesk-regular">Login</span></Link>
          )}
        </div>
      </div>
    </div>
  );
}


export default Navbar;
