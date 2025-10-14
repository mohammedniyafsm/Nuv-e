import Navbar from "../components/Navbar";
import UserProfileHeader from "../components/UserProfileHeader";

// Icons
import Person from "../components/icons/person";
import Bus from "../components/icons/Bus";
import Location from "../components/icons/Location";
import Setting from "../components/icons/Setting";
import UserProfile from "../components/users/UserProfile";
import Order from "../components/users/Order";
import Address from "../components/users/Address";
import UserSetting from "../components/users/UserSetting";
import { useState } from "react";

function Account() {

    const [activeTab, setActiveTab] = useState("Profile");

    // Tabs configuration
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
                                className={`w-80 flex justify-center items-center gap-4 rounded-3xl transition-all duration-300 
                                ${activeTab === tab.id
                                        ? "bg-white text-black shadow-sm"
                                        : "bg-[#ececf0] text-[#6b6b6b] hover:bg-[#e0e0e0]"
                                    }`}
                            >
                                {tab.icon}
                                <h1>{tab.label}</h1>
                            </button>
                        ))}
                    </div>

                    {/* ---------- PROFILE TAB ---------- */}
                    {activeTab === "Profile" && (
                        <UserProfile />
                    )}

                    {/* ---------- ORDERS TAB ---------- */}
                    {activeTab === "Orders" && (
                        <Order />
                    )}

                    {/* ---------- ADDRESS TAB ---------- */}
                    {activeTab === "Address" && (
                        <Address />
                    )}

                    {/* ---------- SETTINGS TAB ---------- */}
                    {activeTab === "Setting" && (
                        <UserSetting />
                    )}
                </main>
            </div>
        </>
    );
}

export default Account;
