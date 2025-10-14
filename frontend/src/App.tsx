import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Cart from "./pages/Cart"
import Wishlist from "./pages/Wishlist"
import ProductDetail from "./pages/ProductDetail"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Otp from "./pages/Otp"
import Philosophy from "./pages/Philosophy"
import Shop from "./pages/Shop"
import Account from "./pages/Account"
import AdminDashboard from "./pages/AdminDashboard"
import AdminLogin from "./pages/AdminLogin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/wishlist' element={<Wishlist/>} />
        <Route path='/product' element={<ProductDetail/>} />
        <Route path='/shop' element={<Shop/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/otp' element={<Otp/>} />
        <Route path='/philosophy' element={<Philosophy/>} />
        <Route path='/account' element={<Account/>} />
        <Route path='/dashboard' element={<AdminDashboard/>} />
        <Route path='/admin' element={<AdminLogin/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
