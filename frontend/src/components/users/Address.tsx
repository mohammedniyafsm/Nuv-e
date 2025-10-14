import Edit from '../icons/Edit'
import Delete from '../icons/Delete'
import Location from '../icons/Location'

function Address() {
    return (
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

              {/* Example Address Card */}
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
    )
}

export default Address
