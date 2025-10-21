import { Link, useNavigate, useLocation } from "react-router-dom";
import Bag from "./icons/bag";
import Person from "./icons/person";
import Line from "./icons/line";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../app/store";
import { fetchUser } from "../features/User/UserSlice";
import { Carts } from "../features/Cart/CartSlice";

function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { username } = useSelector((state: RootState) => state.user);
  const { items } = useSelector((state: RootState) => state.cart);

  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(Carts());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartQuantity = items.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const currentPage = (() => {
    if (location.pathname === "/") return "Home";
    if (location.pathname.startsWith("/shop")) return "Shop";
    if (location.pathname.startsWith("/wishlist")) return "Wishlist";
    if (location.pathname.startsWith("/cart")) return "Cart";
    if (location.pathname.startsWith("/account")) return "Account";
    if (location.pathname.startsWith("/philosophy")) return "Philosophy";
    return "";
  })();

  return (
    <div
      className={`fixed left-0 top-0 z-[1000] w-full px-4 py-4 sm:px-16 md:py-4 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <Link to="/">
          <img
            className="w-12 h-6 md:w-24 md:h-12"
            src="/images/logo.png"
            alt="Logo"
          />
          </Link>
        </div>

        <div className="hidden sm:block">
          <ul className="list-none flex gap-6 text-xs font-neogroteskessalt-light">
            {[
              { name: "Home", to: "/" },
              { name: "Shop", to: "/shop" },
              { name: "Wishlist", to: "/wishlist" },
              { name: "Philosophy", to: "/philosophy" },
            ].map((item) => (
              <Link key={item.name} to={item.to}>
                <li
                  className={`transition-colors duration-200 ${
                    currentPage === item.name
                      ? "font-bold text-black underline underline-offset-4"
                      : "text-gray-700 hover:text-black"
                  }`}
                >
                  {item.name.toUpperCase()}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {/* Desktop Icons */}
        <div className="bg-[#333333] w-20 h-8 md:w-28 sm:h-10 rounded-[5rem] items-center justify-center px-2 relative hidden sm:flex">
          {username?.trim() ? (
            <>
              <Link to="/cart" className="relative">
                {totalCartQuantity > 0 && (
                  <span className="bg-white h-3 w-3 absolute text-center -top-1 -right-1 rounded-full text-[9px] flex items-center justify-center">
                    {totalCartQuantity}
                  </span>
                )}
                <Bag className="w-5 h-4 sm:w-6 md:h-5 text-white" />
              </Link>
              <Line className="w-3 h-3 mx-2 text-white" />
              <Link to="/account">
                <Person className="w-5 h-4 sm:w-6 md:h-5 text-white" />
              </Link>
            </>
          ) : (
            <Link to="/login">
              <span className="text-white font-neogrotesk-regular text-xs">
                Login
              </span>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="bg-[#333333] w-14 h-8 rounded-[5rem] px-2 relative sm:hidden">
          {/* Hamburger Icon */}
          <div
            className="flex flex-col justify-center items-center w-full h-full cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <span
              className={`block w-6 h-[1px] bg-white mb-[4px] transition-transform duration-300 ${
                open ? "rotate-45 translate-y-[6px]" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-[1px] bg-white mb-[4px] transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-6 h-[1px] bg-white transition-transform duration-300 ${
                open ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            ></span>
          </div>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute w-28 top-10 right-0.5 bg-[#444] rounded-lg shadow-md p-2 z-50 transition-all duration-200">
              <ul className="flex flex-col gap-2 items-center text-white text-sm">
                {[
                  { name: "Home", to: "/" },
                  { name: "Shop", to: "/shop" },
                  { name: "Wishlist", to: "/wishlist" },
                  { name: "Cart", to: "/cart" },
                  { name: "Account", to: "/account" },
                ].map((item) => (
                  <li
                    key={item.name}
                    onClick={() => {
                      navigate(item.to);
                      setOpen(false);
                    }}
                    className={`w-full text-center py-1 rounded-md cursor-pointer transition-colors duration-200 ${
                      currentPage === item.name
                        ? "bg-gray-200 text-black font-semibold"
                        : "hover:bg-gray-600 hover:text-gray-100"
                    }`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
