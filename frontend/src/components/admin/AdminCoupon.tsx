import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Coupon {
  _id: string;
  code: string;
  discountAmount: number;
  discountPercentage?: number;
  minCartAmount?: number;
  maxUsagePerUser: number;
  expiryDate: string;
}

function AdminCoupon() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [search, setSearch] = useState("");
  const [addEdit, setAddEdit] = useState(false); // show add/edit section
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    discountAmount: "",
    discountPercentage: "",
    minCartAmount: "",
    maxUsagePerUser: "",
    expiryDate: "",
  });

  // Fetch all coupons
  const fetchCoupons = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/all`,
        { withCredentials: true }
      );
      setCoupons(data.coupon);
    } catch (error) {
      toast.error("Failed to fetch coupons");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Delete coupon
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/${id}`,
        { withCredentials: true }
      );
      toast.success("Coupon deleted successfully!");
      setCoupons((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      toast.error("Failed to delete coupon");
      console.error(error);
    }
  };

  // Add or Edit coupon
  const handleSubmit = async () => {
    try {
      if (editingCoupon) {
        // Edit coupon
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/${editingCoupon._id}`,
          formData,
          { withCredentials: true }
        );
        toast.success("Coupon updated successfully!");
      } else {
        // Add new coupon
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/create`,
          formData,
          { withCredentials: true }
        );
        toast.success("Coupon added successfully!");
      }
      setAddEdit(false);
      setEditingCoupon(null);
      setFormData({
        code: "",
        discountAmount: "",
        discountPercentage: "",
        minCartAmount: "",
        maxUsagePerUser: "",
        expiryDate: "",
      });
      fetchCoupons();
    } catch (error) {
      console.log(error)
      toast.error("Operation failed");
      console.error(error);
    }
  };

  // Edit coupon button
  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      discountAmount: coupon.discountAmount.toString(),
      discountPercentage: coupon.discountPercentage?.toString() || "",
      minCartAmount: coupon.minCartAmount?.toString() || "",
      maxUsagePerUser: coupon.maxUsagePerUser.toString(),
      expiryDate: coupon.expiryDate.slice(0, 10),
    });
    setAddEdit(true);
  };

  const filtered = coupons.filter((f) =>
    f.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="px-8 py-1">
      <div className="mt-10 flex justify-between">
        <div>
          <h1 className="text-xl font-neogrotesk-bold">Coupons</h1>
          <h1 className="text-[#6b6b6b] font-neogrotesk-ultralight pt-2">
            Manage discount codes and promotions
          </h1>
        </div>
        <button
          className="bg-black w-36 h-10 flex justify-center items-center rounded-xl text-white"
          onClick={() => setAddEdit(true)}
        >
          {editingCoupon ? "Edit Coupon" : "Add Coupon"}
        </button>
      </div>

      <div className="w-full">
        <input
          className="mt-6 bg-white px-6 h-10 w-full rounded-xl"
          type="text"
          placeholder="Search Coupons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Inline Add/Edit Section */}
      {addEdit && (
        <section className="bg-white mt-6 rounded-2xl px-10 py-8 w-full">
          <h1 className="text-lg font-neogrotesk-regular mb-6">
            {editingCoupon ? "Edit Coupon" : "Add New Coupon"}
          </h1>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm mb-1">Coupon Code</label>
              <input
                type="text"
                placeholder="Enter coupon code"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                className="w-full px-4 py-2 rounded-xl bg-[#ececf0] text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Discount Amount (₹)</label>
              <input
                type="number"
                placeholder="e.g., 100"
                value={formData.discountAmount}
                onChange={(e) =>
                  setFormData({ ...formData, discountAmount: e.target.value })
                }
                className="w-full px-4 py-2 rounded-xl bg-[#ececf0] text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Discount Percentage (%)</label>
              <input
                type="number"
                placeholder="e.g., 10"
                value={formData.discountPercentage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountPercentage: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-xl bg-[#ececf0] text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Min Cart Amount</label>
              <input
                type="number"
                placeholder="Optional"
                value={formData.minCartAmount}
                onChange={(e) =>
                  setFormData({ ...formData, minCartAmount: e.target.value })
                }
                className="w-full px-4 py-2 rounded-xl bg-[#ececf0] text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Max Usage/User</label>
              <input
                type="number"
                placeholder="e.g., 1"
                value={formData.maxUsagePerUser}
                onChange={(e) =>
                  setFormData({ ...formData, maxUsagePerUser: e.target.value })
                }
                className="w-full px-4 py-2 rounded-xl bg-[#ececf0] text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Expiry Date</label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                className="w-full px-4 py-2 rounded-xl bg-[#ececf0] text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => {
                setAddEdit(false);
                setEditingCoupon(null);
                setFormData({
                  code: "",
                  discountAmount: "",
                  discountPercentage: "",
                  minCartAmount: "",
                  maxUsagePerUser: "",
                  expiryDate: "",
                });
              }}
              className="border border-gray-300 px-6 py-2 rounded-xl text-sm hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-6 py-2 rounded-xl text-sm hover:opacity-80 transition-all"
            >
              {editingCoupon ? "Update Coupon" : "Save Coupon"}
            </button>
          </div>
        </section>
      )}

      {/* Coupon Table */}
      <section className="mt-6 pb-10">
        <div className="bg-white rounded-2xl border border-[#dbdada] px-10">
          <div className="py-6">
            <h1 className="font-neogrotesk-regular text-[#6d6363]">
              Available Coupons
            </h1>
          </div>

          <div className="flex font-neogrotesk-regular border-b pb-3 border-[#dbdada]">
            <div className="flex gap-20 pl-8 text-center">
              <h1>Code</h1>
              <h1 className="pl-10">Discount</h1>
              <h1>Min. Cart Amount</h1>
            </div>
            <div className="flex gap-14 pl-10">
              <h1>Max Usage/User</h1>
              <h1>Expires</h1>
              <h1 className="ml-26">Actions</h1>
            </div>
          </div>

          {filtered.map((coupon) => (
            <div
              key={coupon._id}
              className="flex border-b pl-4 pb-3 text-sm border-[#dbdada] pt-2 text-center"
            >
              <h1 className="bg-[#ede8e8] h-8 flex px-2 rounded-lg items-center">
                {coupon.code}
              </h1>
              <h1 className="ml-28">
                {coupon.discountPercentage
                  ? `${coupon.discountPercentage}%`
                  : `₹${coupon.discountAmount}`}
              </h1>
              <h1 className="ml-38">{coupon.minCartAmount || "—"}</h1>
              <h1 className="pl-42">{coupon.maxUsagePerUser}</h1>
              <h1 className="ml-30">
                {new Date(coupon.expiryDate).toLocaleDateString()}
              </h1>
              <div className="flex gap-4 ml-30">
                <button
                  onClick={() => handleEdit(coupon)}
                  className="h-6 w-14 rounded-md border hover:bg-gray-100 border-[#b8a9a9] text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(coupon._id)}
                  className="h-6 w-14 rounded-md border hover:bg-red-300 border-[#b8a9a9] text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default AdminCoupon;
