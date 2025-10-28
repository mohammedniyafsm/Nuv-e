import { useEffect, useState } from "react";
import Delete from "../icons/Delete";
import Edit from "../icons/Edit";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { allProduct } from "../../features/Product/Product";
import type { AppDispatch, RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";

function ProductAdmin() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const product = useSelector((state: RootState) => state.product);

  const [add, setAdd] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const [productNew, setNewProduct] = useState({
    name: "",
    category: "",
    size: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
  });

  // 🔹 Load all products
  useEffect(() => {
    dispatch(allProduct())
      .unwrap()
      .then((data) => console.log("✅ Products from backend:", data))
      .catch((err) => console.error("❌ Failed to fetch products:", err));
  }, [dispatch]);

  // 🔹 Input field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle image input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  // 🔹 Delete product
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`, {
        withCredentials: true,
      });
      toast.success("🗑️ Product deleted successfully!");
      dispatch(allProduct());
    } catch (err) {
      toast.error("Failed to delete product.");
      console.error(err);
    }
  };

  // 🔹 Submit (Add / Edit)
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(productNew).forEach(([key, value]) => {
        formData.append(key, value);
      });
      images.forEach((file) => formData.append("images", file));

      if (editProduct) {
        // Update product
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${editProduct._id}`,
          formData,
          { withCredentials: true }
        );
        toast.success("✅ Product updated successfully!");
      } else {
        // Add new product
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products`, formData, {
          withCredentials: true,
        });
        toast.success("✅ Product added successfully!");
      }

      // Reset state
      setAdd(false);
      setEditProduct(null);
      setNewProduct({
        name: "",
        category: "",
        size: "",
        price: "",
        discount: "",
        stock: "",
        description: "",
      });
      setImages([]);
      dispatch(allProduct());
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Failed to save product.");
    }
  };

  // 🔹 Edit product
  const handleEdit = (item: any) => {
    setEditProduct(item);
    setNewProduct({
      name: item.name,
      category: item.category,
      size: item.size,
      price: item.price,
      discount: item.discount,
      stock: item.stock,
      description: item.description,
    });
    setImages([]);
    setAdd(true);
  };

  // 🔹 Search filter
  const filterProduct = product.products.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="px-4 sm:px-6 md:px-12 py-4 w-full">
      {!add && (
        <>
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4 gap-4">
            <div>
              <h1 className="text-lg sm:text-xl font-neogrotesk-regular">Products</h1>
              <h1 className="text-[#6b6b6b] text-sm sm:text-base">
                Manage your product inventory
              </h1>
            </div>
            <button
              onClick={() => {
                setAdd(true);
                setEditProduct(null);
              }}
              className="bg-black w-full sm:w-36 h-10 rounded-xl text-white font-neogrotesk-regular hover:opacity-80 transition-all"
            >
              Add Product
            </button>
          </div>

          {/* Search Bar */}
          <div className="w-full">
            <input
              className="mt-6 bg-white px-6 h-10 w-full rounded-xl border border-gray-200 focus:outline-none"
              type="text"
              placeholder="Search Products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
            {filterProduct?.length > 0 ? (
              filterProduct.map((item) => (
                <div
                  key={item._id}
                  className="w-full bg-white rounded-xl shadow-sm border border-[#dbdada] p-4 flex flex-col justify-between"
                >
                  <img
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="h-64 sm:h-72 w-full object-cover rounded-xl cursor-pointer"
                    src={item.images?.[0]?.url || "/placeholder.jpg"}
                    alt={item.name}
                  />
                  <div className="flex justify-between items-center pt-4">
                    <h1 className="font-medium">{item.name}</h1>
                  </div>
                  <h1 className="text-[#6b6b6b] text-sm">{item.category}</h1>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <h1 className="text-sm">Stock: {item.stock}</h1>
                      <h1 className="text-sm font-semibold">₹{item.price}</h1>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="h-8 w-8 rounded-md border border-gray-300 flex justify-center items-center hover:bg-gray-100"
                      >
                        <Edit />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="h-8 w-8 rounded-md border border-gray-300 flex justify-center items-center hover:bg-red-100"
                      >
                        <Delete className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </>
      )}

      {/* Add / Edit Form */}
      {(add || editProduct) && (
        <section className="bg-white mt-8 rounded-2xl px-6 sm:px-8 md:px-10 py-8 w-full">
          <h1 className="text-lg sm:text-xl font-neogrotesk-regular mb-6">
            {editProduct ? "Edit Product" : "Add New Product"}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { label: "Product Name", name: "name", placeholder: "Nuvee Eau de Parfum" },
              { label: "Category", name: "category", placeholder: "Perfume" },
              { label: "Size", name: "size", placeholder: "100ml" },
              { label: "Price", name: "price", placeholder: "89.00" },
              { label: "Discount (%)", name: "discount", placeholder: "10" },
              { label: "Stock", name: "stock", placeholder: "45" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm mb-1">{field.label}</label>
                <input
                  name={field.name}
                  value={(productNew as any)[field.name]}
                  onChange={handleChange}
                  type="text"
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 rounded-xl bg-[#ececf0] text-sm focus:outline-none"
                />
              </div>
            ))}

            <div className="col-span-3">
              <label className="block text-sm mb-1">Description</label>
              <textarea
                name="description"
                value={productNew.description}
                onChange={handleChange}
                rows={4}
                placeholder="Enter product description..."
                className="w-full px-4 py-2 rounded-xl bg-[#ececf0] text-sm focus:outline-none"
              />
            </div>

            <div className="col-span-3">
              <label className="block text-sm mb-1">Upload Images</label>
              <input
                onChange={handleFileChange}
                type="file"
                multiple
                className="w-full bg-[#ececf0] rounded-xl px-4 py-2 text-sm text-gray-700"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={() => {
                setAdd(false);
                setEditProduct(null);
                setNewProduct({
                  name: "",
                  category: "",
                  size: "",
                  price: "",
                  discount: "",
                  stock: "",
                  description: "",
                });
                setImages([]);
              }}
              className="border border-gray-300 px-6 py-2 rounded-xl text-sm hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-6 py-2 rounded-xl text-sm hover:opacity-80 transition-all"
            >
              {editProduct ? "Update Product" : "Save Product"}
            </button>
          </div>
        </section>
      )}
    </section>
  );
}

export default ProductAdmin;
