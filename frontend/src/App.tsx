import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProductDetail from "./pages/ProductDetail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import Philosophy from "./pages/Philosophy";
import Shop from "./pages/Shop";
import Account from "./pages/Account";
import UserProfile from "./components/users/UserProfile";
import Order from "./components/users/Order";
import Address from "./components/users/Address";
import UserSetting from "./components/users/UserSetting";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotVerification from "./pages/ForgotVerification";
import Changepassword from "./pages/Changepassword";
import AdminOrderDetail from "./pages/OrderDetails";
import DashboardAdmin from "./components/admin/Dashboard";
import OrderAdmin from "./components/admin/OrderAdmin";
import ProductAdmin from "./components/admin/ProductAdmin";
import AdminCoupon from "./components/admin/AdminCoupon";
import AllUser from "./components/admin/AllUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/verify_forgot_password' element={<ForgotVerification />} />
        <Route path='/changePassword' element={<Changepassword />} />
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/philosophy' element={<Philosophy />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/otp' element={<Otp />} />

          {/* Nested Account Routes */}
          <Route path='/account' element={<Account />}>
            <Route index element={<UserProfile />} />
            <Route path='orders' element={<Order />} />
            <Route path='address' element={<Address />} />
            <Route path='setting' element={<UserSetting />} />
          </Route>
        </Route>

        <Route path='/admin' element={<AdminLogin />} />

        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<AdminDashboard />}>
            <Route index element={<DashboardAdmin />} />
            <Route path="orders"  element={<OrderAdmin />} />
            <Route path="products" element={<ProductAdmin />} />
            <Route path="coupons" element={<AdminCoupon />} />
            <Route path="users" element={<AllUser />} />
          </Route>
          <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;
