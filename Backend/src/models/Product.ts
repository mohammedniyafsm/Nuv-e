import { Document, Types, Schema, model, Model, } from "mongoose";

interface IImage {
  url: string;
  alt?: string;
}

const ImageSchema = new Schema<IImage>(
  {
    url: { type: String, required: true },
    alt: { type: String, default: "" },
  },
);

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  brand: string;
  category: string;
  size: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  images: IImage[];
  status: "active" | "out_of_stock" | "discontinued";
  createdAt: Date;
  updatedAt: Date;
}

export const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, default: "Nuvée" },
    category: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    images: [ImageSchema],
    status: {
      type: String,
      enum: ["active", "out_of_stock", "discontinued"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> = model<IProduct>("Product", ProductSchema);

