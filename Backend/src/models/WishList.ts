import { Document, model, Model, Schema, Types } from "mongoose";

interface IWishlist extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    products: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}


const wishListSchema = new Schema<IWishlist>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        }
    ],

}, { timestamps: true });

export const WishList: Model<IWishlist> = model<IWishlist>('WishList', wishListSchema)