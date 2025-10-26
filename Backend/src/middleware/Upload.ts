import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const category = req.body.category || "general";
    const productName = req.body.name?.replace(/\s+/g, "_") || "product";
    
    return {
      folder: `products/${category}/${productName}`,
      public_id: file.originalname.split(".")[0],
      allowed_formats: ["jpg", "jpeg", "png"],
    };
  },
});


const upload = multer({ storage });

export default upload;
