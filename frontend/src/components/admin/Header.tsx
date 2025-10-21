import axios from "axios";
import Exit from "../icons/Exit";
import toast from "react-hot-toast";

function Header() {

  const handleLogout =async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/logout`,
      { withCredentials : true }
    )
    toast.success(res.data.message);
  }
  return (
    <header className="w-full h-auto md:h-24 px-4 sm:px-6 md:px-10 py-3 bg-white border-b border-[#dbdada] shadow-sm">
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-3 md:gap-0">
        
        {/* Logo and Title */}
        <div className="flex-col sm:flex-row sm:items-center sm:gap-3">
          <img
            src="./public/images/logo.png"
            alt="Logo"
            className="w-20 sm:w-24 h-10 sm:h-12 object-contain"
          />
          <h1 className="font-neogrotesk-ultralight text-primary text-base sm:text-lg mt-1 sm:mt-0">
            Admin Panel
          </h1>
        </div>

        {/* Logout Button */}
        <div className="w-full sm:w-auto flex justify-start sm:justify-end mt-3 sm:mt-0">
          <button onClick={()=>handleLogout()} className="border border-[#dbdada] hover:bg-[#dbdada] h-10 w-full sm:w-28 flex items-center justify-center sm:justify-between rounded-xl px-4 transition">
            <Exit className="h-4 w-4 mr-2 sm:mr-0" />
            <span className="font-neogrotesk-regular text-sm sm:text-base">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
