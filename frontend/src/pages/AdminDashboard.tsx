import { useState } from "react";
import Box from "../components/icons/Box";
import Cart from "../components/icons/Cart";
import Users from "../components/icons/Users";
import Coupons from "../components/icons/Coupons";
import Header from "../components/admin/Header";
import DashboardAdmin from "../components/admin/Dashboard";
import Dashboard from "../components/icons/Dashboard";
import ProductAdmin from "../components/admin/ProductAdmin";
import OrderAdmin from "../components/admin/OrderAdmin";
import AllUser from "../components/admin/AllUser";
import AdminCoupon from "../components/admin/AdminCoupon";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const tabs = [
    { id: "Dashboard", label: "Dashboard", icon: <Dashboard className="h-5 w-4" /> },
    { id: "Products", label: "Products", icon: <Box className="h-5 w-4" /> },
    { id: "Orders", label: "Orders", icon: <Cart className="h-6 w-6" /> },
    { id: "Users", label: "Users", icon: <Users className="h-5 w-5" /> },
    { id: "Coupons", label: "Coupons", icon: <Coupons className="h-5 w-6" /> },
  ];

  return (
    <div className="bg-[#F2F2F2] min-h-screen w-screen">
      {/* Header */}
      <Header />

      {/* Tabs Navigation */}
      <main className="px-4 sm:px-8 py-1">
        <nav
          className="
            w-full bg-[#ececf0] h-12 sm:h-10 mt-6 sm:mt-8 rounded-2xl
            flex gap-2 sm:gap-1 px-1 py-1
            overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
          "
        >
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.label)}
              className={`flex-shrink-0 sm:flex-1 min-w-[140px] sm:min-w-0 rounded-3xl px-4 py-1 cursor-pointer transition-all duration-200 ${
                activeTab === tab.label
                  ? "bg-white text-black shadow-sm"
                  : "bg-[#ececf0] text-[#6b6b6b] hover:bg-[#e0e0e0]"
              }`}
            >
              <div className="flex gap-3 sm:gap-4 items-center justify-center text-sm sm:text-base">
                {tab.icon}
                <h1>{tab.label}</h1>
              </div>
            </div>
          ))}
        </nav>
      </main>

      {/* Render Active Section */}
      <div className="px-2 sm:px-6 md:px-8 pb-6">
        {activeTab === "Dashboard" && <DashboardAdmin />}
        {activeTab === "Products" && <ProductAdmin />}
        {activeTab === "Orders" && <OrderAdmin />}
        {activeTab === "Users" && <AllUser />}
        {activeTab === "Coupons" && <AdminCoupon />}
      </div>
    </div>
  );
}

export default AdminDashboard;
