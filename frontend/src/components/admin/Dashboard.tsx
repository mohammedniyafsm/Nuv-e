import Box from '../icons/Box'
import Cart from '../icons/Cart'
import Dashboard from '../icons/Dashboard'
import Users from '../icons/Users'

function DashboardAdmin() {
    return (
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
    )
}

export default DashboardAdmin
