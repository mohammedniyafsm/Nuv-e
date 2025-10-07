import Bag from "./icons/bag"
import Person from "./icons/person"
import Line from "./icons/line"
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="fixed left-0 top-0 w-full px-16 py-4">
        <div className="flex justify-between items-center ">
             <div className="">
                <img className="w-24 h-12" src="./public/images/logo.png" alt="" />
             </div>
             <div className="">
                <ul className="list-none flex gap-8 text-xs font-neogroteskessalt-light">
                  <Link to="/"><li>HOME</li></Link>
                  <Link to="/shop"><li>SHOP</li></Link>
                  <Link to="/philosophy"><li>PHILOSOPHY</li></Link>
                  <Link to="/"><li>JOURNAL</li></Link>
                </ul>
             </div>
             <div className="bg-[#333333] w-30 h-12 rounded-[5rem] flex items-center  px-4 ">
                  <Link to="/cart"><Bag className="w-8 h-6 text-white "/></Link>
                  <Line className="w-8 h-6 mr-1 text-white"/>
                  <Person className="w-5 h-6 text-white"/>
             </div>
        </div>
    </div>
  )
}

export default Navbar
