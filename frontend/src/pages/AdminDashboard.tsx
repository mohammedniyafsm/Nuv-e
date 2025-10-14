import { useState } from "react";
import Exit from "../components/icons/Exit";
import Dashboard from "../components/icons/Dashboard";
import Box from "../components/icons/Box";
import Cart from "../components/icons/Cart";
import Users from "../components/icons/Users";
import Coupons from "../components/icons/Coupons";
import Edit from "../components/icons/Edit";
import Delete from "../components/icons/Delete";

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
            <header className="w-full h-24 px-10 py-2 bg-white border-b border-[#dbdada] shadow-sm">
                <div className="flex justify-between items-center">
                    {/* Logo and Title */}
                    <div>
                        <img src="./public/images/logo.png" alt="Logo" className="w-24 h-12" />
                        <h1 className="font-neogrotesk-ultralight text-primary">Admin Panel</h1>
                    </div>

                    {/* Logout Button */}
                    <div>
                        <button className="border border-[#dbdada] hover:bg-[#dbdada] h-10 w-28 flex items-center justify-between rounded-xl px-4">
                            <Exit className="h-4 w-4" />
                            <span className="font-neogrotesk-regular">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Tabs Navigation */}
            <main className="px-8 py-1">
                <nav className="w-full bg-[#ececf0] h-10 mt-8 rounded-2xl flex justify-between px-1 py-1">
                    {tabs.map((tab) => (
                        <div
                            key={tab.id}
                            onClick={() => setActiveTab(tab.label)}
                            className={`w-80 rounded-3xl px-4 py-1 cursor-pointer transition-all duration-200 ${activeTab === tab.label
                                ? "bg-white text-black shadow-sm"
                                : "bg-[#ececf0] text-[#6b6b6b] hover:bg-[#e0e0e0]"
                                }`}
                        >
                            <div className="flex gap-4 items-center justify-center">
                                {tab.icon}
                                <h1>{tab.label}</h1>
                            </div>
                        </div>
                    ))}
                </nav>
            </main>

            {activeTab == "Dashboard" && (
                <>
                    <section className="px-8 py-1">
                        <div className="mt-10">
                            <h1 className="text-xl font-neogrotesk-bold">Overview</h1>
                            <h1 className="text-[#6b6b6b] font-neogrotesk-ultralight pt-2">Welcome back to your admin dashboard</h1>
                        </div>
                        <div className=" pt-8 flex justify-start gap-6">
                            <div className="h-42 w-60 bg-white rounded-2xl border border-[#dbdada]">
                                <div className="px-6 pt-8 flex justify-between items-center">
                                    <h1 className="text-[#887e7e] font-neogrotesk-regular text-sm">Total Products</h1>
                                    <div className="bg-[#dbdada] flex items-center justify-center rounded-full h-12 w-12">
                                        <Box className="text-white" />
                                    </div>
                                </div>
                                <div className="px-6  ">
                                    <h1>24</h1>
                                    <div className="flex gap-1 pt-2">
                                        <p className="text-sm  text-green-600">
                                            ↑
                                        </p>
                                        <p className="text-sm text-muted-foreground">+3 this month</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-42 w-60 bg-white rounded-2xl border border-[#dbdada]">
                                <div className="px-6 pt-8 flex justify-between items-center">
                                    <h1 className="text-[#887e7e] font-neogrotesk-regular text-sm">Total Orders</h1>
                                    <div className="bg-[#dbdada] flex items-center justify-center rounded-full h-12 w-12">
                                        <Cart className="text-white h-6 w-6" />
                                    </div>
                                </div>
                                <div className="px-6  ">
                                    <h1>156</h1>
                                    <div className="flex gap-1 pt-2">
                                        <p className="text-sm  text-green-600">
                                            ↑
                                        </p>
                                        <p className="text-sm text-muted-foreground">+12 this week</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-42 w-60 bg-white rounded-2xl border border-[#dbdada]">
                                <div className="px-6 pt-8 flex justify-between items-center">
                                    <h1 className="text-[#887e7e] font-neogrotesk-regular text-sm">Total Users</h1>
                                    <div className="bg-[#dbdada] flex items-center justify-center rounded-full h-12 w-12">
                                        <Users className="text-white h-6 w-6" />
                                    </div>
                                </div>
                                <div className="px-6  ">
                                    <h1>89</h1>
                                    <div className="flex gap-1 pt-2">
                                        <p className="text-sm  text-green-600">
                                            ↑
                                        </p>
                                        <p className="text-sm text-muted-foreground">+8 new users</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-42 w-60 bg-white rounded-2xl border border-[#dbdada]">
                                <div className="px-6 pt-8 flex justify-between items-center">
                                    <h1 className="text-[#887e7e] font-neogrotesk-regular text-sm">Total Revenue</h1>
                                    <div className="bg-[#dbdada] flex items-center justify-center rounded-full h-12 w-12">
                                        <Dashboard className="text-white" />
                                    </div>
                                </div>
                                <div className="px-6  ">
                                    <h1>$18,345</h1>
                                    <div className="flex gap-1 pt-2">
                                        <p className="text-sm  text-green-600">
                                            ↑
                                        </p>
                                        <p className="text-sm text-muted-foreground">+15% from last month</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="px-8 mt-6 pb-10">
                        <div className="bg-white rounded-2xl border border-[#dbdada] h-96 w-[1040px] px-10">
                            <div className="py-6">
                                <h1 className="font-neogrotesk-regular text-[#6d6363]">Recent Orders</h1>
                            </div>
                            <div className="flex gap-30 font-neogrotesk-regular border-b pb-3   border-[#dbdada] ">
                                <h1>Order ID</h1>
                                <h1>Customer</h1>
                                <h1>Date</h1>
                                <h1>Total</h1>
                                <h1>Status</h1>
                            </div>
                            <div className="flex items-center  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                <h1 className="">NUV20200123</h1>
                                <h1 className="ml-20">Sophie Anderson</h1>
                                <h1 className="ml-22">Oct 5, 2025</h1>
                                <h1 className="ml-22">$124.00</h1>
                                <button className="h-6 w-20 rounded-md bg-green-200 ml-26 text-green-800 text-xs">Delivered</button>
                            </div>
                            <div className="flex items-center  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                <h1 className="">NUV20200123</h1>
                                <h1 className="ml-20">Sophie Anderson</h1>
                                <h1 className="ml-22">Oct 5, 2025</h1>
                                <h1 className="ml-22">$124.00</h1>
                                <button className="h-6 w-20 rounded-md bg-green-200 ml-26 text-green-800 text-xs">Delivered</button>
                            </div>
                            <div className="flex items-center  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                <h1 className="">NUV20200123</h1>
                                <h1 className="ml-20">Sophie Anderson</h1>
                                <h1 className="ml-22">Oct 5, 2025</h1>
                                <h1 className="ml-22">$124.00</h1>
                                <button className="h-6 w-20 rounded-md bg-green-200 ml-26 text-green-800 text-xs">Delivered</button>
                            </div>
                            <div className="flex items-center  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                <h1 className="">NUV20200123</h1>
                                <h1 className="ml-20">Sophie Anderson</h1>
                                <h1 className="ml-22">Oct 5, 2025</h1>
                                <h1 className="ml-22">$124.00</h1>
                                <button className="h-6 w-20 rounded-md bg-green-200 ml-26 text-green-800 text-xs">Delivered</button>
                            </div>
                            <div className="flex items-center  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                <h1 className="">NUV20200123</h1>
                                <h1 className="ml-20">Sophie Anderson</h1>
                                <h1 className="ml-22">Oct 5, 2025</h1>
                                <h1 className="ml-22">$124.00</h1>
                                <button className="h-6 w-20 rounded-md bg-green-200 ml-26 text-green-800 text-xs">Delivered</button>
                            </div>

                        </div>
                    </section>
                </>
            )}

            {activeTab == "Products" && (
                <section className="px-12 py-4">
                    <div className="flex justify-between items-center  py-4">
                        <div className="pt-8">
                            <h1 className="text-lg font-neogrotesk-regular">Products</h1>
                            <h1 className="text-[#6b6b6b]">Manage your product inventory</h1>
                        </div>
                        <div className="bg-black w-36 h-10 flex justify-center items-center rounded-xl text-white">
                            <h1 className="text-md font-neogrotesk-regular">Add Product</h1>
                        </div>
                    </div>
                    <div className="w-full">
                        <input className="bg-white px-6 h-10 w-full rounded-xl" type="text" placeholder="Search Products...." />
                    </div>

                    <div className="flex flex-wrap gap-8  py-10 ">
                        <div className="w-96 py-4 px-4 rounded-xl bg-white">
                            <div className="">
                                <img className="h-80 w-[400px] rounded-xl" src="./public/images/product1.png" alt="" />
                            </div>
                            <div className="flex justify-between py-4">
                                <h1>Nuvee Eau de Parfum</h1>
                                <button className="h-6 w-20 rounded-md bg-green-200 ml-26 text-green-800 text-xs">Active</button>
                            </div>
                            <h1 className="text-[#6b6b6b]">Eau de Parfum</h1>
                            <div className="flex justify-between items-center">
                                <div className="my-4">
                                    <h1>$89.00</h1>
                                    <h1>Stock: 45</h1>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-8 w-8 rounded-md border border-[#b7b5b5] flex justify-center items-center"><Edit /></div>
                                    <div className="h-8 w-8 rounded-md border border-[#b7b5b5] flex justify-center items-center"><Delete className="h-4 w-4" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {activeTab == "Orders" && (
                <section className="px-8 py-1">
                    <div className="mt-10">
                        <h1 className="text-xl font-neogrotesk-bold">Orders</h1>
                        <h1 className="text-[#6b6b6b] font-neogrotesk-ultralight pt-2">View and manage all customer orders</h1>
                        <div className="w-full">
                            <input className="mt-6 bg-white px-6 h-10 w-full rounded-xl" type="text" placeholder="Search Products...." />
                        </div>
                    </div>
                    <section className="px- mt-6 pb-10">
                        <div className="bg-white rounded-2xl border border-[#dbdada]   px-10">
                            <div className="py-6">
                                <h1 className="font-neogrotesk-regular text-[#6d6363]">Recent Orders</h1>
                            </div>
                            <div className="flex gap-[100px] font-neogrotesk-regular border-b pb-3   border-[#dbdada] ">
                                <h1>Order ID</h1>
                                <h1>Customer</h1>
                                <h1>Payment</h1>
                                <h1>Date</h1>
                                <h1>Total</h1>
                                <h1>Order Status</h1>
                                <h1>Payment Status</h1>
                                <h1>Actions</h1>
                            </div>
                            <>
                                <div className="flex items-center  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="">NUV20200123</h1>
                                    <h1 className="ml-16">Sophie Anderson</h1>
                                    <h1 className="ml-22">CARD</h1>
                                    <h1 className="ml-24">Oct 5, 2025</h1>
                                    <h1 className="ml-22">$124.00</h1>
                                    <button className="h-6 w-20 rounded-md bg-green-200 ml-26 text-green-800 text-xs">Delivered</button>
                                    <button className="h-6 w-20 rounded-md bg-green-200 ml-32 text-green-800 text-xs">Paid</button>
                                    <button className="h-6 w-20  rounded-md bg-green-200 ml-26 text-green-800 text-xs">	Update Status</button>
                                </div>
                                <div className="flex items-center  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="">NUV20200123</h1>
                                    <h1 className="ml-16">Sophie Anderson</h1>
                                    <h1 className="ml-22">CARD</h1>
                                    <h1 className="ml-24">Oct 5, 2025</h1>
                                    <h1 className="ml-22">$124.00</h1>
                                    <button className="h-6 w-20 rounded-md bg-green-200 ml-26 text-green-800 text-xs">Delivered</button>
                                    <button className="h-6 w-20 rounded-md bg-green-200 ml-32 text-green-800 text-xs">Paid</button>
                                    <button className="h-6 w-20  rounded-md bg-green-200 ml-26 text-green-800 text-xs">	Update Status</button>
                                </div>
                                <div className="flex items-center  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="">NUV20200123</h1>
                                    <h1 className="ml-16">Sophie Anderson</h1>
                                    <h1 className="ml-22">CARD</h1>
                                    <h1 className="ml-24">Oct 5, 2025</h1>
                                    <h1 className="ml-22">$124.00</h1>
                                    <button className="h-6 w-20 rounded-md bg-green-200 ml-26 text-green-800 text-xs">Delivered</button>
                                    <button className="h-6 w-20 rounded-md bg-green-200 ml-32 text-green-800 text-xs">Paid</button>
                                    <button className="h-6 w-20  rounded-md bg-green-200 ml-26 text-green-800 text-xs">	Update Status</button>
                                </div>
                                <div className="flex items-center  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="">NUV20200123</h1>
                                    <h1 className="ml-16">Sophie Anderson</h1>
                                    <h1 className="ml-22">CARD</h1>
                                    <h1 className="ml-24">Oct 5, 2025</h1>
                                    <h1 className="ml-22">$124.00</h1>
                                    <button className="h-6 w-20 rounded-md bg-green-200 ml-26 text-green-800 text-xs">Delivered</button>
                                    <button className="h-6 w-20 rounded-md bg-green-200 ml-32 text-green-800 text-xs">Paid</button>
                                    <button className="h-6 w-20  rounded-md bg-green-200 ml-26 text-green-800 text-xs">	Update Status</button>
                                </div>
                                <div className="flex items-center  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="">NUV20200123</h1>
                                    <h1 className="ml-16">Sophie Anderson</h1>
                                    <h1 className="ml-22">CARD</h1>
                                    <h1 className="ml-24">Oct 5, 2025</h1>
                                    <h1 className="ml-22">$124.00</h1>
                                    <button className="h-6 w-20 rounded-md bg-green-200 ml-26 text-green-800 text-xs">Delivered</button>
                                    <button className="h-6 w-20 rounded-md bg-green-200 ml-32 text-green-800 text-xs">Paid</button>
                                    <button className="h-6 w-20  rounded-md bg-green-200 ml-26 text-green-800 text-xs">	Update Status</button>
                                </div>
                            </>


                        </div>
                    </section>
                </section>
            )}

            {activeTab == "Users" && (
                <section className="px-8 py-1">
                    <div className="mt-10">
                        <h1 className="text-xl font-neogrotesk-bold">Users</h1>
                        <h1 className="text-[#6b6b6b] font-neogrotesk-ultralight pt-2">Manage your customer base</h1>
                        <div className="w-full">
                            <input className="mt-6 bg-white px-6 h-10 w-full rounded-xl" type="text" placeholder="Search Products...." />
                        </div>
                    </div>
                    <section className=" mt-6 pb-10">
                        <div className="bg-white rounded-2xl border border-[#dbdada]   px-10">
                            <div className="py-6">
                            </div>
                            <div className="flex  font-neogrotesk-regular border-b pb-3   border-[#dbdada] ">
                                <div className="flex gap-56">
                                    <h1>User</h1>
                                    <h1>Email</h1>
                                    <h1>Joined</h1>
                                </div>
                                <div className="flex gap-14 pl-24">
                                    <h1>Orders</h1>
                                    <h1>Total Spent</h1>
                                    <h1>Status</h1>
                                    <h1 className="pl-4">Actions</h1>
                                </div>
                            </div>
                            <>
                                <div className="flex  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="">Sophie Anderson</h1>
                                    <h1 className="pl-28">sophie.anderson@email.com</h1>
                                    <h1 className="pl-28">Mar 15, 2024</h1>
                                    <h1 className="pl-22">Orders</h1>
                                    <h1 className="pl-16">Total Spent</h1>
                                    <button className="ml-14 h-6 w-20 rounded-md bg-green-200  text-green-800 text-xs">Active</button>
                                    <button className="ml-12 h-6 w-20 rounded-md bg-red-300  text-red-50 text-xs">Block</button>
                                </div>
                                <div className="flex  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="">Sophie Anderson</h1>
                                    <h1 className="pl-28">sophie.anderson@email.com</h1>
                                    <h1 className="pl-28">Mar 15, 2024</h1>
                                    <h1 className="pl-22">Orders</h1>
                                    <h1 className="pl-16">Total Spent</h1>
                                    <button className="ml-14 h-6 w-20 rounded-md bg-green-200  text-green-800 text-xs">Active</button>
                                    <button className="ml-12 h-6 w-20 rounded-md bg-red-300  text-red-50 text-xs">Block</button>
                                </div>
                                <div className="flex  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="">Sophie Anderson</h1>
                                    <h1 className="pl-28">sophie.anderson@email.com</h1>
                                    <h1 className="pl-28">Mar 15, 2024</h1>
                                    <h1 className="pl-22">Orders</h1>
                                    <h1 className="pl-16">Total Spent</h1>
                                    <button className="ml-14 h-6 w-20 rounded-md bg-green-200  text-green-800 text-xs">Active</button>
                                    <button className="ml-12 h-6 w-20 rounded-md bg-red-300  text-red-50 text-xs">Block</button>
                                </div>
                                <div className="flex  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="">Sophie Anderson</h1>
                                    <h1 className="pl-28">sophie.anderson@email.com</h1>
                                    <h1 className="pl-28">Mar 15, 2024</h1>
                                    <h1 className="pl-22">Orders</h1>
                                    <h1 className="pl-16">Total Spent</h1>
                                    <button className="ml-14 h-6 w-20 rounded-md bg-green-200  text-green-800 text-xs">Active</button>
                                    <button className="ml-12 h-6 w-20 rounded-md bg-red-300  text-red-50 text-xs">Block</button>
                                </div>
                                <div className="flex  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="">Sophie Anderson</h1>
                                    <h1 className="pl-28">sophie.anderson@email.com</h1>
                                    <h1 className="pl-28">Mar 15, 2024</h1>
                                    <h1 className="pl-22">Orders</h1>
                                    <h1 className="pl-16">Total Spent</h1>
                                    <button className="ml-14 h-6 w-20 rounded-md bg-green-200  text-green-800 text-xs">Active</button>
                                    <button className="ml-12 h-6 w-20 rounded-md bg-red-300  text-red-50 text-xs">Block</button>
                                </div>
                                <div className="flex  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="">Sophie Anderson</h1>
                                    <h1 className="pl-28">sophie.anderson@email.com</h1>
                                    <h1 className="pl-28">Mar 15, 2024</h1>
                                    <h1 className="pl-22">Orders</h1>
                                    <h1 className="pl-16">Total Spent</h1>
                                    <button className="ml-14 h-6 w-20 rounded-md bg-green-200  text-green-800 text-xs">Active</button>
                                    <button className="ml-12 h-6 w-20 rounded-md bg-red-300  text-red-50 text-xs">Block</button>
                                </div>
                                <div className="flex  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="">Sophie Anderson</h1>
                                    <h1 className="pl-28">sophie.anderson@email.com</h1>
                                    <h1 className="pl-28">Mar 15, 2024</h1>
                                    <h1 className="pl-22">Orders</h1>
                                    <h1 className="pl-16">Total Spent</h1>
                                    <button className="ml-14 h-6 w-20 rounded-md bg-green-200  text-green-800 text-xs">Active</button>
                                    <button className="ml-12 h-6 w-20 rounded-md bg-red-300  text-red-50 text-xs">Block</button>
                                </div>
                                <div className="flex  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="">Sophie Anderson</h1>
                                    <h1 className="pl-28">sophie.anderson@email.com</h1>
                                    <h1 className="pl-28">Mar 15, 2024</h1>
                                    <h1 className="pl-22">Orders</h1>
                                    <h1 className="pl-16">Total Spent</h1>
                                    <button className="ml-14 h-6 w-20 rounded-md bg-green-200  text-green-800 text-xs">Active</button>
                                    <button className="ml-12 h-6 w-20 rounded-md bg-red-300  text-red-50 text-xs">Block</button>
                                </div>
                            </>


                        </div>
                    </section>
                </section>
            )}


            {activeTab == "Coupons" && (
                <section className="px-8 py-1">
                    <div className="mt-10 flex justify-between">
                        <div className="">
                            <h1 className="text-xl font-neogrotesk-bold">Coupons</h1>
                            <h1 className="text-[#6b6b6b] font-neogrotesk-ultralight pt-2">Manage discount codes and promotions</h1>
                        </div>
                        <div className="bg-black w-36 h-10 flex justify-center items-center rounded-xl text-white">
                            <h1 className="text-md font-neogrotesk-regular">Add Coupon</h1>
                        </div>

                    </div>
                    <section className=" mt-6 pb-10">
                        <div className="bg-white rounded-2xl border border-[#dbdada]   px-10">
                            <div className="py-6">
                            </div>
                            <div className="flex  font-neogrotesk-regular border-b pb-3   border-[#dbdada] ">
                                <div className="flex gap-20">
                                    <h1>Code</h1>
                                    <h1 className="pl-10">Discount</h1>
                                    <h1>Min. Cart Amount</h1>
                                </div>
                                <div className="flex gap-14 pl-10">
                                    <h1>Max Usage/User</h1>
                                    <h1>Total Used</h1>
                                    <h1>Expires</h1>
                                    <h1 className="pl-4">Status</h1>
                                    <h1 className="pl-8">Actions</h1>
                                </div>
                            </div>
                            <>
                                <div className="flex  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="bg-[#ede8e8] h-8 flex px-2 rounded-lg items-center">WELCOME20</h1>
                                    <h1 className="pl-20">	20%</h1>
                                    <h1 className="pl-34">50.00</h1>
                                    <h1 className="pl-34">1</h1>
                                    <h1 className="pl-44">45</h1>
                                    <h1 className="pl-20">Dec 31, 2025</h1>
                                    <button className="ml-12 h-6 w-20 rounded-md bg-green-200  text-green-800 text-xs">Active</button>
                                    <div className="flex gap-4 ml-12">
                                        <button className=" h-6 w-14 rounded-md border hover:bg-gray-100 border-[#b8a9a9] text-xs">Edit</button>
                                        <button className="h-6 w-14 rounded-md border hover:bg-red-300 border-[#b8a9a9] text-xs">Delete</button>
                                    </div>
                                </div>
                                <div className="flex  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="bg-[#ede8e8] h-8 flex px-2 rounded-lg items-center">WELCOME20</h1>
                                    <h1 className="pl-20">	20%</h1>
                                    <h1 className="pl-34">50.00</h1>
                                    <h1 className="pl-34">1</h1>
                                    <h1 className="pl-44">45</h1>
                                    <h1 className="pl-20">Dec 31, 2025</h1>
                                    <button className="ml-12 h-6 w-20 rounded-md bg-green-200  text-green-800 text-xs">Active</button>
                                    <div className="flex gap-4 ml-12">
                                        <button className=" h-6 w-14 rounded-md border hover:bg-gray-100 border-[#b8a9a9] text-xs">Edit</button>
                                        <button className="h-6 w-14 rounded-md border hover:bg-red-300 border-[#b8a9a9] text-xs">Delete</button>
                                    </div>
                                </div>
                                <div className="flex  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="bg-[#ede8e8] h-8 flex px-2 rounded-lg items-center">WELCOME20</h1>
                                    <h1 className="pl-20">	20%</h1>
                                    <h1 className="pl-34">50.00</h1>
                                    <h1 className="pl-34">1</h1>
                                    <h1 className="pl-44">45</h1>
                                    <h1 className="pl-20">Dec 31, 2025</h1>
                                    <button className="ml-12 h-6 w-20 rounded-md bg-green-200  text-green-800 text-xs">Active</button>
                                    <div className="flex gap-4 ml-12">
                                        <button className=" h-6 w-14 rounded-md border hover:bg-gray-100 border-[#b8a9a9] text-xs">Edit</button>
                                        <button className="h-6 w-14 rounded-md border hover:bg-red-300 border-[#b8a9a9] text-xs">Delete</button>
                                    </div>
                                </div>
                                <div className="flex  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="bg-[#ede8e8] h-8 flex px-2 rounded-lg items-center">WELCOME20</h1>
                                    <h1 className="pl-20">	20%</h1>
                                    <h1 className="pl-34">50.00</h1>
                                    <h1 className="pl-34">1</h1>
                                    <h1 className="pl-44">45</h1>
                                    <h1 className="pl-20">Dec 31, 2025</h1>
                                    <button className="ml-12 h-6 w-20 rounded-md bg-green-200  text-green-800 text-xs">Active</button>
                                    <div className="flex gap-4 ml-12">
                                        <button className=" h-6 w-14 rounded-md border hover:bg-gray-100 border-[#b8a9a9] text-xs">Edit</button>
                                        <button className="h-6 w-14 rounded-md border hover:bg-red-300 border-[#b8a9a9] text-xs">Delete</button>
                                    </div>
                                </div>
                                <div className="flex  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="bg-[#ede8e8] h-8 flex px-2 rounded-lg items-center">WELCOME20</h1>
                                    <h1 className="pl-20">	20%</h1>
                                    <h1 className="pl-34">50.00</h1>
                                    <h1 className="pl-34">1</h1>
                                    <h1 className="pl-44">45</h1>
                                    <h1 className="pl-20">Dec 31, 2025</h1>
                                    <button className="ml-12 h-6 w-20 rounded-md bg-green-200  text-green-800 text-xs">Active</button>
                                    <div className="flex gap-4 ml-12">
                                        <button className=" h-6 w-14 rounded-md border hover:bg-gray-100 border-[#b8a9a9] text-xs">Edit</button>
                                        <button className="h-6 w-14 rounded-md border hover:bg-red-300 border-[#b8a9a9] text-xs">Delete</button>
                                    </div>
                                </div>
                                <div className="flex  border-b pb-3 text-sm  border-[#dbdada] pt-2 ">
                                    <h1 className="bg-[#ede8e8] h-8 flex px-2 rounded-lg items-center">WELCOME20</h1>
                                    <h1 className="pl-20">	20%</h1>
                                    <h1 className="pl-34">50.00</h1>
                                    <h1 className="pl-34">1</h1>
                                    <h1 className="pl-44">45</h1>
                                    <h1 className="pl-20">Dec 31, 2025</h1>
                                    <button className="ml-12 h-6 w-20 rounded-md bg-green-200  text-green-800 text-xs">Active</button>
                                    <div className="flex gap-4 ml-12">
                                        <button className=" h-6 w-14 rounded-md border hover:bg-gray-100 border-[#b8a9a9] text-xs">Edit</button>
                                        <button className="h-6 w-14 rounded-md border hover:bg-red-300 border-[#b8a9a9] text-xs">Delete</button>
                                    </div>
                                </div>

                            </>


                        </div>
                    </section>
                </section>
            )}

        </div>
    );
}

export default AdminDashboard;