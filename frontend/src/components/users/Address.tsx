import Edit from "../icons/Edit";
import Delete from "../icons/Delete";
import Location from "../icons/Location";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddresss, FetchAddress, PostAddress, updatedAddress } from "../../features/Address/Address";
import type { AppDispatch, RootState } from "../../app/store";

function Address() {
  const dispatch = useDispatch<AppDispatch>();
  const { address, loading } = useSelector((state: RootState) => state.address);

  const [addAddress, setAddAddress] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newAddress, setNewAddress] = useState({
    _id: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    type: "",
  });

  // Handle form submission
  const handleSubmit = () => {
    if (
      !newAddress.addressLine1 ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.postalCode ||
      !newAddress.country ||
      !newAddress.type
    ) {
      alert("Please fill all required fields");
      return;
    }
    const { _id, ...rest } = newAddress;
    dispatch(PostAddress(rest)).then(() => {
      dispatch(FetchAddress());
      setAddAddress(false);
      setNewAddress({
        _id: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        type: "",
      });
    });
  };

  const handleDelete = (id: string) => {
    dispatch(deleteAddresss(id)).then(() => {
      dispatch(FetchAddress());
    });
  };

  const SavedEditAddress = () => {
    dispatch(updatedAddress({ id: newAddress._id, update: newAddress })).then(() => {
      dispatch(FetchAddress());
      setNewAddress({
        _id: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        type: "",
      });
      setAddAddress(false);
      setEdit(false);
    });
  };

  const handleEdit = (add: any) => {
    setEdit(true);
    setNewAddress(add);
  };

  useEffect(() => {
    dispatch(FetchAddress());
  }, [dispatch]);

  return (
    <section className="mt-6 md:mt-10 transition-all duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-neogrotesk-regular text-lg sm:text-xl">Saved Address</h1>
          <p className="text-[#8a7a7aed] text-sm sm:text-base">Manage your delivery addresses</p>
        </div>
        {!addAddress && !edit && (
          <button
            onClick={() => setAddAddress(true)}
            className="bg-black h-10 w-full sm:w-36 font-neogrotesk-bold text-sm text-white rounded-xl"
          >
            Add New Address
          </button>
        )}
      </div>

      {/* Saved Addresses */}
      {!addAddress && !edit && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {loading ? (
            <p className="text-gray-500 mt-6">Loading addresses...</p>
          ) : address.length > 0 ? (
            address.map((add: any) => (
              <div
                key={add._id}
                className="bg-white rounded-2xl border px-6 py-6 border-[#8a7a7aed] flex flex-col justify-between"
              >
                <div className="flex justify-between items-start sm:items-center gap-4">
                  <div className="flex gap-2 items-center">
                    <div className="bg-[#ececf0] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex justify-center items-center">
                      <Location />
                    </div>
                    <h1 className="font-neogrotesk-regular text-sm sm:text-base">{add.type}</h1>
                  </div>

                  <div className="flex gap-4">
                    <div
                      onClick={() => handleEdit(add)}
                      className="hover:bg-[#ececf0] p-2 rounded-lg cursor-pointer"
                    >
                      <Edit className="h-6 w-6 sm:h-8 sm:w-8 lg:h-5 lg:w-6" />
                    </div>
                    <div
                      onClick={() => handleDelete(add._id)}
                      className="hover:bg-[#ececf0] p-2 rounded-lg cursor-pointer"
                    >
                      <Delete className="h-6 w-6 sm:h-8 sm:w-8  lg:h-5 lg:w-6"  />
                    </div>
                  </div>
                </div>

                <div className="pt-4 sm:pt-6 text-[#8a7a7aed] space-y-1 text-sm sm:text-base">
                  {add.addressLine1 && <p>{add.addressLine1}</p>}
                  {add.addressLine2 && <p>{add.addressLine2}</p>}
                  {add.city && <p>{add.city}</p>}
                  {add.state && <p>{add.state}</p>}
                  {add.postalCode && <p>{add.postalCode}</p>}
                  {add.country && <p>{add.country}</p>}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-6 col-span-full">No saved addresses found.</p>
          )}
        </div>
      )}

      {/* Address Form (Add/Edit) */}
      {(addAddress || edit) && (
        <section className="bg-white px-4 sm:px-6 md:px-8 py-6 rounded-2xl mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {[
              { label: "Address Line 1", key: "addressLine1", placeholder: "Street, House no." },
              { label: "Address Line 2", key: "addressLine2", placeholder: "Area, Landmark" },
              { label: "City", key: "city", placeholder: "City" },
              { label: "State", key: "state", placeholder: "State" },
              { label: "Postal Code", key: "postalCode", placeholder: "Postal Code" },
              { label: "Country", key: "country", placeholder: "Country" },
            ].map((field) => (
              <div key={field.key} className="w-full">
                <label className="font-neogrotesk-regular text-sm">{field.label}</label>
                <input
                  className="w-full mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
                  type="text"
                  placeholder={field.placeholder}
                  value={(newAddress as any)[field.key]}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, [field.key]: e.target.value })
                  }
                />
              </div>
            ))}

            {/* Type Dropdown */}
            <div className="w-full">
              <label className="font-neogrotesk-regular text-sm">Type</label>
              <select
                className="w-full px-4 mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9"
                value={newAddress.type}
                onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
              >
                <option value="">Select Type</option>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex w-full justify-end col-span-full pt-4 sm:pt-6 gap-4 flex-wrap">
              <button
                onClick={() => {
                  setAddAddress(false);
                  setEdit(false);
                }}
                className="h-10 w-full sm:w-28 border border-[#ececf0] rounded-xl text-black font-neogrotesk-regular text-sm"
              >
                Cancel
              </button>
              <button
                onClick={edit ? SavedEditAddress : handleSubmit}
                className="h-10 w-full sm:w-36 bg-black rounded-xl text-white font-neogrotesk-regular text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </section>
      )}
    </section>
  );
}

export default Address;

