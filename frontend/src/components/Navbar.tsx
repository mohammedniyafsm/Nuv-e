import Bag from "./icons/bag"
import Person from "./icons/person"
import Line from "./icons/line"

function Navbar() {
  return (
    <div className="fixed left-0 top-0 w-full px-10 py-6">
        <div className="flex justify-between items-center ">
             <div className="">
                <img className="w-24 h-12" src="./public/images/logo.png" alt="" />
             </div>
             <div className="">
                <ul className="list-none flex gap-4 text-xs">
                  <li>HOME</li>
                  <li>PRODUCTS</li>
                  <li>PHILOSOPHY</li>
                  <li>JOURNAL</li>
                </ul>
             </div>
             <div className="bg-[#333333] w-28 h-10 rounded-3xl flex items-center justify-center px-4 ">
                  <Bag className="w-8 h-8 text-white"/>
                  <Line className="w-8 h-6 text-white"/>
                  <Person className="w-8 h-6 text-white"/>
             </div>
        </div>
    </div>
  )
}

export default Navbar
