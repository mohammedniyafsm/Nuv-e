import Exit from "../icons/Exit"

function Header() {
    return (
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
    )
}

export default Header
