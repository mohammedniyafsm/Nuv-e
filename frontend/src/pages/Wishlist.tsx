import Navbar from '../components/Navbar'
import WishlistCard from '../components/WishlistCard'

function Wishlist() {
  return (
    <>
    <Navbar/>
    <div className="w-[1460px] grid grid-cols-4 mt-36 mb-10 pl-10">
      <WishlistCard/>
      <WishlistCard/>
      <WishlistCard/>
      <WishlistCard/>
      <WishlistCard/>
      <WishlistCard/>
      <WishlistCard/>
      <WishlistCard/>
      <WishlistCard/>
      <WishlistCard/>
      <WishlistCard/>
      <WishlistCard/>
    </div>
    
    </>
  )
}

export default Wishlist
