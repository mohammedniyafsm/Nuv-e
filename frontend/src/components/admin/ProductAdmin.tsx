import { useEffect, useState } from "react";
import Delete from "../icons/Delete";
import Edit from "../icons/Edit";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { allProduct } from "../../features/Product/Product";
import type { AppDispatch, RootState } from "../../app/store";

function ProductAdmin() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(allProduct())
      .unwrap()
      .then((data) => console.log("Products from backend:", data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const product = useSelector((state: RootState) => state.product);

  const [images, setImages] = useState<File[]>([]);
  const [add, setAdd] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null); // state for editing

  const [productNew, setNewProduct] = useState({
    name: "",
    category: "",
    size: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const uploadImagesToS3 = async () => {
    const uploadPromises = images.map(async (file) => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/s3-presign?filename=${encodeURIComponent(file.name)}&contentType=${file.type}`,
        { withCredentials: true }
      );
      await fetch(data.url, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
      return data.cloudfrontUrl;
    });
    return Promise.all(uploadPromises);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`, { withCredentials: true });
    toast.success("Product Deleted Successfully!");
    dispatch(allProduct());
  };

  // Submit handler for Add & Edit
  const handleSubmit = async () => {
    try {
      const imageUrls = images.length > 0 ? await uploadImagesToS3() : editProduct?.images.map((img: any) => img.url);

      const productData = {
        ...productNew,
        images: imageUrls.map((url) => ({ url })),
      };

      if (editProduct) {
        // Update existing product
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${editProduct._id}`,
          productData,
          { withCredentials: true }
        );
        toast.success("Product Updated Successfully!");
      } else {
        // Add new product
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products`, productData, { withCredentials: true });
        toast.success("Product Added Successfully!");
      }

      setAdd(false);
      setEditProduct(null);
      setNewProduct({ name: "", category: "", size: "", price: "", discount: "", stock: "", description: "" });
      setImages([]);
      dispatch(allProduct());
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save product.");
    }
  };

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
    setAdd(true);
  };

  return (
    <section className="px-12 py-4">
      {!add && (
        <>
          <div className="flex justify-between items-center py-4">
            <div className="pt-8">
              <h1 className="text-lg font-neogrotesk-regular">Products</h1>
              <h1 className="text-[#6b6b6b]">Manage your product inventory</h1>
            </div>
            <div
              onClick={() => { setAdd(true); setEditProduct(null); }}
              className="bg-black w-36 h-10 flex justify-center items-center rounded-xl text-white cursor-pointer"
            >
              <h1 className="text-md font-neogrotesk-regular">Add Product</h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 py-10">
            {product.products?.length > 0 ? (
              product.products.map((item) => (
                <div key={item._id} className="w-96 py-4 px-4 rounded-xl bg-white">
                  <img className="h-80 w-[400px] rounded-xl" src="" alt="" />
                  <div className="flex justify-between py-4">
                    <h1>{item.name}</h1>
                    <button className="h-6 w-20 rounded-md bg-green-200 text-green-800 text-xs">{item.status}</button>
                  </div>
                  <h1 className="text-[#6b6b6b]">{item.category}</h1>
                  <div className="flex justify-between items-center">
                    <div className="my-4">
                      <h1>Stock : {item.stock}</h1>
                      <h1>${item.price}</h1>
                    </div>
                    <div className="flex gap-4">
                      <div onClick={() => handleEdit(item)} className="h-8 w-8 rounded-md border border-[#b7b5b5] flex justify-center items-center cursor-pointer">
                        <Edit />
                      </div>
                      <div onClick={() => handleDelete(item._id)} className="h-8 w-8 rounded-md border border-[#b7b5b5] flex justify-center items-center">
                        <Delete className="h-4 w-4" />
                      </div>
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

      {(add || editProduct) && (
        <section className="bg-white mt-8 rounded-2xl px-10 py-8 w-full">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-lg font-neogrotesk-regular">{editProduct ? "Edit Product" : "Add New Product"}</h1>
            {/* <button
              onClick={() => {
                setAdd(false);
                setEditProduct(null);
                setNewProduct({ name: "", category: "", size: "", price: "", discount: "", stock: "", description: "" });
                setImages([]);
              }}
              className="text-sm border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all"
            >
              Cancel
            </button> */}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Product fields */}
            <div>
              <label className="block text-sm mb-1">Product Name</label>
              <input
                name="name"
                value={productNew.name}
                onChange={handleChange}
                type="text"
                placeholder="Nuvee Eau de Parfum"
                className="w-full px-4 py-2 rounded-xl bg-[#ececf0] text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Category</label>
              <input
                name="category"
                value={productNew.category}
                onChange={handleChange}
                type="text"
                placeholder="Perfume"
                className="w-full px-4 py-2 rounded-xl bg-[#ececf0] text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Size</label>
              <input
                name="size"
                value={productNew.size}
                onChange={handleChange}
                type="text"
                placeholder="100ml"
                className="w-full px-4 py-2 rounded-xl bg-[#ececf0] text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Price</label>
              <input
                name="price"
                value={productNew.price}
                onChange={handleChange}
                type="text"
                placeholder="89.00"
                className="w-full px-4 py-2 rounded-xl bg-[#ececf0] text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Discount (%)</label>
              <input
                name="discount"
                value={productNew.discount}
                onChange={handleChange}
                type="text"
                placeholder="10"
                className="w-full px-4 py-2 rounded-xl bg-[#ececf0] text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Stock</label>
              <input
                name="stock"
                value={productNew.stock}
                onChange={handleChange}
                type="text"
                placeholder="45"
                className="w-full px-4 py-2 rounded-xl bg-[#ececf0] text-sm focus:outline-none"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-sm mb-1">Description</label>
              <textarea
                name="description"
                value={productNew.description}
                onChange={handleChange}
                rows={4}
                placeholder="Enter product description..."
                className="w-full px-4 py-2 rounded-xl bg-[#ececf0] text-sm focus:outline-none"
              ></textarea>
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

          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={() => {
                setAdd(false);
                setEditProduct(null);
                setNewProduct({ name: "", category: "", size: "", price: "", discount: "", stock: "", description: "" });
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
