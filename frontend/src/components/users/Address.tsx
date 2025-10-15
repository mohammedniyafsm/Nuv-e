import Edit from "../icons/Edit";
import Delete from "../icons/Delete";
import Location from "../icons/Location";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddresss, FetchAddress, PostAddress, updatedAddress } from "../../features/Address/Address";
import type { AppDispatch, RootState } from "../../app/store";
import { updateAddress } from "../../features/Address/AddressApi";

function Address() {
  const dispatch = useDispatch<AppDispatch>();
  const { address, loading } = useSelector((state: RootState) => state.address);

  const [addAddress, setAddAddress] = useState(false);
  const [edit ,setEdit] =useState(false);
  const [newAddress, setNewAddress] = useState({
    _id : "",
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
    const { _id,...rest } = newAddress
    dispatch(PostAddress(rest)).then(() => {
      dispatch(FetchAddress()); 
      setAddAddress(false);
      setNewAddress({
        _id : "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        type: "",
      });
    }).catch((error)=>{
      console.log(error)
    })
  };

const handleDelete = (id: string) => {
  dispatch(deleteAddresss(id)).then(() => {
    dispatch(FetchAddress()); // refresh after deletion
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

const handleEdit = (add: any)=>{
  setEdit(true);
  setNewAddress(add)
}


  useEffect(() => {
    dispatch(FetchAddress());
  }, [dispatch]);

  return (
    <section className="mt-10 transition-all duration-500">
      <div className="flex justify-between">
        <div>
          <h1 className="font-neogrotesk-regular">Saved Address</h1>
          <p className="text-[#8a7a7aed]">Manage your delivery addresses</p>
        </div>
         {!addAddress &&
        <button
          onClick={() => setAddAddress((prev) => !prev)}
          className="bg-black h-10 w-36 font-neogrotesk-bold text-sm text-white rounded-xl"
        >
          Add New Address
        </button>}
      </div>

      {/* ---------------- SAVED ADDRESSES ---------------- */}
      {!addAddress && !edit  &&  (
        <div className="grid grid-cols-2 gap-2">
          {loading ? (
            <p className="text-gray-500 mt-6">Loading addresses...</p>
          ) : address.length > 0 ? (
            address.map((add: any) => (
              
              <div
                key={add._id}
                className="bg-white mt-6 rounded-2xl h-80 border px-10 py-8 border-[#8a7a7aed]"
              >
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <div className="bg-[#ececf0] w-12 h-12 rounded-full flex justify-center items-center">
                      <Location />
                    </div>
                    <h1 className="font-neogrotesk-regular">{add.type}</h1>
                  </div>

                  <div className="flex justify-center items-center gap-10">
                    <div onClick={() => handleEdit(add)}  className="hover:bg-[#ececf0] p-2 rounded-lg cursor-pointer">
                      <Edit className="h-8 w-4" />
                    </div>
                    <div onClick={(()=>{handleDelete(add._id)})} className="hover:bg-[#ececf0] p-2 rounded-lg cursor-pointer">
                      <Delete className="h-8 w-4" />
                    </div>
                  </div>
                </div>

                <div className="pt-10 text-[#8a7a7aed] space-y-1">
                  <p>{add.addressLine1}</p>
                  <p>{add.addressLine2}</p>
                  <p>{add.city}</p>
                  <p>{add.state}</p>
                  <p>{add.postalCode}</p>
                  <p>{add.country}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-6">No saved addresses found.</p>
          )}
        </div>
      )}

      {/* ---------------- Update  ADDRESS FORM ---------------- */}
      {edit && (
        <section className="bg-white px-8 py-8 rounded-2xl mt-8">
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: "Address Line 1", key: "addressLine1", placeholder: "Street, House no." },
              { label: "Address Line 2", key: "addressLine2", placeholder: "Area, Landmark" },
              { label: "City", key: "city", placeholder: "City" },
              { label: "State", key: "state", placeholder: "State" },
              { label: "Postal Code", key: "postalCode", placeholder: "Postal Code" },
              { label: "Country", key: "country", placeholder: "Country" },
            ].map((field) => (
              <div key={field.key}>
                <label className="font-neogrotesk-regular text-sm">{field.label}</label> <br />
                <input
                  className="w-80 mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
                  type="text"
                  placeholder={field.placeholder}
                  value={(newAddress as any)[field.key]}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, [field.key]: e.target.value })
                  }
                />
              </div>
            ))}

            {/* Type dropdown */}
            <div>
              <label className="font-neogrotesk-regular text-sm">Type</label> <br />
              <select
                className="w-80 px-4 mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9"
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
            <div className="flex w-full justify-end col-span-3 pt-12 gap-4">
              <button
                onClick={() => setEdit(false)}
                className="h-10 w-22 border border-[#ececf0] rounded-xl text-black font-neogrotesk-regular text-sm"
              >
                Cancel
              </button>
              <button
                onClick={SavedEditAddress}
                className="h-10 w-36 bg-black rounded-xl text-white font-neogrotesk-regular text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- ADD NEW ADDRESS FORM ---------------- */}
      {addAddress && (
        <section className="bg-white px-8 py-8 rounded-2xl mt-8">
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: "Address Line 1", key: "addressLine1", placeholder: "Street, House no." },
              { label: "Address Line 2", key: "addressLine2", placeholder: "Area, Landmark" },
              { label: "City", key: "city", placeholder: "City" },
              { label: "State", key: "state", placeholder: "State" },
              { label: "Postal Code", key: "postalCode", placeholder: "Postal Code" },
              { label: "Country", key: "country", placeholder: "Country" },
            ].map((field) => (
              <div key={field.key}>
                <label className="font-neogrotesk-regular text-sm">{field.label}</label> <br />
                <input
                  className="w-80 mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
                  type="text"
                  placeholder={field.placeholder}
                  value={(newAddress as any)[field.key]}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, [field.key]: e.target.value })
                  }
                />
              </div>
            ))}

            {/* Type dropdown */}
            <div>
              <label className="font-neogrotesk-regular text-sm">Type</label> <br />
              <select
                className="w-80 px-4 mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9"
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
            <div className="flex w-full justify-end col-span-3 pt-12 gap-4">
              <button
                onClick={() => setAddAddress(false)}
                className="h-10 w-22 border border-[#ececf0] rounded-xl text-black font-neogrotesk-regular text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="h-10 w-36 bg-black rounded-xl text-white font-neogrotesk-regular text-sm"
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
