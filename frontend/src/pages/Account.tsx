import { useState } from "react";
import Navbar from "../components/Navbar";
import UserProfileHeader from "../components/UserProfileHeader";

import Person from "../components/icons/person";
import Bus from "../components/icons/Bus";
import Location from "../components/icons/Location";
import Setting from "../components/icons/Setting";
import Edit from "../components/icons/Edit";
import Delete from "../components/icons/Delete";

function Account() {
    const [activeTab, setActiveTab] = useState("Profile");

    const tabs = [
        { id: "Profile", label: "Profile", icon: <Person className="h-5 w-4" /> },
        { id: "Orders", label: "Orders", icon: <Bus /> },
        { id: "Address", label: "Address", icon: <Location /> },
        { id: "Setting", label: "Setting", icon: <Setting /> },
    ];

    return (
        <>
            <Navbar />

            <div className="bg-[#F2F2F2] px-42 py-36 min-h-screen">
                <main>
                    {/* ---------- User Header ---------- */}
                    <UserProfileHeader />

                    {/* ---------- Tabs Section ---------- */}
                    <div className="w-full bg-[#ececf0] h-10 mt-8 rounded-xl flex justify-between px-1 py-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-80 flex justify-center items-center gap-4 rounded-3xl transition-all duration-300 ${activeTab === tab.id
                                        ? "bg-white text-black shadow-sm"
                                        : "bg-[#ececf0] text-[#6b6b6b] hover:bg-[#e0e0e0]"
                                    }`}
                            >
                                {tab.icon}
                                <h1>{tab.label}</h1>
                            </button>
                        ))}
                    </div>


                    {/* ---------- Profile Section ---------- */}
                    {activeTab === "Profile" && (
                        <section className="bg-white w-full rounded-xl border border-[#dbdada] px-8 py-8 mt-12 h-96 transition-all duration-500">
                            <h1 className="font-neogroteskessalt-light">Personal Information</h1>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                {["First Name", "Last Name", "Email", "Phone"].map((label, idx) => (
                                    <div key={idx}>
                                        <label className="font-neogrotesk-regular text-sm">{label}</label>
                                        <input
                                            className="w-[530px] mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
                                            type="text"
                                            defaultValue="bancsd"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end pt-20 gap-4">
                                <button className="h-10 w-22 bg-black rounded-xl text-white font-neogrotesk-regular text-sm">
                                    Edit
                                </button>
                                <button className="h-10 w-22 border border-[#ececf0] rounded-xl text-black font-neogrotesk-regular text-sm">
                                    Cancel
                                </button>
                                <button className="h-10 w-36 bg-black rounded-xl text-white font-neogrotesk-regular text-sm">
                                    Save Changes
                                </button>
                            </div>
                        </section>
                    )}

                    {/* ---------- Orders Section ---------- */}
                    {activeTab === "Orders" && (
                        <section className="mt-12 transition-all duration-500">
                            <div className="text-xl font-neogrotesk-regular">
                                <h1>Order History</h1>
                                <h2 className="text-sm text-[#8a7a7aed] font-neogrotesk-regular">
                                    View and track your orders
                                </h2>
                            </div>

                            <div className="bg-white w-full rounded-xl border border-[#dbdada] px-8 py-8 mt-8 h-96">
                                {/* Order Header */}
                                <div className="flex justify-between border-b py-2 border-b-pink-200">
                                    <div className="flex gap-2 items-center">
                                        <img
                                            className="h-16 w-16 rounded-full"
                                            src="./public/images/1k.jpg"
                                            alt="Order Item"
                                        />
                                        <div className="font-neogrotesk-ultralight">
                                            <h1>Order #NUV2024001234</h1>
                                            <p className="text-[#767676]">October 5, 2025</p>
                                        </div>
                                    </div>
                                    <div className="h-6 w-24 rounded-xl text-xs bg-[#dbdada] flex justify-center items-center">
                                        Delivered
                                    </div>
                                </div>

                                {/* Order Items */}
                                {[1, 2].map((item) => (
                                    <div
                                        key={item}
                                        className="flex justify-between py-4 border-b border-[#dbdada]"
                                    >
                                        <div className="font-neogrotesk-ultralight">
                                            <h1>Nuvee Eau de Parfum</h1>
                                            <p>50ml × 1</p>
                                        </div>
                                        <h1>$89.00</h1>
                                    </div>
                                ))}

                                {/* Total */}
                                <div className="flex justify-between py-4">
                                    <div className="font-neogrotesk-ultralight">
                                        <h1>Total</h1>
                                        <p>$120.00</p>
                                    </div>
                                    <h1>$89.00</h1>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ---------- Address Section ---------- */}
                    {activeTab === "Address" && (
                        <section className="mt-10 transition-all duration-500">
                            <div className="flex justify-between">
                                <div>
                                    <h1 className="font-neogrotesk-regular">Saved Address</h1>
                                    <p className="text-[#8a7a7aed]">Manage your delivery addresses</p>
                                </div>
                                <button className="bg-black h-10 w-36 font-neogrotesk-bold text-sm text-white rounded-xl">
                                    Add New Address
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-white mt-6 rounded-2xl h-80 border px-10 py-8 border-[#8a7a7aed]">
                                    <div className="flex justify-between">
                                        <div className="flex gap-2 items-center">
                                            <div className="bg-[#ececf0] w-12 h-12 rounded-full flex justify-center items-center">
                                                <Location />
                                            </div>
                                            <h1 className="font-neogrotesk-regular">Home</h1>
                                        </div>

                                        <div className="flex justify-center items-center gap-10">
                                            <div className="hover:bg-[#ececf0]">
                                                <Edit className="h-8 w-4" />
                                            </div>
                                            <div className="hover:bg-[#ececf0]">
                                                <Delete className="h-8 w-4" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-10 text-[#8a7a7aed]">
                                        <p>123 Lavender Lane</p>
                                        <p>Apt 4B</p>
                                        <p>San Francisco, CA 94102</p>
                                        <p>United States</p>
                                        <p>Phone: +1 (555) 123-4567</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ---------- Settings Section ---------- */}
                    {activeTab === "Setting" && (
                        <section className="bg-white w-full rounded-2xl mt-10 border border-[#dbdada] px-6 py-8 transition-all duration-500">
                            <h1 className="font-neogrotesk-regular">Change Password</h1>

                            {["Current Password", "New Password", "Confirm Password"].map(
                                (label, idx) => (
                                    <div key={idx} className="mt-4">
                                        <label className="font-neogrotesk-regular">{label}</label>
                                        <input
                                            className="w-full mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
                                            type="password"
                                        />
                                    </div>
                                )
                            )}

                            <button className="bg-black h-8 w-full text-white font-neogrotesk-regular rounded-xl mt-4">
                                Update Password
                            </button>
                        </section>
                    )}
                </main>
            </div>
        </>
    );
}

export default Account;
