
function UserSetting() {
  return (
            <section className="bg-white w-full rounded-2xl mt-10 border border-[#dbdada] px-6 py-8 transition-all duration-500">
              <h1 className="font-neogrotesk-regular">Change Password</h1>

              {["Current Password", "New Password", "Confirm Password"].map((label, idx) => (
                <div key={idx} className="mt-4">
                  <label className="font-neogrotesk-regular">{label}</label>
                  <input
                    className="w-full mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
                    type="password"
                  />
                </div>
              ))}

              <button className="bg-black h-8 w-full text-white font-neogrotesk-regular rounded-xl mt-4">
                Update Password
              </button>
            </section>
  )
}

export default UserSetting
