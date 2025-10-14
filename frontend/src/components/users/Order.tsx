
function Order() {
    return (
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
    )
}

export default Order
