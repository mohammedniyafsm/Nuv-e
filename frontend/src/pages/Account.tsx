import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Person from "../components/icons/person";
import Bus from "../components/icons/Bus";
import Location from "../components/icons/Location";
import Setting from "../components/icons/Setting";
import UserProfileHeader from "../components/UserProfileHeader";

function Account() {
  const location = useLocation();
  const currentTab = location.pathname.split("/")[2] || "profile";

  const tabs = [
    { id: "profile", label: "Profile", icon: <Person className="h-5 w-4" />, path: "" },
    { id: "orders", label: "Orders", icon: <Bus className="h-5 w-5" />, path: "orders" },
    { id: "address", label: "Address", icon: <Location className="h-5 w-5" />, path: "address" },
    { id: "setting", label: "Setting", icon: <Setting className="h-5 w-5" />, path: "setting" },
  ];

  return (
    <>
      <Navbar />

      

      <div className="bg-[#F2F2F2] px-4 sm:px-8 md:px-16 lg:px-32 xl:px-44 py-16 min-h-screen transition-all duration-500">
        <UserProfileHeader/>
        {/* ---------- Tabs Section ---------- */}
        <div className="w-full bg-[#ececf0] mt-8 rounded-4xl flex flex-wrap justify-center sm:justify-between items-center gap-2 sm:gap-4 px-2 py-2">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              className={`flex-1 sm:flex-none px-4 sm:px-6 lg:px-22 py-2 flex justify-center items-center gap-2 sm:gap-4 rounded-3xl text-sm sm:text-base transition-all duration-300
                ${currentTab === tab.id ? "bg-white text-black shadow-sm" : "bg-[#ececf0] text-[#6b6b6b] hover:bg-[#e0e0e0]"}
              `}
            >
              {tab.icon}
              <span className="truncate">{tab.label}</span>
            </Link>
          ))}
        </div>

        {/* ---------- Nested Route Content ---------- */}
        <div className="mt-10 ">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Account;
